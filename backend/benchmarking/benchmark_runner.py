"""
Benchmark Runner & CLI Harness for SatQuery AI.

Orchestrates automated evaluation of remote sensing pipelines against ground truth:
- Loads benchmark cases from dataset adapters
- Runs queries through production orchestration (run_orchestration)
- Performs scientific evaluation and failure taxonomy categorization
- Computes confidence calibration (ECE) and per-task performance breakdowns
- Exports machine-readable (JSON, CSV) and human-readable (Markdown) reports
- Supports CLI execution: python -m backend.benchmarking.benchmark_runner
"""
from __future__ import annotations
import argparse
import datetime
import logging
import os
import platform
import random
import sys
import time
from pathlib import Path
from typing import List, Dict, Any, Optional, Tuple

try:
    import yaml
    HAS_YAML = True
except ImportError:
    HAS_YAML = False

import numpy as np

from backend.benchmarking.schemas import (
    BenchmarkCase, BenchmarkRunConfig, BenchmarkRunSummary,
    EvaluationResult, ConfidenceBucket, TaskType, FailureCategory
)
from backend.benchmarking.dataset_adapter import (
    BaseDatasetAdapter, LocalDirectoryAdapter, SyntheticBenchmarkAdapter
)
from backend.benchmarking.evaluator import BenchmarkEvaluator
from backend.benchmarking.report_generator import BenchmarkReportGenerator
from backend.benchmarking.metrics import compute_calibration_buckets
from backend.schemas.response import QueryRequest
from backend.orchestrator import run_pipeline as run_orchestration

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("SatQuery.BenchmarkRunner")


