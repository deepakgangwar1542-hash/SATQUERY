"""
Image and Temporal Pair Validation Layer — SatQuery AI.

Performs strict, honest inspection of input imagery without trusting filenames.
Determines dimensions, band/channel counts, data types, geospatial metadata (CRS,
transform, resolution, nodata), and checks bi-temporal compatibility before any
inference or downstream analysis occurs.
"""
from __future__ import annotations
import io
from typing import Optional, List, Dict, Any, Tuple
from pydantic import BaseModel, Field
import numpy as np
from PIL import Image

try:
    import rasterio
    from rasterio.io import MemoryFile
    RASTERIO_AVAILABLE = True
except ImportError:
    RASTERIO_AVAILABLE = False

from backend.services.data_capability import clean_b64


class ImageValidationResult(BaseModel):
    valid: bool
    format: str = "unknown"
    width: int = 0
    height: int = 0
    channels: int = 0
    dtype: str = "unknown"
    georeferenced: bool = False
    crs: Optional[str] = None
    transform: Optional[List[float]] = None
    bounds: Optional[List[float]] = None
    resolution: Optional[List[float]] = None
    nodata: Optional[float] = None
    error: Optional[str] = None
    notes: List[str] = Field(default_factory=list)


class TemporalValidationResult(BaseModel):
    compatible: bool
    status: str = "success"  # "success" | "insufficient_data" | "incompatible_pair" | "corrupt_data"
    reason: Optional[str] = None
    image_t0: Optional[ImageValidationResult] = None
    image_t1: Optional[ImageValidationResult] = None
    notes: List[str] = Field(default_factory=list)


def validate_single_image(
    raw_bytes: bytes | None = None,
    b64_str: str | None = None,
) -> ImageValidationResult:
    """
    Validate a single image payload without trusting the filename.
    Inspects raw bytes to extract format, dimensions, channels, data type,
    and geospatial metadata (CRS, transform, resolution, nodata).
    """
    if raw_bytes is None and b64_str is not None:
        raw_bytes, _ = clean_b64(b64_str)

    if not raw_bytes:
        return ImageValidationResult(
            valid=False,
            error="Empty or missing image payload",
            notes=["No image bytes provided."],
        )

    # 1. Attempt geospatial raster inspection via rasterio
    if RASTERIO_AVAILABLE:
        try:
            import warnings
            with warnings.catch_warnings():
                warnings.simplefilter("ignore")
                with MemoryFile(raw_bytes) as memfile:
                    with memfile.open() as src:
                        driver = src.driver or "GTiff"
                        count = src.count
                        width = src.width
                        height = src.height
                        dtype_str = str(src.dtypes[0]) if src.dtypes else "unknown"
                        crs_str = str(src.crs) if src.crs else None
                        georeferenced = crs_str is not None
                        transform = list(src.transform)[:6] if src.transform else None
                        bounds = [src.bounds.left, src.bounds.bottom, src.bounds.right, src.bounds.top] if src.bounds else None
                        res = list(src.res) if src.res else None
                        nodata = float(src.nodata) if src.nodata is not None else None

                        return ImageValidationResult(
                            valid=True,
                            format=driver,
                            width=width,
                            height=height,
                            channels=count,
                            dtype=dtype_str,
                            georeferenced=georeferenced,
                            crs=crs_str,
                            transform=transform,
                            bounds=bounds,
                            resolution=res,
                            nodata=nodata,
                            notes=[
                                f"Raster format: {driver} ({count} bands, {width}x{height} px, {dtype_str}).",
                                f"CRS: {crs_str or 'None (pixel space)'}."
                            ],
                        )
        except Exception:
            # Fall back to standard image inspection
            pass

    # 2. Standard image inspection via PIL (PNG, JPEG, WEBP, etc.)
    try:
        with Image.open(io.BytesIO(raw_bytes)) as img:
            w, h = img.size
            fmt = (img.format or "image").lower()
            mode = img.mode
            channels = len(img.getbands())

            # Determine bit depth from mode
            if mode in ("RGB", "YCbCr"):
                dtype_str = "uint8"
                channels = 3
            elif mode in ("RGBA", "CMYK"):
                dtype_str = "uint8"
                channels = 4
            elif mode in ("L", "P"):
                dtype_str = "uint8"
                channels = 1
            elif mode in ("I", "I;16"):
                dtype_str = "int32"
                channels = 1
            elif mode == "F":
                dtype_str = "float32"
                channels = 1
            else:
                dtype_str = "uint8"

            return ImageValidationResult(
                valid=True,
                format=fmt,
                width=w,
                height=h,
                channels=channels,
                dtype=dtype_str,
                georeferenced=False,
                crs=None,
                transform=None,
                resolution=None,
                nodata=None,
                notes=[
                    f"Standard image format: {fmt.upper()} ({mode}, {channels} channels, {w}x{h} px, {dtype_str}).",
                    "Geospatial metadata: None (image is in pixel space)."
                ],
            )
    except Exception as exc:
        return ImageValidationResult(
            valid=False,
            format="unknown",
            error=f"Failed to decode image payload: {str(exc)}",
            notes=[f"Image decode failed: {str(exc)}"],
        )


