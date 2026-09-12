import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

// ── Config ──────────────────────────────────────────────────────────────────
const FRAME_COUNT = 360;
const FRAME_START = 1;
const SEQ_PATH    = '/SATQUERY-SEQUENCE/sat_';
const SEQ_EXT     = '.webp';

function frameSrc(i: number) {
  return `${SEQ_PATH}${String(i).padStart(3, '0')}${SEQ_EXT}`;
}

// ── Loading HUD ──────────────────────────────────────────────────────────────
function LoadingHUD({ progress }: { progress: number }) {
  const pct  = Math.round(progress * 100);
  const r    = 54;
  const circ = 2 * Math.PI * r;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#030712',
        zIndex: 50,
      }}
    >
      <div style={{ position: 'relative', width: '128px', height: '128px', marginBottom: '24px' }}>
        <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(0,240,255,0.08)" strokeWidth="3" />
          <circle cx="60" cy="60" r={r} fill="none" stroke="#00f0ff" strokeWidth="3"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - progress)}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#67e8f9', fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: 'bold' }}>{pct}%</span>
        </div>
      </div>
      <p style={{ fontFamily: 'monospace', color: '#22d3ee', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
        INITIALIZING ORBITAL LINK...
      </p>
      <div style={{ marginTop: '16px', width: '192px', height: '1px', backgroundColor: 'rgba(22, 78, 99, 0.4)', overflow: 'hidden' }}>
        <div style={{ height: '100%', backgroundColor: 'rgba(34, 211, 238, 0.6)', width: `${pct}%`, transition: 'width 0.1s linear' }} />
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function SatScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const vignetteRef  = useRef<HTMLDivElement>(null);
  const ctxRef       = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef    = useRef<HTMLImageElement[]>([]);
  const frameRef     = useRef(0);
  const rafRef       = useRef<number | null>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded,     setIsLoaded]     = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef });

  // ── Draw ───────────────────────────────────────────────────────────────────
  const draw = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const clampedIdx = Math.max(0, Math.min(FRAME_COUNT - 1, idx));
    const img = imagesRef.current[clampedIdx];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    
    if (!ctxRef.current) {
      ctxRef.current = canvas.getContext('2d');
    }
    const ctx = ctxRef.current;
    if (!ctx) return;

    // Use logical (CSS) pixel dimensions — context is already dpr-scaled
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
    const sw    = img.naturalWidth  * scale;
    const sh    = img.naturalHeight * scale;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);

    // Light corner vignette
    const v = ctx.createRadialGradient(cw / 2, ch / 2, ch * 0.38, cw / 2, ch / 2, ch * 0.85);
    v.addColorStop(0, 'rgba(3,7,18,0)');
    v.addColorStop(1, 'rgba(3,7,18,0.40)');
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, cw, ch);
  }, []);

  // ── Resize ─────────────────────────────────────────────────────────────────
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width  = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctxRef.current = ctx;
    }
    draw(frameRef.current);
  }, [draw]);

  // ── Preload ────────────────────────────────────────────────────────────────
  useEffect(() => {
    let done = 0;
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.src   = frameSrc(FRAME_START + i);
      const onDone = () => {
        done++;
        setLoadProgress(done / FRAME_COUNT);
        if (done === FRAME_COUNT) setIsLoaded(true);
      };
      img.onload  = onDone;
      img.onerror = onDone;
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);

  useEffect(() => {
    if (isLoaded) { resize(); draw(0); }
  }, [isLoaded, resize, draw]);

  // ── High-Precision Smooth Frame Engine (Zero-Jitter, 60+ FPS) ───────────
  useEffect(() => {
    if (!isLoaded) return;

    let targetProgress = 0;
    let currentProgress = 0;
    let animId: number | null = null;

    const updateScrollTarget = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      targetProgress = progress;
    };

    const renderLoop = () => {
      // Damped smooth lerp: catches up smoothly even at tiny fractional scroll increments
      const delta = targetProgress - currentProgress;
      
      if (Math.abs(delta) > 0.00001) {
        currentProgress += delta * 0.18;
      } else {
        currentProgress = targetProgress;
      }

      const frameIndex = Math.round(currentProgress * (FRAME_COUNT - 1));
      const clampedFrame = Math.max(0, Math.min(FRAME_COUNT - 1, frameIndex));

      if (clampedFrame !== frameRef.current) {
        frameRef.current = clampedFrame;
        draw(clampedFrame);
      }

      if (vignetteRef.current) {
        const fade = Math.max(0, Math.min(1, (currentProgress - 0.92) / 0.08));
        vignetteRef.current.style.opacity = String(fade);
      }

      animId = requestAnimationFrame(renderLoop);
    };

    // Initialize position
    updateScrollTarget();
    currentProgress = targetProgress;
    const initialFrame = Math.round(currentProgress * (FRAME_COUNT - 1));
    frameRef.current = initialFrame;
    draw(initialFrame);

    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', updateScrollTarget);
      if (animId !== null) cancelAnimationFrame(animId);
    };
  }, [isLoaded, draw]);

  const scrollToDashboard = () => {
    const el = document.getElementById('dashboard-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: '260vh',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          backgroundColor: '#030712',
          zIndex: 10,
        }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />

        {/* Loading screen */}
        {!isLoaded && <LoadingHUD progress={loadProgress} />}

        {/* ── Cinematic Overlay HUD: Title & Mission Scope (Visible during orbital phase) ── */}
        {isLoaded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '2.5rem 2rem 3rem',
              pointerEvents: 'none',
              zIndex: 20,
            }}
          >
            {/* Top Telemetry Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '1350px',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  background: 'rgba(3, 7, 18, 0.7)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#38bdf8',
                    boxShadow: '0 0 10px #38bdf8',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                    color: '#7dd3fc',
                    fontWeight: 700,
                  }}
                >
                  ISRO SIH26167 · ORBITAL COPILOT
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.72rem',
                  color: 'rgba(148, 163, 184, 0.85)',
                  background: 'rgba(3, 7, 18, 0.65)',
                  padding: '5px 14px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span>SENSORS: OPTICAL + C-BAND SAR</span>
                <span>•</span>
                <span>DESCENT ENGINE ACTIVE</span>
              </div>
            </div>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Bottom Floating Jump Bar & Prompt */}
            <div
              style={{
                pointerEvents: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.8rem',
              }}
            >
              <button
                onClick={scrollToDashboard}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '12px 28px',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.85) 0%, rgba(99, 102, 241, 0.85) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  boxShadow: '0 8px 30px rgba(14, 165, 233, 0.4), 0 0 20px rgba(99, 102, 241, 0.3)',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(14, 165, 233, 0.6), 0 0 25px rgba(99, 102, 241, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(14, 165, 233, 0.4), 0 0 20px rgba(99, 102, 241, 0.3)';
                }}
              >
                <span>Launch Analysis Workspace</span>
                <span style={{ fontSize: '1.1rem', animation: 'bounce 1.5s infinite' }}>↓</span>
              </button>

              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  color: '#64748b',
                  textTransform: 'uppercase',
                }}
              >
                Scroll down to zoom or click to start
              </span>
            </div>
          </div>
        )}

        {/* Exit gentle vignette fade into dashboard */}
        <div
          ref={vignetteRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(3,7,18,0.5) 65%, rgba(3,7,18,1) 100%)',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.05s linear',
          }}
        />
      </div>
    </div>
  );
}
