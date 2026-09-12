"""
Unit tests for Generic Multi-Modal Evidence Fusion.

Tests:
  - High sensor agreement
  - Severe sensor disagreement (flags sensors_disagree)
  - Fusion strategies: weighted_average, union, intersection
  - Single-modality fallbacks (SAR only, Optical only, None)
"""
import numpy as np
import pytest

from backend.services.evidence_fusion import (
    fuse_evidence,
    FusionResult,
)
from backend.services.sar.sar_fusion import (
    fuse_sar_optical_evidence,
    SARFusionResult,
    FusionStrategy,
)


def test_fusion_high_agreement():
    # 50x50 masks where 80% of inundated area matches
    sar_mask = np.zeros((50, 50), dtype=bool)
    opt_mask = np.zeros((50, 50), dtype=bool)

    sar_mask[10:30, 10:30] = True  # 400 px
    opt_mask[10:28, 10:30] = True  # 360 px

    res: FusionResult = fuse_evidence(
        sar_mask=sar_mask,
        optical_mask=opt_mask,
        task="flood_impact",
        strategy=FusionStrategy.WEIGHTED_AVERAGE,
    )
    assert res.success
    assert res.sensor_agreement > 0.80
    assert not res.sensors_disagree
    assert res.final_mask is not None
    assert np.sum(res.final_mask) > 350


def test_fusion_disagreement():
    # SAR sees water on left, Optical sees water on right
    sar_mask = np.zeros((50, 50), dtype=bool)
    opt_mask = np.zeros((50, 50), dtype=bool)

    sar_mask[:, :20] = True
    opt_mask[:, 30:] = True

    res: FusionResult = fuse_evidence(
        sar_mask=sar_mask,
        optical_mask=opt_mask,
        task="flood_impact",
    )
    assert res.success
    # Almost zero overlap -> should flag disagreement
    assert res.sensor_agreement < 0.40
    assert res.sensors_disagree
    assert any("disagree" in note.lower() for note in res.notes)


def test_fusion_strategies_union_and_intersection():
    sar_mask = np.zeros((20, 20), dtype=bool)
    opt_mask = np.zeros((20, 20), dtype=bool)

    sar_mask[:10, :] = True   # top half (200 px)
    opt_mask[:, :10] = True   # left half (200 px)

    # Union: top half OR left half -> 300 px
    union_res = fuse_evidence(
        sar_mask=sar_mask,
        optical_mask=opt_mask,
        strategy=FusionStrategy.UNION,
    )
    assert np.sum(union_res.final_mask) == 300

    # Intersection: top-left quadrant -> 100 px
    inter_res = fuse_evidence(
        sar_mask=sar_mask,
        optical_mask=opt_mask,
        strategy=FusionStrategy.INTERSECTION,
    )
    assert np.sum(inter_res.final_mask) == 100


def test_fusion_single_modality_sar_only():
    sar_mask = np.zeros((30, 30), dtype=bool)
    sar_mask[5:15, 5:15] = True  # 100 px

    res = fuse_evidence(sar_mask=sar_mask, optical_mask=None)
    assert res.success
    assert np.array_equal(res.final_mask, sar_mask)
    assert "optical_missing" in res.fusion_status or "sar_only" in res.fusion_status


def test_fusion_single_modality_optical_only():
    opt_mask = np.zeros((30, 30), dtype=bool)
    opt_mask[2:12, 2:12] = True  # 100 px

    res = fuse_evidence(sar_mask=None, optical_mask=opt_mask)
    assert res.success
    assert np.array_equal(res.final_mask, opt_mask)
    assert "sar_missing" in res.fusion_status or "optical_only" in res.fusion_status
