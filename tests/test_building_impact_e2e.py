"""
End-to-End Tests for Building-Impact Analysis Pipeline — SatQuery AI.

Validates the full pipeline from natural-language question:
  "Between June and August, identify areas where flooding increased and tell me how many buildings were affected."
through compiler intent recognition, temporal flood increase analysis, building segmentation,
spatial intersection, verification, confidence estimation, and provenance trace recording.
"""
import io
import base64
import pytest
import numpy as np
import torch
from PIL import Image

from backend.orchestrator import run_pipeline
from backend.schemas.response import QueryRequest, QueryResponse
from backend.services.earthquery.compiler import compile_query
from backend.models.buildings import (
    BuildingResUNet,
    BuildingModelConfig,
    BuildingSegmentationManager,
    get_building_manager,
)
from backend.services.verifier import verify


def _make_b64(w: int = 64, h: int = 64, color: tuple = (100, 150, 200)) -> str:
    img = Image.new("RGB", (w, h), color=color)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("utf-8")


class TestCompilerBuildingImpactIntent:
    def test_compiler_recognizes_flood_building_query(self):
        q = "Between June and August, identify areas where flooding increased and tell me how many buildings were affected."
        spec = compile_query(q, has_two_images=True)
        assert spec.task_type == "change_vqa"
        assert spec.requires_two_images is True
        assert spec.temporal_context is not None
        assert "June" in spec.temporal_context and "August" in spec.temporal_context
        assert any(e in spec.extracted_entities for e in ["flood", "building", "affected"])


class TestBuildingImpactPipelineE2E:
    def test_e2e_with_missing_checkpoint_truthful_unavailable(self):
        # Without checkpoint: flood runs, building analysis reports truthful unavailable
        b0 = _make_b64(64, 64, (50, 150, 50))   # Baseline green
        b1 = _make_b64(64, 64, (20, 40, 180))   # Inundated blue

        req = QueryRequest(
            question="Between June and August, identify areas where flooding increased and tell me how many buildings were affected.",
            image_b64=b0,
            image2_b64=b1,
        )
        response = run_pipeline(req)

        assert response.query_id
        assert response.earthquery_spec.task_type == "change_vqa"
        # Find Change-VQA agent output
        vqa_out = next((ao for ao in response.agent_outputs if ao.agent_id == "change_vqa_agent"), None)
        assert vqa_out is not None
        assert "flood_analysis" in vqa_out.result
        assert "building_analysis" in vqa_out.result
        assert vqa_out.result["building_analysis"]["status"] == "building_model_unavailable"
        assert vqa_out.result["building_analysis"]["affected_buildings"] is None
        # Confirms no fake building count was invented
        assert "cannot be quantified" in vqa_out.result["answer"] or "unavailable" in vqa_out.result["answer"]

    def test_e2e_with_weights_spatial_intersection(self, tmp_path):
        # Configure model manager with a real initialized checkpoint
        ckpt_path = tmp_path / "e2e_building.pth"
        model = BuildingResUNet(in_channels=3, num_classes=1)
        torch.save(model.state_dict(), ckpt_path)

        cfg = BuildingModelConfig(
            checkpoint_path=str(ckpt_path),
            tile_size=64,
            tile_overlap=16,
            min_building_area_pixels=8,
            flood_overlap_threshold=0.10,
        )
        manager = BuildingSegmentationManager.get_instance(config=cfg)
        model.to(manager.device)
        manager._model = model
        manager._loaded_checkpoint = str(ckpt_path)

        b0 = _make_b64(64, 64, (40, 160, 40))   # T0: Mostly dry land
        b1 = _make_b64(64, 64, (20, 50, 200))   # T1: Inundated water

        req = QueryRequest(
            question="Between June and August, identify areas where flooding increased and tell me how many buildings were affected.",
            image_b64=b0,
            image2_b64=b1,
        )
        response = run_pipeline(req)

        vqa_out = next((ao for ao in response.agent_outputs if ao.agent_id == "change_vqa_agent"), None)
        assert vqa_out is not None
        assert "building_impact" in vqa_out.result
        impact = vqa_out.result["building_impact"]
        assert isinstance(impact["total_buildings"], int)
        assert isinstance(impact["affected_buildings"], int)
        assert impact["affected_buildings"] <= impact["total_buildings"]
        assert 0.0 <= impact["affected_building_percentage"] <= 100.0

        # Verify execution trace recorded the spatial intersection step
        trace_steps = [s.step_name for s in response.execution_trace.steps]
        assert "Spatial Building-Impact Intersection" in trace_steps

    def test_verifier_catches_building_count_impossibility(self):
        from backend.schemas.response import EarthQuerySpec, AgentOutput

        spec = EarthQuerySpec(
            intent="Change-VQA",
            task_type="change_vqa",
            requires_two_images=True,
            confidence=0.9,
        )
        # Fabricate an invalid agent output where affected > total
        bad_ao = AgentOutput(
            agent_id="test_agent",
            agent_name="Test Agent",
            task="Change Analysis",
            result={
                "building_impact": {
                    "total_buildings": 10,
                    "affected_buildings": 15,  # Impossible!
                }
            },
            raw_score=0.9,
        )
        v_res = verify(spec, [bad_ao])
        assert any("exceeds total buildings" in c for c in v_res.conflicts_found)
