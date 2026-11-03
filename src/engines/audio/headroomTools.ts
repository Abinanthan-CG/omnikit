export interface StreamingTarget {
  service: string;
  integratedLufs: number;
  maxTruePeakDb: number;
  recommendation: string;
}

export const STREAMING_STANDARDS: StreamingTarget[] = [
  { service: 'Spotify', integratedLufs: -14, maxTruePeakDb: -1.0, recommendation: 'Leave -1.0 dBTP to prevent Ogg Vorbis lossy transcoding distortion' },
  { service: 'Apple Music / Sound Check', integratedLufs: -16, maxTruePeakDb: -1.0, recommendation: 'Apple Digital Masters specifies -1.0 dBFS true peak headroom' },
  { service: 'YouTube Music & Video', integratedLufs: -14, maxTruePeakDb: -1.0, recommendation: 'Avoid positive true peaks to prevent AAC clipping' },
  { service: 'Tidal (High-Res)', integratedLufs: -14, maxTruePeakDb: -1.0, recommendation: 'FLAC preserves peaks, but lossy tier clips above 0 dBFS' },
  { service: 'Broadcast (EBU R128 / ATSC A/85)', integratedLufs: -23, maxTruePeakDb: -1.0, recommendation: 'Standard television and radio compliance' }
];

export function calculateHeadroom(
  measuredLufs: number,
  measuredPeakDb: number
): {
  isClippingRisk: boolean;
  truePeakHeadroomDb: number;
  streamingPenalties: { service: string; gainAdjustmentDb: number; willBeTurnedDown: boolean }[];
} {
  const lufs = measuredLufs || -14;
  const peak = measuredPeakDb || -0.3;

  const isClippingRisk = peak > -1.0;
  const headroom = Math.round((-1.0 - peak) * 100) / 100;

  const streamingPenalties = STREAMING_STANDARDS.map((s) => {
    // If master is louder than target, gain is lowered
    const diff = s.integratedLufs - lufs;
    return {
      service: s.service,
      gainAdjustmentDb: Math.round(diff * 10) / 10,
      willBeTurnedDown: diff < 0
    };
  });

  return {
    isClippingRisk,
    truePeakHeadroomDb: headroom,
    streamingPenalties
  };
}
