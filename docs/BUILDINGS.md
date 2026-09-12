# Building-Impact Analysis Engine — SatQuery AI (SIH26167)

This document describes the architectural design, implementation details, operational guidelines, and configuration options for the **Building-Impact Analysis Engine** in SatQuery AI.

---

## 1. Overview & Problem Statement

For complex disaster assessment and remote sensing queries such as:
> *"Between June and August, identify areas where flooding increased and tell me how many buildings were affected."*

SatQuery AI does **not** rely on LLMs or Vision-Language Models to guess numbers or estimate building counts. Instead, it executes an authentic geospatial and computer vision workflow:

```
Temporal Satellite Imagery (T0, T1)
         │
         ├──► [1. Temporal Flood Analyzer] ──► Flood Mask T0 & T1 ──► Flood Increase Mask (ΔF = Flood_T1 & ~Flood_T0)
         │                                                                             │
         └──► [2. Building Segmentation Model] ──► Tiled Inference ──► Building Mask ──► Polygon Instances
                                                                                       │
                                                                                       ▼
                                                        [3. Spatial Intersection Engine (Shapely)]
                                                          • Evaluates Overlap Ratio: Area(B ∩ ΔF) / Area(B)
                                                          • Configurable Threshold: Overlap >= 10%
                                                          • Unique Building ID Deduplication
                                                          • Multi-Threshold Sensitivity Analysis
                                                                                       │
                                                                                       ▼
                                                        [4. Verification & Conflict Detection]
                                                          • Asserts: Affected Buildings <= Total Buildings
                                                          • Verifies Math & Geometry Validity
                                                                                       │
                                                                                       ▼
                                                        [5. Final Answer & Evidence Assembly]
```

---

## 2. Building Footprint Model Architecture

### Architecture: `BuildingResUNet`
Located at `backend/models/buildings/model.py`.
- **Encoder**: 4-stage residual convolutional encoder (64, 128, 256, 512 channels) preserving sharp geometric edges and roof boundary gradients.
- **Bridge**: Dual residual block capturing deep contextual spatial representations.
- **Decoder**: 4 upsampling decoder stages with bilinear interpolation, skip connections from encoder stages, and double convolutional refinement with BatchNorm and ReLU.
- **Head**: 1x1 convolution outputting raw building logits.
- **Benchmark Compatibility**: SpaceNet 1–7 Building Extraction and Inria Aerial Image Labeling benchmarks.

---

## 3. Large Image Tiling Engine

Satellite rasters frequently exceed model input dimensions. SatQuery AI features memory-safe tiled inference in `backend/models/buildings/tiling.py`:
- **Decomposition**: Slices imagery into overlapping tiles (default: 256x256 px with 64 px overlap).
- **Hann Window Blending**: Stitches tile probability outputs using a 2D Hann/cosine weighting window to eliminate tile boundary discontinuities.
- **Memory Safety**: Evaluates tiles in small batches, avoiding GPU out-of-memory errors on large scenes.

---

## 4. Instance Extraction & Polygonization

In `backend/models/buildings/postprocessing.py`:
1. **Thresholding**: Converts probability maps into binary masks using `BUILDING_THRESHOLD` (default: 0.50).
2. **Noise Removal**: Filters out connected components smaller than `MIN_BUILDING_AREA_PIXELS` (default: 16 px).
3. **Instance Assignment**: Labels connected components using 8-connectivity and assigns unique IDs (`building_001`, `building_002`, ...).
4. **Vector Polygonization**: Converts pixel clusters into Shapely `Polygon` geometries.
5. **Georeferencing**: If imagery includes CRS and affine geotransforms, coordinates are projected to the source CRS and metric footprint areas ($m^2$) are calculated. If unreferenced, the system explicitly marks `"geospatial_accuracy": "not_available"`.

---

## 5. Temporal Flood Increase Analysis

In `backend/services/flood_analyzer.py`:
- Extracts water/inundation masks at baseline ($T_0$) and post-event ($T_1$).
- Calculates genuine hydrological transitions:
  - **Newly Flooded ($\Delta F$)**: $\text{Flood}_{T1} \land \neg \text{Flood}_{T0}$
  - **Receded Water**: $\text{Flood}_{T0} \land \neg \text{Flood}_{T1}$
  - **Persistent Water**: $\text{Flood}_{T0} \land \text{Flood}_{T1}$
- Vectorizes $\Delta F$ into a unified Shapely `MultiPolygon`.

---

## 6. Geometric Spatial Intersection & Sensitivity Analysis

In `backend/services/spatial_intersection.py`:
- For each building instance $B_i$:
  $$\text{Overlap Ratio} = \frac{\text{Area}(B_i \cap \Delta F)}{\text{Area}(B_i)}$$
- A building is classified as affected if $\text{Overlap Ratio} \ge \text{BUILDING\_FLOOD\_OVERLAP\_THRESHOLD}$ (default: 0.10, or 10% footprint submersion).
- **Double-Counting Protection**: Unique building IDs are stored in a set, guaranteeing a building is counted only once even if multiple flood polygons intersect it.
- **Multi-Threshold Sensitivity Analysis**: Evaluates affected building counts at 5%, 10%, 20%, 30%, and 50% overlap ratios to show judges that the result is robust and not an artifact of a single arbitrary threshold.

---

## 7. Model Configuration & Environment Variables

| Variable | Default | Description |
| :--- | :--- | :--- |
| `BUILDING_MODEL` | `BuildingResUNet-SpaceNet` | Model architecture name |
| `BUILDING_CHECKPOINT` | `backend/models/buildings/weights/building_unet.pth` | Path to `.pth` weights |
| `BUILDING_DEVICE` | `auto` | Target hardware (`auto`, `cuda`, or `cpu`) |
| `BUILDING_THRESHOLD` | `0.5` | Probability threshold for binary building mask |
| `MIN_BUILDING_AREA_PIXELS` | `16` | Minimum component area in pixels |
| `BUILDING_FLOOD_OVERLAP_THRESHOLD` | `0.10` | Overlap ratio to classify a building as affected |

---

## 8. Truthful Fallback Policy (No Fake AI)

If no building checkpoint is present:
- SatQuery **never fabricates building counts**.
- It outputs:
  ```json
  {
    "status": "building_model_unavailable",
    "affected_buildings": null,
    "reason": "Building segmentation model checkpoint is not available."
  }
  ```
- Flood increase analysis continues to report authentic inundation expansion metrics.

---

## 9. Verification & Automated Tests

All tests can be run via:
```powershell
pytest tests/test_spatial_intersection.py tests/test_building_model.py tests/test_building_impact_e2e.py -vv
```

Or the entire repository test suite:
```powershell
pytest tests/
```
*(69 passed tests across the repository).*
