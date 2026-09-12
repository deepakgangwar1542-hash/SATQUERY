"""
SAR + Optical Generic Evidence Fusion — SatQuery AI SAR Package.

Combines independent evidence from two sensor modalities (SAR and optical)
for any analysis task. This module is TASK-AGNOSTIC: it does not contain
flood-specific logic. Task context is passed in and used only to adjust
default weights and agreement thresholds.

Fusion strategies:
  "union"           — evidence if EITHER sensor detects it (max recall)
  "intersection"    — evidence if BOTH sensors detect it (max precision)
  "weighted_average"— weighted vote (default; configurable weights)
  "sar_primary"     — SAR dominates; optical is supplementary
  "optical_primary" — optical dominates; SAR is supplementary

Sensor agreement:
  agreement = 1 − |sar_frac − optical_frac| / max(sar_frac + optical_frac, 1e-6)
  1.0 = identical evidence extent; 0.0 = total disagreement.
  Disagreement is ALWAYS exposed — it is never hidden.

When both sensors show evidence for the same thing but at different magnitudes,
this is reported as "partial_agreement". The final answer should acknowledge
the disagreement and adjust confidence accordingly.
"""
from __future__ import annotations
import logging
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Dict, List, Optional

import numpy as np
from PIL import Image

logger = logging.getLogger("SatQuery.SAR.Fusion")


class FusionStrategy(str, Enum):
    UNION = "union"
    INTERSECTION = "intersection"
    WEIGHTED_AVERAGE = "weighted_average"
    SAR_PRIMARY = "sar_primary"
    OPTICAL_PRIMARY = "optical_primary"


# Default weights — SAR slightly favoured as it is cloud-independent
_DEFAULT_SAR_WEIGHT = 0.55
_DEFAULT_OPTICAL_WEIGHT = 0.45


@dataclass
class SARFusionResult:
    """
    Generic multi-sensor evidence fusion result.

    Not flood-specific. Works for any binary evidence mask from any task.
    """
    success: bool
    status: str
    reason: Optional[str]

    # Final fused evidence mask
    final_mask: Optional[np.ndarray]
    final_valid_mask: Optional[np.ndarray]
    evidence_pixel_count: int
    valid_pixel_count: int
    evidence_fraction: float

    # Fusion metadata
    fusion_strategy: str
    sar_weight: float
    optical_weight: float
    task: str

    # Sensor agreement
    sar_evidence_fraction: Optional[float]
    optical_evidence_fraction: Optional[float]
    sensor_agreement: float            # 0.0 to 1.0
    fusion_status: str                 # "sar_only" | "optical_only" | "both_sensors" | ...
    sensors_disagree: bool             # True when agreement < 0.5

    # Geospatial context
    width: int
    height: int
    crs: Optional[str]
    transform: Optional[List[float]]
    resolution: Optional[List[float]]
    georeferenced: bool

    # Evidence provenance (kept for verifier)
    sar_evidence_metadata: Optional[Dict[str, Any]]
    optical_evidence_metadata: Optional[Dict[str, Any]]

    notes: List[str] = field(default_factory=list)

    def to_metadata_dict(self) -> Dict[str, Any]:
        return {
            "success": self.success,
            "status": self.status,
            "reason": self.reason,
            "task": self.task,
            "fusion_strategy": self.fusion_strategy,
            "sar_weight": self.sar_weight,
            "optical_weight": self.optical_weight,
            "sar_evidence_fraction": (
                round(self.sar_evidence_fraction, 4)
                if self.sar_evidence_fraction is not None else None
            ),
            "optical_evidence_fraction": (
                round(self.optical_evidence_fraction, 4)
                if self.optical_evidence_fraction is not None else None
            ),
            "sensor_agreement": round(self.sensor_agreement, 4),
            "fusion_status": self.fusion_status,
            "sensors_disagree": self.sensors_disagree,
            "evidence_pixel_count": self.evidence_pixel_count,
            "valid_pixel_count": self.valid_pixel_count,
            "evidence_fraction": round(self.evidence_fraction, 4),
            "width": self.width, "height": self.height,
            "crs": self.crs, "resolution": self.resolution,
            "georeferenced": self.georeferenced,
            "sar_evidence_metadata": self.sar_evidence_metadata,
            "optical_evidence_metadata": self.optical_evidence_metadata,
            "notes": self.notes,
        }


def _agreement(sar_frac: Optional[float], opt_frac: Optional[float]) -> float:
    if sar_frac is None and opt_frac is None:
        return 1.0
    if sar_frac is None or opt_frac is None:
        return 0.0
    denom = max(sar_frac + opt_frac, 1e-6)
    return float(np.clip(1.0 - abs(sar_frac - opt_frac) / denom, 0.0, 1.0))


def _fusion_status(agree: float, has_sar: bool, has_opt: bool) -> str:
    if has_sar and not has_opt:
        return "sar_only"
    if has_opt and not has_sar:
        return "optical_only"
    if agree >= 0.85:
        return "full_agreement"
    if agree >= 0.5:
        return "partial_agreement"
    return "sensor_disagreement"


