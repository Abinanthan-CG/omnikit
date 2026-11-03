// Pure logic engines for Batch 14 (Design, UI & Text Workstation)

/**
 * Helper: HEX to HSL and HSL to HEX
 */
export function hexToHsl(hex: string): [number, number, number] {
  let c = hex.replace('#', '').trim();
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const num = parseInt(c, 16);
  if (isNaN(num)) return [0, 0, 50];

  const r = ((num >> 16) & 255) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h = h / 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }

  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * 1. Color Harmony & Palette Generator
 */
export interface ColorHarmonies {
  complementary: string[];
  triadic: string[];
  analogous: string[];
  splitComplementary: string[];
  tetradic: string[];
}

export function generateColorHarmonies(baseHex: string): ColorHarmonies {
  const [h, s, l] = hexToHsl(baseHex);
  const base = hslToHex(h, s, l);

  return {
    complementary: [base, hslToHex(h + 180, s, l)],
    triadic: [base, hslToHex(h + 120, s, l), hslToHex(h + 240, s, l)],
    analogous: [hslToHex(h - 30, s, l), base, hslToHex(h + 30, s, l)],
    splitComplementary: [base, hslToHex(h + 150, s, l), hslToHex(h + 210, s, l)],
    tetradic: [base, hslToHex(h + 90, s, l), hslToHex(h + 180, s, l), hslToHex(h + 270, s, l)],
  };
}

/**
 * 2. Color Mixer & Alpha Compositor
 */
