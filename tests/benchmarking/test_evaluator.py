"""
Unit tests for Task-Specific Benchmark Evaluators.
"""
import pytest
import numpy as np

from backend.benchmarking.schemas import BenchmarkCase, TaskType, GroundTruthType
from backend.benchmarking.evaluator import BenchmarkEvaluator
from backend.schemas.response import (
    QueryResponse, EarthQuerySpec, SensorSelection, AgentOutput,
    VerifierResult, VerifierCheck, ConfidenceBreakdown, ExecutionTrace
)
from backend.models.vlm.schemas import SemanticInterpretation


@pytest.fixture
def mock_response():
    spec = EarthQuerySpec(
        intent="Change detection",
        task_type="change_detection",
        requires_two_images=True,
        confidence=0.90,
    )
    sensor = SensorSelection(selected_sensor="Sentinel-2 Optical", rationale="Optimal optical temporal pair")
    verifier = VerifierResult(
        agreement=True, conflicts_found=[], replanned=False,
        final_answer="15.0% change detected", status="passed", checks=[]
    )
    conf = ConfidenceBreakdown(
        overall=0.88, task_classification=0.9, sensor_compatibility=0.9,
        model_output_quality=0.85, evidence_agreement=0.9, temporal_consistency=0.85,
        answer_groundedness=0.9, interpretation="high"
    )
    trace = ExecutionTrace(trace_id="tr_01", steps=[], total_duration_ms=120.0)

    # Change agent output with mock mask
    cf_mask = np.zeros((100, 100), dtype=bool)
    cf_mask[20:50, 20:50] = True
    ao = AgentOutput(
        agent_id="change_detection_agent",
        agent_name="ChangeFormer Specialist",
        task="Change Detection",
        result={"change_percent": 15.0},
        raw_score=0.88,
    )
    ao._raw_mask = cf_mask

    vlm = SemanticInterpretation(
        summary="15.0% change observed.",
        observations=["15.0% change detected."],
        interpretation=["Temporal land surface alteration."],
        conclusion="The evidence strongly supports 15.0% surface change.",
        evidence_used=["change_detection_agent"],
        contradictions=[],
        uncertainties=[],
        limitations=[],
        model_name="grounded_vlm",
        reasoning_mode="evidence_grounded",
    )

    return QueryResponse(
        query_id="q_mock_01",
        question="Detect change",
        earthquery_spec=spec,
        sensor_selection=sensor,
        agent_outputs=[ao],
        verifier_result=verifier,
        confidence_breakdown=conf,
        execution_trace=trace,
        answer="15.0% change detected.",
        report_url="/report/download/q_mock_01",
        semantic_interpretation=vlm,
    )


def test_evaluate_change_detection_case(mock_response):
    gt = np.zeros((100, 100), dtype=bool)
    gt[20:50, 20:50] = True

    case = BenchmarkCase(
        case_id="tc_change_01",
        task_type=TaskType.CHANGE_DETECTION,
        query="Detect change",
        input_images=[],
        expected_sensor="optical",
        ground_truth=gt,
        ground_truth_type=GroundTruthType.BINARY_MASK,
    )

    res = BenchmarkEvaluator.evaluate_case(case, mock_response)
    assert res.metrics.iou == 1.0
    assert res.metrics.f1 == 1.0
    assert res.sensor_selection_correct is True
    assert res.vlm_groundedness_tier == "Fully Grounded"
    assert res.failure_category.value == "none"


def test_evaluate_capability_enforcement_case(mock_response):
    # If the case expects rejection of calculation
    case = BenchmarkCase(
        case_id="tc_cap_01",
        task_type=TaskType.CAPABILITY_ENFORCEMENT,
        query="NDVI on RGB",
        input_images=[],
        expected_sensor="optical",
        ground_truth=None,
        ground_truth_type=GroundTruthType.SCALAR_VALUE,
        expected_outputs={"should_reject_calculation": False},  # mock_response didn't run spectral agent
    )

    res = BenchmarkEvaluator.evaluate_case(case, mock_response)
    assert res.capability_enforced_correctly is True
    assert res.failure_category.value == "none"


def test_vlm_groundedness_rubric(mock_response):
    score, tier = BenchmarkEvaluator.evaluate_vlm_groundedness(mock_response)
    assert score >= 0.90
    assert tier == "Fully Grounded"

    # Test failure override detection
    mock_response.verifier_result.status = "failed"
    mock_response.semantic_interpretation.conclusion = "The image clearly shows confirmed damage."
    bad_score, bad_tier = BenchmarkEvaluator.evaluate_vlm_groundedness(mock_response)
    assert bad_score < 0.60
