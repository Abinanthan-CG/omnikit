import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { spellNato } from '../../engines/writing/natoTools';

export const NatoView: React.FC = () => {
  const [text, setText] = useState('MAYDAY 7700');

  const res = spellNato(text);

  return (
    <ToolShell
      title="NATO Phonetic Alphabet & Aviation Spelling"
      category="writing"
      description="Translate words, callsigns, and serial numbers into clear ICAO / NATO phonetic code words for voice radio clarity."
      icon="✈️"
      onReset={() => setText('')}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Input Call-Sign or Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type word or license plate (e.g. BRAVO 42)..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono text-neutral-400">Phonetic Readout ({res.totalLetters} characters)</label>
            <CopyButton text={res.formattedString} label="Copy Phonetic Text" />
          </div>
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl text-base font-mono font-medium text-emerald-400 min-h-[4rem] flex items-center">
            {res.formattedString || <span className="text-neutral-600">Enter text above to spell phonetically...</span>}
          </div>
        </div>

        {res.words.length > 0 && (
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-2">Word Breakdown</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {res.words.map((w, idx) => (
                <div key={idx} className="p-2.5 bg-neutral-900/50 border border-neutral-800/80 rounded-lg text-center">
                  <span className="text-sm font-bold text-neutral-200">{w.char}</span>
                  <div className="text-xs font-mono text-emerald-400 mt-0.5">{w.word}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
};
