/**
 * App — SatQuery AI main application shell.
 *
 * Layout:
 *   - Fixed navbar with ISRO branding and PS reference
 *   - Hero section with animated pitch
 *   - Two-column layout: QueryComposer (left) | ResultsPanel (right)
 *   - Loading skeleton state
 *   - Error display
 */
import { useState, useCallback } from 'react';
import type { QueryResponse, QueryRequest } from './types';
import QueryComposer from './components/QueryComposer';
import ResultsPanel from './components/ResultsPanel';
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

  const handleAnalyze = useCallback(async (req: QueryRequest) => {
    setLoading(true);
    setError(null);
    setResponse(null);

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

  return (
    <div className="app bg-[#030712]" style={{ backgroundColor: '#030712' }}>
      {/* ── 01: Flagship 360-Frame Cinematic Earth Scroll Hero (First Page Only) ── */}
      <SatScrollHero />

      {/* ── 02: Full UI & Mission Dashboard (Prominent, High-Resolution Aerospace Workstation) ── */}
      <div
        className="dashboard-container"
        id="dashboard-section"
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#030712',
          scrollSnapAlign: 'start',
          scrollMarginTop: 0,
        }}
      >
        {/* Cursor-Sensitive Cosmic Parallax & Telemetry Mesh */}
        <CursorReactiveBackground />

        {/* 3D Interactive Earth Background Scoped to Dashboard */}
        <EarthGlobeBackground
          targetLocation={targetLocation}
          onResetTarget={() => setTargetLocation(null)}
        />

        {/* ── Mission Navbar ──────────────────────────────────────────── */}
        <nav className="navbar" id="main-navbar">
          <div className="navbar-inner">
            <div className="nav-brand">
              <div className="nav-logo">🛰</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <h1 className="nav-title gradient-text">SatQuery AI</h1>
                  <span className="telemetry-pill">
                    <span className="pulse-dot" />
                    SURFACE COPILOT ACTIVE
                  </span>
                </div>
                <p className="nav-subtitle">Interactive Vision-Language Assistant for Multimodal Remote Sensing</p>
              </div>
            </div>
            <div className="nav-badges">
              <span className="badge badge-blue">SIH26167</span>
              <span className="badge badge-cyan">ISRO</span>
              <span className="badge badge-purple">Smart India Hackathon 2026</span>
            </div>
          </div>
        </nav>

        {/* ── Capability Mission Ribbon ────────────────────────────────── */}
        <div className="mission-ribbon">
          <div className="mission-ribbon-inner">
            <span className="mission-ribbon-title">⚡ ACTIVE CAPABILITY MATRIX:</span>
            <div className="mission-ribbon-pills">
              <span className="ribbon-pill">ChangeFormer Bi-Temporal</span>
              <span className="ribbon-pill">Sentinel-1 C-Band SAR</span>
              <span className="ribbon-pill">BuildingResUNet Footprints</span>
              <span className="ribbon-pill">Zero-Shot SAM Grounding</span>
              <span className="ribbon-pill">BLIP-2 Geospatial VQA</span>
              <span className="ribbon-pill">Voice Query (EN & HI)</span>
            </div>
          </div>
        </div>

        {/* ── Main workspace ──────────────────────────────────────────── */}
        <main className="workspace" id="main-workspace" style={{ position: 'relative', zIndex: 10 }}>
          {/* Left: Query input */}
          <section className="workspace-left" aria-label="Query input">
            <QueryComposer onAnalyze={handleAnalyze} loading={loading} />
          </section>

          {/* Right: Results */}
          <section className="workspace-right" aria-label="Analysis results">
            {loading && <LoadingSkeleton />}
            {error && <ErrorCard message={error} />}
            {response && !loading && <ResultsPanel response={response} />}
            {!loading && !error && !response && <EmptyState />}
          </section>
        </main>
      </div>

      <style>{`
        .app { min-height: 100vh; display: flex; flex-direction: column; }
        .dashboard-container { position: relative; }

        /* Navbar */
        .navbar {
          position: sticky; top: 0; z-index: 100;
          background: rgba(3, 7, 18, 0.88); backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(56, 189, 248, 0.2);
          padding: 0.85rem 2.5rem;
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.6);
        }
        .navbar-inner {
          max-width: 1750px;
          margin: 0 auto;
          width: 96%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .nav-brand { display: flex; align-items: center; gap: 0.85rem; }
        .nav-logo { font-size: 2.1rem; line-height: 1; filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.5)); }
        .nav-title { font-size: 1.45rem; font-weight: 800; line-height: 1.1; letter-spacing: -0.01em; }
        .nav-subtitle { font-size: 0.74rem; color: var(--text-muted); margin-top: 2px; }
        .nav-badges { display: flex; gap: 0.5rem; flex-wrap: wrap; }

        .telemetry-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 2px 10px;
          border-radius: 999px;
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.4);
          font-family: var(--font-mono, monospace);
          font-size: 0.68rem;
          font-weight: 700;
          color: #67e8f9;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #06b6d4;
          box-shadow: 0 0 8px #06b6d4;
          animation: pulseDot 2s infinite ease-in-out;
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        /* Mission Ribbon */
        .mission-ribbon {
          position: relative;
          z-index: 20;
          background: rgba(11, 19, 41, 0.75);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding: 0.5rem 2.5rem;
        }
        .mission-ribbon-inner {
          max-width: 1750px;
          margin: 0 auto;
          width: 96%;
          display: flex;
          align-items: center;
          gap: 1rem;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .mission-ribbon-inner::-webkit-scrollbar { display: none; }
        .mission-ribbon-title {
          font-family: var(--font-mono, monospace);
          font-size: 0.7rem;
          font-weight: 700;
          color: #38bdf8;
          letter-spacing: 0.12em;
          white-space: nowrap;
        }
        .mission-ribbon-pills {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: nowrap;
        }
        .ribbon-pill {
          padding: 3px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-secondary);
          white-space: nowrap;
          transition: all 0.15s ease;
        }
        .ribbon-pill:hover {
          background: rgba(56, 189, 248, 0.15);
          border-color: rgba(56, 189, 248, 0.35);
          color: #ffffff;
        }

        /* Workspace — Half screen 50/50 layout */
        .workspace {
          flex: 1;
          display: grid;
          grid-template-columns: minmax(0, 1.12fr) minmax(0, 1fr);
          gap: 2rem;
          padding: 1.5rem 2.5rem 4rem;
          max-width: 1750px;
          margin: 0 auto;
          width: 96%;
          align-items: start;
        }
        .workspace-left {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          position: sticky;
          top: 80px;
          min-width: 0;
        }
        .workspace-right {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        @media (max-width: 1200px) {
          .workspace { grid-template-columns: 1fr; max-width: 1000px; padding: 1.25rem 1.5rem 3rem; }
          .workspace-left { position: static; }
        }
        @media (max-width: 600px) {
          .navbar { padding: 0.6rem 1rem; }
          .mission-ribbon { padding: 0.4rem 1rem; }
          .workspace { padding: 1rem; width: 100%; }
          .nav-badges .badge:nth-child(n+3) { display: none; }
        }
      `}</style>
    </div>
  );
}



