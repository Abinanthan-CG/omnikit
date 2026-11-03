import type { EngineResult } from '../../types/tool.ts';

export interface AspectRatioResult {
  width: number;
  height: number;
  ratioWidth: number;
  ratioHeight: number;
  ratioString: string;
  decimal: number;
  closestStandard: string;
  letterboxPadding: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export const STANDARD_RATIOS: Array<{ name: string; ratio: number; w: number; h: number }> = [
  { name: '16:9 (Standard Widescreen)', ratio: 16 / 9, w: 16, h: 9 },
  { name: '9:16 (Vertical / TikTok / Shorts)', ratio: 9 / 16, w: 9, h: 16 },
  { name: '4:3 (Classic Television)', ratio: 4 / 3, w: 4, h: 3 },
  { name: '1:1 (Square)', ratio: 1, w: 1, h: 1 },
  { name: '21:9 (Ultrawide)', ratio: 21 / 9, w: 21, h: 9 },
  { name: '2.39:1 (Anamorphic Scope)', ratio: 2.39, w: 239, h: 100 },
  { name: '2:1 (Univisium)', ratio: 2, w: 2, h: 1 },
];

export function calculateAspectRatio(
  width: number,
  height: number,
  targetContainerRatio?: string
): EngineResult<AspectRatioResult> {
  if (!width || !height || width <= 0 || height <= 0 || isNaN(width) || isNaN(height)) {
    return {
      success: false,
      error: 'Width and height must be positive numbers',
    };
  }

  const w = Math.round(width);
  const h = Math.round(height);
  const divisor = gcd(w, h);
  const ratioWidth = w / divisor;
  const ratioHeight = h / divisor;
  const decimal = w / h;

  let closestStandard = 'Custom';
  let minDiff = Infinity;
  for (const std of STANDARD_RATIOS) {
    const diff = Math.abs(decimal - std.ratio);
    if (diff < minDiff && diff < 0.03) {
      minDiff = diff;
      closestStandard = std.name;
    }
  }

  let letterboxPadding = { top: 0, bottom: 0, left: 0, right: 0 };

  if (targetContainerRatio) {
    let targetDecimal = 16 / 9;
    if (targetContainerRatio === '16:9') targetDecimal = 16 / 9;
    else if (targetContainerRatio === '9:16') targetDecimal = 9 / 16;
    else if (targetContainerRatio === '4:3') targetDecimal = 4 / 3;
    else if (targetContainerRatio === '1:1') targetDecimal = 1;

    if (decimal > targetDecimal) {
      // Wider than target container -> letterbox on top/bottom
      const containerHeight = Math.round(w / targetDecimal);
      const totalPad = Math.max(0, containerHeight - h);
      const half = Math.floor(totalPad / 2);
      letterboxPadding = { top: half, bottom: totalPad - half, left: 0, right: 0 };
    } else if (decimal < targetDecimal) {
      // Taller than target container -> pillarbox on left/right
      const containerWidth = Math.round(h * targetDecimal);
      const totalPad = Math.max(0, containerWidth - w);
      const half = Math.floor(totalPad / 2);
      letterboxPadding = { top: 0, bottom: 0, left: half, right: totalPad - half };
    }
  }

  return {
    success: true,
    value: {
      width: w,
      height: h,
      ratioWidth,
      ratioHeight,
      ratioString: `${ratioWidth}:${ratioHeight}`,
      decimal: Math.round(decimal * 1000) / 1000,
      closestStandard,
      letterboxPadding,
    },
  };
}
