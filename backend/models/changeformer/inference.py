"""
ChangeFormer Inference & Checkpoint Manager — SatQuery AI.

Manages model lifecycle, hardware target allocation (CUDA/CPU),
checkpoint loading, neural network forward evaluation, probability computation,
valid-mask gating, and change metric extraction.
"""
from __future__ import annotations
import logging
import os
import time
from typing import Optional, Dict, Any, Tuple, List
import numpy as np
import torch
import torch.nn.functional as F

from backend.models.changeformer.config import ChangeFormerConfig
from backend.models.changeformer.model import ChangeFormer
from backend.models.changeformer.adapter import adapt_imagery_for_changeformer

logger = logging.getLogger("SatQuery.ChangeFormer")


class ChangeFormerInferenceManager:
    """
    Singleton / Cached model manager for ChangeFormer.
    Loads neural network weights once, caches model in GPU/CPU memory,
    and handles graceful fallback if checkpoint is missing or corrupt.
    """
    _instance: Optional[ChangeFormerInferenceManager] = None

    def __init__(self, config: Optional[ChangeFormerConfig] = None):
        self.config = config or ChangeFormerConfig()
        self._model: Optional[ChangeFormer] = None
        self._loaded_checkpoint: Optional[str] = None
        self._load_error: Optional[str] = None
        self.device = torch.device(self.config.device)

    @classmethod
    def get_instance(cls, config: Optional[ChangeFormerConfig] = None) -> ChangeFormerInferenceManager:
        if cls._instance is None:
            cls._instance = ChangeFormerInferenceManager(config)
        return cls._instance

    @property
    def is_available(self) -> bool:
        """Returns True only if a valid checkpoint is present on disk or model is initialized."""
        return self.config.checkpoint_exists

    def load_model(self, force_reload: bool = False) -> Tuple[bool, Optional[str]]:
        """
        Loads ChangeFormer model onto the target hardware device.
        Never crashes the application if checkpoint is missing; returns structured status.
        """
        if self._model is not None and not force_reload:
            return True, None

        if not self.config.checkpoint_exists:
            self._load_error = f"ChangeFormer checkpoint not found at: {self.config.checkpoint_path}"
            logger.info(f"[SatQuery] {self._load_error}")
            return False, self._load_error

        try:
            logger.info(f"[SatQuery] Loading ChangeFormer checkpoint from {self.config.checkpoint_path} to {self.device}...")
            model = ChangeFormer(
                in_chans=self.config.in_channels,
                num_classes=self.config.num_classes,
            )
            state_dict = torch.load(self.config.checkpoint_path, map_location=self.device)
            # Handle state dict wrapping
            if "state_dict" in state_dict:
                state_dict = state_dict["state_dict"]
            elif "model" in state_dict:
                state_dict = state_dict["model"]

            # Strip 'module.' prefix if saved from DataParallel
            clean_state = {}
            for k, v in state_dict.items():
                new_k = k.replace("module.", "")
                clean_state[new_k] = v

            model.load_state_dict(clean_state, strict=False)
            model.to(self.device)
            model.eval()

            self._model = model
            self._loaded_checkpoint = str(self.config.checkpoint_path)
            self._load_error = None
            logger.info(f"[SatQuery] ChangeFormer successfully loaded onto {self.device}.")
            return True, None
        except Exception as exc:
            self._load_error = f"Failed to load ChangeFormer checkpoint: {str(exc)}"
            logger.warning(f"[SatQuery] {self._load_error}")
            self._model = None
            return False, self._load_error

    def detect_change(
        self,
        aligned_t0: np.ndarray,
        aligned_t1: np.ndarray,
        valid_mask: Optional[np.ndarray] = None,
        polygon_mask: Optional[np.ndarray] = None,
    ) -> Dict[str, Any]:
        """
        Performs real ChangeFormer neural network inference on an aligned image pair.

        Returns structured dictionary containing:
          - success: bool
          - status: str ('success' | 'checkpoint_missing' | 'unsupported_input' | 'inference_error')
          - change_probability: np.ndarray (H, W) float32
          - change_mask: np.ndarray (H, W) bool
          - changed_pixel_count: int
          - valid_pixel_count: int
          - change_percentage: float
          - bbox: Optional[List[int]]
          - metadata: dict
        """
        t_start = time.perf_counter()
        orig_h, orig_w = aligned_t0.shape[:2]

        # 1. Checkpoint verification
        if not self.config.checkpoint_exists:
            return {
                "success": False,
                "status": "checkpoint_missing",
                "reason": (
                    f"ChangeFormer model checkpoint is not present at '{self.config.checkpoint_path}'. "
                    "Configure CHANGEFORMER_CHECKPOINT or place weights to enable neural change detection."
                ),
            }

        # 2. Ensure model is loaded
        loaded, err = self.load_model()
        if not loaded or self._model is None:
            return {
                "success": False,
                "status": "load_failure",
                "reason": err or "Failed to load model.",
            }

        # 3. Adapt imagery to model tensors
        model_device = next(self._model.parameters()).device
        t0_tensor, t1_tensor, adapt_err = adapt_imagery_for_changeformer(
            arr0=aligned_t0,
            arr1=aligned_t1,
            expected_channels=self.config.in_channels,
            target_size=self.config.input_size,
            device=str(model_device),
        )
        if adapt_err is not None:
            return adapt_err

        # 4. Neural network forward pass
        try:
            with torch.no_grad():
                logits = self._model(t0_tensor, t1_tensor)  # (1, 2, H_tgt, W_tgt)
                # Resample logits to original aligned resolution
                if logits.shape[2:] != (orig_h, orig_w):
                    logits = F.interpolate(logits, size=(orig_h, orig_w), mode="bilinear", align_corners=False)

                probs = F.softmax(logits, dim=1)
                change_prob = probs[0, 1].cpu().numpy().astype(np.float32)  # Probability of change class
        except Exception as exc:
            return {
                "success": False,
                "status": "inference_error",
                "reason": f"ChangeFormer forward evaluation failed: {str(exc)}",
            }

        # 5. Mask post-processing
        threshold = self.config.threshold
        raw_change_mask = (change_prob >= threshold)

        # Apply valid-pixel mask
        effective_mask = np.ones((orig_h, orig_w), dtype=bool)
        if valid_mask is not None:
            effective_mask &= valid_mask

        # Apply polygon ROI mask
        roi_applied = False
        if polygon_mask is not None:
            effective_mask &= polygon_mask
            roi_applied = True

        # Final filtered change mask
        final_change_mask = raw_change_mask & effective_mask
        valid_pixel_count = max(1, int(np.sum(effective_mask)))
        changed_pixel_count = int(np.sum(final_change_mask))
        change_percentage = round((changed_pixel_count / valid_pixel_count) * 100.0, 2)

        # 6. Bounding box computation for prominent change clusters
        bbox = None
        if changed_pixel_count > self.config.min_cluster_pixels:
            ys, xs = np.where(final_change_mask)
            if len(ys) > 0 and len(xs) > 0:
                scale_y = 512.0 / orig_h
                scale_x = 512.0 / orig_w
                bbox = [
                    int(np.percentile(ys, 5) * scale_y),
                    int(np.percentile(xs, 5) * scale_x),
                    int(np.percentile(ys, 95) * scale_y),
                    int(np.percentile(xs, 95) * scale_x),
                ]

        elapsed_ms = round((time.perf_counter() - t_start) * 1000, 1)

        return {
            "success": True,
            "status": "success",
            "change_mask": final_change_mask,
            "change_probability": change_prob,
            "changed_pixel_count": changed_pixel_count,
            "valid_pixel_count": valid_pixel_count,
            "change_percentage": change_percentage,
            "bbox": bbox,
            "metadata": {
                "model_name": "ChangeFormer (Siamese Transformer)",
                "checkpoint": self._loaded_checkpoint,
                "device": str(self.device),
                "threshold": threshold,
                "inference_time_ms": elapsed_ms,
                "input_resolution": [orig_w, orig_h],
                "roi_applied": roi_applied,
            },
        }


def get_changeformer_manager(config: Optional[ChangeFormerConfig] = None) -> ChangeFormerInferenceManager:
    return ChangeFormerInferenceManager.get_instance(config)
