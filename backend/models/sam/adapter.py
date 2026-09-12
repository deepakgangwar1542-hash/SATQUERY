"""
SAM / SAM2 Model Adapter Interface — SatQuery AI.

Provides an abstract foundation segmentation interface supporting:
- SAM (Segment Anything Model, ViT-B/L/H)
- SAM2 (Segment Anything Model 2, Hiera architecture)
- Future segmentation models (zero-shot, interactive, prompt-guided)

Supports prompt types:
  1. Bounding box prompts [x_min, y_min, x_max, y_max]
  2. Point prompts [(x, y, label)]
  3. Candidate mask prompts (binary 2D array)
  4. Automatic segmentation mode

Integrity Policy:
  No fake results. If model checkpoints or required packages are missing,
  reports capability unavailability honestly with actionable diagnostic status.
"""
from __future__ import annotations
import abc
import logging
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple, Union
import numpy as np

logger = logging.getLogger("SatQuery.SAMAdapter")

_CHECKPOINT_DIR = Path(__file__).resolve().parent / "checkpoints"


@dataclass
class SegmentationPrompt:
    """
    Normalized prompt specification for SAM / SAM2 inference.
    """
    box: Optional[List[int]] = None  # [x_min, y_min, x_max, y_max] in pixel coordinates
    points: Optional[List[Tuple[int, int]]] = None  # [(x, y), ...]
    point_labels: Optional[List[int]] = None  # [1 (fg), 0 (bg)]
    mask_input: Optional[np.ndarray] = None  # Low-res or candidate binary mask
    region_id: Optional[str] = None  # Traceable candidate ID
    metadata: Dict[str, Any] = field(default_factory=dict)


@dataclass
class SegmentationResult:
    """
    Standardized result from SAM / SAM2 segmentation inference.
    """
    success: bool
    status: str  # "active", "checkpoint_unavailable", "execution_error", "unsupported_input"
    model_name: str
    model_version: str
    masks: List[np.ndarray] = field(default_factory=list)  # Binary boolean masks [H, W]
    scores: List[float] = field(default_factory=list)  # Estimated IoU / stability scores
    prompts_used: List[SegmentationPrompt] = field(default_factory=list)
    inference_time_ms: float = 0.0
    message: Optional[str] = None
    reason: Optional[str] = None
    diagnostics: Dict[str, Any] = field(default_factory=dict)


class SegmentationModel(abc.ABC):
    """
    Abstract interface for zero-shot and prompt-guided foundation segmentation models.
    """

    @property
    @abc.abstractmethod
    def model_name(self) -> str:
        """Name of the segmentation model."""
        pass

    @property
    @abc.abstractmethod
    def model_version(self) -> str:
        """Version or architecture variant."""
        pass

    @abc.abstractmethod
    def is_available(self) -> bool:
        """Returns True if model weights and runtime dependencies are available."""
        pass

    @abc.abstractmethod
    def segment(
        self,
        image_rgb: np.ndarray,
        prompts: Optional[List[SegmentationPrompt]] = None,
        multimask_output: bool = False,
    ) -> SegmentationResult:
        """
        Execute segmentation on optical RGB image using supplied prompts.

        Args:
            image_rgb: Optical RGB image array [H, W, 3] in uint8 [0, 255].
            prompts: Optional list of bounding box, point, or mask prompts.
            multimask_output: Whether to return multiple mask ambiguities.

        Returns:
            SegmentationResult containing binary masks, scores, and status.
        """
        pass


class SAMAdapter(SegmentationModel):
    """
    Adapter for SAM (Segment Anything Model, ViT-B / ViT-L / ViT-H).
    """

    def __init__(
        self,
        checkpoint_path: Optional[Union[str, Path]] = None,
        model_type: str = "vit_h",
    ):
        self._model_type = model_type
        self._checkpoint_path = Path(checkpoint_path) if checkpoint_path else self._discover_checkpoint()
        self._model = None
        self._predictor = None

    @property
    def model_name(self) -> str:
        return "SAM"

    @property
    def model_version(self) -> str:
        return self._model_type

    def _discover_checkpoint(self) -> Optional[Path]:
        if not _CHECKPOINT_DIR.exists():
            return None
        patterns = [f"sam_{self._model_type}*.pth", "sam_vit_*.pth", "*.pth", "*.pt"]
        for pat in patterns:
            matches = list(_CHECKPOINT_DIR.glob(pat))
            if matches:
                return matches[0]
        return None

    def is_available(self) -> bool:
        return self._checkpoint_path is not None and self._checkpoint_path.is_file()

    def segment(
        self,
        image_rgb: np.ndarray,
        prompts: Optional[List[SegmentationPrompt]] = None,
        multimask_output: bool = False,
    ) -> SegmentationResult:
        if not self.is_available():
            return SegmentationResult(
                success=False,
                status="checkpoint_unavailable",
                model_name=self.model_name,
                model_version=self.model_version,
                message=(
                    f"SAM checkpoint ({self._model_type}) not found at {_CHECKPOINT_DIR}. "
                    "Foundation precision refinement is inactive. "
                    "Domain specialist evidence will be used directly."
                ),
                reason="checkpoint_missing",
                diagnostics={"expected_path": str(_CHECKPOINT_DIR)},
            )

        # In production when weights and segment_anything library exist:
        try:
            from segment_anything import sam_model_registry, SamPredictor  # type: ignore
            if self._predictor is None:
                sam = sam_model_registry[self._model_type](checkpoint=str(self._checkpoint_path))
                self._predictor = SamPredictor(sam)

            self._predictor.set_image(image_rgb)
            out_masks: List[np.ndarray] = []
            out_scores: List[float] = []

            prompts_to_run = prompts or [SegmentationPrompt()]
            for p in prompts_to_run:
                box_np = np.array(p.box) if p.box else None
                pts_np = np.array(p.points) if p.points else None
                lbl_np = np.array(p.point_labels) if p.point_labels else None

                masks, scores, _ = self._predictor.predict(
                    point_coords=pts_np,
                    point_labels=lbl_np,
                    box=box_np,
                    mask_input=p.mask_input,
                    multimask_output=multimask_output,
                )
                best_idx = int(np.argmax(scores))
                out_masks.append(masks[best_idx].astype(bool))
                out_scores.append(float(scores[best_idx]))

            return SegmentationResult(
                success=True,
                status="active",
                model_name=self.model_name,
                model_version=self.model_version,
                masks=out_masks,
                scores=out_scores,
                prompts_used=prompts_to_run,
            )
        except Exception as exc:
            logger.warning(f"[SAMAdapter] Execution error: {exc}")
            return SegmentationResult(
                success=False,
                status="execution_error",
                model_name=self.model_name,
                model_version=self.model_version,
                message=f"SAM execution encountered an error: {exc}",
                reason=str(exc),
            )


