import React, { useState, useRef } from 'react';
import { ToolShell, CopyButton } from '../ToolShell';
import {
  convertSrtToVtt,
  convertVttToSrt,
  generateFfmpegCommand,
  calculateTimecodeDrift,
  calculateSensorCrop,
  calculateAnamorphicDeSqueeze,
  calculateChromaSubsampling,
  getDtmfFrequencies,
  getScaleNotes,
  calculateBinauralFrequencies,
  generateNoiseSamples,
  SensorFormat,
  BrainwaveBand,
  NOTE_NAMES,
  SCALE_INTERVALS,
  BRAINWAVE_BANDS,
  SENSOR_CROP_FACTORS
} from '../../engines/batch13Engines';

/**
 * 1. Subtitle SRT ⇄ WebVTT Converter
 */
export const SrtVttTool: React.FC = () => {
  const [srt, setSrt] = useState(
    '1\n00:00:01,000 --> 00:00:04,250\nWelcome to Omnikit Video Workbench.\n\n2\n00:00:04,500 --> 00:00:07,000\nSubtitles sync with frame precision.'
  );
  const [vtt, setVtt] = useState(() => convertSrtToVtt(srt));

  const handleToVtt = () => setVtt(convertSrtToVtt(srt));
  const handleToSrt = () => setSrt(convertVttToSrt(vtt));

  return (
    <ToolShell
      title="Subtitle SRT ⇄ WebVTT Converter"
      category="video"
      description="Convert subtitle files between SubRip (.srt) and HTML5 WebVTT (.vtt) with accurate timecode delimiters."
      toolId="srt-vtt"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">SubRip (.srt):</span>
            <button
              onClick={handleToVtt}
              className="px-2 py-1 rounded bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300"
            >
              Convert to WebVTT →
            </button>
          </div>
          <textarea
            value={srt}
            onChange={(e) => setSrt(e.target.value)}
            rows={10}
            className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">HTML5 WebVTT (.vtt):</span>
            <button
              onClick={handleToSrt}
              className="px-2 py-1 rounded bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300"
            >
              ← Convert to SRT
            </button>
          </div>
          <textarea
            value={vtt}
            onChange={(e) => setVtt(e.target.value)}
            rows={10}
            className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none"
          />
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 2. FFmpeg CLI Command Studio Generator
 */
export const FfmpegGenTool: React.FC = () => {
  const [input, setInput] = useState('raw_footage.mov');
  const [output, setOutput] = useState('web_video.mp4');
  const [task, setTask] = useState<
    'compress' | 'convert-mp4' | 'extract-audio' | 'trim' | 'scale-1080p' | 'create-gif'
  >('compress');
  const [crf, setCrf] = useState(22);
  const [startTime, setStartTime] = useState('00:00:10');
  const [duration, setDuration] = useState('00:00:30');

  const cmd = generateFfmpegCommand({ input, output, task, crf, startTime, duration });

  return (
    <ToolShell
      title="FFmpeg Command Studio Generator"
      category="video"
      description="Quickly construct battle-tested FFmpeg commands for transcoding, compression, audio extraction, and trimming."
      toolId="ffmpeg-gen"
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-neutral-400 block mb-1">Preset Action:</label>
            <select
              value={task}
              onChange={(e) => setTask(e.target.value as typeof task)}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-rose-400 font-bold"
            >
              <option value="compress">Compress / Web Optimize</option>
              <option value="convert-mp4">Transcode to H.264 MP4</option>
              <option value="extract-audio">Extract Audio to MP3</option>
              <option value="trim">Lossless Fast Trim (-ss / -t)</option>
              <option value="scale-1080p">Scale with Letterbox Padding</option>
              <option value="create-gif">High-Quality Palette GIF</option>
            </select>
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Input Filename:</label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100"
            />
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Output Filename:</label>
            <input
              type="text"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100"
            />
          </div>
        </div>

        {task === 'compress' && (
          <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg flex items-center justify-between gap-4">
            <span className="text-neutral-400">CRF Quality (18 = lossless visually, 28 = small file):</span>
            <span className="text-rose-400 font-bold">{crf}</span>
            <input
              type="range"
              min="16"
              max="32"
              value={crf}
              onChange={(e) => setCrf(Number(e.target.value))}
              className="accent-rose-500 w-48"
            />
          </div>
        )}

        {task === 'trim' && (
          <div className="grid grid-cols-2 gap-3 p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
            <div>
              <label className="text-neutral-400 block mb-1">Start Timecode (-ss):</label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-1.5 bg-neutral-900 border border-neutral-800 rounded text-neutral-100"
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Duration (-t):</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-1.5 bg-neutral-900 border border-neutral-800 rounded text-neutral-100"
              />
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-neutral-400 font-bold">Terminal Command:</span>
            <CopyButton text={cmd} />
          </div>
          <pre className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-rose-300 overflow-x-auto whitespace-pre-wrap select-all">
            {cmd}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 3. Timecode Drop-Frame & Sync Drift Calculator
 */
export const TimecodeDriftTool: React.FC = () => {
  const [minutes, setMinutes] = useState(60);
  const drift = calculateTimecodeDrift(minutes);

  return (
    <ToolShell
      title="Timecode Drop-Frame Sync Drift Calculator"
      category="video"
      description="Diagnose audio/video sync drift over time caused by 29.97 NDF vs real wall-clock timing."
      toolId="timecode-drift"
    >
      <div className="space-y-4 font-mono text-xs">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-neutral-400">Timeline Duration (Minutes):</label>
            <span className="text-rose-400 font-bold">{minutes} min ({minutes / 60} hrs)</span>
          </div>
          <input
            type="range"
            min="1"
            max="240"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] uppercase block">Frame Discrepancy</span>
            <span className="text-rose-400 font-bold text-sm">{drift.frameDifference} frames</span>
            <span className="text-neutral-500 text-[10px] block">NDF vs Drop-Frame</span>
          </div>
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] uppercase block">Time Sync Drift</span>
            <span className="text-neutral-200 font-bold text-sm">{(drift.timeDiscrepancyMs / 1000).toFixed(2)} seconds</span>
            <span className="text-neutral-500 text-[10px] block">{drift.timeDiscrepancyMs} ms delay</span>
          </div>
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] uppercase block">Total Elapsed Frames</span>
            <span className="text-neutral-200 text-sm font-bold">{drift.ndfFrames.toLocaleString()}</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 leading-relaxed">
          {drift.explanation}
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 4. Camera Sensor Crop Factor & 35mm Equiv
 */
export const SensorCropTool: React.FC = () => {
  const [focalLength, setFocalLength] = useState(50);
  const [aperture, setAperture] = useState(1.8);
  const [sensor, setSensor] = useState<SensorFormat>('aps-c');

  const res = calculateSensorCrop(focalLength, aperture, sensor);

  return (
    <ToolShell
      title="Camera Sensor Crop Factor & 35mm Equiv"
      category="video"
      description="Calculate effective 35mm full-frame focal lengths and depth-of-field across cinema and camera sensors."
      toolId="sensor-crop"
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-neutral-400 block mb-1">Sensor Format:</label>
            <select
              value={sensor}
              onChange={(e) => setSensor(e.target.value as SensorFormat)}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-rose-400 font-bold"
            >
              {Object.entries(SENSOR_CROP_FACTORS).map(([key, info]) => (
                <option key={key} value={key}>{info.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Physical Lens Focal Length (mm):</label>
            <input
              type="number"
              value={focalLength}
              onChange={(e) => setFocalLength(Number(e.target.value))}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100"
            />
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Physical Lens Aperture (f-stop):</label>
            <input
              type="number"
              step="0.1"
              value={aperture}
              onChange={(e) => setAperture(Number(e.target.value))}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] uppercase block">Equivalent Field of View (35mm)</span>
            <span className="text-rose-400 font-bold text-lg">{res.equivFocalLength}mm</span>
            <span className="text-neutral-500 text-[11px] block">Looks like a {res.equivFocalLength}mm lens on a Full Frame camera</span>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] uppercase block">Equivalent Depth of Field (DoF Blur)</span>
            <span className="text-neutral-200 font-bold text-lg">f/{res.equivAperture}</span>
            <span className="text-neutral-500 text-[11px] block">Yields equivalent background blur of f/{res.equivAperture} on Full Frame</span>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 5. Anamorphic De-Squeeze & Aspect Scaler
 */
export const AnamorphicDeSqueezeTool: React.FC = () => {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [squeeze, setSqueeze] = useState(1.33);

  const res = calculateAnamorphicDeSqueeze(width, height, squeeze);

  return (
    <ToolShell
      title="Anamorphic De-Squeeze & Aspect Scaler"
      category="video"
      description="Calculate post-production de-squeeze pixel dimensions and aspect ratios for anamorphic lenses."
      toolId="anamorphic-desqueeze"
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-neutral-400 block mb-1">Recorded Sensor Width (px):</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100"
            />
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Recorded Sensor Height (px):</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100"
            />
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Anamorphic Squeeze Factor:</label>
            <select
              value={squeeze}
              onChange={(e) => setSqueeze(Number(e.target.value))}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-rose-400 font-bold"
            >
              <option value="1.33">1.33x (16:9 Sensor to 2.39:1)</option>
              <option value="1.5">1.5x (Modern Compact Anamorphic)</option>
              <option value="1.8">1.8x (Super 35 Scope)</option>
              <option value="2.0">2.0x (Classic 4:3 Anamorphic Scope)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] uppercase block">Unstretched De-Squeezed Resolution</span>
            <span className="text-rose-400 font-bold text-lg">{res.deSqueezedWidth} × {res.deSqueezedHeight} px</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] uppercase block">Final Aspect Ratio</span>
            <span className="text-neutral-100 font-bold text-lg">{res.aspectRatioDecimal}:1 ({res.nearestCommonAspect})</span>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 6. Video Chroma Subsampling Analyzer
 */
export const ChromaSubsamplingTool: React.FC = () => {
  const [fmt, setFmt] = useState<'4:4:4' | '4:2:2' | '4:2:0'>('4:2:0');
  const res = calculateChromaSubsampling(fmt);

  return (
    <ToolShell
      title="Video Chroma Subsampling Analyzer"
      category="video"
      description="Compare color resolution, pixel grids, and data savings across 4:4:4, 4:2:2, and 4:2:0 formats."
      toolId="chroma-subsampling"
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          {(['4:4:4', '4:2:2', '4:2:0'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFmt(mode)}
              className={`px-4 py-2 rounded-lg border font-bold transition-all ${
                fmt === mode
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] uppercase block">Luma (Y) Resolution</span>
            <span className="text-emerald-400 font-bold text-base">{res.lumaPercentage}% (Full Detail)</span>
          </div>
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] uppercase block">Chroma (Cb/Cr) Samples</span>
            <span className="text-rose-400 font-bold text-base">{res.chromaPercentage}% Sample Density</span>
          </div>
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] uppercase block">Bandwidth Savings</span>
            <span className="text-neutral-200 font-bold text-base">{res.dataRateSavingsPercent}% Less Data</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
          <span className="text-neutral-500 text-[10px] uppercase block">Recommended Workflows</span>
          <span className="text-neutral-300 leading-relaxed block">{res.recommendedFor}</span>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 7. White, Pink & Brown Noise Synthesizer
 */
export const WhiteNoiseGenTool: React.FC = () => {
  const [noiseType, setNoiseType] = useState<'white' | 'pink' | 'brown'>('pink');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodeRef = useRef<AudioBufferSourceNode | null>(null);

  const togglePlayback = () => {
    if (isPlaying) {
      nodeRef.current?.stop();
      setIsPlaying(false);
      return;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      const samples = generateNoiseSamples(noiseType, ctx.sampleRate * 2);
      data.set(samples);

      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;

      const gain = ctx.createGain();
      gain.gain.value = 0.08; // comfortable low volume

      src.connect(gain);
      gain.connect(ctx.destination);
      src.start();

      nodeRef.current = src;
      setIsPlaying(true);
    } catch {
      // ignore
    }
  };

  return (
    <ToolShell
      title="Acoustic Noise Synthesizer (White, Pink, Brown)"
      category="audio"
      description="Synthesize calibrated acoustic noise signals in-browser for sound masking and acoustic evaluation."
      toolId="white-noise-gen"
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          {(['white', 'pink', 'brown'] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                if (isPlaying) togglePlayback();
                setNoiseType(t);
              }}
              className={`px-4 py-2 rounded-lg border font-bold capitalize transition-all ${
                noiseType === t
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800'
              }`}
            >
              {t} Noise
            </button>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-4">
          <button
            onClick={togglePlayback}
            className={`px-8 py-3 rounded-xl font-bold font-mono text-sm transition-all shadow-lg active:scale-95 ${
              isPlaying
                ? 'bg-rose-500 text-neutral-950 shadow-[0_0_20px_-3px_rgba(244,63,94,0.4)]'
                : 'bg-cyan-500 text-neutral-950 shadow-[0_0_20px_-3px_rgba(6,182,212,0.4)]'
            }`}
          >
            {isPlaying ? '■ STOP NOISE' : '▶ PLAY SYNTHESIZED NOISE'}
          </button>
          <p className="text-neutral-500 text-[11px]">
            {noiseType === 'pink'
              ? 'Pink noise (-3 dB/octave): Equal energy per octave, ideal for audio room calibration and sleep.'
              : noiseType === 'brown'
              ? 'Brown noise (-6 dB/octave): Deep, warm low-frequency rumble resembling ocean surf or heavy rain.'
              : 'White noise (flat spectrum): Equal energy across all frequencies, effective for speech privacy.'}
          </p>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 8. DTMF Telephone Keypad Dual-Tone Synthesizer
 */
export const DtmfDialerTool: React.FC = () => {
  const [log, setLog] = useState<string>('');

  const playTone = (key: string) => {
    setLog((prev) => prev + key);
    const freqs = getDtmfFrequencies(key);
    if (!freqs) return;

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.value = freqs[0];
      osc2.frequency.value = freqs[1];

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.16);
      osc2.stop(ctx.currentTime + 0.16);
    } catch {
      // ignore
    }
  };

  const keys = [
    ['1', '2', '3', 'A'],
    ['4', '5', '6', 'B'],
    ['7', '8', '9', 'C'],
    ['*', '0', '#', 'D'],
  ];

  return (
    <ToolShell
      title="DTMF Dual-Tone Telephone Dialer"
      category="audio"
      description="Synthesize standard Dual-Tone Multi-Frequency telecom frequencies for touch-tone telephone keypads."
      toolId="dtmf-dialer"
    >
      <div className="space-y-4 font-mono text-xs max-w-sm mx-auto">
        <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
          <span className="text-neutral-500 text-xs">DIALED:</span>
          <span className="text-cyan-400 font-bold text-base tracking-widest">{log || '—'}</span>
          {log && (
            <button onClick={() => setLog('')} className="text-neutral-500 hover:text-neutral-300 text-[10px]">
              Clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {keys.flat().map((k) => (
            <button
              key={k}
              onClick={() => playTone(k)}
              className="py-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 hover:bg-neutral-850 active:scale-95 transition-all text-neutral-100 font-bold text-base shadow-sm"
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 9. Musical Scales & Chords Explorer
 */
export const MusicScalesTool: React.FC = () => {
  const [root, setRoot] = useState('C');
  const [scale, setScale] = useState('Major (Ionian)');
  const notes = getScaleNotes(root, scale);

  return (
    <ToolShell
      title="Musical Scale & Chord Interval Explorer"
      category="audio"
      description="Inspect notes, intervals, and modal degrees across standard major, minor, and exotic musical scales."
      toolId="music-scales"
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-neutral-400 block mb-1">Root Tonic Note:</label>
            <select
              value={root}
              onChange={(e) => setRoot(e.target.value)}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-cyan-400 font-bold"
            >
              {NOTE_NAMES.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Scale / Mode:</label>
            <select
              value={scale}
              onChange={(e) => setScale(e.target.value)}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-cyan-400 font-bold"
            >
              {Object.keys(SCALE_INTERVALS).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
          <span className="text-neutral-500 text-[10px] uppercase block">Scale Notes ({notes.length} degrees):</span>
          <div className="flex flex-wrap gap-2">
            {notes.map((note, idx) => (
              <div
                key={idx}
                className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex flex-col items-center justify-center font-bold text-cyan-300"
              >
                <span>{note}</span>
                <span className="text-[8px] text-cyan-500 font-normal">#{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 10. Binaural Beat & Brainwave Frequency Synthesizer
 */
export const BinauralBeatsTool: React.FC = () => {
  const [baseHz, setBaseHz] = useState(200);
  const [band, setBand] = useState<BrainwaveBand>('alpha');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const res = calculateBinauralFrequencies(baseHz, band);

  const togglePlay = () => {
    if (isPlaying) {
      audioCtxRef.current?.close();
      setIsPlaying(false);
      return;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      const oscLeft = ctx.createOscillator();
      const oscRight = ctx.createOscillator();
      const panLeft = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      const panRight = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      const gain = ctx.createGain();

      oscLeft.frequency.value = res.leftHz;
      oscRight.frequency.value = res.rightHz;
      gain.gain.value = 0.06;

      if (panLeft && panRight) {
        panLeft.pan.value = -1;
        panRight.pan.value = 1;
        oscLeft.connect(panLeft).connect(gain);
        oscRight.connect(panRight).connect(gain);
      } else {
        oscLeft.connect(gain);
        oscRight.connect(gain);
      }

      gain.connect(ctx.destination);
      oscLeft.start();
      oscRight.start();
      setIsPlaying(true);
    } catch {
      // ignore
    }
  };

  return (
    <ToolShell
      title="Binaural Beat Brainwave Synthesizer"
      category="audio"
      description="Generate stereo frequency offsets to stimulate Delta, Theta, Alpha, Beta, and Gamma brainwave states."
      toolId="binaural-beats"
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-neutral-400 block mb-1">Target Brainwave Band:</label>
            <select
              value={band}
              onChange={(e) => {
                if (isPlaying) togglePlay();
                setBand(e.target.value as BrainwaveBand);
              }}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-cyan-400 font-bold"
            >
              {Object.entries(BRAINWAVE_BANDS).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Carrier Base Frequency (Hz):</label>
            <input
              type="number"
              value={baseHz}
              onChange={(e) => setBaseHz(Number(e.target.value))}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] uppercase block">Left Ear Frequency</span>
            <span className="text-cyan-400 font-bold text-sm">{res.leftHz} Hz</span>
          </div>
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] uppercase block">Right Ear Frequency</span>
            <span className="text-cyan-400 font-bold text-sm">{res.rightHz} Hz (+{res.diffHz} Hz offset)</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 text-center">
          <p className="text-neutral-400 text-[11px]">{res.effect}</p>
          <button
            onClick={togglePlay}
            className={`px-8 py-3 rounded-xl font-bold font-mono text-sm transition-all shadow-lg active:scale-95 ${
              isPlaying
                ? 'bg-rose-500 text-neutral-950 shadow-[0_0_20px_-3px_rgba(244,63,94,0.4)]'
                : 'bg-cyan-500 text-neutral-950 shadow-[0_0_20px_-3px_rgba(6,182,212,0.4)]'
            }`}
          >
            {isPlaying ? '■ STOP TONES' : '▶ PLAY STEREO BINAURAL TONES (USE HEADPHONES)'}
          </button>
        </div>
      </div>
    </ToolShell>
  );
};
