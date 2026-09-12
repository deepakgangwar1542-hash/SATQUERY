"""
SAM / SAM2 Segment Anything Agent — SatQuery AI.

Downstream specialist for generic precision segmentation and object boundary refinement.
Integrates with:
  - ChangeFormer: refines coarse change candidate regions into precise boundaries
  - Building Segmentation: refines building boundaries into precise object footprints
  - Flood impact: refines flood inundation candidate regions
  - Generic regions: provides prompt-guided and zero-shot precision segmentation

Integrity Policy:
  If SAM / SAM2 weights are not found at `backend/models/sam/checkpoints/` (or package unavailable),
  this agent honestly reports capability unavailability without faking results.
"""
from __future__ import annotations
import logging
import time
import uuid
from typing import Any, Dict, List, Optional, Tuple
from pathlib import Path
import numpy as np

from backend.schemas.response import AgentOutput
from backend.services.data_capability import inspect_data_capability, DataCapability
from backend.services.cv_analyzer import decode_image_b64, compute_polygon_mask
from backend.services.spectral_analyzer import extract_sentinel2_bands
from backend.models.sam.adapter import (
    SegmentationModel,
    SegmentationPrompt,
    SegmentationResult,
    get_segmentation_adapter,
)
from backend.models.sam.candidate_extractor import (
    CandidateRegion,
    extract_candidate_regions,
)
from backend.models.sam.geometry import (
    RefinementMetrics,
    compute_refinement_metrics,
    mask_to_polygons,
)
from backend.models.sam.cache import get_segmentation_cache

logger = logging.getLogger("SatQuery.SAMAgent")


