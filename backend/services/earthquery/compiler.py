"""EarthQuery Compiler — Natural Language to Structured EarthQuerySpec.

Implements rule-based + keyword intent classification for the demo.
In production this would call a fine-tuned LLM to produce the spec.

Task taxonomy (TASK-FIRST design):
  change_detection, change_vqa, urban_change, vegetation_change,
  flood_impact, sar_change, fire_analysis, object_extraction,
  semantic_analysis, sar_optical_joint, vqa, captioning, grounding
"""
from __future__ import annotations
import re
from backend.schemas.response import EarthQuerySpec

# 1. Joint Optical + SAR
_P_SAR_OPT_1 = r"\b(sar|radar|synthetic aperture|backscatter)\b.*\b(optical|rgb|multispectral)\b"
_P_SAR_OPT_2 = r"\b(optical|rgb|multispectral)\b.*\b(sar|radar|synthetic aperture)\b"

# 2. SAR temporal change
_P_SAR_CHG_1 = r"\b(sar|radar|sentinel-1|backscatter|polarisation|polarization)\b.*(change|temporal|analysis)"
_P_SAR_CHG_2 = r"\b(analyze|analyse|perform).*(sar|radar|sentinel-1|backscatter)\b"

# 3. Dedicated spectral / domain tasks
_P_VEG_1 = r"\b(canopy decline|vegetation loss|forest loss|canopy change|vegetation change|vegetation decrease|vegetation decline|ndvi change|spectral change|ndvi|vegetation index|vegetation coverage)\b"
_P_URBAN_1 = r"\b(urban expansion|urban sprawl|new construction|built-up expansion|urban change|urban development|urban growth)\b"
_P_FIRE_1 = r"\b(wildfire|burn severity|burn scar|nbr|burnt area|char)\b"
_P_FLOOD_IMP_1 = r"\b(flood impact|flooding impact|inundation impact|flood hazard|flood extent|flood inundation|inundation map|buildings? (were |are )?affected by flood\w*)\b"

# 4. Standard bi-temporal change detection & change VQA
_P_CHG_DET_1 = r"(show me (the )?change|detect change|change map|changes between|difference between|before.?after|temporal change)"
_P_CHG_VQA_1 = r"(affected|impact|impacted|damage|damaged|loss|submerged|destruction|destroyed|inundated|hazard|kya asar|kitna asar|kitna nuksan|kitna.*affect)"
_P_CHG_VQA_2 = r"(what (happened|changed)|how (much|many).*(changed|different|affected|lost)|kya badla|kitna badlav|kya hua|kitna nuksan|kitna asar)"
_P_CHG_DET_2 = r"(change|changed|difference|deforest|urban.?sprawl|badlav|parivartan|pehle.*baad|farq|kya difference|compare)"

# 5. Object extraction / grounding
_P_OBJ_1 = r"\b(segment all|extract all|locate all|find all|detect all|map all|show all buildings|show all roads|extract.*building|building.*boundar\w*|refine.*footprint\w*|building.*footprint\w*|segment.*building)\b"
_P_SEM_1 = r"\b(explain|interpret|what does this show|tell me about|overview of changes)\b"
_P_GRD_1 = r"(where|locate|find|detect|identify|show me|ground|bounding box|kahan|dikhaye|dikhao|khojo|dhundo|mark karo|highlight karo)"
_P_CAP_1 = r"(describe|caption|what (is|are) (in|shown|visible)|summarize|overview|bataiye|batao|kya dikh raha|kya hai isme|explain karo)"
_P_VQA_1 = r"(what|how many|how much|is there|are there|count|classify|label|kya|kitne|kitna|hai kya|kya ye)"

_INTENT_PATTERNS: list[tuple[str, str, str]] = [
    (_P_SAR_OPT_1, "sar_optical_joint", "Optical+SAR Joint Analysis"),
    (_P_SAR_OPT_2, "sar_optical_joint", "Optical+SAR Joint Analysis"),
    (_P_SAR_CHG_1, "sar_change", "SAR Temporal Change Analysis"),
    (_P_SAR_CHG_2, "sar_change", "SAR Temporal Change Analysis"),
    (_P_VEG_1, "vegetation_change", "Vegetation Change Analysis"),
    (_P_URBAN_1, "urban_change", "Urban Change Analysis"),
    (_P_FIRE_1, "fire_analysis", "Fire and Burn Analysis"),
    (_P_FLOOD_IMP_1, "flood_impact", "Flood Impact Analysis"),
    (_P_CHG_DET_1, "change_detection", "Bi-temporal Change Detection"),
    (_P_CHG_VQA_1, "change_vqa", "Change-VQA"),
    (_P_CHG_VQA_2, "change_vqa", "Change-VQA"),
    (_P_CHG_DET_2, "change_detection", "Bi-temporal Change Detection"),
    (_P_OBJ_1, "object_extraction", "Object and Region Extraction"),
    (_P_SEM_1, "semantic_analysis", "Semantic Scene Analysis"),
    (_P_GRD_1, "grounding", "Visual Grounding"),
    (_P_CAP_1, "captioning", "Image Captioning"),
    (_P_VQA_1, "vqa", "Visual Question Answering"),
]

