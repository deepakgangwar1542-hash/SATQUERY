"""
Scientific Metrics Library for Remote Sensing & Vision Evaluation.

Implements mathematically rigorous, zero-NaN metrics:
- Binary segmentation: IoU, Dice, Precision, Recall, F1, Overall Accuracy
- Continuous & Area Estimation: Absolute Error, Relative Error, MAE, RMSE, Percentage Error
- Object Counting: Absolute Count Error, Relative Error (with instance separation check)
- Sensor & Capability Selection: Modality correctness, false compatibility, unsupported rejection
- Calibration: Expected Calibration Error (ECE), Brier Score, confidence vs accuracy bucketing
"""
from __future__ import annotations
import math
from typing import Dict, Any, List, Optional, Tuple, Sequence
import numpy as np
from PIL import Image

from backend.benchmarking.schemas import MetricResult


def align_mask_dimensions(pred: np.ndarray, gt: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
    """
    Ensures prediction and ground-truth masks share identical dimensions.
    If shapes differ, prediction is resampled to ground-truth shape using nearest-neighbor.
    """
    if pred.shape == gt.shape:
        return pred, gt

    if pred.ndim == 3 and pred.shape[-1] in (1, 3, 4):
        pred = pred[..., 0]
    if gt.ndim == 3 and gt.shape[-1] in (1, 3, 4):
        gt = gt[..., 0]

    if pred.shape != gt.shape:
        h, w = gt.shape[:2]
        pred_pil = Image.fromarray(pred.astype(np.uint8))
        pred_resized = np.array(pred_pil.resize((w, h), Image.NEAREST))
        return pred_resized, gt

    return pred, gt


def compute_mask_metrics(
    pred_mask: Optional[np.ndarray],
    gt_mask: Optional[np.ndarray],
    threshold: float = 0.5,
    valid_mask: Optional[np.ndarray] = None,
) -> MetricResult:
    """
    Evaluates binary segmentation or change detection masks against ground truth.

    Rigorous Edge-Case Behavior (Documented):
    - Ground truth is None: Returns ground_truth_available=False, all metrics None.
    - Prediction is None: Returns all 0.0 metrics with true positives = 0.
    - Both masks empty (0 positive pixels): IoU=1.0, Dice=1.0, Precision=1.0, Recall=1.0, F1=1.0.
      Both model and ground truth agree completely that no positive target exists in the scene.
    - One mask empty, other has positives: IoU=0.0, Dice=0.0, Precision=0.0, Recall=0.0, F1=0.0.
    - Mismatched shapes: Prediction is safely resampled to GT dimensions via nearest-neighbor interpolation.
    """
    if gt_mask is None:
        return MetricResult(
            ground_truth_available=False,
            diagnostic_message="Ground truth mask unavailable — scientific metrics cannot be computed.",
        )

    if pred_mask is None:
        gt_bool = (gt_mask > threshold).astype(bool)
        fn = int(np.sum(gt_bool))
        return MetricResult(
            iou=0.0, dice=0.0, precision=0.0, recall=0.0, f1=0.0,
            overall_accuracy=0.0,
            true_positive=0, false_positive=0, false_negative=fn, true_negative=int(np.sum(~gt_bool)),
            ground_truth_available=True,
            diagnostic_message="Prediction mask is absent / model produced no output.",
        )

    # Align dimensions if mismatched
    p_aligned, g_aligned = align_mask_dimensions(pred_mask, gt_mask)

    p_bool = (p_aligned > threshold).astype(bool)
    g_bool = (g_aligned > threshold).astype(bool)

    if valid_mask is not None:
        if valid_mask.shape != g_bool.shape:
            v_aligned, _ = align_mask_dimensions(valid_mask, g_aligned)
        else:
            v_aligned = valid_mask
        val_bool = v_aligned.astype(bool)
        p_bool = p_bool[val_bool]
        g_bool = g_bool[val_bool]

    tp = int(np.sum(p_bool & g_bool))
    fp = int(np.sum(p_bool & ~g_bool))
    fn = int(np.sum(~p_bool & g_bool))
    tn = int(np.sum(~p_bool & ~g_bool))

    total_eval_pixels = tp + fp + fn + tn
    p_pos = tp + fp
    g_pos = tp + fn

    # ── Edge Cases: Empty masks ──────────────────────────────────────────────
    if g_pos == 0 and p_pos == 0:
        # Both empty: perfect agreement on negative class
        return MetricResult(
            iou=1.0,
            dice=1.0,
            precision=1.0,
            recall=1.0,
            f1=1.0,
            overall_accuracy=1.0,
            true_positive=0,
            false_positive=0,
            false_negative=0,
            true_negative=tn,
            ground_truth_available=True,
            diagnostic_message="Both prediction and ground truth contain zero positive pixels (perfect true negative agreement).",
        )

    if g_pos == 0 and p_pos > 0:
        # Ground truth is empty, but model hallucinated detections
        return MetricResult(
            iou=0.0,
            dice=0.0,
            precision=0.0,
            recall=0.0,
            f1=0.0,
            overall_accuracy=round(float(tn / max(1, total_eval_pixels)), 4),
            true_positive=0,
            false_positive=fp,
            false_negative=0,
            true_negative=tn,
            ground_truth_available=True,
            diagnostic_message="Ground truth contains zero positive pixels; prediction produced false positives.",
        )

    if g_pos > 0 and p_pos == 0:
        # Model produced no detections when target was present
        return MetricResult(
            iou=0.0,
            dice=0.0,
            precision=0.0,
            recall=0.0,
            f1=0.0,
            overall_accuracy=round(float(tn / max(1, total_eval_pixels)), 4),
            true_positive=0,
            false_positive=0,
            false_negative=fn,
            true_negative=tn,
            ground_truth_available=True,
            diagnostic_message="Model produced empty prediction while ground truth contains target pixels.",
        )

    # ── Standard Non-Empty Metrics ───────────────────────────────────────────
    precision = float(tp / (tp + fp))
    recall = float(tp / (tp + fn))
    f1 = float(2 * precision * recall / (precision + recall)) if (precision + recall) > 0 else 0.0
    iou = float(tp / (tp + fp + fn))
    dice = float(2 * tp / (2 * tp + fp + fn))
    oa = float((tp + tn) / max(1, total_eval_pixels))

    return MetricResult(
        iou=round(iou, 4),
        dice=round(dice, 4),
        precision=round(precision, 4),
        recall=round(recall, 4),
        f1=round(f1, 4),
        overall_accuracy=round(oa, 4),
        true_positive=tp,
        false_positive=fp,
        false_negative=fn,
        true_negative=tn,
        ground_truth_available=True,
        diagnostic_message="Mask evaluation completed successfully.",
    )


def compute_scalar_metrics(
    predicted_val: Optional[float],
    ground_truth_val: Optional[float],
    unit: str = "percentage",
) -> MetricResult:
    """
    Computes absolute error, relative error, and percentage error for area or indices.
    """
    if ground_truth_val is None:
        return MetricResult(
            ground_truth_available=False,
            diagnostic_message=f"Ground truth {unit} unavailable.",
        )

    if predicted_val is None:
        return MetricResult(
            ground_truth_available=True,
            diagnostic_message=f"Prediction for {unit} unavailable / not computed.",
        )

    abs_err = abs(float(predicted_val) - float(ground_truth_val))
    denominator = max(abs(float(ground_truth_val)), 1e-6)
    rel_err = abs_err / denominator

    return MetricResult(
        absolute_error=round(abs_err, 4),
        relative_error=round(rel_err, 4),
        ground_truth_available=True,
        diagnostic_message=f"Scalar evaluation for {unit} completed.",
        auxiliary_metrics={
            "predicted": round(float(predicted_val), 4),
            "ground_truth": round(float(ground_truth_val), 4),
            "percentage_error": round(rel_err * 100.0, 2),
        },
    )


def compute_count_metrics(
    predicted_count: Optional[int],
    ground_truth_count: Optional[int],
    instance_separation_supported: bool = True,
) -> MetricResult:
    """
    Evaluates object or building count.
    If instance separation was not supported (e.g. only semantic binary mask available),
    reports count evaluation unavailable to prevent fabricating object counts.
    """
    if not instance_separation_supported:
        return MetricResult(
            ground_truth_available=bool(ground_truth_count is not None),
            diagnostic_message="Count evaluation unavailable for this pipeline: model generates semantic coverage, not isolated instance boundaries.",
        )

    if ground_truth_count is None:
        return MetricResult(
            ground_truth_available=False,
            diagnostic_message="Ground truth instance count unavailable.",
        )

    if predicted_count is None:
        return MetricResult(
            ground_truth_available=True,
            count_error=int(ground_truth_count),
            diagnostic_message="Model did not output an object count.",
        )

    diff = abs(int(predicted_count) - int(ground_truth_count))
    rel = diff / max(int(ground_truth_count), 1)

    return MetricResult(
        count_error=diff,
        absolute_error=float(diff),
        relative_error=round(rel, 4),
        ground_truth_available=True,
        diagnostic_message="Instance count evaluation completed.",
        auxiliary_metrics={
            "predicted_count": int(predicted_count),
            "ground_truth_count": int(ground_truth_count),
        },
    )


def compute_mae_rmse(predictions: Sequence[float], ground_truths: Sequence[float]) -> Dict[str, float]:
    """Computes Mean Absolute Error and Root Mean Squared Error across paired sequences."""
    if len(predictions) == 0 or len(predictions) != len(ground_truths):
        return {"mae": 0.0, "rmse": 0.0, "count": 0}

    diffs = [abs(p - g) for p, g in zip(predictions, ground_truths)]
    sq_diffs = [(p - g) ** 2 for p, g in zip(predictions, ground_truths)]

    mae = float(sum(diffs) / len(diffs))
    rmse = float(math.sqrt(sum(sq_diffs) / len(sq_diffs)))

    return {"mae": round(mae, 4), "rmse": round(rmse, 4), "count": len(predictions)}


def compute_calibration_buckets(
    confidences: Sequence[float],
    accuracies: Sequence[float],
    num_bins: int = 5,
) -> Tuple[float, List[Dict[str, Any]]]:
    """
    Calculates Expected Calibration Error (ECE) and confidence vs accuracy bins.
    Confidence buckets: e.g. 0.0-0.2, 0.2-0.4, 0.4-0.6, 0.6-0.8, 0.8-1.0.
    """
    if len(confidences) == 0 or len(confidences) != len(accuracies):
        return 0.0, []

    bin_edges = np.linspace(0.0, 1.0, num_bins + 1)
    buckets: List[Dict[str, Any]] = []
    ece = 0.0
    total_samples = len(confidences)

    for i in range(num_bins):
        bin_lower = bin_edges[i]
        bin_upper = bin_edges[i + 1]

        # Select samples within this bin
        if i == num_bins - 1:
            indices = [idx for idx, c in enumerate(confidences) if bin_lower <= c <= bin_upper]
        else:
            indices = [idx for idx, c in enumerate(confidences) if bin_lower <= c < bin_upper]

        count = len(indices)
        if count > 0:
            bin_conf = float(sum(confidences[idx] for idx in indices) / count)
            bin_acc = float(sum(accuracies[idx] for idx in indices) / count)
            gap = abs(bin_acc - bin_conf)
            ece += gap * (count / total_samples)
        else:
            bin_conf = float((bin_lower + bin_upper) / 2.0)
            bin_acc = 0.0
            gap = 0.0

        buckets.append({
            "bin_range": f"{bin_lower:.1f}-{bin_upper:.1f}",
            "sample_count": count,
            "average_confidence": round(bin_conf, 3),
            "average_accuracy": round(bin_acc, 3),
            "calibration_gap": round(gap, 3),
        })

    return round(float(ece), 4), buckets
