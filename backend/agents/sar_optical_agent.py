"""
SAR-Optical Joint Analysis & Specialist Agent — SatQuery AI.

Real Sentinel-1 C-band SAR pipeline combined with optical evaluation.
Task-aware execution:
  - "flood_impact": analyzes backscatter decrease (specular reflection), fuses with optical if present,
                    and intersects with building footprints.
  - "sar_change": log-ratio temporal SAR change analysis (increase/decrease maps).
  - "urban_change": backscatter increase (double-bounce) as supporting construction evidence.
  - "sar_optical_joint": dual-sensor cross-validation and evidence fusion.
  - other tasks: general SAR evidence extraction without false classification.

Integrity & honesty:
  If authentic Sentinel-1 SAR is not provided, reports SAR absent clearly with
  optical channel metrics, without inventing fake SAR detections.
"""
from __future__ import annotations
import time
import re
from typing import Any, Dict, List, Optional
import numpy as np

from backend.schemas.response import AgentOutput
from backend.services.data_capability import inspect_data_capability
from backend.services.cv_analyzer import decode_image_b64, analyze_scene_image
from backend.services.sar import (
    load_sar_scene,
    preprocess_sar_scene,
    analyze_sar_for_task,
    SAR1LoadError,
)
from backend.services.evidence_fusion import fuse_evidence
from backend.services.flood_analyzer import vectorize_mask_to_geometry, analyze_temporal_flood
from backend.models.buildings import get_building_manager
from backend.services.spatial_intersection import intersect_buildings_with_flood


