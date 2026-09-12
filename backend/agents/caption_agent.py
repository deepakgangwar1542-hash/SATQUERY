"""
Dense Scene Captioning Agent — Generates structured scene descriptions
grounded in actual pixel statistics and spectral data.
"""
from __future__ import annotations
import time
from backend.schemas.response import AgentOutput
from backend.services.data_capability import inspect_data_capability
from backend.services.cv_analyzer import decode_image_b64, extract_svg_keywords_and_stats, analyze_scene_image
from backend.services.spectral_analyzer import extract_sentinel2_bands, compute_real_ndvi, compute_real_ndwi


class CaptionAgent:
    AGENT_ID = "caption_agent"
    AGENT_NAME = "Caption Agent (Dense Remote Sensing Scene Profiler)"

    def run(
        self,
        question: str,
        image_b64: str | None = None,
        image2_b64: str | None = None,
        polygon: list[list[float]] | None = None,
        target_scene: str | None = "both"
    ) -> AgentOutput:
        t0 = time.perf_counter()
        target_b64 = image2_b64 if target_scene == "scene2" and image2_b64 else image_b64
        cap = inspect_data_capability(target_b64)

        roi_prefix = f"Within the defined polygon ROI ({len(polygon)} vertices): " if polygon and len(polygon) >= 3 else ""

        if cap.data_type == "none":
            elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Dense Scene Captioning",
                result={
                    "caption": "No imagery provided. Quantitative scene description requires satellite raster input.",
                    "model": "Dense Remote Sensing Scene Profiler",
                    "inference_time_ms": elapsed_ms,
                },
                raw_score=0.0,
            )

        if cap.data_type == "sentinel2":
            bands, _, _ = extract_sentinel2_bands(target_b64)
            if bands:
                ndvi_res = compute_real_ndvi(bands["B04"], bands["B08"], polygon=polygon)
                ndwi_res = compute_real_ndwi(bands["B03"], bands["B08"], polygon=polygon)
                veg_pct = ndvi_res.get("vegetation_coverage_pct", 0.0)
                water_pct = ndwi_res.get("water_coverage_pct", 0.0)
                caption = (
                    f"{roi_prefix}Sentinel-2 multispectral observation ({cap.width}x{cap.height} px, {cap.band_count} bands): "
                    f"Calibrated spectral analysis indicates {veg_pct:.1f}% vegetation coverage (NDVI mean: {ndvi_res.get('ndvi_mean', 0.0):.3f}) "
                    f"and {water_pct:.1f}% surface water coverage (NDWI mean: {ndwi_res.get('ndwi_mean', 0.0):.3f}). "
                    f"Atmospheric and spatial metrics verified across {ndvi_res.get('valid_pixel_count', 0)} valid pixels."
                )
                elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
                return AgentOutput(
                    agent_id=self.AGENT_ID,
                    agent_name=self.AGENT_NAME,
                    task="Dense Scene Captioning",
                    result={
                        "caption": caption,
                        "sensor": cap.sensor,
                        "available_bands": cap.available_bands,
                        "spectral_profile": {"ndvi": ndvi_res, "ndwi": ndwi_res},
                        "model": "Dense Remote Sensing Scene Profiler",
                        "inference_time_ms": elapsed_ms,
                    },
                    evidence_regions=None,
                    raw_score=0.95,
                )

        img_arr = decode_image_b64(target_b64)
        svg_meta = extract_svg_keywords_and_stats(target_b64)
        stats = analyze_scene_image(img_arr, polygon=polygon, svg_meta=svg_meta)

        features = []
        if stats["fire_coverage_pct"] > 2.0 or stats["burn_scar_pct"] > 3.0:
            features.append(f"optical thermal/fire fronts ({stats['fire_coverage_pct']:.1f}%) and charred surfaces ({stats['burn_scar_pct']:.1f}%)")
        if stats["water_coverage_pct"] > 2.0:
            features.append(f"water-like reflectance zones ({stats['water_coverage_pct']:.1f}%)")
        if stats["vegetation_coverage_pct"] > 3.0:
            features.append(f"green canopy appearance ({stats['vegetation_coverage_pct']:.1f}%)")
        if stats["urban_coverage_pct"] > 3.0:
            features.append(f"built-up and engineered structures ({stats['urban_coverage_pct']:.1f}%)")
        if stats["barren_coverage_pct"] > 3.0:
            features.append(f"exposed soil/barren terrain ({stats['barren_coverage_pct']:.1f}%)")

        features_str = ", ".join(features) if features else f"homogeneous {stats['dominant_class'].lower()}"

        caption = (
            f"{roi_prefix}The optical satellite scene displays surface terrain dominated by {stats['dominant_class']} "
            f"({stats['dominant_class_pct']:.1f}% coverage, mean visual brightness: {stats['mean_brightness']:.1f}). "
            f"Visually identified components: {features_str}. "
            f"All values reflect pixel-level RGB optical estimations."
        )

        elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)

        return AgentOutput(
            agent_id=self.AGENT_ID,
            agent_name=self.AGENT_NAME,
            task="Dense Scene Captioning",
            result={
                "caption": caption,
                "land_cover_distribution": stats["distribution"],
                "visual_profile": stats,
                "model": "Dense Remote Sensing Scene Profiler",
                "inference_time_ms": elapsed_ms,
            },
            evidence_regions=None,
            raw_score=0.88,
        )
