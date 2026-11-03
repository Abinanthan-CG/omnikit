import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { detectInvisibleChars } from '../../engines/writing/zeroWidthTools';

export const ZeroWidthView: React.FC = () => {
  const [text, setText] = useState('Clean\u200Btext\u200Cwith\uFEFFhidden\u00A0characters');

  const { hasInvisible, totalCount, findings, cleanedText } = detectInvisibleChars(text);

  return (
    <ToolShell
      title="Invisible & Zero-Width Character Cleaner"
      category="writing"
      description="Detect and purge zero-width spaces, non-breaking spaces, BOMs, and hidden unicode anomalies."
      icon="👻"
      onReset={() => setText('')}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Input Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Paste text here to inspect for hidden or invisible unicode characters..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-sans resize-y focus:outline-none focus:border-neutral-600"
          />
        </div>

        {hasInvisible ? (
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-400 font-semibold text-sm">
                Found {totalCount} invisible character{totalCount !== 1 ? 's' : ''}!
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {findings.map((f) => (
                <div key={f.unicode} className="p-2.5 bg-neutral-900/80 rounded-lg text-xs font-mono flex justify-between items-center">
                  <span className="text-neutral-300">{f.charName}</span>
                  <span className="text-amber-400 font-bold px-1.5 py-0.5 bg-amber-500/10 rounded">{f.count}x ({f.unicode})</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm">
            ✓ No invisible or zero-width characters detected in this text.
          </div>
        )}

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono text-neutral-400">Purged Clean Output</label>
            <CopyButton text={cleanedText} label="Copy Cleaned Text" />
          </div>
          <textarea
            readOnly
            value={cleanedText}
            rows={5}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono resize-y focus:outline-none"
          />
        </div>
      </div>
    </ToolShell>
  );
};
