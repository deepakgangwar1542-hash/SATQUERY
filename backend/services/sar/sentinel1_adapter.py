"""
Sentinel-1 Adapter — SatQuery AI SAR Package.

Loads a Sentinel-1 C-band GRD raster from a base64-encoded payload and extracts
VV and/or VH (or HH/HV) polarisation arrays using rasterio.

This module is TASK-AGNOSTIC. It provides raw SAR data to any downstream
analysis: change detection, vegetation SAR supporting evidence, urban mapping,
or flood analysis. The adapter itself has no knowledge of which task is running.

Detection strategy:
  1. Pre-check via DataCapability (must be data_type == "sentinel1")
  2. Open raster with rasterio MemoryFile
  3. Read band polarisation from tags (POLARISATION / POLARIZATION / POL /
     BAND_NAME) or descriptions
  4. Fallback to positional mapping only when DataCapability already confirmed
     this is a Sentinel-1 raster (count ∈ {1, 2})
  5. Detect whether values are linear power or dB (median heuristic)

Do NOT infer sensor type from filename or MIME type.
Do NOT classify RGB/JPEG as SAR.
Do NOT classify Sentinel-2 as Sentinel-1.

Limitations:
  - Requires rasterio >= 1.3.0
  - GeoTIFF only (most common Sentinel-1 GRD distribution format)
  - SAFE-format archives are not supported (require SNAP/snappy)
  - SLC (Single Look Complex) not supported; GRD is expected
"""
from __future__ import annotations
import base64
import logging
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple

import numpy as np

from backend.services.data_capability import clean_b64, inspect_data_capability

logger = logging.getLogger("SatQuery.SAR.Adapter")

SUPPORTED_POLARIZATIONS: List[str] = ["VV", "VH", "HH", "HV"]


class SAR1LoadError(RuntimeError):
    """Raised when a raster cannot be loaded as Sentinel-1 SAR data."""


@dataclass
class SAR1Scene:
    """
    Represents a successfully loaded Sentinel-1 scene (one temporal acquisition).

    All arrays are float32. Raw values are in original linear power units
    unless unit_is_linear is False (dB already detected from median heuristic).

    Downstream consumers must run sar_preprocessing before using raw arrays.
    """
    bands: Dict[str, np.ndarray]      # {"VV": arr, "VH": arr, …}
    polarizations: List[str]
    width: int
    height: int
    crs: Optional[str]
    transform: Optional[List[float]]
    bounds: Optional[List[float]]
    resolution: Optional[List[float]]
    nodata: Optional[float]
    georeferenced: bool
    unit_is_linear: bool = True
    notes: List[str] = field(default_factory=list)

    def to_metadata_dict(self) -> Dict:
        return {
            "polarizations": self.polarizations,
            "width": self.width,
            "height": self.height,
            "crs": self.crs,
            "transform": self.transform,
            "bounds": self.bounds,
            "resolution": self.resolution,
            "nodata": self.nodata,
            "georeferenced": self.georeferenced,
            "unit_is_linear": self.unit_is_linear,
            "notes": self.notes,
        }


