import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { toAlternatingCase, toInvertedCase, toRandomCase } from '../../engines/writing/altCaseTools';

export const AltCaseView: React.FC = () => {
  const [text, setText] = useState('you cannot simply port 125 tools in one day');

  const alt = toAlternatingCase(text);
  const inv = toInvertedCase(text);
  const rnd = toRandomCase(text);

  return (
    <ToolShell
      title="Alternating & Inverted Case Generator"
      category="writing"
      description="Transform text into sarcastic meme aLtErNaTiNg cAsE, inverted case, or randomized casing."
      icon="🙃"
      onReset={() => {
        setText('you cannot simply port 125 tools in one day');
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Original Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono resize-none focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">aLtErNaTiNg cAsE (Meme / Mocking Spongebob)</span>
              <CopyButton text={alt} label="Copy" />
            </div>
            <pre className="p-3 bg-neutral-900 rounded font-mono text-emerald-400 text-xs whitespace-pre-wrap select-all">
              {alt}
            </pre>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">iNVERTED cASE (Caps Lock Inversion)</span>
              <CopyButton text={inv} label="Copy" />
            </div>
            <pre className="p-3 bg-neutral-900 rounded font-mono text-sky-400 text-xs whitespace-pre-wrap select-all">
              {inv}
            </pre>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">RaNdOm CaSe (Chaotic Jumble)</span>
              <CopyButton text={rnd} label="Copy" />
            </div>
            <pre className="p-3 bg-neutral-900 rounded font-mono text-amber-400 text-xs whitespace-pre-wrap select-all">
              {rnd}
            </pre>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
