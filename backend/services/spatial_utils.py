"""
Generic Spatial Utilities & Operations — SatQuery AI.

Provides task-agnostic geometric and raster operations:
  - Mask intersection, union, difference, IoU, and coverage ratios
  - Vector polygon footprint intersection with binary raster masks
  - Spatial compatibility checks (CRS, resolution, shape, extent)
  - Memory-safe raster array alignment & resampling

Completely decoupled from specific tasks (flood, urban, vegetation, etc.).
"""
from __future__ import annotations
import logging
from typing import List, Dict, Any, Optional, Tuple
import numpy as np
from PIL import Image
import shapely
from shapely.geometry import Polygon, MultiPolygon, shape
import rasterio.features
from rasterio.transform import Affine

logger = logging.getLogger("SatQuery.SpatialUtils")


def mask_intersection(mask_a: np.ndarray, mask_b: np.ndarray) -> np.ndarray:
    """Computes element-wise binary intersection (A ∩ B)."""
    if mask_a.shape != mask_b.shape:
        mask_a, mask_b, _ = align_masks(mask_a, mask_b)
    return (mask_a.astype(bool) & mask_b.astype(bool))


def mask_union(mask_a: np.ndarray, mask_b: np.ndarray) -> np.ndarray:
    """Computes element-wise binary union (A ∪ B)."""
    if mask_a.shape != mask_b.shape:
        mask_a, mask_b, _ = align_masks(mask_a, mask_b)
    return (mask_a.astype(bool) | mask_b.astype(bool))


def mask_difference(mask_a: np.ndarray, mask_b: np.ndarray) -> np.ndarray:
    """Computes element-wise binary difference (A \\ B)."""
    if mask_a.shape != mask_b.shape:
        mask_a, mask_b, _ = align_masks(mask_a, mask_b)
    return (mask_a.astype(bool) & (~mask_b.astype(bool)))


def mask_iou(mask_a: np.ndarray, mask_b: np.ndarray) -> float:
    """Computes Intersection-over-Union: |A ∩ B| / |A ∪ B|."""
    if mask_a.shape != mask_b.shape:
        mask_a, mask_b, _ = align_masks(mask_a, mask_b)
    a = mask_a.astype(bool)
    b = mask_b.astype(bool)
    inter = np.sum(a & b)
    union = np.sum(a | b)
    if union == 0:
        return 1.0 if inter == 0 else 0.0
    return float(inter / union)


def mask_overlap_ratio(source_mask: np.ndarray, target_mask: np.ndarray) -> float:
    """Computes coverage fraction: |Source ∩ Target| / max(1, |Source|)."""
    if source_mask.shape != target_mask.shape:
        source_mask, target_mask, _ = align_masks(source_mask, target_mask)
    src = source_mask.astype(bool)
    tgt = target_mask.astype(bool)
    src_cnt = np.sum(src)
    if src_cnt == 0:
        return 0.0
    return float(np.sum(src & tgt) / src_cnt)


def align_masks(
    mask_a: np.ndarray,
    mask_b: np.ndarray,
) -> Tuple[np.ndarray, np.ndarray, float]:
    """
    Ensures two 2D masks have matching dimensions via nearest-neighbor resizing.
    Returns: (aligned_a, aligned_b, alignment_quality [0.0 to 1.0])
    """
    if mask_a.shape == mask_b.shape:
        return mask_a.astype(bool), mask_b.astype(bool), 1.0

    ha, wa = mask_a.shape[:2]
    hb, wb = mask_b.shape[:2]
    target_h = max(ha, hb)
    target_w = max(wa, wb)

    im_a = Image.fromarray(mask_a.astype(np.uint8)).resize((target_w, target_h), Image.Resampling.NEAREST)
    im_b = Image.fromarray(mask_b.astype(np.uint8)).resize((target_w, target_h), Image.Resampling.NEAREST)

    scale_diff = abs(ha * wa - hb * wb) / max(1, max(ha * wa, hb * wb))
    alignment_quality = max(0.5, 1.0 - scale_diff * 0.5)

    return np.array(im_a, dtype=bool), np.array(im_b, dtype=bool), float(alignment_quality)


