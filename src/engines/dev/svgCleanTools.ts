export interface SvgCleanResult {
  cleanedSvg: string;
  originalBytes: number;
  cleanedBytes: number;
  savingsPercent: number;
}

export function cleanSvg(svgString: string, precision: number = 2): SvgCleanResult {
  if (!svgString || typeof svgString !== 'string') {
    return { cleanedSvg: '', originalBytes: 0, cleanedBytes: 0, savingsPercent: 0 };
  }

  const originalBytes = new TextEncoder().encode(svgString).length;

  let cleaned = svgString;

  // 1. Remove XML declarations and DOCTYPE
  cleaned = cleaned.replace(/<\?xml[\s\S]*?\?>/gi, '');
  cleaned = cleaned.replace(/<!DOCTYPE[\s\S]*?>/gi, '');

  // 2. Remove comments
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

  // 3. Remove editor metadata (Inkscape, Illustrator, Figma attributes)
  cleaned = cleaned.replace(/\s+(xmlns:xlink|xmlns:sketch|xmlns:inkscape|xmlns:sodipodi|xmlns:vectornator|sketch:type|inkscape:[a-zA-Z0-9_-]+|sodipodi:[a-zA-Z0-9_-]+)="[^"]*"/gi, '');

  // 4. Round float numbers in path data d="..." to given precision
  const prec = Math.max(0, Math.min(6, precision));
  cleaned = cleaned.replace(/d="([^"]+)"/g, (_, pathData: string) => {
    const rounded = pathData.replace(/(\d+\.\d{3,})/g, (num) => {
      return Number(parseFloat(num).toFixed(prec)).toString();
    });
    return `d="${rounded}"`;
  });

  // 5. Collapse excessive whitespaces
  cleaned = cleaned.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();

  const cleanedBytes = new TextEncoder().encode(cleaned).length;
  const savings = originalBytes > 0
    ? Math.max(0, Math.round(((originalBytes - cleanedBytes) / originalBytes) * 1000) / 10)
    : 0;

  return {
    cleanedSvg: cleaned,
    originalBytes,
    cleanedBytes,
    savingsPercent: savings
  };
}
