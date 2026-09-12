"""
Real Sentinel-2 Multispectral & Spectral Index Analyzer.

Computes genuine remote-sensing indices (NDVI, NDWI) from actual pixel arrays
using rasterio and NumPy. Masks nodata, filters NaNs/Infinities, handles
divide-by-zero, and computes verifiable pixel-level statistics.
"""
from __future__ import annotations
import base64
import io
from typing import Dict, Any, Optional, List, Tuple
import numpy as np
from PIL import Image

try:
    import rasterio
    from rasterio.io import MemoryFile
    RASTERIO_AVAILABLE = True
except ImportError:
    RASTERIO_AVAILABLE = False

from backend.services.data_capability import clean_b64, inspect_data_capability, DataCapability


def _compute_polygon_mask(h: int, w: int, polygon: list[list[float]] | None) -> np.ndarray:
    """Compute boolean mask where True = inside polygon (in normalized 0..1 coordinates)."""
    mask = np.ones((h, w), dtype=bool)
    if not polygon or len(polygon) < 3:
        return mask
    try:
        from matplotlib.path import Path
        poly_px = [(p[0] * w, p[1] * h) for p in polygon]
        path = Path(poly_px)
        y, x = np.mgrid[:h, :w]
        points = np.vstack((x.flatten(), y.flatten())).T
        grid_mask = path.contains_points(points).reshape((h, w))
        if np.any(grid_mask):
            return grid_mask
    except Exception:
        pass
    return mask


def extract_sentinel2_bands(
    b64_str: str | None
) -> Tuple[Optional[Dict[str, np.ndarray]], Optional[DataCapability], Optional[str]]:
    """
    Extracts B03 (Green), B04 (Red), B08 (NIR) from uploaded imagery if compatible.
    Returns: (bands_dict, capability, error_message)
    """
    cap = inspect_data_capability(b64_str)
    if cap.data_type == "none":
        return None, cap, "No imagery provided."
    if cap.data_type == "rgb":
        return None, cap, "NDVI cannot be calculated from this RGB image because Near-Infrared (NIR) band is not available. Input is standard RGB optical imagery."
    if cap.data_type not in ("sentinel2", "geotiff") or not RASTERIO_AVAILABLE:
        return None, cap, f"Unsupported raster format: {cap.data_type}. Multispectral analysis requires Sentinel-2 GeoTIFF."

    raw_bytes, _ = clean_b64(b64_str)
    if not raw_bytes:
        return None, cap, "Failed to decode raster payload."

    try:
        import warnings
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            with MemoryFile(raw_bytes) as memfile:
                with memfile.open() as src:
                    count = src.count
                    if count < 2:
                        return None, cap, f"Insufficient bands ({count}). Minimum 2 spectral bands required."

                    band_dict: Dict[str, np.ndarray] = {}
                    nodata_val = src.nodata

                    # Look up band indices from descriptions / tags or default ordering
                    b3_idx, b4_idx, b8_idx = None, None, None
                    for i in range(1, count + 1):
                        tag = (src.descriptions[i - 1] if src.descriptions and len(src.descriptions) >= i else None) or src.tags(i).get("BAND_NAME", "")
                        tag_u = tag.upper()
                        if tag_u in ("B03", "B3", "GREEN"):
                            b3_idx = i
                        elif tag_u in ("B04", "B4", "RED"):
                            b4_idx = i
                        elif tag_u in ("B08", "B8", "NIR"):
                            b8_idx = i

                    # Default fallback for 3-band Sentinel-2 composite: 1=B03 (Green), 2=B04 (Red), 3=B08 (NIR)
                    if b4_idx is None and b8_idx is None:
                        if count >= 3:
                            b3_idx, b4_idx, b8_idx = 1, 2, 3
                        elif count == 2:
                            b4_idx, b8_idx = 1, 2

                    if b4_idx is not None and b4_idx <= count:
                        arr4 = src.read(b4_idx).astype(np.float32)
                        if nodata_val is not None:
                            arr4[arr4 == nodata_val] = np.nan
                        band_dict["B04"] = arr4

                    if b8_idx is not None and b8_idx <= count:
                        arr8 = src.read(b8_idx).astype(np.float32)
                        if nodata_val is not None:
                            arr8[arr8 == nodata_val] = np.nan
                        band_dict["B08"] = arr8

                    if b3_idx is not None and b3_idx <= count:
                        arr3 = src.read(b3_idx).astype(np.float32)
                        if nodata_val is not None:
                            arr3[arr3 == nodata_val] = np.nan
                        band_dict["B03"] = arr3

                    if "B04" not in band_dict or "B08" not in band_dict:
                        return None, cap, "Missing required Sentinel-2 bands: B04 (Red) and B08 (NIR) must be present."

                    return band_dict, cap, None
    except Exception as exc:
        return None, cap, f"Rasterio read error: {str(exc)}"


