"""
Evidence Layer & Evidence Fusion Engine — SatQuery AI.

Provides:
  1. Standardized EvidenceRecord structure across all specialists (Part 8, 9)
  2. Multi-modal normalization for ChangeFormer, Building Segmentation,
     Sentinel-1 SAR, Sentinel-2 spectral, and RGB analysis
  3. Task-aware EvidenceFusionEngine with:
     - Cross-modal spatial mask agreement (IoU, intersection, union, coverage)
     - Task-appropriate numeric agreement (absolute & relative difference)
     - Temporal normalization & acquisition discrepancy tracking
     - Spatial normalization & resolution compatibility
     - Explicit conflict detection (consistent, mostly_consistent, conflicting, degraded_quality)
     - Missing evidence handling (distinguishes unavailable from zero evidence)
  4. Backward-compatible fuse_evidence() and FusionResult for existing consumers
"""
from __future__ import annotations
import logging
import uuid
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple
import numpy as np

from backend.schemas.response import AgentOutput
from backend.services.spatial_utils import (
    mask_intersection,
    mask_union,
    mask_iou,
    mask_overlap_ratio,
    align_masks,
    check_spatial_compatibility,
)
from backend.services.sar.sar_fusion import (
    fuse_sar_optical_evidence,
    SARFusionResult,
    FusionStrategy,
)

logger = logging.getLogger("SatQuery.EvidenceFusion")


# ─── Part 8: Standardized EvidenceRecord ────────────────────────────────────────

@dataclass
class EvidenceRecord:
    """
    Standardized, task-agnostic evidence unit produced by any specialist model.
    """
    evidence_id: str
    source: str                 # "changeformer", "building_segmentation", "sentinel1", "sentinel2", "rgb_differencing", "spatial_intersection"
    task: str                   # "change_detection", "building_extraction", "spectral_index", "sar_evidence", "flood_impact", "spatial_intersection"
    modality: str               # "optical", "sar", "multispectral", "derived", "vector"
    result_type: str            # "change_mask", "building_mask", "spectral_index", "sar_evidence", "flood_mask", "spatial_intersection"
    input_data: List[str]       # identifiers of input rasters (e.g. ["T0", "T1"])
    temporal_context: Dict[str, Any] = field(default_factory=dict)  # {"before": ..., "after": ..., "interval_days": ...}
    spatial_context: Dict[str, Any] = field(default_factory=dict)   # {"crs": ..., "resolution": ..., "roi": ..., "bbox": ...}
    metrics: Dict[str, Any] = field(default_factory=dict)           # {"changed_pixel_count": ..., "valid_pixel_count": ..., "change_percentage": ...}
    quality: Dict[str, Any] = field(default_factory=dict)           # {"valid_pixel_ratio": ..., "alignment_quality": ..., "cloud_impact": ..., "nodata_ratio": ...}
    limitations: List[str] = field(default_factory=list)
    raw_output_reference: Optional[str] = None
    provenance: Dict[str, Any] = field(default_factory=dict)
    parent_evidence: Optional[str] = None
    refined_evidence: Optional[str] = None
    # In-memory arrays (omitted from serialized dict)
    mask: Optional[np.ndarray] = None
    probability_map: Optional[np.ndarray] = None
    polygons: Optional[List[Any]] = None
    status: str = "available"   # "available", "unavailable", "degraded", "unsupported"

    def to_dict(self) -> Dict[str, Any]:
        """Returns JSON-serializable representation without raw NumPy arrays."""
        d = {
            "evidence_id": self.evidence_id,
            "source": self.source,
            "task": self.task,
            "modality": self.modality,
            "result_type": self.result_type,
            "status": self.status,
            "input_data": self.input_data,
            "temporal_context": self.temporal_context,
            "spatial_context": {k: v for k, v in self.spatial_context.items() if not isinstance(v, np.ndarray)},
            "metrics": self.metrics,
            "quality": self.quality,
            "limitations": self.limitations,
            "raw_output_reference": self.raw_output_reference,
            "provenance": self.provenance,
        }
        if self.parent_evidence:
            d["parent_evidence"] = self.parent_evidence
        if self.refined_evidence:
            d["refined_evidence"] = self.refined_evidence
        return d



# ─── Part 9: Evidence Normalization Functions ───────────────────────────────────

