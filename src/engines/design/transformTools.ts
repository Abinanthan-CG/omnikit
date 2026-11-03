export interface TransformConfig {
  translateX: number; // px
  translateY: number; // px
  scaleX: number;     // ratio (e.g. 1)
  scaleY: number;     // ratio (e.g. 1)
  rotateDeg: number;  // degrees
  skewXDeg: number;   // degrees
  skewYDeg: number;   // degrees
}

export interface TransformResult {
  individualCss: string;
  matrixCss: string;
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

export function calculateTransformMatrix(cfg: TransformConfig): TransformResult {
  const rad = (deg: number) => (deg * Math.PI) / 180;

  const r = rad(cfg.rotateDeg);
  const kx = rad(cfg.skewXDeg);
  const ky = rad(cfg.skewYDeg);

  const cosR = Math.cos(r);
  const sinR = Math.sin(r);
  const tanKx = Math.tan(kx);
  const tanKy = Math.tan(ky);

  // 2D affine matrix components:
  // [ a  c  e ]
  // [ b  d  f ]
  // [ 0  0  1 ]
  const a = cfg.scaleX * (cosR + tanKy * -sinR);
  const b = cfg.scaleX * (sinR + tanKy * cosR);
  const c = cfg.scaleY * (cosR * tanKx - sinR);
  const d = cfg.scaleY * (sinR * tanKx + cosR);
  const e = cfg.translateX;
  const f = cfg.translateY;

  const round = (num: number) => Math.round(num * 10000) / 10000;

  const indParts: string[] = [];
  if (cfg.translateX || cfg.translateY) indParts.push(`translate(${cfg.translateX}px, ${cfg.translateY}px)`);
  if (cfg.rotateDeg) indParts.push(`rotate(${cfg.rotateDeg}deg)`);
  if (cfg.scaleX !== 1 || cfg.scaleY !== 1) indParts.push(`scale(${cfg.scaleX}, ${cfg.scaleY})`);
  if (cfg.skewXDeg || cfg.skewYDeg) indParts.push(`skew(${cfg.skewXDeg}deg, ${cfg.skewYDeg}deg)`);

  const individualCss = indParts.length > 0 ? `transform: ${indParts.join(' ')};` : 'transform: none;';
  const matrixCss = `transform: matrix(${round(a)}, ${round(b)}, ${round(c)}, ${round(d)}, ${round(e)}, ${round(f)});`;

  return {
    individualCss,
    matrixCss,
    a: round(a),
    b: round(b),
    c: round(c),
    d: round(d),
    e: round(e),
    f: round(f)
  };
}
