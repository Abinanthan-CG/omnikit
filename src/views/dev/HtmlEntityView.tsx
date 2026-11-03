import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { encodeHtmlEntities, decodeHtmlEntities } from '../../engines/dev/htmlEntityTools';

export const HtmlEntityView: React.FC = () => {
  const [input, setInput] = useState('<div class="hero">Omnikit & Friends!</div>');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const result = mode === 'encode' ? encodeHtmlEntities(input) : decodeHtmlEntities(input);

  return (
    <ToolShell
      title="HTML Entities Encoder & Decoder"
      category="dev"
      description="Safely escape text for HTML markup or restore entities to raw characters."
      icon="🏷️"
      onReset={() => setInput('')}
    >
      <div className="space-y-6">
        <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-800 w-fit">
          <button
            onClick={() => setMode('encode')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              mode === 'encode' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Escape Entities (&lt; &amp; &gt;)
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              mode === 'decode' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Decode Entities
          </button>
        </div>

        <div>
          <label className="block text-xs text-neutral-400 mb-1">
            {mode === 'encode' ? 'Raw Code / Characters' : 'Escaped HTML Text'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400">Result</span>
            <CopyButton text={result} />
          </div>
          <div className="font-mono text-sm text-emerald-400 break-all select-all whitespace-pre-wrap bg-neutral-900/50 p-3 rounded border border-neutral-800/80">
            {result || <span className="text-neutral-600 italic">No output</span>}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
