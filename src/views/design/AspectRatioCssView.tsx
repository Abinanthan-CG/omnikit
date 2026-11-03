import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateAspectRatioCss } from '../../engines/design/aspectRatioCssTools';

export const AspectRatioCssView: React.FC = () => {
  const [width, setWidth] = useState(16);
  const [height, setHeight] = useState(9);

  const res = generateAspectRatioCss(width, height);

  const PRESETS = [
    { label: '16:9 Video', w: 16, h: 9 },
    { label: '9:16 Story / Reel', w: 9, h: 16 },
    { label: '4:3 Standard', w: 4, h: 3 },
    { label: '1:1 Square', w: 1, h: 1 },
    { label: '21:9 Ultrawide', w: 21, h: 9 },
    { label: '2.39:1 Anamorphic', w: 239, h: 100 },
  ];

  return (
    <ToolShell
      title="CSS Aspect-Ratio Rule Generator"
      category="design"
      description="Generate modern CSS aspect-ratio properties and legacy padding-top container hack snippets."
      icon="📐"
      onReset={() => {
        setWidth(16);
        setHeight(9);
      }}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setWidth(p.w);
                setHeight(p.h);
              }}
              className={`px-3 py-1.5 text-xs rounded-lg font-mono transition-all border ${
                width === p.w && height === p.h
                  ? 'bg-neutral-800 border-neutral-600 text-neutral-100 font-semibold'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Ratio Width</label>
            <input
              type="number"
              min="1"
              value={width}
              onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Ratio Height</label>
            <input
              type="number"
              min="1"
              value={height}
              onChange={(e) => setHeight(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Output snippets */}
          <div className="space-y-4">
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">Modern CSS (Standard)</span>
                <CopyButton text={res.modernCss} label="Copy CSS" />
              </div>
              <pre className="p-3 bg-neutral-900 rounded font-mono text-emerald-400 text-xs">
                {res.modernCss}
              </pre>
            </div>

            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">Tailwind CSS Utility</span>
                <CopyButton text={res.tailwindClass} label="Copy Tailwind" />
              </div>
              <pre className="p-3 bg-neutral-900 rounded font-mono text-sky-400 text-xs">
                {res.tailwindClass}
              </pre>
            </div>

            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">Legacy Fallback (Padding Hack: {res.paddingPercent})</span>
                <CopyButton text={res.legacyCss} label="Copy Legacy CSS" />
              </div>
              <pre className="p-3 bg-neutral-900 rounded font-mono text-neutral-300 text-xs max-h-36 overflow-y-auto">
                {res.legacyCss}
              </pre>
            </div>
          </div>

          {/* Visual container preview */}
          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl flex flex-col items-center justify-center min-h-[240px]">
            <span className="text-xs text-neutral-500 font-mono mb-3">Live Box Proportion ({res.width}:{res.height})</span>
            <div
              style={{ aspectRatio: `${res.width} / ${res.height}` }}
              className="w-full max-w-[280px] max-h-[220px] bg-neutral-900 border-2 border-dashed border-emerald-500/60 rounded-xl flex items-center justify-center p-4 transition-all"
            >
              <span className="text-xs font-mono text-emerald-400 text-center">
                {res.width} : {res.height}
                <br />
                <span className="text-neutral-500 text-[10px]">{res.ratio}:1</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
