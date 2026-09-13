/**
 * MissionSetup — Focused, cinematic mission configuration view.
 * Collects PRE and POST observation imagery and natural language query.
 * Reuses existing QueryRequest format and API submission handler.
 */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { QueryRequest } from '../types';
import PolygonAnnotator, { type Point } from './PolygonAnnotator';

interface SRResult { transcript: string; confidence: number; }
interface SRResultList { [index: number]: { [index: number]: SRResult }; }
interface SREvent extends Event { results: SRResultList; }
interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: ((ev: Event) => void) | null;
  onend: ((ev: Event) => void) | null;
  onerror: ((ev: Event) => void) | null;
  onresult: ((ev: SREvent) => void) | null;
  start(): void;
  stop(): void;
}

const isSpeechAvailable = (): boolean =>
  typeof window !== 'undefined' &&
  ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

const HINGLISH_WORDS = new Set([
  'kya', 'hai', 'hain', 'kaise', 'kahan', 'kaha', 'kitna', 'kitni', 'kitne',
  'batao', 'bataiye', 'batana', 'pehle', 'baad', 'badlav', 'badla', 'nuksan',
  'dekh', 'dekho', 'dikh', 'dikhao', 'dikhaye', 'ye', 'yeh', 'wo', 'woh',
  'isme', 'ismein', 'mai', 'mein', 'ko', 'se', 'aur', 'ka', 'ki', 'ke', 'par',
  'hua', 'hui', 'huye', 'hue', 'hoga', 'hogi', 'honge', 'raha', 'rahi', 'rahe',
  'chahiye', 'karo', 'kare', 'karein', 'kijiye', 'tasveer', 'chhavi', 'pani',
  'baadh', 'imarat', 'nadi', 'kuch', 'sab', 'wala', 'wali', 'wale', 'bhi',
  'nahi', 'nahin', 'matlab', 'thoda', 'jyada', 'zyada', 'yahan', 'wahan',
  'khojo', 'dhundo', 'mil', 'mila', 'mile', 'farq', 'antar', 'bata', 'hume',
  'hum', 'aap', 'tum', 'kyun', 'kab', 'kis', 'kisko', 'kaun', 'sirf', 'jungle',
  'ped', 'sadak', 'bhavan', 'shehar', 'gaon', 'khet', 'fasal', 'sukha'
]);

const detectLanguage = (text: string): { code: string; label: string; isHinglish?: boolean } => {
  if (!text || !text.trim()) {
    return { code: 'auto', label: 'Auto Detect' };
  }
  if (/[\u0900-\u097F]/.test(text)) return { code: 'hi-IN', label: 'हिंदी (Hindi)' };
  if (/[\u0980-\u09FF]/.test(text)) return { code: 'bn-IN', label: 'বাংলা (Bengali)' };
  if (/[\u0B80-\u0BFF]/.test(text)) return { code: 'ta-IN', label: 'தமிழ் (Tamil)' };
  if (/[\u0C00-\u0C7F]/.test(text)) return { code: 'te-IN', label: 'తెలుగు (Telugu)' };

  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  if (words.some(w => HINGLISH_WORDS.has(w))) {
    return { code: 'hi-IN', label: 'Hinglish (हिन्दी/EN)', isHinglish: true };
  }
  return { code: 'en-IN', label: 'English' };
};

export interface MissionSetupProps {
  onAnalyze: (req: QueryRequest, meta: { prePreview?: string; postPreview?: string; preName?: string; postName?: string }) => void;
  loading: boolean;
}

