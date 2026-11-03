import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { calculateWordFrequencies } from '../../engines/writing/wordCloudTools';

export const WordCloudView: React.FC = () => {
  const [text, setText] = useState(
    'Omnikit delivers fast offline tools for audio video design dev writing. Omnikit protects privacy by running offline without servers. Creators use Omnikit for sound timecode design color code and typography.'
  );
  const [ignoreStopWords, setIgnoreStopWords] = useState(true);

  const words = calculateWordFrequencies(text, ignoreStopWords);

  return (
    <ToolShell
      title="Word Cloud & Frequency Analyzer"
      category="writing"
      description="Analyze key recurring themes and generate a visual proportional weighted word cloud from prose."
      icon="☁️"
      onReset={() => {
        setText('');
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Input Article / Document</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Type or paste text to generate weighted word cloud..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-sans resize-y focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
            <input
              type="checkbox"
              checked={ignoreStopWords}
              onChange={(e) => setIgnoreStopWords(e.target.checked)}
              className="rounded bg-neutral-900 border-neutral-700 text-emerald-500"
            />
            Filter Common Stop Words (the, a, and, or, is)
          </label>
          <span className="text-xs font-mono text-neutral-500">
            {words.length} unique terms extracted
          </span>
        </div>

        {/* Word cloud render */}
        <div className="p-8 bg-neutral-950/70 border border-neutral-800 rounded-2xl flex flex-wrap items-center justify-center gap-4 min-h-[200px]">
          {words.length === 0 ? (
            <span className="text-xs text-neutral-500 font-mono">No terms to display</span>
          ) : (
            words.map((w) => {
              const hue = (w.count * 45) % 360;
              return (
                <span
                  key={w.word}
                  style={{
                    fontSize: `${w.weight}%`,
                    color: `hsl(${hue}, 70%, 75%)`
                  }}
                  className="font-bold tracking-tight hover:scale-110 transition-transform cursor-default select-none px-1"
                  title={`${w.word}: ${w.count} occurrences`}
                >
                  {w.word}
                </span>
              );
            })
          )}
        </div>
      </div>
    </ToolShell>
  );
};