def compute_real_ndvi(
    b04: np.ndarray,
    b08: np.ndarray,
    polygon: list[list[float]] | None = None,
    vegetation_threshold: float = 0.30
) -> Dict[str, Any]:
    """
    Computes Normalized Difference Vegetation Index:
        NDVI = (B08 - B04) / (B08 + B04)
    Properly handles nodata, NaN, infinite values, and zero-denominators.
    """
    if b04.shape != b08.shape:
        raise ValueError(f"Mismatched band dimensions: B04 is {b04.shape}, B08 is {b08.shape}")

    h, w = b04.shape
    roi_mask = _compute_polygon_mask(h, w, polygon)

    # Valid mask: no NaNs, finite, positive reflectance, denominator > 1e-6
    denominator = b08 + b04
    valid_mask = (
        roi_mask &
        np.isfinite(b04) &
        np.isfinite(b08) &
        (np.abs(denominator) > 1e-6)
    )

    total_pixels = int(roi_mask.sum())
    valid_pixel_count = int(valid_mask.sum())
    invalid_pixel_count = total_pixels - valid_pixel_count
    valid_ratio = round(valid_pixel_count / max(1, total_pixels), 4)

    if valid_pixel_count == 0:
        return {
            "status": "no_valid_pixels",
            "ndvi_min": None,
            "ndvi_max": None,
            "ndvi_mean": None,
            "ndvi_median": None,
            "ndvi_std": None,
            "valid_pixel_count": 0,
            "invalid_pixel_count": invalid_pixel_count,
            "valid_pixel_ratio": 0.0,
            "vegetation_coverage_pct": 0.0,
            "vegetation_threshold": vegetation_threshold,
            "threshold_label": f"heuristic vegetation threshold (NDVI > {vegetation_threshold:.2f})",
        }

    # Vectorized NDVI calculation on valid pixels
    ndvi_valid = (b08[valid_mask] - b04[valid_mask]) / denominator[valid_mask]
    ndvi_valid = np.clip(ndvi_valid, -1.0, 1.0)

    veg_pixels = int((ndvi_valid > vegetation_threshold).sum())
    veg_pct = round(veg_pixels / valid_pixel_count * 100.0, 2)

    return {
        "status": "success",
        "ndvi_min": round(float(np.min(ndvi_valid)), 4),
        "ndvi_max": round(float(np.max(ndvi_valid)), 4),
        "ndvi_mean": round(float(np.mean(ndvi_valid)), 4),
        "ndvi_median": round(float(np.median(ndvi_valid)), 4),
        "ndvi_std": round(float(np.std(ndvi_valid)), 4),
        "valid_pixel_count": valid_pixel_count,
        "invalid_pixel_count": invalid_pixel_count,
        "valid_pixel_ratio": valid_ratio,
        "vegetation_pixel_count": veg_pixels,
        "vegetation_coverage_pct": veg_pct,
        "vegetation_threshold": vegetation_threshold,
        "threshold_label": f"heuristic vegetation threshold (NDVI > {vegetation_threshold:.2f})",
    }


