"""
SAM / SAM2 Precision Segmentation & Boundary Refinement Test Suite.

Verifies all 13 scenarios mandated in Phase 32:
  TEST 1: Generic change query -> ChangeFormer runs; SAM does not have to run.
  TEST 2: Query requests precise changed region -> ChangeFormer -> SAM refinement.
  TEST 3: Urban change -> ChangeFormer + Building Segmentation; SAM optional.
  TEST 4: Building boundary refinement -> Building Segmentation -> SAM -> refined evidence.
  TEST 5: Flood impact -> Flood evidence + Building Segmentation; SAM only if useful/required.
  TEST 6: Vegetation NDVI query -> Sentinel-2; SAM should NOT unnecessarily execute.
  TEST 7: RGB input -> SAM operates when optical compatibility is satisfied.
  TEST 8: Raw Sentinel-1 SAR input -> SAM rejects raw SAR with transparent capability limitation.
  TEST 9: SAM refinement low overlap -> Verification warning.
  TEST 10: SAM output empty -> Refinement failure/warning.
  TEST 11: SAM mask expands dramatically beyond parent -> Suspicious expansion warning.
  TEST 12: SAM model unavailable -> System continues with parent evidence without failing.
  TEST 13: SAM produces valid refined mask -> EvidenceRecord, Verification, Confidence, Provenance updated.
"""
from __future__ import annotations
import io
import base64
import numpy as np
import pytest
from PIL import Image
import rasterio
from rasterio.transform import from_origin

from backend.schemas.response import QueryRequest, QueryResponse, AgentOutput, EarthQuerySpec, SensorSelection
from backend.services.earthquery.compiler import compile_query
from backend.services.analysis_planner import create_plan
from backend.orchestrator import run_pipeline
from backend.agents.sam_agent import SAMAgent
from backend.models.sam.adapter import SegmentationPrompt, SegmentationResult, SegmentationModel
from backend.models.sam.geometry import compute_refinement_metrics, mask_to_polygons
from backend.services.verifier import verify
from backend.services.evidence_fusion import EvidenceFusionEngine, normalize_agent_output, EvidenceRecord
from backend.services.confidence import compute_confidence, compute_uncertainties


def _make_rgb_b64(width: int = 64, height: int = 64, color=(120, 160, 90)) -> str:
    img = Image.new("RGB", (width, height), color=color)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    return f"data:image/png;base64,{base64.b64encode(buf.read()).decode('utf-8')}"


def _make_s1_b64(width: int = 64, height: int = 64, power_vv: float = 0.05) -> str:
    transform = from_origin(85.0, 27.0, 10.0, 10.0)
    crs = "EPSG:4326"
    mem = io.BytesIO()
    with rasterio.open(
        mem, "w", driver="GTiff", height=height, width=width, count=2,
        dtype="float32", crs=crs, transform=transform, nodata=-9999.0
    ) as dst:
        dst.write(np.full((height, width), power_vv, dtype=np.float32), 1)
        dst.write(np.full((height, width), power_vv * 0.2, dtype=np.float32), 2)
        dst.update_tags(1, POLARISATION="VV")
        dst.update_tags(2, POLARISATION="VH")
        dst.update_tags(SENSOR="SENTINEL-1")
    mem.seek(0)
    return f"data:image/tiff;base64,{base64.b64encode(mem.read()).decode('utf-8')}"


# ── TEST 1: Generic Change Query ──────────────────────────────────────────────
def test_1_generic_change_query_runs_changeformer_not_sam():
    q = "Where did the landscape change between 2021 and 2023?"
    spec = compile_query(q, has_two_images=True)
    plan = create_plan(spec, question=q)

    assert plan.use_changeformer is True
    assert "change_detection_agent" in plan.required_agents
    assert plan.use_sam is False
    assert "sam_agent" not in plan.required_agents


