import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { textToMorse, morseToText } from '../../engines/writing/morseTools';

export const MorseView: React.FC = () => {
  const [mode, setMode] = useState<'text2morse' | 'morse2text'>('text2morse');
  const [inputVal, setInputVal] = useState('CQ CQ CQ DE OMNIKIT');

  const outputVal = mode === 'text2morse' ? textToMorse(inputVal) : morseToText(inputVal);

  return (
    <ToolShell
      title="International Morse Code Translator"
      category="writing"
      description="Translate plain text to international Morse code dots and dashes, or decode transmissions back to readable text."
      icon="📻"
      onReset={() => {
        setInputVal('SOS');
        setMode('text2morse');
      }}
    >
      <div className="space-y-6">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setMode('text2morse');
              setInputVal('SOS');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              mode === 'text2morse' ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Text ➔ Morse Code
          </button>
          <button
            onClick={() => {
              setMode('morse2text');
              setInputVal('... --- ...');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              mode === 'morse2text' ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Morse Code ➔ Text
          </button>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">
            {mode === 'text2morse' ? 'Plain Text Input' : 'Morse Code Input (. and -)'}
          </label>
          <textarea
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            rows={4}
            placeholder={mode === 'text2morse' ? 'Enter text to encode...' : 'Enter dots and dashes (e.g. ... --- ...)...'}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono resize-y focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono text-neutral-400">
              {mode === 'text2morse' ? 'Morse Code Output' : 'Decoded Plain Text'}
            </label>
            {outputVal && <CopyButton text={outputVal} label="Copy Output" />}
          </div>
          <textarea
            readOnly
            value={outputVal}
            rows={4}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-emerald-400 font-mono resize-y focus:outline-none"
          />
        </div>
      </div>
    </ToolShell>
  );
};
