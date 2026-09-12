"""
Deterministic Synthetic Geometry Tests for Spatial Intersection — SatQuery AI.

Validates the geometric spatial intersection engine independently of ML models
using exact Shapely polygons:
  - Disjoint flood (0 affected)
  - Single building intersection (1 affected)
  - Multiple building intersection (all affected)
  - Partial overlap thresholding (boundary testing e.g. 5% vs 10%)
  - Double-counting protection (multiple flood polygons overlapping 1 building)
  - Multi-threshold sensitivity analysis
"""
import pytest
from shapely.geometry import Polygon, MultiPolygon
from backend.models.buildings.postprocessing import BuildingInstance
from backend.services.spatial_intersection import (
    intersect_buildings_with_flood,
    SpatialIntersectionResult,
)


def _make_building(bid: str, x1: float, y1: float, x2: float, y2: float) -> BuildingInstance:
    """Helper to create a synthetic 10x10 building polygon (Area = 100)."""
    poly = Polygon([(x1, y1), (x2, y1), (x2, y2), (x1, y2)])
    return BuildingInstance(
        building_id=bid,
        pixel_area=int(poly.area),
        bbox_pixel=[int(y1), int(x1), int(y2), int(x2)],
        centroid_pixel=(float(poly.centroid.y), float(poly.centroid.x)),
        polygon_pixel=poly,
    )


class TestSyntheticSpatialIntersection:
    def test_flood_intersects_building_a_only(self):
        # Building A: (0, 0) to (10, 10) [Area 100]
        # Building B: (20, 0) to (30, 10) [Area 100]
        b_a = _make_building("building_001", 0, 0, 10, 10)
        b_b = _make_building("building_002", 20, 0, 30, 10)

        # Flood polygon covers Building A completely: (-5, -5) to (15, 15)
        flood_poly = Polygon([(-5, -5), (15, -5), (15, 15), (-5, 15)])

        res = intersect_buildings_with_flood(
            buildings=[b_a, b_b],
            flood_geometry=flood_poly,
            overlap_threshold=0.10,
        )

        assert res.success is True
        assert res.total_buildings == 2
        assert res.affected_buildings == 1
        assert res.affected_building_ids == ["building_001"]
        assert res.affected_building_percentage == 50.0

    def test_flood_intersects_both_buildings(self):
        b_a = _make_building("building_001", 0, 0, 10, 10)
        b_b = _make_building("building_002", 20, 0, 30, 10)

        # Flood covers from (-5, -5) to (35, 15)
        flood_poly = Polygon([(-5, -5), (35, -5), (35, 15), (-5, 15)])

        res = intersect_buildings_with_flood(
            buildings=[b_a, b_b],
            flood_geometry=flood_poly,
            overlap_threshold=0.10,
        )

        assert res.total_buildings == 2
        assert res.affected_buildings == 2
        assert set(res.affected_building_ids) == {"building_001", "building_002"}
        assert res.affected_building_percentage == 100.0

    def test_flood_intersects_neither_building(self):
        b_a = _make_building("building_001", 0, 0, 10, 10)
        b_b = _make_building("building_002", 20, 0, 30, 10)

        # Flood is far away: (100, 100) to (120, 120)
        flood_poly = Polygon([(100, 100), (120, 100), (120, 120), (100, 120)])

        res = intersect_buildings_with_flood(
            buildings=[b_a, b_b],
            flood_geometry=flood_poly,
            overlap_threshold=0.10,
        )

        assert res.total_buildings == 2
        assert res.affected_buildings == 0
        assert res.affected_building_ids == []
        assert res.affected_building_percentage == 0.0

    def test_partial_overlap_thresholding(self):
        # Building: (0, 0) to (10, 10) [Area 100]
        b = _make_building("building_001", 0, 0, 10, 10)

        # Flood covers (0, 0) to (10, 0.5) -> Overlap Area = 5.0 (5% of 100)
        flood_small = Polygon([(0, 0), (10, 0), (10, 0.5), (0, 0.5)])

        # At 10% threshold, 5% overlap should NOT count as affected
        res10 = intersect_buildings_with_flood([b], flood_small, overlap_threshold=0.10)
        assert res10.affected_buildings == 0

        # At 3% threshold, 5% overlap SHOULD count as affected
        res03 = intersect_buildings_with_flood([b], flood_small, overlap_threshold=0.03)
        assert res03.affected_buildings == 1

    def test_double_counting_protection(self):
        # Building: (0, 0) to (10, 10)
        b = _make_building("building_001", 0, 0, 10, 10)

        # Multiple flood polygons overlapping the same building
        f1 = Polygon([(0, 0), (5, 0), (5, 10), (0, 10)])
        f2 = Polygon([(4, 0), (10, 0), (10, 10), (4, 10)])
        multi_flood = MultiPolygon([f1, f2])

        res = intersect_buildings_with_flood([b], multi_flood, overlap_threshold=0.10)
        # Must be counted exactly once
        assert res.affected_buildings == 1
        assert res.affected_building_ids == ["building_001"]

    def test_sensitivity_analysis(self):
        # Building: (0, 0) to (10, 10) [Area 100]
        b = _make_building("building_001", 0, 0, 10, 10)

        # Flood covers 25% of building (0 to 10 in x, 0 to 2.5 in y -> Area 25)
        flood = Polygon([(0, 0), (10, 0), (10, 2.5), (0, 2.5)])

        res = intersect_buildings_with_flood(
            buildings=[b],
            flood_geometry=flood,
            sensitivity_thresholds=(0.10, 0.20, 0.30, 0.50),
        )

        sens = res.sensitivity_analysis
        # At 10% and 20%: affected (25% >= 10%, 20%)
        assert sens["10%_overlap"] == 1
        assert sens["20%_overlap"] == 1
        # At 30% and 50%: not affected (25% < 30%, 50%)
        assert sens["30%_overlap"] == 0
        assert sens["50%_overlap"] == 0
