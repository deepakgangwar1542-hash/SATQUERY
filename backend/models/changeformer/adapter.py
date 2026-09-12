"""
ChangeFormer Input Adapter — SatQuery AI.

Converts SatQuery preprocessed imagery arrays into standardized PyTorch tensors
for ChangeFormer inference.
Verifies channel configuration against checkpoint expectations, refusing
incompatible modalities (such as raw multispectral arrays into RGB checkpoints)
with structured explanatory errors instead of silently fabricating or corrupting predictions.
"""
from __future__ import annotations
from typing import Tuple, Optional, Dict, Any
import numpy as np
import torch
import torch.nn.functional as F

from backend.services.imagery.normalization import normalize_for_model


def adapt_imagery_for_changeformer(
    arr0: np.ndarray,
    arr1: np.ndarray,
    expected_channels: int = 3,
    target_size: Tuple[int, int] = (256, 256),
    device: str = "cpu",
) -> Tuple[Optional[torch.Tensor], Optional[torch.Tensor], Optional[Dict[str, Any]]]:
    """
    Validates channels, normalizes, resizes, and converts image arrays
    to batched (1, C, H, W) PyTorch tensors.

    Returns:
      (t0_tensor, t1_tensor, error_dict)
      If channel mismatch occurs, returns (None, None, error_dict) where
      error_dict has status "unsupported_input".
    """
    # 1. Dimension and channel checks
    c0 = arr0.shape[2] if arr0.ndim == 3 else 1
    c1 = arr1.shape[2] if arr1.ndim == 3 else 1

    if c0 != expected_channels or c1 != expected_channels:
        actual_c = c0 if c0 == c1 else f"{c0}/{c1}"
        return None, None, {
            "success": False,
            "status": "unsupported_input",
            "reason": (
                f"The selected ChangeFormer checkpoint expects {expected_channels} channels "
                f"but the supplied imagery contains {actual_c} channels."
            ),
        }

    # 2. Extract standard 3 RGB channels if array has alpha channel
    a0 = arr0[:, :, :3] if (arr0.ndim == 3 and arr0.shape[2] >= 3) else arr0
    a1 = arr1[:, :, :3] if (arr1.ndim == 3 and arr1.shape[2] >= 3) else arr1

    # 3. Model normalization (ImageNet mean/std)
    norm0 = normalize_for_model(a0, method="imagenet", channel_axis=-1)
    norm1 = normalize_for_model(a1, method="imagenet", channel_axis=-1)

    # 4. Convert (H, W, C) -> (1, C, H, W) PyTorch tensors
    tensor0 = torch.from_numpy(np.moveaxis(norm0, -1, 0)).unsqueeze(0).float()
    tensor1 = torch.from_numpy(np.moveaxis(norm1, -1, 0)).unsqueeze(0).float()

    # 5. Resize to model receptive field (e.g. 256x256)
    if (tensor0.shape[2], tensor0.shape[3]) != target_size:
        tensor0 = F.interpolate(tensor0, size=target_size, mode="bilinear", align_corners=False)
        tensor1 = F.interpolate(tensor1, size=target_size, mode="bilinear", align_corners=False)

    # 6. Move to target device
    tensor0 = tensor0.to(device)
    tensor1 = tensor1.to(device)

    return tensor0, tensor1, None
