"""
Change Detection Evaluation & Benchmark Suite — SatQuery AI.

Calculates authentic statistical performance metrics comparing predicted
change masks against ground truth masks:
  - Intersection over Union (IoU)
  - Precision
  - Recall
  - F1 Score
  - Overall Accuracy (OA)

Kept strictly separated from production inference to ensure benchmark metrics
are only reported when empirical ground truth masks are provided.
"""
from __future__ import annotations
from typing import Dict, Any
import numpy as np


def evaluate_change_mask(
    predicted_mask: np.ndarray,
    ground_truth_mask: np.ndarray,
    valid_mask: np.ndarray | None = None,
) -> Dict[str, float]:
    """
    Evaluates binary change prediction against ground-truth change annotation.

    Args:
      predicted_mask: boolean or binary 0/1 array (H, W)
      ground_truth_mask: boolean or binary 0/1 array (H, W)
      valid_mask: optional boolean array indicating valid evaluation pixels

    Returns:
      Dict with iou, precision, recall, f1, overall_accuracy, tp, fp, fn, tn.
    """
    pred = (predicted_mask > 0).astype(bool)
    gt = (ground_truth_mask > 0).astype(bool)

    if pred.shape != gt.shape:
        raise ValueError(f"Shape mismatch: pred {pred.shape} vs ground truth {gt.shape}")

    if valid_mask is not None:
        eval_pixels = valid_mask.astype(bool)
        pred = pred[eval_pixels]
        gt = gt[eval_pixels]

    tp = int(np.sum(pred & gt))
    fp = int(np.sum(pred & ~gt))
    fn = int(np.sum(~pred & gt))
    tn = int(np.sum(~pred & ~gt))

    precision = float(tp / (tp + fp)) if (tp + fp) > 0 else 0.0
    recall = float(tp / (tp + fn)) if (tp + fn) > 0 else 0.0
    f1 = float(2 * precision * recall / (precision + recall)) if (precision + recall) > 0 else 0.0
    iou = float(tp / (tp + fp + fn)) if (tp + fp + fn) > 0 else 0.0
    oa = float((tp + tn) / max(1, (tp + tn + fp + fn)))

    return {
        "iou": round(iou, 4),
        "precision": round(precision, 4),
        "recall": round(recall, 4),
        "f1": round(f1, 4),
        "overall_accuracy": round(oa, 4),
        "true_positives": tp,
        "false_positives": fp,
        "false_negatives": fn,
        "true_negatives": tn,
        "total_evaluated_pixels": int(pred.size),
    }
