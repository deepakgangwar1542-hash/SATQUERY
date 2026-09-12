"""
SatQuery AI — Building Footprint Analysis Package.

Provides neural building segmentation, tiled inference, connected-component
instance extraction, and polygonization for satellite and aerial imagery.
"""
from backend.models.buildings.config import BuildingModelConfig
from backend.models.buildings.model import BuildingResUNet
from backend.models.buildings.postprocessing import (
    BuildingInstance,
    extract_building_instances,
)
from backend.models.buildings.tiling import (
    create_tile_grid,
    run_tiled_building_inference,
)
from backend.models.buildings.inference import (
    BuildingDetectionResult,
    BuildingSegmentationManager,
    get_building_manager,
)

__all__ = [
    "BuildingModelConfig",
    "BuildingResUNet",
    "BuildingInstance",
    "extract_building_instances",
    "create_tile_grid",
    "run_tiled_building_inference",
    "BuildingDetectionResult",
    "BuildingSegmentationManager",
    "get_building_manager",
]
