import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { analyzePoeticMeter } from '../../engines/writing/rhymeTools';

const SAMPLE_STANZA = `The woods are lovely, dark and deep,
But I have promises to keep,
And miles to go before I sleep,
And miles to go before I sleep.`;

export const RhymeView: React.FC = () => {
  const [poem, setPoem] = useState(SAMPLE_STANZA);

  const res = analyzePoeticMeter(poem);

  return (
    <ToolShell
      title="Poetic Meter & Syllabic Scansion Tool"
      category="writing"
      description="Calculate line-by-line syllable counts, estimate poetic foot metrics (iambic scansion), and inspect rhythmic flow."
      icon="📜"
      onReset={() => setPoem(SAMPLE_STANZA)}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Poem or Lyric Lines</label>
          <textarea
            value={poem}
            onChange={(e) => setPoem(e.target.value)}
            rows={5}
            placeholder="Paste poetic verse or lyrics here..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-sans resize-y focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Total Lines</span>
            <div className="text-xl font-bold font-mono text-neutral-100 mt-1">{res.totalLines}</div>
          </div>
          <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Total Syllables</span>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1">{res.totalSyllables}</div>
          </div>
          <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Stanza Structure</span>
            <div className="text-sm font-bold font-mono text-sky-400 mt-1.5">{res.rhymeSchemeEstimate}</div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Line-by-Line Scansion Breakdown</label>
          <div className="space-y-2">
            {res.lines.map((l, i) => (
              <div key={i} className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl flex items-center justify-between">
                <div className="max-w-[75%]">
                  <div className="text-xs text-neutral-200 font-sans">{l.line}</div>
                  <div className="text-[11px] font-mono text-neutral-500 mt-1">{l.meterPattern}</div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-sm font-bold text-emerald-400">{l.syllableCount}</span>
                  <span className="text-[10px] text-neutral-500 ml-1">syl</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
