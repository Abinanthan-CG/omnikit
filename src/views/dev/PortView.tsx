import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { searchPorts } from '../../engines/dev/portTools';

export const PortView: React.FC = () => {
  const [query, setQuery] = useState('');
  const ports = searchPorts(query);

  const POPULAR_PORTS = [22, 80, 443, 3000, 3306, 5432, 6379, 8080];

  return (
    <ToolShell
      title="TCP / UDP Port Directory & Lookup"
      category="dev"
      description="Quick reference directory for standard IANA network ports, databases, and dev server sockets."
      icon="🔌"
      onReset={() => {
        setQuery('');
      }}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search port number, protocol, service (e.g. 5432, postgres, ssh)..."
            className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">Quick Picks:</span>
          {POPULAR_PORTS.map((p) => (
            <button
              key={p}
              onClick={() => setQuery(String(p))}
              className="px-2.5 py-1 text-xs rounded font-mono bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              :{p}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {ports.map((entry) => (
            <div
              key={entry.port + entry.service}
              className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1 hover:border-neutral-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold font-mono text-emerald-400">
                  :{entry.port}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                  {entry.protocol}
                </span>
              </div>
              <div className="text-xs font-semibold text-neutral-200">
                {entry.service}
              </div>
              <div className="text-[11px] text-neutral-500 leading-snug">
                {entry.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
};