const SAMPLE_MISSIONS = [
  {
    title: 'Urban Expansion & Buildings',
    icon: '🏢',
    query: 'Identify all newly constructed buildings and infrastructure between these two scenes',
    preSample: '/SATQUERY-SEQUENCE/sat_015.webp',
    postSample: '/SATQUERY-SEQUENCE/sat_180.webp',
    preName: 'Sentinel2_Urban_T1.webp',
    postName: 'Sentinel2_Urban_T2.webp',
  },
  {
    title: 'Flood Impact & Water Inundation',
    icon: '🌊',
    query: 'Calculate the total flooded area in km² and list all affected settlements or roads',
    preSample: '/SATQUERY-SEQUENCE/sat_040.webp',
    postSample: '/SATQUERY-SEQUENCE/sat_220.webp',
    preName: 'Sentinel1_Flood_T1.webp',
    postName: 'Sentinel1_Flood_T2.webp',
  },
  {
    title: 'Deforestation & Vegetation Loss',
    icon: '🌲',
    query: 'Analyze NDVI vegetation changes and quantify canopy loss between pre and post imagery',
    preSample: '/SATQUERY-SEQUENCE/sat_060.webp',
    postSample: '/SATQUERY-SEQUENCE/sat_260.webp',
    preName: 'Landsat8_Canopy_T1.webp',
    postName: 'Landsat8_Canopy_T2.webp',
  },
  {
    title: 'SAR-Optical Joint Verification',
    icon: '📡',
    query: 'Perform joint SAR and optical change detection to penetrate cloud cover and verify damage',
    preSample: '/SATQUERY-SEQUENCE/sat_080.webp',
    postSample: '/SATQUERY-SEQUENCE/sat_300.webp',
    preName: 'SAR_GF_Radar_T1.webp',
    postName: 'Optical_S2_Target_T2.webp',
  },
];

