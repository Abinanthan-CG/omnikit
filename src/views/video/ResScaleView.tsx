import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { scaleResolution, scaleToWidth } from '../../engines/video/resScaleTools';

const COMMON_RESOLUTIONS = [
  { name: '4K UHD (3840x2160)', w: 3840, h: 2160 },
  { name: '1080p FHD (1920x1080)', w: 1920, h: 1080 },
  { name: '720p HD (1280x720)', w: 1280, h: 720 },
  { name: 'Vertical Reel (1080x1920)', w: 1080, h: 1920 },
  { name: 'Cinema 4K DCI (4096x2160)', w: 4096, h: 2160 },
  { name: 'Square (1080x1080)', w: 1080, h: 1080 }
];

export const ResScaleView: React.FC = () => {
  const [width, setWidth] = useState(3840);
  const [height, setHeight] = useState(2160);
  const [mode, setMode] = useState<'percent' | 'targetWidth'>('percent');
  const [percent, setPercent] = useState(50);
  const [targetWidth, setTargetWidth] = useState(1920);

  const scaled = mode === 'percent'
    ? scaleResolution(width, height, percent)
    : scaleToWidth(width, height, targetWidth);

  return (
    <ToolShell
      title="Video Resolution & Proxy Scaler"
      category="video"
      description="Calculate proportional downscaling, proxy dimensions, aspect ratio parity, and pixel counts for video codecs."
      icon="📐"
      onReset={() => {
        setWidth(3840);
        setHeight(2160);
        setMode('percent');
        setPercent(50);
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Preset Resolutions</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {COMMON_RESOLUTIONS.map((r) => (
              <button
                key={r.name}
                onClick={() => {
                  setWidth(r.w);
                  setHeight(r.h);
                }}
                className="py-2 px-3 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-left text-neutral-300 transition-colors"
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Source Width (px)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none focus:border-neutral-600"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Source Height (px)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none focus:border-neutral-600"
            />
          </div>
        </div>

        <div className="flex gap-2 border-b border-neutral-800 pb-3">
          <button
            onClick={() => setMode('percent')}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-colors ${
              mode === 'percent'
                ? 'bg-neutral-800 text-neutral-100'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Scale by Percentage (Proxy)
          </button>
          <button
            onClick={() => setMode('targetWidth')}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-colors ${
              mode === 'targetWidth'
                ? 'bg-neutral-800 text-neutral-100'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Scale to Target Width
          </button>
        </div>

        {mode === 'percent' ? (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono text-neutral-400">Scale Factor: {percent}%</label>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={percent}
              onChange={(e) => setPercent(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] font-mono text-neutral-500 mt-1">
              <span>25% (1/4 proxy)</span>
              <span>50% (half proxy)</span>
              <span>100% (original)</span>
              <span>200% (2x upscale)</span>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Target Output Width (px)</label>
            <input
              type="number"
              value={targetWidth}
              onChange={(e) => setTargetWidth(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none focus:border-neutral-600"
            />
          </div>
        )}

        <div className="p-5 bg-neutral-950/80 border border-neutral-800 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <span className="text-xs text-neutral-500 font-mono">Scaled Resolution</span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1">
              {scaled.width} × {scaled.height}
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Even pixel dimensions</div>
          </div>

          <div>
            <span className="text-xs text-neutral-500 font-mono">Aspect Ratio</span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-sky-400 mt-1">
              {scaled.aspectRatio}
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Preserved geometry</div>
          </div>

          <div>
            <span className="text-xs text-neutral-500 font-mono">Total Pixels</span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-purple-400 mt-1">
              {scaled.totalPixels.toLocaleString()}
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">px per frame</div>
          </div>

          <div>
            <span className="text-xs text-neutral-500 font-mono">Megapixels</span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400 mt-1">
              {scaled.megapixels} MP
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Sensor area equivalent</div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
