"""
Analysis Planner - SatQuery AI.

Converts EarthQuerySpec + DataCapability into a concrete AnalysisPlan
that tells the orchestrator which agents to run and which sensors to use.

This is the TASK-FIRST routing layer. It answers the question:
  Given this task + this available data, what should we actually do?

Design principles:
  1. TASK-FIRST: the task drives sensor and agent selection, not vice versa.
  2. CAPABILITY-AWARE: sensors are only selected if data is actually available.
  3. HONEST: limitations are documented when capabilities are missing.
  4. ADDITIVE: any task not explicitly handled falls back to VQA pipeline.

Supported tasks and their default plans:
  change_detection   -> ChangeFormer + optional SAR change supporting evidence
  change_vqa         -> ChangeFormer + VQA agent
  urban_change       -> ChangeFormer + Building Segmentation + spatial analysis
  vegetation_change  -> Spectral analysis (NDVI); SAR is NOT primary here
  flood_impact       -> SAR/optical flood + Building Seg + spatial intersection
  sar_change         -> SAR-only; warn if no SAR data available
  fire_analysis      -> Spectral (NBR) primary; SAR supporting if available
  object_extraction  -> Building Segmentation + optional SAM stub
  semantic_analysis  -> VQA / Caption agent for explanation
  sar_optical_joint  -> Both pipelines with evidence fusion
  vqa                -> VQA agent
  captioning         -> Caption agent
  grounding          -> Grounding agent
"""
from __future__ import annotations
import logging
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Any

logger = logging.getLogger("SatQuery.AnalysisPlanner")


@dataclass
class AnalysisPlan:
    """
    Concrete execution plan for one query.

    Produced by create_plan() and consumed by the orchestrator to select
    which agents to invoke.
    """
    task: str
    required_agents: List[str]
    preferred_sensors: List[str]
    use_sar: bool
    use_optical: bool
    use_changeformer: bool
    use_building_seg: bool
    use_spatial_intersection: bool
    use_fusion: bool
    sar_is_primary: bool           # SAR should lead when True
    optical_is_primary: bool       # Optical should lead when True
    rationale: str
    limitations: List[str] = field(default_factory=list)
    use_sam: bool = False
    sam_refinement_target: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "task": self.task,
            "required_agents": self.required_agents,
            "preferred_sensors": self.preferred_sensors,
            "use_sar": self.use_sar,
            "use_optical": self.use_optical,
            "use_changeformer": self.use_changeformer,
            "use_building_seg": self.use_building_seg,
            "use_spatial_intersection": self.use_spatial_intersection,
            "use_fusion": self.use_fusion,
            "use_sam": self.use_sam,
            "sam_refinement_target": self.sam_refinement_target,
            "sar_is_primary": self.sar_is_primary,
            "optical_is_primary": self.optical_is_primary,
            "rationale": self.rationale,
            "limitations": self.limitations,
        }



# Sentinel indicating data is not available
_NO_DATA = "none"


def _has_sar(cap1: Any, cap2: Any) -> bool:
    """True if either capability is a Sentinel-1 SAR raster."""
    for cap in (cap1, cap2):
        if cap and getattr(cap, "data_type", None) == "sentinel1":
            return True
    return False


def _has_optical(cap1: Any, cap2: Any) -> bool:
    """True if either capability is an optical raster (rgb, geotiff, sentinel2) or uninspected."""
    if cap1 is None and cap2 is None:
        return True
    for cap in (cap1, cap2):
        if cap and getattr(cap, "data_type", None) in ("rgb", "geotiff", "sentinel2"):
            return True
    return False



def _cloud_cover(cap1: Any, cap2: Any) -> float:
    """Returns the maximum estimated cloud cover across both images [0.0, 1.0]."""
    cc = 0.0
    for cap in (cap1, cap2):
        val = getattr(cap, "cloud_cover_estimate", 0.0) or 0.0
        cc = max(cc, val)
    return float(cc)


