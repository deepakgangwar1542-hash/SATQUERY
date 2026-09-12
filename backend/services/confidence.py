"""
Confidence Scorer — Computes evidence-grounded 6-component confidence breakdown.

Calculates confidence strictly from measurable factors:
  - Task classification certainty
  - Sensor-modality and spectral band compatibility
  - Valid pixel ratio and data completeness
  - Multi-agent evidence agreement and verifier status
  - Temporal pair consistency
  - Answer groundedness in real pixel measurements
"""
from __future__ import annotations
from typing import List
from backend.schemas.response import (
    EarthQuerySpec, SensorSelection, AgentOutput, VerifierResult, ConfidenceBreakdown
)


def compute_confidence(
    spec: EarthQuerySpec,
    sensor: SensorSelection,
    agent_outputs: List[AgentOutput],
    verifier: VerifierResult,
) -> ConfidenceBreakdown:
    # 1. Task classification certainty
    task_cls = min(1.0, max(0.1, spec.confidence))

    # 2. Sensor and data compatibility
    sensor_name = sensor.selected_sensor.lower()
    if "unsupported" in sensor_name or "no imagery" in sensor_name or "absent" in sensor_name:
        sensor_compat = 0.25
    elif sensor.fallback_considered:
        sensor_compat = 0.55
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

    # 4. Evidence agreement
    if verifier.agreement:
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
        res = ao.result
        if res.get("analysis_status") in ("insufficient_data", "capability_mismatch"):
            grounded_evidence = False
            break
        if (
            res.get("spectral_metrics", {}).get("total_analyzed_pixels", 0) > 0
            or res.get("visual_metrics", {}).get("total_analyzed_pixels", 0) > 0
            or res.get("ndvi_statistics", {}).get("valid_pixel_count", 0) > 0
            or res.get("pixel_change_count", 0) > 0
            or res.get("num_objects_detected", 0) > 0
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
    overall = sum(weights.values()) / denom

    return ConfidenceBreakdown(
        task_classification=round(task_cls, 3),
        sensor_compatibility=round(sensor_compat, 3),
        model_output_quality=round(model_quality, 3),
        evidence_agreement=round(evidence_agreement, 3),
        temporal_consistency=round(temporal_consistency, 3),
        answer_groundedness=round(answer_groundedness, 3),
        overall=round(min(1.0, max(0.05, overall)), 3),
    )
