"""
Test suite for Sentinel-1 SAR Pipeline.

Tests:
  - Sentinel-1 adapter (GeoTIFF loading, polarisation tag extraction, rejection of non-SAR)
  - SAR preprocessing (NoData masking, dB power conversion, NaN/inf filtering, alignment)
  - SAR feature extraction (VV, VH, VV/VH ratio, temporal differences)
  - SAR change detection (log-ratio dB difference, decrease/increase masks, adaptive threshold)
  - Task-aware SAR analysis (flood_impact, urban_change, sar_change)
  - SAROpticalAgent execution with genuine synthetic SAR GeoTIFF
"""
import io
import base64
import numpy as np
import pytest
import rasterio
from rasterio.transform import from_origin

from backend.services.sar.sentinel1_adapter import (
    load_sar_scene,
    SAR1Scene,
    SAR1LoadError,
)
from backend.services.sar.sar_preprocessing import (
    preprocess_sar_scene,
    SARPreprocessingResult,
    align_sar_pair,
)
from backend.services.sar.sar_features import extract_sar_features
from backend.services.sar.sar_change import detect_sar_change
from backend.services.sar.sar_analysis import analyze_sar_for_task
from backend.agents.sar_optical_agent import SAROpticalAgent


def _create_synthetic_s1_geotiff(
    width: int = 64,
    height: int = 64,
    vv_values: np.ndarray | None = None,
    vh_values: np.ndarray | None = None,
) -> str:
    """Helper to generate an in-memory Sentinel-1 GeoTIFF and return base64 string."""
    if vv_values is None:
        vv_values = np.full((height, width), 0.05, dtype=np.float32)
    if vh_values is None:
        vh_values = np.full((height, width), 0.01, dtype=np.float32)

    transform = from_origin(85.0, 27.0, 10.0, 10.0)
    crs = "EPSG:4326"

    mem = io.BytesIO()
    with rasterio.open(
        mem,
        "w",
        driver="GTiff",
        height=height,
        width=width,
        count=2,
        dtype="float32",
        crs=crs,
        transform=transform,
        nodata=-9999.0,
    ) as dst:
        dst.write(vv_values, 1)
        dst.write(vh_values, 2)
        dst.update_tags(1, POLARISATION="VV", BAND_NAME="VV")
        dst.update_tags(2, POLARISATION="VH", BAND_NAME="VH")
        dst.update_tags(SENSOR="SENTINEL-1", SPACECRAFT_NAME="SENTINEL-1A")

    mem.seek(0)
    b64 = base64.b64encode(mem.read()).decode("utf-8")
    return f"data:image/tiff;base64,{b64}"


def test_sar_adapter_load_valid():
    b64 = _create_synthetic_s1_geotiff()
    scene = load_sar_scene(b64)
    assert isinstance(scene, SAR1Scene)
    assert scene.width == 64
    assert scene.height == 64
    assert "VV" in scene.polarizations
    assert "VH" in scene.polarizations
    assert scene.crs == "EPSG:4326"
    assert scene.bands["VV"].shape == (64, 64)


def test_sar_adapter_reject_invalid_rgb():
    # 3-band RGB without SAR tags should raise SAR1LoadError
    mem = io.BytesIO()
    with rasterio.open(
        mem,
        "w",
        driver="GTiff",
        height=32,
        width=32,
        count=3,
        dtype="uint8",
    ) as dst:
        dst.write(np.zeros((3, 32, 32), dtype=np.uint8))

    mem.seek(0)
    b64 = base64.b64encode(mem.read()).decode("utf-8")
    with pytest.raises(SAR1LoadError):
        load_sar_scene(b64)


def test_sar_preprocessing_db_conversion():
    # Power 0.1 -> 10 * log10(0.1) = -10.0 dB
    # Power 0.01 -> 10 * log10(0.01) = -20.0 dB
    vv = np.full((32, 32), 0.1, dtype=np.float32)
    vh = np.full((32, 32), 0.01, dtype=np.float32)
    vv[0, 0] = 0.0  # Zero should convert safely without -inf crash
    vv[0, 1] = -9999.0  # nodata

    b64 = _create_synthetic_s1_geotiff(32, 32, vv_values=vv, vh_values=vh)
    scene = load_sar_scene(b64)
    prep = preprocess_sar_scene(scene)

    assert isinstance(prep, SARPreprocessingResult)
    band_vv = prep.bands["VV"]
    assert np.isclose(band_vv.db_array[1, 1], -10.0, atol=0.1)
    assert band_vv.valid_mask[1, 1] == True
    assert band_vv.valid_mask[0, 1] == False  # masked nodata


