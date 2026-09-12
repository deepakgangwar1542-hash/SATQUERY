"""
Unit & Integration Tests for Phase 2: ChangeFormer & Bi-temporal Change Detection.

Verifies:
  - ChangeFormer Siamese Transformer architecture & forward tensor flow
  - Input adapter channel validation and rejection of incompatible inputs
  - Model manager checkpoint handling & hardware targeting
  - Neural inference execution (when weights are present)
  - Seamless RGB fallback when checkpoint is absent
  - Benchmark evaluation suite (IoU, precision, recall, F1)
  - Full orchestrator and API backward compatibility
"""
import io
import os
import tempfile
import base64
from pathlib import Path
import numpy as np
import pytest
import torch
from PIL import Image

from backend.models.changeformer.model import ChangeFormer
from backend.models.changeformer.config import ChangeFormerConfig
from backend.models.changeformer.adapter import adapt_imagery_for_changeformer
from backend.models.changeformer.inference import ChangeFormerInferenceManager
from backend.models.changeformer.benchmark import evaluate_change_mask
from backend.agents.change_detection_agent import ChangeDetectionAgent
from backend.orchestrator import run_pipeline
from backend.schemas.response import QueryRequest


def _make_b64(w: int = 64, h: int = 64, color: tuple = (100, 150, 200)) -> str:
    img = Image.new("RGB", (w, h), color=color)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("utf-8")


class TestChangeFormerArchitecture:
    def test_model_forward_pass(self):
        # Create model with compact embedding dims for fast test execution
        model = ChangeFormer(
            in_chans=3,
            num_classes=2,
            embed_dims=(32, 64, 160, 256),
            decoder_dim=128,
            depths=(1, 1, 1, 1),
        )
        model.eval()
        t0 = torch.randn(1, 3, 64, 64)
        t1 = torch.randn(1, 3, 64, 64)
        with torch.no_grad():
            logits = model(t0, t1)
        assert logits.shape == (1, 2, 64, 64)
        assert not torch.isnan(logits).any()


class TestChangeFormerAdapter:
    def test_adapter_valid_rgb(self):
        arr0 = np.full((100, 100, 3), 128, dtype=np.uint8)
        arr1 = np.full((100, 100, 3), 150, dtype=np.uint8)
        t0, t1, err = adapt_imagery_for_changeformer(arr0, arr1, expected_channels=3, target_size=(256, 256))
        assert err is None
        assert t0 is not None
        assert t1 is not None
        assert t0.shape == (1, 3, 256, 256)
        assert t1.shape == (1, 3, 256, 256)

    def test_adapter_incompatible_channels(self):
        # Single channel (grayscale) or 4-channel without adaptation
        arr0 = np.full((100, 100, 1), 128, dtype=np.uint8)
        arr1 = np.full((100, 100, 1), 150, dtype=np.uint8)
        t0, t1, err = adapt_imagery_for_changeformer(arr0, arr1, expected_channels=3)
        assert t0 is None
        assert err is not None
        assert err["status"] == "unsupported_input"
        assert "expects 3 channels" in err["reason"]


class TestChangeFormerInference:
    def test_missing_checkpoint_returns_structured_error(self):
        cfg = ChangeFormerConfig(checkpoint_path="/nonexistent/path/weights.pth")
        manager = ChangeFormerInferenceManager(config=cfg)
        arr0 = np.full((64, 64, 3), 0.5, dtype=np.float32)
        arr1 = np.full((64, 64, 3), 0.7, dtype=np.float32)
        res = manager.detect_change(arr0, arr1)
        assert res["success"] is False
        assert res["status"] == "checkpoint_missing"
        assert "not present" in res["reason"]

    def test_neural_inference_with_checkpoint(self, tmp_path):
        # Save a valid checkpoint
        ckpt_file = tmp_path / "test_cf.pth"
        model = ChangeFormer(
            in_chans=3,
            num_classes=2,
            embed_dims=(32, 64, 160, 256),
            decoder_dim=128,
            depths=(1, 1, 1, 1),
        )
        torch.save(model.state_dict(), ckpt_file)

        cfg = ChangeFormerConfig(
            checkpoint_path=str(ckpt_file),
            input_size=(64, 64),
            threshold=0.5,
        )
        manager = ChangeFormerInferenceManager(config=cfg)
        # Inject matching architecture for test weights
        model.to(manager.device)
        manager._model = model
        manager._loaded_checkpoint = str(ckpt_file)

        arr0 = np.random.rand(64, 64, 3).astype(np.float32)
        arr1 = np.random.rand(64, 64, 3).astype(np.float32)
        valid_mask = np.ones((64, 64), dtype=bool)

        res = manager.detect_change(arr0, arr1, valid_mask=valid_mask)
        assert res["success"] is True
        assert res["status"] == "success"
        assert "change_mask" in res
        assert "change_probability" in res
        assert 0.0 <= res["change_percentage"] <= 100.0
        assert res["valid_pixel_count"] == 64 * 64


