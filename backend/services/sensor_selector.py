"""
Sensor Selector - Chooses and validates sensor modality based on actual input data
and EarthQuerySpec requirements.

This selector is TASK-FIRST and CAPABILITY-AWARE:
  1. The task drives sensor requirements
  2. Only sensors actually present in the data are selected
  3. Honest fallbacks when data does not match task requirements
  4. Cloud-aware: high cloud cover promotes SAR when SAR is available

Task-to-sensor routing:
  vegetation_change  -> Optical primary (S2/NDVI); SAR NOT primary
  flood_impact       -> SAR+optical preferred; SAR if cloudy; optical fallback
  urban_change       -> Optical primary; SAR supporting
  sar_change         -> SAR required; warn if optical only
  change_detection   -> Optical primary; SAR supporting if available
  fire_analysis      -> Optical (NBR) primary; SAR supporting
  object_extraction  -> Optical preferred
  semantic_analysis  -> Any imagery
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

    This is TASK-FIRST: the task drives sensor selection, not vice versa.
    """
    hint = spec.sensor_hint or "any"
    task = spec.task_type
    q_parts = [spec.intent] + spec.extracted_entities
    if question:
        q_parts.append(question)
    q = " ".join(q_parts).lower()

    cap1 = inspect_data_capability(image_b64)
    cap2 = inspect_data_capability(image2_b64) if image2_b64 else None
    cloud_cover = _estimate_cloud_cover_from_pixels(image_b64)
    cloud_pct = cloud_cover or 0.0
    high_cloud = cloud_pct > 30.0

    has_sar = cap1.data_type == "sentinel1" or (
        cap2 is not None and cap2.data_type == "sentinel1"
    )
    has_optical = cap1.data_type in ("rgb", "geotiff", "sentinel2") or (
        cap2 is not None and cap2.data_type in ("rgb", "geotiff", "sentinel2")
    )

    # 1. No image provided
    if cap1.data_type == "none":
        return SensorSelection(
            selected_sensor="Unspecified / No Imagery Supplied",
            rationale="No satellite imagery provided in request. Sensor cannot be verified without input raster data.",
            cloud_cover_estimate=None,
            fallback_considered=False,
        )

    # 2. Vegetation change: optical (NDVI) is primary — SAR NOT selected here
    if task == "vegetation_change":
        requires_nir = True
        has_nir = cap1.data_type == "sentinel2" or (
            cap1.data_type == "geotiff" and ("B08" in getattr(cap1, "available_bands", []) or getattr(cap1, "band_count", 3) >= 3)
        )
        if has_nir:
            return SensorSelection(
                selected_sensor="Sentinel-2 MSI (Multispectral Optical)",
                rationale=(
                    f"Vegetation change analysis: Sentinel-2 multispectral data available "
                    f"({cap1.band_count} bands). NDVI can be computed from NIR+Red. "
                    "SAR is NOT selected as primary for vegetation — optical spectral indices are standard."
                ),
                cloud_cover_estimate=cloud_cover,
                fallback_considered=False,
            )
        else:
            return SensorSelection(
                selected_sensor="Unsupported for Multispectral NDVI (RGB Optical Only)",
                rationale=(
                    "Vegetation change requires NIR band (Sentinel-2 B08 or equivalent). "
                    "Supplied imagery is 3-channel RGB without NIR. NDVI cannot be computed. "
                    "SAR is intentionally NOT selected for vegetation analysis."
                ),
                cloud_cover_estimate=cloud_cover,
                fallback_considered=True,
            )

    # 3. SAR change: SAR required
    if task == "sar_change":
        if has_sar:
            sar_cap = cap1 if cap1.data_type == "sentinel1" else cap2
            pols = getattr(sar_cap, "polarizations", []) or []
            return SensorSelection(
                selected_sensor="Sentinel-1 SAR (C-band GRD)",
                rationale=(
                    f"SAR change analysis: Sentinel-1 GRD data verified. "
                    f"Polarisations: {pols}. "
                    f"Log-ratio temporal change analysis will be applied."
                ),
                cloud_cover_estimate=cloud_cover,
                fallback_considered=False,
            )
        else:
            return SensorSelection(
                selected_sensor="Optical Provided (SAR Sentinel-1 Absent)",
                rationale=(
                    "SAR change analysis requested, but no Sentinel-1 GRD data detected. "
                    f"Supplied data is: {cap1.sensor} ({cap1.data_type}). "
                    "Provide a genuine Sentinel-1 GRD GeoTIFF for SAR analysis."
                ),
                cloud_cover_estimate=cloud_cover,
                fallback_considered=True,
            )

    # 4. Flood impact: SAR preferred, especially with high cloud cover
    if task == "flood_impact":
        if has_sar and has_optical:
            mode = "dual-sensor SAR+optical with evidence fusion"
            sar_note = " SAR is PRIMARY due to high cloud cover." if high_cloud else " Optical is primary; SAR is supporting."
            return SensorSelection(
                selected_sensor="Dual-Sensor: Sentinel-1 SAR + Optical",
                rationale=(
                    f"Flood impact analysis: {mode}. "
                    f"Cloud cover: {cloud_pct:.0f}%.{sar_note}"
                ),
                cloud_cover_estimate=cloud_cover,
                fallback_considered=False,
            )
        elif has_sar:
            return SensorSelection(
                selected_sensor="Sentinel-1 SAR (C-band GRD) — Flood Evidence",
                rationale=(
                    "Flood impact: SAR-only analysis. "
                    "Backscatter decrease used as flood evidence. "
                    "SAR is cloud-penetrating and reliable even under heavy cloud cover."
                ),
                cloud_cover_estimate=cloud_cover,
                fallback_considered=False,
            )
        elif has_optical:
            note = f" NOTE: Cloud cover is {cloud_pct:.0f}% — optical flood detection may be unreliable." if high_cloud else ""
            return SensorSelection(
                selected_sensor="Optical RGB/Multispectral — Flood Evidence",
                rationale=(
                    f"Flood impact: optical-only analysis (no SAR data supplied)."
                    f"{note}"
                ),
                cloud_cover_estimate=cloud_cover,
                fallback_considered=high_cloud,
            )

    # 5. Urban change: optical primary, SAR supporting
    if task == "urban_change":
        if has_sar and has_optical:
            return SensorSelection(
                selected_sensor="Optical Primary + SAR Supporting (Urban Change)",
                rationale=(
                    "Urban change: optical ChangeFormer is primary. "
                    "SAR backscatter increase provides supporting construction evidence."
                ),
                cloud_cover_estimate=cloud_cover,
                fallback_considered=False,
            )
        return SensorSelection(
            selected_sensor="Optical — Urban Change Analysis",
            rationale="Urban change: optical ChangeFormer + Building Segmentation.",
            cloud_cover_estimate=cloud_cover,
            fallback_considered=False,
        )

    # 6. Fire analysis: optical (NBR) primary
    if task == "fire_analysis":
        return SensorSelection(
            selected_sensor="Optical — Fire/Burn Analysis (NBR)",
            rationale=(
                "Fire analysis: optical NBR (Normalized Burn Ratio) is primary. "
                + ("SAR supporting evidence also available." if has_sar else "")
            ),
            cloud_cover_estimate=cloud_cover,
            fallback_considered=False,
        )

    # 7. Object extraction / semantic analysis: optical preferred
    if task in ("object_extraction", "semantic_analysis"):
        return SensorSelection(
            selected_sensor="Optical — " + ("Object Extraction" if task == "object_extraction" else "Semantic Analysis"),
            rationale=f"Task '{task}' uses optical imagery for visual analysis.",
            cloud_cover_estimate=cloud_cover,
            fallback_considered=False,
        )

    # 8. Query asks for NDVI/multispectral on RGB
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

    # 9. Sentinel-2 Multispectral GeoTIFF detected
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

    # 10. Genuine Sentinel-1 SAR detected
    if cap1.data_type == "sentinel1":
        pols = getattr(cap1, "polarizations", []) or []
        return SensorSelection(
            selected_sensor="Sentinel-1 SAR (C-band GRD)",
            rationale=(
                f"Verified genuine Sentinel-1 GRD raster ({cap1.width}x{cap1.height} px, "
                f"polarisations: {pols}, CRS: {cap1.crs or 'Unprojected'}). "
                "SAR backscatter analysis can be performed."
            ),
            cloud_cover_estimate=cloud_cover,
            fallback_considered=False,
        )

    # 11. Joint SAR-Optical requested
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

    # 12. SAR requested explicitly but not supplied
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

    # 13. Bi-temporal change detection
    if task in ("change_detection", "change_vqa"):
        has_two = image2_b64 is not None
        cloud_info = f"Estimated cloud cover: {cloud_cover}%." if cloud_cover is not None else ""
        sar_note = " SAR supporting evidence available." if has_sar else ""
        return SensorSelection(
            selected_sensor="Optical — Bi-temporal Comparison" if has_two else "Optical — Single Image (Bi-temporal Limited)",
            rationale=(
                f"Bi-temporal task '{spec.intent}' evaluated on optical imagery. "
                + ("Both pre and post-event images available. " if has_two else "Only one image provided — temporal baseline is missing. ")
                + cloud_info + sar_note
            ),
            cloud_cover_estimate=cloud_cover,
            fallback_considered=not has_two,
        )

    # 14. Default optical RGB
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
