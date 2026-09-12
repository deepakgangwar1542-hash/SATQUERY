"""
Normalization Layer — SatQuery AI.

Implements sensible normalization for satellite and aerial imagery.
Handles uint8 RGB, integer multispectral (e.g. Sentinel-2 DN 0-10000),
and floating point surface reflectance rasters.
Maintains clear separation between raw_data, preprocessed_data, and model_input.
"""
from __future__ import annotations
from typing import Tuple, Optional
import numpy as np


# Standard ImageNet normalization parameters widely used in satellite vision models
IMAGENET_MEAN = np.array([0.485, 0.456, 0.406], dtype=np.float32)
IMAGENET_STD = np.array([0.229, 0.224, 0.225], dtype=np.float32)


def to_preprocessed_float(arr: np.ndarray, data_type: str = "rgb") -> np.ndarray:
    """
    Converts raw array to clean float32 preprocessed data in natural scale.

    - uint8 RGB: scales [0..255] to [0.0..1.0]
    - 16-bit multispectral (e.g. Sentinel-2 L2A): scales [0..10000] to [0.0..1.0]
    - float: clips or passes through if already normalized
    """
    arr_f = arr.astype(np.float32)

    if arr.dtype == np.uint8 or data_type == "rgb":
        # Check if values exceed 1.0
        if np.nanmax(arr_f) > 1.5:
            arr_f = np.clip(arr_f / 255.0, 0.0, 1.0)
    elif arr.dtype in (np.uint16, np.int16) or data_type == "sentinel2":
        max_val = np.nanmax(arr_f)
        if max_val > 100.0:
            # Sentinel-2 surface reflectance DN is scaled by 10000
            arr_f = np.clip(arr_f / 10000.0, 0.0, 1.0)
        elif max_val > 1.5:
            arr_f = np.clip(arr_f / 255.0, 0.0, 1.0)
    elif np.issubdtype(arr.dtype, np.floating):
        max_val = np.nanmax(arr_f)
        if max_val > 2.0 and max_val <= 255.0:
            arr_f = np.clip(arr_f / 255.0, 0.0, 1.0)
        elif max_val > 255.0:
            arr_f = np.clip(arr_f / 10000.0, 0.0, 1.0)

    return arr_f


def normalize_for_model(
    arr: np.ndarray,
    method: str = "imagenet",
    channel_axis: int = -1,
) -> np.ndarray:
    """
    Normalizes preprocessed float [0, 1] imagery into model_input format.

    Supported methods:
      - 'imagenet': (x - mean) / std with standard ImageNet weights
      - 'zero_one': keeps in [0.0, 1.0]
      - 'minus_one_one': scales [0, 1] to [-1.0, 1.0]
    """
    # Ensure float in [0, 1]
    norm_arr = to_preprocessed_float(arr)

    if method == "zero_one":
        return norm_arr

    if method == "minus_one_one":
        return (norm_arr * 2.0) - 1.0

    if method == "imagenet":
        # Assumes 3 channels (RGB)
        if channel_axis == -1 and norm_arr.shape[-1] >= 3:
            res = norm_arr[:, :, :3].copy()
            res = (res - IMAGENET_MEAN) / IMAGENET_STD
            return res.astype(np.float32)
        elif channel_axis == 0 and norm_arr.shape[0] >= 3:
            res = norm_arr[:3, :, :].copy()
            for c in range(3):
                res[c] = (res[c] - IMAGENET_MEAN[c]) / IMAGENET_STD[c]
            return res.astype(np.float32)
        else:
            return norm_arr

    return norm_arr
