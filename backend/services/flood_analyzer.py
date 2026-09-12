"""
Temporal Flood Analysis Service — SatQuery AI.

Extracts verifiable water and flood inundation masks across bi-temporal satellite scenes.
Computes temporal hydrological transitions:
  - Newly Flooded (Flood Increase): Flood_T1 AND NOT Flood_T0
  - Receded Water (Flood Decrease): Flood_T0 AND NOT Flood_T1
  - Persistent Water: Flood_T0 AND Flood_T1
Vectorizes flood boundaries into Shapely MultiPolygons for spatial intersection.
"""
from __future__ import annotations
import logging
from typing import Dict, Any, Optional, Tuple, List
import numpy as np
from PIL import Image
from shapely.geometry import shape, MultiPolygon, Polygon
from shapely.ops import unary_union
import rasterio.features
from rasterio.transform import Affine

from backend.services.data_capability import inspect_data_capability
from backend.services.spectral_analyzer import extract_sentinel2_bands, compute_real_ndwi
from backend.services.cv_analyzer import compute_polygon_mask

logger = logging.getLogger("SatQuery.FloodAnalyzer")


class TemporalFloodResult:
    """Structured result of bi-temporal flood change analysis."""
    def __init__(
        self,
        success: bool,
        status: str,
        reason: Optional[str] = None,
        source: str = "optical_rgb_water_proxy",
        flood_mask_t0: Optional[np.ndarray] = None,
        flood_mask_t1: Optional[np.ndarray] = None,
        flood_increase_mask: Optional[np.ndarray] = None,
        flood_increase_geometry: Optional[Any] = None,  # Shapely Polygon / MultiPolygon
        flood_area_t0_px: int = 0,
        flood_area_t1_px: int = 0,
        flood_increase_px: int = 0,
        flood_decrease_px: int = 0,
        flood_stable_px: int = 0,
        total_valid_pixels: int = 0,
        flood_increase_pct: float = 0.0,
        flood_increase_area_km2: Optional[float] = None,
        metadata: Optional[Dict[str, Any]] = None,
    ):
        self.success = success
        self.status = status
        self.reason = reason
        self.source = source
        self.flood_mask_t0 = flood_mask_t0
        self.flood_mask_t1 = flood_mask_t1
        self.flood_increase_mask = flood_increase_mask
        self.flood_increase_geometry = flood_increase_geometry
        self.flood_area_t0_px = flood_area_t0_px
        self.flood_area_t1_px = flood_area_t1_px
        self.flood_increase_px = flood_increase_px
        self.flood_decrease_px = flood_decrease_px
        self.flood_stable_px = flood_stable_px
        self.total_valid_pixels = total_valid_pixels
        self.flood_increase_pct = flood_increase_pct
        self.flood_increase_area_km2 = flood_increase_area_km2
        self.metadata = metadata or {}

    def to_dict(self) -> Dict[str, Any]:
        return {
            "success": self.success,
            "status": self.status,
            "source": self.source,
            "flood_area_t0_px": self.flood_area_t0_px,
            "flood_area_t1_px": self.flood_area_t1_px,
            "flood_increase_px": self.flood_increase_px,
            "flood_decrease_px": self.flood_decrease_px,
            "flood_stable_px": self.flood_stable_px,
            "flood_increase_pct": self.flood_increase_pct,
            "flood_increase_area_km2": self.flood_increase_area_km2,
            "metadata": self.metadata,
        }


def extract_water_mask_from_array(arr: np.ndarray) -> np.ndarray:
    """Extracts optical water-appearance mask from RGB array."""
    if arr.ndim == 2:
        return np.zeros_like(arr, dtype=bool)

    # Scale to 0..255 if normalized
    if np.nanmax(arr) <= 1.5:
        a = (arr * 255.0).astype(np.float32)
    else:
        a = arr.astype(np.float32)

    r = a[:, :, 0]
    g = a[:, :, 1]
    b = a[:, :, 2]

    # Blue-dominant water or deep dark absorption
    is_water = ((b > r * 1.15) & (b > g * 0.95) & (r < 115)) | ((b > 30) & (r < 35) & (g < 50))
    return is_water


