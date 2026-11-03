// Pure logic engines for Batch 13 (Media, Video & Audio Workstation)

/**
 * 1. Subtitle SRT ⇄ WebVTT Converter
 */
export function convertSrtToVtt(srt: string): string {
  const clean = srt.trim().replace(/\r\n/g, '\n');
  const vttLines = ['WEBVTT\n'];

  // Replace timecode comma with period: 00:01:23,456 -> 00:01:23.456
  const converted = clean.replace(
    /(\d{2}:\d{2}:\d{2}),(\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}),(\d{3})/g,
    '$1.$2 --> $3.$4'
  );

  vttLines.push(converted);
  return vttLines.join('\n');
}

export function convertVttToSrt(vtt: string): string {
  const clean = vtt.trim().replace(/\r\n/g, '\n');
  // Strip WEBVTT header and NOTE blocks
  const body = clean.replace(/^WEBVTT[^\n]*\n+/i, '').replace(/NOTE[^\n]*\n+/g, '');

  // Replace timecode period with comma: 00:01:23.456 -> 00:01:23,456
  return body.replace(
    /(\d{2}:\d{2}:\d{2})\.(\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2})\.(\d{3})/g,
    '$1,$2 --> $3,$4'
  );
}

/**
 * 2. FFmpeg CLI Command Studio Generator
 */
export interface FfmpegParams {
  input: string;
  output: string;
  task: 'compress' | 'convert-mp4' | 'extract-audio' | 'trim' | 'scale-1080p' | 'create-gif';
  startTime?: string;
  duration?: string;
  crf?: number;
}

export function generateFfmpegCommand(p: FfmpegParams): string {
  const inp = p.input.trim() || 'input.mov';
  const outp = p.output.trim() || 'output.mp4';

  switch (p.task) {
    case 'compress':
      return `ffmpeg -i "${inp}" -c:v libx264 -crf ${p.crf ?? 23} -preset medium -c:a aac -b:a 128k "${outp}"`;
    case 'convert-mp4':
      return `ffmpeg -i "${inp}" -c:v libx264 -pix_fmt yuv420p -c:a aac "${outp}"`;
    case 'extract-audio':
      return `ffmpeg -i "${inp}" -vn -c:a libmp3lame -q:a 2 "${outp.replace(/\.\w+$/, '.mp3')}"`;
    case 'trim':
      return `ffmpeg -ss ${p.startTime || '00:00:10'} -i "${inp}" -t ${p.duration || '00:00:30'} -c copy "${outp}"`;
    case 'scale-1080p':
      return `ffmpeg -i "${inp}" -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -crf 20 "${outp}"`;
    case 'create-gif':
      return `ffmpeg -i "${inp}" -vf "fps=15,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 "${outp.replace(/\.\w+$/, '.gif')}"`;
    default:
      return `ffmpeg -i "${inp}" "${outp}"`;
  }
}

/**
 * 3. Timecode Drop-Frame & Sync Drift Calculator
 */
export interface DriftResult {
  durationMinutes: number;
  ndfFrames: number;
  dfFrames: number;
  frameDifference: number;
  timeDiscrepancyMs: number;
  explanation: string;
}

export function calculateTimecodeDrift(durationMinutes: number): DriftResult {
  const minutes = Math.max(1, durationMinutes);
  // At 29.97 NDF, 30 frames are counted per second: 1800 frames per minute
  // Actual frames = 29.97 * 60 = 1798.2 frames per minute
  // At 29.97 DF, 2 frames are dropped every minute except 10th minute (drops 108 frames every hour, ~1.8 frames/min)
  const ndfFrames = Math.round(minutes * 60 * 30);
  const actualFrames = Math.round(minutes * 60 * 29.97);
  const frameDifference = ndfFrames - actualFrames;
  const timeDiscrepancyMs = Math.round((frameDifference / 29.97) * 1000);

  const dfFrames = actualFrames;

  return {
    durationMinutes: minutes,
    ndfFrames,
    dfFrames,
    frameDifference,
    timeDiscrepancyMs,
    explanation: `Over ${minutes} minutes of 29.97 NDF, non-drop timecode will display a ${frameDifference} frame (${(timeDiscrepancyMs / 1000).toFixed(2)}s) lead over real wall-clock time.`,
  };
}

/**
 * 4. Camera Sensor Crop Factor & 35mm Equiv
 */
export type SensorFormat = 'full-frame' | 'super35' | 'aps-c' | 'mft' | 'medium-format';

