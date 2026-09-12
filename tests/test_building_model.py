"""
Unit Tests for Building Footprint Segmentation Model & Tiling Engine — SatQuery AI.
"""
import pytest
import numpy as np
import torch
from pathlib import Path

from backend.models.buildings.model import BuildingResUNet
from backend.models.buildings.config import BuildingModelConfig
from backend.models.buildings.tiling import (
    create_tile_grid,
    generate_hann_window_2d,
    run_tiled_building_inference,
)
from backend.models.buildings.postprocessing import (
    extract_building_instances,
    BuildingInstance,
)
from backend.models.buildings.inference import (
    BuildingSegmentationManager,
    BuildingDetectionResult,
)


class TestBuildingModelArchitecture:
    def test_unet_forward_pass(self):
        model = BuildingResUNet(in_channels=3, num_classes=1)
        model.eval()
        x = torch.randn(1, 3, 64, 64)
        with torch.no_grad():
            out = model(x)
        assert out.shape == (1, 1, 64, 64)
        assert not torch.isnan(out).any()


class TestTiledInferenceEngine:
    def test_tile_grid_generation(self):
        tiles = create_tile_grid(height=300, width=400, tile_size=256, overlap=64)
        assert len(tiles) >= 4
        # Verify coverage of corners
        y1s = [t[0] for t in tiles]
        x1s = [t[1] for t in tiles]
        assert 0 in y1s
        assert 0 in x1s

    def test_tiled_inference_stitching(self):
        model = BuildingResUNet(in_channels=3, num_classes=1)
        model.eval()
        arr = np.random.rand(128, 128, 3).astype(np.float32)
        prob = run_tiled_building_inference(
            model=model,
            image_arr=arr,
            tile_size=64,
            overlap=16,
            device=torch.device("cpu"),
        )
        assert prob.shape == (128, 128)
        assert 0.0 <= np.min(prob) <= 1.0
        assert 0.0 <= np.max(prob) <= 1.0


class TestInstanceExtraction:
    def test_extract_instances_two_buildings(self):
        # Create a 50x50 canvas with two separated 10x10 squares
        mask = np.zeros((50, 50), dtype=bool)
        mask[5:15, 5:15] = True    # Building 1: Area 100
        mask[30:40, 30:40] = True  # Building 2: Area 100

        instances = extract_building_instances(mask, min_area_pixels=16)
        assert len(instances) == 2
        assert instances[0].building_id == "building_001"
        assert instances[1].building_id == "building_002"
        assert instances[0].pixel_area == 100
        assert instances[1].pixel_area == 100
        assert instances[0].polygon_pixel.is_valid
        assert instances[1].polygon_pixel.is_valid

    def test_noise_filtering_below_min_area(self):
        mask = np.zeros((50, 50), dtype=bool)
        mask[5:7, 5:7] = True  # Tiny 4-pixel noise cluster
        instances = extract_building_instances(mask, min_area_pixels=16)
        assert len(instances) == 0


class TestBuildingSegmentationManager:
    def test_missing_checkpoint_returns_unavailable(self):
        cfg = BuildingModelConfig(checkpoint_path="/nonexistent/path/weights.pth")
        manager = BuildingSegmentationManager(config=cfg)
        arr = np.random.rand(64, 64, 3).astype(np.float32)
        res = manager.detect_buildings(arr)
        assert res.success is False
        assert res.status == "building_model_unavailable"
        assert res.building_count is None
        assert "not available" in res.reason

    def test_inference_with_weights(self, tmp_path):
        ckpt_path = tmp_path / "test_building.pth"
        model = BuildingResUNet(in_channels=3, num_classes=1)
        torch.save(model.state_dict(), ckpt_path)

        cfg = BuildingModelConfig(
            checkpoint_path=str(ckpt_path),
            tile_size=64,
            tile_overlap=16,
            min_building_area_pixels=8,
        )
        manager = BuildingSegmentationManager(config=cfg)
        model.to(manager.device)
        manager._model = model
        manager._loaded_checkpoint = str(ckpt_path)

        # Create synthetic imagery with a high-contrast square
        arr = np.zeros((64, 64, 3), dtype=np.float32)
        arr[20:40, 20:40, :] = 1.0  # Synthetic building-like patch

        res = manager.detect_buildings(arr)
        assert res.success is True
        assert res.status == "success"
        assert res.building_mask is not None
        assert res.building_mask.shape == (64, 64)
        assert isinstance(res.building_count, int)
