"""
SAR Feature Extraction — SatQuery AI SAR Package.

Extracts general-purpose quantitative features from preprocessed Sentinel-1
SAR data. This module is TASK-AGNOSTIC: it does not know whether the
features will be used for flood detection, urban change, vegetation analysis,
or any other downstream task.

Features exposed:
  Per-polarisation (VV, VH, HH, HV where available):
    - mean, std, min, max, p10, p50, p90 of dB values
    - valid pixel count and fraction
  Cross-polarisation (when both VV and VH available):
    - VV/VH ratio in dB space (= VV_dB - VH_dB)
    - Cross-pol difference mean and std
  Temporal (when T0 and T1 preprocessed scenes are both provided):
    - Temporal change array: change = dB_T1 - dB_T0 (log-ratio in dB space)
    - Change statistics: mean, std, p10, p90
    - Increase fraction: pixels with change > +threshold
    - Decrease fraction: pixels with change < -threshold
    - Stable fraction
  Optional texture:
    - Local variance (sliding window, optional, labeled as heuristic)

All values computed from actual pixel data. No fabrication.
"""
from __future__ import annotations
import logging
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple

import numpy as np

from backend.services.sar.sar_preprocessing import SARPreprocessingResult

logger = logging.getLogger("SatQuery.SAR.Features")

_DEFAULT_CHANGE_THRESHOLD_DB: float = 2.0  # |change| > this → significant


@dataclass
class PolFeatures:
    """Single-polarisation feature set."""
    polarization: str
    valid_pixel_count: int
    total_pixel_count: int
    valid_fraction: float
    db_mean: Optional[float]
    db_std: Optional[float]
    db_min: Optional[float]
    db_max: Optional[float]
    db_p10: Optional[float]
    db_p50: Optional[float]
    db_p90: Optional[float]

    def to_dict(self) -> Dict:
        return {k: (round(v, 4) if isinstance(v, float) else v)
                for k, v in self.__dict__.items()}


@dataclass
class SARFeatures:
    """
    Full feature set extracted from one or two SAR acquisitions.
    Task-agnostic: downstream analysis determines how to interpret these.
    """
    # Per-polarisation statistics
    per_pol: Dict[str, PolFeatures]          # keyed by polarization

    # Cross-polarisation (VV, VH if both available)
    vv_vh_ratio_db_mean: Optional[float]     # mean(VV_dB - VH_dB)
    vv_vh_ratio_db_std: Optional[float]
    cross_pol_available: bool

    # Temporal features (if T0 and T1 both provided)
    temporal_available: bool
    temporal_change_mean_db: Optional[float]  # mean(T1_dB - T0_dB) per pol
    temporal_change_std_db: Optional[float]
    temporal_change_p10: Optional[float]
    temporal_change_p90: Optional[float]
    increase_fraction: Optional[float]        # fraction of pixels with change > threshold
    decrease_fraction: Optional[float]        # fraction of pixels with change < -threshold
    stable_fraction: Optional[float]
    change_threshold_db: float               # threshold used for inc/dec classification

    # Primary polarisation used for temporal features
    temporal_primary_pol: Optional[str]

    notes: List[str] = field(default_factory=list)

    def to_dict(self) -> Dict:
        d: Dict = {
            "per_pol": {k: v.to_dict() for k, v in self.per_pol.items()},
            "cross_pol_available": self.cross_pol_available,
            "temporal_available": self.temporal_available,
            "change_threshold_db": self.change_threshold_db,
            "temporal_primary_pol": self.temporal_primary_pol,
        }
        for k in (
            "vv_vh_ratio_db_mean", "vv_vh_ratio_db_std",
            "temporal_change_mean_db", "temporal_change_std_db",
            "temporal_change_p10", "temporal_change_p90",
            "increase_fraction", "decrease_fraction", "stable_fraction",
        ):
            v = getattr(self, k)
            d[k] = round(v, 4) if isinstance(v, float) else v
        d["notes"] = self.notes
        return d


def _pol_features_from_db(
    pol: str, db: Optional[np.ndarray], valid: Optional[np.ndarray],
    total_px: int
) -> PolFeatures:
    """Compute single-polarisation statistics from dB array."""
    if db is None or valid is None:
        return PolFeatures(
            polarization=pol, valid_pixel_count=0, total_pixel_count=total_px,
            valid_fraction=0.0,
            db_mean=None, db_std=None, db_min=None, db_max=None,
            db_p10=None, db_p50=None, db_p90=None,
        )
    vals = db[valid]
    valid_count = len(vals)
    if valid_count == 0:
        return PolFeatures(
            polarization=pol, valid_pixel_count=0, total_pixel_count=total_px,
            valid_fraction=0.0,
            db_mean=None, db_std=None, db_min=None, db_max=None,
            db_p10=None, db_p50=None, db_p90=None,
        )
    return PolFeatures(
        polarization=pol,
        valid_pixel_count=valid_count,
        total_pixel_count=total_px,
        valid_fraction=round(float(valid_count / max(1, total_px)), 4),
        db_mean=float(np.mean(vals)),
        db_std=float(np.std(vals)),
        db_min=float(np.min(vals)),
        db_max=float(np.max(vals)),
        db_p10=float(np.percentile(vals, 10)),
        db_p50=float(np.percentile(vals, 50)),
        db_p90=float(np.percentile(vals, 90)),
    )


