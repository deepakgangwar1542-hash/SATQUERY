# SatQuery AI Benchmarking & Ground Truth Evaluation Framework

## 1. Overview & Philosophy
SatQuery AI includes an **empirical, scientifically rigorous Benchmarking & Ground Truth Evaluation layer**.

### Critical Principle: No Fabricated Metrics
- Metrics are calculated **strictly when authentic empirical ground truth is provided**.
- If ground truth is absent for a task or query, the system explicitly reports:
  > `"Ground truth unavailable — scientific metrics cannot be computed."`
- The system **never** substitutes confidence for accuracy or fabricates synthetic 95% scores.

---

## 2. Supported Task Types
The benchmarking framework natively evaluates all core remote sensing pipelines:

| Task Type | Evaluator Focus | Key Metrics |
| :--- | :--- | :--- |
| `change_detection` | Bi-temporal land surface change | IoU, Dice, Precision, Recall, F1, OA |
| `building_segmentation` | Footprint and structural boundary extraction | IoU, Dice, Precision, Recall, Count Error |
| `flood_segmentation` | SAR & Optical water inundation mapping | IoU, Dice, Inundated Area Relative Error |
| `building_impact` | Hazard mask × building footprint intersection | Affected count error, overlap ratio error |
| `multispectral_analysis` | Vegetation health & water indices (NDVI/NDWI) | MAE, RMSE, Relative Error |
| `sar_analysis` | Radar backscatter temporal modulation | IoU, Polarization backscatter delta |
| `sensor_selection` | Optimal sensor/modality routing | Correctness rate, capability compliance |
| `capability_enforcement` | Rejection of unsupported operations | Unsupported analysis rejection rate |
| `verification` | Integrity checks & sanity rejection | True rejection rate, false acceptance rate |
| `vlm_groundedness` | Semantic explanation alignment | 5-tier groundedness rubric (0.0 to 1.0) |

---

## 3. Supported Scientific Metrics & Edge Cases

### Binary Mask Metrics
- **Intersection over Union (IoU)**: `TP / (TP + FP + FN)`
- **Dice Coefficient / F1 Score**: `2 * TP / (2 * TP + FP + FN)`
- **Precision**: `TP / (TP + FP)`
- **Recall**: `TP / (TP + FN)`
- **Overall Pixel Accuracy**: `(TP + TN) / Total Pixels`

#### Documented Edge-Case Rules (Zero-NaN Guarantee)
1. **Both Prediction and Ground Truth are Empty (0 positive pixels)**:
   - Evaluates to `IoU = 1.0`, `Dice = 1.0`, `Precision = 1.0`, `Recall = 1.0`.
   - Rationale: The model and the ground truth agree 100% on the negative class (target absence).
2. **One Empty, One Non-Empty**:
   - Evaluates to `IoU = 0.0`, `Dice = 0.0`, `Precision = 0.0`, `Recall = 0.0`.
3. **Mismatched Dimensions**:
   - Automatically resampled using nearest-neighbor interpolation to ground-truth grid.

### Continuous & Area Metrics
- **Absolute Error**: `|Predicted - GroundTruth|`
- **Relative Error**: `|Predicted - GroundTruth| / max(|GroundTruth|, 1e-6)`
- **Percentage Error**: `Relative Error * 100`
- **MAE & RMSE**: Computed across all paired samples.

### Expected Calibration Error (ECE)
Evaluates whether confidence scores correlate with empirical correctness:
$$\text{ECE} = \sum_{b=1}^{B} \frac{|B_b|}{N} \left| \text{acc}(B_b) - \text{conf}(B_b) \right|$$

---

## 4. Benchmark Case Format

Each benchmark case is a standardized JSON/dict structure:

```json
{
  "case_id": "change_001",
  "task_type": "change_detection",
  "query": "Identify areas where land cover changed between the two images.",
  "input_images": [
    "data/t0.png",
    "data/t1.png"
  ],
  "expected_sensor": "optical",
  "expected_capabilities": {
    "has_temporal": true
  },
  "ground_truth": "data/gt_change_mask.png",
  "ground_truth_type": "binary_mask",
  "expected_outputs": {
    "change_percentage_min": 10.0,
    "change_percentage_max": 25.0
  },
  "split": "test",
  "dataset_name": "oscd_sample",
  "metadata": {
    "location": "Montpellier, France",
    "sensor": "Sentinel-2"
  }
}
```

---

## 5. Running Benchmarks via CLI

### Run Built-in Synthetic Evaluation Suite:
```bash
python -m backend.benchmarking.benchmark_runner --synthetic
```

### Run Custom Dataset from Local Directory:
```bash
python -m backend.benchmarking.benchmark_runner \
    --dataset ./data/benchmark/my_dataset \
    --output ./benchmark_results
```

### Run with Custom Configuration YAML:
```bash
python -m backend.benchmarking.benchmark_runner \
    --config backend/benchmarking/benchmark_config.yaml
```

---

## 6. Generated Reports

Every benchmark run produces a dedicated directory under `benchmark_results/<run_id>/`:
- `summary.json`: Top-level metrics, ECE, latency, and failure distributions.
- `detailed_results.json`: Full per-case evaluation outputs.
- `metrics.csv`: Tabular metric export for external plotting / analysis.
- `report.md`: Audit-ready Markdown summary with formatted tables.
- `failure_cases.json`: Diagnosable logs of degraded or failed cases.
- `visualizations/`: Diagnostic grids (`[INPUT | GT | PRED | ERROR MAP]`).

---

## 7. How to Add a New Benchmark Dataset
1. Place input images and ground-truth masks in a folder (e.g., `data/my_dataset/`).
2. Create a `cases.json` inside the folder following the schema above.
3. Run:
   ```bash
   python -m backend.benchmarking.benchmark_runner --dataset data/my_dataset
   ```
