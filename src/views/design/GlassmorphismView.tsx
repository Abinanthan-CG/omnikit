import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateGlassCss } from '../../engines/design/glassmorphismTools';

export const GlassmorphismView: React.FC = () => {
  const [blur, setBlur] = useState(16);
  const [transparency, setTransparency] = useState(0.25);
  const [borderOpacity, setBorderOpacity] = useState(0.2);

  const css = generateGlassCss({ blur, transparency, borderOpacity, backgroundColor: '#ffffff' });

  return (
    <ToolShell
      title="CSS Glassmorphism Generator"
      category="design"
      description="Design modern frosted glass UI cards with backdrop-filter blur and border highlights."
      icon="🧊"
      onReset={() => {
        setBlur(16);
        setTransparency(0.25);
        setBorderOpacity(0.2);
      }}
    >
      <div className="space-y-6">
        {/* Preview with colorful gradient background behind */}
        <div className="relative p-12 rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-tr from-emerald-500 via-sky-500 to-indigo-600">
          <div
            className="w-72 p-6 rounded-2xl text-neutral-100 space-y-2 shadow-2xl transition-all"
            style={{
              background: `rgba(255, 255, 255, ${transparency})`,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
            }}
          >
            <div className="text-xs uppercase font-mono tracking-wider text-white/70">Glass Card</div>
            <div className="text-xl font-bold">Frosted UI</div>
            <div className="text-xs text-white/80 leading-relaxed">
              Real-time backdrop blur rendered 100% in pure CSS.
            </div>
          </div>
        </div>

        <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-neutral-400 font-semibold font-mono">CSS Styles</span>
            <CopyButton text={css} />
          </div>
          <pre className="font-mono text-xs text-emerald-400 bg-neutral-900/50 p-2.5 rounded">
            {css}
          </pre>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Blur ({blur}px)</label>
            <input
              type="range"
              min="0"
              max="40"
              value={blur}
              onChange={(e) => setBlur(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Transparency ({Math.round(transparency * 100)}%)</label>
            <input
              type="range"
              min="0.05"
              max="0.8"
              step="0.05"
              value={transparency}
              onChange={(e) => setTransparency(parseFloat(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Border Opacity ({Math.round(borderOpacity * 100)}%)</label>
            <input
              type="range"
              min="0.0"
              max="0.6"
              step="0.05"
              value={borderOpacity}
              onChange={(e) => setBorderOpacity(parseFloat(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
