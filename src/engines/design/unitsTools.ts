export interface UnitsResult {
  px: number;
  rem: number;
  em: number;
  pt: number;
  in: number;
  mm: number;
  vw: number;
  vh: number;
}

export function convertCssUnits(
  value: number,
  fromUnit: 'px' | 'rem' | 'em' | 'pt' | 'in' | 'mm',
  rootFontSize: number = 16,
  viewportWidth: number = 1920,
  viewportHeight: number = 1080
): UnitsResult {
  const root = rootFontSize || 16;
  let px = 0;

  switch (fromUnit) {
    case 'rem':
    case 'em':
      px = value * root;
      break;
    case 'pt':
      px = value * (96 / 72);
      break;
    case 'in':
      px = value * 96;
      break;
    case 'mm':
      px = value * (96 / 25.4);
      break;
    case 'px':
    default:
      px = value;
      break;
  }

  const round = (num: number, decimals: number = 4) => {
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
  };

  return {
    px: round(px, 2),
    rem: round(px / root),
    em: round(px / root),
    pt: round(px * (72 / 96), 2),
    in: round(px / 96, 3),
    mm: round(px * (25.4 / 96), 2),
    vw: round((px / viewportWidth) * 100, 3),
    vh: round((px / viewportHeight) * 100, 3)
  };
}
