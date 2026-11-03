import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { formatCubicBezier, BEZIER_PRESETS, CubicBezierPoints } from '../../engines/design/bezierTools';

export const BezierView: React.FC = () => {
  const [points, setPoints] = useState<CubicBezierPoints>(BEZIER_PRESETS['ease-out']);

  const bezierStr = formatCubicBezier(points);

  return (
    <ToolShell
      title="CSS Cubic-Bezier Easing Generator"
      category="design"
      description="Design custom transition timing functions and preview smooth animation physics."
      icon="📈"
      onReset={() => {
        setPoints(BEZIER_PRESETS['ease-out']);
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Preset Easing Curves</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(BEZIER_PRESETS).map(([name, pts]) => (
              <button
                key={name}
                onClick={() => setPoints(pts)}
                className="px-3 py-1.5 text-xs rounded-lg font-mono bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div>
            <label className="text-neutral-400">X1: {points.x1}</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={points.x1}
              onChange={(e) => setPoints({ ...points, x1: parseFloat(e.target.value) })}
              className="w-full accent-emerald-500"
            />
          </div>
          <div>
            <label className="text-neutral-400">Y1: {points.y1}</label>
            <input
              type="range"
              min="-0.5"
              max="1.5"
              step="0.01"
              value={points.y1}
              onChange={(e) => setPoints({ ...points, y1: parseFloat(e.target.value) })}
              className="w-full accent-emerald-500"
            />
          </div>
          <div>
            <label className="text-neutral-400">X2: {points.x2}</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={points.x2}
              onChange={(e) => setPoints({ ...points, x2: parseFloat(e.target.value) })}
              className="w-full accent-sky-500"
            />
          </div>
          <div>
            <label className="text-neutral-400">Y2: {points.y2}</label>
            <input
              type="range"
              min="-0.5"
              max="1.5"
              step="0.01"
              value={points.y2}
              onChange={(e) => setPoints({ ...points, y2: parseFloat(e.target.value) })}
              className="w-full accent-sky-500"
            />
          </div>
        </div>

        {/* Live animated preview bar */}
        <div className="p-6 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-4">
          <span className="text-xs font-mono text-neutral-500">Live Animation Test (Hover to Trigger)</span>
          <div className="group relative w-full h-12 bg-neutral-900 rounded-lg overflow-hidden cursor-pointer flex items-center px-2">
            <div
              style={{
                transitionTimingFunction: bezierStr,
                transitionDuration: '800ms'
              }}
              className="w-8 h-8 rounded-md bg-emerald-500 shadow-lg transform group-hover:translate-x-[calc(1000%-32px)] transition-transform flex items-center justify-center text-[10px] font-mono text-black font-bold"
            >
              ▶
            </div>
          </div>
        </div>

        {/* CSS rule */}
        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400">CSS Transition Snippet</span>
            <CopyButton text={`transition: all 400ms ${bezierStr};`} label="Copy CSS" />
          </div>
          <pre className="p-3 bg-neutral-900 rounded font-mono text-emerald-400 text-xs select-all">
            transition: all 400ms {bezierStr};
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};