# ── TEST 2: Query Requests Precise Changed Region ─────────────────────────────
def test_2_query_requests_precise_changed_region_triggers_sam():
    q = "Show the exact changed regions between 2021 and 2023 and refine boundaries"
    spec = compile_query(q, has_two_images=True)
    plan = create_plan(spec, question=q)

    assert plan.use_changeformer is True
    assert plan.use_sam is True
    assert plan.sam_refinement_target == "changeformer"
    assert "sam_agent" in plan.required_agents


# ── TEST 3: Urban Change (ChangeFormer + Building Seg, SAM Optional) ──────────
def test_3_urban_change_changeformer_plus_building_seg():
    q = "Detect urban change and new construction between T0 and T1"
    spec = compile_query(q, has_two_images=True)
    plan = create_plan(spec, question=q)

    assert plan.use_changeformer is True
    assert plan.use_building_seg is True
    assert "change_detection_agent" in plan.required_agents
    assert "building_segmentation_agent" in plan.required_agents
    assert plan.use_sam is False  # SAM optional, not forced on generic urban change


# ── TEST 4: Building Boundary Refinement ──────────────────────────────────────
def test_4_building_boundary_refinement_triggers_sam():
    q = "Extract the exact boundary of buildings in this area and refine footprints"
    spec = compile_query(q, has_two_images=False)
    plan = create_plan(spec, question=q)

    assert plan.use_building_seg is True
    assert plan.use_sam is True
    assert plan.sam_refinement_target == "building_segmentation"
    assert "sam_agent" in plan.required_agents


# ── TEST 5: Flood Impact (Flood Evidence + Building Seg, SAM Only if Requested) ─
def test_5_flood_impact_only_uses_sam_if_useful_or_requested():
    # 5a: Standard flood query -> Flood + Building Seg, SAM not forced
    q_standard = "Assess flood impact and affected buildings across the region"
    spec_standard = compile_query(q_standard, has_two_images=True)
    plan_standard = create_plan(spec_standard, question=q_standard)

    assert plan_standard.use_building_seg is True
    assert plan_standard.use_spatial_intersection is True
    assert plan_standard.use_sam is False

    # 5b: Precision flood boundary query -> SAM recruited
    q_precise = "Map flood extent with exact boundary refinement for inundated buildings"
    spec_precise = compile_query(q_precise, has_two_images=True)
    plan_precise = create_plan(spec_precise, question=q_precise)

    assert plan_precise.use_sam is True
    assert plan_precise.sam_refinement_target == "flood"
    assert "sam_agent" in plan_precise.required_agents


# ── TEST 6: Vegetation NDVI Query (Sentinel-2 Primary, SAM NOT Executed) ───────
def test_6_vegetation_ndvi_query_sam_not_executed():
    q = "Where did vegetation decrease and canopy decline?"
    spec = compile_query(q, has_two_images=True)
    plan = create_plan(spec, question=q)

    assert plan.task == "vegetation_change"
    assert "spectral_analysis_agent" in plan.required_agents
    assert plan.use_sam is False
    assert "sam_agent" not in plan.required_agents


# ── TEST 7: Optical RGB Input Compatibility ───────────────────────────────────
def test_7_rgb_input_sam_compatibility():
    agent = SAMAgent()
    rgb_b64 = _make_rgb_b64()

    # Agent checks modality and decodes RGB cleanly
    output = agent.run(question="Segment optical objects", image_b64=rgb_b64)
    assert output.agent_id == "sam_agent"
    # Either active (if weights present) or honestly reporting checkpoint_unavailable
    assert output.result.get("capability_status") in ("active", "checkpoint_unavailable")


# ── TEST 8: Raw Sentinel-1 SAR Input Rejected with Transparent Limitation ─────
def test_8_raw_sentinel1_sar_rejected_with_limitation():
    agent = SAMAgent()
    sar_b64 = _make_s1_b64()

    output = agent.run(question="Segment objects on SAR", image_b64=sar_b64)
    assert output.result.get("capability_status") == "unsupported_data_capability"
    assert "radar" in output.error.lower() or "sar" in output.error.lower()
    assert any("radar" in lim.lower() or "sar" in lim.lower() for lim in output.result.get("limitations", []))