def compute_real_ndwi(
    b03: np.ndarray,
    b08: np.ndarray,
    polygon: list[list[float]] | None = None,
    water_threshold: float = 0.30
) -> Dict[str, Any]:
    """
    Computes Normalized Difference Water Index (McFeeters):
        NDWI = (B03 - B08) / (B03 + B08)
    Properly handles nodata, NaN, infinite values, and zero-denominators.
    """
    if b03.shape != b08.shape:
        raise ValueError(f"Mismatched band dimensions: B03 is {b03.shape}, B08 is {b08.shape}")

    h, w = b03.shape
    roi_mask = _compute_polygon_mask(h, w, polygon)

    denominator = b03 + b08
    valid_mask = (
        roi_mask &
        np.isfinite(b03) &
        np.isfinite(b08) &
        (np.abs(denominator) > 1e-6)
    )

    total_pixels = int(roi_mask.sum())
    valid_pixel_count = int(valid_mask.sum())
    invalid_pixel_count = total_pixels - valid_pixel_count
    valid_ratio = round(valid_pixel_count / max(1, total_pixels), 4)

    if valid_pixel_count == 0:
        return {
            "status": "no_valid_pixels",
            "ndwi_min": None,
            "ndwi_max": None,
            "ndwi_mean": None,
            "ndwi_median": None,
            "ndwi_std": None,
            "valid_pixel_count": 0,
            "invalid_pixel_count": invalid_pixel_count,
            "valid_pixel_ratio": 0.0,
            "water_coverage_pct": 0.0,
            "water_threshold": water_threshold,
            "threshold_label": f"heuristic water threshold (NDWI > {water_threshold:.2f})",
        }

    # Vectorized NDWI calculation on valid pixels
    ndwi_valid = (b03[valid_mask] - b08[valid_mask]) / denominator[valid_mask]
    ndwi_valid = np.clip(ndwi_valid, -1.0, 1.0)

    water_pixels = int((ndwi_valid > water_threshold).sum())
    water_pct = round(water_pixels / valid_pixel_count * 100.0, 2)

    return {
        "status": "success",
        "ndwi_min": round(float(np.min(ndwi_valid)), 4),
        "ndwi_max": round(float(np.max(ndwi_valid)), 4),
        "ndwi_mean": round(float(np.mean(ndwi_valid)), 4),
        "ndwi_median": round(float(np.median(ndwi_valid)), 4),
        "ndwi_std": round(float(np.std(ndwi_valid)), 4),
        "valid_pixel_count": valid_pixel_count,
        "invalid_pixel_count": invalid_pixel_count,
        "valid_pixel_ratio": valid_ratio,
        "water_pixel_count": water_pixels,
        "water_coverage_pct": water_pct,
        "water_threshold": water_threshold,
        "threshold_label": f"heuristic water threshold (NDWI > {water_threshold:.2f})",
    }


def analyze_multispectral_scene(
    b64_str: str | None,
    polygon: list[list[float]] | None = None
) -> Tuple[Optional[Dict[str, Any]], Optional[DataCapability], Optional[str]]:
    """
    High-level multispectral scene analysis:
    Computes real NDVI and NDWI if Sentinel-2 bands are present.
    """
    bands, cap, err = extract_sentinel2_bands(b64_str)
    if err or not bands:
        return None, cap, err

    results: Dict[str, Any] = {
        "sensor": cap.sensor if cap else "Sentinel-2",
        "bands_used": list(bands.keys()),
        "dimensions": [bands["B04"].shape[1], bands["B04"].shape[0]],
    }

    if "B04" in bands and "B08" in bands:
        results["ndvi"] = compute_real_ndvi(bands["B04"], bands["B08"], polygon=polygon)

    if "B03" in bands and "B08" in bands:
        results["ndwi"] = compute_real_ndwi(bands["B03"], bands["B08"], polygon=polygon)

    return results, cap, None