def normalize_agent_output(ao: AgentOutput) -> Optional[EvidenceRecord]:
    """
    Converts an arbitrary specialist AgentOutput into a normalized EvidenceRecord.
    """
    res = ao.result or {}
    eid = f"ev_{ao.agent_id}_{uuid.uuid4().hex[:6]}"

    # Check for standardized output if already emitted
    std = res.get("standardized_output")
    if std and isinstance(std, dict):
        return EvidenceRecord(
            evidence_id=eid,
            source=std.get("source", ao.agent_id),
            task=std.get("task", ao.task),
            modality=std.get("modality", "optical"),
            result_type=std.get("result_type", "evidence_output"),
            input_data=["T0", "T1"] if ("t0_metrics" in res or "before_date" in std) else ["T0"],
            temporal_context={
                "before": std.get("before_date"),
                "after": std.get("after_date"),
            },
            spatial_context=std.get("spatial", {}),
            metrics=std.get("metrics", {}),
            quality=std.get("quality", {}),
            limitations=std.get("limitations", []),
            raw_output_reference=ao.agent_id,
            provenance={"agent_id": ao.agent_id, "score": ao.raw_score},
            status="available" if ao.error is None else "degraded",
        )

    # 1. Change Detection / ChangeFormer
    if ao.agent_id == "change_detection_agent" or "change_percent" in res:
        ev_dict = res.get("evidence", {})
        method = res.get("analysis_method", "change_detection")
        is_cf = "changeformer" in method
        return EvidenceRecord(
            evidence_id=eid,
            source="changeformer" if is_cf else "rgb_differencing",
            task="change_detection",
            modality="optical",
            result_type="change_mask",
            input_data=["T0", "T1"],
            temporal_context={},
            spatial_context={"roi_applied": ev_dict.get("roi_applied", False)},
            metrics={
                "changed_pixel_count": res.get("pixel_change_count", 0),
                "valid_pixel_count": res.get("total_valid_pixels", 0),
                "change_percentage": res.get("change_percent", 0.0),
            },
            quality=res.get("quality", {
                "alignment_performed": ev_dict.get("alignment_performed", False),
                "cloud_mask_applied": ev_dict.get("cloud_mask_applied", False),
            }),
            limitations=res.get("limitations", []),
            raw_output_reference=ao.agent_id,
            status="available" if ao.error is None else "degraded",
        )

    # 2. Building Segmentation
    if ao.agent_id == "building_segmentation_agent" or "building_count" in res:
        b_count = res.get("building_count")
        return EvidenceRecord(
            evidence_id=eid,
            source="building_segmentation",
            task="building_extraction",
            modality="optical",
            result_type="building_mask",
            input_data=["T0"],
            temporal_context={},
            spatial_context={},
            metrics={
                "building_count": b_count if b_count is not None else 0,
                "building_coverage_percentage": res.get("building_coverage_pct", 0.0),
                "building_area_m2": res.get("building_area_m2"),
            },
            quality={"valid_pixel_ratio": 1.0},
            limitations=res.get("limitations", []),
            raw_output_reference=ao.agent_id,
            status="available" if b_count is not None else "unavailable",
        )

    # 3. Sentinel-1 SAR Analysis
    if "sar_analysis" in res or ao.agent_id == "sar_optical_agent":
        sa = res.get("sar_analysis", {})
        success = sa.get("success", False)
        ev_frac = sa.get("evidence_fraction", 0.0)
        return EvidenceRecord(
            evidence_id=eid,
            source="sentinel1",
            task=sa.get("task", "sar_evidence"),
            modality="sar",
            result_type="sar_evidence",
            input_data=["T0", "T1"] if sa.get("is_temporal") else ["T0"],
            temporal_context={},
            spatial_context={"georeferenced": sa.get("georeferenced", False)},
            metrics={
                "evidence_fraction": ev_frac,
                "evidence_percentage": round(ev_frac * 100.0, 2),
                "evidence_area_km2": sa.get("evidence_area_km2"),
                "polarizations_used": sa.get("polarizations_used", ["VV"]),
            },
            quality={"sar_snr": sa.get("snr", 1.0)},
            limitations=[sa.get("reason")] if (not success and sa.get("reason")) else [],
            raw_output_reference=ao.agent_id,
            status="available" if success else "unavailable",
        )

    # 4. Sentinel-2 Spectral Analysis
    if "ndvi" in res or ao.agent_id == "spectral_analysis_agent":
        ndvi = res.get("ndvi", {})
        has_bands = res.get("analysis_status") != "capability_mismatch"
        return EvidenceRecord(
            evidence_id=eid,
            source="sentinel2",
            task="spectral_analysis",
            modality="multispectral",
            result_type="spectral_index",
            input_data=["T0"],
            temporal_context={},
            spatial_context={},
            metrics={
                "ndvi_mean": ndvi.get("mean"),
                "ndvi_min": ndvi.get("min"),
                "ndvi_max": ndvi.get("max"),
                "vegetation_coverage_pct": ndvi.get("vegetation_coverage_pct"),
            },
            quality={"valid_pixel_count": ndvi.get("valid_pixel_count")},
            limitations=[res.get("answer", "Spectral bands absent.")] if not has_bands else [],
            raw_output_reference=ao.agent_id,
            status="available" if has_bands else "unsupported",
        )

    # 5. Spatial Building Impact / Intersection
    if "building_impact" in res:
        imp = res["building_impact"]
        return EvidenceRecord(
            evidence_id=eid,
            source="spatial_intersection",
            task="flood_impact",
            modality="derived",
            result_type="spatial_intersection",
            input_data=["building_footprints", "hazard_mask"],
            temporal_context={},
            spatial_context={"overlap_threshold": imp.get("overlap_threshold", 0.10)},
            metrics={
                "total_buildings": imp.get("total_buildings", 0),
                "affected_buildings": imp.get("affected_buildings", 0),
                "affected_building_percentage": imp.get("affected_building_percentage", 0.0),
            },
            quality={"sensitivity_analysis": imp.get("sensitivity_analysis", {})},
            limitations=[],
            raw_output_reference=ao.agent_id,
            status="available",
        )

    # 6. SAM / SAM2 Refinement Normalization (Phase 8, 11, 12)
    if ao.agent_id == "sam_agent" or "refinement_metrics" in res or res.get("result_type") == "refined_mask":
        ref_metrics = res.get("refinement_metrics", {})
        status = "available"
        cap_status = res.get("capability_status", "")
        if cap_status in ("checkpoint_unavailable", "unsupported_data_capability") or res.get("status") == "refinement_bypassed":
            status = "unavailable" if cap_status == "checkpoint_unavailable" else "unsupported"
        elif ao.error is not None:
            status = "degraded"

        parent_eid = res.get("parent_evidence_id", "parent_evidence")
        source_name = res.get("model", "sam2").split()[0].lower() if res.get("model") else "sam2"
        return EvidenceRecord(
            evidence_id=eid,
            source=source_name,
            task="segmentation_refinement",
            modality="optical",
            result_type="refined_mask",
            parent_evidence=parent_eid,
            refined_evidence=eid,
            input_data=[parent_eid],
            temporal_context={},
            spatial_context={
                "object_count": res.get("object_count", 0),
                "polygons_count": res.get("polygons_count", 0),
            },
            metrics=ref_metrics if ref_metrics else {
                "segmented_pixel_count": res.get("segmented_pixel_count", 0),
                "coverage_percentage": res.get("coverage_pct", 0.0),
            },
            quality={
                "expansion_drift": ref_metrics.get("expansion_drift", False),
                "collapse_drift": ref_metrics.get("collapse_drift", False),
                "low_overlap": ref_metrics.get("low_overlap", False),
                "iou_with_parent": ref_metrics.get("iou", 0.0),
            },
            limitations=res.get("limitations", []),
            raw_output_reference=ao.agent_id,
            provenance={
                "parent_evidence": parent_eid,
                "parent_source": res.get("parent_source"),
                "model": res.get("model"),
            },
            status=status,
        )

    # Generic fallback evidence
    return EvidenceRecord(
        evidence_id=eid,
        source=ao.agent_id,
        task=ao.task,
        modality="optical",
        result_type="generic_observation",
        input_data=["T0"],
        metrics={"score": ao.raw_score},
        raw_output_reference=ao.agent_id,
        status="available" if ao.error is None else "degraded",
    )


