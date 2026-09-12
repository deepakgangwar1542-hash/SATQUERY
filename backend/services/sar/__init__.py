"""
SatQuery AI — Sentinel-1 SAR Service Package.

Provides a modular, reusable Sentinel-1 C-band SAR analysis pipeline.

This package is task-agnostic. It does NOT specialise in flood detection.
Flood analysis is one downstream consumer of this package; urban change,
vegetation change, and general SAR change analysis are equally supported.

Modules:
  sentinel1_adapter  — load VV/VH polarisation bands from real GeoTIFF rasters
  sar_preprocessing  — NoData masking, dB conversion, normalisation, alignment
  sar_features       — general VV/VH feature extraction (statistics, ratios)
  sar_change         — temporal log-ratio SAR change analysis (general purpose)
  sar_analysis       — task-aware SAR analysis router
  sar_fusion         — generic multi-sensor SAR + optical evidence fusion
  benchmark          — IoU/F1 evaluation for any binary SAR-derived mask

Architecture principle:
  TASK-FIRST, not SENSOR-FIRST.
  The sensor (Sentinel-1 SAR) is selected because it is useful for the task —
  not the other way around.

All numerical outputs originate from actual raster computation.
No results are fabricated or hardcoded.
"""
from backend.services.sar.sentinel1_adapter import (
    load_sar_scene,
    SAR1Scene,
    SAR1LoadError,
    SUPPORTED_POLARIZATIONS,
)
from backend.services.sar.sar_preprocessing import (
    preprocess_sar_scene,
    SARPreprocessingResult,
    BandPreprocessed,
    align_sar_pair,
)
from backend.services.sar.sar_features import (
    extract_sar_features,
    SARFeatures,
)
from backend.services.sar.sar_change import (
    detect_sar_change,
    SARChangeResult,
)
from backend.services.sar.sar_analysis import (
    analyze_sar_for_task,
    SARAnalysisResult,
)
from backend.services.sar.sar_fusion import (
    fuse_sar_optical_evidence,
    SARFusionResult,
    FusionStrategy,
)
from backend.services.sar.benchmark import (
    evaluate_mask,
    MaskMetrics,
    compare_methods,
)

__all__ = [
    # Adapter
    "load_sar_scene", "SAR1Scene", "SAR1LoadError", "SUPPORTED_POLARIZATIONS",
    # Preprocessing
    "preprocess_sar_scene", "SARPreprocessingResult", "BandPreprocessed", "align_sar_pair",
    # Features
    "extract_sar_features", "SARFeatures",
    # Change
    "detect_sar_change", "SARChangeResult",
    # Task analysis
    "analyze_sar_for_task", "SARAnalysisResult",
    # Fusion
    "fuse_sar_optical_evidence", "SARFusionResult", "FusionStrategy",
    # Benchmark
    "evaluate_mask", "MaskMetrics", "compare_methods",
]