def validate_temporal_pair(
    t0_payload: str | bytes | None,
    t1_payload: str | bytes | None,
) -> TemporalValidationResult:
    """
    Validates a bi-temporal image pair (T0 and T1).
    Checks that both files exist, both decode cleanly, and verifies
    channel and CRS compatibility.
    """
    notes: List[str] = []

    # Check 1: Existence of both payloads
    if not t0_payload or not t1_payload:
        missing = []
        if not t0_payload:
            missing.append("T0 (pre-event)")
        if not t1_payload:
            missing.append("T1 (post-event)")
        return TemporalValidationResult(
            compatible=False,
            status="insufficient_data",
            reason=f"Missing temporal input: {', '.join(missing)}. Bi-temporal change detection requires both T0 and T1 images.",
            notes=[f"Temporal query submitted with missing image(s): {', '.join(missing)}."],
        )

    t0_bytes = t0_payload if isinstance(t0_payload, bytes) else clean_b64(t0_payload)[0]
    t1_bytes = t1_payload if isinstance(t1_payload, bytes) else clean_b64(t1_payload)[0]

    val0 = validate_single_image(raw_bytes=t0_bytes)
    val1 = validate_single_image(raw_bytes=t1_bytes)

    # Check 2: Decodability
    if not val0.valid or not val1.valid:
        errs = []
        if not val0.valid:
            errs.append(f"T0: {val0.error}")
        if not val1.valid:
            errs.append(f"T1: {val1.error}")
        return TemporalValidationResult(
            compatible=False,
            status="corrupt_data",
            reason=f"Corrupt or invalid image payload: {'; '.join(errs)}",
            image_t0=val0,
            image_t1=val1,
            notes=errs,
        )

    # Check 3: CRS compatibility if both are georeferenced
    if val0.georeferenced and val1.georeferenced:
        if val0.crs and val1.crs and val0.crs != val1.crs:
            notes.append(f"CRS mismatch detected: T0 ({val0.crs}) vs T1 ({val1.crs}). Reprojection required during alignment.")

    # Check 4: Channel count compatibility
    if val0.channels != val1.channels:
        notes.append(f"Channel count mismatch: T0 has {val0.channels} channels, T1 has {val1.channels} channels.")

    # Check 5: Dimension check
    if (val0.width, val0.height) != (val1.width, val1.height):
        notes.append(f"Dimension difference: T0 is {val0.width}x{val0.height} px, T1 is {val1.width}x{val1.height} px. Resampling/alignment required.")

    return TemporalValidationResult(
        compatible=True,
        status="success",
        image_t0=val0,
        image_t1=val1,
        notes=notes,
    )
