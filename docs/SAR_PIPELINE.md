# Sentinel-1 SAR Analysis Pipeline — SatQuery AI

This document describes the general-purpose Sentinel-1 C-band Synthetic Aperture Radar (SAR) processing pipeline in SatQuery AI (`backend/services/sar/`).

---

## 1. Overview & Capabilities

Sentinel-1 operates in C-band microwave (5.405 GHz), providing all-weather, day-and-night sensing unaffected by cloud cover, atmospheric haze, or solar illumination.

SatQuery AI's SAR package provides:
- **Rasterio GRD Ingestion**: Extracts VV/VH bands and geospatial metadata from authentic GeoTIFF rasters.
- **Speckle & Decibel Preprocessing**: Masks NoData, normalizes arrays, and converts linear power to decibels ($\text{dB}$).
- **Feature Extraction**: Computes single-pol statistics, cross-pol ratios ($VV - VH$ in dB), and temporal difference distributions.
- **Log-Ratio Change Detection**: Identifies physical changes between pre- and post-event acquisitions.
- **Task-Aware Routing**: Dispatches SAR change results to task interpretations (flood drop, urban construction increase, vegetation, general change).
- **Multi-Sensor Fusion**: Combines SAR microwave evidence with optical multispectral/RGB data.
- **Quantitative Benchmark Engine**: Computes verifiable IoU, Precision, Recall, Dice, and F1 against ground truth when supplied.

---

## 2. Ingestion & Preprocessing

### Ingestion (`sentinel1_adapter.py`)
- Reads raster band metadata via rasterio memory streams.
- Inspects GeoTIFF tags (`POLARISATION`, `BAND_NAME`, `SENSOR`, `SPACECRAFT_NAME`) to identify SAR polarizations:
  - **VV**: Vertical transmit, Vertical receive (optimal for rough surface water and soil moisture).
  - **VH**: Vertical transmit, Horizontal receive (optimal for volume scattering in vegetation and canopy).
- If non-SAR rasters (such as standard 3-band RGB) are passed, raises `SAR1LoadError` rather than proceeding with false assumptions.

### Preprocessing (`sar_preprocessing.py`)
1. **Invalid Value Masking**: Masks NoData, NaNs, infinities, and non-positive pixels.
2. **Linear Power to Decibel ($\text{dB}$) Conversion**:
   $$\sigma^0_{\text{dB}} = 10 \cdot \log_{10}(\text{power})$$
   Zero and negative values are cleanly masked rather than producing $-\infty$.
3. **Temporal Alignment**: Resamples and clips T0 and T1 acquisitions to identical dimensions and coordinates using bilinear or nearest-neighbor interpolation.

---

## 3. Log-Ratio Temporal Change Detection (`sar_change.py`)

Temporal SAR change detection is executed in logarithmic decibel space:

$$\Delta \sigma^0_{\text{dB}} = \sigma^0_{\text{T1, dB}} - \sigma^0_{\text{T0, dB}}$$

Because decibel subtraction is mathematically equivalent to the linear power ratio:

$$\Delta \sigma^0_{\text{dB}} = 10 \cdot \log_{10}\left(\frac{\text{power}_{\text{T1}}}{\text{power}_{\text{T0}}}\right)$$

### Physical Interpretation:
- **Backscatter Decrease ($\Delta \sigma^0_{\text{dB}} < -\tau$)**:
  Specular reflection away from the radar sensor. Characteristic of newly inundated floodwater, calm water bodies, or cleared land.
- **Backscatter Increase ($\Delta \sigma^0_{\text{dB}} > +\tau$)**:
  Corner reflector and double-bounce scattering from vertical structures, building construction, or increased surface roughness.
- **Stable ($|\Delta \sigma^0_{\text{dB}}| \le \tau$)**:
  Unchanged terrain.

The threshold $\tau$ defaults to 3.0 dB (configurable) or can be determined adaptively via Otsu's method.

---

## 4. Task-Aware Analysis Router (`sar_analysis.py`)

The SAR router (`analyze_sar_for_task`) translates physical backscatter differences into task-relevant evidence:

- **`flood_impact`**: Selects backscatter decrease as inundation evidence. Preserves vector geometry for spatial building intersection.
- **`urban_change`**: Selects backscatter increase as supporting evidence for construction and new structures.
- **`sar_change` / `change_detection`**: Delivers comprehensive increase + decrease change maps without imposing subjective event labels.
- **`vegetation_change`**: Provides dual-polarization cross-ratio features as supporting context; acknowledges that optical NIR is the primary standard.

---

## 5. Multi-Sensor Evidence Fusion (`sar_fusion.py`)

When optical imagery is also provided, evidence from both modalities is combined:

$$\text{Mask}_{\text{fused}} = \left( w_{\text{SAR}} \cdot M_{\text{SAR}} + w_{\text{Opt}} \cdot M_{\text{Opt}} \right) \ge 0.5$$

- **High Cloud Adaptation**: When optical cloud cover exceeds 30%, $w_{\text{SAR}}$ is boosted up to 0.85, prioritizing SAR penetration through clouds.
- **Agreement & Disagreement**: Computes spatial IoU between sensor detections. Disagreement below 0.40 triggers audit warnings.

---

## 6. Quantitative Benchmark Suite (`benchmark.py`)

Evaluates detection masks against reference ground truth:

$$\text{IoU} = \frac{\text{TP}}{\text{TP} + \text{FP} + \text{FN}}, \quad \text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}}, \quad \text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}}, \quad F_1 = \frac{2 \cdot \text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}$$

When ground truth is not provided by the user, the benchmark returns `available=False` with the clear notice:
`"Benchmark unavailable — ground-truth mask not supplied."` No synthetic accuracy metrics are fabricated.
