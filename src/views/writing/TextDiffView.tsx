import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { computeLineDiff } from '../../engines/writing/textDiff';

export const TextDiffView: React.FC = () => {
  const [original, setOriginal] = useState('Apple\nBanana\nCherry\nDate');
  const [modified, setModified] = useState('Apple\nBlueberry\nCherry\nDate\nElderberry');

  const diff = computeLineDiff(original, modified);

  return (
    <ToolShell
      title="Side-by-Side Text Diff"
      category="writing"
      description="Compare two text blocks to instantly detect additions, deletions, and modifications."
      icon="🔍"
      onReset={() => {
        setOriginal('');
        setModified('');
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1 font-semibold">Original Text</label>
            <textarea
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              rows={5}
              placeholder="Paste original version..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-100 font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1 font-semibold">Modified Text</label>
            <textarea
              value={modified}
              onChange={(e) => setModified(e.target.value)}
              rows={5}
              placeholder="Paste modified version..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-100 font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400">
              Diff Comparison ({diff.hasDifferences ? 'Changes Detected' : 'Identical'})
            </span>
            <div className="flex gap-3 text-xs">
              <span className="text-emerald-400">+ Added</span>
              <span className="text-red-400">- Removed</span>
              <span className="text-neutral-500">Unchanged</span>
            </div>
          </div>

          <div className="font-mono text-xs rounded-lg overflow-hidden border border-neutral-800 divide-y divide-neutral-900 bg-neutral-950">
            {diff.lines.map((l, idx) => (
              <div
                key={idx}
                className={`py-1.5 px-3 flex items-center gap-3 ${
                  l.type === 'added'
                    ? 'bg-emerald-500/10 text-emerald-300'
                    : l.type === 'removed'
                    ? 'bg-red-500/10 text-red-300'
                    : 'text-neutral-400'
                }`}
              >
                <span className="w-5 font-bold select-none text-neutral-500 text-center">
                  {l.type === 'added' ? '+' : l.type === 'removed' ? '-' : ' '}
                </span>
                <span className="flex-1 whitespace-pre-wrap">{l.text || <span className="opacity-40 italic">empty line</span>}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
