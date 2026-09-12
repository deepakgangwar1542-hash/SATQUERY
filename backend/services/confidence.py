"""
Confidence & Uncertainty Scorer — SatQuery AI.

Computes evidence-grounded confidence strictly from actual measurements:
  - Task classification certainty
  - Sensor-modality and spectral band compatibility
  - Model execution & evidence quality
  - Multi-agent evidence agreement and verifier status
  - Temporal pair consistency
  - Answer groundedness in real pixel measurements

Also generates explicit Uncertainty items (Part 28) identifying:
  - Cloud contamination
  - Cross-modal disagreement
  - Un-georeferenced pixel space
  - Missing sensor modalities
  - Low valid-pixel ratios
"""
from __future__ import annotations
from typing import List, Tuple
from backend.schemas.response import (
    EarthQuerySpec, SensorSelection, AgentOutput, VerifierResult,
    ConfidenceBreakdown, UncertaintyItem
)


def compute_confidence(
    spec: EarthQuerySpec,
    sensor: SensorSelection,
    agent_outputs: List[AgentOutput],
    verifier: VerifierResult,
) -> ConfidenceBreakdown:
    """
    Computes genuine multi-signal confidence in the reliability of the computed result.
    Does NOT assert real-world ground-truth accuracy or fabricate scientific truth.
    """
    # 1. Task classification certainty
    task_cls = min(1.0, max(0.1, spec.confidence))

    # 2. Sensor and data compatibility
    sensor_name = sensor.selected_sensor.lower()
    if "unsupported" in sensor_name or "no imagery" in sensor_name or "absent" in sensor_name:
        sensor_compat = 0.25
    elif sensor.fallback_considered:
        sensor_compat = 0.55
    elif "sentinel-1" in sensor_name and "sentinel-2" in sensor_name:
        sensor_compat = 0.98
    elif "sentinel-1" in sensor_name or "sar" in sensor_name:
        sensor_compat = 0.94
    elif "sentinel-2" in sensor_name:
        sensor_compat = 0.96
    else:
        sensor_compat = 0.88

    # 3. Model & execution quality (derived from genuine pixel analysis scores)
    valid_scores = [ao.raw_score for ao in agent_outputs if ao.error is None]
    if valid_scores:
        model_quality = sum(valid_scores) / len(valid_scores)
    else:
        model_quality = 0.15

    # 4. Evidence agreement (drops on verification failure or conflicts)
    if getattr(verifier, "status", "passed") == "failed":
        evidence_agreement = 0.20
    elif verifier.agreement:
        evidence_agreement = 0.95
    elif verifier.replanned:
        evidence_agreement = 0.50
    else:
        n_conflicts = len(verifier.conflicts_found)
        evidence_agreement = max(0.20, 0.90 - n_conflicts * 0.20)

    # 5. Temporal consistency
    if spec.requires_two_images:
        has_temporal_conflict = any("bi-temporal" in c.lower() for c in verifier.conflicts_found)
        if has_temporal_conflict:
            temporal_consistency = 0.25
        elif spec.temporal_context:
            temporal_consistency = 0.90
        else:
            temporal_consistency = 0.70
    else:
        temporal_consistency = 0.90

    # 6. Answer groundedness (grounded in actual analyzed pixels vs fallback)
    grounded_evidence = False
    for ao in agent_outputs:
        res = ao.result or {}
        if res.get("analysis_status") in ("insufficient_data", "capability_mismatch", "unsupported_data_capability"):
            grounded_evidence = False
            break
        if (
            res.get("spectral_metrics", {}).get("total_analyzed_pixels", 0) > 0
            or res.get("visual_metrics", {}).get("total_analyzed_pixels", 0) > 0
            or res.get("ndvi_statistics", {}).get("valid_pixel_count", 0) > 0
            or res.get("ndvi", {}).get("valid_pixel_count", 0) > 0
            or res.get("pixel_change_count", 0) > 0
            or res.get("building_count") is not None
            or res.get("sar_analysis", {}).get("success") is True
            or res.get("fusion", {}).get("success") is True
            or res.get("building_impact", {}).get("total_buildings", 0) > 0
            or res.get("refinement_metrics", {}).get("refined_pixel_count", 0) > 0
            or res.get("segmented_pixel_count", 0) > 0
        ):
            grounded_evidence = True

    answer_groundedness = 0.92 if grounded_evidence else 0.30

    # Overall: weighted harmonic mean
    weights = {
        "task_classification": 0.15,
        "sensor_compatibility": 0.20,
        "model_output_quality": 0.25,
        "evidence_agreement": 0.15,
        "temporal_consistency": 0.10,
        "answer_groundedness": 0.15,
    }
    components = {
        "task_classification": task_cls,
        "sensor_compatibility": sensor_compat,
        "model_output_quality": model_quality,
        "evidence_agreement": evidence_agreement,
        "temporal_consistency": temporal_consistency,
        "answer_groundedness": answer_groundedness,
    }

    denom = sum(weights[k] / (components[k] + 1e-9) for k in weights)
    overall = round(max(0.05, min(0.99, 1.0 / denom)), 2)

    # Human-readable interpretation & explanation
    if overall >= 0.85:
        interpretation = "high"
        explanation = "Multiple independent quality signals and evidence metrics agree with high confidence."
    elif overall >= 0.65:
        interpretation = "moderate"
        explanation = "Analysis executed successfully, but minor quality limitations or sensor compromises are present."
    else:
        interpretation = "low"
        explanation = "Significant uncertainty present due to missing modalities, data degradation, or evidence contradiction."

    return ConfidenceBreakdown(
        task_classification=round(task_cls, 2),
        sensor_compatibility=round(sensor_compat, 2),
        model_output_quality=round(model_quality, 2),
        evidence_agreement=round(evidence_agreement, 2),
        temporal_consistency=round(temporal_consistency, 2),
        answer_groundedness=round(answer_groundedness, 2),
        overall=overall,
        interpretation=interpretation,
        explanation=explanation,
    )


