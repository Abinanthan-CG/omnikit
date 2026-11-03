import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { textToBinary, binaryToText } from '../../engines/dev/binaryTools';

export const BinaryView: React.FC = () => {
  const [mode, setMode] = useState<'text2bin' | 'bin2text'>('text2bin');
  const [input, setInput] = useState('Omnikit');

  const output = mode === 'text2bin' ? textToBinary(input) : binaryToText(input);

  const switchMode = (m: 'text2bin' | 'bin2text') => {
    if (m !== mode) {
      setMode(m);
      setInput(output);
    }
  };

  return (
    <ToolShell
      title="Text ↔ Binary Byte Converter"
      category="dev"
      description="Translate ASCII / UTF-8 strings to 8-bit binary strings and decode binary bytes back to readable text."
      icon="🔢"
      onReset={() => {
        setInput('Omnikit');
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => switchMode('text2bin')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
              mode === 'text2bin' ? 'bg-neutral-800 text-neutral-100 font-semibold border border-neutral-700' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Text → Binary
          </button>
          <button
            onClick={() => switchMode('bin2text')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
              mode === 'bin2text' ? 'bg-neutral-800 text-neutral-100 font-semibold border border-neutral-700' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Binary → Text
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-2">
              {mode === 'text2bin' ? 'Source Text' : 'Binary Input (8-bit bytes separated by space)'}
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
                {mode === 'text2bin' ? 'Binary Output' : 'Decoded Text'}
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
