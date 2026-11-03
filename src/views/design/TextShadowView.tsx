import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateTextShadowCss, TextShadowLayer } from '../../engines/design/textShadowTools';

export const TextShadowView: React.FC = () => {
  const [layers, setLayers] = useState<TextShadowLayer[]>([
    { offsetX: 0, offsetY: 0, blur: 12, color: '#10b981' },
    { offsetX: 0, offsetY: 0, blur: 24, color: '#047857' }
  ]);
  const [sampleText, setSampleText] = useState('OMNIKIT');

  const res = generateTextShadowCss(layers);

  const PRESETS: { name: string; layers: TextShadowLayer[] }[] = [
    {
      name: 'Emerald Neon Glow',
      layers: [
        { offsetX: 0, offsetY: 0, blur: 8, color: '#34d399' },
        { offsetX: 0, offsetY: 0, blur: 20, color: '#059669' },
        { offsetX: 0, offsetY: 0, blur: 40, color: '#047857' }
      ]
    },
    {
      name: 'Cyberpunk Magenta',
      layers: [
        { offsetX: 2, offsetY: 2, blur: 0, color: '#06b6d4' },
        { offsetX: -2, offsetY: -2, blur: 0, color: '#ec4899' }
      ]
    },
    {
      name: '3D Extrusion',
      layers: [
        { offsetX: 1, offsetY: 1, blur: 0, color: '#334155' },
        { offsetX: 2, offsetY: 2, blur: 0, color: '#1e293b' },
        { offsetX: 3, offsetY: 3, blur: 0, color: '#0f172a' }
      ]
    },
    {
      name: 'Soft Drop',
      layers: [
        { offsetX: 0, offsetY: 4, blur: 12, color: 'rgba(0,0,0,0.8)' }
      ]
    }
  ];

  return (
    <ToolShell
      title="CSS Text Shadow & Neon Glow Generator"
      category="design"
      description="Design multi-layered typography shadows, neon glows, and 3D extruded lettering."
      icon="✨"
      onReset={() => {
        setLayers(PRESETS[0].layers);
        setSampleText('OMNIKIT');
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Shadow Presets</label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => setLayers(p.layers)}
                className="px-3 py-1.5 text-xs rounded-lg font-mono bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-1">Preview Headline</label>
          <input
            type="text"
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
          />
        </div>

        {/* Live Typography Stage */}
        <div className="p-8 bg-neutral-950/80 border border-neutral-800 rounded-2xl flex items-center justify-center min-h-[180px] overflow-hidden">
          <div
            style={{ textShadow: res.shadowValue }}
            className="text-4xl sm:text-6xl font-black font-mono tracking-wider text-neutral-100 text-center select-none"
          >
            {sampleText || 'SHADOW'}
          </div>
        </div>

        {/* CSS rule */}
        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400">CSS Rule</span>
            <CopyButton text={res.fullCss} label="Copy CSS" />
          </div>
          <pre className="p-3 bg-neutral-900 rounded font-mono text-emerald-400 text-xs whitespace-pre-wrap select-all">
            {res.fullCss}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};
