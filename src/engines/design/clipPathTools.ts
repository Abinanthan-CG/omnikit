export interface ClipPoint {
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
}

export const CLIP_PRESETS: Record<string, ClipPoint[]> = {
  Triangle: [
    { x: 50, y: 0 },
    { x: 100, y: 100 },
    { x: 0, y: 100 }
  ],
  Trapezoid: [
    { x: 20, y: 0 },
    { x: 80, y: 0 },
    { x: 100, y: 100 },
    { x: 0, y: 100 }
  ],
  Chevron: [
    { x: 0, y: 0 },
    { x: 75, y: 0 },
    { x: 100, y: 50 },
    { x: 75, y: 100 },
    { x: 0, y: 100 },
    { x: 25, y: 50 }
  ],
  Octagon: [
    { x: 30, y: 0 },
    { x: 70, y: 0 },
    { x: 100, y: 30 },
    { x: 100, y: 70 },
    { x: 70, y: 100 },
    { x: 30, y: 100 },
    { x: 0, y: 70 },
    { x: 0, y: 30 }
  ],
  Star: [
    { x: 50, y: 0 },
    { x: 61, y: 35 },
    { x: 98, y: 35 },
    { x: 68, y: 57 },
    { x: 79, y: 91 },
    { x: 50, y: 70 },
    { x: 21, y: 91 },
    { x: 32, y: 57 },
    { x: 2, y: 35 },
    { x: 39, y: 35 }
  ],
  'Speech Bubble': [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 100, y: 75 },
    { x: 75, y: 75 },
    { x: 75, y: 100 },
    { x: 50, y: 75 },
    { x: 0, y: 75 }
  ]
};

export function generatePolygonCss(points: ClipPoint[]): { polygonValue: string; fullCss: string } {
  const coords = points.map(p => `${Math.round(p.x)}% ${Math.round(p.y)}%`).join(', ');
  const polygonValue = `polygon(${coords})`;
  return {
    polygonValue,
    fullCss: `clip-path: ${polygonValue};`
  };
}
