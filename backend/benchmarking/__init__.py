"""
SatQuery AI Benchmarking & Ground Truth Evaluation Framework.

Enables objective measurement of remote-sensing pipelines:
- Task-agnostic scientific metrics (IoU, Dice, Precision, Recall, F1, MAE, RMSE)
- Zero-NaN safe edge-case handling
- Sensor selection and capability constraint verification
- Confidence calibration (ECE) and failure taxonomy categorization
- Full auditability via machine-readable JSON/CSV and human-readable Markdown reports
"""
from backend.benchmarking.schemas import (
    BenchmarkCase,
    BenchmarkRunConfig,
    BenchmarkRunSummary,
    EvaluationResult,
    MetricResult,
    TaskType,
    GroundTruthType,
    FailureCategory,
    ConfidenceBucket,
    AblationConfig,
)
from backend.benchmarking.metrics import (
    compute_mask_metrics,
    compute_scalar_metrics,
    compute_count_metrics,
    compute_mae_rmse,
    compute_calibration_buckets,
)
from backend.benchmarking.ground_truth import (
    load_binary_mask_from_file,
    load_mask_from_base64,
    rasterize_polygons,
    normalize_ground_truth,
)
from backend.benchmarking.dataset_adapter import (
    BaseDatasetAdapter,
    LocalDirectoryAdapter,
    SyntheticBenchmarkAdapter,
)
from backend.benchmarking.evaluator import BenchmarkEvaluator
from backend.benchmarking.report_generator import BenchmarkReportGenerator
from backend.benchmarking.benchmark_runner import BenchmarkRunner

__all__ = [
    "BenchmarkCase",
    "BenchmarkRunConfig",
    "BenchmarkRunSummary",
    "EvaluationResult",
    "MetricResult",
    "TaskType",
    "GroundTruthType",
    "FailureCategory",
    "ConfidenceBucket",
    "AblationConfig",
    "compute_mask_metrics",
    "compute_scalar_metrics",
    "compute_count_metrics",
    "compute_mae_rmse",
    "compute_calibration_buckets",
    "load_binary_mask_from_file",
    "load_mask_from_base64",
    "rasterize_polygons",
    "normalize_ground_truth",
    "BaseDatasetAdapter",
    "LocalDirectoryAdapter",
    "SyntheticBenchmarkAdapter",
    "BenchmarkEvaluator",
    "BenchmarkReportGenerator",
    "BenchmarkRunner",
]
