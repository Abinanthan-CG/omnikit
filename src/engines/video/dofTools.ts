export interface DofResult {
  hyperfocalDistanceMeters: number;
  nearLimitMeters: number;
  farLimitMeters: number | 'Infinity';
  totalDepthOfFieldMeters: number | 'Infinity';
  inFrontPercent: number;
  behindPercent: number;
}

export function calculateDof(
  focalLengthMm: number,
  apertureFStop: number,
  subjectDistanceMeters: number,
  cocMm: number = 0.030 // standard 35mm full frame circle of confusion
): DofResult {
  const f = Math.max(1, focalLengthMm || 50);
  const N = Math.max(0.7, apertureFStop || 2.8);
  const s = Math.max(0.1, subjectDistanceMeters || 3) * 1000; // convert to mm
  const c = Math.max(0.001, cocMm || 0.030);

  // Hyperfocal distance H = (f^2) / (N * c) + f (in mm)
  const H = ((f * f) / (N * c)) + f;

  // Near limit Dn = (s * (H - f)) / (H + s - 2f)
  const Dn = (s * (H - f)) / (H + s - 2 * f);

  // Far limit Df = (s * (H - f)) / (H - s)
  let Df: number | 'Infinity' = 'Infinity';
  let totalDof: number | 'Infinity' = 'Infinity';

  if (H > s) {
    Df = (s * (H - f)) / (H - s);
    totalDof = (Df - Dn) / 1000; // in meters
  }

  const nearM = Math.round((Dn / 1000) * 100) / 100;
  const farM = Df === 'Infinity' ? 'Infinity' : Math.round((Df / 1000) * 100) / 100;
  const hyperM = Math.round((H / 1000) * 100) / 100;

  let inFront = 33;
  let behind = 67;
  if (typeof Df === 'number' && typeof totalDof === 'number' && totalDof > 0) {
    const frontD = (s - Dn) / 1000;
    inFront = Math.round((frontD / totalDof) * 100);
    behind = 100 - inFront;
  }

  return {
    hyperfocalDistanceMeters: hyperM,
    nearLimitMeters: nearM,
    farLimitMeters: farM,
    totalDepthOfFieldMeters: totalDof === 'Infinity' ? 'Infinity' : Math.round(totalDof * 100) / 100,
    inFrontPercent: inFront,
    behindPercent: behind
  };
}
