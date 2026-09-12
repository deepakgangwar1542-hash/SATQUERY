"""
Building Segmentation Agent — Generic Building Footprint Extraction.

Task-agnostic building segmentation agent. Extracts building masks,
instances, polygon geometries, and coverage statistics using Deep ResUNet.
Completely decoupled from downstream tasks (e.g. flood, urban growth, damage).
"""
from __future__ import annotations
import logging
import time
from typing import Optional, List, Dict, Any
import numpy as np

from backend.schemas.response import AgentOutput
from backend.services.data_capability import inspect_data_capability
from backend.services.cv_analyzer import decode_image_b64, compute_polygon_mask
from backend.models.buildings import get_building_manager, BuildingDetectionResult

logger = logging.getLogger("SatQuery.BuildingSegmentationAgent")


class BuildingSegmentationAgent:
    AGENT_ID = "building_segmentation_agent"
    AGENT_NAME = "Building Segmentation Agent (Deep UNet Footprint Extractor)"

    def run(
        self,
        question: str,
        image_b64: str | None = None,
        image2_b64: str | None = None,
        polygon: list[list[float]] | None = None,
        target_scene: str | None = "both",
        task: str | None = "building_extraction",
    ) -> AgentOutput:
        t0 = time.perf_counter()
        logger.info("[SatQuery] Generic building segmentation requested.")

        # Select target image (prefer post-event T1 for bi-temporal evaluation, or primary T0)
        chosen_b64 = image_b64
        chosen_label = "primary (T0)"
        if image2_b64 and target_scene in ("scene2", "both", None):
            chosen_b64 = image2_b64
            chosen_label = "secondary (T1)"
        elif not image_b64 and image2_b64:
            chosen_b64 = image2_b64
            chosen_label = "secondary (T1)"

        if not chosen_b64:
            elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Building Footprint Extraction",
                result={
                    "analysis_method": "insufficient_data",
                    "building_count": 0,
                    "building_coverage_pct": 0.0,
                    "answer": "No satellite imagery provided for building footprint extraction.",
                    "inference_time_ms": elapsed_ms,
                },
                raw_score=0.0,
                error="No imagery supplied for building extraction.",
            )

        cap = inspect_data_capability(chosen_b64)
        if cap.data_type == "sentinel1":
            elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Building Footprint Extraction",
                result={
                    "analysis_method": "unsupported_data_capability",
                    "building_count": None,
                    "answer": "Building footprint extraction requires optical RGB imagery. SAR backscatter alone does not support building segmentation.",
                    "limitations": ["Building segmentation requires high-resolution optical imagery; Sentinel-1 SAR not supported."],
                    "inference_time_ms": elapsed_ms,
                },
                raw_score=0.10,
                error="Building segmentation is unsupported on radar (SAR) imagery.",
            )

        img_arr = decode_image_b64(chosen_b64)
        if img_arr is None or img_arr.size == 0:
            elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Building Footprint Extraction",
                result={"error": "Failed to decode input image raster."},
                raw_score=0.0,
                error="Image decode failure.",
            )

        h, w = img_arr.shape[:2]
        total_pixels = h * w

        # ROI Masking
        poly_mask = None
        roi_applied = False
        roi_prefix = ""
        if polygon and len(polygon) >= 3:
            poly_mask = compute_polygon_mask(h, w, polygon)
            roi_applied = True
            roi_prefix = f"ROI Analysis ({len(polygon)} pts): "

        # Execute neural building segmentation
        b_mgr = get_building_manager()
        b_res: BuildingDetectionResult = b_mgr.detect_buildings(
            image_arr=img_arr,
            transform=cap.transform,
            crs=cap.crs,
            resolution=cap.resolution,
            valid_mask=poly_mask,
        )

        elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)

        if not b_res.success:
            # Model checkpoint not available or execution error
            limitation = b_res.reason or "Building segmentation model unavailable."
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Building Footprint Extraction",
                result={
                    "analysis_method": b_res.status,
                    "building_count": None,
                    "building_coverage_pct": None,
                    "answer": f"{roi_prefix}Building footprint extraction unavailable: {limitation}",
                    "limitations": [limitation],
                    "inference_time_ms": elapsed_ms,
                },
                raw_score=0.20,
                error=limitation,
            )

        # Successful building extraction
        instances = b_res.building_instances
        building_count = len(instances)
        b_mask = b_res.building_mask
        b_pixels = int(np.sum(b_mask)) if b_mask is not None else 0
        coverage_pct = round((b_pixels / max(1, total_pixels)) * 100.0, 2)

        total_area_m2 = sum(b.area_m2 for b in instances if b.area_m2 is not None) if instances else None

        evidence_regions = []
        for b_inst in instances[:100]:  # Limit top 100 footprints for rendering
            scale_y = 512.0 / h
            scale_x = 512.0 / w
            evidence_regions.append({
                "bbox": [
                    int(b_inst.bbox_pixel[0] * scale_y),
                    int(b_inst.bbox_pixel[1] * scale_x),
                    int(b_inst.bbox_pixel[2] * scale_y),
                    int(b_inst.bbox_pixel[3] * scale_x),
                ],
                "label": f"building_{b_inst.building_id}",
                "confidence": 0.90,
            })

        standardized_output = {
            "source": "building_segmentation",
            "task": "building_extraction",
            "result_type": "building_mask",
            "metrics": {
                "building_count": building_count,
                "building_pixel_count": b_pixels,
                "building_coverage_percentage": coverage_pct,
                "building_area_m2": total_area_m2,
            },
            "spatial": {
                "georeferenced": cap.georeferenced,
                "crs": cap.crs,
                "resolution": cap.resolution,
                "roi_applied": roi_applied,
            },
            "quality": {
                "valid_pixel_ratio": 1.0,
                "model": b_res.metadata.get("model", "BuildingResUNet"),
            },
            "limitations": [
                *(["Footprints un-georeferenced; pixel-space extraction."] if not cap.georeferenced else []),
            ],
        }

        desc = (
            f"{roi_prefix}Extracted {building_count} building footprint(s) covering {coverage_pct:.1f}% "
            f"of analyzed scene on {chosen_label}."
        )

        ao = AgentOutput(
            agent_id=self.AGENT_ID,
            agent_name=self.AGENT_NAME,
            task="Building Footprint Extraction",
            result={
                "analysis_method": "neural_building_segmentation",
                "building_count": building_count,
                "building_coverage_pct": coverage_pct,
                "building_pixel_count": b_pixels,
                "building_area_m2": total_area_m2,
                "target_image": chosen_label,
                "answer": desc,
                "standardized_output": standardized_output,
                "metadata": b_res.metadata,
                "inference_time_ms": elapsed_ms,
            },
            evidence_regions=evidence_regions or None,
            raw_score=0.92,
        )
        if b_mask is not None:
            setattr(ao, "_raw_mask", b_mask)
        return ao