class BenchmarkRunner:
    """Core benchmark execution engine."""

    def __init__(self, config: Optional[BenchmarkRunConfig] = None):
        self.config = config or BenchmarkRunConfig()
        self._set_seed(self.config.seed)

    def _set_seed(self, seed: int):
        random.seed(seed)
        np.random.seed(seed)

    def run_benchmark(
        self,
        adapter: Optional[BaseDatasetAdapter] = None,
        split: str = "test",
    ) -> Tuple[BenchmarkRunSummary, List[EvaluationResult]]:
        """Executes benchmark cases and returns summary and individual results."""
        run_id = f"run_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}"
        logger.info(f"Starting SatQuery benchmark run '{self.config.name}' (ID: {run_id})")

        # Select adapter: default to synthetic if none specified
        if adapter is None:
            adapter = SyntheticBenchmarkAdapter()

        cases = adapter.load_cases(split=split)
        if self.config.max_cases_per_task:
            # Filter or cap
            cases = cases[:self.config.max_cases_per_task]

        logger.info(f"Loaded {len(cases)} benchmark cases from '{adapter.get_dataset_name()}' ({split} split)")

        results: List[EvaluationResult] = []
        latencies: List[float] = []

        for case in cases:
            logger.info(f"Evaluating case: {case.case_id} [Task: {case.task_type.value}]")
            t_start = time.perf_counter()

            # Construct QueryRequest
            img1 = case.input_images[0] if len(case.input_images) > 0 else None
            img2 = case.input_images[1] if len(case.input_images) > 1 else None

            req = QueryRequest(
                question=case.query,
                image_b64=img1,
                image2_b64=img2,
                polygon=case.polygon,
            )

            try:
                # Execute through production orchestrator
                response = run_orchestration(req)
                t_duration_ms = (time.perf_counter() - t_start) * 1000.0

                # Evaluate against ground truth
                eval_res = BenchmarkEvaluator.evaluate_case(case, response)
                eval_res.latency_ms = t_duration_ms
                results.append(eval_res)
                latencies.append(t_duration_ms)

            except Exception as exc:
                logger.error(f"Execution error on case {case.case_id}: {exc}", exc_info=True)
                t_duration_ms = (time.perf_counter() - t_start) * 1000.0
                from backend.benchmarking.schemas import MetricResult
                fail_res = EvaluationResult(
                    case_id=case.case_id,
                    task_type=case.task_type,
                    query=case.query,
                    metrics=MetricResult(ground_truth_available=False, diagnostic_message=str(exc)),
                    latency_ms=t_duration_ms,
                    failure_category=FailureCategory.MODEL_EXECUTION_FAILURE,
                    failure_details=str(exc),
                )
                results.append(fail_res)
                latencies.append(t_duration_ms)

        # ── Aggregate Summary Statistics ─────────────────────────────────────
        summary = self._aggregate_summary(run_id, cases, results, latencies)

        # ── Generate Reports ─────────────────────────────────────────────────
        out_dir = Path(self.config.output_dir) / run_id
        report_paths = BenchmarkReportGenerator.generate_all_reports(summary, results, out_dir)
        logger.info(f"Benchmark run complete. Reports saved to: {out_dir}")

        return summary, results

    def _aggregate_summary(
        self,
        run_id: str,
        cases: List[BenchmarkCase],
        results: List[EvaluationResult],
        latencies: List[float],
    ) -> BenchmarkRunSummary:
        """Computes high-level scientific and operational summary metrics."""
        total = len(results)
        evaluated = sum(1 for r in results if r.failure_category != FailureCategory.MODEL_EXECUTION_FAILURE)
        gt_cases = sum(1 for r in results if r.metrics.ground_truth_available)

        # Mask metrics
        ious = [r.metrics.iou for r in results if r.metrics.iou is not None]
        dices = [r.metrics.dice for r in results if r.metrics.dice is not None]
        precisions = [r.metrics.precision for r in results if r.metrics.precision is not None]
        recalls = [r.metrics.recall for r in results if r.metrics.recall is not None]

        mean_iou = float(np.mean(ious)) if ious else None
        mean_dice = float(np.mean(dices)) if dices else None
        mean_precision = float(np.mean(precisions)) if precisions else None
        mean_recall = float(np.mean(recalls)) if recalls else None

        # Sensor selection
        sensor_evals = [r.sensor_selection_correct for r in results if r.sensor_selection_correct is not None]
        sensor_acc = float(sum(1 for s in sensor_evals if s) / len(sensor_evals)) if sensor_evals else None

        # Capability rejections
        cap_evals = [r.capability_enforced_correctly for r in results if r.capability_enforced_correctly is not None]
        unsupported_rate = float(sum(1 for c in cap_evals if c) / len(cap_evals)) if cap_evals else None

        # Verification detection
        verif_evals = [r.verification_correct for r in results if r.verification_correct is not None]
        verif_rate = float(sum(1 for v in verif_evals if v) / len(verif_evals)) if verif_evals else None

        # Confidence Calibration (ECE)
        conf_pairs = [
            (r.confidence_overall, r.metrics.iou if r.metrics.iou is not None else (1.0 if r.failure_category == FailureCategory.NONE else 0.0))
            for r in results if r.confidence_overall is not None
        ]
        ece, raw_buckets = compute_calibration_buckets(
            [p[0] for p in conf_pairs],
            [p[1] for p in conf_pairs],
            num_bins=5,
        )
        conf_buckets = [ConfidenceBucket(**b) for b in raw_buckets]

        # Per-task breakdown
        task_breakdown: Dict[str, Dict[str, Any]] = {}
        for r in results:
            t_name = r.task_type.value
            if t_name not in task_breakdown:
                task_breakdown[t_name] = {"count": 0, "ious": [], "dices": [], "sensor_matches": []}
            tb = task_breakdown[t_name]
            tb["count"] += 1
            if r.metrics.iou is not None:
                tb["ious"].append(r.metrics.iou)
            if r.metrics.dice is not None:
                tb["dices"].append(r.metrics.dice)
            if r.sensor_selection_correct is not None:
                tb["sensor_matches"].append(1 if r.sensor_selection_correct else 0)

        for t_name, data in task_breakdown.items():
            data["mean_iou"] = round(float(np.mean(data["ious"])), 4) if data["ious"] else None
            data["mean_f1"] = round(float(np.mean(data["dices"])), 4) if data["dices"] else None
            data["sensor_accuracy"] = round(float(np.mean(data["sensor_matches"])), 3) if data["sensor_matches"] else None
            del data["ious"]
            del data["dices"]
            del data["sensor_matches"]

        # Failure taxonomy
        failure_tax: Dict[str, int] = {}
        for r in results:
            if r.failure_category != FailureCategory.NONE:
                c_name = r.failure_category.value
                failure_tax[c_name] = failure_tax.get(c_name, 0) + 1

        failed_count = sum(failure_tax.values())
        success_count = total - failed_count

        return BenchmarkRunSummary(
            run_id=run_id,
            name=self.config.name,
            timestamp=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            hardware_info={
                "platform": platform.platform(),
                "processor": platform.processor(),
                "python_version": sys.version.split()[0],
            },
            total_cases=total,
            evaluated_cases=evaluated,
            ground_truth_cases=gt_cases,
            successful_cases=success_count,
            failed_cases=failed_count,
            mean_iou=round(mean_iou, 4) if mean_iou is not None else None,
            mean_dice=round(mean_dice, 4) if mean_dice is not None else None,
            mean_precision=round(mean_precision, 4) if mean_precision is not None else None,
            mean_recall=round(mean_recall, 4) if mean_recall is not None else None,
            sensor_selection_accuracy=round(sensor_acc, 3) if sensor_acc is not None else None,
            unsupported_rejection_rate=round(unsupported_rate, 3) if unsupported_rate is not None else None,
            verification_detection_rate=round(verif_rate, 3) if verif_rate is not None else None,
            expected_calibration_error=round(ece, 4) if conf_pairs else None,
            confidence_buckets=conf_buckets,
            task_breakdown=task_breakdown,
            failure_taxonomy=failure_tax,
            mean_latency_ms=round(float(np.mean(latencies)), 1) if latencies else 0.0,
            ablation_config=self.config.ablation.model_dump(),
        )


