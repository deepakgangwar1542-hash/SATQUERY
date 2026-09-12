"""
SAR-Optical Joint Analysis Evaluator — Evaluates multi-modal query requirements
across SAR (Sentinel-1) and Optical (Sentinel-2) channels.
States sensor availability and multi-modal fusion requirements honestly.
"""
from __future__ import annotations
import time
from backend.schemas.response import AgentOutput
from backend.services.data_capability import inspect_data_capability
from backend.services.cv_analyzer import decode_image_b64, analyze_scene_image


class SAROpticalAgent:
    AGENT_ID = "sar_optical_agent"
    AGENT_NAME = "SAR-Optical Joint Analysis Evaluator"

    def run(
        self,
        question: str,
        image_b64: str | None = None,
        image2_b64: str | None = None,
        **kwargs
    ) -> AgentOutput:
        t0 = time.perf_counter()
        cap1 = inspect_data_capability(image_b64)
        has_optical = cap1.data_type in ("rgb", "sentinel2", "geotiff")

        optical_stats = None
        if has_optical:
            arr = decode_image_b64(image_b64)
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

        result = {
            "question_addressed": question,
            "fusion_evaluation": "Multi-modal cross-validation",
            "optical_channel_status": "Available" if has_optical else "Missing",
            "sar_channel_status": "Absent (Sentinel-1 C-band required)",
            "fusion_insights": insights,
            "model": "SAR-Optical Joint Modality Evaluator",
            "optical_metrics": optical_stats,
            "inference_time_ms": round((time.perf_counter() - t0) * 1000, 1),
        }

        elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)

        return AgentOutput(
            agent_id=self.AGENT_ID,
            agent_name=self.AGENT_NAME,
            task="SAR-Optical Joint Analysis & Fusion",
            result=result,
            evidence_regions=None,
            raw_score=0.75 if has_optical else 0.20,
        )
