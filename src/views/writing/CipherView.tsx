import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { caesarCipher, rot13 } from '../../engines/writing/cipherTools';

export const CipherView: React.FC = () => {
  const [text, setText] = useState('Attack at dawn by the northern river');
  const [shift, setShift] = useState(13);

  const encoded = caesarCipher(text, shift);
  const rot13Text = rot13(text);

  return (
    <ToolShell
      title="Caesar & ROT13 Cipher Obfuscator"
      category="writing"
      description="Encrypt or scramble text using historical Caesar shift ciphers and symmetrical ROT13 obfuscation."
      icon="🏛️"
      onReset={() => {
        setText('Attack at dawn by the northern river');
        setShift(13);
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Input Message</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono resize-y focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">Caesar Shift Key: +{shift} positions</span>
            <div className="flex gap-2">
              <button
                onClick={() => setShift(3)}
                className={`px-2 py-0.5 rounded text-xs ${shift === 3 ? 'bg-neutral-800 text-neutral-200' : 'text-neutral-500'}`}
              >
                +3 (Traditional)
              </button>
              <button
                onClick={() => setShift(13)}
                className={`px-2 py-0.5 rounded text-xs ${shift === 13 ? 'bg-neutral-800 text-neutral-200' : 'text-neutral-500'}`}
              >
                +13 (ROT13)
              </button>
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            value={shift}
            onChange={(e) => setShift(parseInt(e.target.value) || 1)}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">Caesar Cipher (+{shift})</span>
              <CopyButton text={encoded} label="Copy Cipher" />
            </div>
            <textarea
              readOnly
              value={encoded}
              rows={4}
              className="w-full bg-neutral-900 rounded p-2.5 text-xs text-emerald-400 font-mono resize-none focus:outline-none"
            />
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">ROT13 Standard</span>
              <CopyButton text={rot13Text} label="Copy ROT13" />
            </div>
            <textarea
              readOnly
              value={rot13Text}
              rows={4}
              className="w-full bg-neutral-900 rounded p-2.5 text-xs text-sky-400 font-mono resize-none focus:outline-none"
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