def check_spatial_compatibility(
    shape1: Tuple[int, int],
    shape2: Optional[Tuple[int, int]] = None,
    crs1: Optional[str] = None,
    crs2: Optional[str] = None,
    res1: Optional[List[float]] = None,
    res2: Optional[List[float]] = None,
) -> Dict[str, Any]:
    """
    Validates spatial compatibility between two rasters/masks.
    Reports compatibility status, spatial confidence, and any warnings.
    """
    is_compatible = True
    warnings = []
    confidence = 1.0

    if shape2 is not None and shape1 != shape2:
        warnings.append(f"Dimension mismatch: {shape1} vs {shape2}. Array resampling required.")
        confidence -= 0.15

    if crs1 or crs2:
        if crs1 and crs2:
            if crs1.lower() != crs2.lower():
                warnings.append(f"CRS mismatch: '{crs1}' vs '{crs2}'. Geographic transformation required.")
                confidence -= 0.25
        else:
            warnings.append("Partial georeferencing: only one raster contains CRS metadata.")
            confidence -= 0.10
    else:
        warnings.append("Un-georeferenced imagery: spatial operations performed in pixel space.")
        confidence -= 0.05

    if res1 and res2 and len(res1) >= 2 and len(res2) >= 2:
        r1 = abs(res1[0] * res1[1])
        r2 = abs(res2[0] * res2[1])
        if max(r1, r2) / max(1e-6, min(r1, r2)) > 1.5:
            warnings.append(f"Spatial resolution difference exceeds 50% ({res1} vs {res2}).")
            confidence -= 0.15

    confidence = round(max(0.10, min(1.0, confidence)), 2)
    return {
        "compatible": is_compatible,
        "spatial_confidence": confidence,
        "warnings": warnings,
        "georeferenced": bool(crs1 and crs2),
    }


def intersect_polygons_with_mask(
    polygons: List[Any],  # list of objects with .geometry or shapely Polygons
    mask: np.ndarray,
    overlap_threshold: float = 0.10,
    transform: Optional[List[float]] = None,
) -> Dict[str, Any]:
    """
    Computes rigorous geometric intersection between vector polygon footprints
    and an arbitrary 2D binary raster mask (e.g. flood, change, hazard, fire).

    Returns:
      - total_features: int
      - intersected_features: int
      - intersected_percentage: float
      - intersected_ids: List[str]
      - feature_records: List[Dict[str, Any]]
    """
    total = len(polygons)
    if total == 0:
        return {
            "total_features": 0,
            "intersected_features": 0,
            "intersected_percentage": 0.0,
            "intersected_ids": [],
            "feature_records": [],
            "overlap_threshold": overlap_threshold,
        }

    if mask is None or not np.any(mask):
        return {
            "total_features": total,
            "intersected_features": 0,
            "intersected_percentage": 0.0,
            "intersected_ids": [],
            "feature_records": [],
            "overlap_threshold": overlap_threshold,
        }

    # Vectorize mask if needed for Shapely intersection
    mask_bool = mask.astype(bool)
    h, w = mask_bool.shape[:2]

    # Convert binary mask into a unified Shapely MultiPolygon
    mask_shapes = []
    aff = Affine(*transform[:6]) if (transform and len(transform) >= 6) else Affine.identity()

    for geom_dict, val in rasterio.features.shapes(mask_bool.astype(np.uint8), transform=aff):
        if val == 1:
            try:
                poly = shape(geom_dict)
                if poly.is_valid and not poly.is_empty:
                    mask_shapes.append(poly)
                elif not poly.is_valid:
                    fixed = poly.buffer(0)
                    if fixed.is_valid and not fixed.is_empty:
                        mask_shapes.append(fixed)
            except Exception:
                continue

    if not mask_shapes:
        return {
            "total_features": total,
            "intersected_features": 0,
            "intersected_percentage": 0.0,
            "intersected_ids": [],
            "feature_records": [],
            "overlap_threshold": overlap_threshold,
        }

    unified_mask_geom = shapely.ops.unary_union(mask_shapes)
    if not unified_mask_geom.is_valid:
        unified_mask_geom = unified_mask_geom.buffer(0)

    intersected_ids = []
    records = []

    for idx, item in enumerate(polygons):
        feat_id = getattr(item, "building_id", str(idx))
        feat_geom = getattr(item, "geometry", item)

        if not isinstance(feat_geom, (Polygon, MultiPolygon)):
            continue
        if feat_geom.is_empty:
            continue

        try:
            inter = feat_geom.intersection(unified_mask_geom)
            inter_area = float(inter.area)
            feat_area = float(feat_geom.area)
            ratio = inter_area / max(1e-9, feat_area)
            is_hit = ratio >= overlap_threshold

            if is_hit:
                intersected_ids.append(feat_id)

            records.append({
                "feature_id": feat_id,
                "overlap_ratio": round(ratio, 4),
                "is_intersected": is_hit,
                "feature_area": round(feat_area, 2),
                "intersection_area": round(inter_area, 2),
            })
        except Exception:
            continue

    n_hit = len(intersected_ids)
    hit_pct = round((n_hit / max(1, total)) * 100.0, 2)

    return {
        "total_features": total,
        "intersected_features": n_hit,
        "intersected_percentage": hit_pct,
        "intersected_ids": intersected_ids,
        "feature_records": records,
        "overlap_threshold": overlap_threshold,
    }
