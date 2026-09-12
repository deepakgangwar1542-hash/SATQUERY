"""
Candidate Region Extractor — SatQuery AI.

Extracts spatially distinct candidate regions from parent evidence masks
(ChangeFormer change masks, Building Segmentation masks, Flood masks, etc.)
to derive prompt coordinates (bounding boxes, point prompts, candidate masks)
for targeted SAM/SAM2 boundary refinement.
"""
from __future__ import annotations
import logging
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple
import numpy as np

logger = logging.getLogger("SatQuery.CandidateExtractor")


@dataclass
class CandidateRegion:
    """
    Spatially bounded candidate region extracted from parent specialist evidence.
    """
    region_id: str
    bbox: List[int]  # [x_min, y_min, x_max, y_max]
    center_point: Tuple[int, int]  # (x, y) in pixel space
    pixel_count: int
    mask: np.ndarray  # Local binary mask or full-scene component mask
    source_label: Optional[str] = None
    properties: Dict[str, Any] = field(default_factory=dict)


def extract_candidate_regions(
    parent_mask: np.ndarray,
    min_area_pixels: int = 9,
    max_candidates: int = 50,
    prefix: str = "region",
) -> List[CandidateRegion]:
    """
    Extract candidate connected components from a binary parent mask.

    Args:
        parent_mask: Binary boolean or 0/1 array [H, W].
        min_area_pixels: Minimum pixel area to filter out noise components.
        max_candidates: Maximum number of candidate regions to return (sorted by size).
        prefix: Prefix for region_id generation.

    Returns:
        List of CandidateRegion instances with bounding boxes and centroid prompts.
    """
    if parent_mask is None or parent_mask.size == 0:
        return []

    bin_mask = (parent_mask > 0).astype(np.uint8)
    if not np.any(bin_mask):
        return []

    # Prefer scipy.ndimage for reliable multi-component labeling
    try:
        from scipy.ndimage import label, find_objects  # type: ignore
        labeled_arr, num_features = label(bin_mask)
        if num_features == 0:
            return []

        slices = find_objects(labeled_arr)
        candidates: List[CandidateRegion] = []

        for idx, slc in enumerate(slices, start=1):
            if slc is None:
                continue
            component_mask = (labeled_arr[slc] == idx)
            area = int(np.sum(component_mask))
            if area < min_area_pixels:
                continue

            y_slice, x_slice = slc
            y_min, y_max = y_slice.start, y_slice.stop
            x_min, x_max = x_slice.start, x_slice.stop

            # Centroid point prompt
            y_indices, x_indices = np.where(component_mask)
            cy = int(y_min + np.mean(y_indices))
            cx = int(x_min + np.mean(x_indices))

            # Full mask slice
            full_comp = (labeled_arr == idx)

            candidates.append(CandidateRegion(
                region_id=f"{prefix}_{idx:03d}",
                bbox=[x_min, y_min, x_max, y_max],
                center_point=(cx, cy),
                pixel_count=area,
                mask=full_comp,
                properties={"y_min": y_min, "y_max": y_max, "x_min": x_min, "x_max": x_max},
            ))

        # Sort largest candidate regions first
        candidates.sort(key=lambda c: c.pixel_count, reverse=True)
        return candidates[:max_candidates]

    except Exception as exc:
        logger.warning(f"[CandidateExtractor] Component extraction error: {exc}")
        # Fallback to single bounding box over entire active mask
        ys, xs = np.where(bin_mask)
        if len(ys) == 0:
            return []
        x_min, x_max = int(np.min(xs)), int(np.max(xs)) + 1
        y_min, y_max = int(np.min(ys)), int(np.max(ys)) + 1
        return [CandidateRegion(
            region_id=f"{prefix}_001",
            bbox=[x_min, y_min, x_max, y_max],
            center_point=(int((x_min + x_max) / 2), int((y_min + y_max) / 2)),
            pixel_count=int(len(ys)),
            mask=bin_mask.astype(bool),
        )]