def _has_multispectral(cap1: Any, cap2: Any) -> bool:
    """True if Sentinel-2 or GeoTIFF multispectral bands are available."""
    for cap in (cap1, cap2):
        if cap and getattr(cap, "data_type", None) in ("sentinel2", "geotiff"):
            if getattr(cap, "band_count", 0) > 3:
                return True
    return False


def create_plan(
    spec: Any,
    cap1: Optional[Any] = None,
    cap2: Optional[Any] = None,
    question: Optional[str] = None,
) -> AnalysisPlan:
    """
    Create an AnalysisPlan from EarthQuerySpec + DataCapability.

    Args:
        spec : EarthQuerySpec from the query compiler
        cap1 : DataCapability for primary image (or None)
        cap2 : DataCapability for secondary image (or None)
        question : Optional natural language question for refinement context

    Returns:
        AnalysisPlan — drives agent selection in the orchestrator.
    """
    import re
    task = getattr(spec, "task_type", "vqa")
    has_sar = _has_sar(cap1, cap2)
    has_optical = _has_optical(cap1, cap2)
    has_ms = _has_multispectral(cap1, cap2)
    cloud = _cloud_cover(cap1, cap2)
    high_cloud = cloud > 0.30

    is_precision = (
        "precision_refinement" in getattr(spec, "extracted_entities", [])
        or any(re.search(r"exact.*boundar|precise.*boundar|exact.*region|refine.*boundar|boundary refinement|precision segmentation|exact.*footprint|exact.*shape", str(e)) for e in getattr(spec, "extracted_entities", []))
        or (question is not None and bool(re.search(
            r"\b(exact.*boundar\w*|precise.*boundar\w*|exact.*region\w*|refine.*boundar\w*|boundary refinement|precision segmentation|exact.*footprint\w*|exact.*shape\w*)\b",
            question.lower()
        )))
    )


    limitations: List[str] = []
    if high_cloud and not has_sar:
        limitations.append(
            f"High cloud cover estimated ({cloud*100:.0f}%). "
            "SAR imagery would be preferred but is not available."
        )

    # ── change_detection ───────────────────────────────────────────────────────
    if task == "change_detection":
        agents = ["change_detection_agent"]
        sensors = ["optical"]
        use_sar = False
        if has_sar:
            agents.append("sar_optical_agent")
            sensors.append("sentinel-1")
            use_sar = True
        use_sam = False
        sam_target = None
        if is_precision and has_optical:
            agents.append("sam_agent")
            use_sam = True
            sam_target = "changeformer"
        rationale = (
            "Bi-temporal change detection: ChangeFormer is primary model. "
            + ("SAR change analysis added as supporting evidence." if use_sar else "")
            + (" SAM precision boundary refinement recruited to delineate exact changed regions." if use_sam else "")
        )
        if high_cloud and has_sar:
            rationale += " High cloud cover — SAR evidence given additional weight."
        return AnalysisPlan(
            task=task, required_agents=agents, preferred_sensors=sensors,
            use_sar=use_sar, use_optical=has_optical, use_changeformer=True,
            use_building_seg=False, use_spatial_intersection=False,
            use_fusion=use_sar and has_optical,
            use_sam=use_sam, sam_refinement_target=sam_target,
            sar_is_primary=False, optical_is_primary=True,
            rationale=rationale, limitations=limitations,
        )

    # ── change_vqa ─────────────────────────────────────────────────────────────
    if task == "change_vqa":
        agents = ["change_detection_agent", "change_vqa_agent"]
        return AnalysisPlan(
            task=task, required_agents=agents,
            preferred_sensors=["optical"],
            use_sar=False, use_optical=True, use_changeformer=True,
            use_building_seg=True, use_spatial_intersection=True,
            use_fusion=False, sar_is_primary=False, optical_is_primary=True,
            rationale="Bi-temporal change VQA: ChangeFormer detects change; Change-VQA evaluates damage and impact.",
            limitations=limitations,
        )

    # ── urban_change ───────────────────────────────────────────────────────────
    if task == "urban_change":
        agents = ["change_detection_agent", "building_segmentation_agent"]
        sensors = ["optical"]
        use_sar = has_sar
        if use_sar:
            agents.append("sar_optical_agent")
            sensors.append("sentinel-1")
        use_sam = False
        sam_target = None
        if is_precision and has_optical:
            agents.append("sam_agent")
            use_sam = True
            sam_target = "building_segmentation"
        return AnalysisPlan(
            task=task, required_agents=agents, preferred_sensors=sensors,
            use_sar=use_sar, use_optical=True, use_changeformer=True,
            use_building_seg=True, use_spatial_intersection=False,
            use_fusion=use_sar,
            use_sam=use_sam, sam_refinement_target=sam_target,
            sar_is_primary=False, optical_is_primary=True,
            rationale=(
                "Urban change: ChangeFormer detects change; Building Segmentation "
                "provides building context. "
                + ("SAR backscatter increase provides supporting construction evidence." if use_sar else "")
                + (" SAM recruited for precision footprint boundary refinement." if use_sam else "")
            ),
            limitations=limitations,
        )


    # ── vegetation_change ──────────────────────────────────────────────────────
    if task == "vegetation_change":
        agents = ["spectral_analysis_agent"]
        sensors = ["optical"]
        if not has_ms:
            limitations.append(
                "NDVI requires NIR band (Sentinel-2 or multispectral GeoTIFF). "
                "The supplied RGB image does not contain NIR. NDVI cannot be computed."
            )
        rationale = (
            "Vegetation change: Sentinel-2 spectral analysis (NDVI) is primary. "
            "SAR is NOT selected as primary for vegetation — optical NIR is the standard approach."
        )
        if has_sar:
            # SAR is supporting only for vegetation, not primary
            rationale += " SAR data available but not used as primary for vegetation analysis."
            limitations.append(
                "SAR not selected as primary sensor for vegetation analysis. "
                "Optical spectral indices (NDVI) are more established for this task."
            )
        return AnalysisPlan(
            task=task, required_agents=agents, preferred_sensors=sensors,
            use_sar=False,  # SAR intentionally NOT primary for vegetation
            use_optical=True, use_changeformer=False,
            use_building_seg=False, use_spatial_intersection=False,
            use_fusion=False, sar_is_primary=False, optical_is_primary=True,
            rationale=rationale, limitations=limitations,
        )

    # ── flood_impact ───────────────────────────────────────────────────────────
    if task == "flood_impact":
        agents = []
        sensors = []
        sar_primary = False
        opt_primary = False

        if has_sar and has_optical:
            agents = ["sar_optical_agent", "change_detection_agent", "building_segmentation_agent"]
            sensors = ["sentinel-1", "optical"]
            sar_primary = high_cloud  # SAR leads when optical is cloudy
            opt_primary = not high_cloud
            rationale = (
                "Flood impact: SAR + optical dual-sensor analysis with evidence fusion. "
                f"{'SAR is primary (high cloud cover)' if sar_primary else 'Optical is primary'}, "
                "Building Segmentation + spatial intersection for affected building count."
            )
        elif has_sar:
            agents = ["sar_optical_agent"]
            sensors = ["sentinel-1"]
            sar_primary = True
            rationale = (
                "Flood impact: SAR-only analysis (no optical imagery available). "
                "SAR backscatter decrease used as flood evidence."
            )
            limitations.append(
                "No optical imagery available. SAR-only flood detection has higher false-positive risk "
                "from smooth roads, calm water bodies, and low-vegetation areas."
            )
        elif has_optical:
            agents = ["change_detection_agent", "building_segmentation_agent"]
            sensors = ["optical"]
            opt_primary = True
            rationale = "Flood impact: optical-only analysis. RGB/optical water detection and building extraction."
            if high_cloud:
                limitations.append(
                    f"High cloud cover ({cloud*100:.0f}%). Optical flood detection may be unreliable. "
                    "SAR imagery (Sentinel-1) would be preferred but was not supplied."
                )
        else:
            return AnalysisPlan(
                task=task, required_agents=["vqa_agent"], preferred_sensors=[],
                use_sar=False, use_optical=False, use_changeformer=False,
                use_building_seg=False, use_spatial_intersection=False,
                use_fusion=False, sar_is_primary=False, optical_is_primary=False,
                rationale="Flood impact requested but no imagery available.",
                limitations=["No imagery supplied. Flood analysis cannot be performed."],
            )

        use_sam = False
        sam_target = None
        if is_precision and has_optical:
            agents.append("sam_agent")
            use_sam = True
            sam_target = "flood"
            rationale += " SAM precision refinement recruited for flood hazard boundaries."

        return AnalysisPlan(
            task=task, required_agents=agents, preferred_sensors=sensors,
            use_sar=has_sar, use_optical=has_optical, use_changeformer=has_optical,
            use_building_seg=True, use_spatial_intersection=True,
            use_fusion=has_sar and has_optical,
            use_sam=use_sam, sam_refinement_target=sam_target,
            sar_is_primary=sar_primary, optical_is_primary=opt_primary,
            rationale=rationale, limitations=limitations,
        )

    # ── sar_change ─────────────────────────────────────────────────────────────
    if task == "sar_change":
        if not has_sar:
            return AnalysisPlan(
                task=task, required_agents=["vqa_agent"],
                preferred_sensors=["sar"],
                use_sar=False, use_optical=False, use_changeformer=False,
                use_building_seg=False, use_spatial_intersection=False,
                use_fusion=False, sar_is_primary=True, optical_is_primary=False,
                rationale="SAR change analysis requested but no SAR imagery detected.",
                limitations=[
                    "SAR analysis unavailable: no Sentinel-1 data detected in supplied imagery. "
                    "The system detected the supplied data as: "
                    + getattr(cap1, "data_type", "unknown") + ". "
                    "Provide a genuine Sentinel-1 GRD GeoTIFF for SAR analysis."
                ],
            )
        sar_limits = list(limitations)
        if is_precision and not has_optical:
            sar_limits.append(
                "SAM precision segmentation requires optical visual imagery. "
                "Raw Sentinel-1 SAR is not supported for SAM boundary refinement."
            )
        return AnalysisPlan(
            task=task, required_agents=["sar_optical_agent"],
            preferred_sensors=["sentinel-1"],
            use_sar=True, use_optical=False, use_changeformer=False,
            use_building_seg=False, use_spatial_intersection=False,
            use_fusion=False, sar_is_primary=True, optical_is_primary=False,
            rationale="SAR temporal change analysis: Sentinel-1 log-ratio change detection.",
            limitations=sar_limits,
        )

    # ── fire_analysis ──────────────────────────────────────────────────────────
    if task == "fire_analysis":
        agents = ["spectral_analysis_agent"]
        sensors = ["optical"]
        use_sar = has_sar  # SAR as supporting evidence for fire
        if use_sar:
            agents.append("sar_optical_agent")
            sensors.append("sentinel-1")
        return AnalysisPlan(
            task=task, required_agents=agents, preferred_sensors=sensors,
            use_sar=use_sar, use_optical=True, use_changeformer=False,
            use_building_seg=False, use_spatial_intersection=False,
            use_fusion=use_sar,
            sar_is_primary=False, optical_is_primary=True,
            rationale=(
                "Fire analysis: optical spectral NBR is primary. "
                + ("SAR provides supporting change evidence." if use_sar else "")
            ),
            limitations=limitations,
        )

    # ── object_extraction ──────────────────────────────────────────────────────
    if task == "object_extraction":
        use_sam = is_precision and has_optical
        sam_target = "building_segmentation" if use_sam else None
        agents = ["building_segmentation_agent"]
        if use_sam or "sam" in (getattr(spec, "extracted_entities", []) or []):
            agents.append("sam_agent")
            use_sam = True
            sam_target = "building_segmentation"
        return AnalysisPlan(
            task=task, required_agents=agents,
            preferred_sensors=["optical"],
            use_sar=False, use_optical=True, use_changeformer=False,
            use_building_seg=True, use_spatial_intersection=False,
            use_fusion=False,
            use_sam=use_sam, sam_refinement_target=sam_target,
            sar_is_primary=False, optical_is_primary=True,
            rationale="Object extraction: Building Segmentation" + (" + SAM precision refinement." if use_sam else "."),
            limitations=["SAM/SAM2 checkpoint availability: unavailable by default."] if use_sam else [],
        )


    # ── semantic_analysis ──────────────────────────────────────────────────────
    if task == "semantic_analysis":
        return AnalysisPlan(
            task=task, required_agents=["vqa_agent", "caption_agent"],
            preferred_sensors=["optical"],
            use_sar=False, use_optical=True, use_changeformer=False,
            use_building_seg=False, use_spatial_intersection=False,
            use_fusion=False, sar_is_primary=False, optical_is_primary=True,
            rationale=(
                "Semantic analysis: VQA and captioning agents explain what is visible. "
                "Quantitative evidence (from other agents) is explained, not generated, by VLM."
            ),
            limitations=["VLM/VQA does not generate quantitative ground truth."],
        )

    # ── sar_optical_joint ──────────────────────────────────────────────────────
    if task == "sar_optical_joint":
        return AnalysisPlan(
            task=task,
            required_agents=["sar_optical_agent", "change_detection_agent"],
            preferred_sensors=["sentinel-1", "optical"],
            use_sar=has_sar, use_optical=has_optical, use_changeformer=True,
            use_building_seg=False, use_spatial_intersection=False,
            use_fusion=True,
            sar_is_primary=high_cloud and has_sar,
            optical_is_primary=not high_cloud,
            rationale="SAR + optical joint analysis with evidence fusion.",
            limitations=limitations,
        )

    # ── vqa (default) ─────────────────────────────────────────────────────────
    if task == "vqa":
        return AnalysisPlan(
            task=task, required_agents=["vqa_agent"],
            preferred_sensors=["optical"],
            use_sar=False, use_optical=True, use_changeformer=False,
            use_building_seg=False, use_spatial_intersection=False,
            use_fusion=False, sar_is_primary=False, optical_is_primary=True,
            rationale="Visual question answering on provided imagery.",
            limitations=limitations,
        )

    # ── captioning ────────────────────────────────────────────────────────────
    if task == "captioning":
        return AnalysisPlan(
            task=task, required_agents=["caption_agent"],
            preferred_sensors=["optical"],
            use_sar=False, use_optical=True, use_changeformer=False,
            use_building_seg=False, use_spatial_intersection=False,
            use_fusion=False, sar_is_primary=False, optical_is_primary=True,
            rationale="Image captioning.",
            limitations=limitations,
        )

    # ── grounding ─────────────────────────────────────────────────────────────
    if task == "grounding":
        return AnalysisPlan(
            task=task, required_agents=["grounding_agent"],
            preferred_sensors=["optical"],
            use_sar=False, use_optical=True, use_changeformer=False,
            use_building_seg=False, use_spatial_intersection=False,
            use_fusion=False, sar_is_primary=False, optical_is_primary=True,
            rationale="Visual grounding / object localization.",
            limitations=limitations,
        )

    # ── unknown / fallback ─────────────────────────────────────────────────────
    logger.warning(f"[Planner] Unrecognised task '{task}', falling back to VQA.")
    return AnalysisPlan(
        task=task, required_agents=["vqa_agent"],
        preferred_sensors=["optical"],
        use_sar=False, use_optical=True, use_changeformer=False,
        use_building_seg=False, use_spatial_intersection=False,
        use_fusion=False, sar_is_primary=False, optical_is_primary=True,
        rationale=f"Task '{task}' not explicitly handled; defaulting to VQA.",
        limitations=[f"Task '{task}' may not be fully supported."],
    )
