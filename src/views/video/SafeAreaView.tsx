import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { calculateSafeAreas } from '../../engines/video/safeArea';

export const SafeAreaView: React.FC = () => {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);

  const safe = calculateSafeAreas(width, height);

  const PRESETS = [
    { label: '1080p FHD (16:9)', w: 1920, h: 1080 },
    { label: '4K UHD (16:9)', w: 3840, h: 2160 },
    { label: 'TikTok / Reels (9:16)', w: 1080, h: 1920 },
    { label: 'Square (1:1)', w: 1080, h: 1080 },
  ];

  return (
    <ToolShell
      title="Video Safe Area Overlay Guide"
      category="video"
      description="Calculate broadcast SMPTE Action Safe (90%), Title Safe (80%), and social media UI exclusions."
      icon="📺"
      onReset={() => {
        setWidth(1920);
        setHeight(1080);
      }}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => {
                setWidth(p.w);
                setHeight(p.h);
              }}
              className="px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-300 hover:border-neutral-700 font-medium"
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Canvas Width (px)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Canvas Height (px)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-emerald-400">Action Safe Area (90%)</span>
              <CopyButton text={`${safe.actionSafe.width}x${safe.actionSafe.height}`} />
            </div>
            <div className="font-mono text-sm text-neutral-100">
              {safe.actionSafe.width} × {safe.actionSafe.height} px
            </div>
            <div className="text-xs text-neutral-500 font-mono">
              Margin: {safe.actionSafe.left}px (L/R) | {safe.actionSafe.top}px (T/B)
            </div>
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-amber-400">Title Safe Area (80%)</span>
              <CopyButton text={`${safe.titleSafe.width}x${safe.titleSafe.height}`} />
            </div>
            <div className="font-mono text-sm text-neutral-100">
              {safe.titleSafe.width} × {safe.titleSafe.height} px
            </div>
            <div className="text-xs text-neutral-500 font-mono">
              Margin: {safe.titleSafe.left}px (L/R) | {safe.titleSafe.top}px (T/B)
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
