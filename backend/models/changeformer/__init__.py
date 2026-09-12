"""
SatQuery AI — ChangeFormer Model Package.

Modular deep-learning package for transformer-based bi-temporal change detection.
Includes model architecture, input adapter, inference manager, configuration,
and benchmark evaluation utilities.
"""
from backend.models.changeformer.config import ChangeFormerConfig
from backend.models.changeformer.model import ChangeFormer
from backend.models.changeformer.adapter import adapt_imagery_for_changeformer
from backend.models.changeformer.inference import (
    ChangeFormerInferenceManager,
    get_changeformer_manager,
)
from backend.models.changeformer.benchmark import evaluate_change_mask

__all__ = [
    "ChangeFormerConfig",
    "ChangeFormer",
    "adapt_imagery_for_changeformer",
    "ChangeFormerInferenceManager",
    "get_changeformer_manager",
    "evaluate_change_mask",
]
