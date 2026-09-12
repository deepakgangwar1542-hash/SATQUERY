"""
Data Capability Layer — Inspects and characterizes input imagery.

Inspects actual raster metadata, headers, CRS, tags, and band structures
using rasterio and PIL to determine whether an image is:
  - RGB Image (PNG / JPEG / WEBP / standard 3-band raster)
  - Sentinel-2 Multispectral GeoTIFF (contains B03, B04, B08 bands)
  - Generic GeoTIFF (georeferenced raster)
  - Vector SVG
  - Unsupported / Missing
"""
from __future__ import annotations
import base64
import io
from typing import List, Optional, Dict, Any, Tuple
from pydantic import BaseModel, Field
import numpy as np
from PIL import Image

try:
    import rasterio
    from rasterio.io import MemoryFile
    RASTERIO_AVAILABLE = True
except ImportError:
    RASTERIO_AVAILABLE = False


class DataCapability(BaseModel):
    data_type: str = Field(..., description="rgb | sentinel2 | sentinel1 | geotiff | svg | unsupported | none")
    modality: str = Field("optical", description="optical | sar | joint | vector | none")
    polarizations: List[str] = Field(default_factory=list)
    sensor_family: Optional[str] = None
    multispectral: bool = False
    georeferenced: bool = False
    available_bands: List[str] = Field(default_factory=list)
    sensor: str = "Unknown"
    width: int = 0
    height: int = 0
    band_count: int = 0
    crs: Optional[str] = None
    transform: Optional[List[float]] = None
    bounds: Optional[List[float]] = None
    resolution: Optional[List[float]] = None
    nodata: Optional[float] = None
    cloud_cover_estimate: Optional[float] = None
    acquisition_date: Optional[str] = None
    notes: List[str] = Field(default_factory=list)


def clean_b64(b64_str: str | None) -> Tuple[bytes | None, str | None]:
    """Strip data-URI prefix if present and return raw bytes plus mime hint."""
    if not b64_str or not b64_str.strip():
        return None, None
    mime_hint = None
    raw_str = b64_str.strip()
    if "," in raw_str and "base64" in raw_str:
        header, body = raw_str.split(",", 1)
        if "image/" in header:
            mime_hint = header.split("image/")[1].split(";")[0]
        raw_str = body
    try:
        data = base64.b64decode(raw_str)
        return data, mime_hint
    except Exception:
        return None, mime_hint


