"""
SAR Benchmark Framework — SatQuery AI SAR Package.

Task-diverse evaluation of binary evidence masks against ground-truth references.
Works for any task: change detection, flood, urban, vegetation, fire, etc.

Metrics:
  IoU (Intersection over Union)  — overall spatial agreement
  Precision                      — TP / (TP + FP)
  Recall                         — TP / (TP + FN)
  F1 Score                       — harmonic mean of precision and recall
  Dice                           — 2*TP / (2*TP + FP + FN)

Ground truth requirement:
  These metrics are computed ONLY when a ground-truth mask is supplied.
  When ground truth is not available:
    → Returns MaskMetrics(available=False,
         message="Benchmark unavailable — ground-truth mask not supplied.")
  No fabricated scores are ever returned.
"""
from __future__ import annotations
from dataclasses import dataclass, field
from typing import Any, Dict, Optional

import numpy as np


@dataclass
class MaskMetrics:
    """Quantitative binary-mask evaluation metrics."""
    available: bool
    message: str
    task: str = "unknown"
    method: str = "unknown"
    iou: Optional[float] = None
    precision: Optional[float] = None
    recall: Optional[float] = None
    f1: Optional[float] = None
    dice: Optional[float] = None
    true_positive: Optional[int] = None
    false_positive: Optional[int] = None
    false_negative: Optional[int] = None
    predicted_positive: Optional[int] = None
    ground_truth_positive: Optional[int] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "available": self.available,
            "message": self.message,
            "task": self.task,
            "method": self.method,
            "iou": round(self.iou, 4) if self.iou is not None else None,
            "precision": round(self.precision, 4) if self.precision is not None else None,
            "recall": round(self.recall, 4) if self.recall is not None else None,
            "f1": round(self.f1, 4) if self.f1 is not None else None,
            "dice": round(self.dice, 4) if self.dice is not None else None,
            "true_positive": self.true_positive,
            "false_positive": self.false_positive,
            "false_negative": self.false_negative,
            "predicted_positive": self.predicted_positive,
            "ground_truth_positive": self.ground_truth_positive,
        }


def evaluate_mask(
    predicted: Optional[np.ndarray],
    ground_truth: Optional[np.ndarray],
    task: str = "unknown",
    method: str = "unknown",
    valid_mask: Optional[np.ndarray] = None,
) -> MaskMetrics:
    """
    Evaluate a predicted binary mask against ground truth.

    Works for any task (flood, urban, vegetation change, etc.).
    Returns MaskMetrics(available=False, ...) when ground truth is None.
    """
    if ground_truth is None:
        return MaskMetrics(
            available=False,
            message="Benchmark unavailable — ground-truth mask not supplied.",
            task=task, method=method,
        )
    if predicted is None:
        return MaskMetrics(
            available=False,
            message="Benchmark unavailable — predicted mask is None.",
            task=task, method=method,
        )
    if predicted.shape != ground_truth.shape:
        return MaskMetrics(
            available=False,
            message=(
                f"Shape mismatch: predicted {predicted.shape} ≠ "
                f"ground truth {ground_truth.shape}."
            ),
            task=task, method=method,
        )

    pred = predicted.astype(bool)
    gt = ground_truth.astype(bool)
    if valid_mask is not None and valid_mask.shape == pred.shape:
        pred = pred & valid_mask
        gt = gt & valid_mask

    tp = int(np.sum(pred & gt))
    fp = int(np.sum(pred & ~gt))
    fn = int(np.sum(~pred & gt))

    iou = tp / max(tp + fp + fn, 1)
    precision = tp / max(tp + fp, 1)
    recall = tp / max(tp + fn, 1)
    f1 = 2 * precision * recall / max(precision + recall, 1e-9)
    dice = 2 * tp / max(2 * tp + fp + fn, 1)

    return MaskMetrics(
        available=True,
        message="Benchmark computed from supplied ground-truth mask.",
        task=task, method=method,
        iou=round(iou, 4),
        precision=round(precision, 4),
        recall=round(recall, 4),
        f1=round(f1, 4),
        dice=round(dice, 4),
        true_positive=tp, false_positive=fp, false_negative=fn,
        predicted_positive=int(np.sum(pred)),
        ground_truth_positive=int(np.sum(gt)),
    )


def compare_methods(
    predictions: Dict[str, Optional[np.ndarray]],
    ground_truth: Optional[np.ndarray],
    task: str = "unknown",
    valid_mask: Optional[np.ndarray] = None,
) -> Dict[str, MaskMetrics]:
    """Compare multiple detection methods against the same ground truth."""
    return {
        method: evaluate_mask(mask, ground_truth, task=task, method=method,
                              valid_mask=valid_mask)
        for method, mask in predictions.items()
    }
