"""
SatQuery AI — Imagery Preprocessing Package.

Provides robust validation, alignment, nodata masking, and normalization
for remote sensing satellite and aerial imagery.
"""
from backend.services.imagery.validation import (
    validate_single_image,
    validate_temporal_pair,
    ImageValidationResult,
    TemporalValidationResult,
)
from backend.services.imagery.alignment import (
    align_image_arrays,
    AlignedPair,
)
from backend.services.imagery.nodata import (
    compute_valid_mask,
    combine_valid_masks,
)
from backend.services.imagery.normalization import (
    to_preprocessed_float,
    normalize_for_model,
)
from backend.services.imagery.preprocessing import (
    preprocess_temporal_pair,
    PreprocessingResult,
    CloudMaskResult,
)

__all__ = [
    "validate_single_image",
    "validate_temporal_pair",
    "ImageValidationResult",
    "TemporalValidationResult",
    "align_image_arrays",
    "AlignedPair",
    "compute_valid_mask",
    "combine_valid_masks",
    "to_preprocessed_float",
    "normalize_for_model",
    "preprocess_temporal_pair",
    "PreprocessingResult",
    "CloudMaskResult",
]