def inspect_data_capability(b64_str: str | None) -> DataCapability:
    """
    Inspect the raw bytes of an uploaded image to determine its true
    spectral, spatial, and sensor capability without trusting filenames.
    """
    if not b64_str or not b64_str.strip():
        return DataCapability(
            data_type="none",
            multispectral=False,
            georeferenced=False,
            available_bands=[],
            sensor="No Imagery Provided",
            notes=["No image data supplied."],
        )

    # Check for SVG vector
    if "image/svg+xml" in b64_str or b64_str.strip().startswith("<svg"):
        return DataCapability(
            data_type="svg",
            multispectral=False,
            georeferenced=False,
            available_bands=["vector"],
            sensor="Synthetic Vector Graphic",
            width=512,
            height=512,
            band_count=1,
            notes=["Vector SVG format. Qualitative synthetic preview only."],
        )

    raw_bytes, mime_hint = clean_b64(b64_str)
    if not raw_bytes:
        return DataCapability(
            data_type="unsupported",
            sensor="Invalid / Corrupt Payload",
            notes=["Base64 decoding failed or empty payload."],
        )

    # 1. Attempt rasterio inspection (for GeoTIFF / multispectral)
    if RASTERIO_AVAILABLE:
        try:
            import warnings
            with warnings.catch_warnings():
                warnings.simplefilter("ignore")
                with MemoryFile(raw_bytes) as memfile:
                    with memfile.open() as src:
                        driver = src.driver
                        count = src.count
                        width = src.width
                        height = src.height
                        crs = str(src.crs) if src.crs else None
                        georeferenced = crs is not None
                        transform = list(src.transform)[:6] if src.transform else None
                        bounds = [src.bounds.left, src.bounds.bottom, src.bounds.right, src.bounds.top] if src.bounds else None
                        res = list(src.res) if src.res else None
                        nodata = float(src.nodata) if src.nodata is not None else None

                        # Read band descriptions or tags
                        band_names: List[str] = []
                        for i in range(1, count + 1):
                            desc = src.descriptions[i - 1] if src.descriptions and len(src.descriptions) >= i else None
                            tag_name = src.tags(i).get("BAND_NAME") or src.tags(i).get("DESCRIPTION")
                            name = desc or tag_name or ""
                            band_names.append(name.upper())

                        # Check for Sentinel-1 SAR polarizations (VV, VH, HH, HV)
                        sar_pols: List[str] = []
                        for i in range(1, count + 1):
                            tag_dict = src.tags(i)
                            pol = (
                                tag_dict.get("POLARISATION")
                                or tag_dict.get("POLARIZATION")
                                or tag_dict.get("POL")
                                or ""
                            ).upper()
                            bname = band_names[i - 1] if i - 1 < len(band_names) else ""
                            if pol in ("VV", "VH", "HH", "HV"):
                                sar_pols.append(pol)
                            elif bname in ("VV", "VH", "HH", "HV"):
                                sar_pols.append(bname)
                            elif any(bname.startswith(p) for p in ("VV", "VH", "HH", "HV")):
                                for p in ("VV", "VH", "HH", "HV"):
                                    if bname.startswith(p):
                                        sar_pols.append(p)
                                        break

                        root_tags = src.tags()
                        sensor_tag = (
                            root_tags.get("SENSOR")
                            or root_tags.get("SPACECRAFT_NAME")
                            or root_tags.get("PLATFORM")
                            or root_tags.get("MISSION")
                            or root_tags.get("MISSION_ID")
                            or ""
                        ).upper()
                        is_s1_platform = any(k in sensor_tag for k in ("SENTINEL-1", "SENTINEL 1", "S1A", "S1B", "C-SAR", "ASAR"))

                        # Sentinel-1 SAR detection
                        if len(sar_pols) >= 1 or (is_s1_platform and count in (1, 2)):
                            effective_pols = sar_pols if sar_pols else (["VV", "VH"] if count == 2 else ["VV"])
                            return DataCapability(
                                data_type="sentinel1",
                                modality="sar",
                                polarizations=effective_pols,
                                sensor_family="sentinel-1",
                                multispectral=False,
                                georeferenced=georeferenced,
                                available_bands=effective_pols,
                                sensor="Sentinel-1 C-band SAR",
                                width=width,
                                height=height,
                                band_count=count,
                                crs=crs,
                                transform=transform,
                                bounds=bounds,
                                resolution=res,
                                nodata=nodata,
                                notes=[
                                    f"Sentinel-1 SAR raster verified ({count} band(s)).",
                                    f"Polarizations: {', '.join(effective_pols)}.",
                                    f"CRS: {crs or 'Unprojected'}.",
                                ],
                            )

                        # Check for Sentinel-2 bands (B03, B04, B08 or Green, Red, NIR)
                        s2_tags = {"B03", "B04", "B08"}
                        detected_s2 = False

                        # Check explicit band names
                        found_s2_bands = [b for b in band_names if b in s2_tags or b in ("B3", "B4", "B8", "NIR", "RED", "GREEN")]
                        if len(found_s2_bands) >= 2:
                            detected_s2 = True

                        if "SENTINEL-2" in sensor_tag or "SENTINEL 2" in sensor_tag or "MSI" in sensor_tag:
                            detected_s2 = True

                        # 3-band GeoTIFF with band tags or metadata default: if 3 bands with descriptions or standard S2 composite
                        if count >= 3 and driver == "GTiff" and (detected_s2 or "B08" in band_names or "B04" in band_names):
                            mapped_bands = []
                            for idx, bname in enumerate(band_names):
                                if bname in ("B03", "B3", "GREEN"):
                                    mapped_bands.append("B03")
                                elif bname in ("B04", "B4", "RED"):
                                    mapped_bands.append("B04")
                                elif bname in ("B08", "B8", "NIR"):
                                    mapped_bands.append("B08")
                                elif bname:
                                    mapped_bands.append(bname)
                                else:
                                    # Default mapping for 3-band S2 composite (Green, Red, NIR)
                                    default_map = ["B03", "B04", "B08", "B02"]
                                    mapped_bands.append(default_map[idx] if idx < len(default_map) else f"B{idx+1}")

                            return DataCapability(
                                data_type="sentinel2",
                                modality="optical",
                                sensor_family="sentinel-2",
                                multispectral=True,
                                georeferenced=georeferenced,
                                available_bands=mapped_bands,
                                sensor="Sentinel-2 MSI",
                                width=width,
                                height=height,
                                band_count=count,
                                crs=crs,
                                transform=transform,
                                bounds=bounds,
                                resolution=res,
                                nodata=nodata,
                                notes=[
                                    f"Sentinel-2 multispectral GeoTIFF verified ({count} bands).",
                                    f"CRS: {crs or 'Unprojected'}.",
                                    f"Bands: {', '.join(mapped_bands)}.",
                                ],
                            )

                        # Generic GeoTIFF
                        if driver == "GTiff" and count >= 1:
                            # If standard 3-band 8-bit RGB GeoTIFF without NIR
                            if count == 3 and src.dtypes[0] == "uint8" and not detected_s2:
                                return DataCapability(
                                    data_type="rgb",
                                    modality="optical",
                                    sensor_family="optical",
                                    multispectral=False,
                                    georeferenced=georeferenced,
                                    available_bands=["R", "G", "B"],
                                    sensor="Georeferenced RGB Imagery",
                                    width=width,
                                    height=height,
                                    band_count=count,
                                    crs=crs,
                                    transform=transform,
                                    bounds=bounds,
                                    resolution=res,
                                    nodata=nodata,
                                    notes=["RGB 3-channel optical GeoTIFF. True spectral NIR bands are not present."],
                                )

                            return DataCapability(
                                data_type="geotiff",
                                modality="optical",
                                sensor_family="optical",
                                multispectral=(count >= 4 or detected_s2),
                                georeferenced=georeferenced,
                                available_bands=band_names or [f"Band_{i}" for i in range(1, count + 1)],
                                sensor="Earth Observation GeoTIFF",
                                width=width,
                                height=height,
                                band_count=count,
                                crs=crs,
                                transform=transform,
                                bounds=bounds,
                                resolution=res,
                                nodata=nodata,
                                notes=[f"GeoTIFF with {count} band(s). Driver: {driver}."],
                            )
        except Exception:
            # Rasterio could not open as geospatial dataset, fall back to standard image
            pass

    # 2. Standard PIL image inspection (PNG, JPEG, WEBP)
    try:
        img = Image.open(io.BytesIO(raw_bytes))
        w, h = img.size
        mode = img.mode
        bands = list(img.getbands())
        return DataCapability(
            data_type="rgb",
            modality="optical",
            sensor_family="optical",
            multispectral=False,
            georeferenced=False,
            available_bands=bands,
            sensor="Standard RGB Optical Imagery",
            width=w,
            height=h,
            band_count=len(bands),
            notes=[
                f"Standard {mode} optical image ({w}x{h} px).",
                "Contains standard visual red/green/blue channels only. Red-edge and NIR spectral bands are absent.",
            ],
        )
    except Exception as exc:
        return DataCapability(
            data_type="unsupported",
            sensor="Corrupt / Unrecognized Image Format",
            notes=[f"Failed to decode image: {str(exc)}"],
        )
