"""
Comprehensive Integration & Verification Tests for Evidence Architecture.

Implements all 12 validation scenarios defined in Part 42:
  TEST 1:  Generic Change Detection (Two optical images -> ChangeFormer, NO flood logic)
  TEST 2:  Urban Development (Two images -> ChangeFormer + Building Segmentation)
  TEST 3:  Flood Impact (Flood evidence + Building Segmentation + S1 if available)
  TEST 4:  Vegetation Query (Sentinel-2 NDVI, Building Segmentation does NOT run)
  TEST 5:  Cloudy Temporal Query (Sentinel-1 SAR prioritized over optical)
  TEST 6:  RGB Image + NDVI Query (Unsupported/insufficient capability, never fake NDVI)
  TEST 7:  Model Agreement (Consistent evidence state, high confidence)
  TEST 8:  Model Disagreement (Conflicting evidence state, confidence decreases)
  TEST 9:  Missing Sentinel-1 (Reported as 'SAR evidence unavailable', NOT as zero)
  TEST 10: Misaligned / Ungeoreferenced images (Warning or degraded spatial confidence)
  TEST 11: Invalid Percentage > 100% (Verification failure detected)
  TEST 12: Affected Buildings > Total Buildings (Verification failure detected)
"""
import io
import base64
import numpy as np
import pytest
from PIL import Image

from backend.schemas.response import (
    QueryRequest, QueryResponse, EarthQuerySpec, AgentOutput, VerifierResult, SensorSelection
)
from backend.services.earthquery.compiler import compile_query
from backend.services.analysis_planner import create_plan
from backend.services.evidence_fusion import (
    EvidenceRecord, EvidenceFusionEngine, normalize_agent_output
)
from backend.services.verifier import verify, VerificationEngine
from backend.services.confidence import compute_confidence
from backend.orchestrator import run_pipeline


def _make_rgb_b64(w: int = 64, h: int = 64, color: tuple = (100, 150, 200)) -> str:
    img = Image.new("RGB", (w, h), color=color)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("utf-8")


def _make_s1_b64(w: int = 64, h: int = 64, mean_val: float = 0.05) -> str:
    import rasterio
    from rasterio.transform import Affine
    arr = np.random.exponential(scale=mean_val, size=(1, h, w)).astype(np.float32)
    buf = io.BytesIO()
    trans = Affine.translation(80.0, 25.0) * Affine.scale(0.0001, -0.0001)
    with rasterio.open(
        buf, "w", driver="GTiff", height=h, width=w, count=1,
        dtype="float32", crs="EPSG:4326", transform=trans
    ) as dst:
        dst.write(arr)
        dst.update_tags(
            SPACECRAFT_NAME="SENTINEL-1A",
            MISSION="SENTINEL-1",
            POLARIZATION="VV",
            ACQUISITION_MODE="IW",
            ORBIT_DIRECTION="DESCENDING",
        )
        dst.update_tags(1, POLARIZATION="VV")
    return "data:image/tiff;base64," + base64.b64encode(buf.getvalue()).decode("utf-8")


# ── TEST 1: Two optical images -> ChangeFormer without flood logic ─────────────
def test_1_landscape_change_generic_changeformer():
    b0 = _make_rgb_b64(64, 64, (30, 100, 30))
    b1 = _make_rgb_b64(64, 64, (120, 70, 20))
    req = QueryRequest(
        question="Where did the landscape change between before and after?",
        image_b64=b0,
        image2_b64=b1,
    )
    resp = run_pipeline(req)

    assert resp.earthquery_spec.task_type in ("change_detection", "change_vqa")
    assert resp.task_plan.use_changeformer is True

    # Ensure output has NO hardcoded flood logic
    cf_output = next(ao for ao in resp.agent_outputs if ao.agent_id == "change_detection_agent")
    assert cf_output.result["change_type"] == "Bi-temporal Surface Change"
    assert "flood inundation" not in cf_output.result["change_type"].lower()
    assert "flood" not in cf_output.result.get("change_map_description", "").lower()
    assert cf_output.result["standardized_output"]["result_type"] == "change_mask"
    assert cf_output.result["standardized_output"]["task"] == "change_detection"


