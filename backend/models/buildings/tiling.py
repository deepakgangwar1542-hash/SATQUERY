"""
Tiled Inference Engine — SatQuery AI.

Decomposes large satellite rasters into overlapping patches for memory-safe
GPU/CPU inference, merges tile probability predictions using 2D cosine/Hann
window blending to eliminate edge artifacts and boundary discontinuities.
"""
from __future__ import annotations
from typing import List, Tuple
import numpy as np
import torch
import torch.nn.functional as F

from backend.services.imagery.normalization import normalize_for_model


def create_tile_grid(
    height: int,
    width: int,
    tile_size: int = 256,
    overlap: int = 64,
) -> List[Tuple[int, int, int, int]]:
    """
    Computes (y1, x1, y2, x2) slices covering the entire image grid.
    Guarantees every pixel is covered with at least `overlap` px stride,
    handling edge boundaries without zero padding artifacts.
    """
    stride = max(1, tile_size - overlap)

    # Compute step positions
    y_steps = list(range(0, max(1, height - tile_size + 1), stride))
    if not y_steps or y_steps[-1] + tile_size < height:
        y_steps.append(max(0, height - tile_size))

    x_steps = list(range(0, max(1, width - tile_size + 1), stride))
    if not x_steps or x_steps[-1] + tile_size < width:
        x_steps.append(max(0, width - tile_size))

    tiles = []
    for y in y_steps:
        for x in x_steps:
            tiles.append((y, x, min(height, y + tile_size), min(width, x + tile_size)))

    return tiles


def generate_hann_window_2d(h: int, w: int) -> np.ndarray:
    """Generates a 2D Hann window for smooth tile blending."""
    wy = np.hanning(h)
    wx = np.hanning(w)
    # Avoid exact zero weights at borders
    wy = np.maximum(wy, 0.05)
    wx = np.maximum(wx, 0.05)
    window = np.outer(wy, wx).astype(np.float32)
    return window


def run_tiled_building_inference(
    model: torch.nn.Module,
    image_arr: np.ndarray,
    tile_size: int = 256,
    overlap: int = 64,
    device: torch.device = torch.device("cpu"),
    batch_size: int = 4,
) -> np.ndarray:
    """
    Runs tiled building footprint inference across large image arrays.

    Args:
      model: PyTorch model returning (B, 1, H, W) logits
      image_arr: (H, W, 3) float32 RGB array
      tile_size: width/height of tiles
      overlap: overlap in pixels
      device: target device (cuda / cpu)
      batch_size: tile batch size for model forward pass

    Returns:
      (H, W) float32 probability array in range [0.0, 1.0]
    """
    h, w = image_arr.shape[:2]

    # If image is smaller than tile_size, direct inference
    if h <= tile_size and w <= tile_size:
        pad_h = max(0, tile_size - h)
        pad_w = max(0, tile_size - w)
        img_padded = np.pad(image_arr, ((0, pad_h), (0, pad_w), (0, 0)), mode="reflect")
        norm = normalize_for_model(img_padded, method="imagenet", channel_axis=-1)
        inp = torch.from_numpy(np.moveaxis(norm, -1, 0)).unsqueeze(0).float().to(device)

        with torch.no_grad():
            logits = model(inp)
            prob = torch.sigmoid(logits)[0, 0].cpu().numpy()

        return prob[:h, :w].astype(np.float32)

    # Grid decomposition
    tiles = create_tile_grid(h, w, tile_size=tile_size, overlap=overlap)
    prob_canvas = np.zeros((h, w), dtype=np.float32)
    weight_canvas = np.zeros((h, w), dtype=np.float32)
    hann_window = generate_hann_window_2d(tile_size, tile_size)

    # Normalize whole image once for efficiency
    norm_img = normalize_for_model(image_arr, method="imagenet", channel_axis=-1)

    # Batch process tiles
    for i in range(0, len(tiles), batch_size):
        batch_tiles = tiles[i:i + batch_size]
        batch_tensors = []

        for y1, x1, y2, x2 in batch_tiles:
            patch = norm_img[y1:y2, x1:x2]
            ph, pw = patch.shape[:2]
            if ph < tile_size or pw < tile_size:
                patch = np.pad(patch, ((0, tile_size - ph), (0, tile_size - pw), (0, 0)), mode="reflect")

            tensor = torch.from_numpy(np.moveaxis(patch, -1, 0)).float()
            batch_tensors.append(tensor)

        inp_batch = torch.stack(batch_tensors, dim=0).to(device)

        with torch.no_grad():
            logits_batch = model(inp_batch)
            probs_batch = torch.sigmoid(logits_batch)[:, 0].cpu().numpy()

        for b_idx, (y1, x1, y2, x2) in enumerate(batch_tiles):
            th = y2 - y1
            tw = x2 - x1
            tile_prob = probs_batch[b_idx][:th, :tw]
            tile_weight = hann_window[:th, :tw]

            prob_canvas[y1:y2, x1:x2] += tile_prob * tile_weight
            weight_canvas[y1:y2, x1:x2] += tile_weight

    # Normalize by accumulated weights
    weight_canvas = np.maximum(weight_canvas, 1e-6)
    full_probability = prob_canvas / weight_canvas
    return np.clip(full_probability, 0.0, 1.0).astype(np.float32)
