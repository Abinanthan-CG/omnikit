export interface GradientStop {
  color: string;
  position: number; // 0 to 100
}

export interface GradientOptions {
  type: 'linear' | 'radial';
  angle?: number; // for linear (degrees)
  shape?: 'circle' | 'ellipse'; // for radial
  stops: GradientStop[];
}

export function generateGradientCss(options: GradientOptions): string {
  const sortedStops = [...options.stops].sort((a, b) => a.position - b.position);
  const stopStr = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');

  if (options.type === 'radial') {
    const shape = options.shape || 'circle';
    return `background: radial-gradient(${shape}, ${stopStr});`;
  }

  const angle = options.angle ?? 90;
  return `background: linear-gradient(${angle}deg, ${stopStr});`;
}