# ── TEST 2: Two images -> ChangeFormer + Building Segmentation ─────────────────
def test_2_urban_development_runs_changeformer_and_building_seg():
    b0 = _make_rgb_b64(64, 64, (50, 50, 50))
    b1 = _make_rgb_b64(64, 64, (150, 150, 150))
    req = QueryRequest(
        question="Where did urban development increase between T0 and T1?",
        image_b64=b0,
        image2_b64=b1,
    )
    resp = run_pipeline(req)

    assert resp.task_plan.task == "urban_change"
    assert resp.task_plan.use_changeformer is True
    assert resp.task_plan.use_building_seg is True
    assert "change_detection_agent" in resp.task_plan.required_agents
    assert "building_segmentation_agent" in resp.task_plan.required_agents

    # Agent outputs include both specialists
    agent_ids = [ao.agent_id for ao in resp.agent_outputs]
    assert "change_detection_agent" in agent_ids
    assert "building_segmentation_agent" in agent_ids


# ── TEST 3: Flood Query -> Flood evidence + Building Segmentation + S1 ─────────
def test_3_flood_impact_runs_flood_building_seg_and_sar_if_available():
    b0 = _make_s1_b64(32, 32, 0.08)
    b1 = _make_s1_b64(32, 32, 0.005)
    req = QueryRequest(
        question="How many buildings were affected by flooding?",
        image_b64=b0,
        image2_b64=b1,
    )
    resp = run_pipeline(req)

    assert resp.earthquery_spec.task_type == "flood_impact"
    assert resp.task_plan.use_spatial_intersection is True
    assert "sar_optical_agent" in resp.task_plan.required_agents


# ── TEST 4: Vegetation query -> Sentinel-2 NDVI, Building Seg does NOT run ──────
def test_4_vegetation_query_runs_ndvi_not_building_seg():
    b0 = _make_rgb_b64()
    req = QueryRequest(
        question="Where did vegetation decrease?",
        image_b64=b0,
    )
    resp = run_pipeline(req)

    assert resp.earthquery_spec.task_type == "vegetation_change"
    assert resp.task_plan.use_building_seg is False
    assert "building_segmentation_agent" not in resp.task_plan.required_agents
    assert "spectral_analysis_agent" in resp.task_plan.required_agents


# ── TEST 5: Cloudy temporal query -> Sentinel-1 prioritized ────────────────────
def test_5_cloudy_temporal_query_prioritizes_sentinel1():
    spec = compile_query("Assess flood impact across cloudy flooded area", has_two_images=True)
    # Simulate high cloud optical cap + Sentinel-1 SAR cap
    from backend.services.data_capability import DataCapability
    cap_opt = DataCapability(
        data_type="rgb", modality="optical", sensor="Optical High-Res",
        width=100, height=100, band_count=3, notes=[]
    )
    # mock cloud cover estimate
    setattr(cap_opt, "cloud_cover_estimate", 0.65)

    cap_sar = DataCapability(
        data_type="sentinel1", modality="sar", sensor="Sentinel-1 GRD",
        width=100, height=100, band_count=1, notes=[]
    )

    plan = create_plan(spec, cap1=cap_opt, cap2=cap_sar)
    assert plan.use_sar is True
    assert plan.sar_is_primary is True  # SAR leads due to cloud cover
    assert "sentinel-1" in plan.preferred_sensors


# ── TEST 6: RGB image + NDVI query -> Unsupported capability, never fake NDVI ──
def test_6_rgb_asking_ndvi_reports_unsupported():
    b0 = _make_rgb_b64()
    req = QueryRequest(question="Compute NDVI spectral vegetation index", image_b64=b0)
    resp = run_pipeline(req)

    # Check that spectral agent reported capability mismatch honestly
    spec_ao = next(ao for ao in resp.agent_outputs if ao.agent_id == "spectral_analysis_agent")
    assert spec_ao.result["analysis_status"] == "capability_mismatch"
    assert "NIR" in spec_ao.result["answer"]
    # Evidence must state unsupported/unavailable, never fabricated
    ev_record = normalize_agent_output(spec_ao)
    assert ev_record.status == "unsupported"


# ── TEST 7: Two models agree -> Consistent evidence state ──────────────────────
def test_7_two_models_agree_consistent_evidence():
    rec1 = EvidenceRecord(
        evidence_id="ev_cf",
        source="changeformer",
        task="change_detection",
        modality="optical",
        result_type="change_mask",
        input_data=["T0", "T1"],
        metrics={"change_percentage": 18.0},
        quality={"valid_pixel_ratio": 0.95},
        limitations=[],
    )
    rec2 = EvidenceRecord(
        evidence_id="ev_sar",
        source="sentinel1",
        task="sar_change",
        modality="sar",
        result_type="sar_evidence",
        input_data=["T0", "T1"],
        metrics={"evidence_percentage": 16.5},
        quality={"sar_snr": 1.5},
        limitations=[],
    )
    engine = EvidenceFusionEngine(task="change_detection")
    res = engine.evaluate_cross_modal_agreement([rec1, rec2])

    assert res["status"] == "consistent"
    assert res["agreement_score"] >= 0.80
    assert len(res["conflicts"]) == 0


