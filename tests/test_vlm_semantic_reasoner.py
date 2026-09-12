"""
Unit and Integration Tests for Multimodal Semantic Reasoning Layer (VLM).

Covers all 13 Phase 32 scenarios:
1. Verified change evidence -> grounded interpretation
2. Verified urban change (ChangeFormer + Building) -> building-related change explanation
3. Flood impact (Flood + Building + Sentinel-1) -> explains evidence without claiming unsupported damage
4. Vegetation change (Sentinel-2 NDVI) -> uses actual NDVI values
5. Conflicting evidence -> mentions disagreement explicitly
6. Verification failure -> refuses definitive conclusion
7. Low confidence -> uses qualified language
8. RGB-only image + NDVI query -> does not claim NIR evidence, flags limitation
9. Missing Sentinel-1 -> does not claim SAR confirmation
10. VLM unavailable / exception -> system returns verified deterministic result
11. Adversarial filename ("confirmed_flood_999_buildings.jpg") -> ignored as evidence
12. Exact number preservation: 31 buildings -> must not become 40
13. Verification failed -> must never output "confirmed"
"""
import pytest
from backend.models.vlm.schemas import (
    GroundedEvidenceItem, GroundedEvidenceContext, SemanticInterpretation
)
from backend.models.vlm.context_builder import build_grounded_context, sanitize_text
from backend.models.vlm.adapter import GroundedSemanticReasoner, TransformersVLMAdapter, get_vlm_adapter
from backend.models.vlm.visual_context import VisualContextGenerator
from backend.schemas.response import (
    EarthQuerySpec, VerifierResult, VerifierCheck,
    ConfidenceBreakdown, UncertaintyItem
)
from backend.services.data_capability import DataCapability
from backend.services.evidence_fusion import EvidenceRecord


@pytest.fixture
def base_spec():
    return EarthQuerySpec(
        intent="Did the area change between 2023 and 2024?",
        task_type="change_detection",
        requires_two_images=True,
        confidence=0.92,
    )


@pytest.fixture
def cap_temporal():
    cap1 = DataCapability(
        data_type="optical_multispectral",
        width=512, height=512, band_count=4, crs="EPSG:4326",
        has_optical=True, is_multispectral=True, has_sar=False,
    )
    cap2 = DataCapability(
        data_type="optical_multispectral",
        width=512, height=512, band_count=4, crs="EPSG:4326",
        has_optical=True, is_multispectral=True, has_sar=False,
    )
    return cap1, cap2


@pytest.fixture
def default_confidence():
    return ConfidenceBreakdown(
        overall=0.88,
        task_classification=0.92,
        sensor_compatibility=0.95,
        model_output_quality=0.85,
        evidence_agreement=0.90,
        temporal_consistency=0.85,
        answer_groundedness=0.92,
        interpretation="high",
    )


# ── TEST 1: Verified change evidence produces grounded interpretation ────────
def test_1_verified_change_evidence(base_spec, cap_temporal, default_confidence):
    cap1, cap2 = cap_temporal
    cf_record = EvidenceRecord(
        evidence_id="ev_cf_01",
        source="changeformer",
        task="change_detection",
        modality="optical_bitemporal",
        result_type="change_mask",
        input_data=["T0", "T1"],
        metrics={"change_percentage": 17.8, "changed_pixel_count": 46600},
    )
    verifier = VerifierResult(
        agreement=True,
        conflicts_found=[],
        replanned=False,
        final_answer="Change detection: 17.8% of scene changed.",
        status="passed",
        checks=[VerifierCheck(name="percentage_bounds", status="passed", details="Valid bounds")],
    )

    ctx = build_grounded_context(
        spec=base_spec,
        cap1=cap1, cap2=cap2,
        evidence_records=[cf_record],
        verifier=verifier,
        confidence=default_confidence,
        uncertainties=[],
    )

    vlm = GroundedSemanticReasoner()
    res = vlm.generate_grounded_interpretation(ctx)

    assert "17.8%" in res.observations[0]
    assert any("17.8%" in o for o in res.observations)
    assert res.reasoning_mode == "evidence_grounded"
    assert "strongly supports" in res.conclusion


