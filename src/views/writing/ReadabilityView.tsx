import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { calculateReadability } from '../../engines/writing/readabilityTools';

export const ReadabilityView: React.FC = () => {
  const [text, setText] = useState(
    'Omnikit is a lightning-fast collection of client-side micro-tools for creators, developers, and engineers. Everything runs completely inside your browser with zero remote servers and zero data tracking. This keeps your sensitive documents, passwords, and tokens completely private.'
  );

  const res = calculateReadability(text);

  return (
    <ToolShell
      title="Flesch Readability & Grade Level"
      category="writing"
      description="Evaluate reading ease, Flesch-Kincaid school grade level, and average sentence complexity metrics."
      icon="📖"
      onReset={() => {
        setText('');
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Input Copy / Article Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="Type or paste prose here to analyze readability..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-sans resize-y focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Flesch Reading Ease</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{res.fleschReadingEase} / 100</div>
            <div className="text-xs text-neutral-400 mt-0.5">{res.readingEaseLabel}</div>
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Kincaid Grade Level</span>
            <div className="text-2xl font-bold text-sky-400 mt-1">{res.fleschKincaidGrade}</div>
            <div className="text-xs text-neutral-400 mt-0.5">{res.gradeLabel}</div>
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Avg Sentence Length</span>
            <div className="text-2xl font-bold text-neutral-200 mt-1">{res.avgWordsPerSentence}</div>
            <div className="text-xs text-neutral-400 mt-0.5">words per sentence</div>
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Word Complexity</span>
            <div className="text-2xl font-bold text-neutral-200 mt-1">{res.avgSyllablesPerWord}</div>
            <div className="text-xs text-neutral-400 mt-0.5">syllables per word</div>
          </div>
        </div>

        <div className="p-4 bg-neutral-950/50 border border-neutral-800 rounded-xl flex items-center justify-between text-xs font-mono text-neutral-400">
          <span>Total Words: <strong className="text-neutral-200">{res.words}</strong></span>
          <span>Sentences: <strong className="text-neutral-200">{res.sentences}</strong></span>
          <span>Syllables: <strong className="text-neutral-200">{res.syllables}</strong></span>
        </div>
      </div>
    </ToolShell>
  );
};