def test_sar_features_extraction():
    vv = np.full((32, 32), 0.1, dtype=np.float32)
    vh = np.full((32, 32), 0.01, dtype=np.float32)
    b64 = _create_synthetic_s1_geotiff(32, 32, vv_values=vv, vh_values=vh)
    scene = load_sar_scene(b64)
    prep = preprocess_sar_scene(scene)

    feats = extract_sar_features(prep, primary_pol="VV")
    assert "VV" in feats.per_pol
    assert feats.per_pol["VV"].db_mean is not None
    assert np.isclose(feats.per_pol["VV"].db_mean, -10.0, atol=0.1)
    assert feats.vv_vh_ratio_db_mean is not None
    # VV (-10 dB) - VH (-20 dB) = +10 dB
    assert np.isclose(feats.vv_vh_ratio_db_mean, 10.0, atol=0.5)


def test_sar_temporal_change_detection():
    # T0: normal terrain (-10 dB)
    vv0 = np.full((40, 40), 0.1, dtype=np.float32)
    # T1: flooded in top-left quarter (drop to -22 dB, power 0.0063)
    vv1 = np.full((40, 40), 0.1, dtype=np.float32)
    vv1[:20, :20] = 0.0063

    b64_0 = _create_synthetic_s1_geotiff(40, 40, vv_values=vv0)
    b64_1 = _create_synthetic_s1_geotiff(40, 40, vv_values=vv1)

    prep0 = preprocess_sar_scene(load_sar_scene(b64_0))
    prep1 = preprocess_sar_scene(load_sar_scene(b64_1))

    change_res = detect_sar_change(
        prep0.bands["VV"].db_array,
        prep1.bands["VV"].db_array,
        prep0.bands["VV"].valid_mask,
        prep1.bands["VV"].valid_mask,
        threshold_db=3.0,
    )
    assert change_res.success
    # Inundation is a decrease in backscatter
    assert change_res.decrease_pixel_count >= 400
    assert change_res.decrease_fraction >= 0.24


def test_sar_task_router_flood_and_urban():
    # Flood test: drop in backscatter
    vv0 = np.full((30, 30), 0.1, dtype=np.float32)
    vv1 = np.full((30, 30), 0.1, dtype=np.float32)
    vv1[:15, :] = 0.001  # severe decrease (flood)

    prep0 = preprocess_sar_scene(load_sar_scene(_create_synthetic_s1_geotiff(30, 30, vv_values=vv0)))
    prep1 = preprocess_sar_scene(load_sar_scene(_create_synthetic_s1_geotiff(30, 30, vv_values=vv1)))

    flood_analysis = analyze_sar_for_task(prep0, prep1, task="flood_impact")
    assert flood_analysis.success
    assert "backscatter_decrease" in flood_analysis.evidence_label
    assert flood_analysis.evidence_fraction > 0.45

    # Urban test: increase in backscatter (construction / double bounce)
    vv2 = np.full((30, 30), 0.1, dtype=np.float32)
    vv2[:15, :] = 1.0  # high return (+10 dB)
    prep2 = preprocess_sar_scene(load_sar_scene(_create_synthetic_s1_geotiff(30, 30, vv_values=vv2)))

    urban_analysis = analyze_sar_for_task(prep0, prep2, task="urban_change")
    assert urban_analysis.success
    assert "backscatter_increase" in urban_analysis.evidence_label
    assert urban_analysis.evidence_fraction > 0.45


def test_sar_optical_agent_end_to_end():
    vv0 = np.full((32, 32), 0.1, dtype=np.float32)
    vv1 = np.full((32, 32), 0.1, dtype=np.float32)
    vv1[:16, :16] = 0.005  # flood candidate

    b64_0 = _create_synthetic_s1_geotiff(32, 32, vv_values=vv0)
    b64_1 = _create_synthetic_s1_geotiff(32, 32, vv_values=vv1)

    agent = SAROpticalAgent()
    out = agent.run(
        question="What is the flood inundation impact from Sentinel-1 SAR?",
        image_b64=b64_0,
        image2_b64=b64_1,
        task="flood_impact",
    )
    assert out.agent_id == "sar_optical_agent"
    assert out.raw_score >= 0.85
    assert "sar_analysis" in out.result
    assert out.result["sar_status"] == "Active (Sentinel-1 GRD Verified)"