class SAROpticalAgent:
    AGENT_ID = "sar_optical_agent"
    AGENT_NAME = "Sentinel-1 SAR Specialist & Optical Evaluator"

    def run(
        self,
        question: str,
        image_b64: Optional[str] = None,
        image2_b64: Optional[str] = None,
        polygon: Optional[List[List[float]]] = None,
        target_scene: Optional[str] = "both",
        task: Optional[str] = None,
        **kwargs,
    ) -> AgentOutput:
        t0 = time.perf_counter()
        q = (question or "").lower()

        cap1 = inspect_data_capability(image_b64)
        cap2 = inspect_data_capability(image2_b64) if image2_b64 else None

        has_sar1 = cap1.data_type == "sentinel1"
        has_sar2 = cap2 is not None and cap2.data_type == "sentinel1"
        has_any_sar = has_sar1 or has_sar2

        has_optical1 = cap1.data_type in ("rgb", "geotiff", "sentinel2")
        has_optical2 = cap2 is not None and cap2.data_type in ("rgb", "geotiff", "sentinel2")
        has_any_optical = has_optical1 or has_optical2

        # Infer task if not explicitly passed
        if not task:
            if re.search(r"\b(flood|flooding|inundat|submerge|baadh)\b", q):
                task = "flood_impact"
            elif re.search(r"\b(urban|construction|built-up|building)\b.*(change|expand|growth)", q):
                task = "urban_change"
            elif re.search(r"\b(vegetation|forest|canopy|ndvi)\b", q):
                task = "vegetation_change"
            elif re.search(r"\b(sar|radar|sentinel-1|backscatter)\b", q):
                task = "sar_change"
            elif image2_b64 is not None:
                task = "change_detection"
            else:
                task = "sar_optical_joint"

        # ─────────────────────────────────────────────────────────────────────
        # Case 1: Authentic Sentinel-1 SAR is present
        # ─────────────────────────────────────────────────────────────────────
        if has_any_sar:
            try:
                # Load SAR scenes
                sar_b64_t0 = image_b64 if has_sar1 else image2_b64
                sar_b64_t1 = image2_b64 if (has_sar1 and has_sar2) else None

                scene_t0 = load_sar_scene(sar_b64_t0)
                prep_t0 = preprocess_sar_scene(scene_t0)

                prep_t1 = None
                if sar_b64_t1 is not None:
                    scene_t1 = load_sar_scene(sar_b64_t1)
                    prep_t1 = preprocess_sar_scene(scene_t1)

                # Convert polygon to mask if needed
                poly_mask = None
                if polygon and len(polygon) >= 3:
                    h, w = prep_t0.height, prep_t0.width
                    from matplotlib.path import Path
                    poly_px = [(p[0] * w, p[1] * h) for p in polygon]
                    path = Path(poly_px)
                    y, x = np.mgrid[:h, :w]
                    points = np.vstack((x.flatten(), y.flatten())).T
                    poly_mask = path.contains_points(points).reshape((h, w))

                sar_analysis_res = analyze_sar_for_task(
                    prep_t0=prep_t0,
                    prep_t1=prep_t1,
                    task=task,
                    polygon_mask=poly_mask,
                )

                fusion_dict = None
                building_impact_dict = None
                evidence_regions = []
                final_mask = sar_analysis_res.evidence_mask

                # Check if optical data exists for fusion
                if has_any_optical:
                    opt_b64 = image_b64 if has_optical1 else image2_b64
                    opt_arr = decode_image_b64(opt_b64)
                    if opt_arr is not None:
                        opt_mask = None
                        if task == "flood_impact" and image_b64 and image2_b64 and not has_sar2:
                            # Optical temporal pair
                            arr1 = decode_image_b64(image_b64)
                            arr2 = decode_image_b64(image2_b64)
                            if arr1 is not None and arr2 is not None:
                                opt_flood = analyze_temporal_flood(arr1, arr2, polygon=polygon)
                                opt_mask = opt_flood.flood_increase_mask

                        # Run evidence fusion
                        fuse_res = fuse_evidence(
                            sar_mask=sar_analysis_res.evidence_mask,
                            optical_mask=opt_mask,
                            task=task,
                        )
                        fusion_dict = fuse_res.to_dict()
                        if fuse_res.final_mask is not None:
                            final_mask = fuse_res.final_mask

                # If task is flood_impact or buildings query, evaluate building intersection
                if (task == "flood_impact" or re.search(r"\b(building|house|structure|imarat)\b", q)) and final_mask is not None:
                    # Target optical image if available, else SAR
                    inspect_arr = decode_image_b64(image2_b64 or image_b64)
                    if inspect_arr is not None:
                        b_mgr = get_building_manager()
                        b_res = b_mgr.detect_buildings(
                            image_arr=inspect_arr,
                            transform=prep_t0.transform,
                            crs=prep_t0.crs,
                            resolution=prep_t0.resolution,
                        )
                        if b_res.success and b_res.building_count is not None:
                            # Vectorize flood mask to geometry
                            flood_geom = vectorize_mask_to_geometry(
                                final_mask,
                                transform=prep_t0.transform,
                                crs=prep_t0.crs,
                            )
                            inter_res = intersect_buildings_with_flood(
                                buildings=b_res.building_instances,
                                flood_geometry=flood_geom,
                                overlap_threshold=b_mgr.config.flood_overlap_threshold,
                            )
                            building_impact_dict = inter_res.to_dict()

                            # Add affected building bounding boxes
                            affected_set = set(inter_res.affected_building_ids)
                            scale_y = 512.0 / inspect_arr.shape[0]
                            scale_x = 512.0 / inspect_arr.shape[1]
                            for b_inst in b_res.building_instances:
                                if b_inst.building_id in affected_set:
                                    evidence_regions.append({
                                        "bbox": [
                                            int(b_inst.bbox_pixel[0] * scale_y),
                                            int(b_inst.bbox_pixel[1] * scale_x),
                                            int(b_inst.bbox_pixel[2] * scale_y),
                                            int(b_inst.bbox_pixel[3] * scale_x),
                                        ],
                                        "label": f"Affected Building #{b_inst.building_id}",
                                        "confidence": 0.88,
                                        "modality": "sar_optical_fusion",
                                    })

                elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
                result: Dict[str, Any] = {
                    "task_addressed": task,
                    "model": "Sentinel-1 C-Band SAR Specialist",
                    "sar_status": "Active (Sentinel-1 GRD Verified)",
                    "sar_analysis": sar_analysis_res.to_metadata_dict(),
                    "polarizations_used": sar_analysis_res.polarizations_used,
                    "evidence_fraction": sar_analysis_res.evidence_fraction,
                    "evidence_area_km2": sar_analysis_res.evidence_area_km2,
                    "limitations": sar_analysis_res.limitations,
                    "inference_time_ms": elapsed_ms,
                }
                if fusion_dict:
                    result["fusion"] = fusion_dict
                if building_impact_dict:
                    result["building_impact"] = building_impact_dict

                return AgentOutput(
                    agent_id=self.AGENT_ID,
                    agent_name=self.AGENT_NAME,
                    task=f"SAR Analysis ({task})",
                    result=result,
                    evidence_regions=evidence_regions if evidence_regions else None,
                    raw_score=0.91,
                )

            except SAR1LoadError as e:
                elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
                return AgentOutput(
                    agent_id=self.AGENT_ID,
                    agent_name=self.AGENT_NAME,
                    task="SAR Analysis",
                    result={"error": str(e), "sar_status": "Load Error", "inference_time_ms": elapsed_ms},
                    raw_score=0.20,
                    error=str(e),
                )
            except Exception as exc:
                elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
                return AgentOutput(
                    agent_id=self.AGENT_ID,
                    agent_name=self.AGENT_NAME,
                    task="SAR Analysis",
                    result={"error": str(exc), "sar_status": "Processing Error", "inference_time_ms": elapsed_ms},
                    raw_score=0.20,
                    error=str(exc),
                )

        # ─────────────────────────────────────────────────────────────────────
        # Case 2: SAR is absent — Honest evaluation and optical channel report
        # ─────────────────────────────────────────────────────────────────────
        optical_stats = None
        if has_any_optical:
            opt_b64 = image_b64 if has_optical1 else image2_b64
            arr = decode_image_b64(opt_b64)
            if arr is not None:
                optical_stats = analyze_scene_image(arr)

        insights = [
            "SAR structural evaluation: Authentic Sentinel-1 C-band SAR backscatter (VV/VH channels) is required for microwave surface roughness measurement.",
            (
                f"Optical channel verified: Scene exhibits dominant {optical_stats['dominant_class']} "
                f"({optical_stats['dominant_class_pct']:.1f}% optical coverage)."
                if optical_stats else "Optical channel: No optical image payload provided."
            ),
            "Dual-stream fusion recommendation: Pair Sentinel-1 GRD backscatter with Sentinel-2 multispectral bands for cloud-penetrating water/urban mapping.",
        ]

        elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
        result = {
            "question_addressed": question,
            "task_requested": task,
            "fusion_evaluation": "Multi-modal cross-validation",
            "optical_channel_status": "Available" if has_any_optical else "Missing",
            "sar_channel_status": "Absent (Sentinel-1 C-band required)",
            "fusion_insights": insights,
            "model": "SAR-Optical Joint Modality Evaluator",
            "optical_metrics": optical_stats,
            "limitations": [
                "Sentinel-1 C-band SAR data was not provided in request.",
                "SAR microwave analysis cannot proceed without authentic Sentinel-1 GeoTIFF.",
            ],
            "inference_time_ms": elapsed_ms,
        }

        return AgentOutput(
            agent_id=self.AGENT_ID,
            agent_name=self.AGENT_NAME,
            task="SAR-Optical Joint Analysis & Fusion",
            result=result,
            evidence_regions=None,
            raw_score=0.75 if has_any_optical else 0.20,
        )
