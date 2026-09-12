"""
Change Detection Agent — Bi-temporal change analysis between two images.
Computes real pixel-level difference between T0 and T1 without fabricated
change percentages or hardcoded bounding boxes.
"""
from __future__ import annotations
import re
import time
from typing import Optional, List, Dict, Any
import numpy as np
from PIL import Image

from backend.schemas.response import AgentOutput
from backend.services.data_capability import inspect_data_capability
from backend.services.cv_analyzer import decode_image_b64, extract_svg_keywords_and_stats, analyze_scene_image
from backend.services.spectral_analyzer import extract_sentinel2_bands, compute_real_ndvi


def _compute_image_change(
    img0: np.ndarray,
    img1: np.ndarray,
    polygon: list[list[float]] | None = None
) -> Tuple[float, int, int, np.ndarray, Optional[List[int]]]:
    """
    Computes real per-pixel Euclidean color distance difference between two aligned images.
    Returns: (change_percent, changed_pixel_count, total_valid_pixels, change_mask, bbox)
    """
    # Align dimensions if mismatched
    if img0.shape != img1.shape:
        h, w = min(img0.shape[0], img1.shape[0]), min(img0.shape[1], img1.shape[1])
        im0_pil = Image.fromarray(np.clip(img0, 0, 255).astype(np.uint8)).resize((w, h), Image.Resampling.BILINEAR)
        im1_pil = Image.fromarray(np.clip(img1, 0, 255).astype(np.uint8)).resize((w, h), Image.Resampling.BILINEAR)
        arr0 = np.array(im0_pil, dtype=np.float32)
        arr1 = np.array(im1_pil, dtype=np.float32)
    else:
        arr0 = img0
        arr1 = img1
        h, w = arr0.shape[0], arr0.shape[1]

    # Compute Euclidean difference in color space
    diff = np.sqrt(np.sum((arr1 - arr0) ** 2, axis=-1))

    # Polygon ROI mask
    mask = np.ones((h, w), dtype=bool)
    if polygon and len(polygon) >= 3:
        from backend.services.cv_analyzer import compute_polygon_mask
        mask = compute_polygon_mask(h, w, polygon)

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
            # Format [ymin, xmin, ymax, xmax] scaled to 0..512 standard preview
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
    AGENT_NAME = "Change Detection Agent (Bi-temporal Spectral & Differencing Analyzer)"

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

        roi_prefix = f"ROI Analysis ({len(polygon)} pts): " if polygon and len(polygon) >= 3 else ""

        # Case 1: Missing secondary image
        if not image_b64 or not image2_b64:
            elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Bi-temporal Change Detection",
                result={
                    "change_type": "Insufficient Bi-temporal Imagery",
                    "severity": "Unknown",
                    "change_percent": 0.0,
                    "changed_area_km2": 0.0,
                    "pixel_change_count": 0,
                    "change_map_description": (
                        f"{roi_prefix}Bi-temporal change detection requires both pre-event (T0) "
                        f"and post-event (T1) imagery. Please supply two images to perform change comparison."
                    ),
                    "model": "Bi-temporal Spectral & Differencing Analyzer",
                    "inference_time_ms": elapsed_ms,
                },
                evidence_regions=None,
                raw_score=0.20,
                error="Secondary image (T1) required for bi-temporal change detection.",
            )

        # Check for Sentinel-2 multispectral pair
        cap0 = inspect_data_capability(image_b64)
        cap1 = inspect_data_capability(image2_b64)

        if cap0.data_type == "sentinel2" and cap1.data_type == "sentinel2":
            bands0, _, err0 = extract_sentinel2_bands(image_b64)
            bands1, _, err1 = extract_sentinel2_bands(image2_b64)

            if bands0 and bands1 and not err0 and not err1:
                ndvi0_res = compute_real_ndvi(bands0["B04"], bands0["B08"], polygon=polygon)
                ndvi1_res = compute_real_ndvi(bands1["B04"], bands1["B08"], polygon=polygon)

                # Vectorized delta NDVI
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
                        "change_type": change_type,
                        "change_percent": change_pct,
                        "delta_ndvi_mean": d_ndvi_mean,
                        "severity": severity,
                        "change_map_description": desc,
                        "t0_metrics": {"vegetation_coverage_pct": veg0, "ndvi_mean": ndvi0_res.get("ndvi_mean")},
                        "t1_metrics": {"vegetation_coverage_pct": veg1, "ndvi_mean": ndvi1_res.get("ndvi_mean")},
                        "model": "Bi-temporal Spectral & Differencing Analyzer",
                        "inference_time_ms": elapsed_ms,
                    },
                    evidence_regions=None,
                    raw_score=0.94,
                )

        # Decode actual pixel arrays for RGB imagery
        img0_arr = decode_image_b64(image_b64)
        img1_arr = decode_image_b64(image2_b64)

        if img0_arr is None or img1_arr is None:
            elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Bi-temporal Change Detection",
                result={
                    "change_type": "Corrupt / Invalid Imagery",
                    "severity": "Unknown",
                    "change_percent": 0.0,
                    "change_map_description": "Failed to decode one or both raster payloads.",
                    "model": "Bi-temporal Spectral & Differencing Analyzer",
                    "inference_time_ms": elapsed_ms,
                },
                raw_score=0.0,
                error="Invalid image payload.",
            )

        # Real pixel differencing
        change_pct, changed_pixels, total_valid, _, bbox = _compute_image_change(img0_arr, img1_arr, polygon=polygon)

        stats0 = analyze_scene_image(img0_arr, polygon=polygon)
        stats1 = analyze_scene_image(img1_arr, polygon=polygon)

        d_water = stats1["water_coverage_pct"] - stats0["water_coverage_pct"]
        d_veg = stats1["vegetation_coverage_pct"] - stats0["vegetation_coverage_pct"]
        d_fire = stats1["fire_coverage_pct"] - stats0["fire_coverage_pct"]
        d_burn = stats1["burn_scar_pct"] - stats0["burn_scar_pct"]
        d_urban = stats1["urban_coverage_pct"] - stats0["urban_coverage_pct"]

        # Determine dominant physical transition between T0 and T1
        if d_fire > 3.0 or d_burn > 5.0 or (stats1["fire_coverage_pct"] > 3.0 and "fire" in q):
            change_type = "Wildfire / Burn Scar Progression"
            severity = "Critical"
            desc = (
                f"{roi_prefix}Thermal and charred expansion detected across {change_pct:.1f}% of pixels. "
                f"Active fire: {stats1['fire_coverage_pct']:.1f}%, charred surface: {stats1['burn_scar_pct']:.1f}%."
            )
        elif d_water > 3.0 or (stats1["water_coverage_pct"] > 10.0 and ("flood" in q or "water" in q)):
            change_type = "Flood Inundation & Hydrological Expansion"
            severity = "High"
            desc = (
                f"{roi_prefix}Water-like optical expansion of +{d_water:.1f}% (T0: {stats0['water_coverage_pct']:.1f}% "
                f"→ T1: {stats1['water_coverage_pct']:.1f}%). Total changed area: {change_pct:.1f}% of scene."
            )
        elif d_veg < -8.0:
            change_type = "Vegetation Degradation / Canopy Loss"
            severity = "High"
            desc = (
                f"{roi_prefix}Green canopy appearance decreased from {stats0['vegetation_coverage_pct']:.1f}% (T0) "
                f"to {stats1['vegetation_coverage_pct']:.1f}% (T1) (Net loss: {abs(d_veg):.1f}%)."
            )
        elif d_urban > 5.0:
            change_type = "Urban & Infrastructure Expansion"
            severity = "Medium"
            desc = (
                f"{roi_prefix}Built-up surface appearance increased by +{d_urban:.1f}% across analyzed corridors."
            )
        else:
            change_type = "Surface State Shift"
            severity = "Low"
            desc = (
                f"{roi_prefix}Surface reflectance shift detected across {change_pct:.1f}% of pixels. "
                f"Dominant pre-event: {stats0['dominant_class']} ({stats0['dominant_class_pct']:.1f}%) → "
                f"Post-event: {stats1['dominant_class']} ({stats1['dominant_class_pct']:.1f}%)."
            )

        evidence_regions = []
        if bbox:
            evidence_regions.append({
                "bbox": bbox,
                "label": change_type,
                "confidence": min(0.95, max(0.5, round(change_pct / 100.0 + 0.5, 2))),
                "change_magnitude": change_pct,
            })

        elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)

        return AgentOutput(
            agent_id=self.AGENT_ID,
            agent_name=self.AGENT_NAME,
            task="Bi-temporal Change Detection",
            result={
                "change_type": change_type,
                "change_percent": change_pct,
                "severity": severity,
                "change_map_description": desc,
                "pixel_change_count": changed_pixels,
                "total_valid_pixels": total_valid,
                "t0_metrics": stats0,
                "t1_metrics": stats1,
                "model": "Bi-temporal Spectral & Differencing Analyzer",
                "inference_time_ms": elapsed_ms,
            },
            evidence_regions=evidence_regions or None,
            raw_score=0.90 if changed_pixels > 0 else 0.80,
        )
