export interface SampleRateInfo {
  sampleRateHz: number;
  nyquistFrequencyHz: number;
  bitDepth: number;
  channels: number;
  bytesPerSecond: number;
  mbPerMinute: number;
  usageDescription: string;
}

export const COMMON_SAMPLE_RATES: { rate: number; name: string }[] = [
  { rate: 44100, name: '44.1 kHz (Audio CD)' },
  { rate: 48000, name: '48.0 kHz (Cinema & Broadcast Standard)' },
  { rate: 88200, name: '88.2 kHz (High-Res Music)' },
  { rate: 96000, name: '96.0 kHz (Studio Mastering Standard)' },
  { rate: 192000, name: '192.0 kHz (Audiophile Archival)' }
];

export function calculateSampleRateMetrics(
  sampleRate: number,
  bitDepth: number = 24,
  channels: number = 2
): SampleRateInfo {
  const rate = Math.max(1000, sampleRate || 48000);
  const bits = Math.max(8, bitDepth || 24);
  const ch = Math.max(1, channels || 2);

  const nyquist = Math.round(rate / 2);
  const bytesPerSecond = Math.round(rate * (bits / 8) * ch);
  const mbPerMinute = Math.round(((bytesPerSecond * 60) / (1024 * 1024)) * 100) / 100;

  let desc = 'Standard Audio Format';
  if (rate === 44100) desc = 'Standard Red Book Audio CD quality';
  else if (rate === 48000) desc = 'SMPTE film, broadcast, and video production standard';
  else if (rate === 96000) desc = 'Pro audio studio recording and acoustic analysis';
  else if (rate >= 192000) desc = 'Ultra high-resolution archival audio';

  return {
    sampleRateHz: rate,
    nyquistFrequencyHz: nyquist,
    bitDepth: bits,
    channels: ch,
    bytesPerSecond,
    mbPerMinute,
    usageDescription: desc
  };
}
