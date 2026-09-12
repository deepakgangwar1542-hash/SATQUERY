"""
SAR Task-Aware Analysis Router — SatQuery AI SAR Package.

This module is the bridge between the general-purpose SAR change detection
(sar_change.py) and the task-specific interpretation required by the orchestrator.

It answers the question: given a SAR change result, what does it mean for
the requested task?

Supported task routes:
  "change_detection"    : return general increase + decrease change maps
                          as evidence; do NOT interpret as a specific event
  "sar_change"          : same as change_detection but SAR-primary
  "flood_impact"        : interpret backscatter DECREASE as flood candidate evidence
                          (specular reflection off water = low return)
  "urban_change"        : interpret backscatter INCREASE as potential construction
                          (built structures return stronger double-bounce signal)
  "vegetation_change"   : interpret backscatter change alongside polarisation
                          features; SAR is supporting evidence for optical
  "fire_analysis"       : interpret change patterns as fire/burn evidence
                          (SAR is supporting; optical NBR is primary)
  any other task        : return general change evidence without task labelling

IMPORTANT: This module labels evidence, not ground truth.
A backscatter decrease is EVIDENCE for flooding — not a confirmed flood.
The verifier and confidence modules account for this distinction.

Limitations documented per task route.
"""
from __future__ import annotations
import logging
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

import numpy as np

from backend.services.sar.sar_preprocessing import SARPreprocessingResult, align_sar_pair
from backend.services.sar.sar_change import detect_sar_change, SARChangeResult
from backend.services.sar.sar_features import extract_sar_features, SARFeatures

logger = logging.getLogger("SatQuery.SAR.Analysis")

# Tasks where SAR backscatter DECREASE is the primary evidence
_DECREASE_EVIDENCE_TASKS = {"flood_impact", "sar_change", "change_detection"}
# Tasks where SAR backscatter INCREASE is the primary evidence
_INCREASE_EVIDENCE_TASKS = {"urban_change"}

# Default thresholds per task (all in dB)
_TASK_THRESHOLDS: Dict[str, float] = {
    "flood_impact": 3.0,       # 3 dB decrease for water
    "urban_change": 3.0,       # 3 dB increase for construction
    "change_detection": 3.0,   # general change
    "sar_change": 3.0,
    "vegetation_change": 2.0,  # vegetation is more subtle
    "fire_analysis": 2.5,
}
_DEFAULT_THRESHOLD = 3.0


@dataclass
class SARAnalysisResult:
    """
    Task-aware SAR analysis output.

    Contains:
      - change_result    : raw SARChangeResult (task-agnostic pixel data)
      - features         : SARFeatures (statistics, temporal, cross-pol)
      - evidence_mask    : the binary mask relevant to the task
                           (e.g. decrease_mask for flood_impact,
                                 increase_mask for urban_change,
                                 change_array for change_detection)
      - evidence_fraction: fraction of valid pixels showing task evidence
      - evidence_label   : human-readable label for what evidence_mask represents
      - task             : the task this analysis was run for
      - limitations      : documented limitations of SAR for this task
    """
    success: bool
    status: str
    reason: Optional[str]

    task: str
    polarizations_used: List[str]

    change_result: Optional[SARChangeResult]
    features: Optional[SARFeatures]

    # Primary evidence mask for this task
    evidence_mask: Optional[np.ndarray]
    evidence_fraction: float
    evidence_label: str   # e.g. "backscatter_decrease" for flood, "backscatter_increase" for urban

    # Geospatial context
    width: int
    height: int
    crs: Optional[str]
    transform: Optional[List[float]]
    resolution: Optional[List[float]]
    georeferenced: bool

    # Area calculation (when georef + resolution available)
    evidence_area_km2: Optional[float]

    limitations: List[str] = field(default_factory=list)
    notes: List[str] = field(default_factory=list)

    def to_metadata_dict(self) -> Dict[str, Any]:
        d: Dict[str, Any] = {
            "success": self.success,
            "status": self.status,
            "reason": self.reason,
            "task": self.task,
            "polarizations_used": self.polarizations_used,
            "evidence_label": self.evidence_label,
            "evidence_fraction": round(self.evidence_fraction, 4),
            "evidence_area_km2": self.evidence_area_km2,
            "width": self.width, "height": self.height,
            "crs": self.crs, "resolution": self.resolution,
            "georeferenced": self.georeferenced,
            "limitations": self.limitations,
            "notes": self.notes,
        }
        if self.change_result:
            d["sar_change"] = self.change_result.to_metadata_dict()
        if self.features:
            d["sar_features"] = self.features.to_dict()
        return d


