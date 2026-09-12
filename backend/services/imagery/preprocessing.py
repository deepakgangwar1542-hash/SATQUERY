"""
Imagery Preprocessing Orchestrator — SatQuery AI.

Coordinates the complete Phase 1 preprocessing pipeline:
  1. Image Validation (single & temporal pair)
  2. Spatial Alignment (CRS reprojection or safe dimension matching)
  3. Nodata & Invalid Pixel Masking
  4. Sensible Normalization
  5. Cloud / Shadow Handling (transparently labelled, non-fabricated)
"""
from __future__ import annotations
from typing import Optional, Dict, Any, Tuple, List
from pydantic import BaseModel, Field
import numpy as np

from backend.services.imagery.validation import (
    validate_single_image, validate_temporal_pair, ImageValidationResult, TemporalValidationResult
)
from backend.services.imagery.alignment import align_image_arrays, AlignedPair
from backend.services.imagery.nodata import compute_valid_mask, combine_valid_masks
from backend.services.imagery.normalization import to_preprocessed_float, normalize_for_model
from backend.services.cv_analyzer import decode_image_b64


class CloudMaskResult(BaseModel):
    applied: bool = False
    method: str = "none"  # "none" | "heuristic_rgb"
    cloud_pixel_count: int = 0
    notes: List[str] = Field(default_factory=list)


class PreprocessingResult:
    """
    Structured outcome of the imagery preprocessing stage.
    Carries both serializable metadata and in-memory arrays for downstream models.
    """
    def __init__(
        self,
        success: bool,
        status: str,
        reason: Optional[str] = None,
        image_t0: Optional[Dict[str, Any]] = None,
        image_t1: Optional[Dict[str, Any]] = None,
        alignment: Optional[Dict[str, Any]] = None,
        valid_pixels: int = 0,
        invalid_pixels: int = 0,
        valid_fraction: float = 1.0,
        cloud_mask: Optional[CloudMaskResult] = None,
        aligned_t0: Optional[np.ndarray] = None,
        aligned_t1: Optional[np.ndarray] = None,
        valid_mask: Optional[np.ndarray] = None,
        notes: Optional[List[str]] = None,
    ):
        self.success = success
        self.status = status
        self.reason = reason
        self.image_t0 = image_t0 or {}
        self.image_t1 = image_t1 or {}
        self.alignment = alignment or {"performed": False, "method": "none"}
        self.valid_pixels = valid_pixels
        self.invalid_pixels = invalid_pixels
        self.valid_fraction = valid_fraction
        self.cloud_mask = cloud_mask or CloudMaskResult()
        self.aligned_t0 = aligned_t0
        self.aligned_t1 = aligned_t1
        self.valid_mask = valid_mask
        self.notes = notes or []

    def to_dict(self) -> Dict[str, Any]:
        """Returns JSON-serializable dictionary representation."""
        return {
            "success": self.success,
            "status": self.status,
            "reason": self.reason,
            "image_t0": self.image_t0,
            "image_t1": self.image_t1,
            "alignment": self.alignment,
            "valid_pixels": self.valid_pixels,
            "invalid_pixels": self.invalid_pixels,
            "valid_fraction": self.valid_fraction,
            "cloud_mask": self.cloud_mask.model_dump(),
            "notes": self.notes,
        }


def apply_cloud_mask_heuristic(
    arr: np.ndarray,
    method: str = "none",
) -> Tuple[np.ndarray, CloudMaskResult]:
    """
    Applies optional cloud masking abstraction.
    Does NOT claim uncalibrated RGB heuristics are scientifically validated cloud masks.
    """
    if method == "none":
        return np.zeros(arr.shape[:2], dtype=bool), CloudMaskResult(
            applied=False,
            method="none",
            cloud_pixel_count=0,
            notes=["Cloud masking disabled / not applied."],
        )

    if method == "heuristic_rgb":
        # Basic visual bright-white heuristic (high R, G, B with low color saturation)
        # Clearly labelled as unvalidated heuristic
        if arr.ndim == 3 and arr.shape[2] >= 3:
            r = arr[:, :, 0]
            g = arr[:, :, 1]
            b = arr[:, :, 2]
            # Max possible is either 255.0 or 1.0 depending on normalization
            is_scaled = np.nanmax(arr) <= 1.0
            thresh = 0.88 if is_scaled else 225.0
            diff_thresh = 0.08 if is_scaled else 20.0

            bright = (r > thresh) & (g > thresh) & (b > thresh)
            neutral = (np.abs(r - g) < diff_thresh) & (np.abs(g - b) < diff_thresh)
            cloud_heuristic = bright & neutral
            cloud_count = int(np.sum(cloud_heuristic))

            return cloud_heuristic, CloudMaskResult(
                applied=True,
                method="heuristic_rgb",
                cloud_pixel_count=cloud_count,
                notes=[
                    "Heuristic RGB optical brightness mask applied.",
                    "CAUTION: This is an uncalibrated optical proxy, not a scientific radiative transfer cloud mask."
                ],
            )

    return np.zeros(arr.shape[:2], dtype=bool), CloudMaskResult(
        applied=False,
        method="unknown",
        cloud_pixel_count=0,
        notes=[f"Unknown cloud mask method '{method}'; skipped."],
    )


