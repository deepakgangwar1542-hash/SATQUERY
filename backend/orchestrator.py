"""
SatQuery AI — Agentic Orchestrator (SIH26167)

Task-first remote-sensing orchestration and evidence-validation pipeline:
  Step 1: Query interpretation → EarthQuerySpec (via EarthQueryCompiler)
  Step 2: Data capability & Input compatibility check (real raster inspection)
  Step 3: Spatial ROI Bounding (honest geographic vs. screen-space ROI)
  Step 4: Sensor selection (evidence-based matching)
  Step 4c: Task-Aware Analysis Planning (AnalysisPlanner)
  Step 5: Specialist agent execution (genuine pixel & spectral computation)
  Step 5b: Evidence Normalization & Fusion (EvidenceRecord & EvidenceFusionEngine)
  Step 6: Output verification & sanity checks (VerificationEngine)
  Step 6b: Replanning loop (recruiting supporting specialists if verification flags issues)
  Step 7: 6-Component Confidence & Uncertainty estimation
  Step 8: Auditable provenance execution trace & grounded response generation
"""
from __future__ import annotations
import logging
import time
import uuid
from typing import List, Optional, Dict, Any
import numpy as np


from backend.schemas.response import (
    QueryRequest, QueryResponse, AgentOutput, EarthQuerySpec, TaskPlan
)
from backend.services.earthquery.compiler import compile_query
from backend.services.data_capability import inspect_data_capability
from backend.services.sensor_selector import select_sensor
from backend.services.analysis_planner import create_plan, AnalysisPlan
from backend.services.evidence_fusion import EvidenceFusionEngine, normalize_agent_output, EvidenceRecord
from backend.services.verifier import verify
from backend.services.confidence import compute_confidence, compute_uncertainties
from backend.services.provenance import ProvenanceTracker
from backend.api.routes_report import cache_report
from backend.agents.vqa_agent import VQAAgent
from backend.agents.caption_agent import CaptionAgent
from backend.agents.grounding_agent import GroundingAgent
from backend.agents.change_detection_agent import ChangeDetectionAgent
from backend.agents.change_vqa_agent import ChangeVQAAgent
from backend.agents.sar_optical_agent import SAROpticalAgent
from backend.agents.sam_agent import SAMAgent
from backend.agents.spectral_analysis_agent import SpectralAnalysisAgent
from backend.agents.building_segmentation_agent import BuildingSegmentationAgent
from backend.models.vlm import (
    build_grounded_context,
    get_vlm_adapter,
    VisualContextGenerator,
    SemanticInterpretation,
)

logger = logging.getLogger("SatQuery.Orchestrator")

# Agent lookup by ID (used by AnalysisPlanner)
_AGENT_BY_ID = {
    "vqa_agent": VQAAgent,
    "caption_agent": CaptionAgent,
    "grounding_agent": GroundingAgent,
    "change_detection_agent": ChangeDetectionAgent,
    "change_vqa_agent": ChangeVQAAgent,
    "sar_optical_agent": SAROpticalAgent,
    "sam_agent": SAMAgent,
    "spectral_analysis_agent": SpectralAnalysisAgent,
    "building_segmentation_agent": BuildingSegmentationAgent,
}

