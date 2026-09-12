"""
Building Segmentation Manager & Inference Interface — SatQuery AI.

Orchestrates building footprint extraction:
  1. Checkpoint discovery & hardware target assignment
  2. Input imagery validation (dimensions, bands, datatypes)
  3. Memory-safe tiled inference
  4. Probability thresholding & binary mask generation
  5. Connected component instance extraction & polygonization
"""
from __future__ import annotations
import logging
import time
from typing import Optional, Dict, Any, List, Tuple
import numpy as np
import torch

from backend.models.buildings.config import BuildingModelConfig
from backend.models.buildings.model import BuildingResUNet
from backend.models.buildings.tiling import run_tiled_building_inference
from backend.models.buildings.postprocessing import extract_building_instances, BuildingInstance
from backend.services.imagery.normalization import to_preprocessed_float

logger = logging.getLogger("SatQuery.BuildingSegmentation")


class BuildingDetectionResult:
    """Structured container for building segmentation inference outcomes."""
    def __init__(
        self,
        success: bool,
        status: str,
        reason: Optional[str] = None,
        building_mask: Optional[np.ndarray] = None,
        building_probability: Optional[np.ndarray] = None,
        building_instances: Optional[List[BuildingInstance]] = None,
        building_count: Optional[int] = None,
        metadata: Optional[Dict[str, Any]] = None,
    ):
        self.success = success
        self.status = status
        self.reason = reason
        self.building_mask = building_mask
        self.building_probability = building_probability
        self.building_instances = building_instances or []
        self.building_count = building_count
        self.metadata = metadata or {}

    def to_dict(self) -> Dict[str, Any]:
        return {
            "success": self.success,
            "status": self.status,
            "reason": self.reason,
            "building_count": self.building_count,
            "building_instances": [b.to_dict() for b in self.building_instances],
            "metadata": self.metadata,
        }


class BuildingSegmentationManager:
    """
    Singleton / Cached model manager for satellite building footprint detection.
    Loads neural network weights once and reuses the model across inferences.
    """
    _instance: Optional[BuildingSegmentationManager] = None

    def __init__(self, config: Optional[BuildingModelConfig] = None):
        self.config = config or BuildingModelConfig()
        self._model: Optional[BuildingResUNet] = None
        self._loaded_checkpoint: Optional[str] = None
        self.device = torch.device(self.config.device)

    @classmethod
    def get_instance(cls, config: Optional[BuildingModelConfig] = None) -> BuildingSegmentationManager:
        if cls._instance is None:
            cls._instance = BuildingSegmentationManager(config)
        return cls._instance

    @property
    def is_available(self) -> bool:
        return self.config.checkpoint_exists or self._model is not None

    def load_model(self, force_reload: bool = False) -> Tuple[bool, Optional[str]]:
        if self._model is not None and not force_reload:
            return True, None

        if not self.config.checkpoint_exists:
            msg = f"Building segmentation checkpoint not found at '{self.config.checkpoint_path}'."
            logger.info(f"[SatQuery] {msg}")
            return False, msg

        try:
            logger.info(f"[SatQuery] Loading building segmentation weights from {self.config.checkpoint_path} to {self.device}...")
            model = BuildingResUNet(in_channels=3, num_classes=1)
            state_dict = torch.load(self.config.checkpoint_path, map_location=self.device)

            if "state_dict" in state_dict:
                state_dict = state_dict["state_dict"]
            elif "model" in state_dict:
                state_dict = state_dict["model"]

            clean_state = {k.replace("module.", ""): v for k, v in state_dict.items()}
            model.load_state_dict(clean_state, strict=False)
            model.to(self.device)
            model.eval()

            self._model = model
            self._loaded_checkpoint = str(self.config.checkpoint_path)
            logger.info(f"[SatQuery] Building model ({self.config.model_name}) successfully loaded on {self.device}.")
            return True, None
        except Exception as exc:
            err = f"Failed to load building model: {str(exc)}"
            logger.warning(f"[SatQuery] {err}")
            self._model = None
            return False, err

    def detect_buildings(
        self,
        image_arr: np.ndarray,
        transform: Optional[List[float]] = None,
        crs: Optional[str] = None,
        resolution: Optional[List[float]] = None,
        valid_mask: Optional[np.ndarray] = None,
    ) -> BuildingDetectionResult:
        """
        Runs tiled neural building segmentation on an image array.

        Returns BuildingDetectionResult containing:
          - success: bool
          - status: str ('success' | 'building_model_unavailable' | 'unsupported_input')
          - building_mask: (H, W) boolean mask
          - building_instances: List[BuildingInstance] with Shapely geometries
          - building_count: int
        """
        t0 = time.perf_counter()

        # 1. Checkpoint availability check
        if not self.is_available:
            return BuildingDetectionResult(
                success=False,
                status="building_model_unavailable",
                reason=(
                    f"Building segmentation checkpoint is not available at '{self.config.checkpoint_path}'. "
                    "Configure BUILDING_CHECKPOINT with valid weights to enable neural building footprint analysis."
                ),
                building_count=None,
            )

        # 2. Model loading
        loaded, err = self.load_model()
        if not loaded or self._model is None:
            return BuildingDetectionResult(
                success=False,
                status="building_model_unavailable",
                reason=err or "Building model loading failed.",
                building_count=None,
            )

        # 3. Input channel validation
        c = image_arr.shape[2] if image_arr.ndim == 3 else 1
        if c < 3:
            return BuildingDetectionResult(
                success=False,
                status="unsupported_input",
                reason=f"Building segmentation expects 3-channel RGB imagery; received {c} channel(s).",
                building_count=None,
            )

        # Convert to float [0.0, 1.0] RGB
        rgb_img = to_preprocessed_float(image_arr[:, :, :3], data_type="rgb")
        h, w = rgb_img.shape[:2]

        # 4. Tiled Neural Inference
        try:
            model_device = next(self._model.parameters()).device
            prob_map = run_tiled_building_inference(
                model=self._model,
                image_arr=rgb_img,
                tile_size=self.config.tile_size,
                overlap=self.config.tile_overlap,
                device=model_device,
            )
        except Exception as exc:
            return BuildingDetectionResult(
                success=False,
                status="inference_error",
                reason=f"Building tiled inference failed: {str(exc)}",
                building_count=None,
            )

        # 5. Thresholding & Valid Pixel Mask Gating
        threshold = self.config.building_threshold
        binary_mask = (prob_map >= threshold)

        if valid_mask is not None:
            if valid_mask.shape == (h, w):
                binary_mask &= valid_mask

        # 6. Instance Extraction & Polygonization
        instances = extract_building_instances(
            binary_mask=binary_mask,
            min_area_pixels=self.config.min_building_area_pixels,
            transform=transform,
            crs=crs,
            resolution=resolution,
        )

        elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)

        return BuildingDetectionResult(
            success=True,
            status="success",
            building_mask=binary_mask,
            building_probability=prob_map,
            building_instances=instances,
            building_count=len(instances),
            metadata={
                "model": self.config.model_name,
                "checkpoint": self._loaded_checkpoint,
                "device": str(self.device),
                "threshold": threshold,
                "min_building_area_pixels": self.config.min_building_area_pixels,
                "total_instances_extracted": len(instances),
                "georeferenced": crs is not None,
                "crs": crs,
                "inference_time_ms": elapsed_ms,
            },
        )


def get_building_manager(config: Optional[BuildingModelConfig] = None) -> BuildingSegmentationManager:
    return BuildingSegmentationManager.get_instance(config)
