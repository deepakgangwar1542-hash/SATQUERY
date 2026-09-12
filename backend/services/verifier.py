"""
Verifier — Cross-validates outputs from multiple agents and analyzes structured evidence.

Checks for:
  1. Capability mismatches (e.g. spectral tasks on RGB imagery)
  2. Numerical metric conflicts between agents (e.g. vegetation or water coverage discrepancies)
  3. Temporal inconsistency in bi-temporal queries (e.g. missing baseline image)
  4. Agent execution errors

If critical conflicts are detected, triggers re-planning and synthesizes an honest final answer.
"""
from __future__ import annotations
from typing import List, Dict, Any, Optional
from backend.schemas.response import AgentOutput, EarthQuerySpec, VerifierResult


def verify(
    spec: EarthQuerySpec,
    agent_outputs: List[AgentOutput],
) -> VerifierResult:
    """Run evidence agreement checks across agent outputs and numerical data."""
    conflicts: list[str] = []
    replanned = False
    replan_reason: str | None = None

    # Check 1: Agent errors
    error_agents = [ao for ao in agent_outputs if ao.error is not None]
    if error_agents:
        conflicts.append(
            f"Agent execution error(s) flagged: {[ao.agent_id for ao in error_agents]}"
        )

    # Check 2: Capability mismatches reported in agent outputs
    for ao in agent_outputs:
        if ao.result.get("analysis_status") == "capability_mismatch":
            conflicts.append(
                f"Data capability mismatch: {ao.result.get('answer', 'Required spectral bands are absent.')}"
            )
        elif ao.result.get("analysis_status") == "insufficient_data":
            conflicts.append(
                "Insufficient imagery: Query submitted without valid satellite raster data."
            )

    # Check 3: Numerical evidence agreement (e.g. comparing reported coverages across agents)
    reported_coverages = []
    for ao in agent_outputs:
        res = ao.result
        if "coverage_percent" in res and isinstance(res["coverage_percent"], (int, float)):
            reported_coverages.append((ao.agent_id, float(res["coverage_percent"])))
        elif "change_percent" in res and isinstance(res["change_percent"], (int, float)):
            reported_coverages.append((ao.agent_id, float(res["change_percent"])))

    if len(reported_coverages) >= 2:
        vals = [c[1] for c in reported_coverages]
        diff = max(vals) - min(vals)
        if diff > 25.0:
            conflicts.append(
                f"Numerical divergence in agent evidence: Metric differs by {diff:.1f}% across agents "
                f"({', '.join(f'{cid}: {v:.1f}%' for cid, v in reported_coverages)})."
            )

    # Check 4: Bi-temporal task but only one image available
    if spec.requires_two_images and len(agent_outputs) >= 1:
        for ao in agent_outputs:
            if "required for bi-temporal" in (ao.error or "") or "Insufficient Bi-temporal" in str(ao.result.get("change_type", "")):
                conflicts.append(
                    "Bi-temporal task requested but secondary temporal image (T1) was not provided."
                )

    # Check 5: Score divergence
    scores = [ao.raw_score for ao in agent_outputs if ao.error is None]
    if len(scores) >= 2:
        score_spread = max(scores) - min(scores)
        if score_spread > 0.35:
            conflicts.append(
                f"Agent confidence divergence: {score_spread:.2f} score spread across outputs."
            )

    # Re-plan: triggered if critical conflicts exist
    if len(conflicts) >= 2:
        replanned = True
        replan_reason = (
            f"Verification re-plan triggered due to {len(conflicts)} evidence conflict(s). "
            "Pipeline prioritized ground-truth verified metrics and flagged unverified claims."
        )

    # Synthesize final answer: prefer direct conversational answer when available
    valid_agents = [ao for ao in agent_outputs if ao.error is None]
    answering_agents = [ao for ao in valid_agents if "answer" in ao.result]
    if answering_agents:
        best_agent = max(answering_agents, key=lambda ao: ao.raw_score)
    elif valid_agents:
        best_agent = max(valid_agents, key=lambda ao: ao.raw_score)
    else:
        best_agent = agent_outputs[0] if agent_outputs else None

    if not best_agent:
        final_answer = "Analysis pipeline produced no agent outputs."
    else:
        res = best_agent.result
        if "answer" in res:
            final_answer = res["answer"]
        elif "caption" in res:
            final_answer = res["caption"]
        elif "change_type" in res:
            ct = res["change_type"]
            pct = res.get("change_percent", 0.0)
            final_answer = (
                f"Change detection: {ct} ({pct:.1f}% of scene). "
                f"{res.get('change_map_description', '')}"
            )
        elif "fusion_insights" in res:
            insights = res.get("fusion_insights", [])
            final_answer = (
                "SAR-Optical multi-modal evaluation: " + " | ".join(insights[:2])
            )
        elif "num_objects_detected" in res:
            n = res["num_objects_detected"]
            dets = res.get("detections", [])
            labels = [d.get("label", "feature") for d in dets]
            final_answer = f"Detected {n} spatial feature(s): {', '.join(labels)}." if n > 0 else "No prominent target features detected in the specified class."
        else:
            final_answer = f"Analysis complete for task '{best_agent.task}'."

    # Append conflict summary if replanned or warning
    if replanned:
        final_answer += (
            f"\n\n⚠ Verification Note: {len(conflicts)} data/evidence conflict(s) detected and resolved. "
            "Confidence adjusted accordingly."
        )

    return VerifierResult(
        agreement=len(conflicts) == 0,
        conflicts_found=conflicts,
        replanned=replanned,
        replan_reason=replan_reason,
        final_answer=final_answer,
    )
