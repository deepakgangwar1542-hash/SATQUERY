# SatQuery AI — An Interactive Vision-Language Assistant for Multimodal Remote Sensing Image Analysis through Text Queries

[![ISRO SIH 2026](https://img.shields.io/badge/ISRO_SIH_2026-SIH26167-blue.svg)](https://www.sih.gov.in/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI_0.111-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com/)
[![React + Vite](https://img.shields.io/badge/Frontend-React_18_+_Vite-61DAFB.svg?logo=react)](https://vitejs.dev/)
[![PyTorch](https://img.shields.io/badge/Deep_Learning-PyTorch-EE4C2C.svg?logo=pytorch)](https://pytorch.org/)
[![Rasterio & Shapely](https://img.shields.io/badge/Geospatial-Rasterio_+_Shapely-43853D.svg)](https://rasterio.readthedocs.io/)
[![Tests Passing](https://img.shields.io/badge/Tests-150%2F150_Passed-success.svg)](tests/)

**ISRO Smart India Hackathon 2026 · Problem Statement SIH26167**  
*Organization: Indian Space Research Organisation (ISRO)*

---

## Table of Contents

- [One-Line Pitch](#one-line-pitch)
- [PS Requirement → File Compliance Table](#ps-requirement--file-compliance-table)
- [Architecture & Execution Flow](#architecture--execution-flow)
- [Real Data Engineering & Operational Capabilities](#real-data-engineering--operational-capabilities)
- [Empirical Benchmarking & Evaluation Suite](#empirical-benchmarking--evaluation-suite)
- [Frontend GUI & Interactive Features](#frontend-gui--interactive-features)
- [Repository Structure](#repository-structure)
- [Quickstart: Running Locally](#quickstart-running-locally)
- [Verification & Automated Tests](#verification--automated-tests)
- [In-Depth Documentation Index](#in-depth-documentation-index)

---

## One-Line Pitch

> **Ask any natural-language question about satellite imagery — SatQuery AI routes it through a capability-aware, multi-modal agentic pipeline spanning VQA, ChangeFormer change detection, Sentinel-1 SAR radar backscatter, BuildingResUNet footprint extraction, spatial hazard intersection, and Segment Anything visual grounding, returning a confident, auditable, evidence-grounded answer.**

---

## PS Requirement → File Compliance Table

Every mandatory functional item from SIH26167 and all core multi-modal extensions are fully implemented, verified, and wired into the live request path:

| # | PS Requirement | Implementing File(s) | Status | Live UI / Artifact |
|---|---|---|---|---|
| 1 | **Single-image VQA** | [`backend/agents/vqa_agent.py`](backend/agents/vqa_agent.py) | ✅ Live | Answer & natural-language explanation |
| 2 | **Single-image Captioning** | [`backend/agents/caption_agent.py`](backend/agents/caption_agent.py) | ✅ Live | Semantic scene summary + land cover % |
| 3 | **Visual Grounding** (localization & bounding boxes) | [`backend/agents/grounding_agent.py`](backend/agents/grounding_agent.py), [`backend/agents/sam_agent.py`](backend/agents/sam_agent.py) | ✅ Live | Bounding boxes + polygon coordinates |
| 4 | **Bi-temporal Change Detection** | [`backend/agents/change_detection_agent.py`](backend/agents/change_detection_agent.py), [`backend/models/changeformer/`](backend/models/changeformer/) | ✅ Live | Change percentage, change map, severity |
| 5 | **Change-VQA** (conversational temporal queries) | [`backend/agents/change_vqa_agent.py`](backend/agents/change_vqa_agent.py) | ✅ Live | Dual-temporal reasoning & verification |
| 6 | **Optical ↔ SAR Joint Analysis** | [`backend/agents/sar_optical_agent.py`](backend/agents/sar_optical_agent.py), [`backend/services/sar/`](backend/services/sar/) | ✅ Live | Microwave backscatter + cross-modality insights |
| 7 | **Agentic Orchestration** | [`backend/orchestrator.py`](backend/orchestrator.py), [`backend/services/analysis_planner.py`](backend/services/analysis_planner.py) | ✅ Live | Task-first routing & parallel execution |
| 8 | **EarthQuery Compiler** (NL → structured spec) | [`backend/services/earthquery/compiler.py`](backend/services/earthquery/compiler.py) | ✅ Live | Visible query intent, entities, temporal state |
| 9 | **Sensor Selection with Rationale** | [`backend/services/sensor_selector.py`](backend/services/sensor_selector.py) | ✅ Live | Selected sensor, cloud check & decision rationale |
| 10 | **Evidence Verifier & Re-Planner** | [`backend/services/verifier.py`](backend/services/verifier.py) | ✅ Live | Cross-agent consistency & conflict resolution |
| 11 | **6-Component Confidence Breakdown** | [`backend/services/confidence.py`](backend/services/confidence.py) | ✅ Live | Radar chart & 6 bar gauges |
| 12 | **Auditable Provenance / Execution Trace** | [`backend/services/provenance.py`](backend/services/provenance.py) | ✅ Live | Interactive clickable execution step graph |
| 13 | **GUI / Web Application** | [`frontend/src/`](frontend/src/) (React 18, Vite, Canvas 3D) | ✅ Live | 2-column reactive responsive interface |
| 14 | **Visual Evidence Grounding** | [`frontend/src/components/AgentOutputCard.tsx`](frontend/src/components/AgentOutputCard.tsx), [`frontend/src/components/PolygonAnnotator.tsx`](frontend/src/components/PolygonAnnotator.tsx) | ✅ Live | Interactive polygon overlay & evidence chips |
| 15 | **Downloadable PDF Report** | [`backend/api/routes_report.py`](backend/api/routes_report.py) (ReportLab) | ✅ Live | Full executive summary & metric export PDF |
| 16 | **Voice Input (Speech-to-Text)** | [`frontend/src/components/QueryComposer.tsx`](frontend/src/components/QueryComposer.tsx) | ✅ Live | Real-time speech recognition (English & Hindi) |
| 17 | **Building Footprint & Spatial Impact** | [`backend/models/buildings/`](backend/models/buildings/), [`backend/services/spatial_intersection.py`](backend/services/spatial_intersection.py) | ✅ Live | ResUNet footprint segmentation & overlap metric |
| 18 | **Empirical Benchmarking Harness** | [`backend/benchmarking/`](backend/benchmarking/) | ✅ Live | IoU, Dice, Precision, Recall, ECE calculation |

---

## Architecture & Execution Flow

SatQuery AI rejects traditional *sensor-first* designs (*"Sentinel-1 implies flood"*). Instead, it adopts a **Task-First, Capability-Aware** paradigm:

```
User Query (Text / Voice)
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EarthQueryCompiler                           │
│  NL → EarthQuerySpec (intent, task_type, sensor_hint,          │
│         temporal_context, entities, target_regions)             │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                 DataCapabilityChecker & Preprocessor            │
│  Rasterio validation, CRS projection, nodata masking,           │
│  spatial alignment, dynamic normalization (optical / SAR)       │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SensorSelector                             │
│  Chooses Optical / SAR / Multi-modal + outputs detailed rationale│
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AnalysisPlanner                            │
│  Constructs task execution graph & dispatches specialist models │
└───────────────────────────┬─────────────────────────────────────┘
                            │
      ┌─────────────────────┼─────────────────────┐
      │                     │                     │
      ▼                     ▼                     ▼
┌───────────────┐     ┌───────────────┐     ┌────────────────┐
│ ChangeFormer  │     │ Sentinel-1    │     │ BuildingUNet   │
│ Bi-temporal   │     │ C-band SAR    │     │ Footprint      │
│ Transformer   │     │ Backscatter   │     │ Segmentation   │
└───────┬───────┘     └───────┬───────┘     └───────┬────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐     ┌───────────────┐     ┌────────────────┐
│ SpectralAgent │     │ SAM Agent     │     │ VQA / Caption  │
│ (NDVI/NDWI)   │     │ Zero-shot SAM │     │ Semantic VLM   │
└───────┬───────┘     └───────┬───────┘     └───────┬────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Evidence Fusion Engine                         │
│  Cross-sensor IoU agreement, cloud-adaptive weighting (up to 85%│
│  SAR weight under high cloud cover), unified hazard masking    │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│             Spatial Intersection Engine (Shapely)               │
│  Area(Building ∩ Hazard) / Area(Building) ≥ Overlap Threshold   │
│  Multi-threshold sensitivity analysis (5%, 10%, 20%, 30%, 50%) │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              Evidence Verifier & Conflict Detector              │
│  Cross-validates outputs (affected ≤ total, sensor divergence), │
│  triggers automated re-planning when divergence exceeds 0.20    │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│           6-Component Confidence Scorer (Harmonic Mean)         │
│  Task Certainty (0.15), Sensor Compatibility (0.20),           │
│  Output Quality (0.25), Evidence Agreement (0.15),              │
│  Temporal Consistency (0.10), Answer Groundedness (0.15)        │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              ProvenanceTracker & Audit Engine                   │
│  Full JSON execution trace with millisecond runtime timestamps  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│            Unified QueryResponse (REST API & Frontend)          │
│  Rendered across 8 interactive UI cards + Downloadable PDF      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Real Data Engineering & Operational Capabilities

SatQuery AI guarantees that **no fake detections or synthetic statistics are ever fabricated**:

### 1. Sentinel-2 Multispectral Processing
- **Direct Rasterio Band Extraction**: Ingests authentic Blue (B02), Green (B03), Red (B04), and NIR (B08) rasters.
- **Genuine Mathematical Indices**: Computes $\text{NDVI} = \frac{B8 - B4}{B8 + B4}$, $\text{NDWI} = \frac{B3 - B8}{B3 + B8}$, and $\text{NBR} = \frac{B8 - B12}{B8 + B12}$.
- **Strict Data Gating**: Rejects requests to compute multispectral NDVI on standard 3-band RGB imagery, returning transparent capability notes.

### 2. Sentinel-1 C-Band SAR Radar Analysis
- **GRD Microwave Ingestion**: Extracts authentic VV and VH polarization bands via `rasterio`.
- **Radiometric Conversion**: Converts linear power to decibels ($\sigma^0_{\text{dB}} = 10 \cdot \log_{10}(\text{power})$).
- **Log-Ratio Temporal Change**: Calculates $\Delta \sigma^0_{\text{dB}} = \sigma^0_{T1,\text{dB}} - \sigma^0_{T0,\text{dB}}$.
  - **Specular drop ($\Delta \sigma^0_{\text{dB}} < -\tau$)**: Identifies newly inundated floodwaters.
  - **Double-bounce increase ($\Delta \sigma^0_{\text{dB}} > +\tau$)**: Identifies new urban construction / vertical structures.

### 3. Building Footprint Extraction & Disaster Impact Engine
- **`BuildingResUNet` Architecture**: 4-stage residual encoder with skip-connection decoders trained for building edge preservation.
- **Large Image Tiling**: Memory-safe decomposition with Hann window cosine blending to eliminate boundary stitching artifacts.
- **Vector Instance Polygonization**: Extracts distinct building polygons using Shapely.
- **Geometric Spatial Intersection**: Calculates exact submersion ratios $\frac{\text{Area}(B_i \cap \Delta \text{Flood})}{\text{Area}(B_i)} \ge \tau$.
- **Multi-Threshold Sensitivity Analysis**: Evaluates affected counts across 5%, 10%, 20%, 30%, and 50% thresholds to prove robustness.

### 4. Deep Bi-Temporal Change Detection (ChangeFormer)
- **Siamese Transformer Encoder**: Multi-scale difference extraction across 4 hierarchical scales ($1/4, 1/8, 1/16, 1/32$).
- **CPU & GPU Auto-Detection**: Dynamically maps tensors to CUDA if available, falling back to multi-core CPU execution without crashing.

### 5. Zero-Shot Grounding & SAM Refinement
- Prompts Segment Anything Model (SAM) with bounding boxes or point hints to extract crisp object masks and georeferenced polygon vertices.

---

## Empirical Benchmarking & Evaluation Suite

SatQuery AI includes a **dedicated scientific evaluation framework** (`backend/benchmarking/`):

- **Zero-Fabrication Principle**: Scientific metrics (IoU, Dice, Precision, Recall, F1, Relative Error) are computed **only** when authentic empirical ground truth masks or labels are supplied.
- **Calibrated Evaluation**: Evaluates Expected Calibration Error (ECE) across confidence scores vs. accuracy bins.
- **Standardized Reporting**: Exports results to `summary.json`, `detailed_results.json`, `metrics.csv`, and formatted `report.md` with diagnostic visualizations.

### Running Benchmarks

```bash
# Run the built-in synthetic evaluation suite across all supported tasks
python -m backend.benchmarking.benchmark_runner --synthetic

# Run against a custom satellite dataset directory
python -m backend.benchmarking.benchmark_runner --dataset ./data/benchmark/my_dataset --output ./benchmark_results

# Run with customized configuration YAML
python -m backend.benchmarking.benchmark_runner --config backend/benchmarking/benchmark_config.yaml
```

---

## Frontend GUI & Interactive Features

The user interface (`frontend/src/`) is built with React 18, TypeScript, and modern canvas graphics:

1. **Voice Query Composer (`QueryComposer.tsx`)**:
   - Web Speech API integration supporting real-time Indian English (`en-IN`) and Hindi (`hi-IN`).
   - Drag-and-drop dual-image and single-image raster upload.
   - Quick prompt shortcuts for change detection, flood impact, urban sprawl, and VQA.
2. **Interactive Polygon Grounding Canvas (`PolygonAnnotator.tsx`)**:
   - Overlays vector bounding boxes and segmented polygons directly on satellite imagery.
   - Color-coded confidence indicators and interactive tooltip inspection.
3. **Sensor Decision Panel (`SensorDecision.tsx`)**:
   - Highlights the chosen sensor/modality, cloud cover estimation, and selection rationale.
4. **6-Component Confidence Breakdown (`ConfidenceBreakdown.tsx`)**:
   - Interactive Chart.js radar chart and individual bar gauges for all 6 evidence dimensions.
5. **Clickable Provenance Graph (`ProvenanceGraph.tsx`)**:
   - Visual execution graph tracing each step's status, model name, and execution duration in milliseconds.
6. **Downloadable Executive Report**:
   - Instant PDF generation compiling user query, raster metadata, agent findings, confidence breakdown, and execution provenance.
7. **Dynamic Geospatial UX**:
   - 3D interactive Earth Globe and cursor-reactive canvas backgrounds for a state-of-the-art visual presentation.

---

## Repository Structure

```
SATQUERY/
├── backend/
│   ├── main.py                         # FastAPI application entry & middleware
│   ├── orchestrator.py                 # Core 7-step pipeline & agent execution
│   ├── requirements.txt                # Python dependencies (PyTorch, Rasterio, Shapely)
│   ├── agents/                         # Specialist analysis agents
│   │   ├── building_segmentation_agent.py # Building footprint extraction
│   │   ├── caption_agent.py            # Scene captioning & land cover distribution
│   │   ├── change_detection_agent.py   # ChangeFormer & pixel differencing
│   │   ├── change_vqa_agent.py         # Conversational change reasoning
│   │   ├── grounding_agent.py          # Bounding box visual grounding
│   │   ├── sam_agent.py                # Segment Anything Model refinement
│   │   ├── sar_optical_agent.py        # Sentinel-1 microwave & optical fusion
│   │   ├── spectral_analysis_agent.py  # Multispectral indices (NDVI, NDWI, NBR)
│   │   └── vqa_agent.py                # Visual question answering
│   ├── api/
│   │   ├── routes_query.py             # POST /query/analyze, POST /query/compile
│   │   └── routes_report.py            # GET /report/download/{id} (PDF generation)
│   ├── benchmarking/                   # Empirical benchmarking framework
│   │   ├── benchmark_config.yaml       # Thresholds & dataset configuration
│   │   ├── benchmark_runner.py         # CLI & programmatic runner
│   │   ├── dataset_adapter.py          # SpaceNet, LEVIR-CD, OSCD format loaders
│   │   ├── evaluator.py                # Task-specific scoring engine
│   │   ├── metrics.py                  # IoU, Dice, Precision, Recall, ECE
│   │   └── report_generator.py         # Markdown, JSON, CSV & visualization exporter
│   ├── models/                         # Neural network backbones & adapters
│   │   ├── buildings/                  # BuildingResUNet, tiling & postprocessing
│   │   ├── changeformer/               # Siamese transformer change detection
│   │   ├── sam/                        # SAM adapter, candidate extractor & geometry
│   │   └── vlm/                        # Vision-Language reasoner context adapter
│   ├── schemas/
│   │   └── response.py                 # Pydantic schemas for all 8 response fields
│   └── services/
│       ├── analysis_planner.py         # Task-first execution graph planner
│       ├── confidence.py               # 6-component weighted harmonic mean scorer
│       ├── cv_analyzer.py              # Computer vision features & brightness proxies
│       ├── data_capability.py          # Authentic raster capability inspection
│       ├── earthquery/compiler.py      # Natural language query compiler
│       ├── evidence_fusion.py          # Multi-sensor spatial fusion & IoU agreement
│       ├── flood_analyzer.py           # Bi-temporal hydrological transition analyzer
│       ├── imagery/                    # Image validation, alignment, nodata masking
│       ├── provenance.py               # Millisecond execution trace generator
│       ├── sar/                        # Sentinel-1 GRD ingestion, despeckle & log-ratio
│       ├── sensor_selector.py          # Sensor selection logic with rationale
│       ├── spatial_intersection.py     # Shapely building-hazard intersection engine
│       ├── spatial_utils.py            # Metric area & geotransform conversions
│       ├── spectral_analyzer.py        # Multi-band spectral index engine
│       └── verifier.py                 # Cross-agent validation & conflict detector
├── frontend/
│   ├── package.json                    # React 18, Vite, Lucide icons, Chart.js
│   ├── vite.config.ts                  # Vite configuration & backend proxy
│   ├── index.html                      # Semantic HTML5 entry
│   └── src/
│       ├── App.tsx                     # Main layout & results coordinator
│       ├── index.css                   # Dark theme design system & animations
│       ├── types.ts                    # TypeScript types mirroring backend schemas
│       └── components/
│           ├── AgentOutputCard.tsx     # Agent score ring, findings, & evidence chips
│           ├── ConfidenceBreakdown.tsx # Radar chart & 6 individual component gauges
│           ├── CursorReactiveBackground.tsx # Interactive visual effects
│           ├── EarthGlobeBackground.tsx# 3D interactive Earth canvas
│           ├── EarthQuerySpec.tsx      # Natural language query breakdown
│           ├── PolygonAnnotator.tsx    # Interactive polygon grounding canvas
│           ├── ProvenanceGraph.tsx     # Step-by-step execution provenance graph
│           ├── QueryComposer.tsx       # Voice input, image upload & query controls
│           ├── ResultsPanel.tsx        # Responsive results assembly
│           ├── SatScrollHero.tsx       # Hero showcase header
│           └── SensorDecision.tsx      # Sensor rationale & cloud bar
├── docs/                               # Detailed technical design specifications
│   ├── ARCHITECTURE.md                 # Multi-modal task-agnostic architecture
│   ├── BUILDINGS.md                    # BuildingResUNet & spatial flood intersection
│   ├── CHANGEFORMER.md                 # Siamese transformer & imagery preprocessing
│   └── SAR_PIPELINE.md                 # Sentinel-1 C-band SAR radar pipeline
├── tests/                              # Automated test suite (150 tests)
│   ├── conftest.py                     # Pytest fixtures & synthetic rasters
│   ├── benchmarking/                   # Benchmark harness unit tests
│   ├── test_building_impact_e2e.py     # End-to-end building impact pipeline
│   ├── test_building_model.py          # BuildingResUNet inference & tiling
│   ├── test_changeformer.py            # ChangeFormer model & preprocessing
│   ├── test_evidence_architecture.py   # Multi-sensor planner & agent routing
│   ├── test_evidence_fusion.py         # Evidence fusion & cloud weight boosting
│   ├── test_imagery_preprocessing.py   # Raster alignment, nodata, & normalization
│   ├── test_orchestrator.py            # End-to-end orchestrator & PS compliance
│   ├── test_sam_refinement.py          # Segment Anything Model integration
│   ├── test_sar_pipeline.py            # Sentinel-1 radar processing & change
│   ├── test_spatial_intersection.py    # Shapely polygon intersection & sensitivity
│   ├── test_spectral_analyzer.py       # NDVI, NDWI, NBR spectral indices
│   └── test_vlm_semantic_reasoner.py   # VLM context builder & groundedness
├── AUDIT.md                            # Comprehensive PS compliance audit
├── CHANGELOG.md                        # Detailed development changelog
└── SIH26167_Judges_Presentation.md    # Demo script & live presentation guide
```

---

## Quickstart: Running Locally

### Prerequisites
- Python 3.10, 3.11, or 3.12
- Node.js 18+ and npm
- (Optional) NVIDIA GPU with CUDA for accelerated model inference

### 1. Backend Setup

```bash
# Navigate to the backend directory or project root
cd SATQUERY

# Install Python dependencies
pip install -r backend/requirements.txt

# Start the FastAPI application server
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

- **Interactive Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Alternative ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### 2. Frontend Setup

```bash
# In a separate terminal, navigate to the frontend directory
cd SATQUERY/frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

- **Web Application**: [http://localhost:5173](http://localhost:5173)

---

## Verification & Automated Tests

The repository contains **150 automated tests** covering unit, integration, and end-to-end flows.

```bash
# Run the complete test suite from the repository root
pytest tests/ -v

# Run tests for specific sub-systems
pytest tests/test_orchestrator.py            # Orchestrator & PS compliance
pytest tests/test_building_impact_e2e.py     # Building impact & flood intersection
pytest tests/test_sar_pipeline.py            # Sentinel-1 C-band SAR pipeline
pytest tests/test_changeformer.py            # ChangeFormer Siamese transformer
pytest tests/benchmarking/                   # Benchmarking & evaluation engine
```

All 150 tests pass with zero failures:
```
====================== 150 passed, 21 warnings in 6.37s =======================
```

---

## In-Depth Documentation Index

| Document | Topic & Scope |
|---|---|
| [**`docs/ARCHITECTURE.md`**](docs/ARCHITECTURE.md) | Architectural philosophy, task taxonomy, evidence fusion engine, and execution flow. |
| [**`docs/BUILDINGS.md`**](docs/BUILDINGS.md) | `BuildingResUNet` architecture, large image sliding-window tiling, and spatial hazard intersection. |
| [**`docs/CHANGEFORMER.md`**](docs/CHANGEFORMER.md) | Siamese transformer change detection, multi-scale feature difference, and preprocessing. |
| [**`docs/SAR_PIPELINE.md`**](docs/SAR_PIPELINE.md) | Sentinel-1 C-band GRD radar ingestion, decibel conversion, and log-ratio change detection. |
| [**`backend/benchmarking/README.md`**](backend/benchmarking/README.md) | Ground-truth benchmarking framework, evaluation metrics, and CLI instructions. |
| [**`AUDIT.md`**](AUDIT.md) | Problem Statement SIH26167 traceability matrix linking all 16 requirements to code. |
| [**`SIH26167_Judges_Presentation.md`**](SIH26167_Judges_Presentation.md) | Step-by-step judge demonstration guide and technical Q&A cheat sheet. |
| [**`CHANGELOG.md`**](CHANGELOG.md) | Version history, newly wired endpoints, and full component inventory. |

---

## Team & Presentation

- **Smart India Hackathon 2026**
- **Problem Statement**: SIH26167
- **Nodal Agency**: Indian Space Research Organisation (ISRO)
