# ChangeFormer & Imagery Preprocessing Guide — SatQuery AI (SIH26167)

This document provides architectural details, operational guidelines, configuration options, and benchmark workflows for **Phase 1 (Robust Imagery Preprocessing)** and **Phase 2 (ChangeFormer Bi-Temporal Change Detection)** in SatQuery AI.

---

## 1. What ChangeFormer Does

ChangeFormer is a transformer-based Siamese neural network designed specifically for remote sensing bi-temporal change detection (Bandara & Patel, IEEE IGARSS 2022 / arXiv:2201.01293).

### Architectural Highlights
1. **Siamese Transformer Encoder**: Multi-stage hierarchical transformer backbone (Mix-Transformer style) with overlapping patch embedding and efficient spatial-reduction self-attention. Pre-event ($T_0$) and post-event ($T_1$) images share encoder weights to extract 4 multi-scale feature maps at $1/4, 1/8, 1/16, 1/32$ scales.
2. **Difference Module**: Directly calculates multi-scale feature divergence $|F_{t0}^{(i)} - F_{t1}^{(i)}|$ across all 4 hierarchical scales, capturing both fine structural boundaries and high-level semantic context.
3. **Multi-Scale Feature Aggregation Decoder**: Projects and upsamples all difference representations, concatenates them into a unified feature representation, and feeds them into a 2-class classification head producing pixel-level change logits ($0 = \text{no change}, 1 = \text{change}$).

---

## 2. Preprocessing Flow (Phase 1)

Before any model receives an image, SatQuery AI runs the modular preprocessing pipeline in `backend/services/imagery/`:

```
Uploaded Image Payloads (T0, T1)
         │
         ▼
[1. Image Validation] (validation.py)
  • Inspects raw bytes without trusting filenames
  • Determines dimensions, channels, data types, and geospatial CRS/transform
  • Validates bi-temporal compatibility (aborts if pair is missing or corrupt)
         │
         ▼
[2. Spatial Alignment] (alignment.py)
  • Georeferenced imagery: uses rasterio.warp.reproject to align T1 onto T0's grid
  • Screen/pixel-space RGB imagery: bilinear dimension matching to common grid
  • Explicitly documents non-georeferenced status when CRS is absent
         │
         ▼
[3. Nodata & Invalid Pixel Masking] (nodata.py)
  • Detects and masks NaNs, Infinities, explicit raster nodata (-9999, 0), and alpha transparency
  • Produces boolean valid mask: pixel must be valid in both T0 and T1
         │
         ▼
[4. Sensible Normalization] (normalization.py)
  • uint8 RGB (0–255) scaled to [0.0, 1.0]
  • 16-bit multispectral (0–10000) scaled to [0.0, 1.0]
  • ImageNet standardization ((x - mean) / std) for model inputs
         │
         ▼
[5. Cloud / Shadow Handling] (preprocessing.py)
  • Transparently labelled heuristic optical brightness mask
  • Clearly distinguished from scientific radiative cloud masks
```

---

## 3. Checkpoint Placement & Configuration

Model checkpoints are kept out of Git tracking. You can configure the checkpoint location through environment variables or by placing weights in the default directory.

### Configuration Variables
| Variable | Default | Description |
| :--- | :--- | :--- |
| `CHANGEFORMER_CHECKPOINT` | `backend/models/changeformer/weights/changeformer.pth` | Absolute or relative path to the `.pth` / `.pt` weights |
| `CHANGEFORMER_THRESHOLD` | `0.5` | Probability cutoff for classifying a pixel as changed |
| `CHANGEFORMER_DEVICE` | `auto` | Target hardware: `auto`, `cuda`, or `cpu` |

### Default Checkpoint Directory
```
backend/models/changeformer/weights/changeformer.pth
```
If you have a trained checkpoint (e.g., ChangeFormer trained on LEVIR-CD, WHU-CD, or custom satellite pairs), place it in this directory or set `CHANGEFORMER_CHECKPOINT` in your environment.

---

## 4. Hardware Support: GPU & CPU

SatQuery AI automatically detects available acceleration:
- **CUDA Available**: Uses the GPU device (`cuda`). Inferences typically take 15–40 ms on modern NVIDIA GPUs.
- **CUDA Unavailable**: Seamlessly falls back to `cpu`. Inference completes in 100–300 ms on standard multi-core CPUs.
- **Device Placement**: Input tensors and weights are dynamically matched so mismatches never crash the server.