# ── TEST 2: Verified urban change: ChangeFormer + Building Segmentation ───────
def test_2_verified_urban_change(cap_temporal, default_confidence):
    spec = EarthQuerySpec(
        intent="Assess urban change and building impact",
        task_type="urban_change",
        requires_two_images=True,
        confidence=0.94,
    )
    cap1, cap2 = cap_temporal
    cf_record = EvidenceRecord(
        evidence_id="ev_cf_02",
        source="changeformer",
        task="urban_change",
        modality="optical_bitemporal",
        result_type="change_mask",
        input_data=["T0", "T1"],
        metrics={"change_percentage": 14.2},
    )
    bldg_record = EvidenceRecord(
        evidence_id="ev_bldg_02",
        source="building_segmentation",
        task="building_segmentation",
        modality="optical",
        result_type="building_mask",
        input_data=["T1"],
        metrics={"building_count": 142, "coverage_percentage": 18.5},
    )
    impact_record = EvidenceRecord(
        evidence_id="ev_impact_02",
        source="spatial_intersection",
        task="spatial_intersection",
        modality="geometric",
        result_type="spatial_intersection",
        input_data=["T0", "T1"],
        metrics={"affected_buildings": 31, "affected_building_percentage": 21.8},
    )
    verifier = VerifierResult(
        agreement=True,
        conflicts_found=[],
        replanned=False,
        final_answer="Urban change: 31 of 142 buildings affected.",
        status="passed",
        checks=[],
    )

    ctx = build_grounded_context(
        spec=spec, cap1=cap1, cap2=cap2,
        evidence_records=[cf_record, bldg_record, impact_record],
        verifier=verifier, confidence=default_confidence, uncertainties=[]
    )

    vlm = GroundedSemanticReasoner()
    res = vlm.generate_grounded_interpretation(ctx)

    obs_str = " ".join(res.observations)
    assert "142" in obs_str
    assert "31" in obs_str
    assert "14.2%" in obs_str
    assert any("building" in interp for interp in res.interpretation)
    assert "31" in res.conclusion


# ── TEST 3: Flood impact: Flood + Building + Sentinel-1 ───────────────────────
def test_3_flood_impact_no_unsupported_damage(default_confidence):
    spec = EarthQuerySpec(
        intent="What is the flood impact on structures?",
        task_type="flood_impact",
        requires_two_images=True,
        confidence=0.95,
    )
    sar_record = EvidenceRecord(
        evidence_id="ev_sar_03",
        source="sentinel1",
        task="flood_detection",
        modality="sar",
        result_type="sar_evidence",
        input_data=["T0", "T1"],
        metrics={"flood_detected": True, "flood_percentage": 12.5},
    )
    impact_record = EvidenceRecord(
        evidence_id="ev_impact_03",
        source="spatial_intersection",
        task="spatial_intersection",
        modality="geometric",
        result_type="spatial_intersection",
        input_data=["T0", "T1"],
        metrics={"affected_buildings": 23, "affected_building_percentage": 16.2},
    )
    verifier = VerifierResult(
        agreement=True, conflicts_found=[], replanned=False,
        final_answer="Flood hazard: 23 buildings inundated.", status="passed", checks=[]
    )

    ctx = build_grounded_context(
        spec=spec, cap1=None, cap2=None,
        evidence_records=[sar_record, impact_record],
        verifier=verifier, confidence=default_confidence, uncertainties=[]
    )

    vlm = GroundedSemanticReasoner()
    res = vlm.generate_grounded_interpretation(ctx)

    full_text = " ".join(res.observations + res.interpretation + [res.conclusion])
    assert "23" in full_text
    # Must explicitly state physical collapse cannot be determined without damage surveys
    assert any("collapse" in interp or "damage" in interp for interp in res.interpretation)


