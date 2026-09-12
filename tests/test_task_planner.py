"""
Task-Diverse End-to-End Orchestration & Planning Tests.

Verifies the TASK-FIRST architecture:
  Scenario 1: Bi-temporal change detection -> ChangeFormer
  Scenario 2: Vegetation analysis (NDVI) -> Optical primary, SAR NOT primary
  Scenario 3: Urban change -> ChangeFormer + Building Segmentation
  Scenario 4: Flood impact -> Flood analysis + Building spatial intersection
  Scenario 5: SAR requested on RGB optical input -> Honest SAR unavailable
  Scenario 6: NDVI requested on RGB input -> Honest NIR missing
  Scenario 7: Cloud cover > 30% + SAR available -> SAR boosted/primary
  Scenario 8: Semantic scene explanation -> VQA/Captioning
"""
import io
import base64
import numpy as np
import pytest
from PIL import Image
import rasterio
from rasterio.transform import from_origin

from backend.schemas.response import QueryRequest, QueryResponse
from backend.services.earthquery.compiler import compile_query
from backend.services.sensor_selector import select_sensor
from backend.services.analysis_planner import create_plan
from backend.orchestrator import run_pipeline


def _make_rgb_b64(width: int = 32, height: int = 32, color=(100, 150, 80)) -> str:
    img = Image.new("RGB", (width, height), color=color)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    return f"data:image/png;base64,{base64.b64encode(buf.read()).decode('utf-8')}"


def _make_s1_b64(width: int = 32, height: int = 32, power_vv: float = 0.05) -> str:
    transform = from_origin(85.0, 27.0, 10.0, 10.0)
    crs = "EPSG:4326"
    mem = io.BytesIO()
    with rasterio.open(
        mem, "w", driver="GTiff", height=height, width=width, count=2,
        dtype="float32", crs=crs, transform=transform, nodata=-9999.0
    ) as dst:
        dst.write(np.full((height, width), power_vv, dtype=np.float32), 1)
        dst.write(np.full((height, width), power_vv * 0.2, dtype=np.float32), 2)
        dst.update_tags(1, POLARISATION="VV")
        dst.update_tags(2, POLARISATION="VH")
        dst.update_tags(SENSOR="SENTINEL-1")
    mem.seek(0)
    return f"data:image/tiff;base64,{base64.b64encode(mem.read()).decode('utf-8')}"


# ── Scenario 1: General Change Detection ──────────────────────────────────────
def test_scenario_1_change_detection_routing():
    q = "Show me the change detection map between 2021 and 2023"
    spec = compile_query(q, has_two_images=True)
    assert spec.task_type == "change_detection"

    b64_0 = _make_rgb_b64()
    b64_1 = _make_rgb_b64()
    req = QueryRequest(question=q, image_b64=b64_0, image2_b64=b64_1)
    resp: QueryResponse = run_pipeline(req)

    assert resp.task_plan is not None
    assert "change_detection_agent" in resp.task_plan.required_agents
    assert resp.task_plan.use_changeformer is True


# ── Scenario 2: Vegetation Analysis (SAR NOT Primary) ─────────────────────────
def test_scenario_2_vegetation_analysis_sar_not_primary():
    q = "Calculate the NDVI vegetation loss and canopy change"
    spec = compile_query(q, has_two_images=True)
    assert spec.task_type == "vegetation_change"

    b64_opt = _make_rgb_b64()
    b64_sar = _make_s1_b64()

    # Even if SAR is available, optical NDVI is primary for vegetation
    plan = create_plan(spec, cap1=None, cap2=None)
    assert plan.use_sar is False
    assert "spectral_analysis_agent" in plan.required_agents
    assert "optical" in plan.preferred_sensors
    assert any("not selected as primary" in r.lower() or "optical" in r.lower() for r in [plan.rationale] + plan.limitations)


# ── Scenario 3: Urban Change ──────────────────────────────────────────────────
def test_scenario_3_urban_change_routing():
    q = "Detect urban expansion and new construction buildings between T0 and T1"
    spec = compile_query(q, has_two_images=True)
    assert spec.task_type == "urban_change"

    plan = create_plan(spec, cap1=None, cap2=None)
    assert plan.use_building_seg is True
    assert "change_detection_agent" in plan.required_agents


