export interface BorderRadiusConfig {
  tlX: number;
  trX: number;
  brX: number;
  blX: number;
  tlY: number;
  trY: number;
  brY: number;
  blY: number;
}

export function generateBorderRadiusCss(cfg: BorderRadiusConfig): { cssValue: string; fullCss: string } {
  const horizontal = `${cfg.tlX}% ${cfg.trX}% ${cfg.brX}% ${cfg.blX}%`;
  const vertical = `${cfg.tlY}% ${cfg.trY}% ${cfg.brY}% ${cfg.blY}%`;
  const cssValue = `${horizontal} / ${vertical}`;
  return {
    cssValue,
    fullCss: `border-radius: ${cssValue};`
  };
}
