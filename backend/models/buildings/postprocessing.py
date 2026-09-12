"""
Building Instance Extraction & Vector Polygonization — SatQuery AI.

Transforms raw building probability masks into discrete, identifiable building
instances using 8-connected component analysis, minimum area filtering,
and Shapely vector polygonization. Preserves geographic CRS and affine coordinates
when available, avoiding pixel-count conflation.
"""
from __future__ import annotations
from typing import List, Dict, Any, Optional, Tuple
import numpy as np
from scipy.ndimage import label, find_objects
import shapely
from shapely.geometry import Polygon, MultiPolygon, shape
import rasterio.features
from rasterio.transform import Affine


class BuildingInstance:
    """Represents an extracted individual building object."""
    def __init__(
        self,
        building_id: str,
        pixel_area: int,
        bbox_pixel: List[int],  # [ymin, xmin, ymax, xmax]
        centroid_pixel: Tuple[float, float],
        polygon_pixel: Polygon,
        polygon_geo: Optional[Polygon] = None,
        area_m2: Optional[float] = None,
    ):
        self.building_id = building_id
        self.pixel_area = pixel_area
        self.bbox_pixel = bbox_pixel
        self.centroid_pixel = centroid_pixel
        self.polygon_pixel = polygon_pixel
        self.polygon_geo = polygon_geo
        self.area_m2 = area_m2

    @property
    def geometry(self) -> Polygon:
        """Returns geospatial geometry if georeferenced, otherwise pixel-space polygon."""
        return self.polygon_geo if self.polygon_geo is not None else self.polygon_pixel

    def to_dict(self) -> Dict[str, Any]:
        return {
            "building_id": self.building_id,
            "pixel_area": self.pixel_area,
            "bbox": self.bbox_pixel,
            "centroid": list(self.centroid_pixel),
            "area_m2": self.area_m2,
            "georeferenced": self.polygon_geo is not None,
        }


def extract_building_instances(
    binary_mask: np.ndarray,
    min_area_pixels: int = 16,
    transform: Optional[List[float]] = None,
    crs: Optional[str] = None,
    resolution: Optional[List[float]] = None,
) -> List[BuildingInstance]:
    """
    Extracts discrete building polygon instances from a 2D binary building mask.

    1. Applies 8-connectivity connected component labeling.
    2. Filters components smaller than `min_area_pixels`.
    3. Polygonizes each connected cluster via rasterio.features.shapes.
    4. Computes geographic coordinates and metric footprint areas when georeferenced.
    """
    if not np.any(binary_mask):
        return []

    # 8-connectivity structuring element
    structure = np.ones((3, 3), dtype=int)
    labeled_array, num_features = label(binary_mask.astype(np.uint8), structure=structure)

    if num_features == 0:
        return []

    aff = Affine(*transform[:6]) if transform is not None and len(transform) >= 6 else None
    pixel_area_m2 = None
    if resolution and len(resolution) >= 2:
        pixel_area_m2 = abs(resolution[0] * resolution[1])

    instances: List[BuildingInstance] = []
    building_idx = 1

    # Extract polygon geometries using rasterio.features.shapes
    # Shapes in pixel space (transform=None or Identity)
    for geom_dict, val in rasterio.features.shapes(labeled_array.astype(np.int32)):
        val_int = int(val)
        if val_int == 0:
            continue  # Background

        poly_geom = shape(geom_dict)
        if not poly_geom.is_valid:
            poly_geom = poly_geom.buffer(0)  # Clean topology

        area_px = int(np.sum(labeled_array == val_int))
        if area_px < min_area_pixels:
            continue

        minx, miny, maxx, maxy = poly_geom.bounds
        bbox_px = [int(miny), int(minx), int(maxy), int(maxx)]
        centroid_px = (float(poly_geom.centroid.y), float(poly_geom.centroid.x))

        # Georeferenced polygon transformation if CRS/affine transform is present
        poly_geo = None
        area_m2 = None
        if aff is not None and crs is not None:
            # Transform pixel polygon to geospatial coordinates
            from shapely import affinity
            # Affine matrix: a, b, d, e, xoff, yoff
            poly_geo = affinity.affine_transform(
                poly_geom,
                [aff.a, aff.b, aff.d, aff.e, aff.c, aff.f]
            )
            if pixel_area_m2 is not None:
                area_m2 = round(area_px * pixel_area_m2, 2)
            elif poly_geo.is_valid:
                area_m2 = round(poly_geo.area, 2)

        instances.append(BuildingInstance(
            building_id=f"building_{building_idx:03d}",
            pixel_area=area_px,
            bbox_pixel=bbox_px,
            centroid_pixel=centroid_px,
            polygon_pixel=poly_geom,
            polygon_geo=poly_geo,
            area_m2=area_m2,
        ))
        building_idx += 1

    return instances
