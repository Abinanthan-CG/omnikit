import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { applyAffixes } from '../../engines/writing/affixTools';

export const AffixView: React.FC = () => {
  const [text, setText] = useState('apple\nbanana\ncherry\ndate');
  const [prefix, setPrefix] = useState('"');
  const [suffix, setSuffix] = useState('",');
  const [numberLines, setNumberLines] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [skipEmpty, setSkipEmpty] = useState(true);

  const res = applyAffixes(text, { prefix, suffix, numberLines, trimLines, skipEmpty });

  return (
    <ToolShell
      title="Batch Line Prefix & Suffix Tool"
      category="writing"
      description="Batch prepend and append custom prefixes, suffixes, quotes, or sequential numbers to each line."
      icon="🏷️"
      onReset={() => {
        setText('apple\nbanana\ncherry');
        setPrefix('"');
        setSuffix('",');
        setNumberLines(false);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Prefix (Prepended)</label>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Suffix (Appended)</label>
            <input
              type="text"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-neutral-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={numberLines}
              onChange={(e) => setNumberLines(e.target.checked)}
              className="rounded bg-neutral-900 border-neutral-700 text-emerald-500"
            />
            Number Lines (1., 2.)
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={trimLines}
              onChange={(e) => setTrimLines(e.target.checked)}
              className="rounded bg-neutral-900 border-neutral-700 text-emerald-500"
            />
            Trim Line Whitespace
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={skipEmpty}
              onChange={(e) => setSkipEmpty(e.target.checked)}
              className="rounded bg-neutral-900 border-neutral-700 text-emerald-500"
            />
            Skip Empty Lines
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-2">Input Lines</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono resize-y focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono text-neutral-400">Modified Lines</label>
              <CopyButton text={res} label="Copy Modified" />
            </div>
            <textarea
              readOnly
              value={res}
              rows={10}
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl p-3 text-sm text-emerald-400 font-mono resize-y focus:outline-none"
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
