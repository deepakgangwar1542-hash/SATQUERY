"""
Change Detection Agent — Bi-temporal change analysis between two images.
Integrates Phase 1 preprocessing (validation, alignment, nodata, normalization)
and Phase 2 ChangeFormer Siamese Transformer model with graceful, honest fallback
to RGB Euclidean differencing or Sentinel-2 NDVI spectral differencing.
"""
from __future__ import annotations
import logging
import re
import time
from typing import Optional, List, Dict, Any, Tuple
import numpy as np
from PIL import Image

from backend.schemas.response import AgentOutput
from backend.services.data_capability import inspect_data_capability
from backend.services.cv_analyzer import decode_image_b64, compute_polygon_mask, analyze_scene_image
from backend.services.spectral_analyzer import extract_sentinel2_bands, compute_real_ndvi
from backend.services.imagery import preprocess_temporal_pair, PreprocessingResult
from backend.models.changeformer import get_changeformer_manager

logger = logging.getLogger("SatQuery.ChangeDetectionAgent")


def _compute_image_change(
    img0: np.ndarray,
    img1: np.ndarray,
    polygon: list[list[float]] | None = None,
    valid_mask: np.ndarray | None = None,
) -> Tuple[float, int, int, np.ndarray, Optional[List[int]]]:
    """
    Computes real per-pixel Euclidean color distance difference between two aligned images.
    Returns: (change_percent, changed_pixel_count, total_valid_pixels, change_mask, bbox)
    """
    # Align dimensions if mismatched
    if img0.shape[:2] != img1.shape[:2]:
        h, w = min(img0.shape[0], img1.shape[0]), min(img0.shape[1], img1.shape[1])
        im0_pil = Image.fromarray(np.clip(img0, 0, 255).astype(np.uint8)).resize((w, h), Image.Resampling.BILINEAR)
        im1_pil = Image.fromarray(np.clip(img1, 0, 255).astype(np.uint8)).resize((w, h), Image.Resampling.BILINEAR)
        arr0 = np.array(im0_pil, dtype=np.float32)
        arr1 = np.array(im1_pil, dtype=np.float32)
    else:
        arr0 = img0.astype(np.float32)
        arr1 = img1.astype(np.float32)
        h, w = arr0.shape[0], arr0.shape[1]

    # Ensure in 0..255 scale for Euclidean distance
    if np.nanmax(arr0) <= 1.5:
        arr0 = arr0 * 255.0
    if np.nanmax(arr1) <= 1.5:
        arr1 = arr1 * 255.0

    # Compute Euclidean difference in color space across first 3 channels
    c = min(arr0.shape[2], arr1.shape[2], 3)
    diff = np.sqrt(np.sum((arr1[:, :, :c] - arr0[:, :, :c]) ** 2, axis=-1))

    # Mask combination: polygon ROI + valid pixel mask
    mask = np.ones((h, w), dtype=bool)
    if valid_mask is not None:
        if valid_mask.shape == (h, w):
            mask &= valid_mask

    if polygon and len(polygon) >= 3:
        roi_m = compute_polygon_mask(h, w, polygon)
        mask &= roi_m

    valid_diff = diff[mask]
    total_valid = max(1, len(valid_diff))

    # Significance threshold: Euclidean distance > 35 (out of ~441 max RGB distance)
    change_threshold = 35.0
    changed_mask_full = (diff > change_threshold) & mask
    changed_count = int(np.sum(changed_mask_full))
    change_pct = round(changed_count / total_valid * 100.0, 2)

    # Compute genuine bounding box of the largest changed cluster if changes exist
    bbox = None
    if changed_count > 20:
        ys, xs = np.where(changed_mask_full)
        if len(ys) > 0 and len(xs) > 0:
            scale_y = 512.0 / h
            scale_x = 512.0 / w
            bbox = [
                int(np.percentile(ys, 5) * scale_y),
                int(np.percentile(xs, 5) * scale_x),
                int(np.percentile(ys, 95) * scale_y),
                int(np.percentile(xs, 95) * scale_x),
            ]

    return change_pct, changed_count, total_valid, changed_mask_full, bbox


