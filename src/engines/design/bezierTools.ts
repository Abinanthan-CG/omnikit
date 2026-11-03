export interface CubicBezierPoints {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const BEZIER_PRESETS: Record<string, CubicBezierPoints> = {
  ease: { x1: 0.25, y1: 0.1, x2: 0.25, y2: 1 },
  linear: { x1: 0, y1: 0, x2: 1, y2: 1 },
  'ease-in': { x1: 0.42, y1: 0, x2: 1, y2: 1 },
  'ease-out': { x1: 0, y1: 0, x2: 0.58, y2: 1 },
  'ease-in-out': { x1: 0.42, y1: 0, x2: 0.58, y2: 1 },
  bounce: { x1: 0.68, y1: -0.55, x2: 0.265, y2: 1.55 },
  snappy: { x1: 0.2, y1: 0.8, x2: 0.2, y2: 1 },
};

export function formatCubicBezier(pts: CubicBezierPoints): string {
  const clamp = (v: number) => Math.max(0, Math.min(1, Math.round(v * 100) / 100));
  const x1 = clamp(pts.x1);
  const y1 = Math.round(pts.y1 * 100) / 100;
  const x2 = clamp(pts.x2);
  const y2 = Math.round(pts.y2 * 100) / 100;
  return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
}

// Compute (x, y) coordinates of cubic bezier curve at parameter t in [0, 1]
export function evaluateBezier(pts: CubicBezierPoints, t: number): { x: number; y: number } {
  const cx = 3 * pts.x1;
  const bx = 3 * (pts.x2 - pts.x1) - cx;
  const ax = 1 - cx - bx;

  const cy = 3 * pts.y1;
  const by = 3 * (pts.y2 - pts.y1) - cy;
  const ay = 1 - cy - by;

  const x = ((ax * t + bx) * t + cx) * t;
  const y = ((ay * t + by) * t + cy) * t;

  return { x, y };
}
