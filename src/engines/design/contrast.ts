import type { EngineResult } from '../../types/tool.ts';

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface WcagContrastResult {
  foreground: string;
  background: string;
  fgRgb: RgbColor;
  bgRgb: RgbColor;
  fgLuminance: number;
  bgLuminance: number;
  ratio: number;
  ratioString: string;
  aaNormal: boolean;
  aaaNormal: boolean;
  aaLarge: boolean;
  aaaLarge: boolean;
  uiComponent: boolean;
}

export function hexToRgb(hex: string): RgbColor | null {
  if (typeof hex !== 'string') return null;
  let clean = hex.trim().replace(/^#/, '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
    return null;
  }
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function getChannelLuminance(value8Bit: number): number {
  const v = value8Bit / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

export function getRelativeLuminance(rgb: RgbColor): number {
  const r = getChannelLuminance(rgb.r);
  const g = getChannelLuminance(rgb.g);
  const b = getChannelLuminance(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function calculateWcagContrast(
  fgHex: string,
  bgHex: string
): EngineResult<WcagContrastResult> {
  const fgRgb = hexToRgb(fgHex);
  const bgRgb = hexToRgb(bgHex);

  if (!fgRgb || !bgRgb) {
    return {
      success: false,
      error: 'Invalid color hex format. Expected 3 or 6 digit hex (e.g., #fff or #1e293b)',
    };
  }

  const fgLuminance = getRelativeLuminance(fgRgb);
  const bgLuminance = getRelativeLuminance(bgRgb);

  const lighter = Math.max(fgLuminance, bgLuminance);
  const darker = Math.min(fgLuminance, bgLuminance);

  const rawRatio = (lighter + 0.05) / (darker + 0.05);
  const ratio = Math.round(rawRatio * 100) / 100;

  return {
    success: true,
    value: {
      foreground: fgHex.startsWith('#') ? fgHex : `#${fgHex}`,
      background: bgHex.startsWith('#') ? bgHex : `#${bgHex}`,
      fgRgb,
      bgRgb,
      fgLuminance: Math.round(fgLuminance * 1000) / 1000,
      bgLuminance: Math.round(bgLuminance * 1000) / 1000,
      ratio,
      ratioString: `${ratio}:1`,
      aaNormal: ratio >= 4.5,
      aaaNormal: ratio >= 7.0,
      aaLarge: ratio >= 3.0,
      aaaLarge: ratio >= 4.5,
      uiComponent: ratio >= 3.0,
    },
  };
}
