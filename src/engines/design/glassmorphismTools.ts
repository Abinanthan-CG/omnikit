export interface GlassOptions {
  blur: number; // 0-40 px
  transparency: number; // 0-1
  borderOpacity: number; // 0-1
  backgroundColor: string; // hex
}

export function generateGlassCss(options: GlassOptions): string {
  const blur = Math.max(0, options.blur);
  const bgOpacity = Math.max(0, Math.min(1, options.transparency));
  const borderOpacity = Math.max(0, Math.min(1, options.borderOpacity));

  return `background: rgba(255, 255, 255, ${bgOpacity});
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid rgba(255, 255, 255, ${borderOpacity});
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);`;
}