def load_sar_scene(b64_str: str | None) -> SAR1Scene:
    """
    Load a Sentinel-1 GRD raster from a base64-encoded payload.

    Steps:
      1. Check DataCapability — must be data_type == "sentinel1"
      2. Decode base64 → raw bytes
      3. Open with rasterio MemoryFile
      4. Map bands to polarisations via tags or positional fallback
      5. Return SAR1Scene with raw float32 arrays

    Raises SAR1LoadError with an honest message on any failure.
    """
    # ── 1. Capability pre-check ───────────────────────────────────────────────
    cap = inspect_data_capability(b64_str)
    if cap.data_type != "sentinel1":
        raise SAR1LoadError(
            f"Supplied raster is not Sentinel-1 SAR data. "
            f"Detected: '{cap.data_type}' ({cap.sensor}). "
            f"SAR analysis requires a genuine Sentinel-1 GRD GeoTIFF with "
            f"VV/VH polarisation bands."
        )

    # ── 2. Decode ─────────────────────────────────────────────────────────────
    raw_bytes, _ = clean_b64(b64_str)
    if not raw_bytes:
        raise SAR1LoadError("Base64 decoding produced empty bytes.")

    # ── 3. Open rasterio ──────────────────────────────────────────────────────
    try:
        import rasterio
        from rasterio.io import MemoryFile
    except ImportError:
        raise SAR1LoadError("rasterio is not installed (require >= 1.3.0).")

    notes: List[str] = []
    try:
        import warnings
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            with MemoryFile(raw_bytes) as memfile:
                with memfile.open() as src:
                    count = src.count
                    width, height = src.width, src.height
                    crs = str(src.crs) if src.crs else None
                    georef = crs is not None
                    transform = list(src.transform)[:6] if src.transform else None
                    bounds = (
                        [src.bounds.left, src.bounds.bottom,
                         src.bounds.right, src.bounds.top]
                        if src.bounds else None
                    )
                    resolution = list(src.res) if src.res else None
                    nodata = float(src.nodata) if src.nodata is not None else None

                    # ── 4. Map bands → polarisations ──────────────────────────
                    bands: Dict[str, np.ndarray] = {}
                    detected_pols: List[str] = []

                    for bi in range(1, count + 1):
                        tags = src.tags(bi)
                        desc = (
                            src.descriptions[bi - 1]
                            if src.descriptions and len(src.descriptions) >= bi
                            else None
                        ) or ""

                        pol_raw = (
                            tags.get("POLARISATION") or tags.get("POLARIZATION")
                            or tags.get("POL") or desc
                        ).upper().strip()

                        matched_pol: Optional[str] = None
                        for p in SUPPORTED_POLARIZATIONS:
                            if pol_raw == p or pol_raw.startswith(p):
                                matched_pol = p
                                break

                        # Positional fallback (only if DataCapability confirmed SAR)
                        if matched_pol is None:
                            if cap.polarizations and bi - 1 < len(cap.polarizations):
                                matched_pol = cap.polarizations[bi - 1]
                                notes.append(
                                    f"Band {bi}: tag '{pol_raw}' unrecognised; "
                                    f"positional mapping from DataCapability: {matched_pol}."
                                )
                            elif count == 1:
                                matched_pol = "VV"
                                notes.append("Single-band SAR: assumed VV (positional).")
                            elif count == 2 and bi == 1:
                                matched_pol = "VV"
                                notes.append("2-band SAR band 1: assumed VV.")
                            elif count == 2 and bi == 2:
                                matched_pol = "VH"
                                notes.append("2-band SAR band 2: assumed VH.")
                            else:
                                matched_pol = f"POL_{bi}"
                                notes.append(f"Band {bi}: unknown pol → '{matched_pol}'.")

                        arr = src.read(bi).astype(np.float64)
                        if nodata is not None:
                            arr[arr == nodata] = np.nan
                        arr[~np.isfinite(arr)] = np.nan
                        bands[matched_pol] = arr.astype(np.float32)
                        if matched_pol not in detected_pols:
                            detected_pols.append(matched_pol)

                    if not detected_pols:
                        raise SAR1LoadError(
                            "No SAR polarisations could be mapped from raster bands."
                        )

                    # ── 5. Detect linear vs dB ────────────────────────────────
                    sample = bands[detected_pols[0]]
                    valid_vals = sample[np.isfinite(sample)]
                    unit_is_linear = True
                    if len(valid_vals) > 0:
                        med = float(np.median(valid_vals))
                        if med < 0:
                            unit_is_linear = False
                            notes.append(
                                f"Detected dB-scale (median={med:.2f}). "
                                "Conversion will be skipped in preprocessing."
                            )
                        else:
                            notes.append(
                                f"Detected linear-power (median={med:.6f}). "
                                "dB conversion will be applied in preprocessing."
                            )

                    notes.insert(0,
                        f"Sentinel-1 raster loaded: {count} band(s), "
                        f"{width}×{height} px, pols: {detected_pols}, "
                        f"CRS: {crs or 'none'}."
                    )
                    return SAR1Scene(
                        bands=bands, polarizations=detected_pols,
                        width=width, height=height,
                        crs=crs, transform=transform, bounds=bounds,
                        resolution=resolution, nodata=nodata,
                        georeferenced=georef, unit_is_linear=unit_is_linear,
                        notes=notes,
                    )
    except SAR1LoadError:
        raise
    except Exception as exc:
        raise SAR1LoadError(
            f"rasterio failed to open SAR raster: {type(exc).__name__}: {exc}"
        ) from exc
