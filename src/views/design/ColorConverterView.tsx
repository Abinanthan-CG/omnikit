import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { hexToRgb, rgbToHex, rgbToHsl } from '../../engines/design/colorConverter';

export const ColorConverterView: React.FC = () => {
  const [hex, setHex] = useState('#10b981');

  const rgb = hexToRgb(hex) || { r: 16, g: 185, b: 129 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const hexVal = rgbToHex(rgb.r, rgb.g, rgb.b);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const cssVars = `--color-primary: ${hexVal};\n--color-primary-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};`;

  const PRESETS = ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#06b6d4', '#64748b'];

  return (
    <ToolShell
      title="Color Format Converter"
      category="design"
      description="Convert between HEX, RGB, HSL color spaces with live preview and CSS tokens."
      icon="🎨"
      onReset={() => setHex('#10b981')}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-neutral-950/70 border border-neutral-800 rounded-lg">
          <div
            className="w-20 h-20 rounded-xl shadow-lg border border-neutral-700/60 shrink-0"
            style={{ backgroundColor: hexVal }}
          />
          <div className="flex-1 w-full space-y-2">
            <label className="block text-xs text-neutral-400">Color Hex / Color Picker</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={hexVal}
                onChange={(e) => setHex(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-100 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex gap-1.5 pt-1">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => setHex(p)}
                  className="w-5 h-5 rounded-full border border-white/20 hover:scale-110 transition-transform"
                  style={{ backgroundColor: p }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-emerald-400 font-mono">HEX</span>
              <CopyButton text={hexVal} />
            </div>
            <div className="font-mono text-sm text-neutral-100">{hexVal}</div>
          </div>

          <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-emerald-400 font-mono">RGB</span>
              <CopyButton text={rgbString} />
            </div>
            <div className="font-mono text-sm text-neutral-100">{rgbString}</div>
          </div>

          <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-emerald-400 font-mono">HSL</span>
              <CopyButton text={hslString} />
            </div>
            <div className="font-mono text-sm text-neutral-100">{hslString}</div>
          </div>
        </div>

        <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-neutral-400">CSS Tokens</span>
            <CopyButton text={cssVars} />
          </div>
          <pre className="font-mono text-xs text-neutral-300 bg-neutral-900/50 p-3 rounded">
            {cssVars}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};
