"""
Building Model Configuration — SatQuery AI.

Configuration parameters for geospatial building footprint segmentation,
tiling, connected component extraction, and spatial flood overlap criteria.
Supports configuration via environment variables:
  - BUILDING_MODEL: Model architecture identifier (default: 'BuildingResUNet-SpaceNet')
  - BUILDING_CHECKPOINT: Path to pretrained model weights (.pth / .pt)
  - BUILDING_DEVICE: Hardware target ('cuda', 'cpu', or 'auto')
  - BUILDING_THRESHOLD: Sigmoid probability threshold for binary mask (default: 0.5)
  - MIN_BUILDING_AREA_PIXELS: Minimum pixel count to constitute a building instance (default: 16)
  - BUILDING_FLOOD_OVERLAP_THRESHOLD: Minimum fraction of building footprint submerged to count as affected (default: 0.10)
"""
from __future__ import annotations
import os
from pathlib import Path
from typing import Tuple, Optional
import torch

DEFAULT_BUILDING_WEIGHTS_DIR = Path(__file__).resolve().parent / "weights"
DEFAULT_BUILDING_CHECKPOINT = DEFAULT_BUILDING_WEIGHTS_DIR / "building_unet.pth"


class BuildingModelConfig:
    def __init__(
        self,
        model_name: Optional[str] = None,
        checkpoint_path: Optional[str] = None,
        device: Optional[str] = None,
        input_size: Tuple[int, int] = (256, 256),
        tile_size: int = 256,
        tile_overlap: int = 64,
        building_threshold: Optional[float] = None,
        min_building_area_pixels: Optional[int] = None,
        flood_overlap_threshold: Optional[float] = None,
        spatial_overlap_threshold: Optional[float] = None,
    ):
        self.model_name = model_name or os.environ.get("BUILDING_MODEL", "BuildingResUNet-SpaceNet")

        env_ckpt = os.environ.get("BUILDING_CHECKPOINT")
        if checkpoint_path:
            self.checkpoint_path = Path(checkpoint_path)
        elif env_ckpt:
            self.checkpoint_path = Path(env_ckpt)
        else:
            self.checkpoint_path = DEFAULT_BUILDING_CHECKPOINT

        env_device = os.environ.get("BUILDING_DEVICE", "auto").lower()
        if device:
            self.device = device
        elif env_device in ("cuda", "gpu") and torch.cuda.is_available():
            self.device = "cuda"
        elif env_device == "cpu":
            self.device = "cpu"
        else:
            self.device = "cuda" if torch.cuda.is_available() else "cpu"

        self.input_size = input_size
        self.tile_size = tile_size
        self.tile_overlap = tile_overlap

        # Probability threshold
        env_thresh = os.environ.get("BUILDING_THRESHOLD")
        self.building_threshold = float(building_threshold if building_threshold is not None else (env_thresh or 0.5))

        # Minimum building area
        env_min_area = os.environ.get("MIN_BUILDING_AREA_PIXELS")
        self.min_building_area_pixels = int(min_building_area_pixels if min_building_area_pixels is not None else (env_min_area or 16))

        # Generic spatial overlap threshold for intersection with downstream masks (flood, fire, change)
        env_overlap = os.environ.get("BUILDING_SPATIAL_OVERLAP_THRESHOLD") or os.environ.get("BUILDING_FLOOD_OVERLAP_THRESHOLD")
        val = spatial_overlap_threshold if spatial_overlap_threshold is not None else flood_overlap_threshold
        self.spatial_overlap_threshold = float(val if val is not None else (env_overlap or 0.10))
        self.flood_overlap_threshold = self.spatial_overlap_threshold

    @property
    def checkpoint_exists(self) -> bool:
        return self.checkpoint_path is not None and self.checkpoint_path.is_file()

    def to_dict(self) -> dict:
        return {
            "model_name": self.model_name,
            "checkpoint_path": str(self.checkpoint_path),
            "checkpoint_exists": self.checkpoint_exists,
            "device": self.device,
            "input_size": list(self.input_size),
            "tile_size": self.tile_size,
            "tile_overlap": self.tile_overlap,
            "building_threshold": self.building_threshold,
            "min_building_area_pixels": self.min_building_area_pixels,
            "flood_overlap_threshold": self.flood_overlap_threshold,
        }
