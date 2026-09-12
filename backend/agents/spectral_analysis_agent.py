"""
Spectral Analysis Agent - SatQuery AI.

Performs remote sensing spectral index analysis (NDVI, NDWI, NBR) using
Sentinel-2 multispectral bands.

Honest capability reporting:
If input imagery is RGB without NIR band, reports that multispectral bands
are missing rather than synthesizing fake NDVI values.
"""
from __future__ import annotations
import time
from typing import Any, Dict, List, Optional
import numpy as np

from backend.schemas.response import AgentOutput
from backend.services.data_capability import inspect_data_capability
from backend.services.spectral_analyzer import (
    extract_sentinel2_bands,
    compute_real_ndvi,
    compute_real_ndwi,
    analyze_multispectral_scene,
)


class SpectralAnalysisAgent:
    AGENT_ID = "spectral_analysis_agent"
    AGENT_NAME = "Sentinel-2 Multispectral & Spectral Index Specialist"

    def run(
        self,
        question: str,
        image_b64: Optional[str] = None,
        image2_b64: Optional[str] = None,
        polygon: Optional[List[List[float]]] = None,
        target_scene: Optional[str] = "both",
        **kwargs,
    ) -> AgentOutput:
        t0 = time.perf_counter()
        cap = inspect_data_capability(image_b64)

        if cap.data_type == "none":
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Multispectral Index Analysis",
                result={
                    "status": "error",
                    "error": "No satellite imagery provided.",
                    "inference_time_ms": round((time.perf_counter() - t0) * 1000, 1),
                },
                raw_score=0.0,
                error="No imagery provided",
            )

        # Check for multispectral NIR capability
        bands, cap_detail, err = extract_sentinel2_bands(image_b64)
        if bands is None or "B08" not in bands:
            elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
            msg = (
                err or "NDVI cannot be calculated from this RGB image because Near-Infrared (NIR) band is not available. "
                "The supplied optical image is standard RGB and lacks NIR. "
                "Multispectral indices cannot be computed without genuine Sentinel-2 or GeoTIFF NIR data."
            )
            result = {
                "capability_status": "insufficient_bands",
                "analysis_status": "capability_mismatch",
                "answer": msg,
                "detected_format": cap.data_type,
                "band_count": getattr(cap, "band_count", 3),
                "message": msg,
                "model": "Spectral Analysis Engine (Sentinel-2)",
                "inference_time_ms": elapsed_ms,
            }
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Multispectral Index Analysis",
                result=result,
                raw_score=0.25,
                error="NIR band unavailable for spectral index computation",
            )

        # Real multispectral computation
        ndvi_res = compute_real_ndvi(bands["B04"], bands["B08"], polygon=polygon)
        ndwi_res = compute_real_ndwi(bands["B03"], bands["B08"], polygon=polygon) if "B03" in bands else {}
        scene_stats = {
            "sensor": cap.sensor if cap else "Sentinel-2",
            "bands_used": list(bands.keys()),
            "dimensions": [bands["B04"].shape[1], bands["B04"].shape[0]],
        }

        elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
        mean_v = ndvi_res.get("ndvi_mean", 0.0)
        valid_p = ndvi_res.get("valid_pixel_count", 0)
        answer = f"Sentinel-2 multispectral index analysis: Mean NDVI is {mean_v:.3f} across {valid_p} valid pixels."
        result = {
            "status": "success",
            "model": "Sentinel-2 Spectral Engine",
            "answer": answer,
            "ndvi": ndvi_res,
            "ndwi": ndwi_res,
            "scene_statistics": scene_stats,
            "inference_time_ms": elapsed_ms,
        }

        score = 0.88 if ndvi_res.get("valid_pixel_count", 0) > 0 else 0.40
        return AgentOutput(
            agent_id=self.AGENT_ID,
            agent_name=self.AGENT_NAME,
            task="Multispectral Index Analysis",
            result=result,
            raw_score=score,
        )
