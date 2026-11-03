export type OscillatorWaveform = 'sine' | 'square' | 'sawtooth' | 'triangle';

export interface TonePreset {
  name: string;
  frequencyHz: number;
  description: string;
}

export const AUDIO_TEST_PRESETS: TonePreset[] = [
  { name: '440 Hz Concert Pitch', frequencyHz: 440, description: 'Standard orchestral tuning reference' },
  { name: '432 Hz Natural Pitch', frequencyHz: 432, description: 'Alternative Verdi tuning' },
  { name: '1000 Hz Studio Test Tone', frequencyHz: 1000, description: 'Standard calibration tone for line level' },
  { name: '60 Hz Sub Bass / Mains Hum', frequencyHz: 60, description: 'AC mains power frequency test' },
  { name: '100 Hz Low Bass Warmup', frequencyHz: 100, description: 'Subwoofer response test' },
  { name: '10 kHz High Air Treble', frequencyHz: 10000, description: 'High frequency speaker limit test' }
];

export function calculateHarmonics(fundamentalHz: number, count: number = 8): number[] {
  const safeFund = Math.max(1, fundamentalHz || 440);
  const harmonics: number[] = [];
  for (let i = 1; i <= count; i++) {
    harmonics.push(Math.round(safeFund * i * 100) / 100);
  }
  return harmonics;
}
