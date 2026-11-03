import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateBoxShadowCss, ShadowLayer } from '../../engines/design/boxShadow';

export const BoxShadowView: React.FC = () => {
  const [layers, setLayers] = useState<ShadowLayer[]>([
    { x: 0, y: 10, blur: 25, spread: -5, color: '#000000', opacity: 0.25, inset: false },
    { x: 0, y: 8, blur: 10, spread: -6, color: '#000000', opacity: 0.25, inset: false }
  ]);

  const css = generateBoxShadowCss(layers);

  const updateLayer = (index: number, key: keyof ShadowLayer, val: unknown) => {
    setLayers(prev => prev.map((l, i) => i === index ? { ...l, [key]: val } : l));
  };

  const addLayer = () => {
    setLayers(prev => [...prev, { x: 0, y: 4, blur: 6, spread: -1, color: '#000000', opacity: 0.1, inset: false }]);
  };

  const removeLayer = (index: number) => {
    setLayers(prev => prev.filter((_, i) => i !== index));
  };

  // Extract raw shadow value without 'box-shadow: ' and trailing ';'
  const shadowValue = css.replace(/^box-shadow:\s*/, '').replace(/;$/, '');

  return (
    <ToolShell
      title="CSS Box Shadow Generator"
      category="design"
      description="Design multi-layered smooth box shadows with live preview card and copyable CSS."
      icon="📦"
      onReset={() => setLayers([
        { x: 0, y: 10, blur: 25, spread: -5, color: '#000000', opacity: 0.25, inset: false }
      ])}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-center p-12 bg-neutral-900/50 rounded-xl border border-neutral-800">
          <div
            className="w-48 h-32 bg-neutral-900 rounded-xl flex items-center justify-center text-xs font-semibold text-neutral-300 border border-neutral-700/50 transition-shadow"
            style={{ boxShadow: shadowValue }}
          >
            Preview Card
          </div>
        </div>

        <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-neutral-400">CSS Code</span>
            <CopyButton text={css} />
          </div>
          <pre className="font-mono text-xs text-emerald-400 bg-neutral-900/50 p-2.5 rounded">
            {css}
          </pre>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-neutral-400">Shadow Layers ({layers.length})</span>
            <button
              onClick={addLayer}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
            >
              + Add Layer
            </button>
          </div>

          {layers.map((l, idx) => (
            <div key={idx} className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-emerald-400">Layer {idx + 1}</span>
                {layers.length > 1 && (
                  <button
                    onClick={() => removeLayer(idx)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="text-neutral-400 block mb-1">X Offset: {l.x}px</label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={l.x}
                    onChange={(e) => updateLayer(idx, 'x', parseInt(e.target.value, 10))}
                    className="w-full accent-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Y Offset: {l.y}px</label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={l.y}
                    onChange={(e) => updateLayer(idx, 'y', parseInt(e.target.value, 10))}
                    className="w-full accent-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Blur: {l.blur}px</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={l.blur}
                    onChange={(e) => updateLayer(idx, 'blur', parseInt(e.target.value, 10))}
                    className="w-full accent-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Spread: {l.spread}px</label>
                  <input
                    type="range"
                    min="-30"
                    max="50"
                    value={l.spread}
                    onChange={(e) => updateLayer(idx, 'spread', parseInt(e.target.value, 10))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
};
