export interface CodecPreset {
  name: string;
  bitrateMbps: number; // in Megabits per second
  category: 'Consumer' | 'Broadcast' | 'Cinema RAW';
}

export const CODEC_PRESETS: CodecPreset[] = [
  { name: 'H.264 / 1080p Standard (25 Mbps)', bitrateMbps: 25, category: 'Consumer' },
  { name: 'H.264 / 4K YouTube (50 Mbps)', bitrateMbps: 50, category: 'Consumer' },
  { name: 'H.265 / HEVC 4K 10-bit (100 Mbps)', bitrateMbps: 100, category: 'Consumer' },
  { name: 'Sony XAVC S-I 4K (240 Mbps)', bitrateMbps: 240, category: 'Broadcast' },
  { name: 'Apple ProRes 422 HQ (4K 24p: 440 Mbps)', bitrateMbps: 440, category: 'Broadcast' },
  { name: 'Apple ProRes 4444 (4K 24p: 660 Mbps)', bitrateMbps: 660, category: 'Broadcast' },
  { name: 'Blackmagic RAW 8:1 4K (320 Mbps)', bitrateMbps: 320, category: 'Cinema RAW' },
  { name: 'Apple ProRes RAW 4K (700 Mbps)', bitrateMbps: 700, category: 'Cinema RAW' },
  { name: 'REDCODE RAW 8:1 6K (1100 Mbps)', bitrateMbps: 1100, category: 'Cinema RAW' },
];

export interface RecordTimeResult {
  totalSeconds: number;
  hours: number;
  minutes: number;
  seconds: number;
  formattedTime: string;
  bytesPerMinute: number;
  gigabytesPerHour: number;
}

export function estimateRecordTime(cardCapacityGb: number, bitrateMbps: number): RecordTimeResult {
  const safeCapGb = Math.max(0.1, cardCapacityGb || 128);
  const safeBitrate = Math.max(1, bitrateMbps || 100);

  // Total Megabits available = GB * 8000
  const totalMegabits = safeCapGb * 8000;
  const totalSeconds = Math.floor(totalMegabits / safeBitrate);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${hours}h ${minutes}m ${seconds}s`;

  // Bitrate to bytes: Mbps / 8 = MB/s
  const megabytesPerSecond = safeBitrate / 8;
  const gigabytesPerHour = (megabytesPerSecond * 3600) / 1000;
  const bytesPerMinute = megabytesPerSecond * 60 * 1024 * 1024;

  return {
    totalSeconds,
    hours,
    minutes,
    seconds,
    formattedTime,
    bytesPerMinute: Math.round(bytesPerMinute),
    gigabytesPerHour: Math.round(gigabytesPerHour * 10) / 10
  };
}
