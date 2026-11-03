import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { encodeUrl, decodeUrl, parseQueryParams } from '../../engines/dev/urlTools';

export const UrlView: React.FC = () => {
  const [input, setInput] = useState('https://example.com/search?query=hello world&category=dev&sort=desc');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const encoded = encodeUrl(input);
  const decoded = decodeUrl(input);
  const params = parseQueryParams(input);

  const activeValue = mode === 'encode' ? (encoded.success ? encoded.value : '') : (decoded.success ? decoded.value : '');

  return (
    <ToolShell
      title="URL Encoder & Decoder"
      category="dev"
      description="Encode and decode query strings, parse parameters, and format clean URI components."
      icon="🔗"
      onReset={() => setInput('')}
    >
      <div className="space-y-6">
        <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-800 w-fit">
          <button
            onClick={() => setMode('encode')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              mode === 'encode' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Encode URL
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              mode === 'decode' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Decode URL
          </button>
        </div>

        <div>
          <label className="block text-xs text-neutral-400 mb-1">Target URL / Query String</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            placeholder="https://..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400">
              {mode === 'encode' ? 'Encoded URL' : 'Decoded URL'}
            </span>
            {activeValue && <CopyButton text={activeValue} />}
          </div>
          <div className="font-mono text-sm text-emerald-400 break-all select-all bg-neutral-900/50 p-3 rounded border border-neutral-800/80">
            {activeValue || <span className="text-neutral-600 italic">No output</span>}
          </div>
        </div>

        {params.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-neutral-400">Parsed Query Parameters ({params.length})</span>
            <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-950">
              <table className="w-full text-xs text-left">
                <thead className="bg-neutral-900/80 text-neutral-400 uppercase font-mono">
                  <tr>
                    <th className="py-2 px-3 border-b border-neutral-800">Key</th>
                    <th className="py-2 px-3 border-b border-neutral-800">Value</th>
                    <th className="py-2 px-3 border-b border-neutral-800 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 font-mono">
                  {params.map((p, idx) => (
                    <tr key={idx} className="hover:bg-neutral-900/30">
                      <td className="py-2 px-3 text-emerald-400 font-semibold">{p.key}</td>
                      <td className="py-2 px-3 text-neutral-200 break-all">{p.value}</td>
                      <td className="py-2 px-3 text-right">
                        <CopyButton text={p.value} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
};
