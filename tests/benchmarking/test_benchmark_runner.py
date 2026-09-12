"""
End-to-end integration tests for BenchmarkRunner, report generation, and CLI.
"""
import shutil
from pathlib import Path
import pytest

from backend.benchmarking.schemas import BenchmarkRunConfig
from backend.benchmarking.benchmark_runner import BenchmarkRunner
from backend.benchmarking.dataset_adapter import SyntheticBenchmarkAdapter


@pytest.fixture
def temp_benchmark_dir(tmp_path):
    d = tmp_path / "test_benchmark_results"
    d.mkdir(parents=True, exist_ok=True)
    yield d
    shutil.rmtree(d, ignore_errors=True)


def test_synthetic_benchmark_run_end_to_end(temp_benchmark_dir):
    cfg = BenchmarkRunConfig(
        name="ci_test_run",
        seed=123,
        output_dir=str(temp_benchmark_dir),
        max_cases_per_task=4,
    )
    runner = BenchmarkRunner(config=cfg)
    adapter = SyntheticBenchmarkAdapter()

    summary, results = runner.run_benchmark(adapter=adapter)

    # 1. Verify summary values
    assert summary.total_cases > 0
    assert summary.evaluated_cases > 0
    assert summary.mean_latency_ms > 0.0

    # 2. Verify all report files exist
    run_dir = temp_benchmark_dir / summary.run_id
    assert run_dir.exists()
    assert (run_dir / "summary.json").exists()
    assert (run_dir / "detailed_results.json").exists()
    assert (run_dir / "metrics.csv").exists()
    assert (run_dir / "report.md").exists()
    assert (run_dir / "failure_cases.json").exists()

    # 3. Read report.md and verify header
    with open(run_dir / "report.md", "r", encoding="utf-8") as f:
        md_text = f.read()
    assert "SatQuery AI Benchmark Evaluation Report" in md_text
    assert summary.run_id in md_text
