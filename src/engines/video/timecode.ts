import type { EngineResult } from '../../types/tool.ts';

export type SupportedFps = 23.976 | 24 | 25 | 29.97 | 30 | 50 | 59.94 | 60;

export interface TimecodeResult {
  timecode: string;
  frames: number;
  seconds: number;
  milliseconds: number;
  fps: SupportedFps;
  isDropFrame: boolean;
}

export function isDropFrameFps(fps: number): boolean {
  return Math.abs(fps - 29.97) < 0.01 || Math.abs(fps - 59.94) < 0.01;
}

export function parseTimecodeParts(tc: string): { h: number; m: number; s: number; f: number; isDrop: boolean } | null {
  const clean = tc.trim();
  const match = clean.match(/^(\d{2}):(\d{2}):(\d{2})[:;](\d{2})$/);
  if (!match) return null;

  const isDrop = clean.includes(';');
  const h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const s = parseInt(match[3], 10);
  const f = parseInt(match[4], 10);

  if (h < 0 || m < 0 || m >= 60 || s < 0 || s >= 60 || f < 0) return null;
  return { h, m, s, f, isDrop };
}

export function timecodeToFrames(tc: string, fps: SupportedFps = 24): number {
  const parsed = parseTimecodeParts(tc);
  if (!parsed) return 0;
  const { h, m, s, f } = parsed;
  const isDrop = isDropFrameFps(fps);

  if (!isDrop) {
    const nominalFps = Math.round(fps);
    return ((h * 3600) + (m * 60) + s) * nominalFps + f;
  }

  // Drop-frame 29.97 / 59.94 logic
  const dropFrames = Math.abs(fps - 59.94) < 0.01 ? 4 : 2;
  const nominalFps = Math.abs(fps - 59.94) < 0.01 ? 60 : 30;

  const totalMinutes = (h * 60) + m;
  const frames = ((totalMinutes * 60) + s) * nominalFps + f;
  const dropped = dropFrames * (totalMinutes - Math.floor(totalMinutes / 10));

  return frames - dropped;
}

export function framesToTimecode(totalFrames: number, fps: SupportedFps = 24): string {
  if (totalFrames < 0) totalFrames = 0;
  const isDrop = isDropFrameFps(fps);

  if (!isDrop) {
    const nominalFps = Math.round(fps);
    const f = totalFrames % nominalFps;
    const totalSeconds = Math.floor(totalFrames / nominalFps);
    const s = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const m = totalMinutes % 60;
    const h = Math.floor(totalMinutes / 60);

    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
  }

  // Drop frame reverse calculation
  const dropFrames = Math.abs(fps - 59.94) < 0.01 ? 4 : 2;
  const framesPer10Mins = Math.abs(fps - 59.94) < 0.01 ? 35964 : 17982;
  const framesPerMinute = (Math.abs(fps - 59.94) < 0.01 ? 60 : 30) * 60 - dropFrames;

  const d = Math.floor(totalFrames / framesPer10Mins);
  const mRemainder = totalFrames % framesPer10Mins;

  let framesAdjusted = totalFrames;
  if (mRemainder > dropFrames) {
    framesAdjusted += dropFrames * (9 * d + Math.floor((mRemainder - dropFrames) / framesPerMinute));
  } else {
    framesAdjusted += dropFrames * 9 * d;
  }

  const nominalFps = Math.abs(fps - 59.94) < 0.01 ? 60 : 30;
  const f = framesAdjusted % nominalFps;
  const totalSeconds = Math.floor(framesAdjusted / nominalFps);
  const s = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const m = totalMinutes % 60;
  const h = Math.floor(totalMinutes / 60);

  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)};${pad(f)}`;
}

export function calculateTimecodeOperation(
  tc1: string,
  op: '+' | '-',
  tc2: string,
  fps: SupportedFps = 24
): EngineResult<TimecodeResult> {
  const parts1 = parseTimecodeParts(tc1);
  const parts2 = parseTimecodeParts(tc2);

  if (!parts1 || !parts2) {
    return {
      success: false,
      error: 'Invalid timecode format. Expected HH:MM:SS:FF or HH:MM:SS;FF',
    };
  }

  const frames1 = timecodeToFrames(tc1, fps);
  const frames2 = timecodeToFrames(tc2, fps);

  let resultFrames = op === '+' ? frames1 + frames2 : frames1 - frames2;

  if (resultFrames < 0) {
    return {
      success: false,
      error: 'Resulting duration is negative',
    };
  }

  const timecode = framesToTimecode(resultFrames, fps);
  const actualFps = typeof fps === 'number' ? fps : 24;
  const seconds = resultFrames / actualFps;
  const milliseconds = seconds * 1000;

  return {
    success: true,
    value: {
      timecode,
      frames: resultFrames,
      seconds: Math.round(seconds * 1000) / 1000,
      milliseconds: Math.round(milliseconds),
      fps,
      isDropFrame: isDropFrameFps(fps),
    },
  };
}
