import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { encodeBase64, decodeBase64 } from '../../engines/dev/base64Tools';

export const Base64View: React.FC = () => {
  const [input, setInput] = useState('Hello from Omnikit!');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [urlSafe, setUrlSafe] = useState(false);

  const result = mode === 'encode' 
    ? encodeBase64(input, { urlSafe }) 
    : decodeBase64(input, { urlSafe });

  return (
    <ToolShell
      title="Base64 String Converter"
      category="dev"
      description="Encode and decode text to and from Base64 with standard or URL-safe encoding."
      icon="🔐"
      onReset={() => setInput('')}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-800">
            <button
              onClick={() => setMode('encode')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                mode === 'encode' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Encode (Text → Base64)
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                mode === 'decode' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Decode (Base64 → Text)
            </button>
          </div>

          <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
              className="rounded bg-neutral-950 border-neutral-800 text-emerald-500 focus:ring-0"
            />
            URL-Safe Mode (- and _ without padding)
          </label>
        </div>

        <div>
          <label className="block text-xs text-neutral-400 mb-1">
            {mode === 'encode' ? 'Raw Text Input' : 'Base64 Encoded Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            placeholder={mode === 'encode' ? 'Type or paste plain text...' : 'Paste base64 string here...'}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400">
              {mode === 'encode' ? 'Base64 Result' : 'Decoded Text'}
            </span>
            {result.success && result.value && <CopyButton text={result.value} />}
          </div>

          {result.success ? (
            <div className="font-mono text-sm text-emerald-400 break-all select-all whitespace-pre-wrap bg-neutral-900/50 p-3 rounded border border-neutral-800/80">
              {result.value || <span className="text-neutral-600 italic">No output</span>}
            </div>
          ) : (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400">
              {result.error}
            </div>
          )}
        </div>
      </div>
    </ToolShell>
  );
};