def _select_primary_pol(
    prep0: SARPreprocessingResult,
    prep1: Optional[SARPreprocessingResult],
) -> Optional[str]:
    """Select primary polarisation: VV preferred; VH fallback; first available."""
    for p in ("VV", "VH", "HH", "HV"):
        if p in prep0.polarizations_available:
            if prep1 is None or p in prep1.polarizations_available:
                return p
    return None


def analyze_sar_for_task(
    prep_t0: SARPreprocessingResult,
    prep_t1: Optional[SARPreprocessingResult] = None,
    task: str = "change_detection",
    polygon_mask: Optional[np.ndarray] = None,
    adaptive_threshold: bool = False,
) -> SARAnalysisResult:
    """
    Run task-aware SAR analysis on one or two preprocessed scenes.

    Args:
        prep_t0          : T0 preprocessed SAR scene
        prep_t1          : T1 preprocessed SAR scene (optional; required for temporal)
        task             : task identifier (see module docstring)
        polygon_mask     : optional ROI mask (True = inside ROI)
        adaptive_threshold: use Otsu adaptive threshold

    Returns:
        SARAnalysisResult with task-appropriate evidence mask and metadata.
    """
    notes: List[str] = []
    limitations: List[str] = []
    threshold = _TASK_THRESHOLDS.get(task, _DEFAULT_THRESHOLD)
    primary_pol = _select_primary_pol(prep_t0, prep_t1)

    # ── No valid polarisation ─────────────────────────────────────────────────
    if primary_pol is None:
        return SARAnalysisResult(
            success=False, status="no_polarization",
            reason="No supported polarisation (VV/VH/HH/HV) found.",
            task=task, polarizations_used=[],
            change_result=None, features=None,
            evidence_mask=None, evidence_fraction=0.0,
            evidence_label="none",
            width=prep_t0.width, height=prep_t0.height,
            crs=prep_t0.crs, transform=prep_t0.transform,
            resolution=prep_t0.resolution,
            georeferenced=prep_t0.georeferenced,
            evidence_area_km2=None,
            limitations=["No SAR polarisation data available."],
            notes=["SAR analysis aborted: no polarisation."],
        )

    pols_used: List[str] = [primary_pol]

    # ── Feature extraction (single or bi-temporal) ────────────────────────────
    features = extract_sar_features(
        prep_t0, scene_t1=prep_t1, primary_pol=primary_pol
    )

    # ── Temporal change analysis (requires T0 + T1) ───────────────────────────
    change_result: Optional[SARChangeResult] = None
    evidence_mask: Optional[np.ndarray] = None
    evidence_fraction = 0.0
    evidence_label = "none"

    if prep_t1 is not None:
        db0, db1, vm0, vm1, align_meta = align_sar_pair(prep_t0, prep_t1, primary_pol)
        if db0 is None:
            return SARAnalysisResult(
                success=False, status="alignment_failed",
                reason=align_meta.get("error", "Alignment failed."),
                task=task, polarizations_used=pols_used,
                change_result=None, features=features,
                evidence_mask=None, evidence_fraction=0.0,
                evidence_label="none",
                width=prep_t0.width, height=prep_t0.height,
                crs=prep_t0.crs, transform=prep_t0.transform,
                resolution=prep_t0.resolution,
                georeferenced=prep_t0.georeferenced,
                evidence_area_km2=None,
                limitations=[align_meta.get("error", "Alignment error")],
                notes=[f"Alignment metadata: {align_meta}"],
            )
        if align_meta.get("notes"):
            notes.extend(align_meta["notes"])

        change_result = detect_sar_change(
            db0, db1, vm0, vm1,
            polarization=primary_pol,
            threshold_db=threshold,
            adaptive_threshold=adaptive_threshold,
            polygon_mask=polygon_mask,
            crs=prep_t0.crs,
            transform=prep_t0.transform,
            resolution=prep_t0.resolution,
        )

        if not change_result.success:
            return SARAnalysisResult(
                success=False, status=change_result.status,
                reason=change_result.reason,
                task=task, polarizations_used=pols_used,
                change_result=change_result, features=features,
                evidence_mask=None, evidence_fraction=0.0,
                evidence_label="none",
                width=prep_t0.width, height=prep_t0.height,
                crs=prep_t0.crs, transform=prep_t0.transform,
                resolution=prep_t0.resolution,
                georeferenced=prep_t0.georeferenced,
                evidence_area_km2=None,
                limitations=change_result.notes,
                notes=notes,
            )

        # ── Task-specific evidence selection ──────────────────────────────────
        if task == "flood_impact":
            # Backscatter DECREASE → flood candidate evidence
            # (water = specular reflector → very low SAR return)
            evidence_mask = change_result.decrease_mask
            evidence_fraction = change_result.decrease_fraction
            evidence_label = "backscatter_decrease (flood_candidate)"
            limitations.extend([
                "SAR backscatter decrease is evidence of flooding, not confirmation.",
                "Smooth roads, calm lakes, and some crops also show low backscatter.",
                "Urban double-bounce can mask flood signals in city scenes.",
                "Without Radiometric Terrain Correction (RTC), slopes may bias results.",
            ])
            notes.append(
                "Task=flood_impact: using SAR backscatter decrease as flood evidence. "
                "Downstream fusion with optical evidence is recommended."
            )

        elif task in ("urban_change",):
            # Backscatter INCREASE → urban/construction candidate evidence
            evidence_mask = change_result.increase_mask
            evidence_fraction = change_result.increase_fraction
            evidence_label = "backscatter_increase (construction_candidate)"
            limitations.extend([
                "SAR backscatter increase is evidence of potential construction or "
                "surface roughening — not confirmed new buildings.",
                "Seasonal vegetation, soil moisture, and wind can also increase backscatter.",
                "Combine with optical building segmentation for confirmation.",
            ])
            notes.append(
                "Task=urban_change: using SAR backscatter increase as construction evidence."
            )

        elif task == "fire_analysis":
            # Both increase and decrease are relevant for fire analysis
            evidence_mask = (
                change_result.increase_mask | change_result.decrease_mask
                if change_result.increase_mask is not None
                   and change_result.decrease_mask is not None
                else change_result.decrease_mask
            )
            evidence_fraction = (
                (change_result.increase_fraction + change_result.decrease_fraction)
                if evidence_mask is not None else 0.0
            )
            evidence_label = "backscatter_change (fire_candidate)"
            limitations.extend([
                "SAR is supporting evidence for fire analysis; optical NBR is primary.",
                "Fire effects on SAR include: canopy removal (decrease) and "
                "soil roughening (increase). Pattern interpretation is complex.",
            ])

        else:
            # General change detection: any significant change
            if change_result.increase_mask is not None and change_result.decrease_mask is not None:
                evidence_mask = change_result.increase_mask | change_result.decrease_mask
                evidence_fraction = change_result.increase_fraction + change_result.decrease_fraction
            elif change_result.decrease_mask is not None:
                evidence_mask = change_result.decrease_mask
                evidence_fraction = change_result.decrease_fraction
            evidence_label = "backscatter_change (general)"
            notes.append(
                f"Task={task}: reporting general SAR change (increase + decrease). "
                "Semantic interpretation requires task context."
            )
    else:
        # Single-scene: only feature statistics, no change detection
        notes.append(
            "Single SAR scene provided: temporal change analysis not available. "
            "Feature statistics computed for the single acquisition."
        )
        evidence_label = "single_scene_features_only"
        limitations.append("Single temporal acquisition — no change detection possible.")

    # ── Geographic area calculation ───────────────────────────────────────────
    evidence_area_km2: Optional[float] = None
    if (evidence_mask is not None and prep_t0.crs
            and prep_t0.resolution and len(prep_t0.resolution) >= 2):
        px_m2 = abs(prep_t0.resolution[0] * prep_t0.resolution[1])
        evidence_area_km2 = round(
            (int(np.sum(evidence_mask)) * px_m2) / 1_000_000.0, 4
        )
        notes.append(
            f"Evidence area: {evidence_area_km2} km² "
            f"(CRS: {prep_t0.crs}, res: {prep_t0.resolution})."
        )
    elif evidence_mask is not None:
        notes.append(
            "Geospatial CRS/resolution unavailable; area in km² not computed."
        )

    return SARAnalysisResult(
        success=True, status="success", reason=None,
        task=task, polarizations_used=pols_used,
        change_result=change_result, features=features,
        evidence_mask=evidence_mask,
        evidence_fraction=evidence_fraction,
        evidence_label=evidence_label,
        width=prep_t0.width, height=prep_t0.height,
        crs=prep_t0.crs, transform=prep_t0.transform,
        resolution=prep_t0.resolution,
        georeferenced=prep_t0.georeferenced,
        evidence_area_km2=evidence_area_km2,
        limitations=limitations,
        notes=notes,
    )
