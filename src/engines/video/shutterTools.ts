export interface ShutterResult {
  fps: number;
  shutterAngle: number;
  exposureTimeSeconds: number;
  shutterSpeedFraction: string;
  reciprocalSpeed: number;
  motionBlurDescription: string;
}

export function calculateShutter(fps: number, angle: number): ShutterResult {
  const safeFps = Math.max(1, fps || 24);
  const safeAngle = Math.max(1, Math.min(360, angle || 180));

  // Exposure Time (s) = Angle / (360 * FPS)
  const exposureTimeSeconds = safeAngle / (360 * safeFps);
  const reciprocal = (360 * safeFps) / safeAngle;

  let speedFraction = `1/${Math.round(reciprocal)}`;
  if (reciprocal <= 1) {
    speedFraction = `${(Math.round(exposureTimeSeconds * 10) / 10)}s`;
  }

  let motionBlurDescription = 'Standard cinematic motion blur (180° Rule)';
  if (safeAngle < 90) {
    motionBlurDescription = 'Sharp, staccato, minimal motion blur (action / Saving Private Ryan style)';
  } else if (safeAngle < 170) {
    motionBlurDescription = 'Slightly crisper motion blur';
  } else if (safeAngle <= 190) {
    motionBlurDescription = 'Natural, standard cinematic motion blur (180° shutter)';
  } else if (safeAngle <= 270) {
    motionBlurDescription = 'Smoother, dreamy motion blur with more light gathering';
  } else {
    motionBlurDescription = 'Maximum motion blur / light gathering (smeary motion trail effect)';
  }

  return {
    fps: safeFps,
    shutterAngle: safeAngle,
    exposureTimeSeconds: Math.round(exposureTimeSeconds * 100000) / 100000,
    shutterSpeedFraction: speedFraction,
    reciprocalSpeed: Math.round(reciprocal * 10) / 10,
    motionBlurDescription
  };
}
