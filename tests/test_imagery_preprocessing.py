"""
Unit Tests for Phase 1: Imagery Preprocessing Layer.
Validates single image inspection, temporal pair compatibility,
spatial alignment, nodata masking, and normalization.
"""
import io
import base64
import numpy as np
import pytest
from PIL import Image

from backend.services.imagery.validation import (
    validate_single_image,
    validate_temporal_pair,
)
from backend.services.imagery.alignment import align_image_arrays
from backend.services.imagery.nodata import compute_valid_mask, combine_valid_masks
from backend.services.imagery.normalization import to_preprocessed_float, normalize_for_model
from backend.services.imagery.preprocessing import preprocess_temporal_pair


def _make_b64_image(w: int = 64, h: int = 64, color: tuple = (100, 150, 200), fmt: str = "PNG") -> str:
    img = Image.new("RGB", (w, h), color=color)
    buf = io.BytesIO()
    img.save(buf, format=fmt)
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("utf-8")


class TestImageValidation:
    def test_validate_single_image_rgb(self):
        b64 = _make_b64_image(128, 96, (200, 100, 50))
        res = validate_single_image(b64_str=b64)
        assert res.valid is True
        assert res.width == 128
        assert res.height == 96
        assert res.channels == 3
        assert res.georeferenced is False

    def test_validate_single_image_empty(self):
        res = validate_single_image(b64_str=None)
        assert res.valid is False
        assert "Empty or missing" in res.error

    def test_validate_single_image_corrupt(self):
        res = validate_single_image(raw_bytes=b"not_an_image_random_bytes_12345")
        assert res.valid is False
        assert "Failed to decode" in res.error


class TestTemporalValidation:
    def test_validate_temporal_pair_valid(self):
        b64_0 = _make_b64_image(64, 64)
        b64_1 = _make_b64_image(64, 64)
        res = validate_temporal_pair(b64_0, b64_1)
        assert res.compatible is True
        assert res.status == "success"
        assert res.image_t0.width == 64
        assert res.image_t1.width == 64

    def test_validate_temporal_pair_missing_t1(self):
        b64_0 = _make_b64_image(64, 64)
        res = validate_temporal_pair(b64_0, None)
        assert res.compatible is False
        assert res.status == "insufficient_data"
        assert "T1" in res.reason

    def test_validate_temporal_pair_corrupt(self):
        b64_0 = _make_b64_image(64, 64)
        res = validate_temporal_pair(b64_0, "data:image/png;base64,invalid_base64_%%%")
        assert res.compatible is False
        assert res.status == "corrupt_data"


class TestAlignment:
    def test_alignment_identical_dimensions(self):
        arr0 = np.zeros((50, 50, 3), dtype=np.uint8)
        arr1 = np.ones((50, 50, 3), dtype=np.uint8) * 100
        a0, a1, meta = align_image_arrays(arr0, arr1)
        assert meta.method == "identical_dimensions"
        assert a0.shape == a1.shape == (50, 50, 3)

    def test_alignment_mismatched_dimensions(self):
        arr0 = np.zeros((80, 100, 3), dtype=np.uint8)
        arr1 = np.zeros((60, 90, 3), dtype=np.uint8)
        a0, a1, meta = align_image_arrays(arr0, arr1)
        assert meta.method == "bilinear_dimension_matching"
        assert meta.georeferenced is False
        assert a0.shape[:2] == (60, 90)
        assert a1.shape[:2] == (60, 90)


class TestNodataHandling:
    def test_nodata_nan_and_inf(self):
        arr = np.ones((10, 10, 3), dtype=np.float32)
        arr[0, 0, 0] = np.nan
        arr[1, 1, 1] = np.inf
        valid, val_cnt, inv_cnt, frac = compute_valid_mask(arr)
        assert val_cnt == 98
        assert inv_cnt == 2
        assert valid[0, 0] is False or not valid[0, 0]
        assert valid[1, 1] is False or not valid[1, 1]

    def test_nodata_explicit_val(self):
        arr = np.full((10, 10), 50.0, dtype=np.float32)
        arr[2, 2] = -9999.0
        valid, val_cnt, inv_cnt, frac = compute_valid_mask(arr, nodata_val=-9999.0)
        assert val_cnt == 99
        assert inv_cnt == 1
        assert not valid[2, 2]

    def test_combine_valid_masks(self):
        m0 = np.ones((10, 10), dtype=bool)
        m1 = np.ones((10, 10), dtype=bool)
        m0[0, 0] = False
        m1[1, 1] = False
        comb, val_cnt, inv_cnt, frac = combine_valid_masks(m0, m1)
        assert val_cnt == 98
        assert inv_cnt == 2


class TestNormalization:
    def test_uint8_scaling(self):
        arr = np.array([[[0, 127, 255]]], dtype=np.uint8)
        norm = to_preprocessed_float(arr)
        assert norm.dtype == np.float32
        assert np.isclose(norm[0, 0, 0], 0.0)
        assert np.isclose(norm[0, 0, 1], 127 / 255.0, atol=1e-3)
        assert np.isclose(norm[0, 0, 2], 1.0)

    def test_model_normalization_imagenet(self):
        arr = np.full((10, 10, 3), 0.5, dtype=np.float32)
        norm = normalize_for_model(arr, method="imagenet")
        assert norm.shape == (10, 10, 3)
        assert not np.allclose(norm, 0.5)  # Altered by mean/std


class TestPreprocessingPipelineE2E:
    def test_full_preprocessing_success(self):
        b0 = _make_b64_image(80, 80, (200, 100, 50))
        b1 = _make_b64_image(60, 60, (210, 110, 60))
        res = preprocess_temporal_pair(b0, b1, cloud_method="heuristic_rgb")
        assert res.success is True
        assert res.alignment["performed"] is True
        assert res.valid_pixels > 0
        assert res.aligned_t0.shape == res.aligned_t1.shape
        assert res.cloud_mask.applied in (True, False)
        # Check dictionary serialization
        d = res.to_dict()
        assert "image_t0" in d
        assert "image_t1" in d
        assert "alignment" in d
