import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { splitGoldenRatio, generateGoldenScale } from '../../engines/design/goldenRatioTools';

export const GoldenRatioView: React.FC = () => {
  const [totalSize, setTotalSize] = useState(1200);
  const [baseTypePx, setBaseTypePx] = useState(16);

  const split = splitGoldenRatio(totalSize);
  const scale = generateGoldenScale(baseTypePx, 6);

  return (
    <ToolShell
      title="Golden Ratio (φ 1.618) Layout & Typography"
      category="design"
      description="Calculate aesthetically balanced column layouts and harmonic typography scale steps using the divine proportion."
      icon="🌀"
      onReset={() => {
        setTotalSize(1200);
        setBaseTypePx(16);
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-1">Total Container Width (px)</label>
          <input
            type="number"
            value={totalSize}
            onChange={(e) => setTotalSize(Number(e.target.value))}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Golden Ratio Column Split</label>
          <div className="h-14 w-full rounded-xl overflow-hidden flex border border-neutral-800 text-xs font-mono font-bold">
            <div
              style={{ width: `${split.majorPercent}%` }}
              className="bg-emerald-500/20 border-r border-emerald-500/30 text-emerald-400 flex items-center justify-center p-2"
            >
              Major: {split.major}px ({split.majorPercent}%)
            </div>
            <div
              style={{ width: `${split.minorPercent}%` }}
              className="bg-sky-500/20 text-sky-400 flex items-center justify-center p-2"
            >
              Minor: {split.minor}px ({split.minorPercent}%)
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800">
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs font-mono text-neutral-400">Golden Typography Scale (Base {baseTypePx}px)</label>
            <input
              type="number"
              value={baseTypePx}
              onChange={(e) => setBaseTypePx(Number(e.target.value))}
              className="w-20 bg-neutral-950 border border-neutral-800 rounded px-2 py-0.5 text-xs font-mono text-right text-neutral-200"
            />
          </div>

          <div className="space-y-2">
            {scale.map((st) => (
              <div
                key={st.step}
                className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-neutral-200">{st.name}</span>
                  <div className="text-[11px] font-mono text-neutral-500">Step {st.step} (φ^{st.step})</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-sm font-bold text-emerald-400">{st.valuePx}px</div>
                  <div className="text-[11px] text-neutral-400">{st.valueRem}rem</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
