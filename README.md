# 🛰 SatQuery AI — Interactive Vision-Language Assistant for Remote Sensing

[![ISRO Problem Statement](https://img.shields.io/badge/ISRO-SIH26167-blue?style=for-the-badge&logo=satellite)](https://www.isro.gov.in/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.3-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/Tests-150%20Passed-10B981?style=for-the-badge&logo=pytest&logoColor=white)](tests/)

> **Interactive Multimodal Satellite Copilot for Optical, SAR, Bi-Temporal Change Detection, Spectral Analysis, Visual Grounding, and Autonomous Multi-Agent Verification through Natural Language Queries.**

---

## 📌 Executive Summary

**SatQuery AI** is an end-to-end autonomous remote sensing intelligence system built for **ISRO Problem Statement SIH26167** (Smart India Hackathon 2026). It bridges the gap between raw multi-sensor Earth observation rasters (Sentinel-2, Landsat-8, Sentinel-1 SAR, high-resolution aerial RGB) and non-expert domain users by translating natural language queries (in English, Hindi, or Hinglish) into deterministic, evidence-grounded spatial intelligence.

### Key Highlights
- **Single-Query Dispatch & Guided Mission UX:** Replaces crowded dashboard overload with a cinematic 6-step guided mission workflow (**Observations $\rightarrow$ Change $\rightarrow$ Spatial Impact $\rightarrow$ Evidence $\rightarrow$ Mission Finding $\rightarrow$ Confidence & Provenance**).
- **Multi-Sensor & Multi-Modal Fusion:** Dynamically selects and fuses Optical RGB, Multispectral (B02–B08 NDVI/NDWI), and SAR C-band radar backscatter based on query intent and atmospheric cloud cover.
- **Deep Bi-Temporal Change Detection:** Transformer-based spatial-temporal difference modeling (ChangeFormer), damage severity scoring, and georeferenced area calculation ($\text{km}^2$).
- **Visual Grounding & Precision ROI:** Sub-pixel segment grounding with Segment Anything (SAM), freehand & polygon ROI bounding, and spatial intersection against building infrastructure.
- **Explainable Trust & Math-Grounded Confidence:** Full 6-component harmonic confidence scoring ($\ge 0.0$ to $1.0$) with zero fabricated numbers and clickable step-by-step execution provenance traces.
- **Automated Intelligence Reporting:** Instant export of comprehensive, auditable PDF reports via ReportLab.

---

## 🏛 System Architecture

```
                                  USER QUERY (Text / Voice)
                                             │
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │            EarthQueryCompiler (NLP)           │
                     │  Intent Classification · Entity Extraction    │
                     │  Temporal Context · Task Type · Sensor Hint   │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │          Sensor & Modality Selector           │
                     │  Optical vs SAR vs Multi-Modal Arbitrator     │
                     │  Cloud Cover Assessment · Sensor Rationale    │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │               Analysis Planner                │
                     │  Dynamic Task Graph Construction              │
                     └───────────────────────┬───────────────────────┘
                                             │
                       ┌─────────────────────┼─────────────────────┐
                       │                     │                     │
                       ▼                     ▼                     ▼
              ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
              │    VQA Agent    │   │ Change Detector │   │  SAM Grounding  │
              │  (BLIP-2 RSVQA) │   │  (ChangeFormer) │   │ (Bounding Box)  │
              └────────┬────────┘   └────────┬────────┘   └────────┬────────┘
                       │                     │                     │
                       ▼                     ▼                     ▼
              ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
              │ Captioning Agent│   │ Spectral Index  │   │ SAR Processing  │
              │ (GeoChat / VLM) │   │  (NDVI / NDWI)  │   │  (GF-SARNet)    │
              └────────┬────────┘   └────────┬────────┘   └────────┬────────┘
                       │                     │                     │
                       └─────────────────────┼─────────────────────┘
                                             │
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │            Evidence Fusion Engine             │
                     │  Cross-Modal Feature Map Alignment            │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │          Multi-Agent Verifier & Audit         │
                     │  Consensus Checking · Conflict Arbitration    │
                     │  Autonomous Re-Planning on Discrepancies      │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │         6-Component Confidence Scorer         │
                     │  Weighted Harmonic Mean of 6 Evidence Vectors │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │         Provenance & Trace Generation         │
                     │  Step-by-step Auditable Execution Graph       │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             ▼
                              6-STEP GUIDED MISSION WORKFLOW
```

---

## 🗺 6-Step Guided Mission Flow UI/UX

SatQuery AI introduces a guided, step-by-step intelligence walkthrough where one single backend analysis execution is presented across six specialized views:

| Step | View Title | Focus Area | Visual & Analytical Payoff |
| :---: | :--- | :--- | :--- |
| **00** | **Mission Setup** | Input Initialization | Dual PRE/POST observation cards, natural language query input, Web Speech API voice transcription, polygon ROI drawing studio, and instant sample dataset presets. |
| **01** | **Mission Finding** | Primary Intelligence | Instant high-impact verified answer, Multimodal Semantic Reasoning (VLM) scene observations, uncertainty boundaries, and 1-click PDF mission report export. |
| **02** | **Observations** | Raw Satellite Telemetry | High-resolution side-by-side comparison of T₁ baseline and T₂ target imagery, EarthQuery classification intent, and sensor hints. |
| **03** | **What Changed?** | Differential Dynamics | Triptych view (T₁ $\mid$ $\Delta t$ Change Dynamics $\mid$ T₂), ChangeFormer metrics ($\text{km}^2$ area, change extent %, severity level). |
| **04** | **Where Did It Happen?** | Spatial Grounding | Interactive visual canvas with color-coded bounding boxes, polygon ROI overlays, detected structures, and georeferenced coordinates. |
| **05** | **Why Do We Believe It?** | Multi-Agent Consensus | Verifier agreement banner, conflict arbitration notes, sensor selection rationale, and individual specialist agent output cards. |
| **06** | **Confidence & Provenance** | Trust & Transparency | 6-Component confidence radar chart, component bar gauges, and clickable end-to-end execution trace graph. |

---

## 🔬 Multi-Modal Capabilities & Algorithms

### 1. Multispectral Vegetation & Water Analysis (Sentinel-2)
- Real band extraction (B03 Green, B04 Red, B08 NIR) via `rasterio`.
- Normalized Difference Vegetation Index:
  $$\text{NDVI} = \frac{\text{B08} - \text{B04}}{\text{B08} + \text{B04}}$$
- Normalized Difference Water Index:
  $$\text{NDWI} = \frac{\text{B03} - \text{B08}}{\text{B03} + \text{B08}}$$
- True valid-pixel masking, statistical canopy distributions, and honest rejection of multispectral indices on standard 3-band RGB imagery.

### 2. Bi-Temporal Change Detection (ChangeFormer)
- Siamese transformer architecture comparing baseline $T_1$ and target $T_2$ rasters.
- Pixel-level change probability maps, thresholded cluster masking, and georeferenced affected area computation ($\text{km}^2$).

### 3. All-Weather Radar Backscatter (Sentinel-1 SAR)
- Dual-polarization VV/VH backscatter extraction for cloud penetration and floodwater extent mapping during heavy cloud cover.

### 4. 6-Component Confidence Formulation
The confidence score is computed as a weighted harmonic mean across six distinct evidence vectors:
1. **Task Classification Confidence ($c_{\text{task}}$):** EarthQuery parser certainty.
2. **Sensor Compatibility ($c_{\text{sensor}}$):** Sensor suitability for requested query (e.g. SAR for floods/clouds, NIR for crops).
3. **Model Output Quality ($c_{\text{model}}$):** Specialist raw inference quality.
4. **Evidence Agreement ($c_{\text{agree}}$):** Cross-agent consensus score.
5. **Temporal Consistency ($c_{\text{temp}}$):** Spatial-temporal coherence across image pairs.
6. **Answer Groundedness ($c_{\text{ground}}$):** Ratio of verified visual evidence supporting the final text statement.

$$\text{Overall Confidence} = \frac{6}{\sum_{i=1}^{6} \frac{w_i}{c_i}}$$

---

## 📁 Repository Structure

```
e:\SAT\
├── backend/
│   ├── main.py                         # FastAPI application entrypoint
│   ├── orchestrator.py                 # 7-phase agentic pipeline orchestrator
│   ├── agents/                         # Specialist AI agent dispatchers
│   │   ├── vqa_agent.py                # Visual Question Answering (BLIP-2 RSVQA)
│   │   ├── caption_agent.py            # Image & scene captioning
│   │   ├── grounding_agent.py          # Visual grounding & bounding box detection
│   │   ├── change_detection_agent.py   # ChangeFormer bi-temporal difference agent
│   │   ├── change_vqa_agent.py         # Bi-temporal Change-VQA
│   │   ├── sar_optical_agent.py        # Sentinel-1 SAR & Optical fusion
│   │   ├── building_segmentation.py    # Building footprint segmentation
│   │   ├── sam_refinement_agent.py     # Segment Anything (SAM) fine contour refinement
│   │   └── spectral_analysis_agent.py  # Multispectral NDVI/NDWI spectral engine
│   ├── services/                       # Core analytical services
│   │   ├── earthquery/compiler.py      # Natural language to EarthQuerySpec compiler
│   │   ├── sensor_selector.py          # Sensor selection & cloud cover arbitrator
│   │   ├── evidence_fusion.py          # Multi-source cross-modal evidence fusion
│   │   ├── verifier.py                 # Multi-agent agreement & re-planning engine
│   │   ├── confidence.py               # 6-Component harmonic confidence calculator
│   │   └── provenance.py               # Execution trace graph tracker
│   ├── models/                         # Native inference models & benchmark wrappers
│   │   ├── changeformer/               # ChangeFormer model inference & benchmark
│   │   ├── vlm/                        # Multimodal semantic reasoning context engine
│   │   ├── sam/                        # SAM prompt-based segmenter
│   │   └── sar/                        # SAR processing pipeline
│   ├── api/                            # FastAPI routing endpoints
│   │   ├── routes_query.py             # POST /query/analyze, POST /query/compile
│   │   └── routes_report.py            # GET /report/download/{id} (PDF Generator)
│   └── schemas/response.py             # Ground-truth Pydantic schemas
├── frontend/
│   ├── src/
│   │   ├── App.tsx                     # Main application shell with mission state
│   │   ├── components/
│   │   │   ├── SatScrollHero.tsx       # 360-frame cinematic parallax landing hero
│   │   │   ├── MissionSetup.tsx        # Phase 00: Dual uploads, query, voice, ROI
│   │   │   ├── MissionResults.tsx      # Phase 01–06: 6-Step guided mission workflow
│   │   │   ├── PolygonAnnotator.tsx    # Interactive polygon & bounding box studio
│   │   │   ├── EarthGlobeBackground.tsx# 3D WebGL Earth globe with geo fly-to
│   │   │   ├── ConfidenceBreakdown.tsx # 6-Component Chart.js radar & gauge bars
│   │   │   ├── ProvenanceGraph.tsx     # Clickable step execution trace graph
│   │   │   ├── AgentOutputCard.tsx     # Specialist agent result cards
│   │   │   ├── SensorDecision.tsx      # Sensor selection rationale display
│   │   │   └── EarthQuerySpec.tsx      # Query compilation spec panel
│   │   ├── index.css                   # Cybernetic aerospace design system
│   │   └── types.ts                    # TypeScript schema definitions
│   ├── public/SATQUERY-SEQUENCE/       # High-res 360-frame orbital sequence
│   ├── package.json
│   └── vite.config.ts                  # Vite config with API proxy
├── tests/                              # Comprehensive test suite (150 tests)
│   ├── test_orchestrator.py
│   ├── test_changeformer.py
│   ├── test_evidence_fusion.py
│   ├── test_vlm_semantic_reasoner.py
│   └── benchmarking/
├── AUDIT.md                            # ISRO SIH26167 functional compliance audit
├── CHANGELOG.md                        # Version changelog
└── SIH26167_Judges_Presentation.md    # Judge presentation walkthrough script
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python:** $\ge$ 3.10 (3.12 recommended)
- **Node.js:** $\ge$ 18.0
- **npm:** $\ge$ 9.0

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/SatQuery-AI.git
cd SatQuery-AI
```

---

### Step 2: Backend Setup
```bash
# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate   # On Windows
# source venv/bin/activate # On Linux/macOS

# Install dependencies
pip install -r backend/requirements.txt

# Start FastAPI backend server
python -m uvicorn backend.main:app --reload --port 8000
```
- Backend API running at: `http://localhost:8000`
- Interactive Swagger docs: `http://localhost:8000/docs`

---

### Step 3: Frontend Setup
In a separate terminal:
```bash
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
- Web Application running at: `http://localhost:5173`

---

### Step 4: Run Automated Tests
```bash
# Run complete test suite (150 test cases)
pytest tests/ -v

# Verify frontend build
cd frontend
npm run build
```

---

## 📡 API Reference

### 1. Analyze Satellite Query
- **Endpoint:** `POST /query/analyze`
- **Description:** Primary entrypoint for multi-modal analysis. Dispatches orchestrator pipeline and returns full query response.
- **Request Payload:**
```json
{
  "question": "Identify newly constructed buildings and calculate total changed area",
  "image_b64": "<base64_encoded_T1_raster>",
  "image2_b64": "<base64_encoded_T2_raster>",
  "language": "en-IN",
  "polygon": [[0.2, 0.3], [0.8, 0.3], [0.8, 0.7], [0.2, 0.7]],
  "roi_mode": true,
  "target_scene": "both"
}
```
- **Response Shape:**
```json
{
  "query_id": "query-9f4a8b1c",
  "question": "Identify newly constructed buildings...",
  "earthquery_spec": {
    "intent": "urban_change_detection",
    "task_type": "change_detection",
    "requires_two_images": true,
    "confidence": 0.94
  },
  "sensor_selection": {
    "selected_sensor": "Sentinel-2 Multispectral",
    "rationale": "High spatial resolution optical pair suited for building boundary extraction",
    "cloud_cover_estimate": 4.2
  },
  "agent_outputs": [ ... ],
  "verifier_result": {
    "agreement": true,
    "conflicts_found": [],
    "final_answer": "Detected 14 newly constructed buildings with an estimated affected area of 0.42 km²."
  },
  "confidence_breakdown": {
    "task_classification": 0.94,
    "sensor_compatibility": 0.96,
    "model_output_quality": 0.91,
    "evidence_agreement": 0.95,
    "temporal_consistency": 0.89,
    "answer_groundedness": 0.93,
    "overall": 0.93
  },
  "execution_trace": {
    "trace_id": "trace-9f4a8b1c",
    "total_duration_ms": 342.5,
    "steps": [ ... ]
  },
  "answer": "Detected 14 newly constructed buildings with an estimated affected area of 0.42 km².",
  "report_url": "/report/download/query-9f4a8b1c"
}
```

### 2. Download Intelligence Report
- **Endpoint:** `GET /report/download/{query_id}`
- **Description:** Generates and returns a downloadable, publication-grade PDF report containing evidence imagery, confidence breakdown, and trace audit.

### 3. Health Check
- **Endpoint:** `GET /health`
- **Response:** `{"status": "ok", "service": "SatQuery AI", "ps": "SIH26167"}`

---

## 🏆 SIH26167 ISRO Problem Statement Compliance Matrix

| # | Mandatory PS Requirement | Implementation Component | Verification Method | Compliance |
| :---: | :--- | :--- | :--- | :---: |
| **1** | Single-image Visual Question Answering (VQA) | `backend/agents/vqa_agent.py` | Unit & E2E PyTest | **100%** |
| **2** | Single-image Captioning & Description | `backend/agents/caption_agent.py` | Multimodal VLM Context | **100%** |
| **3** | Visual Grounding & Sub-pixel Localization | `backend/agents/grounding_agent.py`, `SAM` | Bounding box coordinates | **100%** |
| **4** | Bi-temporal Change Detection | `backend/agents/change_detection_agent.py` | ChangeFormer Transformer | **100%** |
| **5** | Change-VQA (Queries across image pairs) | `backend/agents/change_vqa_agent.py` | Bi-temporal difference VQA | **100%** |
| **6** | Optical ↔ SAR Multi-Modal Fusion | `backend/agents/sar_optical_agent.py` | GF-SARNet C-band radar | **100%** |
| **7** | Autonomous Multi-Agent Orchestration | `backend/orchestrator.py` | 7-phase dynamic pipeline | **100%** |
| **8** | EarthQuery Compiler (NL $\rightarrow$ Spec) | `backend/services/earthquery/compiler.py` | Intent parsing & entities | **100%** |
| **9** | Transparent Sensor Selection with Rationale | `backend/services/sensor_selector.py` | Cloud arbitration & reasoning | **100%** |
| **10** | Evidence Verification & Conflict Re-planning | `backend/services/verifier.py` | Cross-agent verification checks | **100%** |
| **11** | 6-Component Mathematical Confidence | `backend/services/confidence.py` | Weighted harmonic formulation | **100%** |
| **12** | Auditable Provenance & Execution Trace | `backend/services/provenance.py` | Step-by-step trace graph | **100%** |
| **13** | Web GUI / Mission Copilot Interface | `frontend/src/` (React + Vite) | 6-step guided mission workflow | **100%** |
| **14** | Visual Evidence Display (Bounding Boxes/Polygons) | `PolygonAnnotator.tsx`, `MissionResults.tsx` | Interactive canvas overlays | **100%** |
| **15** | Downloadable PDF Intelligence Reports | `backend/api/routes_report.py` | ReportLab PDF engine | **100%** |
| **16** | Multilingual & Voice Input Support | `MissionSetup.tsx`, Web Speech API | English, Hindi & Hinglish | **100%** |

---

## 👥 Contributors & Acknowledgements

- **Developed for:** Smart India Hackathon (SIH 2026)
- **Problem Statement:** SIH26167
- **Organization:** Indian Space Research Organisation (ISRO)

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
