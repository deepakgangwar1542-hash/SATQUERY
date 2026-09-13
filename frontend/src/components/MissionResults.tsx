/**
 * MissionResults — 6-Step Guided Mission Workflow Container.
 * Reuses the EXACT QueryResponse result across 6 specialized cinematic views:
 *   Step 1: 01 / 06 MISSION FINDING (Visual Payoff, Verified Answer, VLM Reasoning, PDF Report)
 *   Step 2: 02 / 06 OBSERVATIONS (Pre vs Post imagery, Query Intent, Telemetry)
 *   Step 3: 03 / 06 WHAT CHANGED? (Bi-Temporal Difference, ChangeFormer Metrics)
 *   Step 4: 04 / 06 WHERE DID IT HAPPEN? (Spatial Impact, Polygons, Bounding Boxes)
 *   Step 5: 05 / 06 WHY DO WE BELIEVE IT? (Evidence Fusion, Verifier, Agent Outputs)
 *   Step 6: 06 / 06 CONFIDENCE & PROVENANCE (6-Comp Radar Chart, Execution Trace)
 */
import React, { useState, useMemo } from 'react';
import type { QueryResponse } from '../types';
import ConfidenceBreakdown from './ConfidenceBreakdown';
import ProvenanceGraph from './ProvenanceGraph';
import AgentOutputCard from './AgentOutputCard';
import SensorDecision from './SensorDecision';
import EarthQuerySpecPanel from './EarthQuerySpec';

export interface MissionResultsProps {
  response: QueryResponse;
  requestMeta?: {
    prePreview?: string;
    postPreview?: string;
    preName?: string;
    postName?: string;
  };
  onNewMission: () => void;
}

const STEP_TITLES = [
  { step: 1, num: '01', title: 'MISSION FINDING', subtitle: 'Verified Intelligence & VLM Insights' },
  { step: 2, num: '02', title: 'OBSERVATIONS', subtitle: 'Pre & Post Satellite Feeds' },
  { step: 3, num: '03', title: 'WHAT CHANGED?', subtitle: 'Bi-Temporal Difference & Metrics' },
  { step: 4, num: '04', title: 'WHERE DID IT HAPPEN?', subtitle: 'Spatial Footprint & ROI Grounding' },
  { step: 5, num: '05', title: 'WHY DO WE BELIEVE IT?', subtitle: 'Evidence Fusion & Multi-Agent Verification' },
  { step: 6, num: '06', title: 'CONFIDENCE & PROVENANCE', subtitle: '6-Factor Radar & Execution Audit' },
];

