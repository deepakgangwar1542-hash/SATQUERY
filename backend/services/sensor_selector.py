"""
Sensor Selector — Chooses and validates sensor modality based on actual input data
and EarthQuerySpec requirements.

Ensures the selected sensor reflects the genuine data capability of uploaded rasters,
preventing false claims of Sentinel-1 SAR or Sentinel-2 MSI when only standard
RGB optical imagery is available.
"""
from __future__ import annotations
from typing import Optional
import numpy as np
from backend.schemas.response import EarthQuerySpec, SensorSelection
from backend.services.data_capability import inspect_data_capability, clean_b64
from backend.services.cv_analyzer import decode_image_b64


def _estimate_cloud_cover_from_pixels(image_b64: str | None) -> Optional[float]:
    """
    Estimate cloud cover percentage from actual optical pixel saturation.
    Clouds typically exhibit high reflectance across all optical bands (R, G, B > 225)
    with low color saturation.
    """
    arr = decode_image_b64(image_b64)
    if arr is None or arr.size == 0:
        return None
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    # Saturated white cloud mask
    is_cloud = (r > 225) & (g > 225) & (b > 225) & (np.abs(r - g) < 15) & (np.abs(g - b) < 15)
    cloud_pct = round(float(np.sum(is_cloud) / arr.shape[0] / arr.shape[1] * 100.0), 1)
    return min(100.0, cloud_pct)


def select_sensor(
    spec: EarthQuerySpec,
    image_b64: str | None = None,
    image2_b64: str | None = None,
    question: str | None = None,
) -> SensorSelection:
    """
    Determine which sensor modality is appropriate and truth-tested against
    the actual uploaded data.
    """
    hint = spec.sensor_hint or "any"
    task = spec.task_type
    q_parts = [spec.intent] + spec.extracted_entities
    if question:
        q_parts.append(question)
    q = " ".join(q_parts).lower()

    cap1 = inspect_data_capability(image_b64)
    cloud_cover = _estimate_cloud_cover_from_pixels(image_b64)

    # 1. No image provided
    if cap1.data_type == "none":
        return SensorSelection(
            selected_sensor="Unspecified / No Imagery Supplied",
            rationale="No satellite imagery provided in request. Sensor cannot be verified without input raster data.",
            cloud_cover_estimate=None,
            fallback_considered=False,
        )

    # 2. Query asks for NDVI/multispectral on RGB
    requires_spectral = any(w in q for w in ("ndvi", "ndwi", "nbr", "spectral", "multispectral", "red-edge", "nir"))
    if requires_spectral and cap1.data_type == "rgb":
        return SensorSelection(
            selected_sensor="Unsupported for Multispectral NDVI (RGB Optical Only)",
            rationale=(
                "Query requests quantitative spectral index calculation (NDVI/NDWI), but supplied input is standard "
                "3-channel RGB imagery. Near-Infrared (NIR) and Red spectral bands (e.g. Sentinel-2 B08/B04) "
                "are absent. Analysis is constrained to RGB visual proxies."
            ),
            cloud_cover_estimate=cloud_cover,
            fallback_considered=True,
        )

    # 3. Sentinel-2 Multispectral GeoTIFF detected
    if cap1.data_type == "sentinel2":
        return SensorSelection(
            selected_sensor="Sentinel-2 MSI (Multispectral Optical)",
            rationale=(
                f"Verified authentic Sentinel-2 multispectral GeoTIFF ({cap1.width}x{cap1.height} px, "
                f"{cap1.band_count} bands: {', '.join(cap1.available_bands)}). CRS: {cap1.crs or 'Unprojected'}. "
                f"Fully compatible with calibrated NDVI/NDWI spectral processing."
            ),
            cloud_cover_estimate=cloud_cover,
            fallback_considered=False,
        )

    # 4. Joint SAR-Optical requested
    if hint == "both" or task == "sar_optical_joint":
        return SensorSelection(
            selected_sensor="Optical Provided (SAR Modality Absent)",
            rationale=(
                "Query specifies joint Optical + SAR fusion. Optical imagery was provided, but authentic "
                "Sentinel-1 C-band SAR backscatter data (VV/VH polarizations) was not supplied. "
                "Results rely on optical analysis with SAR structural cross-validation flagged as absent."
            ),
            cloud_cover_estimate=cloud_cover,
            fallback_considered=True,
        )

    # 5. SAR requested explicitly
    if hint == "sar":
        return SensorSelection(
            selected_sensor="Optical Provided (SAR Sentinel-1 Absent)",
            rationale=(
                "Query specifies radar/SAR sensing (Sentinel-1), but supplied file is an optical image. "
                "Radar backscatter analysis cannot be performed without authentic SAR SLC/GRD data."
            ),
            cloud_cover_estimate=cloud_cover,
            fallback_considered=True,
        )

    # 6. Bi-temporal change detection
    if task in ("change_detection", "change_vqa"):
        has_two = image2_b64 is not None
        cloud_info = f"Estimated cloud cover: {cloud_cover}%." if cloud_cover is not None else ""
        return SensorSelection(
            selected_sensor="Optical — Bi-temporal Comparison" if has_two else "Optical — Single Image (Bi-temporal Limited)",
            rationale=(
                f"Bi-temporal task '{spec.intent}' evaluated on optical imagery. "
                + ("Both pre and post-event images available. " if has_two else "Only one image provided — temporal baseline is missing. ")
                + cloud_info
            ),
            cloud_cover_estimate=cloud_cover,
            fallback_considered=not has_two,
        )

    # 7. Default optical RGB
    return SensorSelection(
        selected_sensor="Optical RGB Sensor",
        rationale=(
            f"Optical imagery verified ({cap1.width}x{cap1.height} px). "
            f"Suitable for visual scene classification, spatial grounding, and qualitative land-cover analysis. "
            + (f"Cloud cover estimated at {cloud_cover}% from pixel reflectance." if cloud_cover is not None else "")
        ),
        cloud_cover_estimate=cloud_cover,
        fallback_considered=False,
    )
