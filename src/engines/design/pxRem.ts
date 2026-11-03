import type { EngineResult } from '../../types/tool.ts';

export type ConversionDirection = 'px-to-rem' | 'rem-to-px';

export interface PxRemResult {
  inputValue: number;
  basePx: number;
  direction: ConversionDirection;
  result: number;
  cssString: string;
  tailwindClass?: string;
}

export interface ScaleItem {
  px: number;
  rem: number;
  label: string;
}

const COMMON_PX_VALUES = [4, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 80, 96];

export function generatePxRemScale(basePx: number = 16): ScaleItem[] {
  const base = basePx > 0 ? basePx : 16;
  return COMMON_PX_VALUES.map((px) => {
    const rem = Math.round((px / base) * 1000) / 1000;
    return {
      px,
      rem,
      label: `${px}px = ${rem}rem`,
    };
  });
}

export function convertPxRem(
  value: number,
  basePx: number = 16,
  direction: ConversionDirection = 'px-to-rem'
): EngineResult<PxRemResult> {
  if (isNaN(value) || isNaN(basePx) || basePx <= 0) {
    return {
      success: false,
      error: 'Base pixel value must be greater than 0',
    };
  }

  let result: number;
  let cssString: string;

  if (direction === 'px-to-rem') {
    result = Math.round((value / basePx) * 1000) / 1000;
    cssString = `${result}rem`;
  } else {
    result = Math.round(value * basePx * 100) / 100;
    cssString = `${result}px`;
  }

  return {
    success: true,
    value: {
      inputValue: value,
      basePx,
      direction,
      result,
      cssString,
    },
  };
}
