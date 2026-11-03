import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { cleanSvg } from '../../engines/dev/svgCleanTools';

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 100 100">
  <!-- Generator: Adobe Illustrator 28.0, SVG Export Plug-In -->
  <defs>
    <style>.cls-1{fill:#10b981;}</style>
  </defs>
  <path class="cls-1" d="M 10.453289 20.912834 L 50.123847 80.992812 L 90.001928 20.449123 Z"/>
</svg>`;

export const SvgCleanView: React.FC = () => {
  const [svgInput, setSvgInput] = useState(SAMPLE_SVG);
  const [precision, setPrecision] = useState(2);

  const res = cleanSvg(svgInput, precision);

  return (
    <ToolShell
      title="SVG Path Cleaner & Vector Optimizer"
      category="dev"
      description="Purge editor metadata, comments, and truncate floating-point coordinate precision to slim down vector SVGs."
      icon="📐"
      onReset={() => {
        setSvgInput(SAMPLE_SVG);
        setPrecision(2);
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono text-neutral-400">Path Coordinate Precision</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((p) => (
              <button
                key={p}
                onClick={() => setPrecision(p)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  precision === p ? 'bg-neutral-800 text-emerald-400 font-bold' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {p} decimals
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Raw SVG Markup</label>
          <textarea
            value={svgInput}
            onChange={(e) => setSvgInput(e.target.value)}
            rows={7}
            placeholder="Paste <svg> code here..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-100 font-mono resize-y focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Original File Size</span>
            <div className="text-lg font-bold font-mono text-neutral-200 mt-1">{res.originalBytes} bytes</div>
          </div>
          <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Optimized Size</span>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-1">{res.cleanedBytes} bytes</div>
          </div>
          <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Size Reduction</span>
            <div className="text-lg font-bold font-mono text-sky-400 mt-1">{res.savingsPercent}%</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono text-neutral-400">Cleaned & Optimized SVG</label>
            <CopyButton text={res.cleanedSvg} label="Copy Cleaned SVG" />
          </div>
          <textarea
            readOnly
            value={res.cleanedSvg}
            rows={5}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-emerald-400 font-mono resize-y focus:outline-none"
          />
        </div>
      </div>
    </ToolShell>
  );
};
