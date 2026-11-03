import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { calculateClamp } from '../../engines/design/clampTools';

export const ClampView: React.FC = () => {
  const [minWidth, setMinWidth] = useState(375);
  const [maxWidth, setMaxWidth] = useState(1280);
  const [minSize, setMinSize] = useState(16);
  const [maxSize, setMaxSize] = useState(24);
  const [rootSize, setRootSize] = useState(16);

  const res = calculateClamp({
    minWidth,
    maxWidth,
    minSize,
    maxSize,
    rootFontSize: rootSize
  });

  return (
    <ToolShell
      title="CSS Clamp() Fluid Typography Calculator"
      category="design"
      description="Calculate fluid clamp() formulas for responsive typography and spacing across any viewport range."
      icon="📐"
      onReset={() => {
        setMinWidth(375);
        setMaxWidth(1280);
        setMinSize(16);
        setMaxSize(24);
        setRootSize(16);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Min Viewport (px)</label>
            <input
              type="number"
              value={minWidth}
              onChange={(e) => setMinWidth(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Max Viewport (px)</label>
            <input
              type="number"
              value={maxWidth}
              onChange={(e) => setMaxWidth(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Min Font (px)</label>
            <input
              type="number"
              value={minSize}
              onChange={(e) => setMinSize(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Max Font (px)</label>
            <input
              type="number"
              value={maxSize}
              onChange={(e) => setMaxSize(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-xs text-neutral-400 mb-1">Root Base (px)</label>
            <input
              type="number"
              value={rootSize}
              onChange={(e) => setRootSize(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            />
          </div>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-mono">Generated CSS Rule</span>
            <CopyButton text={`font-size: ${res.clampCss};`} label="Copy font-size" />
          </div>
          <div className="p-3 bg-neutral-900 rounded-lg font-mono text-emerald-400 text-sm select-all">
            font-size: {res.clampCss};
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono text-neutral-400">
            <div>Min Limit: <span className="text-neutral-200">{res.minRem} ({minSize}px)</span></div>
            <div>Max Limit: <span className="text-neutral-200">{res.maxRem} ({maxSize}px)</span></div>
            <div>Slope: <span className="text-neutral-200">{res.slope}</span></div>
            <div>Intersection: <span className="text-neutral-200">{res.intersection}px</span></div>
          </div>
        </div>

        {/* Live scaling preview */}
        <div className="p-6 bg-neutral-950/60 border border-neutral-800 rounded-xl">
          <span className="block text-xs text-neutral-500 font-mono mb-2">Live Fluid Preview Demo</span>
          <div
            style={{ fontSize: res.clampCss }}
            className="font-medium text-neutral-100 transition-all leading-tight"
          >
            Responsive Fluid Heading Text
          </div>
          <p className="text-xs text-neutral-400 mt-2">
            Resize your browser window or test zoom to witness this text smoothly scaling between {minSize}px and {maxSize}px.
          </p>
        </div>
      </div>
    </ToolShell>
  );
};
