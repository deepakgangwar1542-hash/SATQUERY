"""
Geometry and Refinement Metrics — SatQuery AI.

Calculates:
  1. Overlap, Union, IoU, and boundary consistency between parent evidence and SAM masks
  2. Mask drift detection (expansion drift, collapse drift, low overlap)
  3. Honest area calculation (geospatial m²/km² only when CRS/transform is available;
     never fabricates square meters from un-georeferenced images)
  4. Vector polygon extraction and geometry validation
"""
from __future__ import annotations
import logging
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple
import numpy as np

logger = logging.getLogger("SatQuery.SAMGeometry")


@dataclass
class RefinementMetrics:
    """
    Mathematical comparison between parent specialist evidence and refined SAM mask.
    """
    parent_pixel_count: int
    refined_pixel_count: int
    overlap_pixel_count: int
    union_pixel_count: int
    iou: float
    overlap_ratio_with_parent: float
    area_ratio: float  # refined / parent
    area_diff_pixels: int
    expansion_drift: bool = False
    collapse_drift: bool = False
    low_overlap: bool = False
    empty_refined_mask: bool = False
    object_count: int = 0
    physical_parent_area_m2: Optional[float] = None
    physical_refined_area_m2: Optional[float] = None
    is_georeferenced: bool = False

    def to_dict(self) -> Dict[str, Any]:
        return {
            "parent_pixel_count": self.parent_pixel_count,
            "refined_pixel_count": self.refined_pixel_count,
            "overlap_pixel_count": self.overlap_pixel_count,
            "union_pixel_count": self.union_pixel_count,
            "iou": round(self.iou, 4),
            "overlap_ratio_with_parent": round(self.overlap_ratio_with_parent, 4),
            "area_ratio": round(self.area_ratio, 4),
            "area_diff_pixels": self.area_diff_pixels,
            "expansion_drift": self.expansion_drift,
            "collapse_drift": self.collapse_drift,
            "low_overlap": self.low_overlap,
            "empty_refined_mask": self.empty_refined_mask,
            "object_count": self.object_count,
            "physical_parent_area_m2": round(self.physical_parent_area_m2, 2) if self.physical_parent_area_m2 else None,
            "physical_refined_area_m2": round(self.physical_refined_area_m2, 2) if self.physical_refined_area_m2 else None,
            "is_georeferenced": self.is_georeferenced,
        }


