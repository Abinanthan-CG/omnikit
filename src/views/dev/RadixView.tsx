import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { convertRadix } from '../../engines/dev/radixTools';

export const RadixView: React.FC = () => {
  const [val, setVal] = useState('255');
  const [base, setBase] = useState(10);

  const res = convertRadix(val, base);

  return (
    <ToolShell
      title="Multi-Base Radix Converter"
      category="dev"
      description="Convert large integers across Decimal, Hexadecimal, Binary, Octal, and Base36 notations with bit length inspection."
      icon="🔢"
      onReset={() => {
        setVal('255');
        setBase(10);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-mono text-neutral-400 mb-1">Input Number</label>
            <input
              type="text"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="e.g. 255, 0xFF, 11111111"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none focus:border-neutral-600"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Source Radix</label>
            <select
              value={base}
              onChange={(e) => setBase(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none focus:border-neutral-600"
            >
              <option value={10}>Base 10 (Decimal)</option>
              <option value={16}>Base 16 (Hexadecimal)</option>
              <option value={2}>Base 2 (Binary)</option>
              <option value={8}>Base 8 (Octal)</option>
              <option value={36}>Base 36 (Alphanumeric)</option>
            </select>
          </div>
        </div>

        {res.isValid ? (
          <div className="space-y-3">
            <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl flex justify-between items-center">
              <span className="text-xs text-neutral-500 font-mono">Minimum Required Bits</span>
              <span className="text-xs font-bold font-mono text-sky-400">{res.bitLength} bits</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-neutral-500 font-mono">Decimal (Base 10)</span>
                  <CopyButton text={res.decimal} label="Copy" />
                </div>
                <div className="text-lg font-bold font-mono text-neutral-100 break-all">{res.decimal}</div>
              </div>

              <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-neutral-500 font-mono">Hexadecimal (Base 16)</span>
                  <CopyButton text={res.hex} label="Copy" />
                </div>
                <div className="text-lg font-bold font-mono text-emerald-400 break-all">0x{res.hex}</div>
              </div>

              <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl sm:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-neutral-500 font-mono">Binary (Base 2)</span>
                  <CopyButton text={res.binary} label="Copy" />
                </div>
                <div className="text-sm font-bold font-mono text-amber-400 break-all">{res.binary}</div>
              </div>

              <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-neutral-500 font-mono">Octal (Base 8)</span>
                  <CopyButton text={res.octal} label="Copy" />
                </div>
                <div className="text-lg font-bold font-mono text-purple-400 break-all">0o{res.octal}</div>
              </div>

              <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-neutral-500 font-mono">Base 36</span>
                  <CopyButton text={res.base36} label="Copy" />
                </div>
                <div className="text-lg font-bold font-mono text-teal-400 break-all">{res.base36}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm font-mono">
            Invalid number format for base {base}.
          </div>
        )}
      </div>
    </ToolShell>
  );
};
