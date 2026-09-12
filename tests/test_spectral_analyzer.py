"""
Unit & Integration Tests for Sentinel-2 Multispectral & Spectral Analysis.

Includes a deterministic synthetic GeoTIFF fixture with hand-calculated
NDVI and NDWI values to verify mathematical accuracy, nodata handling,
NaN/Inf filtering, zero-denominator safety, and RGB refusal.
"""
import io
import base64
import numpy as np
import pytest
import rasterio
from rasterio.transform import from_origin

from backend.services.data_capability import inspect_data_capability
from backend.services.spectral_analyzer import (
    compute_real_ndvi,
    compute_real_ndwi,
    extract_sentinel2_bands,
    analyze_multispectral_scene,
)
from backend.orchestrator import run_pipeline
from backend.schemas.response import QueryRequest


@pytest.fixture
def synthetic_s2_geotiff_b64() -> str:
    """
    Creates an in-memory 4x4 3-band Sentinel-2 GeoTIFF with known values:
      Band 1: B03 (Green)
      Band 2: B04 (Red)
      Band 3: B08 (NIR)
    CRS: EPSG:32644 (UTM 44N)
    Resolution: 10m x 10m
    Nodata: -9999.0
    """
    width, height = 4, 4
    # B03 (Green), B04 (Red), B08 (NIR)
    b03 = np.array([
        [0.2, 0.6, 0.1, 0.2],
        [-9999.0, 0.1, 0.1, 0.1],
        [0.3, 0.3, 0.3, 0.3],
        [0.1, 0.1, 0.1, 0.1]
    ], dtype=np.float32)

    b04 = np.array([
        [0.1, 0.4, 0.0, np.nan],
        [-9999.0, 0.2, 0.2, 0.2],
        [0.1, 0.1, 0.1, 0.1],
        [0.5, 0.5, 0.5, 0.5]
    ], dtype=np.float32)

    b08 = np.array([
        [0.5, 0.1, 0.0, 0.5],
        [-9999.0, 0.6, 0.6, 0.6],
        [0.7, 0.7, 0.7, 0.7],
        [0.1, 0.1, 0.1, 0.1]
    ], dtype=np.float32)

    buf = io.BytesIO()
    transform = from_origin(300000, 3000000, 10, 10)
    with rasterio.open(
        buf,
        "w",
        driver="GTiff",
        height=height,
        width=width,
        count=3,
        dtype="float32",
        crs="EPSG:32644",
        transform=transform,
        nodata=-9999.0,
    ) as dst:
        dst.write(b03, 1)
        dst.write(b04, 2)
        dst.write(b08, 3)
        dst.set_band_description(1, "B03")
        dst.set_band_description(2, "B04")
        dst.set_band_description(3, "B08")
        dst.update_tags(SENSOR="SENTINEL-2")

    buf.seek(0)
    return base64.b64encode(buf.read()).decode("utf-8")


class TestDeterministicSpectralCalculations:
    def test_hand_calculated_ndvi(self):
        """
        Pixel (0,0): B04=0.1, B08=0.5 -> NDVI = (0.5 - 0.1) / (0.5 + 0.1) = 0.4 / 0.6 = 0.6667
        Pixel (0,1): B04=0.4, B08=0.1 -> NDVI = (0.1 - 0.4) / (0.1 + 0.4) = -0.3 / 0.5 = -0.6000
        Pixel (0,2): B04=0.0, B08=0.0 -> Denom=0 -> Filtered!
        Pixel (0,3): B04=NaN -> Filtered!
        """
        b04 = np.array([[0.1, 0.4], [0.0, np.nan]], dtype=np.float32)
        b08 = np.array([[0.5, 0.1], [0.0, 0.5]], dtype=np.float32)

        res = compute_real_ndvi(b04, b08)
        assert res["status"] == "success"
        assert res["valid_pixel_count"] == 2
        assert res["invalid_pixel_count"] == 2
        # Max NDVI is pixel (0,0) = 0.6667
        assert pytest.approx(res["ndvi_max"], 0.001) == 0.6667
        # Min NDVI is pixel (0,1) = -0.6000
        assert pytest.approx(res["ndvi_min"], 0.001) == -0.6000
        # Mean NDVI = (0.6667 - 0.6000) / 2 = 0.0333
        assert pytest.approx(res["ndvi_mean"], 0.001) == 0.0333
        # Vegetation coverage threshold (> 0.30): 1 out of 2 valid pixels = 50.0%
        assert res["vegetation_coverage_pct"] == 50.0

    def test_hand_calculated_ndwi(self):
        """
        Pixel (0,0): B03=0.2, B08=0.5 -> NDWI = (0.2 - 0.5) / (0.2 + 0.5) = -0.3 / 0.7 = -0.4286
        Pixel (0,1): B03=0.6, B08=0.1 -> NDWI = (0.6 - 0.1) / (0.6 + 0.1) = 0.5 / 0.7 = 0.7143 (Water!)
        """
        b03 = np.array([[0.2, 0.6]], dtype=np.float32)
        b08 = np.array([[0.5, 0.1]], dtype=np.float32)

        res = compute_real_ndwi(b03, b08)
        assert res["status"] == "success"
        assert res["valid_pixel_count"] == 2
        assert pytest.approx(res["ndwi_max"], 0.001) == 0.7143
        assert pytest.approx(res["ndwi_min"], 0.001) == -0.4286
        # Water threshold (> 0.30): 1 out of 2 valid = 50.0%
        assert res["water_coverage_pct"] == 50.0

    def test_mismatched_dimensions_raises_error(self):
        b04 = np.zeros((3, 3), dtype=np.float32)
        b08 = np.zeros((4, 4), dtype=np.float32)
        with pytest.raises(ValueError, match="Mismatched band dimensions"):
            compute_real_ndvi(b04, b08)

    def test_all_invalid_pixels(self):
        b04 = np.array([[np.nan, 0.0]], dtype=np.float32)
        b08 = np.array([[0.5, 0.0]], dtype=np.float32)
        res = compute_real_ndvi(b04, b08)
        assert res["status"] == "no_valid_pixels"
        assert res["valid_pixel_count"] == 0
        assert res["vegetation_coverage_pct"] == 0.0


