export interface AspectRatioCssResult {
  width: number;
  height: number;
  ratio: number;
  modernCss: string;
  paddingPercent: string;
  legacyHtml: string;
  legacyCss: string;
  tailwindClass: string;
}

export function generateAspectRatioCss(width: number, height: number): AspectRatioCssResult {
  const safeW = Math.max(1, width || 16);
  const safeH = Math.max(1, height || 9);

  // Greatest common divisor
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(safeW, safeH);
  const simpW = safeW / divisor;
  const simpH = safeH / divisor;

  const ratio = safeW / safeH;
  const paddingPercent = ((safeH / safeW) * 100).toFixed(4).replace(/\.?0+$/, '') + '%';

  const modernCss = `aspect-ratio: ${simpW} / ${simpH};`;
  const legacyHtml = `<div class="aspect-container">\n  <div class="aspect-content">\n    <!-- Your responsive content -->\n  </div>\n</div>`;
  const legacyCss = `.aspect-container {\n  position: relative;\n  width: 100%;\n  padding-top: ${paddingPercent};\n}\n.aspect-content {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}`;

  let tailwindClass = `aspect-[${simpW}/${simpH}]`;
  if (simpW === 16 && simpH === 9) tailwindClass = 'aspect-video';
  else if (simpW === 1 && simpH === 1) tailwindClass = 'aspect-square';

  return {
    width: simpW,
    height: simpH,
    ratio: Math.round(ratio * 1000) / 1000,
    modernCss,
    paddingPercent,
    legacyHtml,
    legacyCss,
    tailwindClass
  };
}
