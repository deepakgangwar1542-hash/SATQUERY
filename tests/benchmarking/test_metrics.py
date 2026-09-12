"""
Unit tests for scientific benchmarking metrics.
Covers IoU, Dice, Precision, Recall, F1, edge cases (both empty, one empty),
shape mismatches, MAE, RMSE, and calibration ECE.
"""
import pytest
import numpy as np
from backend.benchmarking.metrics import (
    compute_mask_metrics,
    compute_scalar_metrics,
    compute_count_metrics,
    compute_mae_rmse,
    compute_calibration_buckets,
    align_mask_dimensions,
)


def test_mask_metrics_exact_match():
    mask = np.zeros((100, 100), dtype=bool)
    mask[20:60, 20:60] = True

    res = compute_mask_metrics(mask, mask)
    assert res.iou == 1.0
    assert res.dice == 1.0
    assert res.precision == 1.0
    assert res.recall == 1.0
    assert res.f1 == 1.0
    assert res.overall_accuracy == 1.0
    assert res.false_positive == 0
    assert res.false_negative == 0


def test_mask_metrics_partial_overlap():
    gt = np.zeros((100, 100), dtype=bool)
    gt[20:60, 20:60] = True  # 40x40 = 1600 px

    pred = np.zeros((100, 100), dtype=bool)
    pred[20:60, 40:80] = True  # 40x40 = 1600 px
    # Overlap: 40x20 = 800 px (TP)
    # FP: 800 px, FN: 800 px
    # Union: 1600 + 1600 - 800 = 2400 px
    # IoU: 800 / 2400 = 0.3333

    res = compute_mask_metrics(pred, gt)
    assert abs(res.iou - 0.3333) < 0.001
    assert res.precision == 0.5
    assert res.recall == 0.5
    assert res.f1 == 0.5
    assert res.dice == 0.5
    assert res.true_positive == 800
    assert res.false_positive == 800
    assert res.false_negative == 800


def test_mask_metrics_both_empty_perfect_negative_agreement():
    pred = np.zeros((50, 50), dtype=bool)
    gt = np.zeros((50, 50), dtype=bool)

    res = compute_mask_metrics(pred, gt)
    assert res.iou == 1.0
    assert res.dice == 1.0
    assert res.precision == 1.0
    assert res.recall == 1.0
    assert res.f1 == 1.0
    assert res.true_positive == 0
    assert res.false_positive == 0
    assert res.false_negative == 0
    assert "perfect true negative agreement" in res.diagnostic_message


def test_mask_metrics_one_empty_other_positive():
    pred = np.zeros((50, 50), dtype=bool)
    gt = np.zeros((50, 50), dtype=bool)
    gt[10:20, 10:20] = True

    res = compute_mask_metrics(pred, gt)
    assert res.iou == 0.0
    assert res.dice == 0.0
    assert res.precision == 0.0
    assert res.recall == 0.0
    assert res.false_negative == 100

    # Opposite case
    res2 = compute_mask_metrics(gt, pred)
    assert res2.iou == 0.0
    assert res2.false_positive == 100


def test_mask_metrics_shape_mismatch_resampling():
    pred = np.zeros((100, 100), dtype=bool)
    pred[20:80, 20:80] = True  # 60% of width/height

    gt = np.zeros((200, 200), dtype=bool)
    gt[40:160, 40:160] = True

    res = compute_mask_metrics(pred, gt)
    assert res.iou is not None
    assert res.iou > 0.95  # Resampled nearest-neighbor matches almost perfectly


def test_mask_metrics_none_inputs():
    res_no_gt = compute_mask_metrics(np.ones((10, 10)), None)
    assert not res_no_gt.ground_truth_available
    assert res_no_gt.iou is None

    res_no_pred = compute_mask_metrics(None, np.ones((10, 10)))
    assert res_no_pred.ground_truth_available
    assert res_no_pred.iou == 0.0
    assert res_no_pred.false_negative == 100


def test_scalar_and_count_metrics():
    scalar_res = compute_scalar_metrics(predicted_val=17.5, ground_truth_val=20.0, unit="change_percentage")
    assert scalar_res.absolute_error == 2.5
    assert scalar_res.relative_error == 0.125
    assert scalar_res.auxiliary_metrics["percentage_error"] == 12.5

    count_res = compute_count_metrics(predicted_count=28, ground_truth_count=31)
    assert count_res.count_error == 3
    assert abs(count_res.relative_error - 0.0968) < 0.001

    # Instance separation unavailable check
    count_unavail = compute_count_metrics(predicted_count=10, ground_truth_count=10, instance_separation_supported=False)
    assert "unavailable" in count_unavail.diagnostic_message


def test_mae_rmse():
    preds = [10.0, 20.0, 30.0]
    gts = [12.0, 18.0, 34.0]
    res = compute_mae_rmse(preds, gts)
    # diffs: 2, 2, 4 -> MAE = 8/3 = 2.6667
    # sq_diffs: 4, 4, 16 = 24 -> RMSE = sqrt(8) = 2.8284
    assert abs(res["mae"] - 2.6667) < 0.001
    assert abs(res["rmse"] - 2.8284) < 0.001


def test_calibration_buckets_and_ece():
    confs = [0.15, 0.35, 0.55, 0.75, 0.95]
    accs = [0.10, 0.40, 0.50, 0.80, 0.90]
    ece, buckets = compute_calibration_buckets(confs, accs, num_bins=5)
    assert len(buckets) == 5
    assert ece >= 0.0
    assert ece < 0.10  # Very well calibrated