---

## 5. Input Adapter & Modality Gating

ChangeFormer expects optical RGB inputs (`3 channels`).
- **RGB Imagery**: Accepted and converted to `(1, 3, 256, 256)` float32 tensors.
- **Multispectral (Sentinel-2)**: If two Sentinel-2 rasters are submitted, the agent automatically executes the genuine `sentinel2_ndvi_difference` pipeline instead of corrupting ChangeFormer with arbitrary band configurations.
- **Incompatible Channel Counts**: If an unsupported channel configuration is supplied to ChangeFormer, the adapter returns `{ "status": "unsupported_input" }` and triggers the verified RGB fallback without crashing.

---

## 6. Fallback Behavior & Honesty

SatQuery AI guarantees that **no fake AI results or fabricated change statistics are ever produced**:

```
Bi-Temporal Query Submitted
         │
         ▼
Is ChangeFormer checkpoint present & ready?
   ├── YES ──► Run ChangeFormer Neural Inference
   │             • Output: Probability map, thresholded mask, changed pixels, bbox
   │             • "analysis_method": "changeformer"
   │             • Runs independent consistency check with RGB differencing
   │
   └── NO ───► Graceful Fallback: Verified RGB Differencing
                 • Output: Real Euclidean color distance on aligned preprocessed imagery
                 • "analysis_method": "rgb_pixel_difference"
                 • Clear, honest labelling in UI and provenance graph
```

---

## 7. Verification & Confidence

The evidence generated by the change detection agent is verified in `backend/services/verifier.py`:
- **Mathematical Consistency**: Verifies that `changed_pixels <= total_valid_pixels`.
- **Numerical Integrity**: Verifies that reported change percentage matches $\frac{\text{changed}}{\text{valid}} \times 100\%$.
- **Absence of NaNs/Infinities**: Mask and probability checks.
- **Independent Consistency Check**: Compares neural change statistics with pixel differencing diagnostics.

---

## 8. Benchmark Evaluation Suite

A standalone benchmarking tool is provided in `backend/models/changeformer/benchmark.py`.

### Evaluating Predicted Masks
```python
from backend.models.changeformer.benchmark import evaluate_change_mask
import numpy as np

# Load predicted and ground truth masks
pred = np.load("predicted_mask.npy")
gt = np.load("ground_truth_mask.npy")

metrics = evaluate_change_mask(predicted_mask=pred, ground_truth_mask=gt)
print(metrics)
# Output:
# {
#   'iou': 0.8421,
#   'precision': 0.8912,
#   'recall': 0.9380,
#   'f1': 0.9140,
#   'overall_accuracy': 0.9782,
#   'true_positives': 12450,
#   ...
# }
```

---

## 9. How to Run Tests & Verify

### Run All Unit & Integration Tests (52 tests)
```powershell
pytest tests/
```

### Run Only Imagery Preprocessing Tests
```powershell
pytest tests/test_imagery_preprocessing.py -vv
```

### Run Only ChangeFormer Tests
```powershell
pytest tests/test_changeformer.py -vv
```

### Verify Frontend Build (Ensuring Zero UI Regressions)
```powershell
npm --prefix frontend run build
```

---

## 10. Clear Differentiation of Claims

### IMPLEMENTED & VERIFIED in Phase 1 & 2:
- ✅ Robust imagery preprocessing (validation, alignment, nodata, normalization).
- ✅ Real PyTorch ChangeFormer neural network architecture (Siamese transformer + multi-scale difference + decoder).
- ✅ Checkpoint detection, device management (`cuda` vs `cpu`), and model caching.
- ✅ Graceful, honest fallback to existing RGB differencing when weights are absent.
- ✅ Mathematical verification and independent consistency checks.
- ✅ 100% backward compatibility with existing API response shapes and zero frontend modification.

### NOT CLAIMED / RESERVED FOR FUTURE PHASES:
- ❌ Guaranteed real-world scientific ground truth without reference validation.
- ❌ Perfect sub-pixel geospatial registration across unreferenced web images.
- ❌ Radiative-transfer cloud-proof physics (RGB heuristic is explicitly labelled as unvalidated).
- ❌ Segment Anything (SAM2) zero-shot polygon masks.
- ❌ Sentinel-1 SAR interferometric coherence (InSAR) fusion.
