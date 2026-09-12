"""
Multimodal Semantic Reasoning Layer (VLM) for SatQuery AI.

Provides modular, strictly evidence-grounded semantic interpretation downstream
of quantitative vision models, evidence fusion, and verification engines.
"""
from backend.models.vlm.schemas import (
    GroundedEvidenceItem,
    GroundedEvidenceContext,
    SemanticInterpretation,
)
from backend.models.vlm.context_builder import build_grounded_context
from backend.models.vlm.adapter import (
    VLMModel,
    GroundedSemanticReasoner,
    TransformersVLMAdapter,
    get_vlm_adapter,
)
from backend.models.vlm.visual_context import VisualContextGenerator

__all__ = [
    "GroundedEvidenceItem",
    "GroundedEvidenceContext",
    "SemanticInterpretation",
    "build_grounded_context",
    "VLMModel",
    "GroundedSemanticReasoner",
    "TransformersVLMAdapter",
    "get_vlm_adapter",
    "VisualContextGenerator",
]