export const SENSOR_CROP_FACTORS: Record<SensorFormat, { label: string; crop: number }> = {
  'full-frame': { label: 'Full Frame (36x24mm)', crop: 1.0 },
  'super35': { label: 'Super 35 / Cinema APS-C', crop: 1.4 },
  'aps-c': { label: 'APS-C (Sony/Fuji 1.5x)', crop: 1.5 },
  'mft': { label: 'Micro Four Thirds (MFT 2.0x)', crop: 2.0 },
  'medium-format': { label: 'Medium Format (Fujifilm GFX 0.79x)', crop: 0.79 },
};

export interface CropResult {
  sensorFormat: SensorFormat;
  originalFocalLength: number;
  originalAperture: number;
  equivFocalLength: number;
  equivAperture: number;
  cropFactor: number;
}

export function calculateSensorCrop(
  focalLength: number,
  aperture: number,
  sensor: SensorFormat
): CropResult {
  const crop = SENSOR_CROP_FACTORS[sensor]?.crop ?? 1.0;
  const equivFocalLength = Math.round(focalLength * crop * 10) / 10;
  const equivAperture = Math.round(aperture * crop * 10) / 10;

  return {
    sensorFormat: sensor,
    originalFocalLength: focalLength,
    originalAperture: aperture,
    equivFocalLength,
    equivAperture,
    cropFactor: crop,
  };
}

/**
 * 5. Anamorphic De-Squeeze & Aspect Scaler
 */
export interface AnamorphicResult {
  captureWidth: number;
  captureHeight: number;
  squeeze: number;
  deSqueezedWidth: number;
  deSqueezedHeight: number;
  aspectRatioDecimal: number;
  nearestCommonAspect: string;
}

export function calculateAnamorphicDeSqueeze(
  width: number,
  height: number,
  squeeze: number
): AnamorphicResult {
  const deSqueezedWidth = Math.round(width * squeeze);
  const deSqueezedHeight = height;
  const ratio = deSqueezedWidth / deSqueezedHeight;

  let nearest = 'Custom';
  if (Math.abs(ratio - 2.39) < 0.05) nearest = '2.39:1 (Scope / Widescreen)';
  else if (Math.abs(ratio - 2.66) < 0.06) nearest = '2.66:1 (Cinemascope classic)';
  else if (Math.abs(ratio - 2.76) < 0.06) nearest = '2.76:1 (Ultra Panavision 70)';
  else if (Math.abs(ratio - 1.78) < 0.05) nearest = '16:9 (1.78:1 HD)';

  return {
    captureWidth: width,
    captureHeight: height,
    squeeze,
    deSqueezedWidth,
    deSqueezedHeight,
    aspectRatioDecimal: Math.round(ratio * 100) / 100,
    nearestCommonAspect: nearest,
  };
}

/**
 * 6. Video Chroma Subsampling (4:4:4 vs 4:2:0) Analyzer
 */
export interface ChromaResult {
  format: '4:4:4' | '4:2:2' | '4:2:0';
  lumaPercentage: number;
  chromaPercentage: number;
  dataRateSavingsPercent: number;
  recommendedFor: string;
}

export function calculateChromaSubsampling(format: '4:4:4' | '4:2:2' | '4:2:0'): ChromaResult {
  switch (format) {
    case '4:4:4':
      return {
        format,
        lumaPercentage: 100,
        chromaPercentage: 100,
        dataRateSavingsPercent: 0,
        recommendedFor: 'VFX Green Screen, CGI Compositing, High-end Grading, Master Archive',
      };
    case '4:2:2':
      return {
        format,
        lumaPercentage: 100,
        chromaPercentage: 50,
        dataRateSavingsPercent: 33.3,
        recommendedFor: 'Broadcast TV, Apple ProRes 422, Sony XAVC, Professional Camera Capture',
      };
    case '4:2:0':
      return {
        format,
        lumaPercentage: 100,
        chromaPercentage: 25,
        dataRateSavingsPercent: 50.0,
        recommendedFor: 'Web Streaming (YouTube, Netflix), Blu-ray, H.264/HEVC/AV1 Consumer Distribution',
      };
  }
}

/**
 * 7. DTMF Telephone Keypad Frequencies
 */