def preprocess_temporal_pair(
    image0_b64: str | None,
    image1_b64: str | None,
    cloud_method: str = "none",
) -> PreprocessingResult:
    """
    Executes full temporal preprocessing pipeline:
      1. Validation: checks decodability, compatibility, CRS, formats.
      2. Pixel array extraction: decodes T0 and T1.
      3. Alignment: matches spatial grids (geospatial reprojection or pixel resizing).
      4. Nodata masking: isolates NaNs, Infinities, and explicit nodata values.
      5. Normalization: produces consistent float32 representations.
      6. Optional cloud masking heuristic.
    """
    # 1. Temporal validation
    val_res = validate_temporal_pair(image0_b64, image1_b64)
    if not val_res.compatible:
        return PreprocessingResult(
            success=False,
            status=val_res.status,
            reason=val_res.reason,
            image_t0=val_res.image_t0.model_dump() if val_res.image_t0 else None,
            image_t1=val_res.image_t1.model_dump() if val_res.image_t1 else None,
            notes=val_res.notes,
        )

    t0_meta = val_res.image_t0
    t1_meta = val_res.image_t1

    # 2. Decode pixel arrays
    arr0 = decode_image_b64(image0_b64)
    arr1 = decode_image_b64(image1_b64)

    if arr0 is None or arr1 is None:
        return PreprocessingResult(
            success=False,
            status="corrupt_data",
            reason="Raster decoding produced null array for one or both temporal images.",
            image_t0=t0_meta.model_dump() if t0_meta else None,
            image_t1=t1_meta.model_dump() if t1_meta else None,
            notes=["Array extraction failed."],
        )

    # 3. Spatial alignment
    arr0_aligned, arr1_aligned, align_meta = align_image_arrays(
        arr0=arr0,
        arr1=arr1,
        crs0=t0_meta.crs if t0_meta else None,
        crs1=t1_meta.crs if t1_meta else None,
        transform0=t0_meta.transform if t0_meta else None,
        transform1=t1_meta.transform if t1_meta else None,
    )

    # 4. Nodata and invalid pixel masking
    mask0, _, _, _ = compute_valid_mask(arr0_aligned, nodata_val=t0_meta.nodata if t0_meta else None)
    mask1, _, _, _ = compute_valid_mask(arr1_aligned, nodata_val=t1_meta.nodata if t1_meta else None)
    combined_valid, valid_count, invalid_count, valid_frac = combine_valid_masks(mask0, mask1)

    # 5. Optional cloud/shadow masking
    cloud_mask_0, c_meta0 = apply_cloud_mask_heuristic(arr0_aligned, method=cloud_method)
    cloud_mask_1, c_meta1 = apply_cloud_mask_heuristic(arr1_aligned, method=cloud_method)
    if c_meta0.applied or c_meta1.applied:
        # Exclude clouds from valid analysis
        combined_valid &= ~(cloud_mask_0 | cloud_mask_1)
        valid_count = int(np.sum(combined_valid))
        invalid_count = combined_valid.size - valid_count
        valid_frac = round(float(valid_count / max(1, combined_valid.size)), 4)
        c_meta = CloudMaskResult(
            applied=True,
            method=cloud_method,
            cloud_pixel_count=c_meta0.cloud_pixel_count + c_meta1.cloud_pixel_count,
            notes=c_meta0.notes,
        )
    else:
        c_meta = CloudMaskResult(applied=False, method="none")

    # 6. Preprocessed float arrays in [0.0, 1.0] natural scale
    norm_t0 = to_preprocessed_float(arr0_aligned)
    norm_t1 = to_preprocessed_float(arr1_aligned)

    all_notes = []
    if align_meta.notes:
        all_notes.extend(align_meta.notes)
    if c_meta.notes:
        all_notes.extend(c_meta.notes)

    return PreprocessingResult(
        success=True,
        status="success",
        image_t0={
            "width": t0_meta.width,
            "height": t0_meta.height,
            "channels": t0_meta.channels,
            "crs": t0_meta.crs,
            "resolution": t0_meta.resolution,
            "dtype": t0_meta.dtype,
        },
        image_t1={
            "width": t1_meta.width,
            "height": t1_meta.height,
            "channels": t1_meta.channels,
            "crs": t1_meta.crs,
            "resolution": t1_meta.resolution,
            "dtype": t1_meta.dtype,
        },
        alignment={
            "performed": align_meta.method != "identical_dimensions",
            "method": align_meta.method,
            "georeferenced": align_meta.georeferenced,
            "aligned_dimensions": [align_meta.width, align_meta.height],
        },
        valid_pixels=valid_count,
        invalid_pixels=invalid_count,
        valid_fraction=valid_frac,
        cloud_mask=c_meta,
        aligned_t0=norm_t0,
        aligned_t1=norm_t1,
        valid_mask=combined_valid,
        notes=all_notes,
    )
