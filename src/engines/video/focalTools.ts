export interface FocalLengthResult {
  actualFocalLength: number;
  cropFactor: number;
  equivalentFocalLength: number;
  horizontalFovDegrees: number;
  verticalFovDegrees: number;
}

export function calculateEquivalentFocalLength(focalLengthMm: number, cropFactor: number): FocalLengthResult {
  const f = Math.max(1, focalLengthMm);
  const crop = Math.max(0.1, cropFactor);

  const eq = Math.round(f * crop * 10) / 10;

  // Standard 35mm full frame sensor: 36mm x 24mm
  // FOV = 2 * arctan(dimension / (2 * eq))
  const hFovRad = 2 * Math.atan(36 / (2 * eq));
  const vFovRad = 2 * Math.atan(24 / (2 * eq));

  const hFov = Math.round((hFovRad * (180 / Math.PI)) * 10) / 10;
  const vFov = Math.round((vFovRad * (180 / Math.PI)) * 10) / 10;

  return {
    actualFocalLength: f,
    cropFactor: crop,
    equivalentFocalLength: eq,
    horizontalFovDegrees: hFov,
    verticalFovDegrees: vFov,
  };
}
