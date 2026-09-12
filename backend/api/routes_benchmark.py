"""
API Endpoints for SatQuery AI Benchmarking.

Provides decoupled benchmark execution and report querying without altering
the core production /query/analyze workflow.
"""
from __future__ import annotations
import json
from pathlib import Path
from typing import Dict, Any, Optional, List
from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel

from backend.benchmarking.schemas import BenchmarkRunConfig, BenchmarkRunSummary
from backend.benchmarking.benchmark_runner import BenchmarkRunner
from backend.benchmarking.dataset_adapter import SyntheticBenchmarkAdapter, LocalDirectoryAdapter

router = APIRouter()

BENCHMARK_OUTPUT_DIR = Path("./benchmark_results")


class BenchmarkRunRequest(BaseModel):
    name: Optional[str] = "api_benchmark_run"
    dataset_path: Optional[str] = None
    seed: int = 42
    max_cases: Optional[int] = None


@router.post("/run", summary="Trigger a benchmark run")
def run_benchmark_endpoint(req: BenchmarkRunRequest):
    """Executes benchmark evaluation against configured dataset or synthetic suite."""
    cfg = BenchmarkRunConfig(
        name=req.name or "api_benchmark_run",
        seed=req.seed,
        output_dir=str(BENCHMARK_OUTPUT_DIR),
        max_cases_per_task=req.max_cases,
    )
    runner = BenchmarkRunner(config=cfg)

    adapter = None
    if req.dataset_path and Path(req.dataset_path).exists():
        adapter = LocalDirectoryAdapter(root_dir=req.dataset_path)
    else:
        adapter = SyntheticBenchmarkAdapter()

    summary, results = runner.run_benchmark(adapter=adapter)
    return {
        "status": "completed",
        "run_id": summary.run_id,
        "summary": summary.model_dump(),
        "report_markdown_url": f"/benchmark/results/{summary.run_id}/report.md",
    }


@router.get("/results/{run_id}", summary="Fetch benchmark summary by run ID")
def get_benchmark_result(run_id: str):
    """Retrieves the summary.json for a completed benchmark run."""
    run_dir = BENCHMARK_OUTPUT_DIR / run_id
    summary_file = run_dir / "summary.json"

    if not summary_file.exists():
        raise HTTPException(status_code=404, detail=f"Benchmark run '{run_id}' not found.")

    with open(summary_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data


@router.get("/list", summary="List historical benchmark runs")
def list_benchmark_runs():
    """Lists all historical benchmark run directories."""
    if not BENCHMARK_OUTPUT_DIR.exists():
        return {"runs": []}

    runs = []
    for d in sorted(BENCHMARK_OUTPUT_DIR.iterdir(), reverse=True):
        if d.is_dir() and (d / "summary.json").exists():
            runs.append(d.name)
    return {"runs": runs}