# ── TEST 8: Two models strongly disagree -> Conflicting evidence & drop conf ───
def test_8_two_models_strongly_disagree_flags_conflicts():
    rec1 = EvidenceRecord(
        evidence_id="ev_cf",
        source="changeformer",
        task="change_detection",
        modality="optical",
        result_type="change_mask",
        input_data=["T0", "T1"],
        metrics={"change_percentage": 35.0},
        quality={"valid_pixel_ratio": 0.95},
        limitations=[],
    )
    rec2 = EvidenceRecord(
        evidence_id="ev_sar",
        source="sentinel1",
        task="sar_change",
        modality="sar",
        result_type="sar_evidence",
        input_data=["T0", "T1"],
        metrics={"evidence_percentage": 4.0},
        quality={"sar_snr": 1.5},
        limitations=[],
    )
    engine = EvidenceFusionEngine(task="change_detection")
    res = engine.evaluate_cross_modal_agreement([rec1, rec2])

    assert res["status"] == "conflicting"
    assert res["agreement_score"] < 0.60
    assert len(res["conflicts"]) > 0


# ── TEST 9: Missing Sentinel-1 -> Reported as unavailable, NOT as zero ─────────
def test_9_missing_sentinel1_reported_as_unavailable_not_zero():
    rec_sar = EvidenceRecord(
        evidence_id="ev_sar",
        source="sentinel1",
        task="sar_evidence",
        modality="sar",
        result_type="sar_evidence",
        input_data=["T0"],
        metrics={},
        quality={},
        limitations=["Sentinel-1 data not detected in supplied imagery."],
        status="unavailable",
    )
    assert rec_sar.status == "unavailable"
    assert "change_percentage" not in rec_sar.metrics or rec_sar.metrics.get("change_percentage") is None

    engine = EvidenceFusionEngine(task="flood_impact")
    fusion_res = engine.fuse([rec_sar])
    assert "sentinel1" in fusion_res["unavailable_sources"]
    assert any("unavailable" in detail.lower() for detail in fusion_res["insights"])


# ── TEST 10: Misaligned / Ungeoreferenced images -> Reports degraded confidence ─
def test_10_misaligned_or_ungeoreferenced_degrades_spatial_confidence():
    from backend.services.spatial_utils import check_spatial_compatibility
    comp = check_spatial_compatibility(
        shape1=(256, 256),
        shape2=(512, 512),
        crs1="EPSG:4326",
        crs2="EPSG:3857",
        res1=[10.0, -10.0],
        res2=[30.0, -30.0],
    )
    assert comp["spatial_confidence"] < 0.70
    assert len(comp["warnings"]) >= 2


# ── TEST 11: Invalid percentage > 100% -> Verification failure ─────────────────
def test_11_invalid_percentage_triggers_verification_failure():
    spec = EarthQuerySpec(
        intent="change_detection",
        task_type="change_detection",
        requires_two_images=True,
        confidence=0.90,
    )
    bad_output = AgentOutput(
        agent_id="mock_agent",
        agent_name="Mock Specialist",
        task="Change Detection",
        result={"change_percent": 145.0, "analysis_method": "mock"},
        raw_score=0.90,
    )
    v_res = verify(spec, [bad_output])
    assert v_res.status == "failed"
    assert not v_res.agreement
    assert any("valid range" in err.lower() or "exceeds" in err.lower() for err in v_res.errors)


# ── TEST 12: Affected buildings > Total buildings -> Verification failure ──────
def test_12_affected_buildings_exceeding_total_fails_verification():
    spec = EarthQuerySpec(
        intent="flood_impact",
        task_type="flood_impact",
        requires_two_images=True,
        confidence=0.90,
    )
    bad_impact_output = AgentOutput(
        agent_id="mock_impact_agent",
        agent_name="Mock Impact Specialist",
        task="Building Impact",
        result={
            "building_impact": {
                "total_buildings": 10,
                "affected_buildings": 25,  # Impossible!
                "affected_building_percentage": 250.0,
            }
        },
        raw_score=0.85,
    )
    v_res = verify(spec, [bad_impact_output])
    assert v_res.status == "failed"
    assert not v_res.agreement
    assert any("affected buildings (25) exceeds total buildings (10)" in err.lower() for err in v_res.errors)
