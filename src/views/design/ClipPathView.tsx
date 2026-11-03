import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generatePolygonCss, CLIP_PRESETS, ClipPoint } from '../../engines/design/clipPathTools';

export const ClipPathView: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState('Chevron');
  const [points, setPoints] = useState<ClipPoint[]>(CLIP_PRESETS.Chevron);

  const res = generatePolygonCss(points);

  const choosePreset = (name: string) => {
    setSelectedPreset(name);
    setPoints(CLIP_PRESETS[name] || CLIP_PRESETS.Triangle);
  };

  return (
    <ToolShell
      title="CSS Clip-Path Polygon Generator"
      category="design"
      description="Design geometric UI mask polygons and cutouts with live vector shape preview."
      icon="✂️"
      onReset={() => {
        choosePreset('Chevron');
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Preset Polygons</label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(CLIP_PRESETS).map((name) => (
              <button
                key={name}
                onClick={() => choosePreset(name)}
                className={`px-3 py-1.5 text-xs rounded-lg font-mono border transition-all ${
                  selectedPreset === name
                    ? 'bg-neutral-800 border-neutral-600 text-emerald-400 font-bold'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Output snippets */}
          <div className="space-y-4">
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">CSS Rule</span>
                <CopyButton text={res.fullCss} label="Copy CSS" />
              </div>
              <pre className="p-3 bg-neutral-900 rounded font-mono text-emerald-400 text-xs whitespace-pre-wrap select-all">
                {res.fullCss}
              </pre>
            </div>

            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
              <span className="text-xs font-mono text-neutral-400">Polygon Vertices ({points.length} points)</span>
              <div className="max-h-40 overflow-y-auto space-y-1 text-xs font-mono">
                {points.map((pt, idx) => (
                  <div key={idx} className="flex justify-between p-1.5 bg-neutral-900 rounded text-neutral-300">
                    <span>Point #{idx + 1}</span>
                    <span className="text-emerald-400">X: {pt.x}% | Y: {pt.y}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive visual preview */}
          <div className="p-6 bg-neutral-950/60 border border-neutral-800 rounded-2xl flex flex-col items-center justify-center min-h-[260px]">
            <span className="text-xs font-mono text-neutral-500 mb-3">Live Clipped Shape</span>
            <div
              style={{ clipPath: res.polygonValue }}
              className="w-56 h-56 bg-gradient-to-br from-emerald-500 via-teal-500 to-indigo-600 shadow-2xl transition-all duration-300 flex items-center justify-center"
            >
              <span className="text-xs font-mono font-bold text-neutral-950 opacity-80">CLIPPED</span>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
