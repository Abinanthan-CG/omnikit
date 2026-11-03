import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { analyzeKeywordDensity } from '../../engines/writing/textAnalysisTools';

const SAMPLE_TEXT = `Search engine optimization and content strategy require high quality writing. Content writers should optimize keyword density without keyword stuffing. Good content engages readers while maintaining search clarity. Quality content always wins.`;

export const TextAnalysisView: React.FC = () => {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [filterStopWords, setFilterStopWords] = useState(true);

  const analysis = analyzeKeywordDensity(text, filterStopWords);

  return (
    <ToolShell
      title="Keyword Density & Frequency Analyzer"
      category="writing"
      description="Analyze repetitive word patterns, keyword distribution, and SEO keyword density percentages."
      icon="📈"
      onReset={() => setText('')}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs text-neutral-400 mb-1">Target Article / Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Type or paste article..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-100 font-sans focus:outline-none focus:border-emerald-500 leading-relaxed"
          />
        </div>

        <div className="flex justify-between items-center text-xs">
          <div className="flex gap-4">
            <span className="text-neutral-400">Total Words: <strong className="text-neutral-100">{analysis.totalWords}</strong></span>
            <span className="text-neutral-400">Unique Words: <strong className="text-neutral-100">{analysis.uniqueWords}</strong></span>
          </div>

          <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
            <input
              type="checkbox"
              checked={filterStopWords}
              onChange={(e) => setFilterStopWords(e.target.checked)}
              className="rounded bg-neutral-900 border-neutral-800 text-emerald-500"
            />
            Filter Common Stop Words (the, and, is)
          </label>
        </div>

        <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
          <table className="w-full text-xs text-left">
            <thead className="bg-neutral-900 text-neutral-400 uppercase font-mono">
              <tr>
                <th className="py-2.5 px-3 border-b border-neutral-800">Word</th>
                <th className="py-2.5 px-3 border-b border-neutral-800">Count</th>
                <th className="py-2.5 px-3 border-b border-neutral-800">Density (%)</th>
                <th className="py-2.5 px-3 border-b border-neutral-800">Visual Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {analysis.frequencies.map((f) => (
                <tr key={f.word} className="hover:bg-neutral-900/30">
                  <td className="py-2 px-3 font-semibold text-emerald-400 font-mono">{f.word}</td>
                  <td className="py-2 px-3 text-neutral-200">{f.count}</td>
                  <td className="py-2 px-3 text-neutral-300 font-mono">{f.percentage}%</td>
                  <td className="py-2 px-3 w-40">
                    <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${Math.min(100, f.percentage * 5)}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {analysis.frequencies.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-neutral-500 italic">
                    Type text above to extract keywords
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ToolShell>
  );
};
