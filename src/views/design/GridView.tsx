import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateCssGrid, GridOptions } from '../../engines/design/gridTools';

export const GridView: React.FC = () => {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(2);
  const [columnGap, setColumnGap] = useState(16);
  const [rowGap, setRowGap] = useState(16);
  const [colUnit, setColUnit] = useState<GridOptions['colUnit']>('fr');
  const [rowUnit, setRowUnit] = useState<GridOptions['rowUnit']>('auto');

  const { cssProperties, tailwindClasses } = generateCssGrid({
    columns,
    rows,
    columnGapPx: columnGap,
    rowGapPx: rowGap,
    colUnit,
    rowUnit
  });

  const totalCells = columns * rows;

  return (
    <ToolShell
      title="CSS Grid Layout Generator"
      category="design"
      description="Design responsive CSS Grid structures with live preview, fr/auto unit controls, and Tailwind utility classes."
      icon="▦"
      onReset={() => {
        setColumns(3);
        setRows(2);
        setColumnGap(16);
        setRowGap(16);
        setColUnit('fr');
        setRowUnit('auto');
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Columns</label>
            <input
              type="number"
              min="1"
              max="12"
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Rows</label>
            <input
              type="number"
              min="1"
              max="8"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Col Gap (px)</label>
            <input
              type="number"
              value={columnGap}
              onChange={(e) => setColumnGap(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Row Gap (px)</label>
            <input
              type="number"
              value={rowGap}
              onChange={(e) => setRowGap(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-100 font-mono focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Live Grid Preview</label>
          <div
            className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl min-h-[160px]"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, minmax(40px, auto))`,
              gap: `${rowGap}px ${columnGap}px`
            }}
          >
            {Array.from({ length: totalCells }).map((_, i) => (
              <div
                key={i}
                className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-center font-mono text-xs font-bold text-emerald-400"
              >
                Cell {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-mono text-neutral-400">CSS Properties</label>
              <CopyButton text={cssProperties} label="Copy CSS" />
            </div>
            <pre className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto">
              {cssProperties}
            </pre>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-mono text-neutral-400">Tailwind CSS Classes</label>
              <CopyButton text={tailwindClasses} label="Copy Tailwind" />
            </div>
            <pre className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-sky-400 overflow-x-auto">
              {tailwindClasses}
            </pre>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
