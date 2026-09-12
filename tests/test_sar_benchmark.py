"""
Unit tests for SAR & Multi-modal Benchmark Framework.

Tests:
  - Honest unavailability when ground truth is missing
  - Precision, Recall, IoU, F1, Dice calculation on known test masks
  - Shape mismatch handling
  - Method comparison across multiple predictions
"""
import numpy as np
import pytest

from backend.services.sar.benchmark import (
    evaluate_mask,
    compare_methods,
    MaskMetrics,
)


def test_benchmark_unavailable_without_ground_truth():
    pred = np.ones((20, 20), dtype=bool)
    res = evaluate_mask(pred, None, task="flood_impact", method="sar_otsu")
    assert not res.available
    assert "not supplied" in res.message
    assert res.iou is None
    assert res.f1 is None


def test_benchmark_exact_match():
    gt = np.zeros((30, 30), dtype=bool)
    gt[10:20, 10:20] = True  # 100 pixels

    res = evaluate_mask(gt, gt, task="urban_change", method="exact")
    assert res.available
    assert res.iou == 1.0
    assert res.precision == 1.0
    assert res.recall == 1.0
    assert res.f1 == 1.0
    assert res.dice == 1.0
    assert res.true_positive == 100
    assert res.false_positive == 0
    assert res.false_negative == 0


def test_benchmark_partial_overlap():
    gt = np.zeros((20, 20), dtype=bool)
    pred = np.zeros((20, 20), dtype=bool)

    # Ground truth: 100 pixels [0:10, 0:10]
    gt[:10, :10] = True
    # Prediction: 100 pixels [5:15, 0:10] -> 50 TP, 50 FP, 50 FN
    pred[5:15, :10] = True

    res = evaluate_mask(pred, gt, task="flood_impact", method="sar_threshold")
    assert res.available
    assert res.true_positive == 50
    assert res.false_positive == 50
    assert res.false_negative == 50
    # IoU = 50 / (50 + 50 + 50) = 50 / 150 = 0.3333
    assert np.isclose(res.iou, 0.3333, atol=0.001)
    # Precision = 50 / 100 = 0.5
    assert np.isclose(res.precision, 0.5, atol=0.001)
    # Recall = 50 / 100 = 0.5
    assert np.isclose(res.recall, 0.5, atol=0.001)
    # F1 = 0.5
    assert np.isclose(res.f1, 0.5, atol=0.001)


def test_benchmark_compare_methods():
    gt = np.zeros((40, 40), dtype=bool)
    gt[10:30, 10:30] = True  # 400 px

    # Method 1: conservative (under-detection)
    m1 = np.zeros((40, 40), dtype=bool)
    m1[10:20, 10:30] = True  # 200 px

    # Method 2: perfect
    m2 = gt.copy()

    preds = {"conservative_sar": m1, "fused_optimal": m2}
    results = compare_methods(preds, gt, task="flood_impact")

    assert "conservative_sar" in results
    assert "fused_optimal" in results
    assert results["conservative_sar"].iou < results["fused_optimal"].iou
    assert results["fused_optimal"].iou == 1.0


def test_benchmark_shape_mismatch():
    pred = np.ones((10, 10), dtype=bool)
    gt = np.ones((20, 20), dtype=bool)
    res = evaluate_mask(pred, gt)
    assert not res.available
    assert "Shape mismatch" in res.message