class SAM2Adapter(SegmentationModel):
    """
    Adapter for SAM2 (Segment Anything Model 2, Hiera architecture).
    """

    def __init__(
        self,
        checkpoint_path: Optional[Union[str, Path]] = None,
        model_cfg: str = "sam2_hiera_l.yaml",
    ):
        self._model_cfg = model_cfg
        self._checkpoint_path = Path(checkpoint_path) if checkpoint_path else self._discover_checkpoint()
        self._predictor = None

    @property
    def model_name(self) -> str:
        return "SAM2"

    @property
    def model_version(self) -> str:
        return self._model_cfg

    def _discover_checkpoint(self) -> Optional[Path]:
        if not _CHECKPOINT_DIR.exists():
            return None
        patterns = ["sam2_*.pt", "sam2_*.pth", "*sam2*.pt"]
        for pat in patterns:
            matches = list(_CHECKPOINT_DIR.glob(pat))
            if matches:
                return matches[0]
        return None

    def is_available(self) -> bool:
        return self._checkpoint_path is not None and self._checkpoint_path.is_file()

    def segment(
        self,
        image_rgb: np.ndarray,
        prompts: Optional[List[SegmentationPrompt]] = None,
        multimask_output: bool = False,
    ) -> SegmentationResult:
        if not self.is_available():
            return SegmentationResult(
                success=False,
                status="checkpoint_unavailable",
                model_name=self.model_name,
                model_version=self.model_version,
                message=(
                    f"SAM2 checkpoint ({self._model_cfg}) not found at {_CHECKPOINT_DIR}. "
                    "Foundation precision refinement is inactive. "
                    "Domain specialist evidence will be used directly."
                ),
                reason="checkpoint_missing",
                diagnostics={"expected_path": str(_CHECKPOINT_DIR)},
            )

        try:
            from sam2.build_sam import build_sam2  # type: ignore
            from sam2.sam2_image_predictor import SAM2ImagePredictor  # type: ignore

            if self._predictor is None:
                model = build_sam2(self._model_cfg, str(self._checkpoint_path))
                self._predictor = SAM2ImagePredictor(model)

            self._predictor.set_image(image_rgb)
            out_masks: List[np.ndarray] = []
            out_scores: List[float] = []

            prompts_to_run = prompts or [SegmentationPrompt()]
            for p in prompts_to_run:
                box_np = np.array(p.box) if p.box else None
                pts_np = np.array(p.points) if p.points else None
                lbl_np = np.array(p.point_labels) if p.point_labels else None

                masks, scores, _ = self._predictor.predict(
                    point_coords=pts_np,
                    point_labels=lbl_np,
                    box=box_np,
                    mask_input=p.mask_input,
                    multimask_output=multimask_output,
                )
                best_idx = int(np.argmax(scores))
                out_masks.append(masks[best_idx].astype(bool))
                out_scores.append(float(scores[best_idx]))

            return SegmentationResult(
                success=True,
                status="active",
                model_name=self.model_name,
                model_version=self.model_version,
                masks=out_masks,
                scores=out_scores,
                prompts_used=prompts_to_run,
            )
        except Exception as exc:
            logger.warning(f"[SAM2Adapter] Execution error: {exc}")
            return SegmentationResult(
                success=False,
                status="execution_error",
                model_name=self.model_name,
                model_version=self.model_version,
                message=f"SAM2 execution encountered an error: {exc}",
                reason=str(exc),
            )


# Global adapter registry for extensibility (Phase 37)
_ADAPTER_REGISTRY: Dict[str, Any] = {
    "sam": SAMAdapter,
    "sam2": SAM2Adapter,
}


def register_segmentation_adapter(name: str, adapter_cls: Any) -> None:
    """Register a custom or future foundation segmentation model adapter."""
    _ADAPTER_REGISTRY[name.lower()] = adapter_cls


def get_segmentation_adapter(
    model_name: str = "sam2",
    checkpoint_path: Optional[Union[str, Path]] = None,
    **kwargs,
) -> SegmentationModel:
    """
    Factory function returning the appropriate foundation segmentation model adapter.
    Defaults to SAM2; falls back to SAM or registered adapters.
    """
    key = model_name.lower()
    adapter_cls = _ADAPTER_REGISTRY.get(key, SAM2Adapter)
    return adapter_cls(checkpoint_path=checkpoint_path, **kwargs)
