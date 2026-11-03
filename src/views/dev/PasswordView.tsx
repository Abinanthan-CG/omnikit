import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generatePassword } from '../../engines/dev/passwordTools';

export const PasswordView: React.FC = () => {
  const [length, setLength] = useState(24);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(true);

  const [passwordState, setPasswordState] = useState(() =>
    generatePassword({
      length: 24,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
      excludeAmbiguous: true
    })
  );

  const regenerate = () => {
    setPasswordState(
      generatePassword({
        length,
        uppercase,
        lowercase,
        numbers,
        symbols,
        excludeAmbiguous
      })
    );
  };

  return (
    <ToolShell
      title="Secure Password & Secret Generator"
      category="dev"
      description="Cryptographically secure random password generator using Web Crypto API with entropy scoring."
      icon="🔑"
      onReset={() => {
        setLength(24);
        setUppercase(true);
        setLowercase(true);
        setNumbers(true);
        setSymbols(true);
        setExcludeAmbiguous(true);
        regenerate();
      }}
    >
      <div className="space-y-6">
        <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400">Generated Secret</span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-emerald-400">{passwordState.entropyBits} bits entropy</span>
              <CopyButton text={passwordState.password} label="Copy Secret" />
            </div>
          </div>
          <div className="p-4 bg-neutral-900 rounded-xl font-mono text-base text-emerald-400 break-all select-all font-semibold">
            {passwordState.password || '(Select at least one character set)'}
          </div>
          <button
            onClick={regenerate}
            className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 rounded-lg text-xs font-mono font-semibold transition-colors"
          >
            ↻ Generate Fresh Password
          </button>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-neutral-400">Password Length: {length} characters</span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 16;
              setLength(val);
            }}
            className="w-full accent-emerald-500 cursor-pointer"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-neutral-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} className="rounded bg-neutral-900 border-neutral-700 text-emerald-500" />
              Uppercase (A-Z)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={lowercase} onChange={e => setLowercase(e.target.checked)} className="rounded bg-neutral-900 border-neutral-700 text-emerald-500" />
              Lowercase (a-z)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={numbers} onChange={e => setNumbers(e.target.checked)} className="rounded bg-neutral-900 border-neutral-700 text-emerald-500" />
              Numbers (0-9)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={symbols} onChange={e => setSymbols(e.target.checked)} className="rounded bg-neutral-900 border-neutral-700 text-emerald-500" />
              Symbols (!@#$)
            </label>
            <label className="flex items-center gap-2 cursor-pointer col-span-2">
              <input type="checkbox" checked={excludeAmbiguous} onChange={e => setExcludeAmbiguous(e.target.checked)} className="rounded bg-neutral-900 border-neutral-700 text-emerald-500" />
              Exclude Ambiguous (0, O, 1, l, I)
            </label>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
