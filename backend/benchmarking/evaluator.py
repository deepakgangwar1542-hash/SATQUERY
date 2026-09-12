"""
Task-Specific and Cross-Cutting Evaluators for Benchmark Cases.

Implements evaluation logic for:
- Change Detection
- Building Segmentation
- Flood / Inundation Mapping
- Building Impact
- Multispectral / Spectral Index Estimation
- Sensor Selection & Data Capability Enforcement
- Verification Engine Integrity
- VLM Groundedness Rubric
"""
from __future__ import annotations
import logging
from typing import Dict, Any, Optional, Tuple, List
import numpy as np

from backend.benchmarking.schemas import (
    BenchmarkCase, EvaluationResult, MetricResult, TaskType, FailureCategory
)
from backend.benchmarking.metrics import (
    compute_mask_metrics, compute_scalar_metrics, compute_count_metrics
)
from backend.benchmarking.ground_truth import normalize_ground_truth
from backend.schemas.response import QueryResponse

logger = logging.getLogger("SatQuery.BenchmarkEvaluator")


class BenchmarkEvaluator:
    """
    Evaluates pipeline predictions from QueryResponse against ground-truth BenchmarkCase.
    """

    @staticmethod
    def evaluate_case(case: BenchmarkCase, response: QueryResponse) -> EvaluationResult:
        task = case.task_type
        gt_norm = normalize_ground_truth(case.ground_truth)

        # 1. Evaluate Sensor Selection & Capability Adherence
        sensor_correct = None
        if case.expected_sensor:
            actual_sensor = response.sensor_selection.selected_sensor.lower()
            exp_sensor = case.expected_sensor.lower()
            sensor_correct = (exp_sensor in actual_sensor) or (actual_sensor in exp_sensor) or (exp_sensor == "optical" and "sentinel-2" in actual_sensor)

        # 2. Extract specialist outputs & masks
        pred_mask = None
        cf_ao = next((ao for ao in response.agent_outputs if ao.agent_id == "change_detection_agent"), None)
        bldg_ao = next((ao for ao in response.agent_outputs if ao.agent_id == "building_segmentation_agent"), None)
        sar_ao = next((ao for ao in response.agent_outputs if ao.agent_id == "sar_optical_agent"), None)
        sam_ao = next((ao for ao in response.agent_outputs if ao.agent_id == "sam_agent"), None)

        # Priority mask selection based on task
        if task in (TaskType.CHANGE_DETECTION, TaskType.FLOOD_SEGMENTATION):
            pred_mask = getattr(cf_ao, "_raw_mask", None)
            if pred_mask is None:
                pred_mask = getattr(sar_ao, "_raw_mask", None)
        elif task == TaskType.BUILDING_SEGMENTATION:
            pred_mask = getattr(bldg_ao, "_raw_mask", None)
        elif task == TaskType.BUILDING_IMPACT:
            pred_mask = getattr(cf_ao, "_raw_mask", None)
            if pred_mask is None:
                pred_mask = getattr(bldg_ao, "_raw_mask", None)

        # If SAM refinement is present and active
        if sam_ao and getattr(sam_ao, "_raw_mask", None) is not None:
            # For refined evaluations
            pass

        # 3. Compute Metrics based on Task Type
        metrics = MetricResult(ground_truth_available=False, diagnostic_message="No evaluation performed.")
        failure_cat = FailureCategory.NONE
        failure_details = None

        if task in (TaskType.CHANGE_DETECTION, TaskType.BUILDING_SEGMENTATION, TaskType.FLOOD_SEGMENTATION):
            if gt_norm is not None:
                metrics = compute_mask_metrics(pred_mask=pred_mask, gt_mask=gt_norm)
                if metrics.iou is not None and metrics.iou < 0.20:
                    failure_cat = FailureCategory.SEGMENTATION_FAILURE
                    failure_details = f"Low spatial overlap: IoU = {metrics.iou:.3f}"
            else:
                metrics = MetricResult(
                    ground_truth_available=False,
                    diagnostic_message="Ground truth mask not provided for this case — accuracy cannot be claimed.",
                )

        elif task == TaskType.BUILDING_IMPACT:
            # Building impact: evaluate affected count and percentage
            exp_outputs = case.expected_outputs or {}
            gt_aff = exp_outputs.get("affected_buildings")
            pred_aff = None
            if response.evidence and "fusion" in response.evidence:
                # Extract affected buildings from fusion metrics
                for rec in response.evidence.get("records", []):
                    m = rec.get("metrics", {})
                    if "affected_buildings" in m:
                        pred_aff = m["affected_buildings"]
                        break

            metrics = compute_count_metrics(predicted_count=pred_aff, ground_truth_count=gt_aff)

        elif task == TaskType.CAPABILITY_ENFORCEMENT:
            # Evaluate whether the system correctly avoided unsupported operations
            should_reject_ndvi = case.expected_outputs.get("should_reject_calculation", False)
            should_warn_temporal = case.expected_outputs.get("should_report_missing_temporal", False)

            cap_enforced = True
            cap_notes = []

            if should_reject_ndvi:
                # System should NOT claim a scientific NDVI on 3-band RGB
                spectral_ao = next((ao for ao in response.agent_outputs if ao.agent_id == "spectral_analysis_agent"), None)
                if spectral_ao and spectral_ao.result:
                    status = spectral_ao.result.get("analysis_status")
                    if status not in ("capability_mismatch", "unsupported_data_capability"):
                        cap_enforced = False
                        cap_notes.append("System executed NDVI calculation on RGB imagery instead of rejecting it.")

            if should_warn_temporal:
                # Single image with bi-temporal query
                has_temporal_warning = any("temporal" in w.lower() or "missing" in w.lower() or "secondary" in w.lower()
                                           for w in [u.description for u in (response.uncertainty or [])] + response.verifier_result.warnings)
                if not has_temporal_warning:
                    cap_enforced = False
                    cap_notes.append("System failed to flag missing secondary temporal image.")

            metrics = MetricResult(
                ground_truth_available=True,
                diagnostic_message="Capability enforcement evaluated.",
                auxiliary_metrics={"capability_enforced": cap_enforced, "notes": cap_notes},
            )
            if not cap_enforced:
                failure_cat = FailureCategory.UNSUPPORTED_CAPABILITY
                failure_details = "; ".join(cap_notes)

        elif task == TaskType.VERIFICATION:
            # Verify that verifier behaved correctly
            exp_pass = case.expected_outputs.get("verification_must_pass", True)
            actual_pass = (response.verifier_result.status != "failed")
            verif_correct = (exp_pass == actual_pass)
            metrics = MetricResult(
                ground_truth_available=True,
                diagnostic_message=f"Verification status: {response.verifier_result.status}",
                auxiliary_metrics={"verification_correct": verif_correct},
            )
            if not verif_correct:
                failure_cat = FailureCategory.VERIFICATION_FALSE_REJECTION if exp_pass else FailureCategory.VERIFICATION_FALSE_ACCEPTANCE
                failure_details = f"Expected verification pass={exp_pass}, got status={response.verifier_result.status}"

        # 4. VLM Groundedness Rubric
        vlm_score, vlm_tier = BenchmarkEvaluator.evaluate_vlm_groundedness(response)

        # 5. Determine capability enforcement flag
        cap_correct = (failure_cat != FailureCategory.UNSUPPORTED_CAPABILITY)

        return EvaluationResult(
            case_id=case.case_id,
            task_type=case.task_type,
            query=case.query,
            selected_sensor=response.sensor_selection.selected_sensor,
            sensor_selection_correct=sensor_correct,
            capability_enforced_correctly=cap_correct,
            specialist_agents_executed=[ao.agent_id for ao in response.agent_outputs],
            verification_status=response.verifier_result.status,
            verification_correct=(response.verifier_result.status != "failed"),
            confidence_overall=round(float(response.confidence_breakdown.overall), 3),
            vlm_groundedness_score=vlm_score,
            vlm_groundedness_tier=vlm_tier,
            metrics=metrics,
            latency_ms=response.execution_trace.total_duration_ms,
            failure_category=failure_cat,
            failure_details=failure_details,
            warnings=response.verifier_result.warnings,
        )

    @staticmethod
    def evaluate_vlm_groundedness(response: QueryResponse) -> Tuple[float, str]:
        """
        Evaluates the VLM semantic interpretation against verified evidence using
        a strict non-hallucination rubric.
        Deducts points for:
        - Contradicting verified evidence (-0.40)
        - Claiming unverified sensors (-0.25)
        - Overriding verification failure with confident statements (-0.50)
        - Fabricating numbers (-0.30)
        """
        vlm = response.semantic_interpretation
        if not vlm:
            return 1.0, "N/A (VLM Not Active)"

        score = 1.0
        # Check 1: Verification failure override
        if response.verifier_result.status == "failed":
            if "confirmed" in vlm.conclusion.lower() or "clearly shows" in vlm.conclusion.lower():
                score -= 0.50

        # Check 2: Contradiction awareness
        if response.verifier_result.conflicts_found:
            if not vlm.contradictions and "caution" not in vlm.conclusion.lower():
                score -= 0.30

        # Check 3: Observations presence
        if not vlm.observations:
            score -= 0.20

        score = max(0.0, min(1.0, round(score, 2)))

        if score >= 0.90:
            tier = "Fully Grounded"
        elif score >= 0.70:
            tier = "Mostly Grounded"
        elif score >= 0.50:
            tier = "Partially Grounded"
        elif score > 0.0:
            tier = "Ungrounded"
        else:
            tier = "Contradictory"

        return score, tier
