import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateTriangleCss, TriangleDirection } from '../../engines/design/triangleTools';

export const TriangleView: React.FC = () => {
  const [direction, setDirection] = useState<TriangleDirection>('top');
  const [width, setWidth] = useState(30);
  const [height, setHeight] = useState(30);
  const [color, setColor] = useState('#10b981');

  const css = generateTriangleCss(direction, width, height, color);

  const DIRECTIONS: TriangleDirection[] = [
    'top', 'bottom', 'left', 'right',
    'top-left', 'top-right', 'bottom-left', 'bottom-right'
  ];

  return (
    <ToolShell
      title="CSS Triangle Generator"
      category="design"
      description="Create pure CSS border triangles in any direction with zero extra markup."
      icon="🔺"
      onReset={() => {
        setDirection('top');
        setWidth(30);
        setHeight(30);
        setColor('#10b981');
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-center p-12 bg-neutral-900/50 rounded-2xl border border-neutral-800 min-h-[160px]">
          <div
            style={{
              width: 0,
              height: 0,
              borderStyle: 'solid',
              ...(direction === 'top' && { borderWidth: `0 ${width / 2}px ${height}px ${width / 2}px`, borderColor: `transparent transparent ${color} transparent` }),
              ...(direction === 'bottom' && { borderWidth: `${height}px ${width / 2}px 0 ${width / 2}px`, borderColor: `${color} transparent transparent transparent` }),
              ...(direction === 'left' && { borderWidth: `${height / 2}px ${width}px ${height / 2}px 0`, borderColor: `transparent ${color} transparent transparent` }),
              ...(direction === 'right' && { borderWidth: `${height / 2}px 0 ${height / 2}px ${width}px`, borderColor: `transparent transparent transparent ${color}` }),
              ...(direction === 'top-left' && { borderWidth: `${height}px ${width}px 0 0`, borderColor: `${color} transparent transparent transparent` }),
              ...(direction === 'top-right' && { borderWidth: `0 ${width}px ${height}px 0`, borderColor: `transparent ${color} transparent transparent` }),
              ...(direction === 'bottom-left' && { borderWidth: `${height}px 0 0 ${width}px`, borderColor: `transparent transparent transparent ${color}` }),
              ...(direction === 'bottom-right' && { borderWidth: `0 0 ${height}px ${width}px`, borderColor: `transparent transparent ${color} transparent` }),
            }}
          />
        </div>

        <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-neutral-400 font-semibold">CSS Styles</span>
            <CopyButton text={css} />
          </div>
          <pre className="font-mono text-xs text-emerald-400 bg-neutral-900/50 p-3 rounded">
            {css}
          </pre>
        </div>

        <div className="space-y-3">
          <span className="text-xs text-neutral-400 font-semibold">Direction</span>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {DIRECTIONS.map(d => (
              <button
                key={d}
                onClick={() => setDirection(d)}
                className={`py-1.5 px-2 text-xs rounded-lg border capitalize transition-colors ${
                  direction === d ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Width ({width}px)</label>
            <input
              type="range"
              min="10"
              max="120"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Height ({height}px)</label>
            <input
              type="range"
              min="10"
              max="120"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 rounded bg-transparent border-0 cursor-pointer"
            />
            <span className="text-xs font-mono text-neutral-300">{color}</span>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