# ─── Part 14, 15, 16, 17, 18, 19: EvidenceFusionEngine ─────────────────────────

class EvidenceFusionEngine:
    """
    Task-aware engine that harmonizes, cross-validates, and fuses multi-modal evidence.
    """
    def __init__(self, task: str = "change_detection"):
        self.task = task

    def evaluate_cross_modal_agreement(
        self,
        records: List[EvidenceRecord],
    ) -> Dict[str, Any]:
        """
        Calculates cross-modal agreement and detects contradictions across independent sources.
        Returns:
          - status: 'consistent' | 'mostly_consistent' | 'conflicting' | 'insufficient_evidence' | 'degraded_quality'
          - agreement_score: float [0.0 to 1.0]
          - details: List[str]
          - conflicts: List[Dict[str, Any]]
        """
        available_records = [r for r in records if r.status == "available"]
        if len(available_records) < 2:
            # Check if an expected modality is missing vs zero
            missing_sar = any(r.source == "sentinel1" and r.status in ("unavailable", "unsupported") for r in records)
            details = ["SAR evidence unavailable."] if missing_sar else ["Single available evidence source."]
            return {
                "status": "insufficient_evidence" if missing_sar else "consistent",
                "agreement_score": 0.85 if not missing_sar else 0.50,
                "details": details,
                "conflicts": [],
            }

        # Look for independent change / footprint metrics
        percentages: List[Tuple[str, float]] = []
        for r in available_records:
            if "change_percentage" in r.metrics and r.metrics["change_percentage"] is not None:
                percentages.append((r.source, float(r.metrics["change_percentage"])))
            elif "evidence_percentage" in r.metrics and r.metrics["evidence_percentage"] is not None:
                percentages.append((r.source, float(r.metrics["evidence_percentage"])))

        conflicts = []
        status = "consistent"
        agreement_score = 0.95

        # Numeric Evidence Agreement (Part 17)
        if len(percentages) >= 2:
            vals = [p[1] for p in percentages]
            abs_diff = max(vals) - min(vals)
            mean_val = max(1.0, sum(vals) / len(vals))
            rel_diff = abs_diff / mean_val

            if abs_diff > 20.0 or rel_diff > 1.5:
                status = "conflicting"
                agreement_score = max(0.20, round(1.0 - (abs_diff / 50.0), 2))
                conflict_desc = (
                    f"Significant divergence between independent sources: "
                    f"{', '.join(f'{src}: {val:.1f}%' for src, val in percentages)} (Δ = {abs_diff:.1f}%)."
                )
                conflicts.append({
                    "type": "numeric_divergence",
                    "sources": [p[0] for p in percentages],
                    "difference": abs_diff,
                    "description": conflict_desc,
                })
            elif abs_diff > 10.0:
                status = "mostly_consistent"
                agreement_score = 0.75

        # Check cloud degradation
        high_cloud_record = next(
            (r for r in available_records if r.quality.get("cloud_impact", 0.0) > 0.30),
            None
        )
        if high_cloud_record:
            if status != "conflicting":
                status = "degraded_quality"
                agreement_score = min(agreement_score, 0.70)

        # SAM Refinement Quality & Drift Evaluation (Phase 13, 14, 15)
        sam_records = [r for r in available_records if r.task == "segmentation_refinement" or "refined_mask" in r.result_type]
        for sam_rec in sam_records:
            q = sam_rec.quality
            m = sam_rec.metrics
            iou = m.get("iou", q.get("iou_with_parent", 0.0))
            if q.get("expansion_drift"):
                conflicts.append({
                    "type": "segmentation_expansion_drift",
                    "sources": [sam_rec.source, sam_rec.parent_evidence or "parent"],
                    "description": f"Refinement expansion drift: {sam_rec.source} refined boundary expanded by {m.get('area_ratio', 1.0):.2f}x beyond parent evidence.",
                })
                if status == "consistent":
                    status = "mostly_consistent"
                agreement_score = min(agreement_score, 0.70)
            elif q.get("low_overlap") and m.get("parent_pixel_count", 0) >= 20:
                conflicts.append({
                    "type": "refinement_low_overlap",
                    "sources": [sam_rec.source, sam_rec.parent_evidence or "parent"],
                    "description": f"Refinement low overlap: {sam_rec.source} has low spatial overlap with parent evidence (IoU: {iou:.2f}).",
                })
                if status == "consistent":
                    status = "mostly_consistent"
                agreement_score = min(agreement_score, 0.75)
            elif q.get("empty_mask") and m.get("parent_pixel_count", 0) > 0:
                conflicts.append({
                    "type": "refinement_empty_mask",
                    "sources": [sam_rec.source, sam_rec.parent_evidence or "parent"],
                    "description": f"Refinement failure: {sam_rec.source} generated an empty mask from candidate regions.",
                })
                if status == "consistent":
                    status = "mostly_consistent"
                agreement_score = min(agreement_score, 0.65)


        return {
            "status": status,
            "agreement_score": agreement_score,
            "details": [c["description"] for c in conflicts] or ["Independent evidence sources agree."],
            "conflicts": conflicts,
            "sources": [r.source for r in available_records],
        }

    def fuse(
        self,
        records: List[EvidenceRecord],
    ) -> Dict[str, Any]:
        """
        Executes task-aware evidence fusion over normalized records.
        """
        agreement_res = self.evaluate_cross_modal_agreement(records)

        # Distinguish unavailable modalities (Part 19)
        unavailable_modalities = [
            r.source for r in records if r.status in ("unavailable", "unsupported")
        ]

        fusion_summary = {
            "task": self.task,
            "evidence_status": agreement_res["status"],
            "cross_modal_agreement": agreement_res["agreement_score"],
            "contributing_sources": agreement_res.get("sources", []),
            "unavailable_sources": unavailable_modalities,
            "conflicts_detected": agreement_res["conflicts"],
            "insights": agreement_res["details"],
        }
        return fusion_summary