class SAMAgent:
    """
    Modular precision segmentation and boundary refinement specialist.
    """
    AGENT_ID = "sam_agent"
    AGENT_NAME = "SAM / SAM2 Precision Segmentation Specialist"

    def __init__(
        self,
        model_name: str = "sam2",
        checkpoint_path: Optional[str] = None,
    ):
        self.model_name = model_name
        self.adapter: SegmentationModel = get_segmentation_adapter(
            model_name=model_name,
            checkpoint_path=checkpoint_path,
        )
        self.cache = get_segmentation_cache()

    def is_available(self) -> bool:
        """True if model checkpoint is available."""
        return self.adapter.is_available()

    def _prepare_optical_rgb(
        self,
        image_b64: str,
        cap: DataCapability,
    ) -> Tuple[Optional[np.ndarray], Optional[str], Dict[str, Any]]:
        """
        Validate and prepare optical RGB representation for SAM/SAM2.

        Enforces modality constraints:
        - Rejects raw Sentinel-1 SAR.
        - Converts Sentinel-2 multispectral rasters to standard RGB using bands B04, B03, B02.
        - Normalizes standard RGB rasters to uint8 [0, 255].
        """
        meta: Dict[str, Any] = {"input_modality": cap.data_type}

        # Check raw SAR incompatibility (Phase 21, 23)
        if cap.data_type == "sentinel1":
            return None, "unsupported_data_capability", {
                "reason": (
                    "SAM / SAM2 requires optical visual imagery. "
                    "Sentinel-1 SAR raw radar backscatter is not directly supported without an optical representation."
                )
            }

        # Check Sentinel-2 multispectral (Phase 22)
        if cap.data_type in ("sentinel2", "geotiff") and cap.band_count > 3:
            s2_bands = extract_sentinel2_bands(image_b64)
            if s2_bands and "red" in s2_bands and "green" in s2_bands and "blue" in s2_bands:
                r, g, b = s2_bands["red"], s2_bands["green"], s2_bands["blue"]
                rgb = np.dstack([r, g, b])
                # Normalize 0..10000 or arbitrary reflectance to 0..255
                p2, p98 = np.percentile(rgb, (2, 98))
                if p98 > p2:
                    rgb_norm = np.clip((rgb - p2) / (p98 - p2) * 255.0, 0, 255).astype(np.uint8)
                else:
                    rgb_norm = np.clip(rgb, 0, 255).astype(np.uint8)
                meta["band_composition"] = "Sentinel-2 True Color (B04-Red, B03-Green, B02-Blue)"
                return rgb_norm, None, meta

        # Standard optical RGB
        img_arr = decode_image_b64(image_b64)
        if img_arr is None or img_arr.size == 0:
            return None, "image_decode_failed", {"reason": "Failed to decode input optical raster."}

        # Normalize to 3-channel RGB uint8
        if img_arr.ndim == 2:
            img_rgb = np.dstack([img_arr] * 3)
        elif img_arr.shape[2] > 3:
            img_rgb = img_arr[:, :, :3]
        else:
            img_rgb = img_arr

        if img_rgb.dtype != np.uint8:
            if np.nanmax(img_rgb) <= 1.5:
                img_rgb = (img_rgb * 255.0).astype(np.uint8)
            else:
                img_rgb = np.clip(img_rgb, 0, 255).astype(np.uint8)

        meta["band_composition"] = "Optical RGB"
        return img_rgb, None, meta

    def refine_evidence(
        self,
        image_b64: str,
        parent_mask: np.ndarray,
        parent_evidence_id: str,
        parent_source: str = "changeformer",
        polygon: Optional[List[List[float]]] = None,
        target_scene: Optional[str] = "both",
        min_candidate_area: int = 9,
        max_candidates: int = 25,
    ) -> AgentOutput:
        """
        Refine candidate regions from an upstream specialist evidence mask.

        Args:
            image_b64: Optical image raster
            parent_mask: Binary mask from ChangeFormer, Building Segmentation, etc.
            parent_evidence_id: Identifier of the parent evidence record
            parent_source: Source specialist ('changeformer', 'building_segmentation', etc.)
            polygon: Optional ROI polygon
            target_scene: 'scene1', 'scene2', or 'both'
            min_candidate_area: Minimum candidate region pixel count
            max_candidates: Max candidate regions to refine
        """
        t0 = time.perf_counter()
        cap = inspect_data_capability(image_b64)

        img_rgb, err_type, meta = self._prepare_optical_rgb(image_b64, cap)
        elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)

        # Handle incompatible modality (e.g. raw SAR)
        if err_type == "unsupported_data_capability":
            reason = meta.get("reason", "Unsupported modality for SAM.")
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Precision Boundary Refinement (SAM)",
                result={
                    "capability_status": "unsupported_data_capability",
                    "analysis_status": "unsupported_data_capability",
                    "parent_evidence_id": parent_evidence_id,
                    "parent_source": parent_source,
                    "model": f"{self.adapter.model_name} ({self.adapter.model_version})",
                    "answer": f"Precision refinement unavailable: {reason}",
                    "limitations": [reason],
                    "inference_time_ms": elapsed_ms,
                },
                raw_score=0.10,
                error=reason,
            )

        if img_rgb is None:
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Precision Boundary Refinement (SAM)",
                result={
                    "capability_status": "decode_error",
                    "error": meta.get("reason", "Optical image decoding failed."),
                    "parent_evidence_id": parent_evidence_id,
                },
                raw_score=0.0,
                error="Image decoding failure.",
            )

        h, w = img_rgb.shape[:2]

        # Extract candidate regions from parent mask (Phase 6, 24, 25)
        candidates = extract_candidate_regions(
            parent_mask=parent_mask,
            min_area_pixels=min_candidate_area,
            max_candidates=max_candidates,
            prefix=f"{parent_source}_cand",
        )

        # Convert candidates to SAM prompts
        prompts: List[SegmentationPrompt] = []
        for cand in candidates:
            prompts.append(SegmentationPrompt(
                box=cand.bbox,
                points=[cand.center_point],
                point_labels=[1],
                region_id=cand.region_id,
            ))

        # Check model availability
        if not self.adapter.is_available():
            # Honest reporting when weights are not present
            msg = (
                f"{self.adapter.model_name} weights not found. "
                "Precision boundary refinement is inactive. "
                f"Parent {parent_source} evidence will be retained without refinement."
            )
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Precision Boundary Refinement (SAM)",
                result={
                    "capability_status": "checkpoint_unavailable",
                    "status": "refinement_bypassed",
                    "parent_evidence_id": parent_evidence_id,
                    "parent_source": parent_source,
                    "candidate_regions_identified": len(candidates),
                    "model": f"{self.adapter.model_name} ({self.adapter.model_version})",
                    "message": msg,
                    "limitations": [msg],
                    "inference_time_ms": elapsed_ms,
                },
                raw_score=0.30,
                error=f"{self.adapter.model_name} checkpoint unavailable",
            )

        # Execute segmentation with caching
        cache_key = f"{parent_evidence_id}_{len(prompts)}"
        cached_res = self.cache.get(img_rgb, cache_key, self.adapter.model_version)

        if cached_res is not None:
            seg_res = cached_res
        else:
            seg_res = self.adapter.segment(img_rgb, prompts=prompts)
            if seg_res.success:
                self.cache.put(img_rgb, cache_key, self.adapter.model_version, seg_res)

        elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)

        if not seg_res.success:
            err_msg = seg_res.message or "Refinement execution failed."
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Precision Boundary Refinement (SAM)",
                result={
                    "capability_status": seg_res.status,
                    "parent_evidence_id": parent_evidence_id,
                    "parent_source": parent_source,
                    "model": f"{seg_res.model_name} ({seg_res.model_version})",
                    "error": err_msg,
                    "limitations": [err_msg],
                    "inference_time_ms": elapsed_ms,
                },
                raw_score=0.20,
                error=err_msg,
            )

        # Merge individual candidate masks into composite refined mask
        composite_refined_mask = np.zeros((h, w), dtype=bool)
        region_details = []

        for idx, (m, p) in enumerate(zip(seg_res.masks, seg_res.prompts_used)):
            composite_refined_mask |= m
            region_details.append({
                "region_id": p.region_id or f"region_{idx:03d}",
                "bbox": p.box,
                "center_point": p.points[0] if p.points else None,
                "pixel_count": int(np.sum(m)),
            })

        # Calculate refinement quality, overlap, drift (Phase 13, 14, 27)
        metrics = compute_refinement_metrics(
            parent_mask=parent_mask,
            refined_mask=composite_refined_mask,
            transform=cap.transform,
            crs=cap.crs,
            resolution=cap.resolution,
            object_count=len(region_details),
        )

        # Polygonize refined mask (Phase 26)
        polygons = mask_to_polygons(
            mask=composite_refined_mask,
            min_area_pixels=min_candidate_area,
            transform=cap.transform,
        )

        # Scale evidence regions for rendering
        evidence_regions = []
        for reg in region_details[:50]:
            if reg["bbox"]:
                bx = reg["bbox"]
                scale_y = 512.0 / h
                scale_x = 512.0 / w
                evidence_regions.append({
                    "bbox": [
                        int(bx[1] * scale_y),
                        int(bx[0] * scale_x),
                        int(bx[3] * scale_y),
                        int(bx[2] * scale_x),
                    ],
                    "label": f"refined_{reg['region_id']}",
                    "confidence": float(metrics.iou),
                })

        refined_eid = f"ev_sam_{uuid.uuid4().hex[:6]}"
        total_pixels = h * w
        cov_pct = round((metrics.refined_pixel_count / max(1, total_pixels)) * 100.0, 2)

        limitations = []
        if metrics.expansion_drift:
            limitations.append(
                f"Refined mask expanded significantly beyond parent evidence (area ratio: {metrics.area_ratio:.2f}x). "
                "Review boundary extent for potential over-segmentation."
            )
        if metrics.low_overlap:
            limitations.append(
                f"Low spatial overlap between parent evidence and refined boundary ({metrics.overlap_ratio_with_parent*100:.1f}%)."
            )
        if metrics.empty_refined_mask:
            limitations.append("Refinement produced empty mask from non-empty candidate regions.")

        std_output = {
            "source": self.adapter.model_name.lower(),
            "task": "segmentation_refinement",
            "modality": "optical",
            "result_type": "refined_mask",
            "parent_evidence": parent_evidence_id,
            "refined_evidence": refined_eid,
            "spatial": {
                "crs": cap.crs,
                "resolution": cap.resolution,
                "is_georeferenced": metrics.is_georeferenced,
            },
            "metrics": {
                "parent_pixel_count": metrics.parent_pixel_count,
                "refined_pixel_count": metrics.refined_pixel_count,
                "overlap_pixel_count": metrics.overlap_pixel_count,
                "iou_with_parent": metrics.iou,
                "overlap_ratio_with_parent": metrics.overlap_ratio_with_parent,
                "area_ratio": metrics.area_ratio,
                "area_diff_pixels": metrics.area_diff_pixels,
                "object_count": metrics.object_count,
                "coverage_percentage": cov_pct,
                "physical_parent_area_m2": metrics.physical_parent_area_m2,
                "physical_refined_area_m2": metrics.physical_refined_area_m2,
            },
            "quality": {
                "expansion_drift": metrics.expansion_drift,
                "collapse_drift": metrics.collapse_drift,
                "low_overlap": metrics.low_overlap,
                "empty_mask": metrics.empty_refined_mask,
            },
            "limitations": limitations,
        }

        # Calculate calibrated raw_score
        quality_factor = metrics.iou * metrics.overlap_ratio_with_parent
        if metrics.expansion_drift or metrics.collapse_drift:
            quality_factor *= 0.60
        raw_score = max(0.20, min(0.95, 0.40 + 0.55 * quality_factor))

        area_str = (
            f" (~{metrics.physical_refined_area_m2:,.0f} m²)"
            if metrics.physical_refined_area_m2
            else f" ({metrics.refined_pixel_count:,} px)"
        )
        ans = (
            f"Precision boundary refinement ({self.adapter.model_name}): "
            f"Refined {len(region_details)} candidate region(s) from {parent_source}{area_str}. "
            f"Spatial IoU with parent evidence: {metrics.iou:.2f} (overlap: {metrics.overlap_ratio_with_parent*100:.1f}%)."
        )

        return AgentOutput(
            agent_id=self.AGENT_ID,
            agent_name=self.AGENT_NAME,
            task="Precision Boundary Refinement (SAM)",
            result={
                "capability_status": "active",
                "model": f"{seg_res.model_name} ({seg_res.model_version})",
                "parent_evidence_id": parent_evidence_id,
                "parent_source": parent_source,
                "refinement_metrics": metrics.to_dict(),
                "object_count": len(region_details),
                "coverage_pct": cov_pct,
                "polygons_count": len(polygons),
                "regions": region_details,
                "standardized_output": std_output,
                "limitations": limitations,
                "answer": ans,
                "inference_time_ms": elapsed_ms,
            },
            evidence_regions=evidence_regions,
            raw_score=round(raw_score, 2),
        )

    def run(
        self,
        question: str,
        image_b64: Optional[str] = None,
        image2_b64: Optional[str] = None,
        polygon: Optional[List[List[float]]] = None,
        target_scene: Optional[str] = "both",
        parent_mask: Optional[np.ndarray] = None,
        parent_evidence_id: Optional[str] = None,
        parent_source: Optional[str] = None,
        **kwargs,
    ) -> AgentOutput:
        """
        Standard agent execution entry point.
        If parent_mask is supplied, delegates to targeted refine_evidence().
        Otherwise operates on ROI or general scene prompt.
        """
        t0 = time.perf_counter()

        chosen_b64 = image_b64
        if image2_b64 and target_scene in ("scene2", "both", None):
            chosen_b64 = image2_b64
        elif not image_b64 and image2_b64:
            chosen_b64 = image2_b64

        if not chosen_b64:
            elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Precision Boundary Refinement (SAM)",
                result={"error": "No satellite imagery supplied for segmentation."},
                raw_score=0.0,
                error="No imagery supplied.",
            )

        # If called in refinement mode with parent mask
        if parent_mask is not None and np.any(parent_mask):
            return self.refine_evidence(
                image_b64=chosen_b64,
                parent_mask=parent_mask,
                parent_evidence_id=parent_evidence_id or "parent_evidence",
                parent_source=parent_source or "domain_specialist",
                polygon=polygon,
                target_scene=target_scene,
            )

        cap = inspect_data_capability(chosen_b64)
        img_rgb, err_type, meta = self._prepare_optical_rgb(chosen_b64, cap)
        elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)

        if err_type == "unsupported_data_capability":
            reason = meta.get("reason", "Unsupported modality for SAM.")
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Precision Boundary Refinement (SAM)",
                result={
                    "capability_status": "unsupported_data_capability",
                    "analysis_status": "unsupported_data_capability",
                    "answer": f"Segmentation unavailable: {reason}",
                    "limitations": [reason],
                    "inference_time_ms": elapsed_ms,
                },
                raw_score=0.10,
                error=reason,
            )

        if img_rgb is None:
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Precision Boundary Refinement (SAM)",
                result={"error": "Optical image decode failure."},
                raw_score=0.0,
                error="Image decoding failure.",
            )

        # Check weights availability
        if not self.adapter.is_available():
            msg = (
                f"{self.adapter.model_name} model weights not installed at backend/models/sam/checkpoints/. "
                "Zero-shot foundation segmentation is currently inactive. "
                "Domain specialists (Building Segmentation and ChangeFormer) provide primary extraction."
            )
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Precision Boundary Refinement (SAM)",
                result={
                    "capability_status": "checkpoint_unavailable",
                    "status": "refinement_bypassed",
                    "model": f"{self.adapter.model_name} ({self.adapter.model_version})",
                    "message": msg,
                    "limitations": [msg],
                    "inference_time_ms": elapsed_ms,
                },
                raw_score=0.30,
                error=f"{self.adapter.model_name} checkpoint unavailable",
            )

        h, w = img_rgb.shape[:2]
        prompts = []

        # If user supplied polygon ROI, use polygon bounding box as prompt
        if polygon and len(polygon) >= 3:
            xs = [p[0] * w for p in polygon]
            ys = [p[1] * h for p in polygon]
            box = [int(min(xs)), int(min(ys)), int(max(xs)), int(max(ys))]
            cx = int(sum(xs) / len(xs))
            cy = int(sum(ys) / len(ys))
            prompts.append(SegmentationPrompt(
                box=box,
                points=[(cx, cy)],
                point_labels=[1],
                region_id="user_roi",
            ))

        seg_res = self.adapter.segment(img_rgb, prompts=prompts if prompts else None)
        elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)

        if not seg_res.success:
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Precision Boundary Refinement (SAM)",
                result={"error": seg_res.message or "Segmentation execution failed."},
                raw_score=0.20,
                error=seg_res.message or "Execution error",
            )

        composite_mask = np.zeros((h, w), dtype=bool)
        for m in seg_res.masks:
            composite_mask |= m

        polygons = mask_to_polygons(composite_mask, transform=cap.transform)
        px_count = int(np.sum(composite_mask))
        cov_pct = round((px_count / max(1, h * w)) * 100.0, 2)

        return AgentOutput(
            agent_id=self.AGENT_ID,
            agent_name=self.AGENT_NAME,
            task="Precision Boundary Refinement (SAM)",
            result={
                "capability_status": "active",
                "model": f"{seg_res.model_name} ({seg_res.model_version})",
                "segmented_pixel_count": px_count,
                "coverage_pct": cov_pct,
                "polygons_count": len(polygons),
                "answer": f"Precision segmentation identified {len(polygons)} region(s) covering {cov_pct}% of optical scene.",
                "inference_time_ms": elapsed_ms,
            },
            raw_score=0.85,
        )
