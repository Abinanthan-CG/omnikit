import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateColorShades } from '../../engines/design/paletteTools';

export const PaletteView: React.FC = () => {
  const [baseHex, setBaseHex] = useState('#3b82f6');

  const shades = generateColorShades(baseHex);
  const tailwindObj = `colors: {\n  brand: {\n${shades.map(s => `    ${s.step}: '${s.hex}',`).join('\n')}\n  }\n}`;

  return (
    <ToolShell
      title="Color Palette Shades Generator"
      category="design"
      description="Generate full 50–950 tint and shade scales from a single brand color for Tailwind and UI design systems."
      icon="🎨"
      onReset={() => setBaseHex('#3b82f6')}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl">
          <input
            type="color"
            value={baseHex}
            onChange={(e) => setBaseHex(e.target.value)}
            className="w-12 h-12 rounded cursor-pointer bg-transparent border-0"
          />
          <div className="flex-1">
            <label className="block text-xs text-neutral-400 mb-1">Base Hex Color</label>
            <input
              type="text"
              value={baseHex}
              onChange={(e) => setBaseHex(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm text-neutral-100 font-mono focus:outline-none focus:border-emerald-500 w-36"
            />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-neutral-400">Generated Shade Steps</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
            {shades.map(s => (
              <div key={s.step} className="p-2 bg-neutral-950 border border-neutral-800 rounded-lg space-y-1.5 text-center">
                <div
                  className="w-full h-10 rounded shadow-sm border border-black/10"
                  style={{ backgroundColor: s.hex }}
                />
                <div className="text-xs font-mono font-bold text-neutral-200">{s.step}</div>
                <div className="text-[10px] font-mono text-neutral-400">{s.hex}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-neutral-400 font-semibold font-mono">Tailwind Config Object</span>
            <CopyButton text={tailwindObj} />
          </div>
          <pre className="font-mono text-xs text-emerald-400 bg-neutral-900/50 p-2.5 rounded">
            {tailwindObj}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};
