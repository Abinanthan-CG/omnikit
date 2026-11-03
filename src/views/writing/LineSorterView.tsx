import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { sortLines, SortMode } from '../../engines/writing/lineSorter';

export const LineSorterView: React.FC = () => {
  const [text, setText] = useState('zebra\napple\nbanana\nmango\napple\n\ncherry');
  const [mode, setMode] = useState<SortMode>('asc');
  const [dedupe, setDedupe] = useState(true);
  const [stripEmpty, setStripEmpty] = useState(true);

  const result = sortLines(text, { mode, dedupe, stripEmpty });

  return (
    <ToolShell
      title="Line Sorter & Deduplicator"
      category="writing"
      description="Alphabetize, sort by length, remove duplicate items, and strip empty lines."
      icon="📑"
      onReset={() => setText('')}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4 p-3 bg-neutral-950/70 border border-neutral-800 rounded-lg text-xs">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Order:</span>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as SortMode)}
              className="bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1 text-neutral-100"
            >
              <option value="asc">Alphabetical (A → Z)</option>
              <option value="desc">Alphabetical (Z → A)</option>
              <option value="natural">Natural Numerical</option>
              <option value="length-asc">Length (Short → Long)</option>
              <option value="length-desc">Length (Long → Short)</option>
              <option value="reverse">Reverse List</option>
            </select>
          </div>

          <label className="flex items-center gap-1.5 text-neutral-300 cursor-pointer">
            <input
              type="checkbox"
              checked={dedupe}
              onChange={(e) => setDedupe(e.target.checked)}
              className="rounded bg-neutral-900 border-neutral-800 text-emerald-500"
            />
            Remove Duplicates
          </label>

          <label className="flex items-center gap-1.5 text-neutral-300 cursor-pointer">
            <input
              type="checkbox"
              checked={stripEmpty}
              onChange={(e) => setStripEmpty(e.target.checked)}
              className="rounded bg-neutral-900 border-neutral-800 text-emerald-500"
            />
            Strip Blank Lines
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Input Lines</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              placeholder="Paste list of items here..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-100 font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-neutral-400">Sorted Output</label>
              <CopyButton text={result} />
            </div>
            <textarea
              readOnly
              value={result}
              rows={8}
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded-lg p-3 text-xs text-emerald-400 font-mono focus:outline-none select-all"
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
