import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { calculateAspectRatio } from '../../engines/video/aspectRatio';

const PRESETS = [
  { label: '4K UHD (3840x2160)', w: 3840, h: 2160 },
  { label: 'Full HD (1920x1080)', w: 1920, h: 1080 },
  { label: 'Vertical / TikTok (1080x1920)', w: 1080, h: 1920 },
  { label: 'Square (1080x1080)', w: 1080, h: 1080 },
  { label: 'Ultrawide (3440x1440)', w: 3440, h: 1440 },
  { label: 'Scope 2.39:1 (2048x858)', w: 2048, h: 858 },
];

export const AspectRatioView: React.FC = () => {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [containerRatio, setContainerRatio] = useState('16:9');

  const result = calculateAspectRatio(width, height, containerRatio);

  return (
    <ToolShell
      title="Aspect Ratio & Letterbox Calculator"
      category="video"
      description="Compute simplified aspect ratios, decimal fractions, and letterbox/pillarbox padding pixels."
      icon="📐"
      onReset={() => {
        setWidth(1920);
        setHeight(1080);
      }}
    >
      <div className="space-y-6">
        {/* Presets */}
        <div>
          <label className="text-xs text-neutral-400 mb-2 block">Quick Resolution Presets:</label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setWidth(p.w);
                  setHeight(p.h);
                }}
                className="px-2.5 py-1 text-xs bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-md text-neutral-300 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Width (px)</label>
            <input
              type="number"
              value={width || ''}
              onChange={(e) => setWidth(parseInt(e.target.value, 10) || 0)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-lg font-mono text-neutral-100 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Height (px)</label>
            <input
              type="number"
              value={height || ''}
              onChange={(e) => setHeight(parseInt(e.target.value, 10) || 0)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-lg font-mono text-neutral-100 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Target Container</label>
            <select
              value={containerRatio}
              onChange={(e) => setContainerRatio(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm font-mono text-neutral-100 focus:outline-none focus:border-emerald-500"
            >
              <option value="16:9">16:9 Container</option>
              <option value="9:16">9:16 Vertical</option>
              <option value="4:3">4:3 Classic</option>
              <option value="1:1">1:1 Square</option>
            </select>
          </div>
        </div>

        {/* Error Alert */}
        {!result.success && (
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-xs">
            {result.error || 'Invalid width or height entered.'}
          </div>
        )}

        {/* Results Card */}
        {result.success && result.value && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-neutral-950/80 border border-neutral-800">
            <div>
              <div className="text-xs text-neutral-400">Aspect Ratio</div>
              <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">
                {result.value.ratioString}
              </div>
              <div className="text-xs text-neutral-500 mt-0.5">
                {result.value.closestStandard}
              </div>
            </div>

            <div>
              <div className="text-xs text-neutral-400">Decimal Multiplier</div>
              <div className="text-2xl font-mono font-bold text-neutral-100 mt-1">
                {result.value.decimal}:1
              </div>
              <div className="text-xs text-neutral-500 mt-0.5">
                W / H = {result.value.decimal}
              </div>
            </div>

            <div>
              <div className="text-xs text-neutral-400">Letterbox / Pillarbox</div>
              <div className="text-sm font-mono text-neutral-200 mt-2">
                Top/Bottom: {result.value.letterboxPadding.top}px
              </div>
              <div className="text-sm font-mono text-neutral-200">
                Left/Right: {result.value.letterboxPadding.left}px
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
};
