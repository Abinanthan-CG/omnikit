import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from './colorConverter.ts';

export interface ShadeStep {
  step: number; // 50, 100, 200, ... 900, 950
  hex: string;
}

export function generateColorShades(baseHex: string): ShadeStep[] {
  const rgb = hexToRgb(baseHex) || { r: 16, g: 185, b: 129 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const steps = [
    { step: 50, l: 96 },
    { step: 100, l: 90 },
    { step: 200, l: 80 },
    { step: 300, l: 70 },
    { step: 400, l: 60 },
    { step: 500, l: 50 },
    { step: 600, l: 40 },
    { step: 700, l: 30 },
    { step: 800, l: 20 },
    { step: 900, l: 12 },
    { step: 950, l: 6 },
  ];

  return steps.map(s => {
    const newRgb = hslToRgb(hsl.h, hsl.s, s.l);
    return {
      step: s.step,
      hex: rgbToHex(newRgb.r, newRgb.g, newRgb.b),
    };
  });
}
