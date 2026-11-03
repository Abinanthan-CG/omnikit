import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateGlowCardCss } from '../../engines/design/glowCardTools';

export const GlowCardView: React.FC = () => {
  const [color, setColor] = useState('#06b6d4');
  const [spread, setSpread] = useState(30);
  const [opacity, setOpacity] = useState(0.6);
  const [radius, setRadius] = useState(20);

  const { cssProperties } = generateGlowCardCss({
    glowColor: color,
    glowSpreadPx: spread,
    glowOpacity: opacity,
    borderRadiusPx: radius,
    borderWidthPx: 1,
    bgOpacity: 0.85
  });

  return (
    <ToolShell
      title="Cyberpunk Neon Glow Card Designer"
      category="design"
      description="Design modern glowing cards with ambient outer drop glows, interior edge highlights, and blur backdrop filters."
      icon="✨"
      onReset={() => {
        setColor('#06b6d4');
        setSpread(30);
        setOpacity(0.6);
        setRadius(20);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Glow Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 bg-neutral-950 border border-neutral-800 rounded-xl p-1 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Spread: {spread}px</label>
            <input
              type="range"
              min="5"
              max="60"
              value={spread}
              onChange={(e) => setSpread(Number(e.target.value))}
              className="w-full accent-emerald-500 mt-2"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Intensity: {Math.round(opacity * 100)}%</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full accent-emerald-500 mt-2"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Border Radius: {radius}px</label>
            <input
              type="range"
              min="4"
              max="40"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-emerald-500 mt-2"
            />
          </div>
        </div>

        <div className="py-8 flex justify-center bg-neutral-950/90 rounded-2xl border border-neutral-800/80">
          <div
            style={{
              borderRadius: radius,
              boxShadow: `0 0 ${spread}px ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}, inset 0 0 ${Math.round(spread / 2)}px ${color}33`,
              border: `1px solid ${color}`
            }}
            className="w-80 h-44 bg-neutral-900/90 p-5 flex flex-col justify-between transition-all"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold" style={{ color }}>NEON ACCESS KEY</span>
              <span className="text-[10px] font-mono text-neutral-400">OMNIKIT</span>
            </div>
            <div>
              <div className="text-lg font-bold text-neutral-100 font-mono tracking-wide">0x9F41 ··· 78B2</div>
              <div className="text-xs text-neutral-400 mt-1">Client-Side Cryptographic Vault</div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono text-neutral-400">Card CSS Rules</label>
            <CopyButton text={cssProperties} label="Copy CSS" />
          </div>
          <pre className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto">
            {cssProperties}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};
