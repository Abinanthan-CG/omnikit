import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { curlToFetch, curlToPython, parseCurl } from '../../engines/dev/curlTools';

const SAMPLE_CURL = `curl -X POST "https://api.example.com/v1/users" \\
  -H "Authorization: Bearer my_secret_token_123" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Alice", "role": "admin"}'`;

export const CurlView: React.FC = () => {
  const [curl, setCurl] = useState(SAMPLE_CURL);
  const [lang, setLang] = useState<'fetch' | 'python'>('fetch');

  const fetchCode = curlToFetch(curl);
  const pythonCode = curlToPython(curl);
  const parsed = parseCurl(curl);

  const activeCode = lang === 'fetch' ? fetchCode : pythonCode;

  return (
    <ToolShell
      title="Curl to Code Converter"
      category="dev"
      description="Convert cURL terminal commands into ready-to-run JavaScript fetch() and Python requests code."
      icon="🌐"
      onReset={() => setCurl(SAMPLE_CURL)}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs text-neutral-400 mb-1">cURL Command</label>
          <textarea
            value={curl}
            onChange={(e) => setCurl(e.target.value)}
            rows={4}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-100 font-mono focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setLang('fetch')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors ${
              lang === 'fetch' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-neutral-950 text-neutral-400 border-neutral-800'
            }`}
          >
            JavaScript (fetch)
          </button>
          <button
            onClick={() => setLang('python')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors ${
              lang === 'python' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-neutral-950 text-neutral-400 border-neutral-800'
            }`}
          >
            Python (requests)
          </button>
        </div>

        <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-neutral-400 font-semibold font-mono">
              {lang === 'fetch' ? 'JavaScript fetch()' : 'Python requests'}
            </span>
            <CopyButton text={activeCode} />
          </div>
          <pre className="font-mono text-xs text-emerald-400 bg-neutral-900/50 p-3 rounded overflow-x-auto leading-relaxed">
            {activeCode}
          </pre>
        </div>

        {parsed.url && (
          <div className="text-xs text-neutral-500 font-mono">
            Detected: <span className="text-emerald-400">{parsed.method}</span> {parsed.url}
          </div>
        )}
      </div>
    </ToolShell>
  );
};