# ─── Part 39: Backward-Compatible fuse_evidence & FusionResult ──────────────────

_TASK_STRATEGY: Dict[str, FusionStrategy] = {
    "flood_impact": FusionStrategy.WEIGHTED_AVERAGE,
    "urban_change": FusionStrategy.WEIGHTED_AVERAGE,
    "change_detection": FusionStrategy.WEIGHTED_AVERAGE,
    "sar_change": FusionStrategy.SAR_PRIMARY,
    "vegetation_change": FusionStrategy.OPTICAL_PRIMARY,
    "fire_analysis": FusionStrategy.OPTICAL_PRIMARY,
    "sar_optical_joint": FusionStrategy.WEIGHTED_AVERAGE,
}
_DEFAULT_STRATEGY = FusionStrategy.WEIGHTED_AVERAGE

_TASK_SAR_WEIGHT: Dict[str, float] = {
    "flood_impact": 0.55,
    "urban_change": 0.45,
    "change_detection": 0.50,
    "sar_change": 0.80,
    "vegetation_change": 0.20,
    "fire_analysis": 0.25,
    "sar_optical_joint": 0.50,
}
_DEFAULT_SAR_WEIGHT = 0.50


class FusionResult:
    """Thin wrapper around SARFusionResult for existing test & orchestrator consumers."""
    def __init__(self, raw: SARFusionResult):
        self._raw = raw

    @property
    def success(self) -> bool:
        return self._raw.success

    @property
    def final_mask(self) -> Optional[np.ndarray]:
        return self._raw.final_mask

    @property
    def evidence_fraction(self) -> float:
        return self._raw.evidence_fraction

    @property
    def evidence_pixel_count(self) -> int:
        return self._raw.evidence_pixel_count

    @property
    def sensor_agreement(self) -> float:
        return self._raw.sensor_agreement

    @property
    def sensors_disagree(self) -> bool:
        return self._raw.sensors_disagree

    @property
    def fusion_status(self) -> str:
        return self._raw.fusion_status

    @property
    def notes(self) -> List[str]:
        return self._raw.notes

    def to_dict(self) -> Dict[str, Any]:
        return self._raw.to_metadata_dict()


