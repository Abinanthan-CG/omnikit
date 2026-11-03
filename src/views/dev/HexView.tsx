import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { textToHex, hexToText } from '../../engines/dev/hexTools';

export const HexView: React.FC = () => {
  const [mode, setMode] = useState<'text2hex' | 'hex2text'>('text2hex');
  const [input, setInput] = useState('Omnikit Studio');
  const [prefix, setPrefix] = useState('');

  const output = mode === 'text2hex' ? textToHex(input, ' ', prefix) : hexToText(input);

  const switchMode = (m: 'text2hex' | 'hex2text') => {
    if (m !== mode) {
      setMode(m);
      setInput(output);
    }
  };

  return (
    <ToolShell
      title="Text ↔ Hex Byte String Converter"
      category="dev"
      description="Convert text strings to hexadecimal byte representations and decode hex dumps back into clear UTF-8 text."
      icon="🔣"
      onReset={() => {
        setInput('Omnikit Studio');
      }}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => switchMode('text2hex')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                mode === 'text2hex' ? 'bg-neutral-800 text-neutral-100 font-semibold border border-neutral-700' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Text → Hex
            </button>
            <button
              onClick={() => switchMode('hex2text')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                mode === 'hex2text' ? 'bg-neutral-800 text-neutral-100 font-semibold border border-neutral-700' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Hex → Text
            </button>
          </div>

          {mode === 'text2hex' && (
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-neutral-500">Prefix:</span>
              <button
                onClick={() => setPrefix('')}
                className={`px-2 py-0.5 rounded ${prefix === '' ? 'bg-neutral-800 text-neutral-200' : 'text-neutral-500'}`}
              >
                None
              </button>
              <button
                onClick={() => setPrefix('0x')}
                className={`px-2 py-0.5 rounded ${prefix === '0x' ? 'bg-neutral-800 text-neutral-200' : 'text-neutral-500'}`}
              >
                0x
              </button>
              <button
                onClick={() => setPrefix('\\x')}
                className={`px-2 py-0.5 rounded ${prefix === '\\x' ? 'bg-neutral-800 text-neutral-200' : 'text-neutral-500'}`}
              >
                \x
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-2">
              {mode === 'text2hex' ? 'Text Input' : 'Hex Input (e.g. 48 65 6c 6c 6f)'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono resize-y focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono text-neutral-400">
                {mode === 'text2hex' ? 'Hexadecimal Output' : 'Decoded Text'}
              </label>
              <CopyButton text={output} label="Copy Output" />
            </div>
            <textarea
              readOnly
              value={output}
              rows={10}
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl p-3 text-sm text-emerald-400 font-mono resize-y focus:outline-none"
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