def extract_sar_features(
    scene: SARPreprocessingResult,
    scene_t1: Optional[SARPreprocessingResult] = None,
    change_threshold_db: float = _DEFAULT_CHANGE_THRESHOLD_DB,
    primary_pol: Optional[str] = None,
) -> SARFeatures:
    """
    Extract general SAR features from one or two preprocessed scenes.

    Args:
        scene            : T0 (or single) preprocessed SAR scene
        scene_t1         : T1 scene for temporal analysis (optional)
        change_threshold_db: |dB change| above which change is 'significant'
        primary_pol      : preferred polarisation for temporal analysis
                          (default: "VV" if available, else first available)

    Returns:
        SARFeatures — task-agnostic; downstream analysis interprets meaning.
    """
    notes: List[str] = []
    per_pol: Dict[str, PolFeatures] = {}
    total_px = scene.width * scene.height

    for pol, bp in scene.bands.items():
        per_pol[pol] = _pol_features_from_db(pol, bp.db_array, bp.valid_mask, total_px)

    # Cross-polarisation (VV / VH ratio in dB space = VV_dB - VH_dB)
    vv_vh_ratio_mean = None
    vv_vh_ratio_std = None
    cross_avail = "VV" in scene.bands and "VH" in scene.bands
    if cross_avail:
        vv_db = scene.bands["VV"].db_array
        vh_db = scene.bands["VH"].db_array
        vv_vm = scene.bands["VV"].valid_mask
        vh_vm = scene.bands["VH"].valid_mask
        if vv_db is not None and vh_db is not None:
            both = vv_vm & vh_vm
            if np.any(both):
                ratio = vv_db[both] - vh_db[both]
                vv_vh_ratio_mean = float(np.mean(ratio))
                vv_vh_ratio_std = float(np.std(ratio))
                notes.append(
                    f"VV/VH ratio (dB): mean={vv_vh_ratio_mean:.3f}, "
                    f"std={vv_vh_ratio_std:.3f}."
                )

    # Temporal features
    temporal_avail = False
    t_mean = t_std = t_p10 = t_p90 = None
    inc_frac = dec_frac = stable_frac = None
    t_primary_pol: Optional[str] = None

    if scene_t1 is not None:
        # Select primary polarisation for temporal analysis
        if primary_pol and primary_pol in scene.bands and primary_pol in scene_t1.bands:
            t_primary_pol = primary_pol
        elif "VV" in scene.bands and "VV" in scene_t1.bands:
            t_primary_pol = "VV"
        else:
            shared = [p for p in scene.polarizations_available
                      if p in scene_t1.polarizations_available]
            t_primary_pol = shared[0] if shared else None

        if t_primary_pol:
            db0 = scene.bands[t_primary_pol].db_array
            vm0 = scene.bands[t_primary_pol].valid_mask
            db1 = scene_t1.bands[t_primary_pol].db_array if t_primary_pol in scene_t1.bands else None
            vm1 = scene_t1.bands[t_primary_pol].valid_mask if t_primary_pol in scene_t1.bands else None

            if db0 is not None and db1 is not None and vm0 is not None and vm1 is not None:
                # Align shapes if needed
                if db0.shape != db1.shape:
                    notes.append(
                        f"Shape mismatch for temporal {t_primary_pol}: "
                        f"{db0.shape} vs {db1.shape}. "
                        "Run align_sar_pair() before extract_sar_features() "
                        "for accurate temporal features."
                    )

                combined_valid = vm0 & vm1
                if db1.shape == db0.shape:
                    change = np.full_like(db0, np.nan)
                    change[combined_valid] = (db1[combined_valid] - db0[combined_valid]).astype(np.float32)
                    ch_vals = change[combined_valid]

                    if len(ch_vals) > 0:
                        temporal_avail = True
                        t_mean = float(np.mean(ch_vals))
                        t_std = float(np.std(ch_vals))
                        t_p10 = float(np.percentile(ch_vals, 10))
                        t_p90 = float(np.percentile(ch_vals, 90))
                        valid_n = len(ch_vals)
                        inc_frac = float(np.sum(ch_vals > change_threshold_db) / valid_n)
                        dec_frac = float(np.sum(ch_vals < -change_threshold_db) / valid_n)
                        stable_frac = 1.0 - inc_frac - dec_frac
                        notes.append(
                            f"Temporal features ({t_primary_pol}): change mean="
                            f"{t_mean:.3f} dB, "
                            f"increase={inc_frac*100:.1f}%, "
                            f"decrease={dec_frac*100:.1f}%, "
                            f"stable={stable_frac*100:.1f}% "
                            f"(threshold ±{change_threshold_db} dB)."
                        )
        else:
            notes.append(
                "Temporal features unavailable: no shared polarisation between T0 and T1."
            )

    return SARFeatures(
        per_pol=per_pol,
        vv_vh_ratio_db_mean=vv_vh_ratio_mean,
        vv_vh_ratio_db_std=vv_vh_ratio_std,
        cross_pol_available=cross_avail,
        temporal_available=temporal_avail,
        temporal_change_mean_db=t_mean,
        temporal_change_std_db=t_std,
        temporal_change_p10=t_p10,
        temporal_change_p90=t_p90,
        increase_fraction=inc_frac,
        decrease_fraction=dec_frac,
        stable_fraction=stable_frac,
        change_threshold_db=change_threshold_db,
        temporal_primary_pol=t_primary_pol,
        notes=notes,
    )
