"""
Pydantic schemas for the SatQuery AI Benchmarking and Ground Truth Evaluation Framework.
Provides strictly typed structures for benchmark cases, metrics, evaluations, ablations, and summaries.
"""
from __future__ import annotations
from enum import Enum
from typing import List, Dict, Any, Optional, Union
from pydantic import BaseModel, Field


class GroundTruthType(str, Enum):
    BINARY_MASK = "binary_mask"
    POLYGON_GEOJSON = "polygon_geojson"
    SCALAR_VALUE = "scalar_value"
    OBJECT_COUNT = "object_count"
    CATEGORICAL_LABEL = "categorical_label"
    MULTI_CLASS_MASK = "multi_class_mask"


class TaskType(str, Enum):
    CHANGE_DETECTION = "change_detection"
    BUILDING_SEGMENTATION = "building_segmentation"
    FLOOD_SEGMENTATION = "flood_segmentation"
    BUILDING_IMPACT = "building_impact"
    MULTISPECTRAL_ANALYSIS = "multispectral_analysis"
    SAR_ANALYSIS = "sar_analysis"
    SENSOR_SELECTION = "sensor_selection"
    CAPABILITY_ENFORCEMENT = "capability_enforcement"
    VERIFICATION = "verification"
    VLM_GROUNDEDNESS = "vlm_groundedness"
    END_TO_END = "end_to_end"


class FailureCategory(str, Enum):
    NONE = "none"
    INSUFFICIENT_DATA = "insufficient_data"
    SENSOR_MISMATCH = "sensor_mismatch"
    UNSUPPORTED_CAPABILITY = "unsupported_capability"
    CLOUD_SHADOW_INTERFERENCE = "cloud_shadow_interference"
    TEMPORAL_MISALIGNMENT = "temporal_misalignment"
    SEGMENTATION_FAILURE = "segmentation_failure"
    THRESHOLD_FAILURE = "threshold_failure"
    MODEL_EXECUTION_FAILURE = "model_execution_failure"
    VERIFICATION_FALSE_REJECTION = "verification_false_rejection"
    VERIFICATION_FALSE_ACCEPTANCE = "verification_false_acceptance"
    VLM_GROUNDING_FAILURE = "vlm_grounding_failure"
    UNKNOWN_ERROR = "unknown_error"


class BenchmarkCase(BaseModel):
    """
    Standardized, task-agnostic definition of an empirical benchmark sample.
    """
    case_id: str = Field(..., description="Unique case identifier")
    task_type: TaskType = Field(..., description="Target remote-sensing task")
    query: str = Field(..., description="Natural language user query")
    input_images: List[str] = Field(default_factory=list, description="File paths or base64 data for primary (and secondary) imagery")
    expected_sensor: Optional[str] = Field(None, description="Expected optimal sensor/modality (e.g., optical, sar, sentinel2)")
    expected_capabilities: Dict[str, Any] = Field(default_factory=dict, description="Required data capabilities (e.g., is_multispectral, has_sar)")
    ground_truth: Optional[Any] = Field(None, description="File path, raster array, GeoJSON, or scalar value of empirical ground truth")
    ground_truth_type: GroundTruthType = Field(default=GroundTruthType.BINARY_MASK, description="Format of ground truth reference")
    expected_outputs: Dict[str, Any] = Field(default_factory=dict, description="Expected values, bounds, or categorical labels")
    polygon: Optional[List[List[float]]] = Field(None, description="Optional normalized ROI polygon")
    dataset_name: str = Field(default="custom", description="Source benchmark dataset name")
    dataset_version: str = Field(default="1.0.0", description="Dataset version identifier")
    split: str = Field(default="test", description="Dataset split (train/val/test)")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Auxiliary geospatial or acquisition metadata")


