"""
Image Alignment Layer — SatQuery AI.

Ensures bi-temporal pairs share the identical spatial reference, resolution,
extent, and pixel grid.
Handles georeferenced rasters via CRS reprojection and affine transform resampling.
Handles standard RGB optical images via safe dimension matching while explicitly
declaring non-georeferenced status without pretending geographic accuracy.
"""
from __future__ import annotations
from typing import Optional, List, Dict, Any, Tuple
from pydantic import BaseModel, Field
import numpy as np
from PIL import Image

try:
    import rasterio
    from rasterio.warp import reproject, Resampling, calculate_default_transform
    RASTERIO_WARP_AVAILABLE = True
except ImportError:
    RASTERIO_WARP_AVAILABLE = False


class AlignedPair(BaseModel):
    width: int
    height: int
    channels: int
    georeferenced: bool = False
    crs: Optional[str] = None
    transform: Optional[List[float]] = None
    resolution: Optional[List[float]] = None
    method: str = "identical"
    notes: List[str] = Field(default_factory=list)


def align_image_arrays(
    arr0: np.ndarray,
    arr1: np.ndarray,
    crs0: Optional[str] = None,
    crs1: Optional[str] = None,
    transform0: Optional[List[float]] = None,
    transform1: Optional[List[float]] = None,
) -> Tuple[np.ndarray, np.ndarray, AlignedPair]:
    """
    Aligns arr0 (T0) and arr1 (T1) onto an identical pixel grid.

    If CRS and transforms are present for both and rasterio is available:
      Reprojects arr1 onto arr0's spatial grid using rasterio.warp.reproject.

    If geospatial metadata is absent:
      Performs safe bilinear dimension matching in screen/pixel space,
      marking georeferenced=False and explicitly documenting non-geographic status.
    """
    h0, w0 = arr0.shape[:2]
    h1, w1 = arr1.shape[:2]
    c0 = arr0.shape[2] if arr0.ndim == 3 else 1
    c1 = arr1.shape[2] if arr1.ndim == 3 else 1

    # 1. Check if both have genuine CRS metadata and rasterio warp is available
    if (
        RASTERIO_WARP_AVAILABLE
        and crs0 is not None
        and crs1 is not None
        and transform0 is not None
        and transform1 is not None
    ):
        try:
            from rasterio.transform import Affine
            aff0 = Affine(*transform0[:6])
            aff1 = Affine(*transform1[:6])

            # Reproject arr1 into grid of arr0
            dest_arr = np.zeros_like(arr0)
            # Reorder to (C, H, W) if 3D
            if arr1.ndim == 3:
                src_chans = np.moveaxis(arr1, -1, 0)
                dst_chans = np.zeros((c0, h0, w0), dtype=arr0.dtype)
                for ch_idx in range(min(c0, c1)):
                    reproject(
                        source=src_chans[ch_idx],
                        destination=dst_chans[ch_idx],
                        src_transform=aff1,
                        src_crs=crs1,
                        dst_transform=aff0,
                        dst_crs=crs0,
                        resampling=Resampling.bilinear,
                    )
                aligned1 = np.moveaxis(dst_chans, 0, -1)
            else:
                reproject(
                    source=arr1,
                    destination=dest_arr,
                    src_transform=aff1,
                    src_crs=crs1,
                    dst_transform=aff0,
                    dst_crs=crs0,
                    resampling=Resampling.bilinear,
                )
                aligned1 = dest_arr

            meta = AlignedPair(
                width=w0,
                height=h0,
                channels=c0,
                georeferenced=True,
                crs=crs0,
                transform=transform0,
                method="rasterio_georeferenced_reproject",
                notes=[
                    f"Geospatial reprojection performed to match T0 grid ({w0}x{h0} px).",
                    f"Target CRS: {crs0}.",
                    "Geospatial coordinates and affine transform preserved."
                ],
            )
            return arr0, aligned1, meta
        except Exception:
            # Fall back to pixel dimension matching if warp reprojection fails
            pass

    # 2. Standard pixel-space alignment (RGB or non-georeferenced)
    if (h0, w0) == (h1, w1):
        meta = AlignedPair(
            width=w0,
            height=h0,
            channels=c0,
            georeferenced=(crs0 is not None),
            crs=crs0,
            transform=transform0,
            method="identical_dimensions",
            notes=[
                "Images already have identical pixel dimensions.",
                "Non-georeferenced screen-space alignment." if not crs0 else f"CRS: {crs0}."
            ],
        )
        return arr0, arr1, meta

    # Safe dimension matching: resize to common grid (min of both dimensions to prevent upscaling blur)
    target_w = min(w0, w1)
    target_h = min(h0, h1)

    def _resize_arr(arr: np.ndarray, tw: int, th: int) -> np.ndarray:
        # Convert to uint8 or float image for PIL resize
        if arr.dtype == np.uint8:
            im = Image.fromarray(arr)
            im_resized = im.resize((tw, th), Image.Resampling.BILINEAR)
            return np.array(im_resized, dtype=np.uint8)
        else:
            # float array
            clipped = np.clip(arr, 0.0, 255.0) if np.nanmax(arr) > 1.5 else np.clip(arr * 255.0, 0.0, 255.0)
            im = Image.fromarray(clipped.astype(np.uint8))
            im_resized = im.resize((tw, th), Image.Resampling.BILINEAR)
            arr_res = np.array(im_resized, dtype=np.float32)
            if np.nanmax(arr) <= 1.5:
                arr_res /= 255.0
            return arr_res

    res_arr0 = _resize_arr(arr0, target_w, target_h)
    res_arr1 = _resize_arr(arr1, target_w, target_h)

    meta = AlignedPair(
        width=target_w,
        height=target_h,
        channels=c0,
        georeferenced=False,
        crs=None,
        transform=None,
        method="bilinear_dimension_matching",
        notes=[
            f"Images aligned to common resolution ({target_w}x{target_h} px) via bilinear resampling.",
            "Ordinary visual imagery without geospatial CRS. No geographic accuracy is claimed."
        ],
    )
    return res_arr0, res_arr1, meta
