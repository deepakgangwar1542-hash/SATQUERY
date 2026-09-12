"""
Unit tests for Ground Truth Loading and Vector Rasterization.
"""
import pytest
import numpy as np
from PIL import Image
import io
import base64

from backend.benchmarking.ground_truth import (
    load_binary_mask_from_file,
    load_mask_from_base64,
    rasterize_polygons,
    normalize_ground_truth,
)


def test_normalize_ground_truth_from_array():
    arr = np.zeros((64, 64), dtype=np.uint8)
    arr[10:30, 10:30] = 255
    res = normalize_ground_truth(arr)
    assert res is not None
    assert res.dtype == bool
    assert res.shape == (64, 64)
    assert np.sum(res) == 20 * 20


def test_normalize_ground_truth_from_base64():
    img = Image.new("L", (32, 32), 0)
    # Draw white square
    for y in range(8, 24):
        for x in range(8, 24):
            img.putpixel((x, y), 255)

    buf = io.BytesIO()
    img.save(buf, format="PNG")
    b64_str = f"data:image/png;base64,{base64.b64encode(buf.getvalue()).decode('utf-8')}"

    res = normalize_ground_truth(b64_str)
    assert res is not None
    assert res.shape == (32, 32)
    assert np.sum(res) == 16 * 16


def test_rasterize_normalized_polygons():
    # Polygon covering upper left quadrant [0,0] to [0.5, 0.5]
    poly = [[0.0, 0.0], [0.5, 0.0], [0.5, 0.5], [0.0, 0.5]]
    mask = rasterize_polygons([poly], shape=(100, 100), normalized=True)
    assert mask.shape == (100, 100)
    # Approximately 2500 pixels (50x50 to 51x51 depending on pixel borders)
    pos_count = np.sum(mask)
    assert 2400 <= pos_count <= 2700