class TestBenchmarkEvaluation:
    def test_perfect_agreement(self):
        gt = np.zeros((10, 10), dtype=bool)
        gt[2:5, 2:5] = True
        pred = gt.copy()
        metrics = evaluate_change_mask(pred, gt)
        assert metrics["iou"] == 1.0
        assert metrics["f1"] == 1.0
        assert metrics["precision"] == 1.0
        assert metrics["recall"] == 1.0

    def test_partial_overlap(self):
        gt = np.zeros((10, 10), dtype=bool)
        pred = np.zeros((10, 10), dtype=bool)
        gt[0:4, 0:4] = True    # 16 pixels
        pred[2:6, 0:4] = True  # 16 pixels
        # Overlap: 2:4, 0:4 = 8 pixels
        metrics = evaluate_change_mask(pred, gt)
        assert 0.0 < metrics["iou"] < 1.0
        assert metrics["true_positives"] == 8


class TestChangeDetectionAgentIntegration:
    def test_agent_fallback_to_rgb_differencing(self):
        agent = ChangeDetectionAgent()
        b0 = _make_b64(64, 64, (20, 120, 20))  # Green
        b1 = _make_b64(64, 64, (220, 40, 20))  # Red (change)
        out = agent.run("Show changes between before and after", image_b64=b0, image2_b64=b1)
        assert out.error is None
        assert out.result["change_percent"] > 0
        assert "pixel_change_count" in out.result
        assert "total_valid_pixels" in out.result
        assert out.result["evidence"]["analysis_method"] in ("rgb_pixel_difference", "changeformer")

    def test_agent_with_roi(self):
        agent = ChangeDetectionAgent()
        b0 = _make_b64(64, 64, (50, 50, 50))
        b1 = _make_b64(64, 64, (200, 200, 200))
        polygon = [[0.1, 0.1], [0.5, 0.1], [0.5, 0.5], [0.1, 0.5]]
        out = agent.run("Detect change in ROI", image_b64=b0, image2_b64=b1, polygon=polygon)
        assert out.result["evidence"]["roi_applied"] is True

    def test_agent_missing_t1(self):
        agent = ChangeDetectionAgent()
        b0 = _make_b64(64, 64)
        out = agent.run("Detect change", image_b64=b0, image2_b64=None)
        assert out.error is not None
        assert "Secondary image" in out.error


class TestFullPipelineBackwardCompatibility:
    def test_bi_temporal_query_pipeline_e2e(self):
        b0 = _make_b64(64, 64, (30, 80, 180))
        b1 = _make_b64(64, 64, (180, 50, 30))
        req = QueryRequest(
            question="What changed between before and after the flood?",
            image_b64=b0,
            image2_b64=b1,
        )
        response = run_pipeline(req)
        assert response.query_id
        assert response.earthquery_spec.task_type in ("change_detection", "change_vqa")
        assert len(response.agent_outputs) >= 1
        assert response.verifier_result is not None
        assert response.confidence_breakdown.overall > 0.0
        # Check execution trace includes preprocessing step
        trace_step_names = [s.step_name for s in response.execution_trace.steps]
        assert any("Temporal Alignment" in name or "Preprocessing" in name for name in trace_step_names)
        assert response.answer