class TestSyntheticGeoTIFFIntegration:
    def test_data_capability_detection(self, synthetic_s2_geotiff_b64):
        cap = inspect_data_capability(synthetic_s2_geotiff_b64)
        assert cap.data_type == "sentinel2"
        assert cap.multispectral is True
        assert cap.georeferenced is True
        assert "B04" in cap.available_bands
        assert "B08" in cap.available_bands
        assert "B03" in cap.available_bands
        assert cap.sensor == "Sentinel-2 MSI"
        assert cap.crs == "EPSG:32644"

    def test_spectral_analyzer_on_synthetic_s2(self, synthetic_s2_geotiff_b64):
        res, cap, err = analyze_multispectral_scene(synthetic_s2_geotiff_b64)
        assert err is None
        assert "ndvi" in res
        assert "ndwi" in res
        ndvi = res["ndvi"]
        # Nodata (-9999.0) and NaN and zero denominator must be masked out
        assert ndvi["valid_pixel_count"] < 16
        assert ndvi["valid_pixel_ratio"] > 0.5
        assert -1.0 <= ndvi["ndvi_min"] <= 1.0
        assert -1.0 <= ndvi["ndvi_max"] <= 1.0

    def test_orchestrator_e2e_with_s2_geotiff(self, synthetic_s2_geotiff_b64):
        req = QueryRequest(
            question="Calculate NDVI and measure vegetation coverage",
            image_b64=synthetic_s2_geotiff_b64
        )
        resp = run_pipeline(req)
        assert resp.sensor_selection.selected_sensor == "Sentinel-2 MSI (Multispectral Optical)"
        assert "Sentinel-2" in resp.answer
        assert "NDVI" in resp.answer
        assert resp.confidence_breakdown.overall > 0.70

        # Provenance shows honest processing
        step_names = [s.step_name for s in resp.execution_trace.steps]
        assert "Input Capability & Compatibility Check" in step_names
        assert "Sensor Selection" in step_names


class TestHonestLimitationsAndRGBRefusal:
    def test_rgb_asking_ndvi_refuses_fake_calculation(self):
        """When user uploads RGB and asks to calculate NDVI, system must honestly refuse."""
        # Simple 10x10 RGB PNG
        from PIL import Image
        buf = io.BytesIO()
        img = Image.new("RGB", (10, 10), color=(50, 150, 50))
        img.save(buf, format="PNG")
        buf.seek(0)
        rgb_b64 = base64.b64encode(buf.read()).decode("utf-8")

        req = QueryRequest(question="Calculate NDVI", image_b64=rgb_b64)
        resp = run_pipeline(req)

        # Must not fabricate an NDVI number
        assert "NDVI cannot be calculated from this RGB image" in resp.answer
        assert "Near-Infrared" in resp.answer
        assert "Unsupported" in resp.sensor_selection.selected_sensor

    def test_rgb_asking_vegetation_gives_honest_visual_estimate(self):
        """When user uploads RGB and asks about vegetation, system gives visual estimate."""
        from PIL import Image
        buf = io.BytesIO()
        # High green image
        img = Image.new("RGB", (20, 20), color=(30, 200, 30))
        img.save(buf, format="PNG")
        buf.seek(0)
        rgb_b64 = base64.b64encode(buf.read()).decode("utf-8")

        req = QueryRequest(question="How much vegetation is present?", image_b64=rgb_b64)
        resp = run_pipeline(req)

        assert "Visual RGB analysis" in resp.answer
        assert "RGB visual estimate, not a calibrated multispectral NDVI" in resp.answer
        assert "100.0%" in resp.answer  # all pixels are green

    def test_no_image_gives_insufficient_imagery_status(self):
        """When no image is provided, system must not fabricate 45% vegetation or 12% water."""
        req = QueryRequest(question="How much vegetation is there?")
        resp = run_pipeline(req)

        assert "Insufficient imagery" in resp.answer
        # Ensure 45.0% or 12.0% are not present
        assert "45.0%" not in resp.answer
        assert "12.0%" not in resp.answer
        assert resp.confidence_breakdown.answer_groundedness < 0.5
