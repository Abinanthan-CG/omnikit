export interface FilterConfig {
  blurPx: number;
  brightnessPercent: number;
  contrastPercent: number;
  grayscalePercent: number;
  hueRotateDeg: number;
  invertPercent: number;
  saturatePercent: number;
  sepiaPercent: number;
}

export const DEFAULT_FILTER_CONFIG: FilterConfig = {
  blurPx: 0,
  brightnessPercent: 100,
  contrastPercent: 100,
  grayscalePercent: 0,
  hueRotateDeg: 0,
  invertPercent: 0,
  saturatePercent: 100,
  sepiaPercent: 0,
};

export function generateFilterCss(cfg: FilterConfig): { filterValue: string; fullCss: string } {
  const parts: string[] = [];

  if (cfg.blurPx > 0) parts.push(`blur(${cfg.blurPx}px)`);
  if (cfg.brightnessPercent !== 100) parts.push(`brightness(${cfg.brightnessPercent}%)`);
  if (cfg.contrastPercent !== 100) parts.push(`contrast(${cfg.contrastPercent}%)`);
  if (cfg.grayscalePercent > 0) parts.push(`grayscale(${cfg.grayscalePercent}%)`);
  if (cfg.hueRotateDeg > 0) parts.push(`hue-rotate(${cfg.hueRotateDeg}deg)`);
  if (cfg.invertPercent > 0) parts.push(`invert(${cfg.invertPercent}%)`);
  if (cfg.saturatePercent !== 100) parts.push(`saturate(${cfg.saturatePercent}%)`);
  if (cfg.sepiaPercent > 0) parts.push(`sepia(${cfg.sepiaPercent}%)`);

  const filterValue = parts.length > 0 ? parts.join(' ') : 'none';
  return {
    filterValue,
    fullCss: `filter: ${filterValue};`
  };
}
