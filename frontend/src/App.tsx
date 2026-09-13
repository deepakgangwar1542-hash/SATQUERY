/**
 * App — SatQuery AI main application shell.
 *
 * Guided Mission Flow:
 *   - Cinematic Parallax Scroll Landing (SatScrollHero)
 *   - Mission Setup (MissionSetup: Pre/Post Uploads, Query Composer, ROI Visualizer)
 *   - Single Backend Inference Execution (/query/analyze)
 *   - 6-Step Guided Mission Workflow (MissionResults: 01 Observes -> 02 Change -> 03 Impact -> 04 Evidence -> 05 Finding -> 06 Trust)
 */
import { useState, useCallback } from 'react';
import type { QueryResponse, QueryRequest } from './types';
import MissionSetup from './components/MissionSetup';
import MissionResults from './components/MissionResults';
import EarthGlobeBackground, { resolveLocationFromQuery, type GeoTarget } from './components/EarthGlobeBackground';
import SatScrollHero from './components/SatScrollHero';
import CursorReactiveBackground from './components/CursorReactiveBackground';

async function callAnalyze(req: QueryRequest): Promise<QueryResponse> {
  const res = await fetch('/query/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? 'API error');
  }
  return res.json();
}

export default function App() {
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [targetLocation, setTargetLocation] = useState<GeoTarget | null>(null);
  const [requestMeta, setRequestMeta] = useState<{
    prePreview?: string;
    postPreview?: string;
    preName?: string;
    postName?: string;
  }>({});

  const handleAnalyze = useCallback(async (
    req: QueryRequest,
    meta: { prePreview?: string; postPreview?: string; preName?: string; postName?: string } = {}
  ) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setRequestMeta(meta);

    // Immediately resolve location if mentioned in query to start 3D camera fly-to
    const preTarget = resolveLocationFromQuery(req.question);
    if (preTarget) {
      setTargetLocation(preTarget);
    }

    try {
      const result = await callAnalyze(req);
      setResponse(result);

      // Also check extracted entities from backend EarthQuerySpec
      const entities = result.earthquery_spec?.extracted_entities || [];
      const resolved = resolveLocationFromQuery(result.question, entities);
      if (resolved) {
        setTargetLocation(resolved);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleNewMission = useCallback(() => {
    setResponse(null);
    setError(null);
    setTargetLocation(null);
    // Smooth scroll back to mission setup
    const el = document.getElementById('dashboard-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="app bg-[#030712]" style={{ backgroundColor: '#030712' }}>
      {/* ── 01: Flagship 360-Frame Cinematic Earth Scroll Hero (Parallax Landing) ── */}
      <SatScrollHero />

      {/* ── 02: Guided Mission Environment & Atmospheric Container ── */}
      <div
        className="dashboard-container"
        id="dashboard-section"
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#030712',
          overflow: 'hidden',
        }}
      >
        {/* Seamless feathering bridge from hero zoom */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '180px',
            background: 'linear-gradient(to bottom, #030712 0%, rgba(3,7,18,0.85) 40%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 15,
          }}
        />

        {/* Tactical Mission Lock-In Telemetry Strip */}
        <div
          style={{
            position: 'relative',
            zIndex: 25,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '2rem',
            paddingBottom: '0.5rem',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '6px 18px',
              borderRadius: '999px',
              background: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 25px rgba(6, 182, 212, 0.15)',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#06b6d4',
                boxShadow: '0 0 10px #06b6d4',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.74rem',
                letterSpacing: '0.2em',
                color: '#67e8f9',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              SURFACE TELEMETRY LOCKED · SATELLITE COPILOT ACTIVE
            </span>
          </div>
        </div>

        {/* Cursor-Sensitive Cosmic Parallax & Telemetry Mesh */}
        <CursorReactiveBackground />

        {/* 3D Interactive Earth Background Scoped to Dashboard */}
        <EarthGlobeBackground
          targetLocation={targetLocation}
          onResetTarget={() => setTargetLocation(null)}
        />

        {/* ── Fixed Aerospace Navbar ── */}
        <nav className="navbar" id="main-navbar" style={{ position: 'relative', zIndex: 20 }}>
          <div className="navbar-inner">
            <div className="nav-brand" onClick={handleNewMission} style={{ cursor: 'pointer' }}>
              <div className="nav-logo">🛰</div>
              <div>
                <h1 className="nav-title gradient-text">SatQuery AI</h1>
                <p className="nav-subtitle">Interactive Vision-Language Assistant for Remote Sensing</p>
              </div>
            </div>
            <div className="nav-badges">
              <span className="badge badge-blue">SIH26167</span>
              <span className="badge badge-cyan">ISRO</span>
              <span className="badge badge-purple">Smart India Hackathon 2026</span>
            </div>
          </div>
        </nav>

        {/* ── Guided Mission Flow Stage ── */}
        <main className="mission-stage-main" id="main-workspace" style={{ position: 'relative', zIndex: 20 }}>
          {/* State 1: Pipeline Loading Telemetry State */}
          {loading && <LoadingSkeleton />}

          {/* State 2: Pipeline Error Display */}
          {error && <ErrorCard message={error} onRetry={handleNewMission} />}

          {/* State 3: Guided 6-Step Mission Workflow View */}
          {response && !loading && (
            <MissionResults
              response={response}
              requestMeta={requestMeta}
              onNewMission={handleNewMission}
            />
          )}

          {/* State 4: Initial Mission Setup View */}
          {!loading && !response && (
            <MissionSetup
              onAnalyze={handleAnalyze}
              loading={loading}
            />
          )}
        </main>
      </div>

      <style>{`
        .app { min-height: 100vh; display: flex; flex-direction: column; }
        .dashboard-container { position: relative; }

        /* Navbar */
        .navbar {
          position: sticky; top: 0; z-index: 100;
          background: rgba(6,10,20,0.85); backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-card);
          padding: 0.75rem 2rem;
        }
        .navbar-inner { max-width: 1400px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; }
        .nav-brand { display: flex; align-items: center; gap: 0.75rem; }
        .nav-logo { font-size: 1.8rem; line-height: 1; }
        .nav-title { font-size: 1.25rem; font-weight: 800; line-height: 1.1; }
        .nav-subtitle { font-size: 0.68rem; color: var(--text-muted); white-space: nowrap; }
        .nav-badges { display: flex; gap: 0.4rem; flex-wrap: wrap; }

        .mission-stage-main {
          width: 100%;
          min-height: calc(100vh - 80px);
        }

        @media (max-width: 600px) {
          .navbar { padding: 0.6rem 1rem; }
          .nav-badges .badge:nth-child(n+3) { display: none; }
        }
      `}</style>
    </div>
  );
}

// ── Orbital Telemetry Loading Skeleton ──────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="mission-loading-wrap fade-in">
      <div className="orbital-scanner-card card">
        <div className="scanner-orb-wrap">
          <div className="scanner-pulse-ring" />
          <div className="scanner-pulse-ring-inner" />
          <div className="scanner-sat-icon">🛰</div>
        </div>

        <h2 className="scanner-heading gradient-text">Satellite Copilot Executing Pipeline</h2>
        <p className="scanner-sub">
          Orchestrating VQA, ChangeFormer, SAM grounding, and SAR-optical multi-agent fusion…
        </p>

        <div className="scanner-telemetry-steps">
          <div className="scanner-step active">
            <span className="step-dot" />
            <span>Multi-modal Perception & Task Intent Extraction</span>
          </div>
          <div className="scanner-step active">
            <span className="step-dot" />
            <span>Sensor Selection & Cloud Penetration Arbitration</span>
          </div>
          <div className="scanner-step active">
            <span className="step-dot" />
            <span>Bi-Temporal Change Detection & Spatial Intersection</span>
          </div>
          <div className="scanner-step active">
            <span className="step-dot" />
            <span>Cross-Modal Evidence Fusion & 6-Component Confidence Scoring</span>
          </div>
        </div>

        <div className="progress-bar mt-4" style={{ height: '6px', maxWidth: '380px', margin: '1.5rem auto 0' }}>
          <div className="progress-bar-fill scanner-progress-anim" />
        </div>
      </div>

      <style>{`
        .mission-loading-wrap {
          max-width: 720px;
          margin: 4rem auto;
          padding: 0 1.5rem;
        }
        .orbital-scanner-card {
          text-align: center;
          padding: 3rem 2rem;
          background: linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(8, 14, 28, 0.98));
          border: 1px solid rgba(56, 189, 248, 0.35);
          border-radius: 20px;
          box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(56, 189, 248, 0.2);
        }
        .scanner-orb-wrap {
          position: relative;
          width: 90px;
          height: 90px;
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .scanner-pulse-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px dashed rgba(56, 189, 248, 0.6);
          animation: spin 8s linear infinite;
        }
        .scanner-pulse-ring-inner {
          position: absolute;
          inset: 10px;
          border-radius: 50%;
          border: 1.5px solid rgba(168, 85, 247, 0.5);
          animation: spinReverse 6s linear infinite;
        }
        .scanner-sat-icon {
          font-size: 2.2rem;
          line-height: 1;
          filter: drop-shadow(0 0 15px rgba(56, 189, 248, 0.8));
          animation: floatOrb 3s ease-in-out infinite;
        }
        .scanner-heading {
          font-size: 1.45rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        .scanner-sub {
          font-size: 0.85rem;
          color: var(--text-secondary);
          max-width: 480px;
          margin: 0 auto 1.5rem;
        }
        .scanner-telemetry-steps {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          max-width: 460px;
          margin: 0 auto;
          text-align: left;
        }
        .scanner-step {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.78rem;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .scanner-step .step-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 6px #38bdf8;
          animation: pulse 1.5s infinite;
        }
        .scanner-progress-anim {
          width: 60%;
          background: linear-gradient(90deg, #38bdf8, #818cf8, #c084fc);
          animation: loadingBar 2s infinite ease-in-out;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes spinReverse { to { transform: rotate(-360deg); } }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes loadingBar {
          0% { transform: translateX(-100%); width: 30%; }
          50% { width: 70%; }
          100% { transform: translateX(200%); width: 30%; }
        }
      `}</style>
    </div>
  );
}

// ── Error card ────────────────────────────────────────────────────────────────
function ErrorCard({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="mission-error-wrap fade-in">
      <div className="card error-card-inner" id="error-card">
        <div className="flex items-center gap-2 mb-2">
          <span style={{ fontSize: '1.4rem' }}>⚠</span>
          <p className="section-label" style={{ margin: 0, color: 'var(--accent-danger)' }}>Pipeline Execution Error</p>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{message}</p>
        <p className="text-xs text-muted mt-3">
          Ensure backend server is running: <code className="text-mono">uvicorn backend.main:app --reload</code>
        </p>
        <button
          type="button"
          className="btn btn-secondary btn-sm mt-4"
          onClick={onRetry}
        >
          ↺ Return to Mission Setup
        </button>
      </div>

      <style>{`
        .mission-error-wrap {
          max-width: 640px;
          margin: 4rem auto;
          padding: 0 1.5rem;
        }
        .error-card-inner {
          border-left: 4px solid var(--accent-danger);
          padding: 2rem;
          background: linear-gradient(145deg, rgba(30, 10, 15, 0.8), rgba(15, 23, 42, 0.95));
        }
      `}</style>
    </div>
  );
}
