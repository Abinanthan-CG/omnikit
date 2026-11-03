import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { analyzeTextMetrics } from '../../engines/writing/wordMetrics';

export const WordMetricsView: React.FC = () => {
  const [text, setText] = useState(
    'Omnikit is an open-source, multi-disciplinary Swiss Army knife for computer professionals. It runs entirely inside your browser with zero latency and full privacy.'
  );

  const res = analyzeTextMetrics(text);
  const data = res.value;

  return (
    <ToolShell
      title="Word, Character & Reading Time Metrics"
      category="writing"
      description="Calculate real-time word counts, character lengths, sentence structures, and estimated reading/speaking times."
      icon="📊"
      onReset={() => setText('')}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs text-neutral-400 mb-1">Editor Content</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="Paste text here to inspect metrics..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 font-sans"
          />
        </div>

        {data && (
          <div className="space-y-4">
            {/* Primary Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-xs text-neutral-400">Total Words</div>
                <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">
                  {data.words.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-xs text-neutral-400">Characters</div>
                <div className="text-2xl font-mono font-bold text-neutral-100 mt-1">
                  {data.characters.toLocaleString()}
                </div>
                <div className="text-[10px] text-neutral-500 mt-0.5">
                  {data.charactersNoSpaces.toLocaleString()} without spaces
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-xs text-neutral-400">Sentences</div>
                <div className="text-2xl font-mono font-bold text-neutral-100 mt-1">
                  {data.sentences}
                </div>
                <div className="text-[10px] text-neutral-500 mt-0.5">
                  {data.paragraphs} {data.paragraphs === 1 ? 'paragraph' : 'paragraphs'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-xs text-neutral-400">Avg Word Length</div>
                <div className="text-2xl font-mono font-bold text-neutral-100 mt-1">
                  {data.avgWordLength}
                </div>
                <div className="text-[10px] text-neutral-500 mt-0.5">chars / word</div>
              </div>
            </div>

            {/* Reading and Speaking Times */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-neutral-300">Estimated Reading Time</div>
                  <div className="text-sm text-neutral-400 mt-0.5">Based on 200 words per minute</div>
                </div>
                <div className="text-xl font-mono font-bold text-emerald-400">
                  {data.readingTimeSeconds < 60
                    ? `${data.readingTimeSeconds} sec`
                    : `${data.readingTimeMinutes} min`}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-neutral-300">Estimated Speaking Time</div>
                  <div className="text-sm text-neutral-400 mt-0.5">Based on 130 words per minute (podcasts/speeches)</div>
                </div>
                <div className="text-xl font-mono font-bold text-neutral-200">
                  {data.speakingTimeSeconds < 60
                    ? `${data.speakingTimeSeconds} sec`
                    : `${data.speakingTimeMinutes} min`}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
};
