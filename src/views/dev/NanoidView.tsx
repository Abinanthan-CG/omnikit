import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateBatchNanoids } from '../../engines/dev/nanoidTools';

export const NanoidView: React.FC = () => {
  const [size, setSize] = useState(21);
  const [count, setCount] = useState(6);
  const [alphabet, setAlphabet] = useState('');

  const [ids, setIds] = useState(() => generateBatchNanoids(6, 21));

  const regenerate = () => {
    setIds(generateBatchNanoids(count, size, alphabet || undefined));
  };

  return (
    <ToolShell
      title="Nano ID & Short UID Generator"
      category="dev"
      description="Cryptographically strong, URL-friendly unique identifier generator with custom lengths and alphabets."
      icon="🆔"
      onReset={() => {
        setSize(21);
        setCount(6);
        setAlphabet('');
        setIds(generateBatchNanoids(6, 21));
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">ID Length ({size} chars)</label>
            <input
              type="number"
              min="4"
              max="64"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value) || 21)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Quantity ({count} IDs)</label>
            <input
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 5)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Custom Alphabet (Optional)</label>
            <input
              type="text"
              placeholder="Default: A-Za-z0-9_-"
              value={alphabet}
              onChange={(e) => setAlphabet(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            />
          </div>
        </div>

        <button
          onClick={regenerate}
          className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl text-xs font-mono transition-colors"
        >
          ↻ Generate Fresh IDs
        </button>

        <div className="space-y-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono text-neutral-400">Generated Identifiers</span>
            <CopyButton text={ids.join('\n')} label="Copy All IDs" />
          </div>

          <div className="space-y-2">
            {ids.map((id, idx) => (
              <div
                key={idx}
                className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between font-mono text-xs"
              >
                <span className="text-emerald-400 select-all font-semibold">{id}</span>
                <CopyButton text={id} label="Copy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