def vectorize_mask_to_geometry(
    binary_mask: np.ndarray,
    transform: Optional[List[float]] = None,
    crs: Optional[str] = None,
) -> Optional[Any]:
    """Converts a binary raster mask into a unified Shapely MultiPolygon."""
    if not np.any(binary_mask):
        return None

    aff = Affine(*transform[:6]) if transform is not None and len(transform) >= 6 else None
    polygons = []

    for geom_dict, val in rasterio.features.shapes(binary_mask.astype(np.int32)):
        if int(val) == 1:
            poly = shape(geom_dict)
            if not poly.is_valid:
                poly = poly.buffer(0)

            if aff is not None and crs is not None:
                from shapely import affinity
                poly = affinity.affine_transform(
                    poly,
                    [aff.a, aff.b, aff.d, aff.e, aff.c, aff.f]
                )
            polygons.append(poly)

    if not polygons:
        return None

    merged = unary_union(polygons)
    return merged


def analyze_temporal_flood(
    arr0: np.ndarray,
    arr1: np.ndarray,
    valid_mask: Optional[np.ndarray] = None,
    polygon: Optional[List[List[float]]] = None,
    transform: Optional[List[float]] = None,
    crs: Optional[str] = None,
    resolution: Optional[List[float]] = None,
    source_label: str = "optical_rgb_water_proxy",
) -> TemporalFloodResult:
    """
    Computes bi-temporal flood increase analysis between T0 and T1.
    """
    # Align dimensions if mismatched
    if arr0.shape[:2] != arr1.shape[:2]:
        target_h, target_w = arr1.shape[0], arr1.shape[1]
        pil0 = Image.fromarray(np.clip(arr0, 0, 255).astype(np.uint8))
        arr0 = np.array(pil0.resize((target_w, target_h), Image.Resampling.BILINEAR))

    h, w = arr1.shape[:2]
    total_px = h * w

    # Effective analysis mask
    eff_mask = np.ones((h, w), dtype=bool)
    if valid_mask is not None:
        if valid_mask.shape == (h, w):
            eff_mask &= valid_mask

    roi_applied = False
    if polygon and len(polygon) >= 3:
        roi_m = compute_polygon_mask(h, w, polygon)
        eff_mask &= roi_m
        roi_applied = True

    # Compute water masks at T0 and T1
    w0 = extract_water_mask_from_array(arr0) & eff_mask
    w1 = extract_water_mask_from_array(arr1) & eff_mask

    # Flood dynamics
    newly_flooded = w1 & ~w0  # Inundation Increase
    receded_water = w0 & ~w1  # Inundation Decrease
    stable_water = w0 & w1    # Persistent Water

    valid_count = max(1, int(np.sum(eff_mask)))
    inc_px = int(np.sum(newly_flooded))
    dec_px = int(np.sum(receded_water))
    stable_px = int(np.sum(stable_water))
    t0_px = int(np.sum(w0))
    t1_px = int(np.sum(w1))

    inc_pct = round((inc_px / valid_count) * 100.0, 2)

    # Real geographic area calculation if CRS & resolution exist
    inc_km2 = None
    if crs is not None and resolution and len(resolution) >= 2:
        px_area_m2 = abs(resolution[0] * resolution[1])
        inc_km2 = round((inc_px * px_area_m2) / 1_000_000.0, 3)

    # Vectorize flood increase mask into Shapely geometry
    flood_inc_geom = vectorize_mask_to_geometry(newly_flooded, transform=transform, crs=crs)

    return TemporalFloodResult(
        success=True,
        status="success",
        source=source_label,
        flood_mask_t0=w0,
        flood_mask_t1=w1,
        flood_increase_mask=newly_flooded,
        flood_increase_geometry=flood_inc_geom,
        flood_area_t0_px=t0_px,
        flood_area_t1_px=t1_px,
        flood_increase_px=inc_px,
        flood_decrease_px=dec_px,
        flood_stable_px=stable_px,
        total_valid_pixels=valid_count,
        flood_increase_pct=inc_pct,
        flood_increase_area_km2=inc_km2,
        metadata={
            "source": source_label,
            "georeferenced": crs is not None,
            "crs": crs,
            "roi_applied": roi_applied,
            "has_vector_geometry": flood_inc_geom is not None,
        },
    )