const DTMF_ROWS: Record<string, number> = {
  '1': 697, '2': 697, '3': 697, 'A': 697,
  '4': 770, '5': 770, '6': 770, 'B': 770,
  '7': 852, '8': 852, '9': 852, 'C': 852,
  '*': 941, '0': 941, '#': 941, 'D': 941,
};

const DTMF_COLS: Record<string, number> = {
  '1': 1209, '2': 1336, '3': 1477, 'A': 1633,
  '4': 1209, '5': 1336, '6': 1477, 'B': 1633,
  '7': 1209, '8': 1336, '9': 1477, 'C': 1633,
  '*': 1209, '0': 1336, '#': 1477, 'D': 1633,
};

export function getDtmfFrequencies(key: string): [number, number] | null {
  const k = key.toUpperCase();
  const r = DTMF_ROWS[k];
  const c = DTMF_COLS[k];
  return r && c ? [r, c] : null;
}

/**
 * 8. Musical Scales, Intervals & Chords
 */
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const SCALE_INTERVALS: Record<string, number[]> = {
  'Major (Ionian)': [2, 2, 1, 2, 2, 2, 1],
  'Natural Minor (Aeolian)': [2, 1, 2, 2, 1, 2, 2],
  'Dorian': [2, 1, 2, 2, 2, 1, 2],
  'Phrygian': [1, 2, 2, 2, 1, 2, 2],
  'Lydian': [2, 2, 2, 1, 2, 2, 1],
  'Mixolydian': [2, 2, 1, 2, 2, 1, 2],
  'Pentatonic Major': [2, 2, 3, 2, 3],
  'Pentatonic Minor': [3, 2, 2, 3, 2],
  'Blues': [3, 2, 1, 1, 3, 2],
};

export function getScaleNotes(rootNote: string, scaleName: string): string[] {
  const rootIndex = NOTE_NAMES.indexOf(rootNote);
  if (rootIndex === -1) return [];

  const intervals = SCALE_INTERVALS[scaleName] || SCALE_INTERVALS['Major (Ionian)'];
  const notes = [NOTE_NAMES[rootIndex]];

  let current = rootIndex;
  for (let i = 0; i < intervals.length - 1; i++) {
    current = (current + intervals[i]) % 12;
    notes.push(NOTE_NAMES[current]);
  }

  return notes;
}

/**
 * 9. Binaural Beat & Brainwave Frequency Synthesizer Math
 */
export type BrainwaveBand = 'delta' | 'theta' | 'alpha' | 'beta' | 'gamma';

export const BRAINWAVE_BANDS: Record<BrainwaveBand, { label: string; diffHz: number; effect: string }> = {
  'delta': { label: 'Delta (0.5 – 4 Hz)', diffHz: 2.5, effect: 'Deep restorative sleep, healing, pain relief' },
  'theta': { label: 'Theta (4 – 8 Hz)', diffHz: 6.0, effect: 'Meditation, deep relaxation, REM dreaming, intuition' },
  'alpha': { label: 'Alpha (8 – 13 Hz)', diffHz: 10.0, effect: 'Calm focus, flow state, anxiety reduction' },
  'beta': { label: 'Beta (13 – 30 Hz)', diffHz: 18.0, effect: 'Active problem solving, alertness, high focus' },
  'gamma': { label: 'Gamma (30 – 50 Hz)', diffHz: 40.0, effect: 'Cognitive peak, memory recall, high-order thinking' },
};

export function calculateBinauralFrequencies(baseHz: number, band: BrainwaveBand) {
  const diff = BRAINWAVE_BANDS[band].diffHz;
  const leftHz = Math.round(baseHz * 10) / 10;
  const rightHz = Math.round((baseHz + diff) * 10) / 10;

  return {
    band,
    baseHz: leftHz,
    diffHz: diff,
    leftHz,
    rightHz,
    effect: BRAINWAVE_BANDS[band].effect,
  };
}

/**
 * 10. Calibrated Noise Buffer Math (White, Pink, Brown)
 */
export function generateNoiseSamples(type: 'white' | 'pink' | 'brown', numSamples = 44100): Float32Array {
  const output = new Float32Array(numSamples);

  if (type === 'white') {
    for (let i = 0; i < numSamples; i++) {
      output[i] = Math.random() * 2 - 1;
    }
  } else if (type === 'pink') {
    // Paul Kellet's filter method
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < numSamples; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
  } else {
    // Brown / Red noise: integrated white noise
    let lastOut = 0.0;
    for (let i = 0; i < numSamples; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // normalize volume
    }
  }

  return output;
}