# ── TEST 4: Vegetation change Sentinel-2 NDVI ─────────────────────────────────
def test_4_vegetation_change_actual_ndvi(cap_temporal, default_confidence):
    spec = EarthQuerySpec(
        intent="How has vegetation changed?",
        task_type="vegetation_change",
        requires_two_images=True,
        confidence=0.91,
    )
    cap1, cap2 = cap_temporal
    veg_record = EvidenceRecord(
        evidence_id="ev_veg_04",
        source="sentinel2_agent",
        task="vegetation_change",
        modality="optical_multispectral",
        result_type="spectral_index",
        input_data=["T0", "T1"],
        metrics={"mean_ndvi": 0.412, "delta_ndvi": -0.210},
    )
    verifier = VerifierResult(
        agreement=True, conflicts_found=[], replanned=False,
        final_answer="Vegetation change: NDVI delta -0.210.", status="passed", checks=[]
    )

    ctx = build_grounded_context(
        spec=spec, cap1=cap1, cap2=cap2,
        evidence_records=[veg_record],
        verifier=verifier, confidence=default_confidence, uncertainties=[]
    )

    vlm = GroundedSemanticReasoner()
    res = vlm.generate_grounded_interpretation(ctx)

    full_obs = " ".join(res.observations)
    assert "-0.210" in full_obs
    assert "0.412" in full_obs
    assert any("negative" in interp.lower() or "loss" in interp.lower() for interp in res.interpretation)


# ── TEST 5: Conflicting evidence mentions disagreement ────────────────────────
def test_5_conflicting_evidence_acknowledged(cap_temporal, default_confidence):
    spec = EarthQuerySpec(
        intent="Verify surface change",
        task_type="change_detection",
        requires_two_images=True,
        confidence=0.85,
    )
    cap1, cap2 = cap_temporal
    cf_record = EvidenceRecord(
        evidence_id="ev_cf_05",
        source="changeformer",
        task="change_detection",
        modality="optical_bitemporal",
        result_type="change_mask",
        input_data=["T0", "T1"],
        metrics={"change_percentage": 19.5},
    )
    sar_record = EvidenceRecord(
        evidence_id="ev_sar_05",
        source="sentinel1",
        task="sar_change",
        modality="sar",
        result_type="sar_evidence",
        input_data=["T0", "T1"],
        metrics={"flood_detected": False, "sar_change_detected": False},
    )
    verifier = VerifierResult(
        agreement=False,
        conflicts_found=["Optical indicates 19.5% change but SAR backscatter shows no anomaly."],
        replanned=False,
        final_answer="Change detection: Optical detected change, SAR unconfirmed.",
        status="passed_with_warnings",
        checks=[],
    )

    ctx = build_grounded_context(
        spec=spec, cap1=cap1, cap2=cap2,
        evidence_records=[cf_record, sar_record],
        verifier=verifier, confidence=default_confidence, uncertainties=[]
    )

    vlm = GroundedSemanticReasoner()
    res = vlm.generate_grounded_interpretation(ctx)

    assert len(res.contradictions) > 0
    assert any("discrepancy" in c.lower() or "optical" in c.lower() for c in res.contradictions)
    assert "caution" in res.conclusion.lower()


# ── TEST 6: Verification failure refuses definitive conclusion ────────────────
def test_6_verification_failure_refuses_definitive_conclusion(base_spec, cap_temporal, default_confidence):
    cap1, cap2 = cap_temporal
    cf_record = EvidenceRecord(
        evidence_id="ev_cf_06",
        source="changeformer",
        task="change_detection",
        modality="optical_bitemporal",
        result_type="change_mask",
        input_data=["T0", "T1"],
        metrics={"change_percentage": 125.0},  # Invalid percentage > 100
    )
    verifier = VerifierResult(
        agreement=False,
        conflicts_found=["Percentage out of bounds: 125.0%"],
        replanned=False,
        final_answer="Verification FAILED: Critical physical or bounding sanity checks failed.",
        status="failed",
        checks=[VerifierCheck(name="percentage_bounds", status="failed", details="Value 125.0 > 100.0")],
    )

    ctx = build_grounded_context(
        spec=base_spec, cap1=cap1, cap2=cap2,
        evidence_records=[cf_record],
        verifier=verifier, confidence=default_confidence, uncertainties=[]
    )

    vlm = GroundedSemanticReasoner()
    res = vlm.generate_grounded_interpretation(ctx)

    assert "failed" in res.summary.lower() or "could not be reliably verified" in res.conclusion.lower()
    assert "definitive conclusion cannot be provided" in res.conclusion
    assert "confirmed" not in res.conclusion.lower()


