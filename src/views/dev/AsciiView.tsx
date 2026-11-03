import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateAsciiBanner, AsciiStyle } from '../../engines/dev/asciiTools';

export const AsciiView: React.FC = () => {
  const [text, setText] = useState('OMNIKIT');
  const [style, setStyle] = useState<AsciiStyle>('block');

  const banner = generateAsciiBanner(text, style);

  return (
    <ToolShell
      title="ASCII Text Banner Generator"
      category="dev"
      description="Generate retro ASCII block banners and typography headers for terminal scripts and code comments."
      icon="🔤"
      onReset={() => {
        setText('OMNIKIT');
        setStyle('block');
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-mono text-neutral-400 mb-1">Banner Text (A-Z, 0-9)</label>
            <input
              type="text"
              maxLength={20}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Character Style</label>
            <div className="flex gap-1.5 p-1 bg-neutral-950 border border-neutral-800 rounded-lg">
              {(['block', 'slant', 'box'] as AsciiStyle[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`flex-1 py-1.5 text-xs font-mono rounded capitalize transition-all ${
                    style === s ? 'bg-neutral-800 text-neutral-100 font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-mono text-neutral-400">ASCII Art Output</label>
            <CopyButton text={banner} label="Copy ASCII" />
          </div>
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl overflow-x-auto">
            <pre className="font-mono text-xs leading-none text-emerald-400 select-all whitespace-pre">
              {banner || 'Type text above to generate ASCII banner'}
            </pre>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