class MetricResult(BaseModel):
    """
    Scientific metric outcomes with zero-NaN safety and complete diagnostics.
    """
    iou: Optional[float] = Field(None, description="Intersection over Union [0.0, 1.0]")
    dice: Optional[float] = Field(None, description="Dice coefficient / F1 [0.0, 1.0]")
    precision: Optional[float] = Field(None, description="Precision [0.0, 1.0]")
    recall: Optional[float] = Field(None, description="Recall [0.0, 1.0]")
    f1: Optional[float] = Field(None, description="F1 Score [0.0, 1.0]")
    overall_accuracy: Optional[float] = Field(None, description="Pixel overall accuracy [0.0, 1.0]")
    true_positive: Optional[int] = Field(None, description="True positive pixel or object count")
    false_positive: Optional[int] = Field(None, description="False positive pixel or object count")
    false_negative: Optional[int] = Field(None, description="False negative pixel or object count")
    true_negative: Optional[int] = Field(None, description="True negative pixel count")
    absolute_error: Optional[float] = Field(None, description="Absolute difference between pred and GT")
    relative_error: Optional[float] = Field(None, description="Relative difference (|pred - gt| / gt)")
    count_error: Optional[int] = Field(None, description="Absolute difference in detected object counts")
    ground_truth_available: bool = Field(default=True, description="Whether empirical ground truth was available")
    diagnostic_message: Optional[str] = Field(None, description="Explanation or edge case description")
    auxiliary_metrics: Dict[str, Any] = Field(default_factory=dict, description="Task-specific auxiliary metrics")


class AblationConfig(BaseModel):
    """
    Feature ablation flags to determine component-level contribution.
    """
    use_changeformer: bool = True
    use_building_seg: bool = True
    use_sam_refinement: bool = True
    use_evidence_fusion: bool = True
    use_verification: bool = True
    use_vlm_reasoning: bool = True


class BenchmarkRunConfig(BaseModel):
    """
    Configuration for an entire benchmark evaluation run.
    """
    name: str = Field(default="satquery_benchmark_run", description="Benchmark run identifier")
    seed: int = Field(default=42, description="Random seed for reproducibility")
    tasks: List[TaskType] = Field(default_factory=list, description="List of tasks to evaluate")
    datasets: List[Dict[str, Any]] = Field(default_factory=list, description="Datasets and splits configured")
    ablation: AblationConfig = Field(default_factory=AblationConfig, description="Ablation configuration")
    output_dir: str = Field(default="./benchmark_results", description="Directory to store evaluation outputs")
    generate_visualizations: bool = Field(default=True, description="Whether to produce comparison image artifacts")
    max_cases_per_task: Optional[int] = Field(None, description="Cap on cases to evaluate per task (useful for quick CI)")


class EvaluationResult(BaseModel):
    """
    Result of evaluating an individual benchmark case.
    """
    case_id: str
    task_type: TaskType
    query: str
    selected_sensor: Optional[str] = None
    sensor_selection_correct: Optional[bool] = None
    capability_enforced_correctly: Optional[bool] = None
    specialist_agents_executed: List[str] = Field(default_factory=list)
    verification_status: Optional[str] = None
    verification_correct: Optional[bool] = None
    confidence_overall: Optional[float] = None
    vlm_groundedness_score: Optional[float] = None
    vlm_groundedness_tier: Optional[str] = None
    metrics: MetricResult
    latency_ms: float = 0.0
    failure_category: FailureCategory = FailureCategory.NONE
    failure_details: Optional[str] = None
    warnings: List[str] = Field(default_factory=list)
    visual_artifact_path: Optional[str] = None


class ConfidenceBucket(BaseModel):
    """
    Empirical calibration bucket: bin range vs observed success/accuracy.
    """
    bin_range: str = Field(..., description="e.g. '0.8-1.0'")
    sample_count: int = 0
    average_confidence: float = 0.0
    average_accuracy: float = 0.0
    calibration_gap: float = 0.0


class BenchmarkRunSummary(BaseModel):
    """
    Comprehensive aggregated summary of an entire benchmark evaluation.
    """
    run_id: str
    name: str
    timestamp: str
    software_version: str = "1.0.0"
    hardware_info: Dict[str, Any] = Field(default_factory=dict)
    total_cases: int = 0
    evaluated_cases: int = 0
    ground_truth_cases: int = 0
    successful_cases: int = 0
    failed_cases: int = 0
    mean_iou: Optional[float] = None
    mean_dice: Optional[float] = None
    mean_precision: Optional[float] = None
    mean_recall: Optional[float] = None
    sensor_selection_accuracy: Optional[float] = None
    unsupported_rejection_rate: Optional[float] = None
    verification_detection_rate: Optional[float] = None
    expected_calibration_error: Optional[float] = None
    confidence_buckets: List[ConfidenceBucket] = Field(default_factory=list)
    task_breakdown: Dict[str, Dict[str, Any]] = Field(default_factory=dict)
    failure_taxonomy: Dict[str, int] = Field(default_factory=dict)
    mean_latency_ms: float = 0.0
    ablation_config: Dict[str, Any] = Field(default_factory=dict)