# ── TEST 7: Low confidence uses qualified language ────────────────────────────
def test_7_low_confidence_qualified_language(base_spec, cap_temporal):
    cap1, cap2 = cap_temporal
    low_conf = ConfidenceBreakdown(
        overall=0.38,
        task_classification=0.50,
        sensor_compatibility=0.40,
        model_output_quality=0.35,
        evidence_agreement=0.45,
        temporal_consistency=0.30,
        answer_groundedness=0.40,
        interpretation="low",
    )
    cf_record = EvidenceRecord(
        evidence_id="ev_cf_07",
        source="changeformer",
        task="change_detection",
        modality="optical_bitemporal",
        result_type="change_mask",
        input_data=["T0", "T1"],
        metrics={"change_percentage": 6.2},
    )
    verifier = VerifierResult(
        agreement=True, conflicts_found=[], replanned=False,
        final_answer="Change detection: 6.2% change.", status="passed", checks=[]
    )

    ctx = build_grounded_context(
        spec=base_spec, cap1=cap1, cap2=cap2,
        evidence_records=[cf_record],
        verifier=verifier, confidence=low_conf, uncertainties=[]
    )

    vlm = GroundedSemanticReasoner()
    res = vlm.generate_grounded_interpretation(ctx)

    assert "indicates a possible" in res.conclusion.lower() or "insufficient" in res.conclusion.lower()
    assert "strongly supports" not in res.conclusion.lower()


# ── TEST 8: RGB-only image does not claim NIR evidence ────────────────────────
def test_8_rgb_only_flags_multispectral_limitation(default_confidence):
    spec = EarthQuerySpec(
        intent="Compute NDVI vegetation health",
        task_type="vegetation_change",
        requires_two_images=False,
        confidence=0.88,
    )
    cap_rgb = DataCapability(
        data_type="rgb_optical",
        width=512, height=512, band_count=3, crs=None,
        has_optical=True, is_multispectral=False, has_sar=False,
    )
    verifier = VerifierResult(
        agreement=True, conflicts_found=[], replanned=False,
        final_answer="Capability warning: RGB only.", status="passed_with_warnings", checks=[]
    )

    ctx = build_grounded_context(
        spec=spec, cap1=cap_rgb, cap2=None,
        evidence_records=[],
        verifier=verifier, confidence=default_confidence, uncertainties=[]
    )

    vlm = GroundedSemanticReasoner()
    res = vlm.generate_grounded_interpretation(ctx)

    assert any("visible-spectrum rgb only" in lim.lower() or "nir" in lim.lower() for lim in res.limitations)
    assert not any("nir confirms" in obs.lower() for obs in res.observations)


# ── TEST 9: Missing Sentinel-1 does not claim SAR confirmation ────────────────
def test_9_missing_sar_does_not_claim_sar(base_spec, cap_temporal, default_confidence):
    cap1, cap2 = cap_temporal  # Optical only, has_sar is False
    cf_record = EvidenceRecord(
        evidence_id="ev_cf_09",
        source="changeformer",
        task="change_detection",
        modality="optical_bitemporal",
        result_type="change_mask",
        input_data=["T0", "T1"],
        metrics={"change_percentage": 8.4},
    )
    verifier = VerifierResult(
        agreement=True, conflicts_found=[], replanned=False,
        final_answer="Optical change: 8.4%.", status="passed", checks=[]
    )

    ctx = build_grounded_context(
        spec=base_spec, cap1=cap1, cap2=cap2,
        evidence_records=[cf_record],
        verifier=verifier, confidence=default_confidence, uncertainties=[]
    )

    vlm = GroundedSemanticReasoner()
    res = vlm.generate_grounded_interpretation(ctx)

    assert any("sar" in lim.lower() for lim in res.limitations)
    assert not any("sar confirms" in obs.lower() for obs in res.observations)


