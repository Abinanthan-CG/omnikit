import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { evaluateBitmask, COMMON_PERM_FLAGS } from '../../engines/dev/bitmaskTools';

export const BitmaskView: React.FC = () => {
  const [maskVal, setMaskVal] = useState(7); // Read (1) + Write (2) + Delete (4)

  const res = evaluateBitmask(maskVal);

  const toggleFlag = (flagValue: number) => {
    if ((maskVal & flagValue) !== 0) {
      setMaskVal(maskVal & ~flagValue);
    } else {
      setMaskVal(maskVal | flagValue);
    }
  };

  return (
    <ToolShell
      title="Permission Bitmask Flag Inspector & Builder"
      category="dev"
      description="Inspect bitwise flags, calculate combined permission integers, binary bit sequences, and hexadecimal representations."
      icon="🛡️"
      onReset={() => setMaskVal(7)}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-neutral-500 font-mono">Decimal Bitmask</span>
              <CopyButton text={String(maskVal)} label="Copy" />
            </div>
            <input
              type="number"
              min="0"
              max="255"
              value={maskVal}
              onChange={(e) => setMaskVal(Number(e.target.value))}
              className="w-full bg-transparent text-xl font-bold font-mono text-emerald-400 focus:outline-none"
            />
          </div>

          <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Binary Bits (8-bit)</span>
            <div className="text-xl font-bold font-mono text-sky-400 mt-1">{res.binaryRepresentation}</div>
          </div>

          <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Hexadecimal</span>
            <div className="text-xl font-bold font-mono text-purple-400 mt-1">{res.hexRepresentation}</div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Toggle Permission Flags</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {COMMON_PERM_FLAGS.map((flag) => {
              const active = (maskVal & flag.value) !== 0;
              return (
                <button
                  key={flag.id}
                  onClick={() => toggleFlag(flag.value)}
                  className={`p-3 rounded-xl border text-left transition-colors flex items-center justify-between ${
                    active
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-neutral-100'
                      : 'bg-neutral-950/50 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <div>
                    <div className="text-xs font-semibold flex items-center gap-2">
                      <span className={active ? 'text-emerald-400' : 'text-neutral-500'}>
                        {active ? '☑' : '☐'}
                      </span>
                      <span>{flag.name}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">{flag.description}</div>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <span className="text-neutral-500">bit {flag.bit}</span>
                    <div className={active ? 'text-emerald-400 font-bold' : 'text-neutral-600'}>+{flag.value}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
