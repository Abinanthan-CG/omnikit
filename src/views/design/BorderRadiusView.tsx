import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateBorderRadiusCss } from '../../engines/design/borderRadiusTools';

export const BorderRadiusView: React.FC = () => {
  const [tlX, setTlX] = useState(30);
  const [trX, setTrX] = useState(70);
  const [brX, setBrX] = useState(70);
  const [blX, setBlX] = useState(30);

  const [tlY, setTlY] = useState(30);
  const [trY, setTrY] = useState(30);
  const [brY, setBrY] = useState(70);
  const [blY, setBlY] = useState(70);

  const res = generateBorderRadiusCss({ tlX, trX, brX, blX, tlY, trY, brY, blY });

  const PRESETS = [
    { label: 'Organic Blob', values: [30, 70, 70, 30, 30, 30, 70, 70] },
    { label: 'Leaf Shape', values: [0, 100, 0, 100, 0, 100, 0, 100] },
    { label: 'Egg Drop', values: [50, 50, 50, 50, 60, 60, 40, 40] },
    { label: 'Pebble Stone', values: [60, 40, 70, 30, 30, 70, 40, 60] },
  ];

  const applyPreset = (v: number[]) => {
    setTlX(v[0]); setTrX(v[1]); setBrX(v[2]); setBlX(v[3]);
    setTlY(v[4]); setTrY(v[5]); setBrY(v[6]); setBlY(v[7]);
  };

  return (
    <ToolShell
      title="CSS 8-Value Border Radius & Blob Generator"
      category="design"
      description="Design organic fluid blob shapes using advanced CSS 8-value border-radius properties."
      icon="🫧"
      onReset={() => {
        applyPreset([30, 70, 70, 30, 30, 30, 70, 70]);
      }}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => applyPreset(p.values)}
              className="px-3 py-1.5 text-xs rounded-lg font-mono bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Sliders */}
          <div className="space-y-4">
            <span className="text-xs font-mono text-neutral-400 block">Horizontal Radii (%)</span>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <label className="text-neutral-500">Top-Left X: {tlX}%</label>
                <input type="range" min="0" max="100" value={tlX} onChange={e => setTlX(Number(e.target.value))} className="w-full accent-emerald-500" />
              </div>
              <div>
                <label className="text-neutral-500">Top-Right X: {trX}%</label>
                <input type="range" min="0" max="100" value={trX} onChange={e => setTrX(Number(e.target.value))} className="w-full accent-emerald-500" />
              </div>
              <div>
                <label className="text-neutral-500">Bottom-Right X: {brX}%</label>
                <input type="range" min="0" max="100" value={brX} onChange={e => setBrX(Number(e.target.value))} className="w-full accent-emerald-500" />
              </div>
              <div>
                <label className="text-neutral-500">Bottom-Left X: {blX}%</label>
                <input type="range" min="0" max="100" value={blX} onChange={e => setBlX(Number(e.target.value))} className="w-full accent-emerald-500" />
              </div>
            </div>

            <span className="text-xs font-mono text-neutral-400 block pt-2">Vertical Radii (%)</span>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <label className="text-neutral-500">Top-Left Y: {tlY}%</label>
                <input type="range" min="0" max="100" value={tlY} onChange={e => setTlY(Number(e.target.value))} className="w-full accent-sky-500" />
              </div>
              <div>
                <label className="text-neutral-500">Top-Right Y: {trY}%</label>
                <input type="range" min="0" max="100" value={trY} onChange={e => setTrY(Number(e.target.value))} className="w-full accent-sky-500" />
              </div>
              <div>
                <label className="text-neutral-500">Bottom-Right Y: {brY}%</label>
                <input type="range" min="0" max="100" value={brY} onChange={e => setBrY(Number(e.target.value))} className="w-full accent-sky-500" />
              </div>
              <div>
                <label className="text-neutral-500">Bottom-Left Y: {blY}%</label>
                <input type="range" min="0" max="100" value={blY} onChange={e => setBlY(Number(e.target.value))} className="w-full accent-sky-500" />
              </div>
            </div>
          </div>

          {/* Interactive Preview Shape */}
          <div className="flex flex-col items-center justify-center p-6 bg-neutral-950/60 border border-neutral-800 rounded-2xl min-h-[260px]">
            <div
              style={{ borderRadius: res.cssValue }}
              className="w-48 h-48 bg-gradient-to-tr from-emerald-600 via-teal-500 to-sky-400 shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              <span className="text-xs font-mono text-neutral-950 font-bold opacity-80">CSS BLOB</span>
            </div>
          </div>
        </div>

        {/* Code output */}
        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400">Generated CSS Rule</span>
            <CopyButton text={res.fullCss} label="Copy CSS" />
          </div>
          <pre className="p-3 bg-neutral-900 rounded font-mono text-emerald-400 text-xs select-all">
            {res.fullCss}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};
