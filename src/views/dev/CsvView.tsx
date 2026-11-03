import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { jsonToCsv, csvToJson } from '../../engines/dev/csvTools';

export const CsvView: React.FC = () => {
  const [mode, setMode] = useState<'json2csv' | 'csv2json'>('json2csv');
  const [input, setInput] = useState(
    JSON.stringify(
      [
        { id: 101, name: 'Wireless Mic', category: 'Audio', price: 149.99 },
        { id: 102, name: 'Camera Rig', category: 'Video', price: 289.0 },
        { id: 103, name: 'LED Wand', category: 'Lighting', price: 89.5 }
      ],
      null,
      2
    )
  );

  const output = mode === 'json2csv' ? jsonToCsv(input) : csvToJson(input);

  const switchMode = (m: 'json2csv' | 'csv2json') => {
    if (m !== mode) {
      setMode(m);
      setInput(output);
    }
  };

  return (
    <ToolShell
      title="JSON ↔ CSV Table Converter"
      category="dev"
      description="Convert bidirectionally between JSON array objects and comma-separated CSV tabular data."
      icon="📑"
      onReset={() => {
        setInput('[]');
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => switchMode('json2csv')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
              mode === 'json2csv' ? 'bg-neutral-800 text-neutral-100 font-semibold border border-neutral-700' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            JSON → CSV
          </button>
          <button
            onClick={() => switchMode('csv2json')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
              mode === 'csv2json' ? 'bg-neutral-800 text-neutral-100 font-semibold border border-neutral-700' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            CSV → JSON
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-2">
              {mode === 'json2csv' ? 'JSON Input (Array of Objects)' : 'CSV Input (With Header Row)'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono resize-y focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono text-neutral-400">
                {mode === 'json2csv' ? 'Generated CSV' : 'Generated JSON'}
              </label>
              <CopyButton text={output} label="Copy Output" />
            </div>
            <textarea
              readOnly
              value={output}
              rows={12}
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl p-3 text-sm text-emerald-400 font-mono resize-y focus:outline-none"
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
