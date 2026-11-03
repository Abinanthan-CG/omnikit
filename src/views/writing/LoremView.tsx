import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateLoremIpsum } from '../../engines/writing/loremTools';

export const LoremView: React.FC = () => {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [seed, setSeed] = useState(0);

  const text = generateLoremIpsum(type, count, startWithLorem);

  return (
    <ToolShell
      title="Lorem Ipsum Dummy Copy Generator"
      category="writing"
      description="Generate placeholder text by paragraphs, sentences, or words with single-click copy."
      icon="📄"
      onReset={() => {
        setType('paragraphs');
        setCount(3);
        setStartWithLorem(true);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Generate By</label>
            <div className="flex bg-neutral-900 p-1 rounded-lg border border-neutral-800">
              {(['paragraphs', 'sentences', 'words'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex-1 py-1 text-xs capitalize rounded-md transition-colors ${
                    type === t ? 'bg-emerald-500/20 text-emerald-400 font-semibold' : 'text-neutral-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Quantity ({count})</label>
            <input
              type="range"
              min="1"
              max={type === 'words' ? 100 : 15}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="rounded bg-neutral-900 border-neutral-800 text-emerald-500"
              />
              Start with "Lorem ipsum..."
            </label>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setSeed(s => s + 1)}
            className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-200 rounded-lg transition-colors"
          >
            Regenerate ({seed})
          </button>
          <CopyButton text={text} label="Copy All Text" />
        </div>

        <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl leading-relaxed text-sm text-neutral-200 whitespace-pre-wrap select-all font-serif">
          {text}
        </div>
      </div>
    </ToolShell>
  );
};