_SENSOR_PATTERNS: list[tuple[str, str]] = [
    (r"\b(sar|radar|sentinel-1|synthetic aperture|backscatter|vv|vh)\b", "sar"),
    (r"\b(optical|rgb|sentinel-2|landsat|multispectral|colour|color|ndvi)\b", "optical"),
]

_ENTITY_PATTERNS = [
    r"\b(flood|fire|deforestation|urban|building|road|river|lake|cloud|snow|vegetation|crop|soil|sand|ice)\b",
    r"\b(ndvi|ndwi|nbr|spectral|multispectral|reflectance|sar|radar|backscatter|vv|vh)\b",
    r"\b(affected|damage|impact|loss|hazard|submerged|inundated|land|area|canopy|forest)\b",
    r"\b(baadh|pani|building|sadak|imarat|nadi|jungle|ped|fasal|nuksan|asar|prabhavit|zameen)\b",
    r"\b(before|after|change|damage|expansion|growth|loss)\b",
    r"\b(pehle|baad|badlav|nuksan|farq)\b",
    r"\b(exact.*boundar\w*|precise.*boundar\w*|exact.*region\w*|refine.*boundar\w*|boundary refinement|precision segmentation|exact.*footprint\w*|exact.*shape\w*)\b",
    r"\b(nepal|assam|kerala|uttarakhand|bihar|himalaya|bangladesh|india|kosi|brahmaputra|japan|tokyo|kyoto|osaka|ishikawa|noto)\b",
    r"\b(20\d\d)\b",
]



_BITEMPORAL_TASKS = {
    "change_detection", "change_vqa", "sar_optical_joint",
    "urban_change", "vegetation_change", "flood_impact",
    "sar_change", "fire_analysis",
}


def compile_query(question: str, has_two_images: bool = False) -> EarthQuerySpec:
    """Classify the natural-language question into a structured EarthQuerySpec."""
    q = question.lower()
    task_type = "vqa"
    intent = "Visual Question Answering"
    for pattern, ttype, label in _INTENT_PATTERNS:
        if re.search(pattern, q):
            task_type = ttype
            intent = label
            break

    if has_two_images and task_type in ("vqa", "unknown"):
        task_type = "change_vqa"
        intent = "Change-VQA"

    if not has_two_images and task_type in ("change_vqa", "change_detection"):
        is_strictly_bitemporal = bool(re.search(
            r"before.*after|pehle.*baad|difference between|compare"
            r"|change between|between.*and|between t0|t0.*t1|20\d\d.*20\d\d",
            q,
        ))
        if not is_strictly_bitemporal and task_type == "change_vqa":
            task_type = "vqa"
            intent = "Visual Question Answering"

    sensor_hint = "any"
    for pattern, sensor in _SENSOR_PATTERNS:
        if re.search(pattern, q):
            sensor_hint = sensor
            break
    if task_type == "sar_optical_joint":
        sensor_hint = "both"
    elif task_type == "sar_change":
        sensor_hint = "sar"

    requires_two = task_type in _BITEMPORAL_TASKS and (has_two_images or bool(re.search(r"before.*after|between.*and|difference between", q)))

    temporal_context = None
    if requires_two:
        years = re.findall(r"\b(20\d\d)\b", q)
        between_m = re.search(r"\bbetween\s+([a-zA-Z]+|\d{4})\s+and\s+([a-zA-Z]+|\d{4})\b", q)
        before_m = re.search(r"(?:before|pehle)\s+([\w\s,]+?)(?:and|aur|,|$)", q)
        after_m = re.search(r"(?:after|baad)\s+([\w\s,]+?)(?:and|aur|,|$)", q)
        if len(years) >= 2:
            temporal_context = f"before: {years[0]} (T0) | after: {years[1]} (T1)"
        elif between_m:
            temporal_context = (f"before: {between_m.group(1).capitalize()} (T0) | "
                                f"after: {between_m.group(2).capitalize()} (T1)")
        elif before_m or after_m:
            t0s = before_m.group(1).strip() if before_m else "T0"
            t1s = after_m.group(1).strip() if after_m else "T1"
            temporal_context = f"before: {t0s} | after: {t1s}"
        else:
            temporal_context = "before: T0 | after: T1"

    entities: list[str] = []
    for pattern in _ENTITY_PATTERNS:
        entities.extend(re.findall(pattern, q))
    if any(re.search(r"exact.*boundar|precise.*boundar|exact.*region|refine.*boundar|boundary refinement|precision segmentation|exact.*footprint|exact.*shape", e) for e in entities):
        entities.append("precision_refinement")
    entities = list(dict.fromkeys(entities))

    conf = 0.92 if len(question.split()) >= 5 else 0.72


    return EarthQuerySpec(
        intent=intent,
        task_type=task_type,
        requires_two_images=requires_two,
        sensor_hint=sensor_hint,
        temporal_context=temporal_context,
        extracted_entities=entities,
        confidence=conf,
    )
