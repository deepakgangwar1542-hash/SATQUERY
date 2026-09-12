"""
Nodata & Invalid Pixel Masking Layer — SatQuery AI.

Ensures nodata values, NaNs, infinities, transparent alpha channels,
and corrupt raster regions are explicitly masked out and never contaminate
change detection statistics or model inference.
"""
from __future__ import annotations
from typing import Tuple, Optional
import numpy as np


def compute_valid_mask(
    arr: np.ndarray,
    nodata_val: Optional[float] = None,
    check_alpha: bool = True,
) -> Tuple[np.ndarray, int, int, float]:
    """
    Computes a boolean mask indicating valid pixels (True = valid, False = invalid).

    Handles:
      - Explicit raster nodata values (e.g. -9999, 0)
      - IEEE NaN and Inf floating point values
      - Alpha channel transparency (for RGBA arrays)

    Returns:
      (valid_mask, valid_pixel_count, invalid_pixel_count, valid_fraction)
    """
    if arr.ndim == 2:
        h, w = arr.shape
        c = 1
        flat_channels = [arr]
    elif arr.ndim == 3:
        h, w, c = arr.shape
        flat_channels = [arr[:, :, i] for i in range(min(c, 3))]
    else:
        raise ValueError(f"Array must be 2D or 3D, got ndim={arr.ndim}")

    valid = np.ones((h, w), dtype=bool)

    # 1. NaN and Inf filtering across channels
    for ch in flat_channels:
        if np.issubdtype(ch.dtype, np.floating):
            valid &= ~np.isnan(ch)
            valid &= ~np.isinf(ch)

    # 2. Explicit nodata filtering
    if nodata_val is not None:
        for ch in flat_channels:
            if np.isnan(nodata_val):
                valid &= ~np.isnan(ch)
            else:
                valid &= ~np.isclose(ch, nodata_val, atol=1e-5)

    # 3. Check alpha channel if 4 channels (RGBA)
    if check_alpha and arr.ndim == 3 and arr.shape[2] >= 4:
        alpha = arr[:, :, 3]
        if np.issubdtype(alpha.dtype, np.floating):
            valid &= (alpha > 0.05)
        else:
            valid &= (alpha > 10)

    total_pixels = h * w
    valid_count = int(np.sum(valid))
    invalid_count = total_pixels - valid_count
    valid_fraction = float(valid_count / max(1, total_pixels))

    return valid, valid_count, invalid_count, round(valid_fraction, 4)


def combine_valid_masks(
    mask0: np.ndarray,
    mask1: np.ndarray,
) -> Tuple[np.ndarray, int, int, float]:
    """
    Combines valid masks from T0 and T1.
    A pixel is valid for bi-temporal change detection only if it is valid in BOTH images.
    """
    if mask0.shape != mask1.shape:
        raise ValueError(f"Mask shapes must match: {mask0.shape} vs {mask1.shape}")

    combined = mask0 & mask1
    total_pixels = combined.size
    valid_count = int(np.sum(combined))
    invalid_count = total_pixels - valid_count
    valid_fraction = float(valid_count / max(1, total_pixels))

    return combined, valid_count, invalid_count, round(valid_fraction, 4)
