export interface SpeedRatioResult {
  sourceFps: number;
  targetFps: number;
  ratio: number;
  speedPercent: number;
  direction: 'speedup' | 'slowdown' | 'identical';
}

export function convertFrameCount(frameCount: number, sourceFps: number, targetFps: number): number {
  if (sourceFps <= 0 || targetFps <= 0 || frameCount <= 0) return 0;
  const seconds = frameCount / sourceFps;
  return Math.round(seconds * targetFps);
}

export function calculateSpeedRatio(sourceFps: number, targetFps: number): SpeedRatioResult {
  const s = Math.max(0.001, sourceFps);
  const t = Math.max(0.001, targetFps);

  const ratio = t / s;
  const speedPercent = ratio * 100;

  let direction: 'speedup' | 'slowdown' | 'identical' = 'identical';
  if (ratio > 1.0001) {
    direction = 'speedup';
  } else if (ratio < 0.9999) {
    direction = 'slowdown';
  }

  return {
    sourceFps: s,
    targetFps: t,
    ratio,
    speedPercent,
    direction,
  };
}
