"""
SatQuery AI — Agentic Orchestrator (SIH26167)

Implements the full agentic pipeline with genuine evidence verification:
  Step 1: Query interpretation → EarthQuerySpec (via EarthQueryCompiler)
  Step 2: Data capability & Input compatibility check (real raster inspection)
  Step 3: Spatial ROI Bounding (honest geographic vs. screen-space ROI)
  Step 4: Sensor selection (evidence-based matching)
  Step 5: Specialist agent execution (genuine pixel & spectral computation)
  Step 6: Output verification & conflict detection
  Step 7: 6-Component Confidence estimation
  Step 8: Auditable provenance execution trace
"""
from __future__ import annotations
import time
import uuid
from typing import List, Optional

from backend.schemas.response import (
    QueryRequest, QueryResponse, AgentOutput, EarthQuerySpec
)
from backend.services.earthquery.compiler import compile_query
from backend.services.data_capability import inspect_data_capability
from backend.services.sensor_selector import select_sensor
from backend.services.verifier import verify
from backend.services.confidence import compute_confidence
from backend.services.provenance import ProvenanceTracker
from backend.api.routes_report import cache_report
from backend.agents.vqa_agent import VQAAgent
from backend.agents.caption_agent import CaptionAgent
from backend.agents.grounding_agent import GroundingAgent
from backend.agents.change_detection_agent import ChangeDetectionAgent
from backend.agents.change_vqa_agent import ChangeVQAAgent
from backend.agents.sar_optical_agent import SAROpticalAgent


# Intent → Agent routing table
_AGENT_REGISTRY = {
    "vqa":              [VQAAgent],
    "captioning":       [CaptionAgent],
    "grounding":        [GroundingAgent],
    "change_detection": [ChangeDetectionAgent],
    "change_vqa":       [ChangeDetectionAgent, ChangeVQAAgent],
    "sar_optical_joint":[SAROpticalAgent],
    "unknown":          [VQAAgent, CaptionAgent],
}


