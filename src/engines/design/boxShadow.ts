import { hexToRgb } from './colorConverter.ts';

export interface ShadowLayer {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset?: boolean;
}

export function generateBoxShadowCss(layers: ShadowLayer[]): string {
  if (!layers.length) return 'box-shadow: none;';

  const parts = layers.map(l => {
    const rgb = hexToRgb(l.color) || { r: 0, g: 0, b: 0 };
    const colorStr = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${l.opacity})`;
    const insetText = l.inset ? 'inset ' : '';
    return `${insetText}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${colorStr}`;
  });

  return `box-shadow: ${parts.join(', ')};`;
}
