"""
ChangeFormer Configuration — SatQuery AI.

Defines model hyper-parameters, checkpoint paths, device selection,
and inference thresholds.
Supports runtime configuration via environment variables:
  - CHANGEFORMER_CHECKPOINT: Path to .pth / .pt model weights
  - CHANGEFORMER_THRESHOLD: Decision boundary for change probability (default: 0.5)
  - CHANGEFORMER_DEVICE: Override hardware target ('cuda', 'cpu', or 'auto')
"""
from __future__ import annotations
import os
from pathlib import Path
from typing import Tuple, Optional
import torch


DEFAULT_CHECKPOINT_DIR = Path(__file__).resolve().parent / "weights"
DEFAULT_CHECKPOINT_PATH = DEFAULT_CHECKPOINT_DIR / "changeformer.pth"


class ChangeFormerConfig:
    def __init__(
        self,
        checkpoint_path: Optional[str] = None,
        threshold: Optional[float] = None,
        device: Optional[str] = None,
        input_size: Tuple[int, int] = (256, 256),
        in_channels: int = 3,
        num_classes: int = 2,
        min_cluster_pixels: int = 16,
    ):
        # 1. Checkpoint resolution
        env_ckpt = os.environ.get("CHANGEFORMER_CHECKPOINT")
        if checkpoint_path:
            self.checkpoint_path = Path(checkpoint_path)
        elif env_ckpt:
            self.checkpoint_path = Path(env_ckpt)
        else:
            self.checkpoint_path = DEFAULT_CHECKPOINT_PATH

        # 2. Probability threshold
        env_thresh = os.environ.get("CHANGEFORMER_THRESHOLD")
        if threshold is not None:
            self.threshold = float(threshold)
        elif env_thresh:
            try:
                self.threshold = float(env_thresh)
            except ValueError:
                self.threshold = 0.5
        else:
            self.threshold = 0.5

        # 3. Hardware target
        env_device = os.environ.get("CHANGEFORMER_DEVICE", "auto").lower()
        if device:
            self.device = device
        elif env_device in ("cuda", "gpu") and torch.cuda.is_available():
            self.device = "cuda"
        elif env_device == "cpu":
            self.device = "cpu"
        else:
            self.device = "cuda" if torch.cuda.is_available() else "cpu"

        self.input_size = input_size
        self.in_channels = in_channels
        self.num_classes = num_classes
        self.min_cluster_pixels = min_cluster_pixels

    @property
    def checkpoint_exists(self) -> bool:
        return self.checkpoint_path is not None and self.checkpoint_path.is_file()

    def to_dict(self) -> dict:
        return {
            "checkpoint_path": str(self.checkpoint_path),
            "checkpoint_exists": self.checkpoint_exists,
            "threshold": self.threshold,
            "device": self.device,
            "input_size": list(self.input_size),
            "in_channels": self.in_channels,
            "num_classes": self.num_classes,
        }
