import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateFilterCss, DEFAULT_FILTER_CONFIG, FilterConfig } from '../../engines/design/filterTools';

export const FilterView: React.FC = () => {
  const [cfg, setCfg] = useState<FilterConfig>(DEFAULT_FILTER_CONFIG);

  const res = generateFilterCss(cfg);

  return (
    <ToolShell
      title="CSS Filter Effects Studio"
      category="design"
      description="Visual studio for CSS image filters (blur, contrast, grayscale, hue-rotate, sepia) with instant CSS snippets."
      icon="🪄"
      onReset={() => {
        setCfg(DEFAULT_FILTER_CONFIG);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div>
            <label className="text-neutral-400">Blur ({cfg.blurPx}px)</label>
            <input type="range" min="0" max="20" value={cfg.blurPx} onChange={e => setCfg({ ...cfg, blurPx: Number(e.target.value) })} className="w-full accent-emerald-500" />
          </div>
          <div>
            <label className="text-neutral-400">Brightness ({cfg.brightnessPercent}%)</label>
            <input type="range" min="0" max="200" value={cfg.brightnessPercent} onChange={e => setCfg({ ...cfg, brightnessPercent: Number(e.target.value) })} className="w-full accent-emerald-500" />
          </div>
          <div>
            <label className="text-neutral-400">Contrast ({cfg.contrastPercent}%)</label>
            <input type="range" min="0" max="200" value={cfg.contrastPercent} onChange={e => setCfg({ ...cfg, contrastPercent: Number(e.target.value) })} className="w-full accent-sky-500" />
          </div>
          <div>
            <label className="text-neutral-400">Grayscale ({cfg.grayscalePercent}%)</label>
            <input type="range" min="0" max="100" value={cfg.grayscalePercent} onChange={e => setCfg({ ...cfg, grayscalePercent: Number(e.target.value) })} className="w-full accent-sky-500" />
          </div>
          <div>
            <label className="text-neutral-400">Hue Rotate ({cfg.hueRotateDeg}°)</label>
            <input type="range" min="0" max="360" value={cfg.hueRotateDeg} onChange={e => setCfg({ ...cfg, hueRotateDeg: Number(e.target.value) })} className="w-full accent-amber-500" />
          </div>
          <div>
            <label className="text-neutral-400">Invert ({cfg.invertPercent}%)</label>
            <input type="range" min="0" max="100" value={cfg.invertPercent} onChange={e => setCfg({ ...cfg, invertPercent: Number(e.target.value) })} className="w-full accent-amber-500" />
          </div>
          <div>
            <label className="text-neutral-400">Saturate ({cfg.saturatePercent}%)</label>
            <input type="range" min="0" max="300" value={cfg.saturatePercent} onChange={e => setCfg({ ...cfg, saturatePercent: Number(e.target.value) })} className="w-full accent-rose-500" />
          </div>
          <div>
            <label className="text-neutral-400">Sepia ({cfg.sepiaPercent}%)</label>
            <input type="range" min="0" max="100" value={cfg.sepiaPercent} onChange={e => setCfg({ ...cfg, sepiaPercent: Number(e.target.value) })} className="w-full accent-rose-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">CSS Filter Property</span>
                <CopyButton text={res.fullCss} label="Copy CSS" />
              </div>
              <pre className="p-3 bg-neutral-900 rounded font-mono text-emerald-400 text-xs whitespace-pre-wrap select-all">
                {res.fullCss}
              </pre>
            </div>
          </div>

          {/* Visual card preview */}
          <div className="p-6 bg-neutral-950/60 border border-neutral-800 rounded-2xl flex flex-col items-center justify-center min-h-[220px]">
            <div
              style={{ filter: res.filterValue }}
              className="w-56 h-36 bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 rounded-xl shadow-xl flex flex-col items-center justify-center p-4 text-white text-center transition-all"
            >
              <div className="text-base font-bold font-mono">FILTER TEST</div>
              <div className="text-xs opacity-90 mt-1">Live Filtered Canvas</div>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