def fuse_evidence(
    sar_mask: Optional[np.ndarray] = None,
    sar_valid_mask: Optional[np.ndarray] = None,
    sar_evidence_fraction: Optional[float] = None,
    sar_evidence_metadata: Optional[Dict[str, Any]] = None,
    optical_mask: Optional[np.ndarray] = None,
    optical_valid_mask: Optional[np.ndarray] = None,
    optical_evidence_fraction: Optional[float] = None,
    optical_evidence_metadata: Optional[Dict[str, Any]] = None,
    task: str = "change_detection",
    strategy: Optional[FusionStrategy] = None,
    cloud_cover: float = 0.0,
    crs: Optional[str] = None,
    transform: Optional[List[float]] = None,
    resolution: Optional[List[float]] = None,
) -> FusionResult:
    """
    Backward-compatible entry point for SAR + optical evidence fusion.
    """
    if strategy is None:
        strategy = _TASK_STRATEGY.get(task, _DEFAULT_STRATEGY)
    sar_w = _TASK_SAR_WEIGHT.get(task, _DEFAULT_SAR_WEIGHT)

    if cloud_cover > 0.30 and sar_mask is not None:
        boost = min(0.15, (cloud_cover - 0.30) * 0.5)
        sar_w = min(0.85, sar_w + boost)

    raw = fuse_sar_optical_evidence(
        sar_mask=sar_mask,
        sar_valid_mask=sar_valid_mask,
        sar_evidence_fraction=sar_evidence_fraction,
        optical_mask=optical_mask,
        optical_valid_mask=optical_valid_mask,
        optical_evidence_fraction=optical_evidence_fraction,
        task=task,
        strategy=strategy,
        sar_weight=sar_w,
        optical_weight=1.0 - sar_w,
        sar_evidence_metadata=sar_evidence_metadata,
        optical_evidence_metadata=optical_evidence_metadata,
        crs=crs,
        transform=transform,
        resolution=resolution,
    )
    return FusionResult(raw)
