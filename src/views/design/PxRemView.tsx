import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { convertPxRem, generatePxRemScale, ConversionDirection } from '../../engines/design/pxRem';

export const PxRemView: React.FC = () => {
  const [value, setValue] = useState(24);
  const [basePx, setBasePx] = useState(16);
  const [direction, setDirection] = useState<ConversionDirection>('px-to-rem');

  const result = convertPxRem(value, basePx, direction);
  const scale = generatePxRemScale(basePx);

  return (
    <ToolShell
      title="PX to REM Converter"
      category="design"
      description="Convert pixel measurements to CSS relative REM units and view quick-reference typography scales."
      icon="📏"
      onReset={() => {
        setValue(24);
        setBasePx(16);
        setDirection('px-to-rem');
      }}
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">
              {direction === 'px-to-rem' ? 'Pixels (PX)' : 'REM Value'}
            </label>
            <input
              type="number"
              value={value || ''}
              onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xl font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Base Font Size (Default 16px)</label>
            <input
              type="number"
              value={basePx || ''}
              onChange={(e) => setBasePx(parseFloat(e.target.value) || 16)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm font-mono text-neutral-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setDirection(d => d === 'px-to-rem' ? 'rem-to-px' : 'px-to-rem')}
              className="w-full py-2.5 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 transition-colors"
            >
              ⇄ Switch to {direction === 'px-to-rem' ? 'REM → PX' : 'PX → REM'}
            </button>
          </div>
        </div>

        {/* Output Banner */}
        {result.success && result.value && (
          <div className="p-5 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-neutral-400">Converted Output</div>
              <div className="text-3xl font-mono font-bold text-emerald-400 mt-1">
                {result.value.cssString}
              </div>
              <div className="text-xs font-mono text-neutral-500 mt-1">
                {direction === 'px-to-rem'
                  ? `${value}px ÷ ${basePx}px = ${result.value.result}rem`
                  : `${value}rem × ${basePx}px = ${result.value.result}px`}
              </div>
            </div>

            <CopyButton text={result.value.cssString} label="Copy CSS" />
          </div>
        )}

        {/* Quick Reference Scale */}
        <div>
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
            Common Scale Reference (Base {basePx}px)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {scale.map((s) => (
              <button
                key={s.px}
                onClick={() => {
                  setValue(s.px);
                  setDirection('px-to-rem');
                }}
                className={`p-2 rounded-lg text-left border transition-all ${
                  value === s.px && direction === 'px-to-rem'
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                    : 'bg-neutral-950 border-neutral-800/80 hover:border-neutral-700 text-neutral-300'
                }`}
              >
                <div className="text-xs font-mono font-bold">{s.px}px</div>
                <div className="text-[11px] font-mono text-neutral-500">{s.rem}rem</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