def _resize_mask(mask: np.ndarray, h: int, w: int) -> np.ndarray:
    if mask.shape == (h, w):
        return mask
    return np.array(
        Image.fromarray((mask.astype(np.uint8) * 255)).resize((w, h), Image.Resampling.NEAREST)
    ) > 127


def fuse_sar_optical_evidence(
    sar_mask: Optional[np.ndarray] = None,
    sar_valid_mask: Optional[np.ndarray] = None,
    sar_evidence_fraction: Optional[float] = None,
    optical_mask: Optional[np.ndarray] = None,
    optical_valid_mask: Optional[np.ndarray] = None,
    optical_evidence_fraction: Optional[float] = None,
    task: str = "change_detection",
    strategy: FusionStrategy = FusionStrategy.WEIGHTED_AVERAGE,
    sar_weight: float = _DEFAULT_SAR_WEIGHT,
    optical_weight: float = _DEFAULT_OPTICAL_WEIGHT,
    sar_evidence_metadata: Optional[Dict[str, Any]] = None,
    optical_evidence_metadata: Optional[Dict[str, Any]] = None,
    crs: Optional[str] = None,
    transform: Optional[List[float]] = None,
    resolution: Optional[List[float]] = None,
) -> SARFusionResult:
    """
    Fuse SAR and optical evidence masks for any analysis task.

    Either or both masks may be None (single-sensor mode).

    Args:
        sar_mask                : boolean SAR evidence mask
        sar_valid_mask          : boolean SAR valid-pixel mask
        sar_evidence_fraction   : pre-computed SAR evidence fraction
        optical_mask            : boolean optical evidence mask
        optical_valid_mask      : boolean optical valid-pixel mask
        optical_evidence_fraction: pre-computed optical evidence fraction
        task                    : task identifier (for provenance)
        strategy                : FusionStrategy
        sar_weight / optical_weight: weights for weighted strategies
        sar/optical_evidence_metadata: dicts for provenance
        crs, transform, resolution: geospatial context

    Returns:
        SARFusionResult — generic, task-agnostic.
    """
    notes: List[str] = []
    has_sar = sar_mask is not None
    has_opt = optical_mask is not None

    if has_sar and sar_evidence_fraction is None:
        sar_evidence_fraction = float(np.sum(sar_mask) / max(1, sar_mask.size))
    if has_opt and optical_evidence_fraction is None:
        optical_evidence_fraction = float(np.sum(optical_mask) / max(1, optical_mask.size))

    if has_sar and has_opt:
        if sar_mask.shape == optical_mask.shape:
            union_px = int(np.sum(sar_mask | optical_mask))
            if union_px > 0:
                agree = float(np.sum(sar_mask & optical_mask) / union_px)
            else:
                agree = 1.0
        else:
            agree = _agreement(sar_evidence_fraction, optical_evidence_fraction)
    else:
        agree = _agreement(sar_evidence_fraction, optical_evidence_fraction)

    fstatus = _fusion_status(agree, has_sar, has_opt)
    disagree = agree < 0.5 and has_sar and has_opt

    if disagree:
        msg = (
            f"⚠ Sensor disagreement: SAR evidence={sar_evidence_fraction:.4f}, "
            f"optical={optical_evidence_fraction:.4f}, agreement={agree:.3f}. "
            "Possible causes: cloud contamination, surface roughness, "
            "or temporal offset between acquisitions."
        )
        notes.append(msg)
        logger.warning(f"[SAR.Fusion] task={task}: {msg}")

    nw_sar = sar_weight / (sar_weight + optical_weight)
    nw_opt = optical_weight / (sar_weight + optical_weight)

    # Reference dimensions: prefer SAR, fallback to optical
    ref_shape = (
        sar_mask.shape if has_sar else optical_mask.shape
    )
    h_ref, w_ref = ref_shape

    # ── SAR only ──────────────────────────────────────────────────────────────
    if has_sar and not has_opt:
        notes.append("Single-sensor fusion (SAR only).")
        valid = sar_valid_mask if sar_valid_mask is not None else np.ones_like(sar_mask)
        ev_px = int(np.sum(sar_mask))
        val_px = int(np.sum(valid))
        return SARFusionResult(
            success=True, status="success", reason=None,
            final_mask=sar_mask, final_valid_mask=valid,
            evidence_pixel_count=ev_px, valid_pixel_count=val_px,
            evidence_fraction=round(float(ev_px / max(1, val_px)), 4),
            fusion_strategy="sar_only", sar_weight=1.0, optical_weight=0.0,
            task=task,
            sar_evidence_fraction=sar_evidence_fraction,
            optical_evidence_fraction=None,
            sensor_agreement=1.0, fusion_status=fstatus, sensors_disagree=False,
            width=w_ref, height=h_ref,
            crs=crs, transform=transform, resolution=resolution,
            georeferenced=crs is not None,
            sar_evidence_metadata=sar_evidence_metadata,
            optical_evidence_metadata=None, notes=notes,
        )

    # ── Optical only ──────────────────────────────────────────────────────────
    if has_opt and not has_sar:
        notes.append("Single-sensor fusion (optical only).")
        valid = optical_valid_mask if optical_valid_mask is not None else np.ones_like(optical_mask)
        ev_px = int(np.sum(optical_mask))
        val_px = int(np.sum(valid))
        return SARFusionResult(
            success=True, status="success", reason=None,
            final_mask=optical_mask, final_valid_mask=valid,
            evidence_pixel_count=ev_px, valid_pixel_count=val_px,
            evidence_fraction=round(float(ev_px / max(1, val_px)), 4),
            fusion_strategy="optical_only", sar_weight=0.0, optical_weight=1.0,
            task=task,
            sar_evidence_fraction=None,
            optical_evidence_fraction=optical_evidence_fraction,
            sensor_agreement=1.0, fusion_status=fstatus, sensors_disagree=False,
            width=w_ref, height=h_ref,
            crs=crs, transform=transform, resolution=resolution,
            georeferenced=crs is not None,
            sar_evidence_metadata=None,
            optical_evidence_metadata=optical_evidence_metadata, notes=notes,
        )

    # ── Neither available ─────────────────────────────────────────────────────
    if not has_sar and not has_opt:
        return SARFusionResult(
            success=False, status="no_data",
            reason="Neither SAR nor optical evidence mask available.",
            final_mask=None, final_valid_mask=None,
            evidence_pixel_count=0, valid_pixel_count=0, evidence_fraction=0.0,
            fusion_strategy="none", sar_weight=0.0, optical_weight=0.0,
            task=task,
            sar_evidence_fraction=None, optical_evidence_fraction=None,
            sensor_agreement=0.0, fusion_status="no_data", sensors_disagree=False,
            width=0, height=0,
            crs=crs, transform=transform, resolution=resolution,
            georeferenced=crs is not None,
            sar_evidence_metadata=None, optical_evidence_metadata=None,
            notes=["No evidence masks provided."],
        )

    # ── Both sensors ──────────────────────────────────────────────────────────
    opt_aligned = _resize_mask(optical_mask, h_ref, w_ref)
    if optical_mask.shape != (h_ref, w_ref):
        notes.append(f"Optical mask resized {optical_mask.shape} → ({h_ref},{w_ref}).")

    opt_valid_aligned = (
        _resize_mask(optical_valid_mask, h_ref, w_ref)
        if optical_valid_mask is not None
        else np.ones((h_ref, w_ref), dtype=bool)
    )
    sar_valid_used = sar_valid_mask if sar_valid_mask is not None else np.ones_like(sar_mask)
    combined_valid = sar_valid_used & opt_valid_aligned

    notes.append(
        f"Dual-sensor fusion: strategy={strategy.value}, "
        f"SAR×{nw_sar:.2f} + optical×{nw_opt:.2f}, "
        f"agreement={agree:.3f}."
    )

    if strategy == FusionStrategy.UNION:
        final = (sar_mask | opt_aligned) & combined_valid
    elif strategy == FusionStrategy.INTERSECTION:
        final = (sar_mask & opt_aligned) & combined_valid
    elif strategy == FusionStrategy.SAR_PRIMARY:
        prob = nw_sar * sar_mask.astype(float) + nw_opt * opt_aligned.astype(float)
        final = (prob > 0.55) & combined_valid
    elif strategy == FusionStrategy.OPTICAL_PRIMARY:
        prob = nw_opt * opt_aligned.astype(float) + nw_sar * sar_mask.astype(float)
        final = (prob > 0.55) & combined_valid
    else:  # WEIGHTED_AVERAGE
        prob = (nw_sar * sar_mask.astype(np.float32)
                + nw_opt * opt_aligned.astype(np.float32))
        final = (prob >= 0.5) & combined_valid

    ev_px = int(np.sum(final))
    val_px = int(np.sum(combined_valid))
    ev_frac = round(float(ev_px / max(1, val_px)), 4)
    notes.append(f"Fused: {ev_px} evidence px / {val_px} valid px ({ev_frac*100:.2f}%).")

    return SARFusionResult(
        success=True, status="success", reason=None,
        final_mask=final, final_valid_mask=combined_valid,
        evidence_pixel_count=ev_px, valid_pixel_count=val_px,
        evidence_fraction=ev_frac,
        fusion_strategy=strategy.value,
        sar_weight=round(nw_sar, 3), optical_weight=round(nw_opt, 3),
        task=task,
        sar_evidence_fraction=sar_evidence_fraction,
        optical_evidence_fraction=optical_evidence_fraction,
        sensor_agreement=round(agree, 4),
        fusion_status=fstatus, sensors_disagree=disagree,
        width=w_ref, height=h_ref,
        crs=crs, transform=transform, resolution=resolution,
        georeferenced=crs is not None,
        sar_evidence_metadata=sar_evidence_metadata,
        optical_evidence_metadata=optical_evidence_metadata,
        notes=notes,
    )