def compute_uncertainties(
    spec: EarthQuerySpec,
    sensor: SensorSelection,
    agent_outputs: List[AgentOutput],
    verifier: VerifierResult,
) -> List[UncertaintyItem]:
    """
    Identifies and structures all physical, sensor, and model uncertainties (Part 28).
    """
    uncertainties: List[UncertaintyItem] = []

    # 1. Cloud contamination
    cloud_est = sensor.cloud_cover_estimate or 0.0
    for ao in agent_outputs:
        c_imp = ao.result.get("quality", {}).get("cloud_impact", 0.0)
        cloud_est = max(cloud_est, c_imp)

    if cloud_est > 0.40:
        uncertainties.append(UncertaintyItem(
            type="cloud_contamination",
            severity="high",
            description=f"Severe optical cloud contamination ({cloud_est*100:.0f}%). Optical surface features may be obscured."
        ))
    elif cloud_est > 0.15:
        uncertainties.append(UncertaintyItem(
            type="cloud_contamination",
            severity="medium",
            description=f"Moderate cloud contamination ({cloud_est*100:.0f}%). Some optical pixels masked."
        ))

    # 2. Cross-modal / Multi-specialist disagreement
    for c in verifier.conflicts_found:
        if "disagreement" in c.lower() or "divergence" in c.lower():
            uncertainties.append(UncertaintyItem(
                type="cross_modal_disagreement",
                severity="medium",
                description=c
            ))

    # 3. Missing modality
    if spec.sensor_hint == "sar" and "sentinel-1" not in sensor.selected_sensor.lower():
        uncertainties.append(UncertaintyItem(
            type="missing_modality",
            severity="medium",
            description="SAR analysis requested but Sentinel-1 GRD imagery was not supplied."
        ))

    # 4. Lack of georeferencing
    for ao in agent_outputs:
        if any("pixel space" in lim.lower() or "un-georeferenced" in lim.lower() for lim in ao.result.get("limitations", [])):
            uncertainties.append(UncertaintyItem(
                type="lack_of_georeferencing",
                severity="low",
                description="Raster lacks geospatial CRS metadata; calculations conducted in pixel space."
            ))
            break

    # 5. Sanity check / Verification failure
    if getattr(verifier, "status", "passed") == "failed":
        uncertainties.append(UncertaintyItem(
            type="verification_failure",
            severity="critical",
            description="One or more physical sanity or capability checks failed during evidence verification."
        ))

    # 6. SAM / SAM2 Refinement Uncertainties (Phase 18)
    for ao in agent_outputs:
        res = ao.result or {}
        m = res.get("refinement_metrics", {})
        if m.get("expansion_drift"):
            uncertainties.append(UncertaintyItem(
                type="segmentation_expansion_drift",
                severity="medium",
                description=(
                    f"Refined boundary expanded significantly ({m.get('area_ratio', 1.0):.2f}x) "
                    "beyond triggering evidence. Over-segmentation risk."
                )
            ))
        if m.get("low_overlap"):
            uncertainties.append(UncertaintyItem(
                type="boundary_ambiguity",
                severity="medium",
                description="Refined boundary exhibits low spatial overlap with triggering candidate evidence."
            ))
        if m.get("collapse_drift") or m.get("empty_refined_mask"):
            uncertainties.append(UncertaintyItem(
                type="segmentation_collapse",
                severity="high",
                description="Refinement failed to identify clear boundaries, collapsing candidate regions."
            ))

    return uncertainties