def run_pipeline(request: QueryRequest) -> QueryResponse:
    """Execute the full agentic pipeline for a single query request."""
    prov = ProvenanceTracker()
    query_id = str(uuid.uuid4())[:8]

    # ── Step 1: Query interpretation ──────────────────────────────────────────
    t0 = time.perf_counter()
    has_two = bool(request.image_b64 and request.image2_b64)
    spec: EarthQuerySpec = compile_query(request.question, has_two_images=has_two)
    q_summary = f"User question: '{request.question[:80]}...' (lang={request.language})" if len(request.question) > 80 else f"User question: '{request.question}'"
    prov.add_step(
        step_name="Query Interpretation",
        component="EarthQueryCompiler",
        input_summary=q_summary,
        output_summary=(
            f"Intent: {spec.intent} | Task: {spec.task_type} | "
            f"Sensor hint: {spec.sensor_hint} | Entities: {spec.extracted_entities} | "
            f"Confidence: {spec.confidence:.2f}"
        ),
        duration_ms=(time.perf_counter() - t0) * 1000,
        metadata=spec.model_dump(),
    )

    # ── Step 2: Input capability & compatibility check ────────────────────────
    t0 = time.perf_counter()
    cap1 = inspect_data_capability(request.image_b64)
    cap2 = inspect_data_capability(request.image2_b64) if request.image2_b64 else None

    has_image = cap1.data_type != "none"
    has_image2 = cap2 is not None and cap2.data_type != "none"
    compat_status = "success"
    compat_notes = []

    if spec.requires_two_images and not has_image2:
        compat_status = "warning"
        compat_notes.append("Bi-temporal task requires two images; secondary image (T1) is missing.")

    if not has_image:
        compat_status = "warning"
        compat_notes.append("No image provided — quantitative remote sensing analysis cannot proceed without raster input.")
    else:
        compat_notes.append(f"Primary image verified as {cap1.sensor} ({cap1.data_type}, {cap1.width}x{cap1.height} px).")

    prov.add_step(
        step_name="Input Capability & Compatibility Check",
        component="DataCapabilityChecker",
        input_summary=f"Primary: {cap1.sensor} ({cap1.data_type}), Secondary: {cap2.sensor if cap2 else 'none'}",
        output_summary=f"Status: {compat_status}. Notes: {'; '.join(compat_notes)}",
        duration_ms=(time.perf_counter() - t0) * 1000,
        status=compat_status,
        metadata={
            "cap1": cap1.model_dump(),
            "cap2": cap2.model_dump() if cap2 else None,
            "compat_notes": compat_notes,
        },
    )

    # ── Step 3: Spatial ROI Bounding (if polygon is provided) ──────────────────
    roi_summary: str | None = None
    if request.polygon and len(request.polygon) >= 3:
        t0 = time.perf_counter()
        pts = request.polygon
        n = len(pts)
        shoelace = abs(sum(pts[i][0] * pts[(i + 1) % n][1] - pts[(i + 1) % n][0] * pts[i][1] for i in range(n))) * 0.5
        coverage_pct = round(shoelace * 100.0, 1)

        # Honest geographic area if raster has CRS and resolution
        if cap1.georeferenced and cap1.resolution and len(cap1.resolution) >= 2:
            res_x, res_y = abs(cap1.resolution[0]), abs(cap1.resolution[1])
            pixel_area_m2 = res_x * res_y
            total_img_area_km2 = (cap1.width * cap1.height * pixel_area_m2) / 1_000_000.0
            geographic_area_km2 = round(max(0.01, shoelace * total_img_area_km2), 2)
            roi_summary = f"[Geographic ROI: ~{geographic_area_km2} km² ({coverage_pct}% of scene) · {n} Vertices]"
            out_summary = f"Georeferenced ROI area: ~{geographic_area_km2} km² (Coverage: {coverage_pct}%). CRS: {cap1.crs}."
            meta_roi = {"geographic": True, "area_km2": geographic_area_km2, "crs": cap1.crs}
        else:
            roi_summary = f"[Screen-space ROI: {coverage_pct}% of frame · {n} Vertices]"
            out_summary = f"Screen-space ROI: {coverage_pct}% of frame ({n} vertices). Bounded region constrained."
            meta_roi = {"geographic": False, "screen_coverage_pct": coverage_pct}

        prov.add_step(
            step_name="Spatial ROI Bounding",
            component="PolygonROIAnnotator",
            input_summary=f"Polygon with {n} vertices · Target: {request.target_scene or 'both'}",
            output_summary=out_summary,
            duration_ms=(time.perf_counter() - t0) * 1000,
            status="success",
            metadata=meta_roi,
        )

    # ── Step 4: Sensor selection ──────────────────────────────────────────────
    t0 = time.perf_counter()
    sensor = select_sensor(spec, request.image_b64, request.image2_b64, question=request.question)
    prov.add_step(
        step_name="Sensor Selection",
        component="SensorSelector",
        input_summary=f"Task: {spec.task_type}, Data: {cap1.sensor}",
        output_summary=f"Selected: {sensor.selected_sensor}. Rationale: {sensor.rationale[:90]}...",
        duration_ms=(time.perf_counter() - t0) * 1000,
        metadata=sensor.model_dump(),
    )

    # ── Step 5: Specialist agent execution ────────────────────────────────────
    agent_classes = _AGENT_REGISTRY.get(spec.task_type, _AGENT_REGISTRY["unknown"])
    agent_outputs: List[AgentOutput] = []

    for AgentClass in agent_classes:
        t0 = time.perf_counter()
        agent = AgentClass()
        try:
            output = agent.run(
                question=request.question,
                image_b64=request.image_b64,
                image2_b64=request.image2_b64,
                polygon=request.polygon,
                target_scene=request.target_scene,
            )
        except Exception as exc:
            output = AgentOutput(
                agent_id=getattr(AgentClass, "AGENT_ID", "unknown"),
                agent_name=getattr(AgentClass, "AGENT_NAME", "Unknown Agent"),
                task="Remote Sensing Analysis",
                result={"error": str(exc)},
                raw_score=0.0,
                error=str(exc),
            )
        agent_outputs.append(output)

        prov.add_step(
            step_name=f"Agent: {output.agent_name}",
            component=output.agent_id,
            input_summary=f"Question: '{request.question[:60]}...' | Sensor: {sensor.selected_sensor}" if len(request.question) > 60 else f"Question: '{request.question}' | Sensor: {sensor.selected_sensor}",
            output_summary=(
                f"Task: {output.task} | Score: {output.raw_score:.2f} | "
                f"Evidence regions: {len(output.evidence_regions or [])}"
                + (f" | Error: {output.error}" if output.error else "")
            ),
            duration_ms=output.result.get("inference_time_ms", (time.perf_counter() - t0) * 1000),
            status="error" if output.error else ("warning" if output.raw_score < 0.5 else "success"),
            metadata={"agent_id": output.agent_id, "raw_score": output.raw_score},
        )

    # ── Step 6: Output verification ───────────────────────────────────────────
    t0 = time.perf_counter()
    verifier_result = verify(spec, agent_outputs)
    prov.add_step(
        step_name="Evidence Verification",
        component="Verifier",
        input_summary=f"{len(agent_outputs)} agent output(s) to cross-validate",
        output_summary=(
            f"Agreement: {verifier_result.agreement} | "
            f"Conflicts: {len(verifier_result.conflicts_found)} | "
            f"Re-planned: {verifier_result.replanned}"
        ),
        duration_ms=(time.perf_counter() - t0) * 1000,
        status="warning" if verifier_result.replanned else "success",
        metadata={
            "conflicts": verifier_result.conflicts_found,
            "replanned": verifier_result.replanned,
        },
    )

    # ── Step 7: Confidence estimation ─────────────────────────────────────────
    t0 = time.perf_counter()
    confidence = compute_confidence(spec, sensor, agent_outputs, verifier_result)
    prov.add_step(
        step_name="Confidence Estimation",
        component="ConfidenceScorer",
        input_summary="All pipeline outputs aggregated",
        output_summary=(
            f"Overall: {confidence.overall:.2f} | "
            f"Task cls: {confidence.task_classification:.2f} | "
            f"Model quality: {confidence.model_output_quality:.2f} | "
            f"Evidence agreement: {confidence.evidence_agreement:.2f}"
        ),
        duration_ms=(time.perf_counter() - t0) * 1000,
        metadata=confidence.model_dump(),
    )

    # ── Step 8: Build execution trace ─────────────────────────────────────────
    execution_trace = prov.build()

    final_ans = verifier_result.final_answer
    if roi_summary:
        final_ans = f"{roi_summary} {final_ans}"

    # ── Assemble response ─────────────────────────────────────────────────────
    response = QueryResponse(
        query_id=query_id,
        question=request.question,
        earthquery_spec=spec,
        sensor_selection=sensor,
        agent_outputs=agent_outputs,
        verifier_result=verifier_result,
        confidence_breakdown=confidence,
        execution_trace=execution_trace,
        answer=final_ans,
        report_url=f"/report/download/{query_id}",
    )
    cache_report(query_id, response.model_dump())
    return response
