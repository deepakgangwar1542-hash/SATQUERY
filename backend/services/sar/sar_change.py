"""
SAR Temporal Change Analysis — SatQuery AI SAR Package.

Computes general-purpose temporal SAR change between two acquisitions.
This module is TASK-AGNOSTIC: it detects changed pixels without labelling
the cause (flood, construction, vegetation loss, erosion, etc.).

Algorithm:
  Log-ratio change detection in dB space:
      change(x, y) = dB_T1(x, y) − dB_T0(x, y)

  Pixel classification:
      increase  : change > +threshold_db  (increased backscatter: e.g. rougher surface,
                                           vegetation growth, construction, urban return)
      decrease  : change < −threshold_db  (decreased backscatter: e.g. flooding,
                                           surface smoothing, vegetation loss)
      no_change : |change| ≤ threshold_db

  The interpretation of increase/decrease is TASK-DEPENDENT and must be done
  by the calling analysis layer (sar_analysis.py), not here.

Threshold selection:
  - "fixed"         : user-specified threshold (default 3.0 dB)
  - "otsu_adaptive" : Otsu's method on the change histogram (both tails)
  Both are documented and configurable.

This module does NOT:
  - Label backscatter decrease as "flood"
  - Label backscatter increase as "construction"
  - Make any land-cover interpretation
  - Return fake change percentages

SAR change is a physical measurement. Semantic interpretation is downstream.
"""
from __future__ import annotations
import logging
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple

import numpy as np

logger = logging.getLogger("SatQuery.SAR.Change")

_DEFAULT_THRESHOLD_DB: float = 3.0     # |change| > 3 dB → significant change


@dataclass
class SARChangeResult:
    """
    Output of temporal SAR change analysis.

    Contains raw change arrays and classified masks for increase, decrease,
    and stable pixels. Semantic interpretation (flood, construction, etc.)
    must be applied by the downstream task layer.
    """
    success: bool
    status: str
    reason: Optional[str]

    # Raw change array: dB_T1 - dB_T0 (NaN where invalid)
    change_array: Optional[np.ndarray]

    # Classification masks (bool)
    increase_mask: Optional[np.ndarray]   # change > +threshold
    decrease_mask: Optional[np.ndarray]   # change < -threshold
    stable_mask: Optional[np.ndarray]     # |change| ≤ threshold
    combined_valid_mask: Optional[np.ndarray]

    # Quantitative summary (from actual pixel computation)
    increase_pixel_count: int
    decrease_pixel_count: int
    stable_pixel_count: int
    valid_pixel_count: int
    increase_fraction: float
    decrease_fraction: float
    stable_fraction: float

    # Change statistics
    change_mean_db: Optional[float]
    change_std_db: Optional[float]
    change_p10_db: Optional[float]
    change_p90_db: Optional[float]

    # Algorithm documentation
    threshold_db: float
    threshold_method: str       # "fixed" or "otsu_adaptive"
    polarization: str
    algorithm: str = (
        "log_ratio_dB: change = dB(T1) − dB(T0); "
        "increase: change > threshold; decrease: change < −threshold"
    )

    # Geospatial context (preserved for downstream intersection)
    width: int = 0
    height: int = 0
    crs: Optional[str] = None
    transform: Optional[List[float]] = None
    resolution: Optional[List[float]] = None

    notes: List[str] = field(default_factory=list)

    def to_metadata_dict(self) -> Dict[str, Any]:
        return {
            "success": self.success,
            "status": self.status,
            "reason": self.reason,
            "algorithm": self.algorithm,
            "polarization": self.polarization,
            "threshold_db": self.threshold_db,
            "threshold_method": self.threshold_method,
            "increase_pixel_count": self.increase_pixel_count,
            "decrease_pixel_count": self.decrease_pixel_count,
            "stable_pixel_count": self.stable_pixel_count,
            "valid_pixel_count": self.valid_pixel_count,
            "increase_fraction": round(self.increase_fraction, 4),
            "decrease_fraction": round(self.decrease_fraction, 4),
            "stable_fraction": round(self.stable_fraction, 4),
            "change_mean_db": round(self.change_mean_db, 3) if self.change_mean_db else None,
            "change_std_db": round(self.change_std_db, 3) if self.change_std_db else None,
            "change_p10_db": round(self.change_p10_db, 3) if self.change_p10_db else None,
            "change_p90_db": round(self.change_p90_db, 3) if self.change_p90_db else None,
            "width": self.width, "height": self.height,
            "crs": self.crs, "resolution": self.resolution,
            "notes": self.notes,
        }


def _otsu_change_threshold(change_vals: np.ndarray) -> float:
    """
    Adaptive threshold via Otsu's method on the absolute change distribution.
    Returns the threshold magnitude; caller applies ±threshold.
    Falls back to _DEFAULT_THRESHOLD_DB if histogram is unimodal.
    """
    abs_vals = np.abs(change_vals[np.isfinite(change_vals)])
    if len(abs_vals) < 200:
        return _DEFAULT_THRESHOLD_DB

    hist, edges = np.histogram(abs_vals, bins=128)
    centers = (edges[:-1] + edges[1:]) / 2
    total = hist.sum()
    if total == 0:
        return _DEFAULT_THRESHOLD_DB

    best_var, best_t = 0.0, _DEFAULT_THRESHOLD_DB
    cum, cum_mean = 0, 0.0
    global_mean = float(np.dot(hist, centers)) / total

    for i in range(len(hist)):
        cum += hist[i]
        cum_mean += hist[i] * centers[i]
        if cum == 0:
            continue
        w0 = cum / total
        w1 = 1.0 - w0
        if w1 < 1e-6:
            break
        mu0 = cum_mean / cum
        mu1 = (global_mean * total - cum_mean) / (total * w1 + 1e-9)
        var = w0 * w1 * (mu0 - mu1) ** 2
        if var > best_var:
            best_var = var
            best_t = float(centers[i])

    return float(np.clip(best_t, 1.0, 15.0))


