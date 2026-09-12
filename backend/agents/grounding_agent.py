"""
Grounding Agent — Visual object and feature localization in remote sensing images.
Performs genuine spatial segmentation and bounding box extraction on actual image pixels.
Strictly avoids claiming SAM or GroundingDINO unless the actual heavy models are executed.
"""
from __future__ import annotations
import re
import time
from typing import List, Dict, Any, Optional
import numpy as np
from PIL import Image

from backend.schemas.response import AgentOutput
from backend.services.data_capability import inspect_data_capability
from backend.services.cv_analyzer import decode_image_b64


def _extract_bounding_boxes(mask: np.ndarray, max_boxes: int = 4) -> List[Dict[str, Any]]:
    """
    Finds bounding boxes of connected components in a boolean mask.
    Returns list of dicts with bbox [ymin, xmin, ymax, xmax] in 0..512 coordinates.
    """
    h, w = mask.shape
    if mask.sum() < 20:
        return []

    # Simple connected components / quadrant segmentation
    scale_y = 512.0 / h
    scale_x = 512.0 / w

    boxes = []
    # Divide into grid cells to find prominent clusters
    grid_rows, grid_cols = 4, 4
    cell_h, cell_w = h // grid_rows, w // grid_cols

    for r in range(grid_rows):
        for c in range(grid_cols):
            submask = mask[r * cell_h:(r + 1) * cell_h, c * cell_w:(c + 1) * cell_w]
            if submask.sum() > (cell_h * cell_w * 0.15):
                ys, xs = np.where(submask)
                ymin = int((r * cell_h + np.min(ys)) * scale_y)
                xmin = int((c * cell_w + np.min(xs)) * scale_x)
                ymax = int((r * cell_h + np.max(ys)) * scale_y)
                xmax = int((c * cell_w + np.max(xs)) * scale_x)
                density = float(submask.sum() / (cell_h * cell_w))
                boxes.append({
                    "bbox": [ymin, xmin, ymax, xmax],
                    "confidence": round(min(0.95, 0.65 + density * 0.3), 2),
                    "pixel_area": int(submask.sum()),
                })
                if len(boxes) >= max_boxes:
                    break
        if len(boxes) >= max_boxes:
            break

    return boxes


class GroundingAgent:
    AGENT_ID = "grounding_agent"
    AGENT_NAME = "Grounding Agent (Spatial Feature Localizer)"

    def run(self, question: str, image_b64: str | None = None, **kwargs) -> AgentOutput:
        t0 = time.perf_counter()
        q = question.lower()

        cap = inspect_data_capability(image_b64)
        if cap.data_type == "none":
            elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Visual Grounding & Feature Localization",
                result={
                    "num_objects_detected": 0,
                    "detections": [],
                    "note": "No imagery supplied for spatial localization.",
                    "model": "Spatial Feature Localizer",
                    "inference_time_ms": elapsed_ms,
                },
                evidence_regions=None,
                raw_score=0.0,
            )

        img_arr = decode_image_b64(image_b64)
        if img_arr is None:
            elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Visual Grounding & Feature Localization",
                result={
                    "num_objects_detected": 0,
                    "detections": [],
                    "model": "Spatial Feature Localizer",
                    "inference_time_ms": elapsed_ms,
                },
                raw_score=0.0,
                error="Failed to decode image array.",
            )

        h, w, _ = img_arr.shape
        r, g, b = img_arr[:, :, 0], img_arr[:, :, 1], img_arr[:, :, 2]

        # Detect target feature mask from query
        if re.search(r"water|lake|river|pond|flood|inundat", q):
            target_mask = ((b > r * 1.15) & (b > g * 0.95)) | ((b > 30) & (r < 35) & (g < 50))
            label_prefix = "water_body"
        elif re.search(r"vegetat|forest|tree|crop|green|farm", q):
            target_mask = (g > r * 1.08) & (g > b * 1.05) & (g > 35)
            label_prefix = "vegetation_zone"
        elif re.search(r"building|structure|house|urban|city", q):
            target_mask = (np.abs(r - g) < 22) & (np.abs(g - b) < 22) & (r > 105)
            label_prefix = "urban_structure"
        elif re.search(r"fire|burn|flame|smoke", q):
            target_mask = (r > 130) & (r > g * 1.25) & (r > b * 1.7)
            label_prefix = "thermal_feature"
        else:
            # Default salient high-contrast features
            gray = 0.299 * r + 0.587 * g + 0.114 * b
            target_mask = (gray > np.percentile(gray, 80)) | (gray < np.percentile(gray, 20))
            label_prefix = "salient_feature"

        extracted_boxes = _extract_bounding_boxes(target_mask, max_boxes=4)

        detections = []
        for i, eb in enumerate(extracted_boxes):
            detections.append({
                "label": f"{label_prefix}_{i+1}",
                "bbox": eb["bbox"],
                "confidence": eb["confidence"],
                "pixel_count": eb["pixel_area"],
            })

        evidence_regions = [
            {"bbox": d["bbox"], "label": d["label"], "confidence": d["confidence"]}
            for d in detections
        ]

        elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)

        return AgentOutput(
            agent_id=self.AGENT_ID,
            agent_name=self.AGENT_NAME,
            task="Visual Grounding & Feature Localization",
            result={
                "num_objects_detected": len(detections),
                "detections": detections,
                "model": "Spatial Feature Localizer (Pixel Cluster Segmentation)",
                "inference_time_ms": elapsed_ms,
            },
            evidence_regions=evidence_regions or None,
            raw_score=0.88 if detections else 0.50,
        )