export default function MissionSetup({ onAnalyze, loading }: MissionSetupProps) {
  const [question, setQuestion] = useState('');
  const [imageB64, setImageB64] = useState<string | undefined>();
  const [image2B64, setImage2B64] = useState<string | undefined>();
  const [imageName, setImageName] = useState('');
  const [image2Name, setImage2Name] = useState('');
  const [imageSize, setImageSize] = useState('');
  const [image2Size, setImage2Size] = useState('');
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [image2Preview, setImage2Preview] = useState<string | undefined>();
  
  const [drag1, setDrag1] = useState(false);
  const [drag2, setDrag2] = useState(false);
  const [polygon1, setPolygon1] = useState<Point[]>([]);
  const [polygon2, setPolygon2] = useState<Point[]>([]);
  const [drawing1, setDrawing1] = useState(false);
  const [drawing2, setDrawing2] = useState(false);
  const [syncPolygons, setSyncPolygons] = useState(true);
  const [showVisualizer, setShowVisualizer] = useState(false);
  
  const [listening, setListening] = useState(false);
  const [voiceToast, setVoiceToast] = useState('');
  const voiceSupported = isSpeechAvailable();
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileRef1 = useRef<HTMLInputElement>(null);
  const fileRef2 = useRef<HTMLInputElement>(null);

  const activePolygon = polygon1.length >= 3 ? polygon1 : (polygon2.length >= 3 ? polygon2 : []);
  const hasActivePolygon = activePolygon.length >= 3;

  const handlePolygon1Change = (poly: Point[]) => {
    setPolygon1(poly);
    if (syncPolygons) setPolygon2(poly);
  };

  const handlePolygon2Change = (poly: Point[]) => {
    setPolygon2(poly);
    if (syncPolygons) setPolygon1(poly);
  };

  const detected = detectLanguage(question);

  const startVoice = useCallback(() => {
    if (!voiceSupported || listening) return;
    const SpeechRecognitionCtor: new () => SpeechRecognitionInstance =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SpeechRecognitionCtor();
    rec.lang = detected.code === 'hi-IN' ? 'hi-IN' : (navigator.language || 'en-IN');
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    recognitionRef.current = rec;

    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);

    rec.onresult = (event: SREvent) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
      setVoiceToast(`Heard: "${transcript}"`);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setVoiceToast(''), 3500);
    };

    rec.start();
  }, [voiceSupported, listening, detected.code]);

  const stopVoice = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  useEffect(() => () => { recognitionRef.current?.stop(); }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const processFile = (
    file: File,
    setB64: (s: string | undefined) => void,
    setName: (s: string) => void,
    setSize: (s: string) => void,
    setPreview: (s: string | undefined) => void
  ) => {
    setName(file.name);
    setSize(formatFileSize(file.size));
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      setB64(result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setB64: (s: string | undefined) => void,
    setName: (s: string) => void,
    setSize: (s: string) => void,
    setPreview: (s: string | undefined) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file, setB64, setName, setSize, setPreview);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    setB64: (s: string | undefined) => void,
    setName: (s: string) => void,
    setSize: (s: string) => void,
    setPreview: (s: string | undefined) => void,
    setDrag: (b: boolean) => void
  ) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file, setB64, setName, setSize, setPreview);
    }
  };

  // Helper to load sample satellite scenes
  const loadSampleDataset = async (preUrl: string, postUrl: string, preTitle: string, postTitle: string) => {
    try {
      const [res1, res2] = await Promise.all([fetch(preUrl), fetch(postUrl)]);
      const [blob1, blob2] = await Promise.all([res1.blob(), res2.blob()]);
      processFile(new File([blob1], preTitle, { type: blob1.type || 'image/webp' }), setImageB64, setImageName, setImageSize, setImagePreview);
      processFile(new File([blob2], postTitle, { type: blob2.type || 'image/webp' }), setImage2B64, setImage2Name, setImage2Size, setImage2Preview);
    } catch (err) {
      console.warn('Failed to load sample dataset', err);
    }
  };

  const loadSingleSample = async (url: string, title: string, isScene2 = false) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const file = new File([blob], title, { type: blob.type || 'image/webp' });
      if (isScene2) {
        processFile(file, setImage2B64, setImage2Name, setImage2Size, setImage2Preview);
      } else {
        processFile(file, setImageB64, setImageName, setImageSize, setImagePreview);
      }
    } catch (err) {
      console.warn('Failed to load demo scene', err);
    }
  };

  const handleSubmit = () => {
    if (!question.trim() || loading) return;
    const detectedLang = detected.code !== 'auto' ? detected.code : 'en-IN';
    onAnalyze(
      {
        question: question.trim(),
        image_b64: imageB64,
        image2_b64: image2B64,
        language: detectedLang,
        polygon: hasActivePolygon ? activePolygon : undefined,
        roi_mode: hasActivePolygon,
        target_scene: 'both',
      },
      {
        prePreview: imagePreview,
        postPreview: image2Preview,
        preName: imageName,
        postName: image2Name,
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit();
  };

  return (
    <div className="mission-setup-container fade-in" id="mission-setup-view">
      {/* ── Header Badge & Title ── */}
      <div className="mission-setup-hero">
        <div className="mission-phase-badge">
          <span className="pulse-dot" />
          <span>PHASE 00 · MISSION INITIALIZATION</span>
        </div>
        <h1 className="mission-title">
          Mission <span className="gradient-text">Setup</span>
        </h1>
        <p className="mission-subtitle">
          Feed pre & post satellite acquisitions or a single target scene, then define your intelligence query.
        </p>
      </div>

      {/* ── 2-Column Observation Imagery Tiles ── */}
      <div className="observation-grid">
        {/* PRE OBSERVATION CARD */}
        <div
          className={`obs-card obs-pre ${drag1 ? 'drag-over' : ''} ${imagePreview ? 'has-content' : ''}`}
          onDragOver={e => { e.preventDefault(); setDrag1(true); }}
          onDragLeave={() => setDrag1(false)}
          onDrop={e => handleDrop(e, setImageB64, setImageName, setImageSize, setImagePreview, setDrag1)}
        >
          <input
            ref={fileRef1}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={e => handleImageUpload(e, setImageB64, setImageName, setImageSize, setImagePreview)}
          />
          <div className="obs-card-header">
            <div className="obs-tag tag-cyan">
              <span className="tag-dot" />
              <span>PRE OBSERVATION (T₁)</span>
            </div>
            {imagePreview ? (
              <div className="obs-header-actions">
                <span className="obs-meta-pill" title={imageName}>{imageName} ({imageSize})</span>
                <button
                  type="button"
                  className="obs-btn-remove"
                  onClick={() => {
                    setImageB64(undefined); setImageName(''); setImageSize(''); setImagePreview(undefined); setPolygon1([]);
                  }}
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="obs-btn-demo"
                onClick={() => loadSingleSample('/SATQUERY-SEQUENCE/sat_015.webp', 'Sentinel2_Baseline_T1.webp', false)}
                title="Load sample baseline satellite image"
              >
                + Load Sample T₁
              </button>
            )}
          </div>

          <div className="obs-card-body">
            {imagePreview ? (
              <div className="obs-preview-frame">
                <PolygonAnnotator
                  imageSrc={imagePreview}
                  polygon={polygon1}
                  onPolygonChange={handlePolygon1Change}
                  sceneLabel="T₁ Baseline Scene"
                  isDrawing={drawing1}
                  onToggleDrawing={() => setDrawing1(!drawing1)}
                  accentColor="#38bdf8"
                />
              </div>
            ) : (
              <div className="obs-upload-cta" onClick={() => fileRef1.current?.click()}>
                <div className="obs-upload-icon-wrap">
                  <span className="obs-icon">{drag1 ? '📂' : '🛰'}</span>
                </div>
                <h3>Upload Pre-Event Imagery</h3>
                <p>Drag and drop raster or browse local disk</p>
                <span className="obs-file-types">PNG · JPG · TIFF · GeoTIFF</span>
                <div className="flex items-center gap-2 mt-3">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={e => { e.stopPropagation(); fileRef1.current?.click(); }}>
                    Browse File
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    style={{ background: 'rgba(6, 182, 212, 0.2)', borderColor: '#06b6d4', color: '#67e8f9' }}
                    onClick={e => {
                      e.stopPropagation();
                      loadSingleSample('/SATQUERY-SEQUENCE/sat_015.webp', 'Sentinel2_Baseline_T1.webp', false);
                    }}
                  >
                    Load Demo Scene
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* POST OBSERVATION CARD */}
        <div
          className={`obs-card obs-post ${drag2 ? 'drag-over' : ''} ${image2Preview ? 'has-content' : ''}`}
          onDragOver={e => { e.preventDefault(); setDrag2(true); }}
          onDragLeave={() => setDrag2(false)}
          onDrop={e => handleDrop(e, setImage2B64, setImage2Name, setImage2Size, setImage2Preview, setDrag2)}
        >
          <input
            ref={fileRef2}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={e => handleImageUpload(e, setImage2B64, setImage2Name, setImage2Size, setImage2Preview)}
          />
          <div className="obs-card-header">
            <div className="obs-tag tag-purple">
              <span className="tag-dot" />
              <span>POST OBSERVATION (T₂)</span>
            </div>
            {image2Preview ? (
              <div className="obs-header-actions">
                <span className="obs-meta-pill" title={image2Name}>{image2Name} ({image2Size})</span>
                <button
                  type="button"
                  className="obs-btn-remove"
                  onClick={() => {
                    setImage2B64(undefined); setImage2Name(''); setImage2Size(''); setImage2Preview(undefined); setPolygon2([]);
                  }}
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="obs-btn-demo"
                onClick={() => loadSingleSample('/SATQUERY-SEQUENCE/sat_180.webp', 'Sentinel2_Target_T2.webp', true)}
                title="Load sample target satellite image"
              >
                + Load Sample T₂
              </button>
            )}
          </div>

          <div className="obs-card-body">
            {image2Preview ? (
              <div className="obs-preview-frame">
                <PolygonAnnotator
                  imageSrc={image2Preview}
                  polygon={polygon2}
                  onPolygonChange={handlePolygon2Change}
                  sceneLabel="T₂ Target Scene"
                  isDrawing={drawing2}
                  onToggleDrawing={() => setDrawing2(!drawing2)}
                  accentColor="#c084fc"
                />
              </div>
            ) : (
              <div className="obs-upload-cta" onClick={() => fileRef2.current?.click()}>
                <div className="obs-upload-icon-wrap">
                  <span className="obs-icon">{drag2 ? '📂' : '🌍'}</span>
                </div>
                <h3>Upload Post-Event Imagery</h3>
                <p>Drag and drop raster or browse local disk</p>
                <span className="obs-file-types">PNG · JPG · TIFF · GeoTIFF</span>
                <div className="flex items-center gap-2 mt-3">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={e => { e.stopPropagation(); fileRef2.current?.click(); }}>
                    Browse File
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    style={{ background: 'rgba(168, 85, 247, 0.2)', borderColor: '#a855f7', color: '#d8b4fe' }}
                    onClick={e => {
                      e.stopPropagation();
                      loadSingleSample('/SATQUERY-SEQUENCE/sat_180.webp', 'Sentinel2_Target_T2.webp', true);
                    }}
                  >
                    Load Demo Scene
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Active Polygon ROI / Precision Bar ── */}
      {(hasActivePolygon || (imagePreview && image2Preview)) && (
        <div className="roi-telemetry-bar">
          <div className="roi-telemetry-left">
            <span className="roi-badge-icon">📐</span>
            <div>
              <span className="roi-status-text">
                {hasActivePolygon ? `Polygon ROI Active (${activePolygon.length} vertices)` : 'Bi-Temporal Baseline Loaded'}
              </span>
              <p className="roi-hint-text">
                {hasActivePolygon ? 'Analysis will be spatially constrained to this marked region.' : 'Ready for temporal change, spectral, and spatial analysis.'}
              </p>
            </div>
          </div>
          <div className="roi-telemetry-actions">
            {hasActivePolygon && (
              <button
                type="button"
                className={`roi-sync-btn ${syncPolygons ? 'synced' : ''}`}
                onClick={() => setSyncPolygons(!syncPolygons)}
              >
                {syncPolygons ? '🔗 Linked T₁ ↔ T₂' : '🔓 Independent'}
              </button>
            )}
            <button
              type="button"
              className="roi-expand-btn"
              onClick={() => setShowVisualizer(true)}
            >
              🔍 Precision ROI Studio
            </button>
          </div>
        </div>
      )}

      {/* ── Natural Language Query Composer ── */}
      <div className="mission-query-card card">
        <div className="query-card-header">
          <div className="flex items-center gap-2">
            <span className="query-header-icon">❓</span>
            <div>
              <h2 className="query-header-title">WHAT DO YOU WANT TO KNOW?</h2>
              <p className="query-header-sub">Ask any question in natural language (English, Hindi, Hinglish)</p>
            </div>
          </div>
          <div className={`lang-pill ${detected.isHinglish ? 'lang-hinglish' : ''}`}>
            <span className="lang-indicator" />
            <span>{detected.code !== 'auto' ? detected.label : 'Auto Detection'}</span>
          </div>
        </div>

        <div className="query-input-wrapper">
          <textarea
            id="query-input"
            className="mission-textarea"
            placeholder="e.g., Identify all destroyed or damaged structures between these two dates and estimate flooded area..."
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
          />
          {voiceSupported && (
            <button
              id="mic-button"
              type="button"
              className={`mission-mic-btn ${listening ? 'listening' : ''}`}
              onClick={listening ? stopVoice : startVoice}
              title={listening ? 'Stop recording voice' : 'Speak query in English / Hindi'}
              disabled={loading}
            >
              {listening ? '🔴' : '🎤'}
            </button>
          )}
        </div>

        {voiceToast && (
          <div className="voice-transcription-toast fade-in">
            <span>🎙</span>
            <span>{voiceToast}</span>
          </div>
        )}

        {/* Preset Mission Templates with instant dataset auto-load */}
        <div className="preset-missions-section">
          <span className="preset-label">QUICK MISSION PRESETS (CLICK TO AUTO-LOAD QUERY & SATELLITE SCENES):</span>
          <div className="preset-chips-grid">
            {SAMPLE_MISSIONS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                className="preset-chip"
                onClick={() => {
                  setQuestion(sample.query);
                  loadSampleDataset(sample.preSample, sample.postSample, sample.preName, sample.postName);
                }}
              >
                <span>{sample.icon}</span>
                <span className="preset-chip-title">{sample.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Action Footer ── */}
        <div className="mission-action-footer">
          <div className="mission-meta-cues">
            <span>⌨ <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to dispatch</span>
            <span>·</span>
            <span>ISRO SIH26167 Engine Active</span>
          </div>

          <button
            id="analyze-mission-btn"
            className="btn btn-primary mission-analyze-btn"
            onClick={handleSubmit}
            disabled={!question.trim() || loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                <span>INITIALIZING SATELLITE COPILOT…</span>
              </>
            ) : (
              <>
                <span>ANALYZE MISSION</span>
                <span className="btn-arrow">→</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Visualizer Modal ── */}
      {showVisualizer && (
        <div className="visualizer-modal-backdrop fade-in" onClick={() => setShowVisualizer(false)}>
          <div className="visualizer-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="visualizer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.4rem' }}>🛰</span>
                <div>
                  <h3 className="visualizer-title">Precision ROI Studio</h3>
                  <p className="visualizer-subtitle">Large viewport inspection and freehand / polygon ROI drawing</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  type="button"
                  className={`roi-sync-toggle ${syncPolygons ? 'synced' : ''}`}
                  onClick={() => setSyncPolygons(!syncPolygons)}
                >
                  {syncPolygons ? '🔗 Linked T₁ ↔ T₂' : '🔓 Independent'}
                </button>
                <button
                  type="button"
                  className="visualizer-close-btn"
                  onClick={() => setShowVisualizer(false)}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="visualizer-stage-grid">
              <div className="visualizer-stage-panel panel-before">
                <div className="stage-panel-header">
                  <span className="stage-panel-tag tag-before">T₁ · Before</span>
                  {imageName && <span className="stage-file-name">📄 {imageName}</span>}
                </div>
                <div className="stage-annotator-container">
                  {imagePreview ? (
                    <PolygonAnnotator
                      imageSrc={imagePreview}
                      polygon={polygon1}
                      onPolygonChange={handlePolygon1Change}
                      sceneLabel="Scene 1 (Before)"
                      isDrawing={drawing1}
                      onToggleDrawing={() => setDrawing1(!drawing1)}
                      accentColor="#38bdf8"
                    />
                  ) : (
                    <div className="stage-empty-placeholder" onClick={() => fileRef1.current?.click()}>
                      <span>📡</span>
                      <p>Upload Pre-Observation Image</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="visualizer-stage-panel panel-after">
                <div className="stage-panel-header">
                  <span className="stage-panel-tag tag-after">T₂ · After</span>
                  {image2Name && <span className="stage-file-name">📄 {image2Name}</span>}
                </div>
                <div className="stage-annotator-container">
                  {image2Preview ? (
                    <PolygonAnnotator
                      imageSrc={image2Preview}
                      polygon={polygon2}
                      onPolygonChange={handlePolygon2Change}
                      sceneLabel="Scene 2 (After)"
                      isDrawing={drawing2}
                      onToggleDrawing={() => setDrawing2(!drawing2)}
                      accentColor="#c084fc"
                    />
                  ) : (
                    <div className="stage-empty-placeholder" onClick={() => fileRef2.current?.click()}>
                      <span>🌍</span>
                      <p>Upload Post-Observation Image</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="visualizer-footer">
              <div className="visualizer-footer-left">
                <input
                  type="text"
                  className="visualizer-prompt-input"
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  placeholder="Define mission query for this marked ROI..."
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="visualizer-footer-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowVisualizer(false)}
                >
                  Done Editing
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setShowVisualizer(false);
                    handleSubmit();
                  }}
                  disabled={!question.trim() || loading}
                >
                  Analyze Mission →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .mission-setup-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 2rem 1.5rem 5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .mission-setup-hero {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .mission-phase-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 4px 16px;
          border-radius: 999px;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.3);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          color: #38bdf8;
          font-weight: 700;
          margin-bottom: 0.85rem;
        }
        .pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 10px #38bdf8;
          animation: pulse 2s infinite;
        }
        .mission-title {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          color: #ffffff;
        }
        .mission-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
          max-width: 680px;
          line-height: 1.55;
        }
        .observation-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.75rem;
        }
        .obs-card {
          background: rgba(15, 23, 42, 0.7);
          border: 1.5px dashed rgba(56, 189, 248, 0.25);
          border-radius: 16px;
          min-height: 420px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all 0.25s ease;
          box-shadow: 0 16px 35px -10px rgba(0,0,0,0.6);
        }
        .obs-card:hover {
          border-color: rgba(56, 189, 248, 0.5);
          box-shadow: 0 20px 45px -10px rgba(56, 189, 248, 0.15);
        }
        .obs-card.has-content {
          border-style: solid;
          background: rgba(11, 19, 41, 0.85);
          min-height: 460px;
        }
        .obs-card.drag-over {
          border-color: #38bdf8;
          background: rgba(56, 189, 248, 0.08);
          transform: scale(1.01);
        }
        .obs-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.25rem;
          background: rgba(0, 0, 0, 0.45);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .obs-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 3px 12px;
          border-radius: 999px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
        }
        .tag-cyan { background: rgba(6, 182, 212, 0.15); color: #67e8f9; border: 1px solid rgba(6, 182, 212, 0.4); }
        .tag-purple { background: rgba(168, 85, 247, 0.15); color: #d8b4fe; border: 1px solid rgba(168, 85, 247, 0.4); }
        .tag-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
        .obs-header-actions { display: flex; align-items: center; gap: 0.5rem; }
        .obs-meta-pill {
          font-size: 0.72rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.06);
          padding: 2px 8px;
          border-radius: 4px;
          max-width: 180px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .obs-btn-remove {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }
        .obs-btn-remove:hover { background: rgba(239, 68, 68, 0.35); color: #fff; }
        .obs-btn-demo {
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #7dd3fc;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .obs-btn-demo:hover {
          background: rgba(56, 189, 248, 0.25);
          color: #fff;
        }
        .obs-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .obs-preview-frame {
          flex: 1;
          display: flex;
          min-height: 400px;
          position: relative;
        }
        .obs-upload-cta {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1.5rem;
          text-align: center;
          cursor: pointer;
        }
        .obs-upload-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(56, 189, 248, 0.08);
          border: 1px solid rgba(56, 189, 248, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .obs-icon { font-size: 1.8rem; }
        .obs-upload-cta h3 { font-size: 1.05rem; font-weight: 700; color: #f8fafc; margin-bottom: 0.3rem; }
        .obs-upload-cta p { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.4rem; }
        .obs-file-types { font-family: var(--font-mono); font-size: 0.7rem; color: #64748b; letter-spacing: 0.05em; }
        
        .roi-telemetry-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 1.4rem;
          background: rgba(14, 165, 233, 0.08);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 12px;
          backdrop-filter: blur(12px);
        }
        .roi-telemetry-left { display: flex; align-items: center; gap: 0.85rem; }
        .roi-badge-icon { font-size: 1.4rem; }
        .roi-status-text { font-size: 0.86rem; font-weight: 700; color: #7dd3fc; }
        .roi-hint-text { font-size: 0.74rem; color: var(--text-secondary); margin: 0; }
        .roi-telemetry-actions { display: flex; align-items: center; gap: 0.75rem; }
        .roi-sync-btn, .roi-expand-btn {
          font-size: 0.76rem;
          font-weight: 600;
          padding: 5px 14px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .roi-sync-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: var(--text-secondary);
        }
        .roi-sync-btn.synced {
          background: rgba(56, 189, 248, 0.2);
          border-color: rgba(56, 189, 248, 0.5);
          color: #bae6fd;
        }
        .roi-expand-btn {
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.25), rgba(99, 102, 241, 0.3));
          border: 1px solid rgba(56, 189, 248, 0.5);
          color: #e0f2fe;
        }
        .roi-expand-btn:hover { background: rgba(14, 165, 233, 0.4); }

        .mission-query-card {
          padding: 1.75rem 2rem;
          background: linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(8, 14, 28, 0.95));
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 18px;
          box-shadow: 0 25px 60px -15px rgba(0,0,0,0.85), 0 0 35px rgba(56, 189, 248, 0.12);
        }
        .query-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .query-header-icon { font-size: 1.4rem; }
        .query-header-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          color: #ffffff;
          margin: 0;
        }
        .query-header-sub { font-size: 0.78rem; color: var(--text-muted); margin: 0; }
        .lang-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 4px 14px;
          border-radius: 999px;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8;
          font-size: 0.76rem;
          font-weight: 600;
        }
        .lang-pill.lang-hinglish {
          background: rgba(245, 158, 11, 0.12);
          border-color: rgba(245, 158, 11, 0.4);
          color: #f59e0b;
        }
        .lang-indicator { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

        .query-input-wrapper { position: relative; margin-bottom: 1rem; }
        .mission-textarea {
          width: 100%;
          min-height: 100px;
          background: rgba(3, 7, 18, 0.75);
          border: 1.5px solid rgba(56, 189, 248, 0.25);
          border-radius: 12px;
          padding: 1rem 3.5rem 1rem 1.2rem;
          color: #f8fafc;
          font-family: var(--font-sans);
          font-size: 1rem;
          line-height: 1.6;
          resize: vertical;
          outline: none;
          transition: all 0.2s ease;
        }
        .mission-textarea:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2), 0 0 25px rgba(56, 189, 248, 0.25);
        }
        .mission-mic-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #e2e8f0;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .mission-mic-btn:hover { background: rgba(56, 189, 248, 0.2); border-color: #38bdf8; }
        .mission-mic-btn.listening {
          background: rgba(239, 68, 68, 0.25);
          border-color: #ef4444;
          animation: pulse 1.5s infinite;
        }
        .voice-transcription-toast {
          padding: 0.6rem 1rem;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.35);
          border-radius: 8px;
          color: #6ee7b7;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .preset-missions-section {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .preset-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.12em;
          font-weight: 700;
        }
        .preset-chips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 0.6rem;
        }
        .preset-chip {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 8px 14px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          font-size: 0.78rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .preset-chip:hover {
          background: rgba(56, 189, 248, 0.12);
          border-color: rgba(56, 189, 248, 0.4);
          color: #f1f5f9;
          transform: translateY(-1px);
        }
        .mission-action-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
          gap: 1rem;
        }
        .mission-meta-cues {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .mission-meta-cues kbd {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 4px;
          padding: 1px 5px;
          font-size: 0.68rem;
          color: #cbd5e1;
        }
        .mission-analyze-btn {
          padding: 0.9rem 2.4rem;
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          border-radius: 12px;
          background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
          box-shadow: 0 0 30px rgba(37, 99, 235, 0.4);
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
        }
        .mission-analyze-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 0 45px rgba(56, 189, 248, 0.6);
        }
        .btn-arrow { font-size: 1.15rem; }

        @media (max-width: 900px) {
          .observation-grid { grid-template-columns: 1fr; }
          .obs-card { min-height: 340px; }
          .mission-setup-container { padding: 1rem 1rem 3rem; }
          .mission-action-footer { flex-direction: column; align-items: stretch; }
          .mission-analyze-btn { justify-content: center; }
        }
      `}</style>
    </div>
  );
}
