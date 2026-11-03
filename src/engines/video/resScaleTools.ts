export interface ScaledResolution {
  width: number;
  height: number;
  aspectRatio: string;
  totalPixels: number;
  megapixels: number;
}

export function scaleResolution(
  width: number,
  height: number,
  scalePercent: number
): ScaledResolution {
  const w = Math.max(2, width || 1920);
  const h = Math.max(2, height || 1080);
  const factor = Math.max(0.1, (scalePercent || 100) / 100);

  // Even pixel dimensions required by video codecs
  const scaledW = Math.round((w * factor) / 2) * 2;
  const scaledH = Math.round((h * factor) / 2) * 2;

  const totalPixels = scaledW * scaledH;
  const megapixels = Math.round((totalPixels / 1000000) * 100) / 100;

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const div = gcd(w, h);
  const aspectRatio = `${w / div}:${h / div}`;

  return {
    width: scaledW,
    height: scaledH,
    aspectRatio,
    totalPixels,
    megapixels
  };
}

export function scaleToWidth(width: number, height: number, targetWidth: number): ScaledResolution {
  const w = Math.max(2, width || 1920);
  const h = Math.max(2, height || 1080);
  const targetW = Math.round(Math.max(2, targetWidth || 1920) / 2) * 2;

  const ratio = h / w;
  const scaledH = Math.round((targetW * ratio) / 2) * 2;

  const totalPixels = targetW * scaledH;
  const megapixels = Math.round((totalPixels / 1000000) * 100) / 100;

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const div = gcd(w, h);
  const aspectRatio = `${w / div}:${h / div}`;

  return {
    width: targetW,
    height: scaledH,
    aspectRatio,
    totalPixels,
    megapixels
  };
}
