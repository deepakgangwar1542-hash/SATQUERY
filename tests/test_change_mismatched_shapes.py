"""
Test handling of mismatched image shapes in Change-VQA Agent and Temporal Flood Analyzer.
Reproduces and verifies fix for: operands could not be broadcast together with shapes (372,382) (352,352).
"""
import pytest
import numpy as np
from PIL import Image
import io
import base64

from backend.agents.change_vqa_agent import ChangeVQAAgent
from backend.services.flood_analyzer import analyze_temporal_flood


def _create_b64_image(h: int, w: int, color: tuple = (100, 150, 200)) -> str:
    img = Image.new("RGB", (w, h), color)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return f"data:image/png;base64,{base64.b64encode(buf.getvalue()).decode('utf-8')}"


def test_change_vqa_mismatched_shapes_no_crash():
    # Shape 1: (372, 382), Shape 2: (352, 352) — exact shapes from user error
    b64_1 = _create_b64_image(372, 382, color=(50, 120, 50))
    b64_2 = _create_b64_image(352, 352, color=(160, 60, 40))

    agent = ChangeVQAAgent()
    out = agent.run(
        question="What changed between the two dates and were buildings affected by flood?",
        image_b64=b64_1,
        image2_b64=b64_2,
    )

    assert out.error is None
    assert out.result is not None
    assert "answer" in out.result
    assert len(out.result["answer"]) > 0


def test_analyze_temporal_flood_mismatched_shapes():
    arr0 = np.zeros((372, 382, 3), dtype=np.uint8)
    arr1 = np.zeros((352, 352, 3), dtype=np.uint8)

    # Put water in arr1
    arr1[50:150, 50:150, 2] = 200

    res = analyze_temporal_flood(arr0, arr1)
    assert res.success is True
    assert res.flood_increase_px >= 0
    assert res.flood_increase_pct >= 0.0
