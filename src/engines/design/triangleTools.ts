export type TriangleDirection = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export function generateTriangleCss(
  direction: TriangleDirection,
  width: number,
  height: number,
  color: string
): string {
  const w = Math.max(1, width);
  const h = Math.max(1, height);

  let styles = `width: 0px;\nheight: 0px;\nborder-style: solid;\n`;

  switch (direction) {
    case 'top':
      styles += `border-width: 0 ${w / 2}px ${h}px ${w / 2}px;\nborder-color: transparent transparent ${color} transparent;`;
      break;
    case 'bottom':
      styles += `border-width: ${h}px ${w / 2}px 0 ${w / 2}px;\nborder-color: ${color} transparent transparent transparent;`;
      break;
    case 'left':
      styles += `border-width: ${h / 2}px ${w}px ${h / 2}px 0;\nborder-color: transparent ${color} transparent transparent;`;
      break;
    case 'right':
      styles += `border-width: ${h / 2}px 0 ${h / 2}px ${w}px;\nborder-color: transparent transparent transparent ${color};`;
      break;
    case 'top-left':
      styles += `border-width: ${h}px ${w}px 0 0;\nborder-color: ${color} transparent transparent transparent;`;
      break;
    case 'top-right':
      styles += `border-width: 0 ${w}px ${h}px 0;\nborder-color: transparent ${color} transparent transparent;`;
      break;
    case 'bottom-left':
      styles += `border-width: ${h}px 0 0 ${w}px;\nborder-color: transparent transparent transparent ${color};`;
      break;
    case 'bottom-right':
      styles += `border-width: 0 0 ${h}px ${w}px;\nborder-color: transparent transparent ${color} transparent;`;
      break;
  }

  return styles;
}
