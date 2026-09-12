"""
Request / response Pydantic schemas for SatQuery AI.
All fields that appear in the API response are declared here —
nothing is silently dropped between backend computation and frontend rendering.
"""
from __future__ import annotations
from typing import Optional, List, Dict, Any, Literal
from pydantic import BaseModel, Field
import base64


# ─── Request ──────────────────────────────────────────────────────────────────

class QueryRequest(BaseModel):
    question: str = Field(..., description="Natural-language query from the user")
    image_b64: Optional[str] = Field(None, description="Primary image, base64-encoded")
    image2_b64: Optional[str] = Field(None, description="Second image for bi-temporal analysis")
    language: Optional[str] = Field("en-IN", description="Language hint (en-IN | hi-IN)")
    polygon: Optional[List[List[float]]] = Field(None, description="Normalized [[x1, y1], [x2, y2], ...] polygon ROI coordinates (0.0 to 1.0)")
    roi_mode: Optional[bool] = Field(False, description="Whether query is constrained to the polygon ROI")
    target_scene: Optional[Literal["scene1", "scene2", "both"]] = Field("both", description="Target scene for ROI analysis")


# ─── EarthQuery Spec ──────────────────────────────────────────────────────────

class EarthQuerySpec(BaseModel):
    intent: str = Field(..., description="Classified task intent")
    task_type: Literal[
        # Core VQA / perception tasks
        "vqa", "captioning", "grounding",
        # Temporal change tasks
        "change_detection", "change_vqa",
        # Task-specific analysis tasks
        "urban_change",        # construction / built-up expansion
        "vegetation_change",   # NDVI / spectral vegetation analysis
        "flood_impact",        # flood detection + building impact
        "sar_change",          # Sentinel-1 temporal SAR change
        "fire_analysis",       # burn / wildfire area
        "object_extraction",   # segmentation / object detection
        "semantic_analysis",   # VLM scene explanation
        # Multi-modal joint analysis
        "sar_optical_joint",
        # Fallback
        "unknown"
    ]
    requires_two_images: bool
    sensor_hint: Optional[str] = Field(None, description="optical | sar | both | any")
    temporal_context: Optional[str] = Field(None, description="before/after labels if bi-temporal")
    extracted_entities: List[str] = Field(default_factory=list)
    confidence: float = Field(..., ge=0.0, le=1.0)


# ─── Sensor Selection ─────────────────────────────────────────────────────────

class SensorSelection(BaseModel):
    selected_sensor: str
    rationale: str
    cloud_cover_estimate: Optional[float] = None
    fallback_considered: bool = False


# ─── Agent Output ─────────────────────────────────────────────────────────────

class AgentOutput(BaseModel):
    agent_id: str
    agent_name: str
    task: str
    result: Dict[str, Any]
    evidence_regions: Optional[List[Dict[str, Any]]] = None   # bounding boxes / masks
    raw_score: float = Field(..., ge=0.0, le=1.0)
    error: Optional[str] = None


# ─── Verifier ─────────────────────────────────────────────────────────────────

class VerifierCheck(BaseModel):
    name: str
    status: Literal["passed", "warning", "failed"]
    details: str


class VerifierResult(BaseModel):
    agreement: bool
    conflicts_found: List[str] = Field(default_factory=list)
    replanned: bool = False
    replan_reason: Optional[str] = None
    final_answer: str
    status: Literal["passed", "passed_with_warnings", "failed", "insufficient_evidence"] = "passed"
    checks: List[VerifierCheck] = Field(default_factory=list)
    warnings: List[str] = Field(default_factory=list)
    errors: List[str] = Field(default_factory=list)
    replanning_required: bool = False


# ─── Confidence Breakdown (6-component) ───────────────────────────────────────

class ConfidenceBreakdown(BaseModel):
    task_classification: float = Field(..., ge=0.0, le=1.0)
    sensor_compatibility: float = Field(..., ge=0.0, le=1.0)
    model_output_quality: float = Field(..., ge=0.0, le=1.0)
    evidence_agreement: float = Field(..., ge=0.0, le=1.0)
    temporal_consistency: float = Field(..., ge=0.0, le=1.0)
    answer_groundedness: float = Field(..., ge=0.0, le=1.0)
    overall: float = Field(..., ge=0.0, le=1.0)
    interpretation: Optional[str] = None
    explanation: Optional[str] = None


# ─── Uncertainty ──────────────────────────────────────────────────────────────

class UncertaintyItem(BaseModel):
    type: str
    severity: Literal["low", "medium", "high", "critical"]
    description: str


# ─── Provenance / Execution Trace ─────────────────────────────────────────────

class TraceStep(BaseModel):
    step_id: str
    step_name: str
    component: str
    input_summary: str
    output_summary: str
    duration_ms: float
    status: Literal["success", "warning", "error", "skipped"]
    metadata: Dict[str, Any] = Field(default_factory=dict)


class ExecutionTrace(BaseModel):
    trace_id: str
    steps: List[TraceStep]
    total_duration_ms: float


# ─── Analysis Plan (from AnalysisPlanner) ──────────────────────────────────────

class TaskPlan(BaseModel):
    """Machine-generated execution plan created by the AnalysisPlanner."""
    task: str
    required_agents: List[str]
    preferred_sensors: List[str]
    use_sar: bool = False
    use_optical: bool = True
    use_changeformer: bool = False
    use_building_seg: bool = False
    use_spatial_intersection: bool = False
    use_fusion: bool = False
    use_sam: bool = False
    sam_refinement_target: Optional[str] = None
    rationale: str
    limitations: List[str] = Field(default_factory=list)


from backend.models.vlm.schemas import SemanticInterpretation

# ─── Full Query Response ──────────────────────────────────────────────

class QueryResponse(BaseModel):
    query_id: str
    question: str
    earthquery_spec: EarthQuerySpec
    sensor_selection: SensorSelection
    task_plan: Optional[TaskPlan] = None    # populated by AnalysisPlanner
    agent_outputs: List[AgentOutput]
    verifier_result: VerifierResult
    confidence_breakdown: ConfidenceBreakdown
    execution_trace: ExecutionTrace
    answer: str
    report_url: str

    # Additive structured fields (Part 39)
    evidence: Optional[Dict[str, Any]] = None
    verification: Optional[Dict[str, Any]] = None
    confidence: Optional[Dict[str, Any]] = None
    uncertainty: Optional[List[UncertaintyItem]] = None
    provenance: Optional[Dict[str, Any]] = None
    segmentation: Optional[Dict[str, Any]] = None
    refinement: Optional[Dict[str, Any]] = None

    # Multimodal Semantic Reasoning Layer (VLM)
    semantic_interpretation: Optional[SemanticInterpretation] = None