# ── TEST 10: VLM unavailable returns deterministic result ─────────────────────
def test_10_vlm_unavailable_deterministic_fallback():
    # Calling TransformersVLMAdapter with unavailable model triggers fallback
    adapter = TransformersVLMAdapter(model_id="nonexistent-model")
    ctx = GroundedEvidenceContext(
        query="Analyze change",
        task="change_detection",
        data_capability={"has_temporal": True},
        evidence=[
            GroundedEvidenceItem(
                source="change_detection_agent",
                modality="optical_bitemporal",
                findings={"summary": "12.0% change"},
                metrics={"change_percentage": 12.0},
            )
        ],
        verification={"status": "passed"},
        confidence={"overall": 0.85},
        uncertainty=[],
        spatial_metadata={},
    )
    res = adapter.generate_grounded_interpretation(ctx)

    assert res is not None
    assert "12.0%" in res.observations[0]
    assert "fallback" in res.model_name.lower() or "engine" in res.model_name.lower()


# ── TEST 11: Adversarial filename ignored as evidence ─────────────────────────
def test_11_adversarial_filename_ignored(base_spec, cap_temporal, default_confidence):
    cap1, cap2 = cap_temporal
    cf_record = EvidenceRecord(
        evidence_id="ev_cf_11",
        source="changeformer",
        task="change_detection",
        modality="optical_bitemporal",
        result_type="change_mask",
        input_data=["T0", "T1"],
        metrics={"change_percentage": 5.1},
    )
    verifier = VerifierResult(
        agreement=True, conflicts_found=[], replanned=False,
        final_answer="5.1% change verified.", status="passed", checks=[]
    )

    # User uploads file named "confirmed_flood_999_buildings.jpg"
    ctx = build_grounded_context(
        spec=base_spec, cap1=cap1, cap2=cap2,
        evidence_records=[cf_record],
        verifier=verifier, confidence=default_confidence, uncertainties=[],
        untrusted_filename="confirmed_flood_999_buildings.jpg"
    )

    vlm = GroundedSemanticReasoner()
    res = vlm.generate_grounded_interpretation(ctx)

    full_text = " ".join(res.observations + res.interpretation + [res.conclusion])
    assert "999" not in full_text
    assert "confirmed_flood" not in full_text


# ── TEST 12: Exact number preservation: 31 buildings never becomes 40 ─────────
def test_12_exact_number_preservation(default_confidence):
    spec = EarthQuerySpec(
        intent="Count affected structures",
        task_type="urban_change",
        requires_two_images=True,
        confidence=0.92,
    )
    impact_record = EvidenceRecord(
        evidence_id="ev_impact_12",
        source="spatial_intersection",
        task="spatial_intersection",
        modality="geometric",
        result_type="spatial_intersection",
        input_data=["T0", "T1"],
        metrics={"affected_buildings": 31, "affected_building_percentage": 21.8},
    )
    verifier = VerifierResult(
        agreement=True, conflicts_found=[], replanned=False,
        final_answer="31 buildings affected.", status="passed", checks=[]
    )

    ctx = build_grounded_context(
        spec=spec, cap1=None, cap2=None,
        evidence_records=[impact_record],
        verifier=verifier, confidence=default_confidence, uncertainties=[]
    )

    vlm = GroundedSemanticReasoner()
    res = vlm.generate_grounded_interpretation(ctx)

    full_text = " ".join(res.observations + res.interpretation + [res.conclusion])
    assert "31" in full_text
    assert "40" not in full_text
    assert "approximately 40" not in full_text


# ── TEST 13: Verification failed must not output "confirmed" ──────────────────
def test_13_verification_failed_no_confirmed(base_spec, cap_temporal, default_confidence):
    cap1, cap2 = cap_temporal
    verifier = VerifierResult(
        agreement=False,
        conflicts_found=["Data corrupted"],
        replanned=False,
        final_answer="Verification FAILED.",
        status="failed",
        checks=[],
    )

    ctx = build_grounded_context(
        spec=base_spec, cap1=cap1, cap2=cap2,
        evidence_records=[],
        verifier=verifier, confidence=default_confidence, uncertainties=[]
    )

    vlm = GroundedSemanticReasoner()
    res = vlm.generate_grounded_interpretation(ctx)

    assert "confirmed" not in res.conclusion.lower()
    assert "could not be reliably verified" in res.conclusion.lower()
