"""
Report Generator for Benchmark Evaluation Runs.

Exports machine-readable and human-readable evaluation artifacts:
- summary.json: Aggregated metrics, calibration ECE, latency, failure taxonomy
- detailed_results.json: Full per-case evaluation objects
- metrics.csv: Tabular metric summary
- report.md: Rich GitHub-flavored Markdown report
- failure_cases.json: Diagnosable records of degraded or failed cases
- Optional visual comparison grids: [Input | Ground Truth | Prediction | Error Map]
"""
from __future__ import annotations
import csv
import json
import logging
from pathlib import Path
from typing import List, Dict, Any, Optional
import numpy as np
from PIL import Image, ImageDraw, ImageFont

from backend.benchmarking.schemas import (
    BenchmarkRunSummary, EvaluationResult, FailureCategory
)
from backend.benchmarking.metrics import compute_calibration_buckets

logger = logging.getLogger("SatQuery.ReportGenerator")


class BenchmarkReportGenerator:
    """Generates standardized benchmark reports and visual artifacts."""

    @staticmethod
    def generate_all_reports(
        summary: BenchmarkRunSummary,
        results: List[EvaluationResult],
        output_dir: str | Path,
    ) -> Dict[str, Path]:
        """Generates all JSON, CSV, and Markdown report files in output_dir."""
        out_path = Path(output_dir)
        out_path.mkdir(parents=True, exist_ok=True)
        paths = {}

        # 1. summary.json
        summary_file = out_path / "summary.json"
        with open(summary_file, "w", encoding="utf-8") as f:
            json.dump(summary.model_dump(), f, indent=2)
        paths["summary_json"] = summary_file

        # 2. detailed_results.json
        details_file = out_path / "detailed_results.json"
        with open(details_file, "w", encoding="utf-8") as f:
            json.dump([r.model_dump() for r in results], f, indent=2)
        paths["detailed_results_json"] = details_file

        # 3. metrics.csv
        csv_file = out_path / "metrics.csv"
        with open(csv_file, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow([
                "case_id", "task_type", "iou", "dice", "precision", "recall",
                "f1", "overall_accuracy", "latency_ms", "confidence",
                "sensor_correct", "failure_category"
            ])
            for r in results:
                m = r.metrics
                writer.writerow([
                    r.case_id,
                    r.task_type.value,
                    m.iou if m.iou is not None else "",
                    m.dice if m.dice is not None else "",
                    m.precision if m.precision is not None else "",
                    m.recall if m.recall is not None else "",
                    m.f1 if m.f1 is not None else "",
                    m.overall_accuracy if m.overall_accuracy is not None else "",
                    round(r.latency_ms, 1),
                    r.confidence_overall if r.confidence_overall is not None else "",
                    r.sensor_selection_correct if r.sensor_selection_correct is not None else "",
                    r.failure_category.value,
                ])
        paths["metrics_csv"] = csv_file

        # 4. failure_cases.json
        failures = [r.model_dump() for r in results if r.failure_category != FailureCategory.NONE]
        failures_file = out_path / "failure_cases.json"
        with open(failures_file, "w", encoding="utf-8") as f:
            json.dump(failures, f, indent=2)
        paths["failure_cases_json"] = failures_file

        # 5. report.md
        md_file = out_path / "report.md"
        md_content = BenchmarkReportGenerator._build_markdown_report(summary, results)
        with open(md_file, "w", encoding="utf-8") as f:
            f.write(md_content)
        paths["report_md"] = md_file

        return paths

    @staticmethod
    def _build_markdown_report(summary: BenchmarkRunSummary, results: List[EvaluationResult]) -> str:
        """Constructs an audit-ready Markdown benchmark document."""
        lines = []
        lines.append(f"# SatQuery AI Benchmark Evaluation Report — {summary.name}")
        lines.append(f"**Run ID:** `{summary.run_id}` | **Date:** {summary.timestamp} | **Software Version:** {summary.software_version}\n")

        lines.append("## 1. Executive Summary\n")
        lines.append("| Metric | Value | Description |")
        lines.append("| :--- | :--- | :--- |")
        lines.append(f"| **Total Cases** | {summary.total_cases} | Total benchmark cases evaluated |")
        lines.append(f"| **Mean IoU** | {f'{summary.mean_iou:.4f}' if summary.mean_iou is not None else 'N/A (No GT)'} | Overall spatial agreement across segmentation tasks |")
        lines.append(f"| **Mean Dice / F1** | {f'{summary.mean_dice:.4f}' if summary.mean_dice is not None else 'N/A (No GT)'} | Harmonic mean of precision and recall |")
        lines.append(f"| **Mean Precision** | {f'{summary.mean_precision:.4f}' if summary.mean_precision is not None else 'N/A'} | True positive ratio in predicted masks |")
        lines.append(f"| **Mean Recall** | {f'{summary.mean_recall:.4f}' if summary.mean_recall is not None else 'N/A'} | Ground-truth coverage ratio |")
        lines.append(f"| **Sensor Selection Accuracy** | {f'{summary.sensor_selection_accuracy*100:.1f}%' if summary.sensor_selection_accuracy is not None else 'N/A'} | Correct optimal sensor / modality routing |")
        lines.append(f"| **Unsupported Analysis Rejection** | {f'{summary.unsupported_rejection_rate*100:.1f}%' if summary.unsupported_rejection_rate is not None else 'N/A'} | Accurate refusal of impossible operations (e.g. RGB NDVI) |")
        lines.append(f"| **Expected Calibration Error (ECE)** | {f'{summary.expected_calibration_error:.4f}' if summary.expected_calibration_error is not None else 'N/A'} | Calibration gap between confidence & empirical accuracy |")
        lines.append(f"| **Mean Execution Latency** | {summary.mean_latency_ms:.1f} ms | Average pipeline runtime per query |\n")

        lines.append("## 2. Confidence Calibration Breakdown\n")
        lines.append("Evaluates whether confidence scores reflect empirical correctness:\n")
        lines.append("| Confidence Bin | Sample Count | Avg Confidence | Avg Accuracy / IoU | Calibration Gap |")
        lines.append("| :---: | :---: | :---: | :---: | :---: |")
        for b in summary.confidence_buckets:
            lines.append(f"| {b.bin_range} | {b.sample_count} | {b.average_confidence:.3f} | {b.average_accuracy:.3f} | {b.calibration_gap:.3f} |")
        lines.append("")

        lines.append("## 3. Per-Task Performance\n")
        lines.append("| Task Type | Evaluated Cases | Mean IoU | Mean F1 | Sensor Match |")
        lines.append("| :--- | :---: | :---: | :---: | :---: |")
        for task, data in summary.task_breakdown.items():
            iou_str = f"{data['mean_iou']:.4f}" if data.get("mean_iou") is not None else "N/A"
            f1_str = f"{data['mean_f1']:.4f}" if data.get("mean_f1") is not None else "N/A"
            sensor_str = f"{data['sensor_accuracy']*100:.0f}%" if data.get("sensor_accuracy") is not None else "N/A"
            lines.append(f"| `{task}` | {data.get('count', 0)} | {iou_str} | {f1_str} | {sensor_str} |")
        lines.append("")

        lines.append("## 4. Failure Case Taxonomy\n")
        if summary.failure_taxonomy:
            lines.append("| Failure Category | Count | Proportion |")
            lines.append("| :--- | :---: | :---: |")
            total_fail = sum(summary.failure_taxonomy.values())
            for cat, count in summary.failure_taxonomy.items():
                pct = (count / max(1, total_fail)) * 100.0
                lines.append(f"| `{cat}` | {count} | {pct:.1f}% |")
        else:
            lines.append("No benchmark failures recorded in this run.")
        lines.append("")

        lines.append("## 5. Detailed Case Records\n")
        lines.append("| Case ID | Task | IoU | Precision | Recall | Latency | Sensor Match | Failure Category |")
        lines.append("| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |")
        for r in results:
            iou_str = f"{r.metrics.iou:.3f}" if r.metrics.iou is not None else "—"
            p_str = f"{r.metrics.precision:.3f}" if r.metrics.precision is not None else "—"
            r_str = f"{r.metrics.recall:.3f}" if r.metrics.recall is not None else "—"
            sm_str = "✅" if r.sensor_selection_correct else ("❌" if r.sensor_selection_correct is False else "—")
            lines.append(f"| `{r.case_id}` | `{r.task_type.value}` | {iou_str} | {p_str} | {r_str} | {r.latency_ms:.0f}ms | {sm_str} | `{r.failure_category.value}` |")

        return "\n".join(lines) + "\n"

    @staticmethod
    def create_visual_comparison_grid(
        input_img: np.ndarray,
        gt_mask: np.ndarray,
        pred_mask: np.ndarray,
        save_path: str | Path,
    ) -> Path:
        """
        Creates a side-by-side diagnostic artifact:
        [INPUT | GROUND TRUTH | PREDICTION | ERROR MAP]
        Where Error Map shows:
        - Green = True Positive
        - Red = False Positive
        - Blue = False Negative
        - Black = True Negative
        """
        p_path = Path(save_path)
        p_path.parent.mkdir(parents=True, exist_ok=True)

        h, w = gt_mask.shape[:2]

        # Resample input if needed
        if input_img.shape[:2] != (h, w):
            input_pil = Image.fromarray(input_img).resize((w, h), Image.BILINEAR)
            input_rgb = np.array(input_rgb).astype(np.uint8)
        else:
            input_rgb = input_img.astype(np.uint8)

        gt_b = (gt_mask > 0).astype(bool)
        pred_b = (pred_mask > 0).astype(bool)

        # Ground truth visual (white on black)
        gt_rgb = np.zeros((h, w, 3), dtype=np.uint8)
        gt_rgb[gt_b] = (255, 255, 255)

        # Prediction visual (cyan on black)
        pred_rgb = np.zeros((h, w, 3), dtype=np.uint8)
        pred_rgb[pred_b] = (0, 230, 255)

        # Error map: TP=Green, FP=Red, FN=Blue
        error_rgb = np.zeros((h, w, 3), dtype=np.uint8)
        error_rgb[pred_b & gt_b] = (0, 255, 0)      # TP: Green
        error_rgb[pred_b & ~gt_b] = (255, 50, 50)   # FP: Red
        error_rgb[~pred_b & gt_b] = (50, 100, 255)  # FN: Blue

        # Combine horizontally: 4 tiles
        grid = Image.new("RGB", (w * 4, h))
        grid.paste(Image.fromarray(input_rgb), (0, 0))
        grid.paste(Image.fromarray(gt_rgb), (w, 0))
        grid.paste(Image.fromarray(pred_rgb), (w * 2, 0))
        grid.paste(Image.fromarray(error_rgb), (w * 3, 0))

        grid.save(p_path)
        return p_path
