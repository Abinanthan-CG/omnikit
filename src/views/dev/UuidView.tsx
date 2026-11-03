import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateUuids } from '../../engines/dev/uuidTools';

export const UuidView: React.FC = () => {
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [version, setVersion] = useState(0); // bump to regenerate

  const uuids = generateUuids(count, { uppercase, hyphens });
  const allText = uuids.join('\n');

  return (
    <ToolShell
      title="UUID v4 Generator"
      category="dev"
      description="Generate cryptographically random UUIDs (version 4) individually or in bulk."
      icon="🎲"
      onReset={() => {
        setCount(5);
        setUppercase(false);
        setHyphens(true);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-neutral-950/70 border border-neutral-800 rounded-lg">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Quantity ({count})</label>
            <input
              type="range"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={hyphens}
                onChange={(e) => setHyphens(e.target.checked)}
                className="rounded bg-neutral-950 border-neutral-800 text-emerald-500"
              />
              Include Hyphens
            </label>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="rounded bg-neutral-950 border-neutral-800 text-emerald-500"
              />
              Uppercase
            </label>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setVersion(v => v + 1)}
            className="px-4 py-2 bg-emerald-500 text-neutral-950 text-xs font-semibold rounded-lg hover:bg-emerald-400 transition-colors shadow-sm"
          >
            Regenerate UUIDs
          </button>
          <CopyButton text={allText} label="Copy All UUIDs" />
        </div>

        <div className="space-y-2">
          {uuids.map((id, idx) => (
            <div key={`${idx}-${version}`} className="p-2.5 bg-neutral-950 border border-neutral-800/80 rounded flex items-center justify-between font-mono text-xs text-neutral-200 hover:border-neutral-700">
              <span className="select-all">{id}</span>
              <CopyButton text={id} />
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
};
