import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { analyzeCharacterDistribution } from '../../engines/writing/charStatsTools';

export const CharStatsView: React.FC = () => {
  const [text, setText] = useState(
    'Omnikit 2026: Fast, Private, Offline Tools!\nExplore 95+ developer & media utilities in your browser.'
  );

  const stats = analyzeCharacterDistribution(text);

  return (
    <ToolShell
      title="Character & Case Distribution"
      category="writing"
      description="Inspect character breakdowns, uppercase/lowercase balance, digits, punctuation, and ASCII counts."
      icon="📊"
      onReset={() => setText('')}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Input Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Type or paste text to break down character statistics..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-sans resize-y focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <div className="p-3.5 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Total Characters</span>
            <div className="text-2xl font-bold text-neutral-100 mt-1">{stats.totalChars}</div>
          </div>
          <div className="p-3.5 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Letters</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{stats.letters}</div>
            <div className="text-[11px] text-neutral-500 mt-0.5">
              {stats.uppercaseLetters} up · {stats.lowercaseLetters} low
            </div>
          </div>
          <div className="p-3.5 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Digits (0-9)</span>
            <div className="text-2xl font-bold text-sky-400 mt-1">{stats.digits}</div>
          </div>
          <div className="p-3.5 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Whitespace</span>
            <div className="text-2xl font-bold text-amber-400 mt-1">{stats.spaces}</div>
          </div>
          <div className="p-3.5 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Punctuation</span>
            <div className="text-2xl font-bold text-purple-400 mt-1">{stats.punctuation}</div>
          </div>
          <div className="p-3.5 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">ASCII Standard</span>
            <div className="text-2xl font-bold text-teal-400 mt-1">{stats.asciiChars}</div>
          </div>
          <div className="p-3.5 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Non-ASCII / Unicode</span>
            <div className="text-2xl font-bold text-pink-400 mt-1">{stats.nonAsciiChars}</div>
          </div>
          <div className="p-3.5 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Lines</span>
            <div className="text-2xl font-bold text-indigo-400 mt-1">{stats.lineCount}</div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
