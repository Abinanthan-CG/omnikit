import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { calculateWcagContrast } from '../../engines/design/contrast';

export const ContrastView: React.FC = () => {
  const [fg, setFg] = useState('#ffffff');
  const [bg, setBg] = useState('#0f172a');

  const result = calculateWcagContrast(fg, bg);

  const swapColors = () => {
    const temp = fg;
    setFg(bg);
    setBg(temp);
  };

  return (
    <ToolShell
      title="WCAG Color Contrast Checker"
      category="design"
      description="Calculate contrast ratios and test WCAG 2.1 Level AA and AAA compliance for text and UI elements."
      icon="🎨"
      onReset={() => {
        setFg('#ffffff');
        setBg('#0f172a');
      }}
    >
      <div className="space-y-6">
        {/* Color Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Foreground (Text / Icon)</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={fg.startsWith('#') && fg.length === 7 ? fg : '#ffffff'}
                onChange={(e) => setFg(e.target.value)}
                className="w-10 h-10 rounded-lg bg-transparent border border-neutral-800 cursor-pointer"
              />
              <input
                type="text"
                value={fg}
                onChange={(e) => setFg(e.target.value)}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 font-mono text-sm text-neutral-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Background Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bg.startsWith('#') && bg.length === 7 ? bg : '#0f172a'}
                onChange={(e) => setBg(e.target.value)}
                className="w-10 h-10 rounded-lg bg-transparent border border-neutral-800 cursor-pointer"
              />
              <input
                type="text"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 font-mono text-sm text-neutral-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={swapColors}
            className="text-xs px-3 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
          >
            ⇄ Swap Foreground & Background
          </button>
        </div>

        {/* Live Preview Box */}
        <div
          className="p-8 rounded-2xl border border-neutral-800 flex flex-col items-center justify-center text-center transition-colors shadow-inner"
          style={{ backgroundColor: bg, color: fg }}
        >
          <div className="text-2xl font-bold">The quick brown fox jumps over the lazy dog.</div>
          <div className="text-sm mt-2 opacity-85">
            Regular body text preview at 16px (1rem).
          </div>
        </div>

        {/* Error Alert */}
        {!result.success && (
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-xs">
            {result.error || 'Invalid color entry. Please enter a valid hex color code.'}
          </div>
        )}

        {/* Contrast Score & Compliance Badges */}
        {result.success && result.value && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-neutral-400">Contrast Ratio</div>
                <div className="text-3xl font-mono font-bold text-emerald-400">
                  {result.value.ratioString}
                </div>
              </div>

              <CopyButton text={result.value.ratioString} label="Copy Ratio" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Normal Text */}
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-xs font-semibold text-neutral-300 mb-2">Normal Text</div>
                <div className="flex gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${result.value.aaNormal ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    AA {result.value.aaNormal ? '✓' : '✗'}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${result.value.aaaNormal ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    AAA {result.value.aaaNormal ? '✓' : '✗'}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 mt-2">Requires 4.5:1 (AA) or 7:1 (AAA)</div>
              </div>

              {/* Large Text */}
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-xs font-semibold text-neutral-300 mb-2">Large Text (18pt+)</div>
                <div className="flex gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${result.value.aaLarge ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    AA {result.value.aaLarge ? '✓' : '✗'}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${result.value.aaaLarge ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    AAA {result.value.aaaLarge ? '✓' : '✗'}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 mt-2">Requires 3:1 (AA) or 4.5:1 (AAA)</div>
              </div>

              {/* Graphical Objects */}
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-xs font-semibold text-neutral-300 mb-2">UI Components & Icons</div>
                <div>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${result.value.uiComponent ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    AA {result.value.uiComponent ? '✓ Pass' : '✗ Fail'}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 mt-2">Requires 3:1 contrast</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
};