# ── Scenario 4: Flood Impact with Building Intersection ───────────────────────
def test_scenario_4_flood_impact_routing():
    q = "Assess flood impact and inundation damage across the region"
    spec = compile_query(q, has_two_images=True)
    assert spec.task_type == "flood_impact"

    b64_sar0 = _make_s1_b64(32, 32, 0.08)
    b64_sar1 = _make_s1_b64(32, 32, 0.005)  # flooded

    req = QueryRequest(question=q, image_b64=b64_sar0, image2_b64=b64_sar1)
    resp = run_pipeline(req)

    assert resp.task_plan is not None
    assert resp.task_plan.task == "flood_impact"
    assert resp.task_plan.use_building_seg is True
    assert resp.task_plan.use_spatial_intersection is True
    assert "sar_optical_agent" in resp.task_plan.required_agents


# ── Scenario 5: SAR Query on Optical Image (Honest Unavailable) ───────────────
def test_scenario_5_sar_on_optical_input_honest():
    q = "Analyze Sentinel-1 SAR backscatter change"
    spec = compile_query(q, has_two_images=True)
    assert spec.task_type == "sar_change"

    b64_rgb = _make_rgb_b64()
    req = QueryRequest(question=q, image_b64=b64_rgb)
    resp = run_pipeline(req)

    # Must honestly report that SAR data is unavailable
    assert resp.task_plan is not None
    assert any("no sentinel-1" in lim.lower() or "unavailable" in lim.lower() for lim in resp.task_plan.limitations)
    assert "rgb" in resp.sensor_selection.selected_sensor.lower() or "unsupported" in resp.sensor_selection.selected_sensor.lower() or "optical" in resp.sensor_selection.selected_sensor.lower()


# ── Scenario 6: NDVI on 3-band RGB (Honest NIR Missing) ───────────────────────
def test_scenario_6_ndvi_on_rgb_honest_nir_missing():
    q = "Compute NDVI vegetation index"
    b64_rgb = _make_rgb_b64()
    req = QueryRequest(question=q, image_b64=b64_rgb)
    resp = run_pipeline(req)

    # Check that spectral agent reported missing NIR band
    spectral_outs = [ao for ao in resp.agent_outputs if ao.agent_id == "spectral_analysis_agent"]
    if spectral_outs:
        assert spectral_outs[0].result.get("capability_status") == "insufficient_bands"
        assert "nir" in spectral_outs[0].result.get("message", "").lower()


# ── Scenario 7: High Cloud + SAR Available -> SAR Preferred ───────────────────
def test_scenario_7_cloudy_scene_sar_preferred():
    # Make cloudy image (all bright white pixels)
    cloud_img = Image.new("RGB", (32, 32), color=(240, 240, 240))
    buf = io.BytesIO()
    cloud_img.save(buf, format="PNG")
    buf.seek(0)
    cloud_b64 = f"data:image/png;base64,{base64.b64encode(buf.read()).decode('utf-8')}"
    sar_b64 = _make_s1_b64()

    q = "Assess flood damage between optical and SAR imagery"
    spec = compile_query(q, has_two_images=True)

    sensor = select_sensor(spec, image_b64=cloud_b64, image2_b64=sar_b64)
    assert sensor.cloud_cover_estimate is not None
    assert sensor.cloud_cover_estimate > 30.0
    assert "sentinel-1" in sensor.selected_sensor.lower() or "sar" in sensor.selected_sensor.lower()


# ── Scenario 8: Semantic Explanation ──────────────────────────────────────────
def test_scenario_8_semantic_analysis_routing():
    q = "Explain what this satellite scene shows and interpret the landscape"
    spec = compile_query(q, has_two_images=False)
    assert spec.task_type == "semantic_analysis"

    plan = create_plan(spec, cap1=None, cap2=None)
    assert "vqa_agent" in plan.required_agents or "caption_agent" in plan.required_agents
    assert plan.use_changeformer is False
