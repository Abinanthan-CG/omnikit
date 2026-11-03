export interface TransposeResult {
  semitones: number;
  cents: number;
  frequencyRatio: number;
  pitchMultiplier: number;
  speedChangePercent: number; // For tape / resampling speed
  lengthRatio: number;
}

export function calculatePitchShift(semitones: number, fineCents = 0): TransposeResult {
  const totalSemitones = semitones + fineCents / 100;
  // Frequency ratio = 2^(semitones / 12)
  const ratio = Math.pow(2, totalSemitones / 12);
  const speedPercent = Math.round(ratio * 1000) / 10;
  const lengthRatio = Math.round((1 / ratio) * 1000) / 1000;

  return {
    semitones,
    cents: fineCents,
    frequencyRatio: Math.round(ratio * 10000) / 10000,
    pitchMultiplier: ratio,
    speedChangePercent: speedPercent,
    lengthRatio,
  };
}
