import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { truncateText } from '../../engines/writing/truncateTools';

export const TruncateView: React.FC = () => {
  const [text, setText] = useState(
    'Omnikit provides an expansive suite of offline-first, client-side tools designed specifically for creative artists, sound engineers, software developers, and technical writers.'
  );
  const [maxLength, setMaxLength] = useState(60);
  const [byWords, setByWords] = useState(true);
  const [ellipsis, setEllipsis] = useState('...');

  const truncated = truncateText(text, { maxLength, byWords, ellipsis });

  return (
    <ToolShell
      title="Text Truncation & Smart Ellipsis"
      category="writing"
      description="Trim long text strings to precise character or word boundaries with custom ellipsis markers."
      icon="✂️"
      onReset={() => {
        setMaxLength(60);
        setByWords(true);
        setEllipsis('...');
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Original Text ({text.length} chars)</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono resize-y focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div>
            <label className="text-neutral-400 mb-1 block">Max Length ({maxLength} chars)</label>
            <input
              type="number"
              min="1"
              value={maxLength}
              onChange={(e) => setMaxLength(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-neutral-100"
            />
          </div>

          <div>
            <label className="text-neutral-400 mb-1 block">Custom Ellipsis</label>
            <input
              type="text"
              value={ellipsis}
              onChange={(e) => setEllipsis(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-neutral-100"
            />
          </div>

          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
              <input
                type="checkbox"
                checked={byWords}
                onChange={(e) => setByWords(e.target.checked)}
                className="rounded bg-neutral-900 border-neutral-700 text-emerald-500"
              />
              Break at Word Boundary
            </label>
          </div>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400">Truncated Result ({truncated.length} chars)</span>
            <CopyButton text={truncated} label="Copy Result" />
          </div>
          <pre className="p-3 bg-neutral-900 rounded font-mono text-emerald-400 text-sm whitespace-pre-wrap select-all">
            {truncated}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};
