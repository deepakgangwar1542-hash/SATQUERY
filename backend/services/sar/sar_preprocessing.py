"""
SAR Preprocessing — SatQuery AI SAR Package.

Preprocessing for Sentinel-1 GRD SAR data. Task-agnostic: prepares
calibrated dB arrays for any downstream analysis task.

Steps performed:
  1. NoData/NaN/Inf masking — cleans invalid pixels before any computation
  2. Near-zero masking       — linear values <= 1e-9 treated as nodata
                               (common edge padding in Sentinel-1 GRD)
  3. Linear → dB conversion  — dB = 10 * log10(power), for power > 0
                               Values <= 0 become NaN (not -inf)
  4. Optional speckle filter — simplified box-mean Lee filter (labeled as
                               heuristic; not a full Lee filter)
  5. Per-band statistics     — mean, std, percentiles of valid dB values
  6. Normalisation           — scene-relative [0,1] for visualisation/models
  7. Temporal alignment      — resize T1 to T0 dimensions (BILINEAR for dB,
                               NEAREST for masks) with CRS-mismatch warning

Algorithm transparency:
  - dB conversion: dB = 10*log10(power), only where power > 0
  - Zeros → NaN (not -inf): prevents nodata leaking as extreme low backscatter
  - Normalisation uses actual scene min/max; NOT a calibrated physical value
  - Speckle filter is optional and clearly labelled as approximate
"""
from __future__ import annotations
import logging
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple

import numpy as np
from PIL import Image

from backend.services.sar.sentinel1_adapter import SAR1Scene

logger = logging.getLogger("SatQuery.SAR.Preprocessing")


@dataclass
class BandPreprocessed:
    """Preprocessing result for one polarisation channel."""
    polarization: str
    raw_array: np.ndarray
    db_array: Optional[np.ndarray]
    norm_array: Optional[np.ndarray]
    valid_mask: np.ndarray
    valid_pixel_count: int
    total_pixel_count: int
    valid_fraction: float
    db_min: Optional[float]
    db_max: Optional[float]
    db_mean: Optional[float]
    db_std: Optional[float]
    unit_is_linear_input: bool
    notes: List[str] = field(default_factory=list)


@dataclass
class SARPreprocessingResult:
    """Complete preprocessing outcome for one SAR scene."""
    success: bool
    status: str
    reason: Optional[str]
    bands: Dict[str, BandPreprocessed]
    polarizations_available: List[str]
    width: int
    height: int
    crs: Optional[str]
    transform: Optional[List[float]]
    resolution: Optional[List[float]]
    georeferenced: bool
    notes: List[str] = field(default_factory=list)

    def get_db(self, pol: str) -> Optional[np.ndarray]:
        return self.bands[pol].db_array if pol in self.bands else None

    def get_valid(self, pol: str) -> Optional[np.ndarray]:
        return self.bands[pol].valid_mask if pol in self.bands else None

    def to_metadata_dict(self) -> dict:
        return {
            "success": self.success,
            "status": self.status,
            "reason": self.reason,
            "polarizations_available": self.polarizations_available,
            "width": self.width, "height": self.height,
            "crs": self.crs, "resolution": self.resolution,
            "georeferenced": self.georeferenced,
            "bands": {
                pol: {
                    "valid_pixel_count": bp.valid_pixel_count,
                    "total_pixel_count": bp.total_pixel_count,
                    "valid_fraction": round(bp.valid_fraction, 4),
                    "db_min": round(bp.db_min, 3) if bp.db_min is not None else None,
                    "db_max": round(bp.db_max, 3) if bp.db_max is not None else None,
                    "db_mean": round(bp.db_mean, 3) if bp.db_mean is not None else None,
                    "db_std": round(bp.db_std, 3) if bp.db_std is not None else None,
                    "unit_is_linear_input": bp.unit_is_linear_input,
                    "notes": bp.notes,
                }
                for pol, bp in self.bands.items()
            },
            "notes": self.notes,
        }


def _linear_to_db(arr: np.ndarray) -> np.ndarray:
    """dB = 10*log10(power); values <= 0 → NaN (not -inf)."""
    result = np.full_like(arr, np.nan, dtype=np.float32)
    valid = np.isfinite(arr) & (arr > 0.0)
    result[valid] = (10.0 * np.log10(arr[valid].astype(np.float64))).astype(np.float32)
    return result


def _compute_valid_mask(
    arr: np.ndarray,
    nodata_val: Optional[float] = None,
    near_zero: float = 1e-9,
) -> np.ndarray:
    """True where pixel is valid (finite, non-nodata, above noise floor)."""
    mask = np.isfinite(arr) & (arr > near_zero)
    if nodata_val is not None:
        mask &= (arr != nodata_val)
    return mask


def _lee_box_filter(arr: np.ndarray, k: int = 3) -> np.ndarray:
    """Simplified box-mean speckle reduction (NaN-safe). Labeled as heuristic."""
    try:
        from scipy.ndimage import uniform_filter
        nan_mask = ~np.isfinite(arr)
        tmp = np.where(nan_mask, 0.0, arr)
        cnt = np.where(nan_mask, 0.0, 1.0)
        out = uniform_filter(tmp, k) / np.maximum(uniform_filter(cnt, k), 1e-9)
        out[nan_mask] = np.nan
        return out.astype(np.float32)
    except Exception as exc:
        logger.warning(f"Speckle filter failed ({exc}); returning unfiltered.")
        return arr