// ── Loading skeleton ──────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="loading-skeleton fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {[200, 120, 160, 280, 220].map((h, i) => (
        <div key={i} className="skeleton" style={{ height: `${h}px`, borderRadius: 'var(--radius-lg)' }} />
      ))}
      <div className="loading-label">
        <div className="spinner spinner-lg" />
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Running agentic pipeline…</span>
      </div>
      <style>{`
        .loading-label { display: flex; align-items: center; justify-content: center; gap: 1rem; padding: 1.5rem; }
      `}</style>
    </div>
  );
}

// ── Error card ────────────────────────────────────────────────────────────────
function ErrorCard({ message }: { message: string }) {
  return (
    <div className="card fade-in" style={{ borderLeft: '3px solid var(--accent-danger)' }} id="error-card">
      <div className="flex items-center gap-2 mb-2">
        <span style={{ fontSize: '1.3rem' }}>⚠</span>
        <p className="section-label" style={{ margin: 0, color: 'var(--accent-danger)' }}>Pipeline Error</p>
      </div>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{message}</p>
      <p className="text-xs text-muted mt-3">
        Make sure the backend is running: <code className="text-mono">uvicorn backend.main:app --reload</code>
      </p>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="empty-state fade-in" id="empty-state">
      <div className="empty-orb">🛰</div>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Ready to analyze</h2>
      <p className="text-secondary" style={{ maxWidth: '360px', textAlign: 'center', fontSize: '0.9rem' }}>
        Type or speak a question about your satellite imagery. Select one of the suggested query types,
        or upload your own images and ask anything.
      </p>
      <div className="empty-features">
        {['🔍 VQA', '📝 Caption', '📍 Grounding', '🔄 Change', '📡 SAR+Optical', '🎤 Voice'].map(f => (
          <span key={f} className="hero-pill" style={{ fontSize: '0.78rem' }}>{f}</span>
        ))}
      </div>
      <style>{`
        .empty-state { display: flex; flex-direction: column; align-items: center; padding: 3rem 2rem; gap: 1rem; }
        .empty-orb { font-size: 4rem; line-height: 1; filter: drop-shadow(0 0 30px rgba(59,130,246,0.4)); }
        .empty-features { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.4rem; margin-top: 0.5rem; }
      `}</style>
    </div>
  );
}
