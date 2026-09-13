import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

// ── Config ──────────────────────────────────────────────────────────────────
const FRAME_COUNT = 360;
const FRAME_START = 1;
const SEQ_PATH = '/SATQUERY-SEQUENCE/sat_';
const SEQ_EXT = '.webp';

function frameSrc(i: number) {
  return `${SEQ_PATH}${String(i).padStart(3, '0')}${SEQ_EXT}`;
}

// ── Loading HUD ──────────────────────────────────────────────────────────────
function LoadingHUD({ progress }: { progress: number }) {
  const pct = Math.round(progress * 100);
  const r = 54;
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);

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
    if (cw === 0 || ch === 0) return;

    const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
    const sw = img.naturalWidth * scale;
    const sh = img.naturalHeight * scale;

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
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
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
      img.src = frameSrc(FRAME_START + i);
      const onDone = () => {
        done++;
        setLoadProgress(done / FRAME_COUNT);
        if (i === 0) {
          // Render first frame immediately as soon as frame 0 loads!
          resize();
          draw(0);
        }
        if (done === FRAME_COUNT) {
          setIsLoaded(true);
        }
      };
      img.onload = onDone;
      img.onerror = onDone;
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, [resize, draw]);

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
        setCurrentFrame(clampedFrame + 1);
        draw(clampedFrame);
      }

      if (vignetteRef.current) {
        const fade = Math.max(0, Math.min(1, (currentProgress - 0.92) / 0.08));
        vignetteRef.current.style.opacity = String(fade);
      }

      animId = requestAnimationFrame(renderLoop);
    };

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
  }, [draw]);

  const scrollToWorkspace = () => {
    const el = document.getElementById('dashboard-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: '400vh',
        position: 'relative',
        width: '100%',
        backgroundColor: '#030712',
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
        {/* Ambient starfield background glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(14, 165, 233, 0.12) 0%, rgba(3, 7, 18, 0.9) 70%, #030712 100%)',
            pointerEvents: 'none',
          }}
        />

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

        {/* Loading screen if needed */}
        {!isLoaded && loadProgress < 0.15 && <LoadingHUD progress={loadProgress} />}

        {/* ── Futuristic Orbital HUD Overlay ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2rem 3rem',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        >
          {/* Top Bar Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              pointerEvents: 'auto',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                backdropFilter: 'blur(16px)',
                padding: '0.45rem 1.2rem',
                borderRadius: '999px',
                boxShadow: '0 0 20px rgba(56, 189, 248, 0.12)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#38bdf8',
                  boxShadow: '0 0 10px #38bdf8',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
              />
              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#bae6fd', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                ISRO SIH26167 · ORBITAL AI ENGINE
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b', letterSpacing: '0.1em' }}>
                FRAME: <strong style={{ color: '#38bdf8' }}>{String(currentFrame).padStart(3, '0')}</strong> / {FRAME_COUNT}
              </span>

            </div>
          </div>

          {/* Center Pitch & Call to Action */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '820px',
              margin: '0 auto',
              pointerEvents: 'auto',
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '1rem',
                color: '#ffffff',
                textShadow: '0 0 40px rgba(56, 189, 248, 0.35)',
              }}
            >
              <span style={{
                background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}></span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
                color: '#94a3b8',
                lineHeight: 1.6,
                marginBottom: '2rem',
                maxWidth: '680px',
              }}
            >
            </p>


          </div>

          {/* Bottom Telemetry & Scroll Cue */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              width: '100%',
              pointerEvents: 'auto',
            }}
          >
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: '#64748b',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem',
              }}
            >
              <span>MODES: <strong style={{ color: '#38bdf8' }}>RGB · SENTINEL-2 · SAR · BI-TEMPORAL</strong></span>
              <span>COMPLIANCE: <strong style={{ color: '#4ade80' }}>SIH26167 ISRO SPEC LIVE</strong></span>
            </div>

            <div
              onClick={scrollToWorkspace}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                opacity: 0.85,
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: '#38bdf8',
                  textTransform: 'uppercase',
                }}
              >
                SCROLL TO EXPLORE ORBIT
              </span>
              <div
                style={{
                  width: '20px',
                  height: '32px',
                  borderRadius: '10px',
                  border: '2px solid rgba(56, 189, 248, 0.4)',
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '6px',
                }}
              >
                <div
                  style={{
                    width: '3px',
                    height: '6px',
                    backgroundColor: '#38bdf8',
                    borderRadius: '2px',
                    animation: 'bounce 1.5s infinite',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Exit gentle vignette fade into dashboard */}
        <div
          ref={vignetteRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(3,7,18,0.4) 60%, rgba(6,10,20,1) 100%)',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.05s linear',
          }}
        />
      </div>
    </div>
  );
}
