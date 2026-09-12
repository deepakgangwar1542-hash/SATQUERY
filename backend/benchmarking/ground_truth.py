"""
Ground Truth Loader & Vector-to-Raster Converter for Benchmark Evaluation.

Supports:
- Raster loading from disk (PNG, JPEG, TIFF, GeoTIFF)
- Base64 encoded masks (API responses)
- NumPy arrays
- GeoJSON polygon rasterization with CRS and Affine transform preservation
"""
from __future__ import annotations
import base64
import io
import json
import logging
from pathlib import Path
from typing import Dict, Any, Optional, Union, List, Tuple
import numpy as np
from PIL import Image

try:
    import rasterio
    from rasterio import features
    from affine import Affine
    HAS_RASTERIO = True
except ImportError:
    HAS_RASTERIO = False

logger = logging.getLogger("SatQuery.BenchmarkGroundTruth")


def load_binary_mask_from_file(file_path: Union[str, Path], threshold: float = 0.5) -> Optional[np.ndarray]:
    """Loads an image file from disk and converts it to a 2D boolean mask."""
    p = Path(file_path)
    if not p.exists():
        logger.warning(f"Ground truth file not found: {p}")
        return None

    try:
        # Check if it's a GeoTIFF
        if p.suffix.lower() in (".tif", ".tiff") and HAS_RASTERIO:
            with rasterio.open(p) as src:
                arr = src.read(1)
                return (arr > threshold).astype(bool)
    except Exception as exc:
        logger.debug(f"Rasterio read failed for {p}, falling back to PIL: {exc}")

    try:
        img = Image.open(p).convert("L")
        arr = np.array(img, dtype=np.float32)
        # Handle 0-255 vs 0-1
        max_val = np.max(arr) if arr.size > 0 else 0
        thresh = threshold * 255.0 if max_val > 1.0 else threshold
        return (arr > thresh).astype(bool)
    except Exception as exc:
        logger.error(f"Failed to load mask image from {p}: {exc}")
        return None


def load_mask_from_base64(b64_str: str, threshold: float = 0.5) -> Optional[np.ndarray]:
    """Decodes a base64 encoded PNG mask into a 2D boolean numpy array."""
    if not b64_str:
        return None
    try:
        if "," in b64_str:
            b64_str = b64_str.split(",", 1)[1]
        raw_bytes = base64.b64decode(b64_str)
        img = Image.open(io.BytesIO(raw_bytes)).convert("L")
        arr = np.array(img, dtype=np.float32)
        thresh = threshold * 255.0 if np.max(arr) > 1.0 else threshold
        return (arr > thresh).astype(bool)
    except Exception as exc:
        logger.error(f"Failed to decode base64 mask: {exc}")
        return None


def rasterize_polygons(
    polygons: List[Any],
    shape: Tuple[int, int],
    transform: Optional[Any] = None,
    normalized: bool = False,
) -> np.ndarray:
    """
    Rasterizes vector polygons onto a 2D boolean mask.

    Args:
      polygons: List of GeoJSON geometries or list of coordinate pairs [[x1, y1], [x2, y2], ...]
      shape: (height, width) of target raster
      transform: Optional Affine transform for georeferenced polygons
      normalized: If True, coordinates are in normalized [0.0, 1.0] image space
    """
    h, w = shape
    mask = np.zeros((h, w), dtype=bool)
    if not polygons:
        return mask

    # Case 1: Normalized pixel coordinates [[x1, y1], [x2, y2], ...]
    if normalized or (isinstance(polygons[0], (list, tuple)) and isinstance(polygons[0][0], (int, float)) and 0.0 <= polygons[0][0] <= 1.0):
        from PIL import ImageDraw
        img = Image.new("1", (w, h), 0)
        draw = ImageDraw.Draw(img)
        for poly in polygons:
            if isinstance(poly, (list, tuple)) and len(poly) >= 3:
                pixel_coords = [(float(pt[0]) * w, float(pt[1]) * h) for pt in poly]
                draw.polygon(pixel_coords, outline=1, fill=1)
        return np.array(img, dtype=bool)

    # Case 2: Rasterio geometry features
    if HAS_RASTERIO:
        try:
            feats = []
            for p in polygons:
                if isinstance(p, dict) and "geometry" in p:
                    feats.append((p["geometry"], 1))
                elif isinstance(p, dict) and "coordinates" in p:
                    feats.append((p, 1))
                elif hasattr(p, "__geo_interface__"):
                    feats.append((p.__geo_interface__, 1))

            if feats:
                burned = features.rasterize(
                    shapes=feats,
                    out_shape=(h, w),
                    transform=transform or Affine.identity(),
                    fill=0,
                    default_value=1,
                    dtype=np.uint8,
                )
                return (burned > 0).astype(bool)
        except Exception as exc:
            logger.warning(f"Rasterio polygon burn failed: {exc}")

    return mask


def normalize_ground_truth(
    gt_input: Any,
    expected_shape: Optional[Tuple[int, int]] = None,
    threshold: float = 0.5,
) -> Optional[np.ndarray]:
    """
    Polymorphic normalizer that accepts file paths, raw arrays, or GeoJSON
    and produces a validated 2D boolean array.
    """
    if gt_input is None:
        return None

    if isinstance(gt_input, np.ndarray):
        arr = gt_input
        if arr.ndim == 3 and arr.shape[-1] in (1, 3, 4):
            arr = arr[..., 0]
        thresh = threshold * 255.0 if np.max(arr) > 1.0 else threshold
        mask = (arr > thresh).astype(bool)
        if expected_shape and mask.shape != expected_shape:
            pil_img = Image.fromarray(mask.astype(np.uint8))
            mask = np.array(pil_img.resize((expected_shape[1], expected_shape[0]), Image.NEAREST)).astype(bool)
        return mask

    if isinstance(gt_input, (str, Path)):
        s = str(gt_input)
        if s.startswith("data:image") or len(s) > 300:
            return load_mask_from_base64(s, threshold=threshold)
        return load_binary_mask_from_file(s, threshold=threshold)

    if isinstance(gt_input, list):
        # Polygons
        shape = expected_shape or (512, 512)
        return rasterize_polygons(gt_input, shape=shape, normalized=True)

    return None
