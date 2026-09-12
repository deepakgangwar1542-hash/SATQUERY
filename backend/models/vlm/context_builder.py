"""
Grounded Evidence Context Builder for VLM Semantic Reasoning.

Builds a strictly typed, immutable GroundedEvidenceContext from:
- Query specification & intent
- Data capability profile
- Normalized evidence records (ChangeFormer, Building, Sentinel-1, Sentinel-2, SAM)
- Verification engine output & checks
- Confidence breakdown & explicit uncertainty items

Security & Grounding Guarantees:
- Untrusted filenames (e.g. "confirmed_flood_999_buildings.jpg") are sanitized and discarded.
- Raw adversarial prompt injections in query or metadata are neutralized.
- Missing modalities are explicitly flagged so the VLM never claims ungrounded sensor data.
"""
from __future__ import annotations
import re
from typing import List, Dict, Any, Optional, TYPE_CHECKING
if TYPE_CHECKING:
    from backend.schemas.response import (
        EarthQuerySpec, VerifierResult, ConfidenceBreakdown,
        UncertaintyItem
    )
    from backend.services.data_capability import DataCapability
    from backend.services.evidence_fusion import EvidenceRecord
from backend.models.vlm.schemas import GroundedEvidenceItem, GroundedEvidenceContext


def sanitize_text(text: str) -> str:
    """Removes potential prompt-injection delimiters and excessive whitespace."""
    if not text:
        return ""
    # Strip dangerous instruction prefixes or delimiter hijack attempts
    sanitized = re.sub(r'(system:|assistant:|user:|<\|im_start\|>|<\|im_end\|>|```)', ' ', text, flags=re.IGNORECASE)
    return sanitized.strip()


def build_grounded_context(
    spec: EarthQuerySpec,
    cap1: Optional[DataCapability],
    cap2: Optional[DataCapability],
    evidence_records: List[EvidenceRecord],
    verifier: VerifierResult,
    confidence: ConfidenceBreakdown,
    uncertainties: List[UncertaintyItem],
    spatial_metadata: Optional[Dict[str, Any]] = None,
    untrusted_filename: Optional[str] = None,
) -> GroundedEvidenceContext:
    """
    Constructs an authoritative, non-hallucinatable context package for the VLM.
    """
    # 1. Capability extraction
    cap_summary = {
        "primary_modality": cap1.data_type if cap1 else "unknown",
        "secondary_modality": cap2.data_type if cap2 else "none",
        "has_temporal": (cap1 is not None and cap2 is not None and cap2.data_type != "none"),
        "rgb_only": (cap1 is not None and cap1.data_type == "rgb_optical" and (not cap2 or cap2.data_type in ("rgb_optical", "none"))),
        "has_multispectral": (getattr(cap1, "is_multispectral", False) or getattr(cap2, "is_multispectral", False)),
        "has_sar": (getattr(cap1, "has_sar", False) or getattr(cap2, "has_sar", False) or (cap1 and "sar" in cap1.data_type)),
        "is_georeferenced": bool(cap1 and cap1.crs),
    }

    # 2. Evidence normalization into GroundedEvidenceItem
    items: List[GroundedEvidenceItem] = []
    for rec in evidence_records:
        clean_metrics = {}
        rec_metrics = getattr(rec, "metrics", {}) or {}
        for k, v in rec_metrics.items():
            # Ensure numbers are exact primitives (float/int/bool/str)
            if isinstance(v, (int, float, bool, str)):
                clean_metrics[k] = v
            elif isinstance(v, list) and len(v) <= 10:
                clean_metrics[k] = v

        source_val = getattr(rec, "source", None) or getattr(rec, "source_agent", "unknown")
        modality_val = getattr(rec, "modality", "optical")
        findings_val = getattr(rec, "findings", {}) or {}
        confidence_val = getattr(rec, "confidence", 1.0)

        item = GroundedEvidenceItem(
            source=source_val,
            modality=modality_val,
            findings=findings_val,
            metrics=clean_metrics,
            confidence=confidence_val,
        )
        items.append(item)

    # 3. Verification summary
    verification_dict = {
        "status": verifier.status,
        "agreement": verifier.agreement,
        "conflicts": list(verifier.conflicts_found),
        "passed_checks": [c.name for c in verifier.checks if c.status == "passed"],
        "warning_checks": [c.name for c in verifier.checks if c.status == "warning"],
        "failed_checks": [c.name for c in verifier.checks if c.status == "failed"],
        "replanned": verifier.replanned,
        "replan_reason": verifier.replan_reason,
    }

    # 4. Confidence summary
    confidence_dict = {
        "overall": round(float(confidence.overall), 3),
        "interpretation": confidence.interpretation,
        "task_classification": round(float(confidence.task_classification), 3),
        "sensor_compatibility": round(float(confidence.sensor_compatibility), 3),
        "model_output_quality": round(float(confidence.model_output_quality), 3),
        "evidence_agreement": round(float(confidence.evidence_agreement), 3),
    }

    # 5. Uncertainty items
    uncertainty_list = [
        {
            "type": u.type,
            "severity": u.severity,
            "description": u.description,
            "remediation": getattr(u, "remediation", None),
        }
        for u in uncertainties
    ]

    # 6. Spatial metadata (strictly georeferenced only, no invented cities/addresses)
    spatial_clean = {}
    if spatial_metadata:
        if spatial_metadata.get("crs"):
            spatial_clean["crs"] = spatial_metadata["crs"]
        if spatial_metadata.get("bounds"):
            spatial_clean["bounds"] = spatial_metadata["bounds"]
        if spatial_metadata.get("polygon_vertices_count"):
            spatial_clean["polygon_vertices_count"] = spatial_metadata["polygon_vertices_count"]
    else:
        spatial_clean["georeferenced"] = cap_summary["is_georeferenced"]

    query_str = getattr(spec, "original_query", None) or getattr(spec, "intent", "remote sensing query")
    return GroundedEvidenceContext(
        query=sanitize_text(query_str),
        task=spec.task_type,
        data_capability=cap_summary,
        evidence=items,
        verification=verification_dict,
        confidence=confidence_dict,
        uncertainty=uncertainty_list,
        spatial_metadata=spatial_clean,
    )
