export interface GridOptions {
  columns: number;
  rows: number;
  columnGapPx: number;
  rowGapPx: number;
  colUnit: 'fr' | 'px' | 'auto';
  rowUnit: 'fr' | 'px' | 'auto';
}

export function generateCssGrid(options: GridOptions): {
  cssProperties: string;
  tailwindClasses: string;
} {
  const cols = Math.max(1, options.columns || 3);
  const rows = Math.max(1, options.rows || 2);
  const cGap = Math.max(0, options.columnGapPx || 16);
  const rGap = Math.max(0, options.rowGapPx || 16);

  const colTemplate = options.colUnit === 'fr'
    ? `repeat(${cols}, minmax(0, 1fr))`
    : options.colUnit === 'auto'
    ? `repeat(${cols}, auto)`
    : `repeat(${cols}, 120px)`;

  const rowTemplate = options.rowUnit === 'fr'
    ? `repeat(${rows}, minmax(0, 1fr))`
    : options.rowUnit === 'auto'
    ? `repeat(${rows}, auto)`
    : `repeat(${rows}, 80px)`;

  const css = `display: grid;
grid-template-columns: ${colTemplate};
grid-template-rows: ${rowTemplate};
gap: ${rGap}px ${cGap}px;`;

  const twGap = cGap === rGap ? `gap-[${cGap}px]` : `gap-x-[${cGap}px] gap-y-[${rGap}px]`;
  const tw = `grid grid-cols-${cols} ${twGap}`;

  return {
    cssProperties: css,
    tailwindClasses: tw
  };
}