# ── TEST 9: Low Overlap with Parent Evidence Flags Verification Warning ───────
def test_9_sam_refinement_low_overlap_flags_warning():
    parent_mask = np.zeros((100, 100), dtype=bool)
    parent_mask[10:30, 10:30] = True  # 400 pixels at top-left

    refined_mask = np.zeros((100, 100), dtype=bool)
    refined_mask[70:90, 70:90] = True  # 400 pixels at bottom-right (0% overlap)

    metrics = compute_refinement_metrics(parent_mask, refined_mask)
    assert metrics.low_overlap is True
    assert metrics.overlap_ratio_with_parent == 0.0

    # Test through VerificationEngine
    spec = EarthQuerySpec(intent="Change", task_type="change_detection", requires_two_images=True, confidence=0.9)
    ao = AgentOutput(
        agent_id="sam_agent",
        agent_name="SAM Specialist",
        task="Precision Boundary Refinement (SAM)",
        result={
            "capability_status": "active",
            "refinement_metrics": metrics.to_dict(),
        },
        raw_score=0.40,
    )
    vr = verify(spec, [ao])
    assert vr.status == "passed_with_warnings"
    assert any("low overlap" in c.lower() for c in vr.conflicts_found)


# ── TEST 10: Empty SAM Output Flags Refinement Failure / Warning ───────────────
def test_10_sam_output_empty_flags_warning():
    parent_mask = np.zeros((100, 100), dtype=bool)
    parent_mask[20:50, 20:50] = True  # 900 parent pixels

    empty_refined_mask = np.zeros((100, 100), dtype=bool)

    metrics = compute_refinement_metrics(parent_mask, empty_refined_mask)
    assert metrics.empty_refined_mask is True
    assert metrics.refined_pixel_count == 0

    spec = EarthQuerySpec(intent="Change", task_type="change_detection", requires_two_images=True, confidence=0.9)
    ao = AgentOutput(
        agent_id="sam_agent",
        agent_name="SAM Specialist",
        task="Precision Boundary Refinement (SAM)",
        result={
            "capability_status": "active",
            "refinement_metrics": metrics.to_dict(),
        },
        raw_score=0.20,
    )
    vr = verify(spec, [ao])
    assert vr.status == "passed_with_warnings"
    assert any("empty mask" in c.lower() or "failed" in c.lower() for c in vr.conflicts_found)


# ── TEST 11: Extreme Segmentation Expansion Flags Suspicious Refinement ───────
def test_11_sam_mask_extreme_expansion_flags_suspicious_warning():
    parent_mask = np.zeros((100, 100), dtype=bool)
    parent_mask[40:50, 40:50] = True  # 100 pixels

    # Refined mask expands to 600 pixels (6.0x expansion > 2.5x threshold)
    expanded_mask = np.zeros((100, 100), dtype=bool)
    expanded_mask[20:50, 20:40] = True

    metrics = compute_refinement_metrics(parent_mask, expanded_mask)
    assert metrics.expansion_drift is True
    assert metrics.area_ratio >= 2.5

    spec = EarthQuerySpec(intent="Change", task_type="change_detection", requires_two_images=True, confidence=0.9)
    ao = AgentOutput(
        agent_id="sam_agent",
        agent_name="SAM Specialist",
        task="Precision Boundary Refinement (SAM)",
        result={
            "capability_status": "active",
            "refinement_metrics": metrics.to_dict(),
        },
        raw_score=0.45,
    )
    vr = verify(spec, [ao])
    assert vr.status == "passed_with_warnings"
    assert any("expansion" in c.lower() or "suspicious" in c.lower() for c in vr.conflicts_found)


