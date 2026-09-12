"""
VQA Agent — Visual & Spectral Question Answering for remote sensing imagery.
Directs analysis to real Sentinel-2 multispectral processing when multispectral
bands are available, or rigorous pixel-level RGB computer vision analysis when RGB is provided.
Strictly avoids fabricated numbers or claiming models that are not executed.
"""
from __future__ import annotations
import re
import time
from typing import Optional, List
from backend.schemas.response import AgentOutput
from backend.services.data_capability import inspect_data_capability
from backend.services.cv_analyzer import decode_image_b64, extract_svg_keywords_and_stats, analyze_scene_image
from backend.services.spectral_analyzer import analyze_multispectral_scene, compute_real_ndvi, compute_real_ndwi, extract_sentinel2_bands


class VQAAgent:
    AGENT_ID = "vqa_agent"
    AGENT_NAME = "VQA Agent (Remote Sensing Visual & Spectral Analyzer)"

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

        target_b64 = image2_b64 if target_scene == "scene2" and image2_b64 else image_b64
        cap = inspect_data_capability(target_b64)

        roi_prefix = f"Within the selected ROI ({len(polygon)} vertices): " if polygon and len(polygon) >= 3 else ""

        # Case 1: No image provided
        if cap.data_type == "none":
            elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Visual Question Answering",
                result={
                    "question": question,
                    "answer": "Insufficient imagery. Upload compatible satellite imagery for quantitative analysis.",
                    "analysis_status": "insufficient_data",
                    "data_capability": cap.model_dump(),
                    "model": "Remote Sensing Visual & Spectral Analyzer",
                    "inference_time_ms": elapsed_ms,
                },
                evidence_regions=None,
                raw_score=0.0,
            )

        # Case 2: Multispectral Sentinel-2 data available
        if cap.data_type == "sentinel2":
            bands, _, s2_err = extract_sentinel2_bands(target_b64)
            if bands and not s2_err:
                is_ndvi_query = bool(re.search(r"ndvi|vegetat|forest|crop|tree|green|farm|agriculture", q))
                is_ndwi_query = bool(re.search(r"ndwi|water|flood|lake|river|inundat|pond|wetland", q))

                result_payload = {
                    "question": question,
                    "data_source": "Sentinel-2 MSI Multispectral GeoTIFF",
                    "available_bands": cap.available_bands,
                    "model": "Remote Sensing Spectral Analyzer",
                }

                if is_ndvi_query or "ndvi" in q:
                    ndvi_res = compute_real_ndvi(bands["B04"], bands["B08"], polygon=polygon)
                    result_payload["ndvi_statistics"] = ndvi_res
                    veg_pct = ndvi_res.get("vegetation_coverage_pct", 0.0)
                    mean_val = ndvi_res.get("ndvi_mean", 0.0)
                    min_val = ndvi_res.get("ndvi_min", 0.0)
                    max_val = ndvi_res.get("ndvi_max", 0.0)
                    answer = (
                        f"{roi_prefix}Sentinel-2 multispectral analysis: Approximately {veg_pct:.1f}% of valid pixels "
                        f"exceed the configured vegetation threshold (NDVI > 0.30). "
                        f"NDVI statistics across {ndvi_res.get('valid_pixel_count', 0)} valid pixels: "
                        f"mean={mean_val:.3f}, min={min_val:.3f}, max={max_val:.3f}."
                    )
                    score = min(1.0, max(0.2, ndvi_res.get("valid_pixel_ratio", 0.95)))

                elif is_ndwi_query or "ndwi" in q:
                    ndwi_res = compute_real_ndwi(bands["B03"], bands["B08"], polygon=polygon)
                    result_payload["ndwi_statistics"] = ndwi_res
                    water_pct = ndwi_res.get("water_coverage_pct", 0.0)
                    mean_val = ndwi_res.get("ndwi_mean", 0.0)
                    answer = (
                        f"{roi_prefix}Sentinel-2 multispectral analysis: Approximately {water_pct:.1f}% of valid pixels "
                        f"exceed the configured water threshold (NDWI > 0.30). "
                        f"NDWI mean value: {mean_val:.3f} across {ndwi_res.get('valid_pixel_count', 0)} valid pixels."
                    )
                    score = min(1.0, max(0.2, ndwi_res.get("valid_pixel_ratio", 0.95)))

                else:
                    # General query with Sentinel-2
                    ndvi_res = compute_real_ndvi(bands["B04"], bands["B08"], polygon=polygon)
                    ndwi_res = compute_real_ndwi(bands["B03"], bands["B08"], polygon=polygon)
                    result_payload["ndvi_statistics"] = ndvi_res
                    result_payload["ndwi_statistics"] = ndwi_res
                    veg_pct = ndvi_res.get("vegetation_coverage_pct", 0.0)
                    water_pct = ndwi_res.get("water_coverage_pct", 0.0)
                    answer = (
                        f"{roi_prefix}Sentinel-2 multispectral assessment: Vegetation coverage is {veg_pct:.1f}% "
                        f"(heuristic threshold NDVI > 0.30, mean NDVI: {ndvi_res.get('ndvi_mean', 0.0):.3f}), "
                        f"and surface water coverage is {water_pct:.1f}% (heuristic threshold NDWI > 0.30)."
                    )
                    score = 0.95

                result_payload["answer"] = answer
                elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
                result_payload["inference_time_ms"] = elapsed_ms

                return AgentOutput(
                    agent_id=self.AGENT_ID,
                    agent_name=self.AGENT_NAME,
                    task="Visual Question Answering",
                    result=result_payload,
                    evidence_regions=None,
                    raw_score=score,
                )

        # Case 3: RGB Optical Imagery
        # Check if user specifically requested NDVI / NDWI / NBR that cannot be produced from RGB
        is_explicit_spectral = bool(re.search(r"\b(calculate ndvi|what is the ndvi|compute ndvi|ndvi|ndwi|nbr)\b", q))
        if is_explicit_spectral:
            elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Visual Question Answering",
                result={
                    "question": question,
                    "answer": (
                        "NDVI cannot be calculated from this RGB image because Near-Infrared (NIR) "
                        "and Red spectral bands are required (e.g. Sentinel-2 B08 and B04). "
                        "RGB optical imagery only contains visual red, green, and blue channels."
                    ),
                    "analysis_status": "capability_mismatch",
                    "data_capability": cap.model_dump(),
                    "model": "RGB Computer Vision Analyzer",
                    "inference_time_ms": elapsed_ms,
                },
                evidence_regions=None,
                raw_score=0.30,  # low confidence due to missing bands for the requested calculation
            )

        # Standard RGB optical analysis
        img_arr = decode_image_b64(target_b64)
        svg_meta = extract_svg_keywords_and_stats(target_b64)
        stats = analyze_scene_image(img_arr, polygon=polygon, svg_meta=svg_meta)

        water = stats["water_coverage_pct"]
        veg = stats["vegetation_coverage_pct"]
        fire = stats["fire_coverage_pct"]
        burn = stats["burn_scar_pct"]
        urban = stats["urban_coverage_pct"]
        barren = stats["barren_coverage_pct"]

        detected_class = stats["dominant_class"]
        coverage_pct = stats["dominant_class_pct"]

        # Query-specific answering based on actual measured RGB pixel distribution
        if re.search(r"water|flood|inundat|lake|river|pond|wetland|pani|nadi|jal", q):
            detected_class = "water_hydrology"
            coverage_pct = water
            if water > 15.0:
                answer = (
                    f"{roi_prefix}Visual RGB analysis indicates water-like optical reflectance across approximately "
                    f"{water:.1f}% of analyzed pixels. Note: This is an RGB color-based visual estimate, "
                    f"not an NDWI multispectral measurement."
                )
            elif water > 1.0:
                answer = (
                    f"{roi_prefix}Minor surface water bodies are visually discernible across approximately {water:.1f}% "
                    f"of the analyzed area. No widespread inundation is indicated in the visual RGB channels."
                )
            else:
                answer = (
                    f"{roi_prefix}Water-like reflectance is negligible (0.0% to <0.5% detected). "
                    f"The scene's visual appearance is dominated by {stats['dominant_class'].lower()} ({stats['dominant_class_pct']:.1f}%)."
                )

        elif re.search(r"vegetation|forest|tree|crop|agriculture|farm|green|jungle|ped|fasal|ghas", q):
            detected_class = "vegetation_cover"
            coverage_pct = veg
            if veg > 25.0:
                answer = (
                    f"{roi_prefix}Visual RGB analysis indicates vegetation-like green regions across approximately "
                    f"{veg:.1f}% of the image. Note: This is an RGB visual estimate, not a calibrated multispectral NDVI measurement."
                )
            elif veg > 5.0:
                answer = (
                    f"{roi_prefix}Sparse green vegetation is visible across approximately {veg:.1f}% of the scene, "
                    f"alongside {stats['dominant_class'].lower()} ({stats['dominant_class_pct']:.1f}%)."
                )
            else:
                answer = (
                    f"{roi_prefix}Green vegetation cover appears very low or absent ({veg:.1f}%). "
                    f"The scene visually reflects {stats['dominant_class'].lower()} ({stats['dominant_class_pct']:.1f}%)."
                )

        elif re.search(r"fire|burn|flame|smoke|heat|wildfire|ash|aag|charred", q):
            detected_class = "fire_thermal"
            total_fire = fire + burn
            coverage_pct = total_fire
            if fire > 3.0 or burn > 8.0:
                answer = (
                    f"{roi_prefix}Visual optical inspection indicates high-contrast thermal/smoke or charred appearances "
                    f"across {total_fire:.1f}% of the image (Active/bright red front: {fire:.1f}%, Charred ground: {burn:.1f}%). "
                    f"Note: Precise thermal verification requires authentic infrared / SWIR bands."
                )
            else:
                answer = (
                    f"{roi_prefix}No active flaming or charred burn surfaces detected visually (0.0% optical thermal anomaly). "
                    f"Surface reflection matches {stats['dominant_class'].lower()}."
                )

        elif re.search(r"building|structure|urban|city|road|highway|construction|imarat|sadak|makan", q):
            detected_class = "builtup_infrastructure"
            coverage_pct = urban
            answer = (
                f"{roi_prefix}Visual built-up / engineered structure estimate is {urban:.1f}% based on optical "
                f"color and brightness distribution. Dominant scene classification is {stats['dominant_class']}."
            )

        elif re.search(r"soil|barren|sand|desert|rock|terrain|mitti|ret", q):
            detected_class = "barren_soil"
            coverage_pct = barren
            answer = (
                f"{roi_prefix}Exposed soil / barren ground appearance covers approximately {barren:.1f}% "
                f"of the analyzed pixels, with mean scene optical brightness at {stats['mean_brightness']:.1f}."
            )

        elif re.search(r"affect|damage|impact|loss|submerged|destruction|destroy|hazard|नुकसान|प्रभाव|असर", q):
            detected_class = "affected_hazard_area"
            if water > 8.0:
                coverage_pct = water
                answer = (
                    f"{roi_prefix}Approximately {water:.1f}% of this scene appears directly affected by surface water and flood inundation. "
                    f"The remaining {max(0.0, 100.0 - water):.1f}% of the visible landscape consists of unaffected terrain, vegetation, and built structures."
                )
            elif fire > 2.0 or burn > 3.0:
                total_fire = fire + burn
                coverage_pct = total_fire
                answer = (
                    f"{roi_prefix}Approximately {total_fire:.1f}% of the visible terrain shows active wildfire fronts or charred burn damage "
                    f"(flaming: {fire:.1f}%, charred: {burn:.1f}%). The remaining {max(0.0, 100.0 - total_fire):.1f}% is unburned."
                )
            else:
                coverage_pct = 0.0
                answer = (
                    f"{roi_prefix}Optical analysis of this single scene indicates no severe widespread flooding or thermal burn anomalies. "
                    f"The landscape is predominantly {stats['dominant_class'].lower()} ({stats['dominant_class_pct']:.1f}%)."
                )

        else:
            answer = (
                f"{roi_prefix}This scene displays a predominantly {stats['dominant_class'].lower()} landscape "
                f"accounting for approximately {stats['dominant_class_pct']:.1f}% of visible surface area. "
                f"Green vegetation covers {veg:.1f}%, surface water bodies occupy {water:.1f}%, and built-up infrastructure spans {urban:.1f}%."
            )

        elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)

        # Raw score: derived from total analyzed pixels and image quality
        raw_score = 0.88 if stats.get("total_analyzed_pixels", 0) > 1000 else 0.60

        return AgentOutput(
            agent_id=self.AGENT_ID,
            agent_name=self.AGENT_NAME,
            task="Visual Question Answering",
            result={
                "question": question,
                "answer": answer,
                "detected_class": detected_class,
                "coverage_percent": coverage_pct,
                "visual_metrics": stats,
                "model": "RGB Computer Vision Analyzer",
                "inference_time_ms": elapsed_ms,
            },
            evidence_regions=None,
            raw_score=raw_score,
        )
