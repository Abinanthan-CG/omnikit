export const PHI = 1.618033988749895;

export interface GoldenRatioSplit {
  total: number;
  major: number;
  minor: number;
  majorPercent: number;
  minorPercent: number;
}

export interface GoldenRatioStep {
  step: number;
  name: string;
  valuePx: number;
  valueRem: number;
}

export function splitGoldenRatio(totalDimension: number): GoldenRatioSplit {
  const safe = Math.max(1, totalDimension || 1000);
  const major = Math.round((safe / PHI) * 100) / 100;
  const minor = Math.round((safe - major) * 100) / 100;

  return {
    total: safe,
    major,
    minor,
    majorPercent: Math.round((major / safe) * 1000) / 10,
    minorPercent: Math.round((minor / safe) * 1000) / 10
  };
}

export function generateGoldenScale(baseSizePx: number = 16, count: number = 6): GoldenRatioStep[] {
  const base = Math.max(1, baseSizePx || 16);
  const steps: GoldenRatioStep[] = [];

  const names = ['Body / Base', 'H4 / Subheading', 'H3 / Section', 'H2 / Title', 'H1 / Display', 'Hero / Banner'];

  for (let i = 0; i < count; i++) {
    const factor = Math.pow(PHI, i);
    const px = Math.round(base * factor * 100) / 100;
    const rem = Math.round((px / 16) * 1000) / 1000;
    steps.push({
      step: i,
      name: names[i] || `Scale ${i + 1}`,
      valuePx: px,
      valueRem: rem
    });
  }

  return steps;
}
