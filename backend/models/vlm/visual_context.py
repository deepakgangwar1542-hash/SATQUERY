"""
Visual Context Generator for Multimodal Semantic Reasoning (VLM).

Generates temporary, non-destructive visual context overlays for VLM grounding:
- Base optical / temporal pair (T0, T1)
- ChangeFormer mask overlay
- Building footprint overlay
- SAM / SAM2 precision boundary overlay

Preserves all source imagery without modifying original files.
"""
from __future__ import annotations
import base64
import io
import logging
from typing import Dict, Any, Optional, List
import numpy as np
from PIL import Image

logger = logging.getLogger("SatQuery.VisualContext")


def decode_image_b64(b64_str: str) -> Optional[np.ndarray]:
    """Decodes a base64 string to RGB numpy array."""
    if not b64_str:
        return None
    try:
        if "," in b64_str:
            b64_str = b64_str.split(",", 1)[1]
        raw_bytes = base64.b64decode(b64_str)
        img = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
        return np.array(img, dtype=np.uint8)
    except Exception as exc:
        logger.warning(f"Failed to decode base64 image: {exc}")
        return None


def encode_image_b64(arr: np.ndarray, format: str = "PNG") -> str:
    """Encodes an RGB numpy array to base64 data URI."""
    img = Image.fromarray(arr.astype(np.uint8))
    buf = io.BytesIO()
    img.save(buf, format=format)
    b64 = base64.b64encode(buf.getvalue()).decode("utf-8")
    return f"data:image/{format.lower()};base64,{b64}"


def create_mask_overlay(
    base_img: np.ndarray,
    binary_mask: np.ndarray,
    color_rgb: tuple = (255, 60, 60),
    alpha: float = 0.45
) -> np.ndarray:
    """Blends a binary mask onto base_img using specified RGB tint."""
    h, w, _ = base_img.shape
    if binary_mask.shape[:2] != (h, w):
        # Resize mask to base image
        pil_mask = Image.fromarray((binary_mask > 0).astype(np.uint8) * 255)
        pil_mask = pil_mask.resize((w, h), Image.NEAREST)
        mask_bool = np.array(pil_mask) > 0
    else:
        mask_bool = binary_mask > 0

    overlay = base_img.copy().astype(np.float32)
    tint = np.array(color_rgb, dtype=np.float32)
    overlay[mask_bool] = (1.0 - alpha) * overlay[mask_bool] + alpha * tint
    return np.clip(overlay, 0, 255).astype(np.uint8)


class VisualContextGenerator:
    """
    Assembles minimal, high-value visual context artifacts for VLM interpretation.
    """

    @staticmethod
    def build_visual_package(
        task: str,
        image_b64: Optional[str] = None,
        image2_b64: Optional[str] = None,
        change_mask: Optional[np.ndarray] = None,
        building_mask: Optional[np.ndarray] = None,
        sam_mask: Optional[np.ndarray] = None,
    ) -> Dict[str, Any]:
        """
        Creates a dictionary of visual artifacts relevant to the specific task.
        Does not create unnecessary overlays if masks are absent.
        """
        package: Dict[str, Any] = {
            "has_visual_context": False,
            "artifacts": {},
            "summary": "No visual context provided",
        }

        base_img = decode_image_b64(image_b64)
        if base_img is None:
            return package

        package["has_visual_context"] = True
        package["artifacts"]["t0_dimensions"] = f"{base_img.shape[1]}x{base_img.shape[0]}"

        # Secondary / Temporal image
        t1_img = decode_image_b64(image2_b64)
        if t1_img is not None:
            package["artifacts"]["has_temporal_pair"] = True
            package["artifacts"]["t1_dimensions"] = f"{t1_img.shape[1]}x{t1_img.shape[0]}"

        # Target image for overlay (prefer t1 for change tasks if available)
        target_base = t1_img if t1_img is not None else base_img

        # 1. Change overlay (Red)
        if change_mask is not None and np.any(change_mask > 0):
            overlay_change = create_mask_overlay(target_base, change_mask, color_rgb=(255, 50, 50), alpha=0.4)
            package["artifacts"]["change_overlay_b64"] = encode_image_b64(overlay_change)

        # 2. Building overlay (Cyan/Blue)
        if building_mask is not None and np.any(building_mask > 0):
            overlay_bldg = create_mask_overlay(target_base, building_mask, color_rgb=(0, 210, 255), alpha=0.35)
            package["artifacts"]["building_overlay_b64"] = encode_image_b64(overlay_bldg)

        # 3. SAM Precision overlay (Green/Emerald)
        if sam_mask is not None and np.any(sam_mask > 0):
            overlay_sam = create_mask_overlay(target_base, sam_mask, color_rgb=(16, 230, 110), alpha=0.45)
            package["artifacts"]["sam_overlay_b64"] = encode_image_b64(overlay_sam)

        package["summary"] = f"Visual context generated with {len(package['artifacts'])} artifact(s)."
        return package
