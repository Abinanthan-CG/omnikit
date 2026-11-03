export interface ClampConfig {
  minWidth: number;   // e.g. 320
  maxWidth: number;   // e.g. 1280
  minSize: number;    // e.g. 16
  maxSize: number;    // e.g. 24
  rootFontSize?: number; // default 16
}

export interface ClampResult {
  clampCss: string;
  slope: number;
  intersection: number;
  minRem: string;
  maxRem: string;
  preferredVw: string;
  preferredRem: string;
}

export function calculateClamp(config: ClampConfig): ClampResult {
  const root = config.rootFontSize || 16;
  const { minWidth, maxWidth, minSize, maxSize } = config;

  if (maxWidth <= minWidth) {
    const fallbackRem = (minSize / root).toFixed(4);
    return {
      clampCss: `${fallbackRem}rem`,
      slope: 0,
      intersection: minSize,
      minRem: `${fallbackRem}rem`,
      maxRem: `${fallbackRem}rem`,
      preferredVw: '0vw',
      preferredRem: `${fallbackRem}rem`
    };
  }

  // slope m = (maxSize - minSize) / (maxWidth - minWidth)
  const slope = (maxSize - minSize) / (maxWidth - minWidth);
  // intersection b = -minWidth * slope + minSize
  const intersection = -minWidth * slope + minSize;

  const minRem = (minSize / root).toFixed(4).replace(/\.?0+$/, '') + 'rem';
  const maxRem = (maxSize / root).toFixed(4).replace(/\.?0+$/, '') + 'rem';
  const preferredVw = (slope * 100).toFixed(4).replace(/\.?0+$/, '') + 'vw';
  const preferredRem = (intersection / root).toFixed(4).replace(/\.?0+$/, '') + 'rem';

  const clampCss = `clamp(${minRem}, ${preferredVw} + ${preferredRem}, ${maxRem})`;

  return {
    clampCss,
    slope: Math.round(slope * 10000) / 10000,
    intersection: Math.round(intersection * 100) / 100,
    minRem,
    maxRem,
    preferredVw,
    preferredRem
  };
}