export default function MissionResults({ response, requestMeta, onNewMission }: MissionResultsProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Extract change detection outputs from agent outputs if present
  const changeAgent = useMemo(() => {
    return response.agent_outputs.find(
      ao => ao.agent_id === 'change_detection_agent' || ao.agent_id === 'change_vqa_agent'
    );
  }, [response.agent_outputs]);

  // Extract all evidence regions from all agents for spatial overlay
  const allEvidenceRegions = useMemo(() => {
    const regions: { bbox: [number, number, number, number]; label: string; confidence: number; agentName: string }[] = [];
    response.agent_outputs.forEach(ao => {
      if (ao.evidence_regions) {
        ao.evidence_regions.forEach(er => {
          regions.push({
            bbox: er.bbox,
            label: er.label || 'Region of Interest',
            confidence: er.confidence || ao.raw_score,
            agentName: ao.agent_name,
          });
        });
      }
    });
    return regions;
  }, [response.agent_outputs]);

  const v = response.verifier_result;
  const spec = response.earthquery_spec;
  const vlm = response.semantic_interpretation;

  const preImg = requestMeta?.prePreview;
  const postImg = requestMeta?.postPreview;

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(s => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(s => s - 1);
  };

  return (
    <div className="mission-workflow-container fade-in" id="mission-results-workflow">
      {/* ── Mission Control Telemetry Header ── */}
      <header className="mission-workflow-header">
        <div className="mission-workflow-topbar">
          <div className="mission-id-badge">
            <span className="live-indicator" />
            <span>MISSION ID: <strong className="text-mono text-accent">{response.query_id}</strong></span>
          </div>

          <div className="mission-top-actions">
            <span className="task-type-pill">
              {spec.task_type.toUpperCase().replace(/_/g, ' ')}
            </span>
            <button
              type="button"
              className="btn btn-secondary btn-sm new-mission-btn"
              onClick={onNewMission}
              title="Return to setup and start a new mission"
            >
              <span>↺</span>
              <span>NEW MISSION</span>
            </button>
          </div>
        </div>

        {/* ── 6-Step Mission Navigation Stepper HUD ── */}
        <nav className="mission-stepper-hud" aria-label="Mission step navigation">
          {STEP_TITLES.map(s => {
            const isActive = currentStep === s.step;
            const isCompleted = currentStep > s.step;
            return (
              <button
                key={s.step}
                type="button"
                className={`step-pill-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => setCurrentStep(s.step)}
                title={`Jump to Step ${s.step}: ${s.title}`}
              >
                <div className="step-num-circle">
                  {isCompleted ? '✓' : s.num}
                </div>
                <div className="step-text-wrap">
                  <span className="step-hud-title">{s.title}</span>
                  <span className="step-hud-sub">{s.subtitle}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </header>

      {/* ── Step Content Display ── */}
      <main className="mission-step-viewport">
        {/* ============================================================== */}
        {/* STEP 1: 01 / 06 MISSION FINDING (Visual Payoff)                */}
        {/* ============================================================== */}
        {currentStep === 1 && (
          <section className="mission-step-view fade-in-up" id="step-finding">
            <div className="step-view-header">
              <span className="step-number-tag">STEP 01 / 06</span>
              <h2 className="step-view-title">Mission Finding</h2>
              <p className="step-view-desc">
                High-confidence synthesized intelligence report, natural language findings, and actionable insights.
              </p>
            </div>

            {/* Primary Visual Payoff Card */}
            <div className="card answer-payoff-card mb-4" id="primary-finding-card">
              <div className="answer-card-top">
                <div className="flex items-center gap-2">
                  <span className="payoff-badge-icon">💡</span>
                  <div>
                    <span className="payoff-label">SYNTHESIZED INTELLIGENCE FINDING</span>
                    <h3 className="payoff-title">Verified Answer</h3>
                  </div>
                </div>
                <span className="badge badge-cyan">Ground-Truth Verified</span>
              </div>

              <div className="payoff-answer-content">
                <p className="answer-primary-text">{response.answer}</p>
              </div>

              <div className="payoff-footer">
                <a
                  href={response.report_url}
                  download
                  className="btn btn-primary btn-sm download-pdf-btn"
                  id="download-report-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📄 Download Comprehensive PDF Report
                </a>
                <span className="text-xs text-muted">Trace ID: <code className="text-mono">{response.execution_trace.trace_id}</code></span>
              </div>
            </div>

            {/* Multimodal Semantic Reasoning / VLM Context if present */}
            {vlm && (
              <div className="vlm-reasoning-card card mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '1.2rem' }}>🧠</span>
                    <div>
                      <p className="section-label" style={{ margin: 0 }}>Multimodal Semantic Reasoner (VLM)</p>
                      <span className="text-xs text-muted">Model: {vlm.model_name} · Mode: {vlm.reasoning_mode}</span>
                    </div>
                  </div>
                  <span className="badge badge-purple">Structured Reasoning</span>
                </div>

                {vlm.observations && vlm.observations.length > 0 && (
                  <div className="vlm-section mb-3">
                    <span className="vlm-section-title">Key Scene Observations:</span>
                    <ul className="vlm-bullet-list">
                      {vlm.observations.map((obs, idx) => (
                        <li key={idx}>{obs}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {vlm.interpretation && vlm.interpretation.length > 0 && (
                  <div className="vlm-section mb-3">
                    <span className="vlm-section-title">Semantic Interpretation:</span>
                    <ul className="vlm-bullet-list">
                      {vlm.interpretation.map((interp, idx) => (
                        <li key={idx}>{interp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {vlm.uncertainties && vlm.uncertainties.length > 0 && (
                  <div className="vlm-uncertainty-box">
                    <span className="text-xs text-warning font-bold">Uncertainties & Sensor Limitations:</span>
                    <ul className="vlm-bullet-list text-muted">
                      {vlm.uncertainties.map((u, idx) => (
                        <li key={idx} className="text-xs">{u}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* ============================================================== */}
        {/* STEP 2: 02 / 06 OBSERVATIONS                                   */}
        {/* ============================================================== */}
        {currentStep === 2 && (
          <section className="mission-step-view fade-in-up" id="step-observations">
            <div className="step-view-header">
              <span className="step-number-tag">STEP 02 / 06</span>
              <h2 className="step-view-title">Primary Observations</h2>
              <p className="step-view-desc">
                Raw multispectral or SAR observation frames captured across target timestamps.
              </p>
            </div>

            {/* Side by Side Pre/Post Imagery Comparison */}
            <div className="observations-display-grid">
              {/* Pre Scene */}
              <div className="observation-frame-card frame-pre">
                <div className="frame-card-bar">
                  <span className="frame-tag tag-cyan">T₁ · PRE OBSERVATION</span>
                  {requestMeta?.preName && <span className="frame-filename">📄 {requestMeta.preName}</span>}
                </div>
                <div className="frame-image-container">
                  {preImg ? (
                    <img src={preImg} alt="Pre observation" className="observation-img" />
                  ) : (
                    <OrbitalRadarPlaceholder
                      icon="🛰"
                      label="Baseline Satellite Scan Active"
                      sub="Sentinel-2 Optical / SAR Reference Feed Locked"
                    />
                  )}
                </div>
              </div>

              {/* Post Scene */}
              <div className="observation-frame-card frame-post">
                <div className="frame-card-bar">
                  <span className="frame-tag tag-purple">T₂ · POST OBSERVATION</span>
                  {requestMeta?.postName && <span className="frame-filename">📄 {requestMeta.postName}</span>}
                </div>
                <div className="frame-image-container">
                  {postImg ? (
                    <img src={postImg} alt="Post observation" className="observation-img" />
                  ) : (
                    <OrbitalRadarPlaceholder
                      icon="🌍"
                      label="Target Scene Observation Active"
                      sub="Surface Telemetry Captured via Copilot Engine"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* EarthQuery Spec Analysis Insight */}
            <div className="step-meta-deck">
              <EarthQuerySpecPanel spec={spec} />
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* STEP 3: 03 / 06 WHAT CHANGED?                                  */}
        {/* ============================================================== */}
        {currentStep === 3 && (
          <section className="mission-step-view fade-in-up" id="step-change">
            <div className="step-view-header">
              <span className="step-number-tag">STEP 03 / 06</span>
              <h2 className="step-view-title">What Changed?</h2>
              <p className="step-view-desc">
                Bi-temporal differential analysis, pixel mask transitions, and change magnitude.
              </p>
            </div>

            {/* Interactive Split Slider or Multi-Card Change Comparison */}
            <div className="change-visual-stage">
              <div className="change-triptych">
                <div className="triptych-card">
                  <div className="triptych-header">
                    <span className="triptych-tag tag-cyan">T₁ Baseline</span>
                  </div>
                  <div className="triptych-body">
                    {preImg ? (
                      <img src={preImg} alt="T1 Baseline" />
                    ) : (
                      <OrbitalRadarPlaceholder icon="🛰" label="T₁ Baseline Scene" sub="Optical Baseline" />
                    )}
                  </div>
                </div>

                <div className="triptych-card change-focus-card">
                  <div className="triptych-header">
                    <span className="triptych-tag tag-amber">Δt Change Dynamics</span>
                    {changeAgent && <span className="change-model-pill">ChangeFormer / Fusion</span>}
                  </div>
                  <div className="triptych-body change-overlay-wrap">
                    {postImg ? (
                      <div className="diff-composite-container">
                        <img src={postImg} alt="Change target" className="base-post-layer" />
                        <div className="diff-highlight-overlay" />
                        <div className="diff-badge-indicator">
                          <span>🔍 Δt Detections Active</span>
                        </div>
                      </div>
                    ) : (
                      <OrbitalRadarPlaceholder icon="🔄" label="Bi-Temporal Change Inferred" sub="Differential Map Active" />
                    )}
                  </div>
                </div>

                <div className="triptych-card">
                  <div className="triptych-header">
                    <span className="triptych-tag tag-purple">T₂ Target</span>
                  </div>
                  <div className="triptych-body">
                    {postImg ? (
                      <img src={postImg} alt="T2 Target" />
                    ) : (
                      <OrbitalRadarPlaceholder icon="🌍" label="T₂ Target Scene" sub="Post-Event Analysis" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Real Extracted Change Metrics from Backend Output */}
            <div className="change-metrics-deck">
              <div className="metric-card">
                <span className="metric-icon">🔄</span>
                <div className="metric-data">
                  <span className="metric-label">Identified Task / Change Type</span>
                  <span className="metric-value text-accent">
                    {changeAgent?.result?.change_type
                      ? String(changeAgent.result.change_type)
                      : spec.task_type.replace(/_/g, ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              {changeAgent?.result?.changed_area_km2 !== undefined && (
                <div className="metric-card">
                  <span className="metric-icon">📐</span>
                  <div className="metric-data">
                    <span className="metric-label">Changed Area</span>
                    <span className="metric-value">
                      {String(changeAgent.result.changed_area_km2)} km²
                    </span>
                  </div>
                </div>
              )}

              {changeAgent?.result?.change_percent !== undefined && (
                <div className="metric-card">
                  <span className="metric-icon">📊</span>
                  <div className="metric-data">
                    <span className="metric-label">Change Extent</span>
                    <span className="metric-value">
                      {String(changeAgent.result.change_percent)}%
                    </span>
                  </div>
                </div>
              )}

              {Boolean(changeAgent?.result?.severity) && (
                <div className="metric-card">
                  <span className="metric-icon">⚡</span>
                  <div className="metric-data">
                    <span className="metric-label">Severity Level</span>
                    <span className="metric-value text-warning">
                      {String(changeAgent?.result?.severity).toUpperCase()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Detailed Change Descriptions if produced by models */}
            {Boolean(changeAgent?.result?.change_map_description) && (
              <div className="card mt-3">
                <p className="section-label">Spatial & Spectral Change Summary</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {String(changeAgent?.result?.change_map_description)}
                </p>
              </div>
            )}
          </section>
        )}

        {/* ============================================================== */}
        {/* STEP 4: 04 / 06 WHERE DID IT HAPPEN?                          */}
        {/* ============================================================== */}
        {currentStep === 4 && (
          <section className="mission-step-view fade-in-up" id="step-spatial">
            <div className="step-view-header">
              <span className="step-number-tag">STEP 04 / 06</span>
              <h2 className="step-view-title">Where Did It Happen?</h2>
              <p className="step-view-desc">
                Spatial bounding boxes, marked ROI contours, and geographical ground truth.
              </p>
            </div>

            <div className="spatial-inspection-stage">
              <div className="spatial-canvas-card">
                <div className="spatial-card-header">
                  <div className="flex items-center gap-2">
                    <span className="frame-tag tag-purple">Spatial Evidence Regions</span>
                    <span className="text-xs text-muted">({allEvidenceRegions.length} Detected Regions)</span>
                  </div>
                  {allEvidenceRegions.length > 0 && (
                    <span className="badge badge-cyan">Visual Grounding Active</span>
                  )}
                </div>

                <div className="spatial-viewport">
                  {postImg || preImg ? (
                    <div className="spatial-image-wrapper">
                      <img src={postImg || preImg} alt="Spatial Inspection" className="spatial-bg-image" />
                      {/* Render bounding boxes overlay */}
                      {allEvidenceRegions.map((region, idx) => {
                        const [ymin, xmin, ymax, xmax] = region.bbox;
                        const top = `${ymin * 100}%`;
                        const left = `${xmin * 100}%`;
                        const width = `${(xmax - xmin) * 100}%`;
                        const height = `${(ymax - ymin) * 100}%`;
                        return (
                          <div
                            key={idx}
                            className="evidence-bbox"
                            style={{ top, left, width, height }}
                          >
                            <span className="bbox-tag">
                              {region.label} ({Math.round(region.confidence * 100)}%)
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <OrbitalRadarPlaceholder
                      icon="📍"
                      label="Spatial Footprint & Geo Telemetry Locked"
                      sub="Full Target Scene Grounded Globally"
                    />
                  )}
                </div>
              </div>

              {/* Spatial Regions List */}
              <div className="spatial-data-sidebar card">
                <p className="section-label">📌 Grounded Evidence Regions</p>
                {allEvidenceRegions.length > 0 ? (
                  <div className="spatial-regions-scroll">
                    {allEvidenceRegions.map((r, i) => (
                      <div key={i} className="region-item-row">
                        <div className="region-item-left">
                          <span className="region-index">#{i + 1}</span>
                          <div>
                            <span className="region-title">{r.label}</span>
                            <span className="region-agent-sub">{r.agentName}</span>
                          </div>
                        </div>
                        <span className="badge badge-blue">{(r.confidence * 100).toFixed(0)}% Match</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted" style={{ padding: '1rem 0' }}>
                    No discrete bounding boxes specified in this query; full scene processed globally.
                  </p>
                )}

                {/* Building / Object Counts from outputs if present */}
                {response.agent_outputs.some(ao => ao.result?.num_objects_detected !== undefined) && (
                  <div className="spatial-stat-card mt-3">
                    <span className="section-label">Identified Features</span>
                    {response.agent_outputs.map(ao => {
                      if (ao.result?.num_objects_detected !== undefined) {
                        return (
                          <div key={ao.agent_id} className="flex items-center justify-between text-sm mt-1">
                            <span style={{ color: 'var(--text-secondary)' }}>{ao.agent_name}:</span>
                            <strong style={{ color: 'var(--accent-primary)' }}>{String(ao.result.num_objects_detected)} objects</strong>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* STEP 5: 05 / 06 WHY DO WE BELIEVE IT?                          */}
        {/* ============================================================== */}
        {currentStep === 5 && (
          <section className="mission-step-view fade-in-up" id="step-evidence">
            <div className="step-view-header">
              <span className="step-number-tag">STEP 05 / 06</span>
              <h2 className="step-view-title">Why Do We Believe It?</h2>
              <p className="step-view-desc">
                Multi-agent cross-verification, specialist consensus, sensor selection, and conflict resolution.
              </p>
            </div>

            {/* Verifier Agreement Banner */}
            <div
              className={`card verifier-decision-card mb-4 ${v.agreement ? 'verifier-success' : 'verifier-warning'}`}
            >
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="verifier-status-icon">{v.agreement ? '✅' : v.replanned ? '🔄' : '⚠'}</span>
                  <div>
                    <h3 className="verifier-status-title">
                      {v.agreement ? 'Multi-Agent Consensus Verified' : v.replanned ? 'Autonomous Re-Planning Executed' : 'Conflicts Detected'}
                    </h3>
                    <p className="verifier-status-desc">
                      {v.agreement
                        ? 'All specialist vision and reasoning agents achieved unanimous consensus on ground evidence.'
                        : 'Discrepancies identified and resolved through cross-modal arbitration.'}
                    </p>
                  </div>
                </div>
                <span className={`badge ${v.agreement ? 'badge-green' : 'badge-amber'}`}>
                  {v.agreement ? 'Consensus 100%' : 'Arbitrated'}
                </span>
              </div>

              {v.conflicts_found.length > 0 && (
                <div className="conflicts-box mt-2">
                  <span className="text-xs text-warning font-bold">Resolved Conflicts:</span>
                  <ul className="conflict-list">
                    {v.conflicts_found.map((c, i) => (
                      <li key={i} className="text-xs text-warning">⚠ {c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sensor Selection Rationale */}
            <div className="mb-4">
              <SensorDecision sensor={response.sensor_selection} />
            </div>

            {/* Specialist Agents Breakdown */}
            <div className="card">
              <p className="section-label mb-3">🤖 Specialist Agent Invocations ({response.agent_outputs.length})</p>
              <div className="agent-list-stack">
                {response.agent_outputs.map((ao, i) => (
                  <AgentOutputCard key={ao.agent_id} output={ao} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* STEP 6: 06 / 06 CONFIDENCE & PROVENANCE                        */}
        {/* ============================================================== */}
        {currentStep === 6 && (
          <section className="mission-step-view fade-in-up" id="step-confidence">
            <div className="step-view-header">
              <span className="step-number-tag">STEP 06 / 06</span>
              <h2 className="step-view-title">Confidence & Provenance</h2>
              <p className="step-view-desc">
                Mathematical transparency, 6-component confidence breakdown, and end-to-end auditable execution trace.
              </p>
            </div>

            <div className="trust-grid">
              {/* 6-Component Confidence Breakdown */}
              <div className="trust-col">
                <ConfidenceBreakdown breakdown={response.confidence_breakdown} />
              </div>

              {/* End-to-End Execution Trace Provenance Graph */}
              <div className="trust-col">
                <ProvenanceGraph trace={response.execution_trace} />
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ── Guided Mission Navigation Bar Footer ── */}
      <footer className="mission-navigation-footer">
        <button
          type="button"
          className="btn btn-secondary btn-nav-back"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          <span>←</span>
          <span>BACK</span>
        </button>

        <div className="mission-progress-indicator">
          <span>STEP {currentStep} OF 6</span>
          <div className="progress-dots">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <span
                key={i}
                className={`p-dot ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'done' : ''}`}
                onClick={() => setCurrentStep(i)}
              />
            ))}
          </div>
        </div>

        {currentStep < 6 ? (
          <button
            type="button"
            className="btn btn-primary btn-nav-continue"
            onClick={handleNext}
          >
            <span>CONTINUE TO STEP {currentStep + 1}</span>
            <span>→</span>
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-nav-continue new-mission-cta"
            onClick={onNewMission}
          >
            <span>START NEW MISSION</span>
            <span>↺</span>
          </button>
        )}
      </footer>

      <style>{`
        .mission-workflow-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.5rem 2rem 5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .mission-workflow-header {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .mission-workflow-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          background: rgba(15, 23, 42, 0.65);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 12px;
          backdrop-filter: blur(12px);
        }
        .mission-id-badge {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: #94a3b8;
        }
        .live-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
        }
        .mission-top-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .task-type-pill {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          padding: 3px 10px;
          border-radius: 999px;
          letter-spacing: 0.05em;
        }
        .new-mission-btn {
          font-size: 0.74rem;
          font-weight: 700;
          padding: 4px 12px;
        }

        /* HUD Stepper */
        .mission-stepper-hud {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0.6rem;
        }
        .step-pill-btn {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 0.65rem 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          outline: none;
        }
        .step-pill-btn:hover {
          background: rgba(56, 189, 248, 0.08);
          border-color: rgba(56, 189, 248, 0.3);
        }
        .step-pill-btn.active {
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.22), rgba(99, 102, 241, 0.25));
          border-color: #38bdf8;
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.25);
        }
        .step-pill-btn.completed {
          border-color: rgba(16, 185, 129, 0.35);
        }
        .step-num-circle {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-secondary);
          flex-shrink: 0;
        }
        .step-pill-btn.active .step-num-circle {
          background: #38bdf8;
          color: #030712;
          border-color: #38bdf8;
          box-shadow: 0 0 10px #38bdf8;
        }
        .step-pill-btn.completed .step-num-circle {
          background: rgba(16, 185, 129, 0.2);
          border-color: #10b981;
          color: #10b981;
        }
        .step-text-wrap {
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
        }
        .step-hud-title {
          font-size: 0.76rem;
          font-weight: 700;
          color: #f1f5f9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .step-hud-sub {
          font-size: 0.65rem;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .step-pill-btn.active .step-hud-title { color: #38bdf8; }

        /* Step View common */
        .mission-step-viewport {
          min-height: 520px;
        }
        .mission-step-view {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .step-view-header {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .step-number-tag {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #38bdf8;
        }
        .step-view-title {
          font-size: 1.85rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }
        .step-view-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Step 1: Finding */
        .answer-payoff-card {
          padding: 2rem 2.5rem;
          background: linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(8, 14, 28, 0.98));
          border: 1.5px solid rgba(56, 189, 248, 0.4);
          border-left: 5px solid #38bdf8;
          box-shadow: 0 25px 60px -10px rgba(0,0,0,0.85), 0 0 45px rgba(56, 189, 248, 0.2);
          border-radius: 16px;
        }
        .answer-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .payoff-badge-icon { font-size: 1.8rem; }
        .payoff-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #38bdf8;
          display: block;
        }
        .payoff-title { font-size: 1.3rem; font-weight: 800; color: #ffffff; margin: 0; }
        .payoff-answer-content {
          margin: 1.25rem 0 1.75rem;
          padding: 1.25rem 1.5rem;
          background: rgba(3, 7, 18, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
        .answer-primary-text {
          font-size: 1.12rem;
          line-height: 1.8;
          color: #f8fafc;
          font-weight: 500;
          white-space: pre-wrap;
          margin: 0;
        }
        .payoff-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .download-pdf-btn {
          padding: 0.65rem 1.4rem;
          font-weight: 700;
          font-size: 0.85rem;
        }
        .vlm-reasoning-card {
          border-color: rgba(168, 85, 247, 0.3);
          background: linear-gradient(145deg, rgba(15, 23, 42, 0.85), rgba(8, 14, 28, 0.95));
        }
        .vlm-section-title {
          font-size: 0.78rem;
          font-weight: 700;
          color: #d8b4fe;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.4rem;
        }
        .vlm-bullet-list {
          padding-left: 1.25rem;
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .vlm-uncertainty-box {
          margin-top: 0.75rem;
          padding: 0.65rem 1rem;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.25);
          border-radius: 8px;
        }

        /* Step 2: Observations */
        .observations-display-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .observation-frame-card {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 420px;
        }
        .frame-pre { border-color: rgba(6, 182, 212, 0.35); }
        .frame-post { border-color: rgba(168, 85, 247, 0.35); }
        .frame-card-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.1rem;
          background: rgba(0, 0, 0, 0.45);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .frame-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 10px;
          border-radius: 999px;
        }
        .tag-cyan { background: rgba(6, 182, 212, 0.15); color: #67e8f9; border: 1px solid rgba(6, 182, 212, 0.4); }
        .tag-purple { background: rgba(168, 85, 247, 0.15); color: #d8b4fe; border: 1px solid rgba(168, 85, 247, 0.4); }
        .tag-amber { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }
        .frame-filename {
          font-size: 0.72rem;
          color: var(--text-muted);
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .frame-image-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #030712;
          overflow: hidden;
          position: relative;
        }
        .observation-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          max-height: 480px;
        }

        /* Step 3: Change */
        .change-triptych {
          display: grid;
          grid-template-columns: 1fr 1.3fr 1fr;
          gap: 1rem;
          align-items: stretch;
        }
        .triptych-card {
          background: rgba(15, 23, 42, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 340px;
        }
        .change-focus-card {
          border-color: rgba(245, 158, 11, 0.5);
          box-shadow: 0 0 35px rgba(245, 158, 11, 0.15);
        }
        .triptych-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 1rem;
          background: rgba(0, 0, 0, 0.5);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .triptych-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 999px;
        }
        .change-model-pill {
          font-size: 0.68rem;
          color: #fbbf24;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 1px 7px;
          border-radius: 4px;
        }
        .triptych-body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #030712;
          overflow: hidden;
          position: relative;
        }
        .triptych-body img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          max-height: 380px;
        }
        .diff-composite-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .diff-highlight-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.25) 0%, transparent 70%);
          mix-blend-mode: color-dodge;
          pointer-events: none;
        }
        .diff-badge-indicator {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.75);
          border: 1px solid rgba(245, 158, 11, 0.5);
          color: #fbbf24;
          padding: 3px 12px;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 600;
          backdrop-filter: blur(8px);
        }
        .change-metrics-deck {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        .metric-card {
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .metric-icon { font-size: 1.6rem; }
        .metric-data { display: flex; flex-direction: column; gap: 0.2rem; }
        .metric-label { font-size: 0.72rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; }
        .metric-value { font-size: 1.15rem; font-weight: 800; color: #f8fafc; }

        /* Step 4: Spatial */
        .spatial-inspection-stage {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 1.5rem;
          align-items: start;
        }
        .spatial-canvas-card {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .spatial-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          background: rgba(0, 0, 0, 0.45);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .spatial-viewport {
          position: relative;
          background: #030712;
          min-height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .spatial-image-wrapper {
          position: relative;
          display: inline-block;
          max-width: 100%;
          max-height: 520px;
        }
        .spatial-bg-image {
          display: block;
          max-width: 100%;
          max-height: 520px;
          object-fit: contain;
        }
        .evidence-bbox {
          position: absolute;
          border: 2px solid #38bdf8;
          background: rgba(56, 189, 248, 0.15);
          border-radius: 4px;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.5);
          pointer-events: none;
        }
        .bbox-tag {
          position: absolute;
          top: -22px;
          left: 0;
          background: #0284c7;
          color: #fff;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 3px;
          white-space: nowrap;
        }
        .spatial-data-sidebar {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .spatial-regions-scroll {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-height: 360px;
          overflow-y: auto;
        }
        .region-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.55rem 0.75rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
        }
        .region-item-left { display: flex; align-items: center; gap: 0.6rem; }
        .region-index { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); }
        .region-title { font-size: 0.78rem; font-weight: 600; color: #f1f5f9; display: block; }
        .region-agent-sub { font-size: 0.65rem; color: var(--text-muted); display: block; }
        .spatial-stat-card {
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 0.75rem;
        }

        /* Step 5: Evidence */
        .verifier-decision-card {
          border-left: 4px solid;
        }
        .verifier-success {
          border-left-color: #10b981;
          background: linear-gradient(145deg, rgba(6, 78, 59, 0.25), rgba(15, 23, 42, 0.85));
        }
        .verifier-warning {
          border-left-color: #f59e0b;
          background: linear-gradient(145deg, rgba(120, 53, 15, 0.25), rgba(15, 23, 42, 0.85));
        }
        .verifier-status-icon { font-size: 1.8rem; }
        .verifier-status-title { font-size: 1.05rem; font-weight: 700; color: #f8fafc; margin: 0; }
        .verifier-status-desc { font-size: 0.8rem; color: var(--text-secondary); margin: 0; }
        .conflicts-box {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 6px;
          padding: 0.5rem 0.75rem;
        }
        .conflict-list { padding-left: 1rem; margin-top: 0.25rem; }
        .agent-list-stack { display: flex; flex-direction: column; gap: 0.85rem; }

        /* Step 6: Trust */
        .trust-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        .trust-col { min-width: 0; }

        /* Navigation Footer */
        .mission-navigation-footer {
          position: sticky;
          bottom: 1.5rem;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.75rem;
          background: rgba(15, 23, 42, 0.88);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 16px;
          backdrop-filter: blur(20px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.8), 0 0 25px rgba(56, 189, 248, 0.15);
        }
        .btn-nav-back, .btn-nav-continue {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.04em;
          padding: 0.65rem 1.4rem;
          border-radius: 10px;
        }
        .new-mission-cta {
          background: linear-gradient(135deg, #059669 0%, #10b981 100%);
        }
        .mission-progress-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .progress-dots {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .p-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .p-dot.done { background: #10b981; }
        .p-dot.active {
          width: 22px;
          border-radius: 4px;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
        }

        @media (max-width: 1100px) {
          .mission-stepper-hud { grid-template-columns: repeat(3, 1fr); }
          .observations-display-grid { grid-template-columns: 1fr; }
          .change-triptych { grid-template-columns: 1fr; }
          .spatial-inspection-stage { grid-template-columns: 1fr; }
          .trust-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 700px) {
          .mission-stepper-hud { grid-template-columns: repeat(2, 1fr); }
          .mission-workflow-container { padding: 1rem 0.75rem 4rem; }
          .mission-navigation-footer { padding: 0.75rem 1rem; }
          .btn-nav-back, .btn-nav-continue { font-size: 0.75rem; padding: 0.5rem 1rem; }
        }
      `}</style>
    </div>
  );
}

// ── High-Tech Orbital Radar Scanner HUD Placeholder ──────────────────────────
function OrbitalRadarPlaceholder({
  icon, label, sub
}: {
  icon: string; label: string; sub: string;
}) {
  return (
    <div className="radar-placeholder-wrap">
      <div className="radar-grid-backdrop" />
      <div className="radar-sweep-beam" />
      <div className="radar-target-reticle">
        <div className="reticle-circle reticle-1" />
        <div className="reticle-circle reticle-2" />
        <div className="reticle-crosshair-h" />
        <div className="reticle-crosshair-v" />
        <span className="radar-center-icon">{icon}</span>
      </div>
      <div className="radar-telemetry-text">
        <span className="radar-main-label">{label}</span>
        <span className="radar-sub-label">{sub}</span>
        <div className="radar-coords-strip">
          <span>LAT: 28.6139° N</span>
          <span>·</span>
          <span>LON: 77.2090° E</span>
          <span>·</span>
          <span>ALT: 786 KM</span>
        </div>
      </div>

      <style>{`
        .radar-placeholder-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 380px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.12) 0%, rgba(3, 7, 18, 0.95) 75%);
          padding: 2rem;
        }
        .radar-grid-backdrop {
          position: absolute;
          inset: 0;
          background-size: 32px 32px;
          background-image:
            linear-gradient(to right, rgba(56, 189, 248, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.07) 1px, transparent 1px);
          pointer-events: none;
        }
        .radar-sweep-beam {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: conic-gradient(from 0deg at 50% 50%, rgba(56, 189, 248, 0.25) 0deg, transparent 90deg, transparent 360deg);
          animation: radarSweep 4s linear infinite;
          pointer-events: none;
        }
        .radar-target-reticle {
          position: relative;
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          z-index: 2;
        }
        .reticle-circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(56, 189, 248, 0.4);
        }
        .reticle-1 { width: 140px; height: 140px; border-style: dashed; animation: spin 20s linear infinite; }
        .reticle-2 { width: 85px; height: 85px; border-color: rgba(168, 85, 247, 0.4); }
        .reticle-crosshair-h { position: absolute; width: 100%; height: 1px; background: rgba(56, 189, 248, 0.35); }
        .reticle-crosshair-v { position: absolute; height: 100%; width: 1px; background: rgba(56, 189, 248, 0.35); }
        .radar-center-icon {
          font-size: 2.2rem;
          line-height: 1;
          filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.7));
          z-index: 3;
        }
        .radar-telemetry-text {
          position: relative;
          z-index: 2;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
        }
        .radar-main-label {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: #f1f5f9;
        }
        .radar-sub-label {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }
        .radar-coords-strip {
          margin-top: 0.4rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 3px 10px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(56, 189, 248, 0.25);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: #38bdf8;
          letter-spacing: 0.05em;
        }
        @keyframes radarSweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