export function mixColors(hex1: string, hex2: string, weightPercent = 50): string {
  const parse = (hex: string) => {
    let c = hex.replace('#', '').trim();
    if (c.length === 3) c = c.split('').map((x) => x + x).join('');
    const num = parseInt(c, 16);
    return isNaN(num) ? [0, 0, 0] : [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  };

  const rgb1 = parse(hex1);
  const rgb2 = parse(hex2);
  const w = Math.max(0, Math.min(100, weightPercent)) / 100;

  const r = Math.round(rgb1[0] * (1 - w) + rgb2[0] * w);
  const g = Math.round(rgb1[1] * (1 - w) + rgb2[1] * w);
  const b = Math.round(rgb1[2] * (1 - w) + rgb2[2] * w);

  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * 3. Neumorphism Soft UI Dual Shadow Builder
 */
export interface NeumorphismResult {
  background: string;
  boxShadow: string;
  css: string;
}

export function generateNeumorphismCss(
  baseHex: string,
  distance = 10,
  blur = 20,
  shape: 'flat' | 'convex' | 'concave' | 'pressed' = 'flat'
): NeumorphismResult {
  const [h, s, l] = hexToHsl(baseHex);
  const lightShadow = hslToHex(h, Math.max(0, s - 5), Math.min(100, l + 12));
  const darkShadow = hslToHex(h, Math.min(100, s + 5), Math.max(0, l - 12));

  let boxShadow = '';
  let background = baseHex;

  if (shape === 'flat') {
    boxShadow = `${distance}px ${distance}px ${blur}px ${darkShadow}, -${distance}px -${distance}px ${blur}px ${lightShadow}`;
  } else if (shape === 'pressed') {
    boxShadow = `inset ${distance}px ${distance}px ${blur}px ${darkShadow}, inset -${distance}px -${distance}px ${blur}px ${lightShadow}`;
  } else if (shape === 'convex') {
    background = `linear-gradient(145deg, ${lightShadow}, ${darkShadow})`;
    boxShadow = `${distance}px ${distance}px ${blur}px ${darkShadow}, -${distance}px -${distance}px ${blur}px ${lightShadow}`;
  } else if (shape === 'concave') {
    background = `linear-gradient(145deg, ${darkShadow}, ${lightShadow})`;
    boxShadow = `${distance}px ${distance}px ${blur}px ${darkShadow}, -${distance}px -${distance}px ${blur}px ${lightShadow}`;
  }

  const css = `background: ${background};\nbox-shadow: ${boxShadow};\nborder-radius: 20px;`;
  return { background, boxShadow, css };
}

/**
 * 4. SVG to Clean Data URI / CSS Background
 */
export function svgToDataUri(svg: string): string {
  const clean = svg
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .replace(/"/g, "'");

  const encoded = encodeURIComponent(clean)
    .replace(/%20/g, ' ')
    .replace(/%3D/g, '=')
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/')
    .replace(/%27/g, "'");

  return `data:image/svg+xml,${encoded}`;
}

/**
 * 5. SVG Path (d attribute) Inspector
 */
export interface PathCommandInfo {
  command: string;
  count: number;
}

export function inspectSvgPath(d: string): { totalCommands: number; commandCounts: Record<string, number> } {
  const matches = d.match(/[a-df-z]/gi) || [];
  const commandCounts: Record<string, number> = {};

  for (const m of matches) {
    commandCounts[m] = (commandCounts[m] || 0) + 1;
  }

  return {
    totalCommands: matches.length,
    commandCounts,
  };
}

/**
 * 6. Aspect Ratio Percentage Padding Calculator
 */
export interface AspectPaddingResult {
  ratioLabel: string;
  paddingTopPercent: number;
  cssSnippet: string;
}

export function calculateAspectPadding(width: number, height: number): AspectPaddingResult {
  const w = Math.max(1, width);
  const h = Math.max(1, height);
  const padding = Math.round((h / w) * 10000) / 100;

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(w, h);
  const ratioLabel = `${w / divisor}:${h / divisor}`;

  const cssSnippet = `.aspect-wrapper {\n  width: 100%;\n  padding-top: ${padding}%; /* ${ratioLabel} */\n  position: relative;\n}\n.aspect-wrapper > * {\n  position: absolute;\n  top: 0; left: 0;\n  width: 100%; height: 100%;\n}`;

  return {
    ratioLabel,
    paddingTopPercent: padding,
    cssSnippet,
  };
}

/**
 * 7. String Deduplicator & List Sanitizer
 */
export function deduplicateStrings(
  input: string,
  options: { trim?: boolean; caseSensitive?: boolean; sort?: 'none' | 'asc' | 'desc'; outputFormat?: 'newline' | 'csv' | 'json' } = {}
): string {
  const rawLines = input.split(/\r?\n|,/);
  const seen = new Set<string>();
  const results: string[] = [];

  for (let item of rawLines) {
    if (options.trim !== false) item = item.trim();
    if (!item) continue;

    const key = options.caseSensitive ? item : item.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      results.push(item);
    }
  }

  if (options.sort === 'asc') results.sort((a, b) => a.localeCompare(b));
  else if (options.sort === 'desc') results.sort((a, b) => b.localeCompare(a));

  if (options.outputFormat === 'csv') return results.join(', ');
  if (options.outputFormat === 'json') return JSON.stringify(results, null, 2);
  return results.join('\n');
}

/**
 * 8. ROT-13 & Caesar Cipher
 */
export function applyRot13(text: string, shift = 13): string {
  const s = ((shift % 26) + 26) % 26;
  return text.replace(/[a-zA-Z]/g, (char) => {
    const code = char.charCodeAt(0);
    const isUpper = code >= 65 && code <= 90;
    const base = isUpper ? 65 : 97;
    return String.fromCharCode(((code - base + s) % 26) + base);
  });
}

/**
 * 9. Text Typoglycemia Scrambler
 */
export function scrambleTypoglycemia(text: string): string {
  return text.replace(/\b([a-zA-Z])([a-zA-Z]{2,})([a-zA-Z])\b/g, (_match, first, middle, last) => {
    const chars = middle.split('');
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return first + chars.join('') + last;
  });
}

/**
 * 10. Decibel Voltage & Sound Pressure Level Converter
 */
export interface DbConversionResult {
  voltageRms: number;
  dBu: number;
  dBV: number;
  pressureRatio: number;
}

export function convertDecibelVoltages(voltageVolts: number): DbConversionResult {
  const v = Math.max(0.000001, voltageVolts);
  const dBu = Math.round(20 * Math.log10(v / 0.7746) * 10) / 10;
  const dBV = Math.round(20 * Math.log10(v / 1.0) * 10) / 10;
  const pressureRatio = Math.round(Math.pow(10, dBu / 20) * 100) / 100;

  return {
    voltageRms: v,
    dBu,
    dBV,
    pressureRatio,
  };
}