class ChangeDetectionAgent:
    AGENT_ID = "change_detection_agent"
    AGENT_NAME = "Change Detection Agent (ChangeFormer & Spectral Differencing)"

    def run(
        self,
        question: str,
        image_b64: str | None = None,
        image2_b64: str | None = None,
        polygon: list[list[float]] | None = None,
        target_scene: str | None = "both"
    ) -> AgentOutput:
        t0 = time.perf_counter()
        q = question.lower()
        logger.info("[SatQuery] Bi-temporal change analysis requested.")

        roi_prefix = f"ROI Analysis ({len(polygon)} pts): " if polygon and len(polygon) >= 3 else ""

        # Case 1: Missing secondary image
        if not image_b64 or not image2_b64:
            elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
            logger.warning("[SatQuery] Secondary image missing for bi-temporal query.")
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Bi-temporal Change Detection",
                result={
                    "analysis_method": "insufficient_data",
                    "change_type": "Insufficient Bi-temporal Imagery",
                    "severity": "Unknown",
                    "change_percent": 0.0,
                    "changed_area_km2": 0.0,
                    "pixel_change_count": 0,
                    "change_map_description": (
                        f"{roi_prefix}Bi-temporal change detection requires both pre-event (T0) "
                        f"and post-event (T1) imagery. Please supply two images to perform change comparison."
                    ),
                    "model": "Bi-temporal Preprocessing & Analysis Engine",
                    "inference_time_ms": elapsed_ms,
                },
                evidence_regions=None,
                raw_score=0.20,
                error="Secondary image (T1) required for bi-temporal change detection.",
            )

        # Case 2: Sentinel-2 multispectral pair
        cap0 = inspect_data_capability(image_b64)
        cap1 = inspect_data_capability(image2_b64)

        if cap0.data_type == "sentinel2" and cap1.data_type == "sentinel2":
            logger.info("[SatQuery] Sentinel-2 multispectral pair detected. Executing spectral delta-NDVI.")
            bands0, _, err0 = extract_sentinel2_bands(image_b64)
            bands1, _, err1 = extract_sentinel2_bands(image2_b64)

            if bands0 and bands1 and not err0 and not err1:
                ndvi0_res = compute_real_ndvi(bands0["B04"], bands0["B08"], polygon=polygon)
                ndvi1_res = compute_real_ndvi(bands1["B04"], bands1["B08"], polygon=polygon)

                d_ndvi_mean = round(ndvi1_res.get("ndvi_mean", 0.0) - ndvi0_res.get("ndvi_mean", 0.0), 3)
                veg0 = ndvi0_res.get("vegetation_coverage_pct", 0.0)
                veg1 = ndvi1_res.get("vegetation_coverage_pct", 0.0)
                d_veg = round(veg1 - veg0, 2)

                change_pct = abs(d_veg)
                if d_veg < -10.0:
                    change_type = "Vegetation Canopy Loss / Degradation"
                    severity = "High"
                    desc = f"{roi_prefix}Significant canopy degradation: Vegetation fraction dropped from {veg0:.1f}% (T0) to {veg1:.1f}% (T1) (Δ NDVI = {d_ndvi_mean:+.3f})."
                elif d_veg > 10.0:
                    change_type = "Vegetation Regrowth / Canopy Expansion"
                    severity = "Low"
                    desc = f"{roi_prefix}Vegetation expansion observed: Green cover increased from {veg0:.1f}% (T0) to {veg1:.1f}% (T1) (Δ NDVI = {d_ndvi_mean:+.3f})."
                else:
                    change_type = "Stable Canopy State"
                    severity = "Low"
                    desc = f"{roi_prefix}Vegetation cover remained relatively stable (T0: {veg0:.1f}% → T1: {veg1:.1f}%, Δ NDVI = {d_ndvi_mean:+.3f})."

                elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
                return AgentOutput(
                    agent_id=self.AGENT_ID,
                    agent_name=self.AGENT_NAME,
                    task="Bi-temporal Change Detection",
                    result={
                        "analysis_method": "sentinel2_ndvi_difference",
                        "change_type": change_type,
                        "change_percent": change_pct,
                        "delta_ndvi_mean": d_ndvi_mean,
                        "severity": severity,
                        "change_map_description": desc,
                        "t0_metrics": {"vegetation_coverage_pct": veg0, "ndvi_mean": ndvi0_res.get("ndvi_mean")},
                        "t1_metrics": {"vegetation_coverage_pct": veg1, "ndvi_mean": ndvi1_res.get("ndvi_mean")},
                        "evidence": {
                            "analysis_method": "sentinel2_ndvi_difference",
                            "delta_ndvi_mean": d_ndvi_mean,
                            "change_percentage": change_pct,
                            "roi_applied": bool(polygon and len(polygon) >= 3),
                        },
                        "model": "Sentinel-2 Spectral Delta-NDVI Analyzer",
                        "inference_time_ms": elapsed_ms,
                    },
                    evidence_regions=None,
                    raw_score=0.94,
                )

        # Phase 1: Imagery Preprocessing Layer
        logger.info("[SatQuery] Running Phase 1 imagery preprocessing pipeline...")
        prep: PreprocessingResult = preprocess_temporal_pair(image_b64, image2_b64)
        if not prep.success:
            elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
            logger.warning(f"[SatQuery] Preprocessing rejected pair: {prep.reason}")
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Bi-temporal Change Detection",
                result={
                    "analysis_method": "insufficient_data",
                    "change_type": "Incompatible / Corrupt Imagery",
                    "severity": "Unknown",
                    "change_percent": 0.0,
                    "change_map_description": f"Preprocessing failure: {prep.reason}",
                    "preprocessing": prep.to_dict(),
                    "model": "SatQuery Imagery Preprocessor",
                    "inference_time_ms": elapsed_ms,
                },
                raw_score=0.0,
                error=prep.reason or "Preprocessing failed for temporal image pair.",
            )

        aligned_t0 = prep.aligned_t0
        aligned_t1 = prep.aligned_t1
        valid_mask = prep.valid_mask
        h, w = aligned_t0.shape[:2]

        poly_mask = None
        roi_applied = False
        if polygon and len(polygon) >= 3:
            poly_mask = compute_polygon_mask(h, w, polygon)
            roi_applied = True

        # Phase 2: ChangeFormer Model Selection & Execution
        cf_manager = get_changeformer_manager()
        change_pct = 0.0
        changed_pixels = 0
        total_valid = max(1, prep.valid_pixels)
        bbox = None
        analysis_method = "rgb_pixel_difference"
        model_name = "Bi-temporal Spectral & Differencing Analyzer (RGB Fallback)"
        diagnostic_check = None

        cf_ran = False
        active_change_mask = None
        if cf_manager.is_available:
            logger.info("[SatQuery] ChangeFormer checkpoint detected. Attempting neural inference...")
            cf_res = cf_manager.detect_change(
                aligned_t0=aligned_t0,
                aligned_t1=aligned_t1,
                valid_mask=valid_mask,
                polygon_mask=poly_mask,
            )
            if cf_res.get("success"):
                cf_ran = True
                analysis_method = "changeformer"
                model_name = "ChangeFormer (Siamese Hierarchical Transformer)"
                change_pct = cf_res["change_percentage"]
                changed_pixels = cf_res["changed_pixel_count"]
                total_valid = cf_res["valid_pixel_count"]
                bbox = cf_res["bbox"]
                active_change_mask = cf_res.get("change_mask")
                logger.info(f"[SatQuery] ChangeFormer completed: {changed_pixels} changed px ({change_pct}%).")

                # Diagnostic consistency check: also compute RGB baseline for independent comparison
                try:
                    rgb_pct, rgb_cnt, _, _, _ = _compute_image_change(
                        aligned_t0, aligned_t1, polygon=polygon, valid_mask=valid_mask
                    )
                    diagnostic_check = {
                        "rgb_baseline_change_pct": rgb_pct,
                        "rgb_baseline_changed_pixels": rgb_cnt,
                        "independent_consistency_note": (
                            f"Independent consistency check: ChangeFormer ({change_pct}%) vs RGB differencing ({rgb_pct}%)."
                        ),
                    }
                except Exception:
                    pass
            else:
                logger.warning(f"[SatQuery] ChangeFormer execution bypassed: {cf_res.get('reason')}. Falling back to RGB baseline.")

        if not cf_ran:
            # Fallback to robust RGB pixel differencing on aligned preprocessed imagery
            logger.info("[SatQuery] Executing verified RGB pixel differencing fallback...")
            change_pct, changed_pixels, total_valid, rgb_mask, bbox = _compute_image_change(
                aligned_t0, aligned_t1, polygon=polygon, valid_mask=valid_mask
            )
            active_change_mask = rgb_mask
            analysis_method = "rgb_pixel_difference"
            model_name = "Bi-temporal Spectral & Differencing Analyzer (RGB Fallback)"
            logger.info(f"[SatQuery] RGB Fallback completed: {changed_pixels} changed px ({change_pct}%).")


        # Color-space and physical scene transitions
        arr0_255 = (aligned_t0 * 255.0).astype(np.float32) if np.nanmax(aligned_t0) <= 1.5 else aligned_t0
        arr1_255 = (aligned_t1 * 255.0).astype(np.float32) if np.nanmax(aligned_t1) <= 1.5 else aligned_t1

        stats0 = analyze_scene_image(arr0_255, polygon=polygon)
        stats1 = analyze_scene_image(arr1_255, polygon=polygon)

        d_water = stats1["water_coverage_pct"] - stats0["water_coverage_pct"]
        d_veg = stats1["vegetation_coverage_pct"] - stats0["vegetation_coverage_pct"]
        d_fire = stats1["fire_coverage_pct"] - stats0["fire_coverage_pct"]
        d_burn = stats1["burn_scar_pct"] - stats0["burn_scar_pct"]
        d_urban = stats1["urban_coverage_pct"] - stats0["urban_coverage_pct"]

        # Determine objective physical change severity and description (TASK-AGNOSTIC)
        method_label = "ChangeFormer neural analysis" if analysis_method == "changeformer" else "Spectral differencing"
        change_type = "Bi-temporal Surface Change"
        if change_pct > 25.0:
            severity = "High"
        elif change_pct > 10.0:
            severity = "Medium"
        elif change_pct > 2.0:
            severity = "Low"
        else:
            severity = "Stable"

        desc = (
            f"{roi_prefix}[{method_label}] Detected surface change across {change_pct:.1f}% of valid pixels "
            f"({changed_pixels:,} changed of {total_valid:,} valid pixels)."
        )

        evidence_regions = []
        if bbox:
            evidence_regions.append({
                "bbox": bbox,
                "label": "surface_change",
                "confidence": min(0.95, max(0.5, round(change_pct / 100.0 + 0.5, 2))),
                "change_magnitude": change_pct,
            })

        elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)

        # Quality metrics & limitations
        valid_pixel_ratio = round(float(prep.valid_fraction), 4) if hasattr(prep, "valid_fraction") else round(total_valid / max(1, h * w), 4)
        alignment_quality = prep.alignment.get("confidence", 1.0) if hasattr(prep, "alignment") and isinstance(prep.alignment, dict) else 1.0
        cloud_impact = round(float(prep.cloud_mask.cloud_pixel_count) / max(1, h * w), 4) if (hasattr(prep, "cloud_mask") and prep.cloud_mask) else 0.0
        nodata_ratio = round(float(prep.invalid_pixels) / max(1, h * w), 4) if hasattr(prep, "invalid_pixels") else 0.0

        cf_limitations: List[str] = []
        if cloud_impact > 0.20:
            cf_limitations.append(f"Optical change detection affected by cloud cover ({cloud_impact*100:.1f}%).")
        if prep.alignment.get("performed"):
            cf_limitations.append("Images required spatial alignment prior to inference.")
        if not getattr(cap0, "georeferenced", False):
            cf_limitations.append("Imagery lacks georeferencing metadata; change detection computed in pixel space.")

        # Standardized generic change output (Part 2)
        standardized_output = {
            "source": "changeformer" if analysis_method == "changeformer" else "rgb_pixel_difference",
            "task": "change_detection",
            "modality": "optical",
            "result_type": "change_mask",
            "before_date": getattr(cap0, "acquisition_date", None),
            "after_date": getattr(cap1, "acquisition_date", None),
            "metrics": {
                "changed_pixel_count": changed_pixels,
                "valid_pixel_count": total_valid,
                "change_percentage": change_pct,
            },
            "spatial": {
                "bbox": bbox,
                "roi": polygon if polygon and len(polygon) >= 3 else None,
                "crs": getattr(cap0, "crs", None),
                "resolution": getattr(cap0, "resolution", None),
            },
            "quality": {
                "valid_pixel_ratio": valid_pixel_ratio,
                "alignment_quality": alignment_quality,
                "cloud_impact": cloud_impact,
                "nodata_ratio": nodata_ratio,
            },
            "limitations": cf_limitations,
        }

        result_payload = {
            "analysis_method": analysis_method,
            "change_type": change_type,
            "change_percent": change_pct,
            "severity": severity,
            "change_map_description": desc,
            "pixel_change_count": changed_pixels,
            "total_valid_pixels": total_valid,
            "t0_metrics": stats0,
            "t1_metrics": stats1,
            "evidence": {
                "analysis_method": analysis_method,
                "changed_pixels": changed_pixels,
                "valid_pixels": total_valid,
                "change_percentage": change_pct,
                "roi_applied": roi_applied,
                "alignment_performed": prep.alignment.get("performed", False),
                "cloud_mask_applied": prep.cloud_mask.applied,
            },
            "quality": {
                "valid_pixel_ratio": valid_pixel_ratio,
                "alignment_quality": alignment_quality,
                "cloud_impact": cloud_impact,
                "nodata_ratio": nodata_ratio,
            },
            "standardized_output": standardized_output,
            "preprocessing": prep.to_dict(),
            "model": model_name,
            "inference_time_ms": elapsed_ms,
        }
        if diagnostic_check:
            result_payload["diagnostic_consistency_check"] = diagnostic_check

        ao = AgentOutput(
            agent_id=self.AGENT_ID,
            agent_name=self.AGENT_NAME,
            task="Bi-temporal Change Detection",
            result=result_payload,
            evidence_regions=evidence_regions or None,
            raw_score=0.92 if analysis_method == "changeformer" else (0.88 if changed_pixels > 0 else 0.80),
        )
        if active_change_mask is not None:
            setattr(ao, "_raw_mask", active_change_mask)
        return ao