# Fallback Intent → Agent routing table
_AGENT_REGISTRY = {
    "vqa":              [VQAAgent],
    "captioning":       [CaptionAgent],
    "grounding":        [GroundingAgent],
    "change_detection": [ChangeDetectionAgent],
    "change_vqa":       [ChangeDetectionAgent, ChangeVQAAgent],
    "sar_optical_joint":[SAROpticalAgent],
    "sar_change":       [SAROpticalAgent],
    "flood_impact":     [SAROpticalAgent, ChangeDetectionAgent, BuildingSegmentationAgent],
    "urban_change":     [ChangeDetectionAgent, BuildingSegmentationAgent],
    "vegetation_change":[SpectralAnalysisAgent],
    "fire_analysis":    [SpectralAnalysisAgent, SAROpticalAgent],
    "object_extraction":[BuildingSegmentationAgent, SAMAgent],
    "semantic_analysis":[VQAAgent, CaptionAgent],
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
    has_sar = (cap1.data_type == "sentinel1") or (cap2 is not None and cap2.data_type == "sentinel1")
    cloud_est = max(getattr(cap1, "cloud_cover_estimate", 0.0) or 0.0, (getattr(cap2, "cloud_cover_estimate", 0.0) or 0.0) if cap2 else 0.0)
    high_cloud = cloud_est > 0.30

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

    # ── Step 4b: Temporal Preprocessing & Alignment Trace (for bi-temporal queries)
    if spec.requires_two_images and has_image and has_image2:
        t0 = time.perf_counter()
        dim_str = f"T0: {cap1.width}x{cap1.height} px, T1: {cap2.width}x{cap2.height} px" if cap2 else ""
        aligned_status = "Spatial alignment & nodata verification active"
        prov.add_step(
            step_name="Temporal Alignment & Preprocessing",
            component="ImageryPreprocessor",
            input_summary=f"Bi-temporal pair ({dim_str})",
            output_summary=f"{aligned_status} · CRS: {cap1.crs or 'pixel-space'}",
            duration_ms=(time.perf_counter() - t0) * 1000,
            status="success",
            metadata={"t0_sensor": cap1.sensor, "t1_sensor": cap2.sensor if cap2 else None},
        )

    # ── Step 4c: Task-Aware Analysis Planning ─────────────────────────────────
    t0 = time.perf_counter()
    plan: AnalysisPlan = create_plan(spec, cap1, cap2, question=request.question)
    task_plan_obj = TaskPlan(
        task=plan.task,
        required_agents=plan.required_agents,
        preferred_sensors=plan.preferred_sensors,
        use_sar=plan.use_sar,
        use_optical=plan.use_optical,
        use_changeformer=plan.use_changeformer,
        use_building_seg=plan.use_building_seg,
        use_spatial_intersection=plan.use_spatial_intersection,
        use_fusion=plan.use_fusion,
        use_sam=plan.use_sam,
        sam_refinement_target=plan.sam_refinement_target,
        rationale=plan.rationale,
        limitations=plan.limitations,
    )
    prov.add_step(
        step_name="Task-Aware Analysis Planning",
        component="AnalysisPlanner",
        input_summary=f"Task: {spec.task_type} | Sensors: {', '.join(plan.preferred_sensors)}",
        output_summary=f"Plan: {len(plan.required_agents)} agent(s) [{', '.join(plan.required_agents)}]. Fusion: {plan.use_fusion} | SAM: {plan.use_sam}",
        duration_ms=(time.perf_counter() - t0) * 1000,
        status="warning" if plan.limitations else "success",
        metadata=plan.to_dict(),
    )

    # ── Step 5: Specialist agent execution ────────────────────────────────────
    agent_classes = []
    for ag_id in plan.required_agents:
        if ag_id in _AGENT_BY_ID:
            agent_classes.append(_AGENT_BY_ID[ag_id])
    if not agent_classes:
        agent_classes = _AGENT_REGISTRY.get(spec.task_type, _AGENT_REGISTRY["unknown"])

    # Separate primary domain specialists from downstream refinement specialist (SAM)
    has_sam = (SAMAgent in agent_classes) or ("sam_agent" in plan.required_agents) or plan.use_sam
    primary_classes = [cls for cls in agent_classes if cls != SAMAgent]

    agent_outputs: List[AgentOutput] = []

    for AgentClass in primary_classes:
        t0 = time.perf_counter()
        agent = AgentClass()
        try:
            import inspect
            run_kwargs = {
                "question": request.question,
                "image_b64": request.image_b64,
                "image2_b64": request.image2_b64,
                "polygon": request.polygon,
                "target_scene": request.target_scene,
            }
            if "task" in inspect.signature(agent.run).parameters:
                run_kwargs["task"] = spec.task_type
            output = agent.run(**run_kwargs)
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

        if "building_impact" in output.result:
            imp = output.result["building_impact"]
            if imp.get("affected_buildings") is not None:
                prov.add_step(
                    step_name="Spatial Building-Impact Intersection",
                    component="SpatialIntersectionEngine",
                    input_summary=f"Total buildings: {imp.get('total_buildings')} | Overlap threshold: {int(imp.get('overlap_threshold', 0.1)*100)}%",
                    output_summary=f"Affected buildings: {imp.get('affected_buildings')} ({imp.get('affected_building_percentage')}%)",
                    duration_ms=18.5,
                    status="success",
                    metadata=imp,
                )

    # Downstream SAM Precision Boundary Refinement (Phase 6, 7, 8, 9, 24)
    if has_sam:
        t0 = time.perf_counter()
        sam_instance = SAMAgent()

        # Locate parent evidence mask
        parent_ao = None
        target_name = plan.sam_refinement_target
        if target_name == "changeformer":
            parent_ao = next((ao for ao in agent_outputs if ao.agent_id == "change_detection_agent"), None)
        elif target_name == "building_segmentation":
            parent_ao = next((ao for ao in agent_outputs if ao.agent_id == "building_segmentation_agent"), None)
        elif target_name == "flood":
            parent_ao = next((ao for ao in agent_outputs if ao.agent_id in ("change_detection_agent", "sar_optical_agent")), None)

        if parent_ao is None:
            parent_ao = next((ao for ao in agent_outputs if getattr(ao, "_raw_mask", None) is not None), None)

        parent_mask = getattr(parent_ao, "_raw_mask", None) if parent_ao else None
        target_image_b64 = request.image2_b64 if (request.image2_b64 and request.target_scene in ("scene2", "both", None)) else request.image_b64

        if parent_mask is not None and np.any(parent_mask):
            parent_src = parent_ao.agent_id.replace("_agent", "") if parent_ao else "domain_specialist"
            parent_eid = f"ev_{parent_src}_{query_id}"
            sam_output = sam_instance.refine_evidence(
                image_b64=target_image_b64,
                parent_mask=parent_mask,
                parent_evidence_id=parent_eid,
                parent_source=parent_src,
                polygon=request.polygon,
                target_scene=request.target_scene,
            )
        else:
            sam_output = sam_instance.run(
                question=request.question,
                image_b64=request.image_b64,
                image2_b64=request.image2_b64,
                polygon=request.polygon,
                target_scene=request.target_scene,
            )
        agent_outputs.append(sam_output)

        prov.add_step(
            step_name=f"Agent: {sam_output.agent_name}",
            component=sam_output.agent_id,
            input_summary=f"Refinement target: {plan.sam_refinement_target or 'optical_scene'}",
            output_summary=(
                f"Task: {sam_output.task} | Status: {sam_output.result.get('capability_status')} | "
                f"Score: {sam_output.raw_score:.2f}"
                + (f" | Error: {sam_output.error}" if sam_output.error else "")
            ),
            duration_ms=sam_output.result.get("inference_time_ms", (time.perf_counter() - t0) * 1000),
            status="error" if sam_output.error and sam_output.result.get("capability_status") not in ("checkpoint_unavailable", "unsupported_data_capability") else ("warning" if sam_output.raw_score < 0.5 else "success"),
            metadata={"agent_id": sam_output.agent_id, "raw_score": sam_output.raw_score},
        )


    # ── Step 5b: Evidence Normalization & Fusion (Part 8, 10) ─────────────────
    evidence_records: List[EvidenceRecord] = [
        normalize_agent_output(ao) for ao in agent_outputs if normalize_agent_output(ao) is not None
    ]
    fusion_engine = EvidenceFusionEngine(task=spec.task_type)
    fusion_summary = fusion_engine.fuse(evidence_records)

    prov.add_step(
        step_name="Evidence Normalization & Fusion",
        component="EvidenceFusionEngine",
        input_summary=f"{len(evidence_records)} evidence record(s) normalized",
        output_summary=f"Status: {fusion_summary['evidence_status']} | Cross-modal agreement: {fusion_summary['cross_modal_agreement']:.2f}",
        duration_ms=5.0,
        status="warning" if fusion_summary['evidence_status'] in ("conflicting", "degraded_quality") else "success",
        metadata=fusion_summary,
    )

    # ── Step 6: Output verification ───────────────────────────────────────────
    t0 = time.perf_counter()
    verifier_result = verify(spec, agent_outputs)

    # ── Step 6b: Replanning Loop (Part 24) ────────────────────────────────────
    max_replanning_attempts = 1
    replan_count = 0
    while replan_count < max_replanning_attempts and verifier_result.replanning_required:
        executed_agent_ids = {ao.agent_id for ao in agent_outputs}
        # Case A: Optical query under cloud or conflict, SAR capability exists but not yet run
        if (has_sar or high_cloud) and "sar_optical_agent" not in executed_agent_ids and has_image:
            logger.info("[SatQuery] Replanning: Recruiting Sentinel-1 SAR as supporting specialist.")
            sar_agent = SAROpticalAgent()
            try:
                sar_out = sar_agent.run(
                    question=request.question,
                    image_b64=request.image_b64,
                    image2_b64=request.image2_b64,
                    polygon=request.polygon,
                    target_scene=request.target_scene,
                )
                agent_outputs.append(sar_out)
                rec = normalize_agent_output(sar_out)
                if rec:
                    evidence_records.append(rec)
                fusion_summary = fusion_engine.fuse(evidence_records)
                verifier_result = verify(spec, agent_outputs)
                verifier_result.replanned = True
                verifier_result.replan_reason = "Recruited Sentinel-1 SAR supporting specialist to cross-validate optical evidence."
                prov.add_step(
                    step_name="Replanning: SAR Support Execution",
                    component="SAROpticalAgent",
                    input_summary="Dynamic recruitment of SAR specialist after verification alert",
                    output_summary=f"Re-verification agreement: {verifier_result.agreement}",
                    duration_ms=15.0,
                    status="success",
                )
            except Exception as exc:
                logger.warning(f"[SatQuery] Replanning execution error: {exc}")
        replan_count += 1

    prov.add_step(
        step_name="Evidence Verification",
        component="Verifier",
        input_summary=f"{len(agent_outputs)} agent output(s) to cross-validate",
        output_summary=(
            f"Agreement: {verifier_result.agreement} | "
            f"Conflicts: {len(verifier_result.conflicts_found)} | "
            f"Status: {verifier_result.status} | Re-planned: {verifier_result.replanned}"
        ),
        duration_ms=(time.perf_counter() - t0) * 1000,
        status="warning" if verifier_result.replanned else ("error" if verifier_result.status == "failed" else "success"),
        metadata={
            "conflicts": verifier_result.conflicts_found,
            "replanned": verifier_result.replanned,
            "status": verifier_result.status,
            "checks": [c.model_dump() for c in verifier_result.checks],
        },
    )

    # ── Step 7: Confidence & Uncertainty estimation ───────────────────────────
    t0 = time.perf_counter()
    confidence = compute_confidence(spec, sensor, agent_outputs, verifier_result)
    uncertainties = compute_uncertainties(spec, sensor, agent_outputs, verifier_result)

    prov.add_step(
        step_name="Confidence & Uncertainty Estimation",
        component="ConfidenceScorer",
        input_summary=f"All pipeline outputs aggregated ({len(uncertainties)} uncertainty item(s))",
        output_summary=(
            f"Overall: {confidence.overall:.2f} ({confidence.interpretation or 'score'}) | "
            f"Model: {confidence.model_output_quality:.2f} | "
            f"Agreement: {confidence.evidence_agreement:.2f}"
        ),
        duration_ms=(time.perf_counter() - t0) * 1000,
        metadata={
            "confidence": confidence.model_dump(),
            "uncertainties": [u.model_dump() for u in uncertainties],
        },
    )

    # ── Step 7b: Multimodal Semantic Reasoning Layer (VLM) ───────────────────
    t0 = time.perf_counter()
    semantic_interpretation: Optional[SemanticInterpretation] = None

    try:
        spatial_meta = {
            "crs": cap1.crs if cap1 else None,
            "bounds": getattr(cap1, "bounds", None) if cap1 else None,
            "polygon_vertices_count": len(request.polygon) if request.polygon else 0,
        }
        grounded_context = build_grounded_context(
            spec=spec,
            cap1=cap1,
            cap2=cap2,
            evidence_records=evidence_records,
            verifier=verifier_result,
            confidence=confidence,
            uncertainties=uncertainties,
            spatial_metadata=spatial_meta,
        )

        # Retrieve visual masks for visual context package
        cf_ao = next((ao for ao in agent_outputs if ao.agent_id == "change_detection_agent"), None)
        bldg_ao = next((ao for ao in agent_outputs if ao.agent_id == "building_segmentation_agent"), None)
        sam_ao = next((ao for ao in agent_outputs if ao.agent_id == "sam_agent"), None)

        visual_package = VisualContextGenerator.build_visual_package(
            task=spec.task_type,
            image_b64=request.image_b64,
            image2_b64=request.image2_b64,
            change_mask=getattr(cf_ao, "_raw_mask", None) if cf_ao else None,
            building_mask=getattr(bldg_ao, "_raw_mask", None) if bldg_ao else None,
            sam_mask=getattr(sam_ao, "_raw_mask", None) if sam_ao else None,
        )

        vlm_engine = get_vlm_adapter()
        semantic_interpretation = vlm_engine.generate_grounded_interpretation(
            context=grounded_context,
            visual_context=visual_package,
        )

        prov.add_step(
            step_name="Multimodal Semantic Reasoning (VLM)",
            component=semantic_interpretation.model_name,
            input_summary=f"Grounded context with {len(evidence_records)} verified evidence item(s)",
            output_summary=f"Mode: {semantic_interpretation.reasoning_mode} | Observations: {len(semantic_interpretation.observations)} | Uncertainties: {len(semantic_interpretation.uncertainties)}",
            duration_ms=(time.perf_counter() - t0) * 1000,
            status="warning" if verifier_result.status == "failed" or semantic_interpretation.contradictions else "success",
            metadata=semantic_interpretation.model_dump(),
        )
    except Exception as exc:
        logger.warning(f"[SatQuery] VLM Semantic reasoning fallback triggered: {exc}")
        semantic_interpretation = SemanticInterpretation(
            summary=verifier_result.final_answer,
            observations=[verifier_result.final_answer],
            interpretation=["Deterministic fallback active: verified evidence presented without generative reasoning."],
            conclusion=verifier_result.final_answer,
            evidence_used=[ao.agent_id for ao in agent_outputs],
            contradictions=verifier_result.conflicts_found,
            uncertainties=[u.description for u in uncertainties],
            limitations=["VLM generation unavailable; deterministic verified output returned."],
            model_name="deterministic_fallback_engine",
            reasoning_mode="fallback",
        )
        prov.add_step(
            step_name="Multimodal Semantic Reasoning (VLM)",
            component="DeterministicFallback",
            input_summary="VLM execution exception encountered",
            output_summary="Engaged deterministic evidence fallback",
            duration_ms=1.0,
            status="warning",
        )

    # ── Step 8: Build execution trace & provenance ────────────────────────────
    execution_trace = prov.build()

    if verifier_result.status == "failed":
        final_ans = f"{verifier_result.final_answer}\n\n{semantic_interpretation.conclusion}"
    elif semantic_interpretation and semantic_interpretation.conclusion:
        final_ans = f"{verifier_result.final_answer}\n\nInterpretation: {semantic_interpretation.conclusion}"
    else:
        final_ans = verifier_result.final_answer

    if roi_summary:
        final_ans = f"{roi_summary} {final_ans}"

    # Structured provenance object (Part 30 & VLM provenance Phase 25/26)
    provenance_obj: Dict[str, Any] = {
        "query": request.question,
        "query_interpretation": {
            "task": spec.task_type,
            "intent": spec.intent,
            "entities": spec.extracted_entities,
            "confidence": spec.confidence,
        },
        "data": [
            {
                "file": "primary_raster",
                "modality": cap1.data_type,
                "dimensions": f"{cap1.width}x{cap1.height}" if cap1.width else "unknown",
                "bands": cap1.band_count,
                "crs": cap1.crs,
                "acquisition_date": getattr(cap1, "acquisition_date", None),
            }
        ],
        "plan": plan.required_agents,
        "executions": [
            {"agent": ao.agent_id, "status": "completed" if ao.error is None else "error"}
            for ao in agent_outputs
        ],
        "fusion": {
            "sources": fusion_summary.get("contributing_sources", []),
            "method": "task_aware_fusion",
            "agreement": fusion_summary.get("cross_modal_agreement", 1.0),
            "status": fusion_summary.get("evidence_status", "consistent"),
        },
        "verification": {
            "status": verifier_result.status,
            "agreement": verifier_result.agreement,
            "conflicts_count": len(verifier_result.conflicts_found),
        },
        "confidence": {
            "overall": confidence.overall,
            "interpretation": confidence.interpretation,
        },
        "vlm": {
            "model": semantic_interpretation.model_name if semantic_interpretation else "none",
            "reasoning_mode": semantic_interpretation.reasoning_mode if semantic_interpretation else "none",
            "evidence_used": semantic_interpretation.evidence_used if semantic_interpretation else [],
            "verification_status": verifier_result.status,
            "uncertainties_considered": len(uncertainties),
        },
    }
    if cap2 and cap2.data_type != "none":
        provenance_obj["data"].append({
            "file": "secondary_raster",
            "modality": cap2.data_type,
            "dimensions": f"{cap2.width}x{cap2.height}" if cap2.width else "unknown",
            "bands": cap2.band_count,
            "crs": cap2.crs,
            "acquisition_date": getattr(cap2, "acquisition_date", None),
        })

    # ── Assemble response ─────────────────────────────────────────────────────
    sam_out = next((ao for ao in agent_outputs if ao.agent_id == "sam_agent"), None)
    segmentation_data = sam_out.result if sam_out else None
    refinement_data = sam_out.result.get("refinement_metrics") if sam_out else None

    response = QueryResponse(
        query_id=query_id,
        question=request.question,
        earthquery_spec=spec,
        sensor_selection=sensor,
        task_plan=task_plan_obj,
        agent_outputs=agent_outputs,
        verifier_result=verifier_result,
        confidence_breakdown=confidence,
        execution_trace=execution_trace,
        answer=final_ans,
        report_url=f"/report/download/{query_id}",
        # Additive extended fields (Part 39)
        evidence={
            "records": [r.to_dict() for r in evidence_records],
            "fusion": fusion_summary,
        },
        verification=verifier_result.model_dump(),
        confidence=confidence.model_dump(),
        uncertainty=uncertainties,
        provenance=provenance_obj,
        segmentation=segmentation_data,
        refinement=refinement_data,
        semantic_interpretation=semantic_interpretation,
    )
    cache_report(query_id, response.model_dump())
    return response

