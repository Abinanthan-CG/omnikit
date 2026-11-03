import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { filterHttpStatus } from '../../engines/dev/httpStatusTools';

export const HttpStatusView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const statuses = filterHttpStatus(query, category);

  const CATEGORIES = ['All', '1xx', '2xx', '3xx', '4xx', '5xx'];

  return (
    <ToolShell
      title="HTTP Status Codes Explorer"
      category="dev"
      description="Interactive directory of official RFC HTTP status response codes with descriptions and categories."
      icon="🌐"
      onReset={() => {
        setQuery('');
        setCategory('All');
      }}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search code number or phrase (e.g. 404, not found, forbidden, 500)..."
            className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 text-xs rounded-lg font-mono border transition-all ${
                category === cat
                  ? 'bg-neutral-800 border-neutral-600 text-emerald-400 font-bold'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {statuses.map((item) => {
            let color = 'text-neutral-300';
            let badgeBg = 'bg-neutral-900 text-neutral-400';
            if (item.code >= 200 && item.code < 300) {
              color = 'text-emerald-400';
              badgeBg = 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40';
            } else if (item.code >= 300 && item.code < 400) {
              color = 'text-sky-400';
              badgeBg = 'bg-sky-950/60 text-sky-400 border border-sky-800/40';
            } else if (item.code >= 400 && item.code < 500) {
              color = 'text-amber-400';
              badgeBg = 'bg-amber-950/60 text-amber-400 border border-amber-800/40';
            } else if (item.code >= 500) {
              color = 'text-red-400';
              badgeBg = 'bg-red-950/60 text-red-400 border border-red-800/40';
            }

            return (
              <div
                key={item.code}
                className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1.5 hover:border-neutral-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xl font-bold font-mono ${color}`}>
                    {item.code}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${badgeBg}`}>
                    {item.category.split(' ')[0]}
                  </span>
                </div>
                <div className="text-xs font-semibold text-neutral-100">
                  {item.message}
                </div>
                <div className="text-[11px] text-neutral-400 leading-relaxed">
                  {item.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ToolShell>
  );
};