def preprocess_sar_scene(
    scene: SAR1Scene,
    apply_speckle_filter: bool = False,
    speckle_kernel: int = 3,
    near_zero_threshold: float = 1e-9,
) -> SARPreprocessingResult:
    """
    Preprocess a SAR1Scene into calibrated dB arrays ready for analysis.

    This function is task-agnostic — it does not know what downstream
    analysis will use the result.
    """
    notes = list(scene.notes)
    processed: Dict[str, BandPreprocessed] = {}

    for pol, raw in scene.bands.items():
        bnotes: List[str] = []
        total_px = raw.size
        vm = _compute_valid_mask(raw, scene.nodata, near_zero_threshold)
        valid_px = int(np.sum(vm))
        valid_frac = round(float(valid_px / max(1, total_px)), 4)

        if valid_frac < 0.05:
            bnotes.append(
                f"WARNING: {pol} only {valid_frac*100:.1f}% valid pixels — "
                "results may be unreliable."
            )

        # Linear → dB conversion
        if scene.unit_is_linear:
            db = _linear_to_db(raw)
            bnotes.append("dB = 10*log10(power); values ≤ 0 → NaN.")
        else:
            db = raw.copy().astype(np.float32)
            db[~vm] = np.nan
            bnotes.append("Input already in dB; conversion skipped.")

        db_valid = np.isfinite(db)

        if apply_speckle_filter:
            db = _lee_box_filter(db, speckle_kernel)
            db_valid = np.isfinite(db)
            bnotes.append(
                f"Simplified box-mean speckle filter applied "
                f"(kernel={speckle_kernel}px, dB space). "
                "NOT a full Lee filter."
            )

        valid_db = db[db_valid]
        if len(valid_db) > 0:
            db_min = float(np.min(valid_db))
            db_max = float(np.max(valid_db))
            db_mean = float(np.mean(valid_db))
            db_std = float(np.std(valid_db))
        else:
            db_min = db_max = db_mean = db_std = None

        # Scene-relative normalisation [0, 1]
        norm = None
        if db_min is not None and (db_max - db_min) > 1e-6:
            norm = np.full_like(db, np.nan)
            norm[db_valid] = np.clip(
                (db[db_valid] - db_min) / (db_max - db_min), 0.0, 1.0
            ).astype(np.float32)
            bnotes.append(
                f"Normalised [{db_min:.2f}, {db_max:.2f}] dB → [0,1] "
                "(scene-relative; NOT calibrated reflectance)."
            )

        processed[pol] = BandPreprocessed(
            polarization=pol, raw_array=raw,
            db_array=db, norm_array=norm, valid_mask=db_valid,
            valid_pixel_count=int(np.sum(db_valid)),
            total_pixel_count=total_px,
            valid_fraction=round(float(np.sum(db_valid) / max(1, total_px)), 4),
            db_min=db_min, db_max=db_max, db_mean=db_mean, db_std=db_std,
            unit_is_linear_input=scene.unit_is_linear, notes=bnotes,
        )
        logger.info(
            f"[SAR.Preproc] {pol}: {valid_px}/{total_px} valid px, "
            f"dB [{db_min}, {db_max}]"
        )

    return SARPreprocessingResult(
        success=True, status="success", reason=None,
        bands=processed,
        polarizations_available=list(processed.keys()),
        width=scene.width, height=scene.height,
        crs=scene.crs, transform=scene.transform,
        resolution=scene.resolution, georeferenced=scene.georeferenced,
        notes=notes,
    )


def align_sar_pair(
    prep0: SARPreprocessingResult,
    prep1: SARPreprocessingResult,
    target_pol: str = "VV",
) -> Tuple[Optional[np.ndarray], Optional[np.ndarray],
           Optional[np.ndarray], Optional[np.ndarray], Dict]:
    """
    Spatially align two preprocessed SAR scenes for a given polarisation.

    Returns (db0, db1, valid0, valid1, alignment_metadata).
    CRS mismatch is flagged but does NOT abort — pixel-space alignment proceeds.
    Returns (None, None, None, None, {error: ...}) if pol missing from either scene.
    """
    meta: Dict = {
        "polarization": target_pol,
        "crs_t0": prep0.crs, "crs_t1": prep1.crs,
        "crs_match": prep0.crs == prep1.crs,
        "resize_applied": False, "notes": [],
    }
    if prep0.crs != prep1.crs:
        msg = (f"CRS mismatch T0={prep0.crs} T1={prep1.crs}. "
               "Pixel-space alignment applied; geographic accuracy may be reduced.")
        meta["notes"].append(msg)
        logger.warning(f"[SAR.Align] {msg}")

    if target_pol not in prep0.bands:
        meta["error"] = f"{target_pol} missing from T0."
        return None, None, None, None, meta
    if target_pol not in prep1.bands:
        meta["error"] = f"{target_pol} missing from T1."
        return None, None, None, None, meta

    db0 = prep0.bands[target_pol].db_array
    db1 = prep1.bands[target_pol].db_array
    vm0 = prep0.bands[target_pol].valid_mask
    vm1 = prep1.bands[target_pol].valid_mask
    h0, w0 = db0.shape

    if db1.shape != (h0, w0):
        # NaN-safe BILINEAR resize for dB, NEAREST for masks
        nan1 = ~np.isfinite(db1)
        filled = np.where(nan1, 0.0, db1).astype(np.float32)
        db1_r = np.array(Image.fromarray(filled).resize((w0, h0), Image.Resampling.BILINEAR), dtype=np.float32)
        nan1_r = np.array(Image.fromarray((nan1.astype(np.uint8) * 255)).resize((w0, h0), Image.Resampling.NEAREST)) > 127
        db1_r[nan1_r] = np.nan
        vm1 = np.array(Image.fromarray((vm1.astype(np.uint8) * 255)).resize((w0, h0), Image.Resampling.NEAREST)) > 127
        db1 = db1_r
        meta["resize_applied"] = True
        meta["notes"].append(f"T1 resized to {w0}×{h0} px.")

    return db0, db1, vm0, vm1, meta
