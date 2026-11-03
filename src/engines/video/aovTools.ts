export interface SensorSize {
  name: string;
  widthMm: number;
  heightMm: number;
}

export const SENSOR_SIZES: SensorSize[] = [
  { name: 'Full Frame (35mm)', widthMm: 36, heightMm: 24 },
  { name: 'Super 35 / APS-C (Sony/Nikon/Fuji)', widthMm: 23.5, heightMm: 15.6 },
  { name: 'APS-C (Canon)', widthMm: 22.2, heightMm: 14.8 },
  { name: 'Micro Four Thirds (MFT)', widthMm: 17.3, heightMm: 13.0 },
  { name: '1-inch Type (Sony RX / Drone)', widthMm: 13.2, heightMm: 8.8 },
  { name: 'Medium Format (Fujifilm GFX)', widthMm: 43.8, heightMm: 32.9 },
  { name: 'ARRI Alexa 65', widthMm: 54.12, heightMm: 25.58 }
];

export interface AovResult {
  focalLengthMm: number;
  sensor: SensorSize;
  horizontalAovDeg: number;
  verticalAovDeg: number;
  diagonalAovDeg: number;
  diagonalMm: number;
}

export function calculateAov(focalLengthMm: number, sensor: SensorSize): AovResult {
  const f = Math.max(1, focalLengthMm || 50);
  const w = sensor.widthMm;
  const h = sensor.heightMm;
  const diag = Math.sqrt(w * w + h * h);

  const radToDeg = (rad: number) => (rad * 180) / Math.PI;

  const hAov = radToDeg(2 * Math.atan(w / (2 * f)));
  const vAov = radToDeg(2 * Math.atan(h / (2 * f)));
  const dAov = radToDeg(2 * Math.atan(diag / (2 * f)));

  return {
    focalLengthMm: f,
    sensor,
    horizontalAovDeg: Math.round(hAov * 10) / 10,
    verticalAovDeg: Math.round(vAov * 10) / 10,
    diagonalAovDeg: Math.round(dAov * 10) / 10,
    diagonalMm: Math.round(diag * 10) / 10
  };
}
