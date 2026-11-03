export interface GlowCardOptions {
  glowColor: string;
  glowSpreadPx: number;
  glowOpacity: number;
  borderRadiusPx: number;
  borderWidthPx: number;
  bgOpacity: number;
}

export function generateGlowCardCss(options: GlowCardOptions): {
  cssProperties: string;
  boxShadowSnippet: string;
} {
  const color = options.glowColor || '#06b6d4';
  const spread = Math.max(0, options.glowSpreadPx || 25);
  const opacity = Math.max(0, Math.min(1, options.glowOpacity ?? 0.6));
  const radius = Math.max(0, options.borderRadiusPx || 16);
  const borderW = Math.max(0, options.borderWidthPx || 1);

  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) || 6;
  const g = parseInt(hex.substring(2, 4), 16) || 182;
  const b = parseInt(hex.substring(4, 6), 16) || 212;

  const glowRgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;
  const borderRgba = `rgba(${r}, ${g}, ${b}, ${Math.min(1, opacity + 0.2)})`;
  const bgRgba = `rgba(10, 10, 12, ${options.bgOpacity ?? 0.85})`;

  const shadow = `0 0 ${spread}px ${glowRgba}, inset 0 0 ${Math.round(spread / 2)}px rgba(${r}, ${g}, ${b}, ${Math.round(opacity * 0.3 * 100) / 100})`;

  const css = `background: ${bgRgba};
border: ${borderW}px solid ${borderRgba};
border-radius: ${radius}px;
box-shadow: ${shadow};
backdrop-filter: blur(12px);`;

  return {
    cssProperties: css,
    boxShadowSnippet: shadow
  };
}