def detect_sar_change(
    db_t0: np.ndarray,
    db_t1: np.ndarray,
    valid_t0: np.ndarray,
    valid_t1: np.ndarray,
    polarization: str = "VV",
    threshold_db: float = _DEFAULT_THRESHOLD_DB,
    adaptive_threshold: bool = False,
    polygon_mask: Optional[np.ndarray] = None,
    crs: Optional[str] = None,
    transform: Optional[List[float]] = None,
    resolution: Optional[List[float]] = None,
) -> SARChangeResult:
    """
    Compute general-purpose temporal SAR change between two dB arrays.

    Args:
        db_t0, db_t1      : pre-aligned dB arrays for T0 and T1
        valid_t0, valid_t1: boolean valid-pixel masks
        polarization      : label for provenance ("VV", "VH", …)
        threshold_db      : |change| threshold for increase/decrease classification
        adaptive_threshold: use Otsu-style automatic thresholding
        polygon_mask      : optional ROI boolean mask
        crs, transform, resolution: geospatial context

    Returns:
        SARChangeResult with change array, masks, and statistics.
        Does NOT label the change with any semantic interpretation.
    """
    notes: List[str] = []
    h, w = db_t0.shape

    combined_valid = valid_t0 & valid_t1
    if polygon_mask is not None and polygon_mask.shape == (h, w):
        combined_valid &= polygon_mask
        notes.append("ROI polygon mask applied.")

    valid_count = int(np.sum(combined_valid))
    if valid_count == 0:
        return SARChangeResult(
            success=False, status="no_valid_pixels",
            reason="No valid pixels in combined mask after ROI application.",
            change_array=None, increase_mask=None, decrease_mask=None,
            stable_mask=None, combined_valid_mask=combined_valid,
            increase_pixel_count=0, decrease_pixel_count=0,
            stable_pixel_count=0, valid_pixel_count=0,
            increase_fraction=0.0, decrease_fraction=0.0, stable_fraction=0.0,
            change_mean_db=None, change_std_db=None,
            change_p10_db=None, change_p90_db=None,
            threshold_db=threshold_db, threshold_method="fixed",
            polarization=polarization,
            width=w, height=h, crs=crs, transform=transform, resolution=resolution,
            notes=["No valid pixels after masking."],
        )

    # Log-ratio change in dB space: change = T1_dB - T0_dB
    change = np.full((h, w), np.nan, dtype=np.float32)
    change[combined_valid] = (db_t1[combined_valid] - db_t0[combined_valid]).astype(np.float32)

    valid_changes = change[combined_valid]
    ch_mean = float(np.nanmean(valid_changes))
    ch_std = float(np.nanstd(valid_changes))
    ch_p10 = float(np.percentile(valid_changes, 10))
    ch_p90 = float(np.percentile(valid_changes, 90))

    # Threshold selection
    t_method = "fixed"
    t_used = threshold_db
    if adaptive_threshold:
        ot = _otsu_change_threshold(valid_changes)
        if abs(ot - threshold_db) > 0.5:
            t_used = ot
            t_method = "otsu_adaptive"
            notes.append(f"Otsu adaptive threshold: {t_used:.2f} dB.")
        else:
            notes.append(
                f"Otsu ({ot:.2f} dB) close to fixed ({threshold_db:.2f} dB); "
                "using fixed threshold."
            )

    notes.append(
        f"Change threshold: ±{t_used:.2f} dB "
        f"(algorithm: log-ratio dB, T1−T0). "
        f"Semantic interpretation is task-dependent."
    )

    increase_mask = combined_valid & np.isfinite(change) & (change > t_used)
    decrease_mask = combined_valid & np.isfinite(change) & (change < -t_used)
    stable_mask = combined_valid & np.isfinite(change) & (np.abs(change) <= t_used)

    inc_px = int(np.sum(increase_mask))
    dec_px = int(np.sum(decrease_mask))
    stab_px = int(np.sum(stable_mask))

    inc_frac = round(float(inc_px / max(1, valid_count)), 4)
    dec_frac = round(float(dec_px / max(1, valid_count)), 4)
    stab_frac = round(float(stab_px / max(1, valid_count)), 4)

    notes.append(
        f"{polarization}: increase={inc_px} px ({inc_frac*100:.2f}%), "
        f"decrease={dec_px} px ({dec_frac*100:.2f}%), "
        f"stable={stab_px} px ({stab_frac*100:.2f}%)."
    )
    logger.info(
        f"[SAR.Change] {polarization}: mean={ch_mean:.3f} dB, "
        f"inc={inc_frac*100:.1f}%, dec={dec_frac*100:.1f}%, "
        f"stable={stab_frac*100:.1f}%"
    )

    return SARChangeResult(
        success=True, status="success", reason=None,
        change_array=change,
        increase_mask=increase_mask,
        decrease_mask=decrease_mask,
        stable_mask=stable_mask,
        combined_valid_mask=combined_valid,
        increase_pixel_count=inc_px,
        decrease_pixel_count=dec_px,
        stable_pixel_count=stab_px,
        valid_pixel_count=valid_count,
        increase_fraction=inc_frac,
        decrease_fraction=dec_frac,
        stable_fraction=stab_frac,
        change_mean_db=ch_mean,
        change_std_db=ch_std,
        change_p10_db=ch_p10,
        change_p90_db=ch_p90,
        threshold_db=t_used,
        threshold_method=t_method,
        polarization=polarization,
        width=w, height=h,
        crs=crs, transform=transform, resolution=resolution,
        notes=notes,
    )
