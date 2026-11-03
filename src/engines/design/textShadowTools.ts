export interface TextShadowLayer {
  offsetX: number;
  offsetY: number;
  blur: number;
  color: string;
}

export function generateTextShadowCss(layers: TextShadowLayer[]): { shadowValue: string; fullCss: string } {
  if (layers.length === 0) {
    return { shadowValue: 'none', fullCss: 'text-shadow: none;' };
  }

  const parts = layers.map(l => `${l.offsetX}px ${l.offsetY}px ${l.blur}px ${l.color}`);
  const shadowValue = parts.join(', ');
  return {
    shadowValue,
    fullCss: `text-shadow: ${shadowValue};`
  };
}
