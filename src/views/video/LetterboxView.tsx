import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { calculateMatte } from '../../engines/video/letterboxTools';

const SOURCE_PRESETS = [
  { name: '2.39:1 Anamorphic Cinema', w: 239, h: 100 },
  { name: '1.85:1 Academy Flat', w: 185, h: 100 },
  { name: '16:9 Standard HD/4K', w: 16, h: 9 },
  { name: '4:3 Classic TV / Academy', w: 4, h: 3 },
  { name: '9:16 Vertical Reel', w: 9, h: 16 }
];

const CONTAINER_PRESETS = [
  { name: '1920×1080 (16:9 FHD)', w: 1920, h: 1080 },
  { name: '3840×2160 (16:9 4K)', w: 3840, h: 2160 },
  { name: '1080×1920 (9:16 Vertical)', w: 1080, h: 1920 },
  { name: '1080×1080 (1:1 Square)', w: 1080, h: 1080 }
];

export const LetterboxView: React.FC = () => {
  const [sourceW, setSourceW] = useState(239);
  const [sourceH, setSourceH] = useState(100);
  const [containerW, setContainerW] = useState(1920);
  const [containerH, setContainerH] = useState(1080);

  const matte = calculateMatte(sourceW, sourceH, containerW, containerH);

  return (
    <ToolShell
      title="Video Letterbox & Pillarbox Matte Visualizer"
      category="video"
      description="Calculate exact matte bar dimensions (top/bottom or pillarbox left/right) and active screen surface efficiency."
      icon="🎞️"
      onReset={() => {
        setSourceW(239);
        setSourceH(100);
        setContainerW(1920);
        setContainerH(1080);
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Source Aspect Presets</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {SOURCE_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setSourceW(p.w);
                  setSourceH(p.h);
                }}
                className="p-2.5 bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-left text-neutral-300 transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Display Container Presets</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CONTAINER_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setContainerW(p.w);
                  setContainerH(p.h);
                }}
                className="p-2.5 bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-left text-neutral-300 transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Source Aspect W</label>
            <input
              type="number"
              value={sourceW}
              onChange={(e) => setSourceW(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Source Aspect H</label>
            <input
              type="number"
              value={sourceH}
              onChange={(e) => setSourceH(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Container W (px)</label>
            <input
              type="number"
              value={containerW}
              onChange={(e) => setContainerW(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Container H (px)</label>
            <input
              type="number"
              value={containerH}
              onChange={(e) => setContainerH(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-100 font-mono focus:outline-none"
            />
          </div>
        </div>

        <div className="p-5 bg-neutral-950/80 border border-neutral-800 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <span className="text-xs text-neutral-500 font-mono">Matte Result</span>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1 capitalize">{matte.type}</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              {matte.type === 'letterbox' ? `${matte.topBottomBarPx}px top & bot` : matte.type === 'pillarbox' ? `${matte.leftRightBarPx}px left & right` : 'No black bars'}
            </div>
          </div>
          <div>
            <span className="text-xs text-neutral-500 font-mono">Active Picture Area</span>
            <div className="text-xl font-bold font-mono text-sky-400 mt-1">
              {matte.contentWidth} × {matte.contentHeight}
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Scaled video frame</div>
          </div>
          <div>
            <span className="text-xs text-neutral-500 font-mono">Screen Utilization</span>
            <div className="text-xl font-bold font-mono text-purple-400 mt-1">{matte.activeAreaPercent}%</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Active display ratio</div>
          </div>
          <div>
            <span className="text-xs text-neutral-500 font-mono">Matte Waste Area</span>
            <div className="text-xl font-bold font-mono text-amber-400 mt-1">{matte.matteWastePercent}%</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Black bar percentage</div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
