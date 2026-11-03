import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { inspectUrl } from '../../engines/dev/urlInspectTools';

export const UrlInspectView: React.FC = () => {
  const [urlInput, setUrlInput] = useState(
    'https://api.github.com:443/repos/Abinanthan-CG/omnikit/issues?state=open&sort=created&direction=desc#results'
  );

  const res = inspectUrl(urlInput);

  return (
    <ToolShell
      title="Deep URL & Query String Inspector"
      category="dev"
      description="Deconstruct URLs into protocol, host, port, subpaths, anchor hash, and structured query parameter matrix."
      icon="🔍"
      onReset={() => setUrlInput('https://example.com')}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-1">Target URL</label>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/path?query=val"
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none"
          />
        </div>

        {res.isValid ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl">
                <span className="text-xs text-neutral-500 font-mono">Protocol</span>
                <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">{res.protocol}</div>
              </div>
              <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl">
                <span className="text-xs text-neutral-500 font-mono">Hostname</span>
                <div className="text-sm font-bold font-mono text-sky-400 mt-0.5">{res.hostname}</div>
              </div>
              <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl">
                <span className="text-xs text-neutral-500 font-mono">Port</span>
                <div className="text-sm font-bold font-mono text-purple-400 mt-0.5">{res.port || 'default'}</div>
              </div>
              <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl">
                <span className="text-xs text-neutral-500 font-mono">Hash Fragment</span>
                <div className="text-sm font-bold font-mono text-amber-400 mt-0.5">{res.hash || 'none'}</div>
              </div>
            </div>

            <div>
              <span className="text-xs text-neutral-400 font-mono block mb-2">Path Hierarchy Segments</span>
              <div className="flex flex-wrap gap-1.5 p-3 bg-neutral-950 border border-neutral-800 rounded-xl">
                <span className="px-2.5 py-1 bg-neutral-900 text-neutral-500 text-xs font-mono rounded">/</span>
                {res.pathSegments.map((seg, i) => (
                  <span key={i} className="px-2.5 py-1 bg-neutral-800 text-neutral-200 text-xs font-mono rounded">
                    {seg}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-neutral-400 font-mono">Query Parameters ({res.queryParams.length})</span>
                <CopyButton
                  text={JSON.stringify(Object.fromEntries(res.queryParams.map((p) => [p.key, p.value])), null, 2)}
                  label="Copy as JSON"
                />
              </div>
              {res.queryParams.length > 0 ? (
                <div className="border border-neutral-800 rounded-xl overflow-hidden divide-y divide-neutral-800">
                  {res.queryParams.map((p, i) => (
                    <div key={i} className="p-2.5 bg-neutral-950 flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-400 font-semibold">{p.key}</span>
                      <span className="text-neutral-300 bg-neutral-900 px-2 py-0.5 rounded">{p.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-500 text-xs font-mono">
                  No query parameters present.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-mono">
            Please enter a valid absolute URL (e.g. https://example.com/path).
          </div>
        )}
      </div>
    </ToolShell>
  );
};