def main():
    """Command-line entrypoint for running benchmarks."""
    parser = argparse.ArgumentParser(description="SatQuery AI Ground Truth Benchmark Runner")
    parser.add_argument("--config", type=str, help="Path to benchmark_config.yaml")
    parser.add_argument("--dataset", type=str, help="Path to local dataset directory with cases.json")
    parser.add_argument("--synthetic", action="store_true", default=True, help="Run built-in synthetic benchmark suite")
    parser.add_argument("--output", type=str, default="./benchmark_results", help="Output directory for reports")
    parser.add_argument("--seed", type=int, default=42, help="Random seed for reproducibility")

    args = parser.parse_args()

    cfg = BenchmarkRunConfig(output_dir=args.output, seed=args.seed)

    if args.config and Path(args.config).exists():
        cfg_path = Path(args.config)
        with open(cfg_path, "r", encoding="utf-8") as f:
            if HAS_YAML and cfg_path.suffix.lower() in (".yaml", ".yml"):
                y_data = yaml.safe_load(f)
            else:
                try:
                    import json
                    y_data = json.load(f)
                except Exception:
                    y_data = {}
            if y_data:
                cfg = BenchmarkRunConfig(**y_data.get("benchmark", {}))

    runner = BenchmarkRunner(config=cfg)

    adapter: BaseDatasetAdapter
    if args.dataset and Path(args.dataset).exists():
        adapter = LocalDirectoryAdapter(root_dir=args.dataset)
    else:
        adapter = SyntheticBenchmarkAdapter()

    summary, results = runner.run_benchmark(adapter=adapter)
    print("\n" + "=" * 60)
    print(f"BENCHMARK RUN COMPLETE: {summary.run_id}")
    print(f"Total Cases: {summary.total_cases} | Success: {summary.successful_cases} | Failed: {summary.failed_cases}")
    if summary.mean_iou is not None:
        print(f"Mean IoU: {summary.mean_iou:.4f} | Mean Dice: {summary.mean_dice:.4f}")
    if summary.sensor_selection_accuracy is not None:
        print(f"Sensor Selection Accuracy: {summary.sensor_selection_accuracy*100:.1f}%")
    if summary.expected_calibration_error is not None:
        print(f"Expected Calibration Error (ECE): {summary.expected_calibration_error:.4f}")
    print(f"Mean Latency: {summary.mean_latency_ms:.1f} ms")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    main()