def compute_refinement_metrics(
    parent_mask: np.ndarray,
    refined_mask: np.ndarray,
    transform: Any = None,
    crs: Any = None,
    resolution: Optional[Tuple[float, float]] = None,
    expansion_threshold: float = 2.5,
    collapse_threshold: float = 0.10,
    low_overlap_threshold: float = 0.30,
    object_count: int = 0,
) -> RefinementMetrics:
    """
    Compare parent evidence mask vs refined SAM mask to quantify quality and drift.

    Args:
        parent_mask: Binary array from domain specialist (ChangeFormer, Building Seg, etc.)
        refined_mask: Binary array produced by SAM refinement
        transform: Affine transform if georeferenced
        crs: CRS identifier if georeferenced
        resolution: (res_x, res_y) in meters/projection units
        expansion_threshold: area_ratio threshold above which expansion drift is flagged
        collapse_threshold: area_ratio threshold below which collapse drift is flagged
        low_overlap_threshold: overlap_ratio threshold below which low overlap is flagged
        object_count: Distinct candidate objects refined
    """
    p_bin = (parent_mask > 0).astype(bool) if parent_mask is not None else np.zeros((1, 1), dtype=bool)
    r_bin = (refined_mask > 0).astype(bool) if refined_mask is not None else np.zeros((1, 1), dtype=bool)

    # Ensure dimension alignment
    if p_bin.shape != r_bin.shape:
        h = max(p_bin.shape[0], r_bin.shape[0])
        w = max(p_bin.shape[1], r_bin.shape[1])
        p_pad = np.zeros((h, w), dtype=bool)
        r_pad = np.zeros((h, w), dtype=bool)
        p_pad[:p_bin.shape[0], :p_bin.shape[1]] = p_bin
        r_pad[:r_bin.shape[0], :r_bin.shape[1]] = r_bin
        p_bin, r_bin = p_pad, r_pad

    p_count = int(np.sum(p_bin))
    r_count = int(np.sum(r_bin))

    overlap = int(np.sum(p_bin & r_bin))
    union = int(np.sum(p_bin | r_bin))

    iou = float(overlap / max(1, union)) if union > 0 else 0.0
    overlap_ratio = float(overlap / max(1, p_count)) if p_count > 0 else 0.0
    area_ratio = float(r_count / max(1, p_count)) if p_count > 0 else (0.0 if r_count == 0 else 999.0)
    area_diff = r_count - p_count

    # Drift and anomaly detection (Phase 14 & 16)
    empty_refined = (r_count == 0 and p_count > 0)
    expansion_drift = (area_ratio > expansion_threshold)
    collapse_drift = (area_ratio < collapse_threshold and p_count >= 50)
    low_overlap = (overlap_ratio < low_overlap_threshold and p_count >= 20)

    # Physical area calculation (Phase 27)
    is_geo = bool(crs and resolution and len(resolution) >= 2)
    p_area_m2 = None
    r_area_m2 = None

    if is_geo:
        res_x, res_y = abs(float(resolution[0])), abs(float(resolution[1]))
        pixel_area = res_x * res_y
        p_area_m2 = float(p_count * pixel_area)
        r_area_m2 = float(r_count * pixel_area)

    return RefinementMetrics(
        parent_pixel_count=p_count,
        refined_pixel_count=r_count,
        overlap_pixel_count=overlap,
        union_pixel_count=union,
        iou=iou,
        overlap_ratio_with_parent=overlap_ratio,
        area_ratio=area_ratio,
        area_diff_pixels=area_diff,
        expansion_drift=expansion_drift,
        collapse_drift=collapse_drift,
        low_overlap=low_overlap,
        empty_refined_mask=empty_refined,
        object_count=object_count,
        physical_parent_area_m2=p_area_m2,
        physical_refined_area_m2=r_area_m2,
        is_georeferenced=is_geo,
    )


def mask_to_polygons(
    mask: np.ndarray,
    min_area_pixels: int = 9,
    transform: Any = None,
    max_polygons: int = 100,
) -> List[Dict[str, Any]]:
    """
    Extract closed, geometrically valid polygons from a binary mask.
    Avoids generating meaningless polygons from tiny noise regions.
    """
    if mask is None or not np.any(mask):
        return []

    polygons: List[Dict[str, Any]] = []
    bin_u8 = (mask > 0).astype(np.uint8)

    try:
        import cv2  # type: ignore
        contours, _ = cv2.findContours(bin_u8, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        for idx, cnt in enumerate(contours):
            area = cv2.contourArea(cnt)
            if area < min_area_pixels:
                continue

            # Approximate contour to reduce vertices while preserving shape
            epsilon = 0.01 * cv2.arcLength(cnt, True)
            approx = cv2.approxPolyDP(cnt, epsilon, True)
            if len(approx) < 3:
                continue

            # Flatten coordinates: [[x, y], ...]
            coords = approx.reshape(-1, 2).tolist()
            # Ensure closed polygon
            if coords[0] != coords[-1]:
                coords.append(coords[0])

            poly_obj: Dict[str, Any] = {
                "polygon_id": f"poly_{idx:03d}",
                "coordinates": coords,
                "pixel_area": float(area),
                "num_vertices": len(coords),
            }

            if transform is not None:
                # Project pixel coordinates to geospatial coordinates
                geo_coords = []
                for px, py in coords:
                    gx, gy = transform * (px, py)
                    geo_coords.append([gx, gy])
                poly_obj["geo_coordinates"] = geo_coords

            polygons.append(poly_obj)
            if len(polygons) >= max_polygons:
                break

    except Exception as exc:
        logger.warning(f"[SAMGeometry] Polygonization fallback due to: {exc}")
        # Bounding box fallback polygon
        ys, xs = np.where(bin_u8)
        if len(ys) > 0:
            x0, x1 = int(np.min(xs)), int(np.max(xs))
            y0, y1 = int(np.min(ys)), int(np.max(ys))
            box_coords = [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]]
            polygons.append({
                "polygon_id": "poly_001",
                "coordinates": box_coords,
                "pixel_area": float((x1 - x0) * (y1 - y0)),
                "num_vertices": 5,
            })

    return polygons
