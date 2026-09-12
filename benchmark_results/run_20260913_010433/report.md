# SatQuery AI Benchmark Evaluation Report — satquery_benchmark_run
**Run ID:** `run_20260913_010433` | **Date:** 2026-09-13 01:04:34 | **Software Version:** 1.0.0

## 1. Executive Summary

| Metric | Value | Description |
| :--- | :--- | :--- |
| **Total Cases** | 6 | Total benchmark cases evaluated |
| **Mean IoU** | 0.1830 | Overall spatial agreement across segmentation tasks |
| **Mean Dice / F1** | 0.2868 | Harmonic mean of precision and recall |
| **Mean Precision** | 0.1830 | True positive ratio in predicted masks |
| **Mean Recall** | 0.6667 | Ground-truth coverage ratio |
| **Sensor Selection Accuracy** | 66.7% | Correct optimal sensor / modality routing |
| **Unsupported Analysis Rejection** | 83.3% | Accurate refusal of impossible operations (e.g. RGB NDVI) |
| **Expected Calibration Error (ECE)** | 0.4051 | Calibration gap between confidence & empirical accuracy |
| **Mean Execution Latency** | 81.0 ms | Average pipeline runtime per query |

## 2. Confidence Calibration Breakdown

Evaluates whether confidence scores reflect empirical correctness:

| Confidence Bin | Sample Count | Avg Confidence | Avg Accuracy / IoU | Calibration Gap |
| :---: | :---: | :---: | :---: | :---: |
| 0.0-0.2 | 0 | 0.100 | 0.000 | 0.000 |
| 0.2-0.4 | 2 | 0.300 | 0.500 | 0.200 |
| 0.4-0.6 | 0 | 0.500 | 0.000 | 0.000 |
| 0.6-0.8 | 0 | 0.700 | 0.000 | 0.000 |
| 0.8-1.0 | 4 | 0.895 | 0.387 | 0.508 |

## 3. Per-Task Performance

| Task Type | Evaluated Cases | Mean IoU | Mean F1 | Sensor Match |
| :--- | :---: | :---: | :---: | :---: |
| `change_detection` | 1 | 0.2500 | 0.4000 | 100% |
| `building_segmentation` | 1 | 0.0000 | 0.0000 | 100% |
| `flood_segmentation` | 1 | 0.2991 | 0.4604 | 0% |
| `capability_enforcement` | 2 | N/A | N/A | 50% |
| `verification` | 1 | N/A | N/A | 100% |

## 4. Failure Case Taxonomy

| Failure Category | Count | Proportion |
| :--- | :---: | :---: |
| `segmentation_failure` | 1 | 50.0% |
| `unsupported_capability` | 1 | 50.0% |

## 5. Detailed Case Records

| Case ID | Task | IoU | Precision | Recall | Latency | Sensor Match | Failure Category |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| `synth_change_01` | `change_detection` | 0.250 | 0.250 | 1.000 | 464ms | ✅ | `none` |
| `synth_bldg_01` | `building_segmentation` | 0.000 | 0.000 | 0.000 | 3ms | ✅ | `segmentation_failure` |
| `synth_flood_01` | `flood_segmentation` | 0.299 | 0.299 | 1.000 | 8ms | ❌ | `none` |
| `synth_cap_rgb_ndvi_01` | `capability_enforcement` | — | — | — | 2ms | ❌ | `none` |
| `synth_cap_single_change_01` | `capability_enforcement` | — | — | — | 3ms | ✅ | `unsupported_capability` |
| `synth_verif_bounds_01` | `verification` | — | — | — | 6ms | ✅ | `none` |
