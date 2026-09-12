"""
SAM / SAM2 Precision Segmentation Model Package - SatQuery AI.

Provides modular zero-shot and prompt-driven foundation segmentation,
downstream candidate boundary refinement, geometry extraction, and quality metrics.
"""
from backend.models.sam.adapter import (
    SegmentationModel,
    SAMAdapter,
    SAM2Adapter,
    SegmentationPrompt,
    SegmentationResult,
    get_segmentation_adapter,
)
from backend.models.sam.candidate_extractor import (
    CandidateRegion,
    extract_candidate_regions,
)
from backend.models.sam.geometry import (
    RefinementMetrics,
    compute_refinement_metrics,
    mask_to_polygons,
)
from backend.models.sam.cache import SegmentationCache, get_segmentation_cache

__all__ = [
    "SegmentationModel",
    "SAMAdapter",
    "SAM2Adapter",
    "SegmentationPrompt",
    "SegmentationResult",
    "get_segmentation_adapter",
    "CandidateRegion",
    "extract_candidate_regions",
    "RefinementMetrics",
    "compute_refinement_metrics",
    "mask_to_polygons",
    "SegmentationCache",
    "get_segmentation_cache",
]
