import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateZalgo, ZalgoOptions } from '../../engines/writing/zalgoTools';

export const ZalgoView: React.FC = () => {
  const [text, setText] = useState('OMNIKIT IS WATCHING');
  const [intensity, setIntensity] = useState<ZalgoOptions['intensity']>('medium');
  const [seed, setSeed] = useState(0);

  // Re-generate when seed changes
  const zalgoText = React.useMemo(() => {
    return generateZalgo(text, { intensity });
  }, [text, intensity, seed]);

  return (
    <ToolShell
      title="Zalgo Glitch & Corrupted Text Generator"
      category="writing"
      description="Inject chaotic stacked Unicode diacritical marks to generate void, cursed, and glitch aesthetic typography."
      icon="👹"
      onReset={() => {
        setText('OMNIKIT IS WATCHING');
        setIntensity('medium');
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Source Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-sans focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {(['low', 'medium', 'high'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setIntensity(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-colors ${
                  intensity === lvl ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {lvl} Chaos
              </button>
            ))}
          </div>
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-xs font-mono text-neutral-300 rounded-lg transition-colors"
          >
            🎲 Re-Glitch
          </button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono text-neutral-400">Corrupted Output</label>
            <CopyButton text={zalgoText} label="Copy Zalgo Text" />
          </div>
          <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl min-h-[6rem] flex items-center justify-center text-lg font-mono text-rose-400 overflow-hidden break-all select-all">
            {zalgoText || 'Enter text above...'}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