# ── TEST 12: SAM Model Unavailable Continues with Parent Evidence ─────────────
def test_12_sam_unavailable_continues_with_parent_evidence():
    q = "Show the exact changed regions between 2021 and 2023"
    b64_0 = _make_rgb_b64()
    b64_1 = _make_rgb_b64()
    req = QueryRequest(question=q, image_b64=b64_0, image2_b64=b64_1)

    # When SAM weights are not installed in the repo:
    # Orchestrator runs ChangeFormer, calls SAM, receives checkpoint_unavailable,
    # and continues cleanly without throwing exceptions or failing the response.
    resp: QueryResponse = run_pipeline(req)

    assert resp.task_plan is not None
    assert resp.task_plan.use_sam is True

    # Change detection output must still be present and valid
    cf_out = next((ao for ao in resp.agent_outputs if ao.agent_id == "change_detection_agent"), None)
    assert cf_out is not None
    assert cf_out.error is None
    assert "change_percent" in cf_out.result

    # SAM output honestly reports checkpoint_unavailable
    sam_out = next((ao for ao in resp.agent_outputs if ao.agent_id == "sam_agent"), None)
    assert sam_out is not None
    assert sam_out.result.get("capability_status") in ("checkpoint_unavailable", "active")
    assert resp.answer != ""


# ── TEST 13: Valid Refined Mask Updates Evidence, Verification, Confidence, Provenance ─
def test_13_valid_refined_mask_updates_full_architecture():
    parent_mask = np.zeros((100, 100), dtype=bool)
    parent_mask[30:60, 30:60] = True  # 900 pixels

    # High quality refined mask: 850 pixels overlapping closely
    refined_mask = np.zeros((100, 100), dtype=bool)
    refined_mask[31:59, 30:60] = True

    metrics = compute_refinement_metrics(parent_mask, refined_mask, object_count=1)
    assert metrics.iou > 0.80
    assert metrics.expansion_drift is False
    assert metrics.low_overlap is False
    assert metrics.empty_refined_mask is False

    # 1. Verification Engine
    spec = EarthQuerySpec(intent="Change", task_type="change_detection", requires_two_images=True, confidence=0.92)
    parent_ao = AgentOutput(
        agent_id="change_detection_agent",
        agent_name="ChangeFormer Agent",
        task="Bi-temporal Change Detection",
        result={
            "pixel_change_count": 900,
            "total_valid_pixels": 10000,
            "change_percent": 9.0,
        },
        raw_score=0.92,
    )
    sam_ao = AgentOutput(
        agent_id="sam_agent",
        agent_name="SAM Specialist",
        task="Precision Boundary Refinement (SAM)",
        result={
            "capability_status": "active",
            "model": "SAM2 (sam2_hiera_l.yaml)",
            "parent_evidence_id": "ev_changeformer_001",
            "refinement_metrics": metrics.to_dict(),
            "answer": "Refined 1 candidate region from changeformer. Spatial IoU: 0.85.",
        },
        raw_score=0.88,
    )
    vr = verify(spec, [parent_ao, sam_ao])
    assert vr.status == "passed"
    assert any(c.name == "segmentation_refinement" and c.status == "passed" for c in vr.checks)

    # 2. EvidenceRecord Normalization & Preservation
    p_rec = normalize_agent_output(parent_ao)
    s_rec = normalize_agent_output(sam_ao)
    assert p_rec is not None
    assert s_rec is not None
    assert s_rec.parent_evidence == "ev_changeformer_001"
    assert s_rec.refined_evidence is not None
    # Both parent and refined records are preserved
    assert p_rec.source in ("changeformer", "rgb_differencing")
    assert s_rec.source == "sam2"

    # 3. Evidence Fusion
    fusion = EvidenceFusionEngine(task="change_detection")
    f_res = fusion.fuse([p_rec, s_rec])
    assert f_res["evidence_status"] == "consistent"
    assert f_res["cross_modal_agreement"] >= 0.85

    # 4. Confidence & Uncertainty
    sensor = SensorSelection(selected_sensor="Optical RGB", rationale="Optical imagery")
    conf = compute_confidence(spec, sensor, [parent_ao, sam_ao], vr)
    assert conf.overall >= 0.70
    assert conf.answer_groundedness >= 0.80

    unc = compute_uncertainties(spec, sensor, [parent_ao, sam_ao], vr)
    # No drift or collapse uncertainties for valid refinement
    assert not any(u.type in ("segmentation_expansion_drift", "segmentation_collapse") for u in unc)
