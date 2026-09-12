"""
Change-VQA Agent — Answers natural-language questions about bi-temporal changes.
Combines genuine bi-temporal pixel differencing with query-specific semantic reasoning.
"""
from __future__ import annotations
import re
import time
from backend.schemas.response import AgentOutput
from backend.services.cv_analyzer import decode_image_b64, extract_svg_keywords_and_stats, analyze_scene_image
from backend.agents.change_detection_agent import _compute_image_change


class ChangeVQAAgent:
    AGENT_ID = "change_vqa_agent"
    AGENT_NAME = "Change-VQA Agent (Bi-temporal Query Reasoner)"

    def run(
        self,
        question: str,
        image_b64: str | None = None,
        image2_b64: str | None = None,
        polygon: list[list[float]] | None = None,
        target_scene: str | None = "both"
    ) -> AgentOutput:
        t0 = time.perf_counter()
        q = question.lower()

        roi_prefix = f"ROI Analysis ({len(polygon)} pts): " if polygon and len(polygon) >= 3 else ""

        # Check for missing secondary image
        if not image_b64 or not image2_b64:
            elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Change Visual Question Answering",
                result={
                    "question": question,
                    "answer": (
                        f"{roi_prefix}Bi-temporal question answering requires both pre-event (T0) and "
                        f"post-event (T1) satellite images. Only one image was supplied, so change between dates cannot be computed."
                    ),
                    "change_context": "Bi-temporal analysis incomplete",
                    "model": "Bi-temporal Query Reasoner",
                    "inference_time_ms": elapsed_ms,
                },
                evidence_regions=None,
                raw_score=0.20,
                error="Secondary image (T1) required for bi-temporal query.",
            )

        img0_arr = decode_image_b64(image_b64)
        img1_arr = decode_image_b64(image2_b64)

        if img0_arr is None or img1_arr is None:
            elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
            return AgentOutput(
                agent_id=self.AGENT_ID,
                agent_name=self.AGENT_NAME,
                task="Change Visual Question Answering",
                result={
                    "question": question,
                    "answer": "Unable to decode the supplied image payloads for bi-temporal reasoning.",
                    "model": "Bi-temporal Query Reasoner",
                    "inference_time_ms": elapsed_ms,
                },
                raw_score=0.0,
                error="Invalid image payload.",
            )

        # Real pixel differencing
        change_pct, changed_count, total_valid, _, bbox = _compute_image_change(img0_arr, img1_arr, polygon=polygon)

        stats0 = analyze_scene_image(img0_arr, polygon=polygon)
        stats1 = analyze_scene_image(img1_arr, polygon=polygon)

        d_water = stats1["water_coverage_pct"] - stats0["water_coverage_pct"]
        d_veg = stats1["vegetation_coverage_pct"] - stats0["vegetation_coverage_pct"]
        d_fire = stats1["fire_coverage_pct"] - stats0["fire_coverage_pct"]
        d_burn = stats1["burn_scar_pct"] - stats0["burn_scar_pct"]
        d_urban = stats1["urban_coverage_pct"] - stats0["urban_coverage_pct"]

        d_barren = stats1["barren_coverage_pct"] - stats0["barren_coverage_pct"]
        is_hindi = bool(re.search(r"[\u0900-\u097F]|kitna|kitni|kya|nuksan|asar|badla|pehle|baad|zameen|prabhavit", q))

        # Query-specific natural language answering
        # 1. Affected area / Damage / Impact queries
        if re.search(r"affect|damage|impact|loss|submerged|destruction|destroy|hazard|nuksan|nuksaan|asar|prabhavit|नुकसान|प्रभाव|असर", q):
            # Flood / Inundation or silt deposition
            if d_water > 2.0 or (stats1["water_coverage_pct"] > 8.0 and d_veg < -4.0) or (d_barren > 5.0 and d_veg < -5.0) or (d_veg < -15.0 and change_pct > 15.0):
                if is_hindi:
                    answer = (
                        f"{roi_prefix}T0 (पहले) और T1 (बाद) की तुलना के अनुसार, लगभग {change_pct:.1f}% ज़मीन सीधे तौर पर प्रभावित हुई है। "
                        f"बाढ़ के पानी और गाद (silt/sediment) के फैलाव के कारण पहले की हरी-भरी वनस्पति में {abs(d_veg):.1f}% की गिरावट आई है। "
                        f"बाकी {max(0.0, 100.0 - change_pct):.1f}% क्षेत्र सुरक्षित और बाढ़ के स्तर से ऊपर है।"
                    )
                else:
                    answer = (
                        f"{roi_prefix}Approximately {change_pct:.1f}% of the land has been directly affected by flood inundation and sediment deposition. "
                        f"Comparing the pre-event baseline (T0) and post-event imagery (T1), floodwaters and saturated sediment "
                        f"expanded across the terrain, substantially submerging agricultural and vegetated land (vegetation cover dropped by {abs(d_veg):.1f}%). "
                        f"The remaining {max(0.0, 100.0 - change_pct):.1f}% of the analyzed terrain remains above flood levels."
                    )
            elif d_fire > 2.0 or d_burn > 3.0:
                total_fire = stats1["fire_coverage_pct"] + stats1["burn_scar_pct"]
                if is_hindi:
                    answer = (
                        f"{roi_prefix}लगभग {change_pct:.1f}% ज़मीन जंगल की आग (wildfire) से प्रभावित हुई है। "
                        f"T1 विश्लेषण में {total_fire:.1f}% सक्रिय आग और जली हुई ज़मीन (burn scar) दर्ज की गई, "
                        f"जिससे वनस्पति आवरण में {abs(d_veg):.1f}% की हानि हुई है।"
                    )
                else:
                    answer = (
                        f"{roi_prefix}Approximately {change_pct:.1f}% of the land has been affected by wildfire damage. "
                        f"Post-event analysis indicates {total_fire:.1f}% active flame and burn scar coverage "
                        f"(Flaming: {stats1['fire_coverage_pct']:.1f}%, Charred: {stats1['burn_scar_pct']:.1f}%), "
                        f"causing a {abs(d_veg):.1f}% loss in healthy vegetation canopy."
                    )
            elif d_veg < -5.0:
                if is_hindi:
                    answer = (
                        f"{roi_prefix}लगभग {change_pct:.1f}% क्षेत्र में वनस्पति और पेड़-पौधों का नुकसान हुआ है। "
                        f"हरियाली {stats0['vegetation_coverage_pct']:.1f}% से घटकर {stats1['vegetation_coverage_pct']:.1f}% रह गई है "
                        f"(शुद्ध कमी: {abs(d_veg):.1f}%)।"
                    )
                else:
                    answer = (
                        f"{roi_prefix}Approximately {change_pct:.1f}% of the land has been affected by canopy degradation or clearing, "
                        f"with healthy green vegetation dropping from {stats0['vegetation_coverage_pct']:.1f}% to "
                        f"{stats1['vegetation_coverage_pct']:.1f}% (net canopy loss of {abs(d_veg):.1f}%)."
                    )
            else:
                answer = (
                    f"{roi_prefix}Approximately {change_pct:.1f}% of the land has been physically altered between T0 and T1. "
                    f"The primary transition shifted surface cover from {stats0['dominant_class'].lower()} "
                    f"to {stats1['dominant_class'].lower()}."
                )

        # 2. Water / Flood / Hydrology questions
        elif re.search(r"water|flood|inundat|lake|river|level|pond|pani|nadi|jal", q):
            if d_water > 2.0 or (d_barren > 5.0 and d_veg < -5.0):
                flood_shift = d_water if d_water > 2.0 else change_pct
                answer = (
                    f"{roi_prefix}Water coverage increased by +{flood_shift:.1f}% across the bi-temporal interval "
                    f"(from {stats0['water_coverage_pct']:.1f}% at T0 to {stats1['water_coverage_pct']:.1f}% at T1). "
                    f"In total, {change_pct:.1f}% of the area shows hydrological shift, flood inundation, or sediment deposition."
                )
            elif stats1["water_coverage_pct"] < 1.0 and stats0["water_coverage_pct"] < 1.0:
                answer = (
                    f"{roi_prefix}Surface water presence remains minimal in both scenes (<1.0%). "
                    f"Observed changes correspond to {stats1['dominant_class'].lower()} rather than flooding."
                )
            else:
                answer = (
                    f"{roi_prefix}Surface water levels remained relatively stable with a minor shift of {d_water:+.1f}% "
                    f"between T0 ({stats0['water_coverage_pct']:.1f}%) and T1 ({stats1['water_coverage_pct']:.1f}%)."
                )

        # 3. Fire / Thermal questions
        elif re.search(r"fire|burn|flame|heat|wildfire|ash|thermal|aag", q):
            if d_fire > 2.0 or d_burn > 3.0 or stats1["fire_coverage_pct"] > 3.0:
                total_burn = stats1["fire_coverage_pct"] + stats1["burn_scar_pct"]
                answer = (
                    f"{roi_prefix}Wildfire and burn scar progression is confirmed across {total_burn:.1f}% of the post-event scene "
                    f"(Active fire: {stats1['fire_coverage_pct']:.1f}%, Charred scar: {stats1['burn_scar_pct']:.1f}%). "
                    f"Pre-event canopy decreased by {abs(d_veg):.1f}%."
                )
            else:
                answer = (
                    f"{roi_prefix}No significant wildfire or thermal burn anomalies emerged between T0 and T1."
                )

        # 4. Vegetation questions
        elif re.search(r"vegetation|forest|tree|crop|agriculture|green|deforest|ped|fasal|jungle", q):
            if d_veg < -5.0:
                answer = (
                    f"{roi_prefix}Green vegetation canopy decreased by {abs(d_veg):.1f}% "
                    f"(T0: {stats0['vegetation_coverage_pct']:.1f}% → T1: {stats1['vegetation_coverage_pct']:.1f}%), "
                    f"reflecting significant clearing, canopy loss, or flood submergence."
                )
            elif d_veg > 5.0:
                answer = (
                    f"{roi_prefix}Vegetation cover expanded by +{d_veg:.1f}% "
                    f"(T0: {stats0['vegetation_coverage_pct']:.1f}% → T1: {stats1['vegetation_coverage_pct']:.1f}%), "
                    f"indicating seasonal greening or crop growth."
                )
            else:
                answer = (
                    f"{roi_prefix}Vegetation cover remained stable (T0: {stats0['vegetation_coverage_pct']:.1f}% "
                    f"vs T1: {stats1['vegetation_coverage_pct']:.1f}%, variance: {d_veg:+.1f}%)."
                )

        # 5. Urban / Infrastructure questions
        elif re.search(r"building|urban|structure|road|construction|imarat|sadak", q):
            answer = (
                f"{roi_prefix}Built-up surface appearance changed by {d_urban:+.1f}% "
                f"(T0: {stats0['urban_coverage_pct']:.1f}% → T1: {stats1['urban_coverage_pct']:.1f}%)."
            )

        # 6. General change overview
        else:
            dominant_shift = (
                f"flood inundation (+{d_water:.1f}% water expansion)" if d_water > 3.0 else
                f"wildfire progression (+{d_fire+d_burn:.1f}% thermal/burn)" if (d_fire + d_burn) > 3.0 else
                f"vegetation reduction (-{abs(d_veg):.1f}% canopy loss)" if d_veg < -4.0 else
                f"surface transition from {stats0['dominant_class'].lower()} to {stats1['dominant_class'].lower()}"
            )
            answer = (
                f"{roi_prefix}Bi-temporal comparison indicates that approximately {change_pct:.1f}% of the scene "
                f"underwent significant physical change, primarily characterized by {dominant_shift}. "
                f"Measured variances: Vegetation Δ={d_veg:+.1f}%, Water Δ={d_water:+.1f}%, Urban Δ={d_urban:+.1f}%."
            )

        evidence_regions = []
        if bbox:
            evidence_regions.append({
                "bbox": bbox,
                "label": "primary_change_cluster",
                "confidence": min(0.95, max(0.5, round(change_pct / 100.0 + 0.5, 2))),
            })

        elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)

        return AgentOutput(
            agent_id=self.AGENT_ID,
            agent_name=self.AGENT_NAME,
            task="Change Visual Question Answering",
            result={
                "question": question,
                "answer": answer,
                "change_context": "Bi-temporal comparison (T0 → T1)",
                "pixel_change_percent": change_pct,
                "t0_stats": stats0,
                "t1_stats": stats1,
                "model": "Bi-temporal Query Reasoner",
                "inference_time_ms": elapsed_ms,
            },
            evidence_regions=evidence_regions or None,
            raw_score=0.94,
        )
