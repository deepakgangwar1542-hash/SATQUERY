"""
Dataset Adapters for Benchmark Evaluation.

Provides:
- BaseDatasetAdapter: Extensible interface for remote sensing benchmark datasets
- LocalDirectoryAdapter: Loads filesystem datasets (images, masks, cases.json)
- SyntheticBenchmarkAdapter: Standalone, deterministic test suite covering all core
  tasks and capability boundaries without requiring multi-gigabyte external downloads.
"""
from __future__ import annotations
from abc import ABC, abstractmethod
import base64
import io
import json
import logging
from pathlib import Path
from typing import List, Dict, Any, Optional
import numpy as np
from PIL import Image

from backend.benchmarking.schemas import BenchmarkCase, TaskType, GroundTruthType

logger = logging.getLogger("SatQuery.DatasetAdapter")


class BaseDatasetAdapter(ABC):
    """Abstract interface for benchmark dataset loaders."""

    @abstractmethod
    def load_cases(self, split: str = "test") -> List[BenchmarkCase]:
        """Loads and returns standardized benchmark cases."""
        pass

    @abstractmethod
    def get_dataset_name(self) -> str:
        """Returns the canonical dataset identifier."""
        pass


class LocalDirectoryAdapter(BaseDatasetAdapter):
    """Loads benchmark cases from a local folder containing cases.json or standard layout."""

    def __init__(self, root_dir: str | Path, name: str = "local_dataset"):
        self.root_dir = Path(root_dir)
        self.name = name

    def get_dataset_name(self) -> str:
        return self.name

    def load_cases(self, split: str = "test") -> List[BenchmarkCase]:
        cases: List[BenchmarkCase] = []
        cases_file = self.root_dir / "cases.json"

        if cases_file.exists():
            try:
                with open(cases_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    case_list = data if isinstance(data, list) else data.get("cases", [])
                    for item in case_list:
                        if item.get("split", "test") == split:
                            # Resolve relative image paths
                            imgs = []
                            for img_path in item.get("input_images", []):
                                p = self.root_dir / img_path if not Path(img_path).is_absolute() else Path(img_path)
                                imgs.append(str(p))
                            gt = item.get("ground_truth")
                            if gt and isinstance(gt, str) and not Path(gt).is_absolute():
                                gt = str(self.root_dir / gt)

                            case = BenchmarkCase(
                                case_id=item["case_id"],
                                task_type=TaskType(item["task_type"]),
                                query=item["query"],
                                input_images=imgs,
                                expected_sensor=item.get("expected_sensor"),
                                expected_capabilities=item.get("expected_capabilities", {}),
                                ground_truth=gt,
                                ground_truth_type=GroundTruthType(item.get("ground_truth_type", "binary_mask")),
                                expected_outputs=item.get("expected_outputs", {}),
                                split=split,
                                dataset_name=self.name,
                                metadata=item.get("metadata", {}),
                            )
                            cases.append(case)
            except Exception as exc:
                logger.error(f"Failed to read cases from {cases_file}: {exc}")

        return cases


def _create_synthetic_png_b64(width: int = 128, height: int = 128, color: tuple = (100, 150, 100)) -> str:
    """Generates an in-memory base64 encoded RGB test image."""
    img = Image.new("RGB", (width, height), color)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return f"data:image/png;base64,{base64.b64encode(buf.getvalue()).decode('utf-8')}"


def _create_synthetic_mask(width: int = 128, height: int = 128, box: tuple = (30, 30, 90, 90)) -> np.ndarray:
    """Generates an in-memory binary mask with a positive rectangular region."""
    arr = np.zeros((height, width), dtype=bool)
    x1, y1, x2, y2 = box
    arr[y1:y2, x1:x2] = True
    return arr


class SyntheticBenchmarkAdapter(BaseDatasetAdapter):
    """
    Provides a self-contained, repeatable benchmark suite of realistic synthetic cases.
    Evaluates:
    - Change detection
    - Building segmentation
    - Flood hazard analysis
    - Capability bounds (RGB asking for NDVI)
    - SAR sensor compatibility
    - Temporal single-image limitation
    - Verification failure detection
    """

    def __init__(self, name: str = "synthetic_eval_suite"):
        self.name = name

    def get_dataset_name(self) -> str:
        return self.name

    def load_cases(self, split: str = "test") -> List[BenchmarkCase]:
        # Generate base synthetic scenes
        t0_b64 = _create_synthetic_png_b64(128, 128, color=(70, 120, 70))
        t1_b64 = _create_synthetic_png_b64(128, 128, color=(140, 90, 60))
        t1_flood_b64 = _create_synthetic_png_b64(128, 128, color=(40, 70, 160))

        # Ground truth masks
        gt_change_mask = _create_synthetic_mask(128, 128, box=(32, 32, 96, 96))
        gt_bldg_mask = _create_synthetic_mask(128, 128, box=(20, 20, 60, 60))
        gt_flood_mask = _create_synthetic_mask(128, 128, box=(40, 40, 110, 110))

        cases: List[BenchmarkCase] = [
            # 1. Change Detection
            BenchmarkCase(
                case_id="synth_change_01",
                task_type=TaskType.CHANGE_DETECTION,
                query="Identify areas of land surface change between the two images.",
                input_images=[t0_b64, t1_b64],
                expected_sensor="optical",
                expected_capabilities={"has_temporal": True},
                ground_truth=gt_change_mask,
                ground_truth_type=GroundTruthType.BINARY_MASK,
                expected_outputs={"change_percentage_min": 15.0, "change_percentage_max": 35.0},
                split=split,
                dataset_name=self.name,
                metadata={"description": "Standard optical temporal differencing"},
            ),

            # 2. Building Segmentation
            BenchmarkCase(
                case_id="synth_bldg_01",
                task_type=TaskType.BUILDING_SEGMENTATION,
                query="Detect all building structures and footprints in the scene.",
                input_images=[t0_b64],
                expected_sensor="optical",
                expected_capabilities={"has_optical": True},
                ground_truth=gt_bldg_mask,
                ground_truth_type=GroundTruthType.BINARY_MASK,
                expected_outputs={"building_count": 4},
                split=split,
                dataset_name=self.name,
                metadata={"description": "Single-image building boundary extraction"},
            ),

            # 3. Flood Segmentation
            BenchmarkCase(
                case_id="synth_flood_01",
                task_type=TaskType.FLOOD_SEGMENTATION,
                query="Map flood water inundation across the scene.",
                input_images=[t0_b64, t1_flood_b64],
                expected_sensor="sentinel1",
                expected_capabilities={"has_temporal": True},
                ground_truth=gt_flood_mask,
                ground_truth_type=GroundTruthType.BINARY_MASK,
                expected_outputs={"flood_detected": True},
                split=split,
                dataset_name=self.name,
                metadata={"description": "Inundation extent detection"},
            ),

            # 4. Capability Enforcement: RGB input requesting NDVI
            BenchmarkCase(
                case_id="synth_cap_rgb_ndvi_01",
                task_type=TaskType.CAPABILITY_ENFORCEMENT,
                query="Calculate precise NDVI vegetation health from this RGB image.",
                input_images=[t0_b64],
                expected_sensor="RGB_Optical",
                expected_capabilities={"is_multispectral": False},
                ground_truth=None,  # No real NDVI can be calculated
                ground_truth_type=GroundTruthType.SCALAR_VALUE,
                expected_outputs={"should_reject_calculation": True},
                split=split,
                dataset_name=self.name,
                metadata={"description": "Verify system does not fake scientific NDVI on 3-band RGB"},
            ),

            # 5. Temporal Capability: Single image requesting change
            BenchmarkCase(
                case_id="synth_cap_single_change_01",
                task_type=TaskType.CAPABILITY_ENFORCEMENT,
                query="What changed between the two dates?",
                input_images=[t0_b64],  # Only 1 image supplied!
                expected_sensor="optical",
                expected_capabilities={"has_temporal": False},
                ground_truth=None,
                ground_truth_type=GroundTruthType.BINARY_MASK,
                expected_outputs={"should_report_missing_temporal": True},
                split=split,
                dataset_name=self.name,
                metadata={"description": "Verify bi-temporal requirement enforcement"},
            ),

            # 6. Verification Integrity: Impossible percentage
            BenchmarkCase(
                case_id="synth_verif_bounds_01",
                task_type=TaskType.VERIFICATION,
                query="Analyze area change percentage.",
                input_images=[t0_b64, t1_b64],
                expected_sensor="optical",
                expected_capabilities={"has_temporal": True},
                ground_truth=gt_change_mask,
                ground_truth_type=GroundTruthType.BINARY_MASK,
                expected_outputs={"verification_must_pass": True},
                split=split,
                dataset_name=self.name,
                metadata={"description": "Integrity check for valid percentage bounds"},
            ),
        ]
        return cases
