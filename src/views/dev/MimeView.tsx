import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { searchMimes } from '../../engines/dev/mimeTools';

export const MimeView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const mimes = searchMimes(query, category);

  const CATEGORIES = ['All', 'Application', 'Audio', 'Image', 'Video', 'Text', 'Font'];

  return (
    <ToolShell
      title="MIME Content-Types & Extensions Directory"
      category="dev"
      description="Search IANA standard MIME content-types, file extension mappings, and format descriptions."
      icon="📂"
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
            placeholder="Search by extension (.mp4, .json, .png) or MIME (audio/wav, application/pdf)..."
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
          {mimes.map((item) => (
            <div
              key={item.mime}
              className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1.5 hover:border-neutral-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {item.extension}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                  {item.category}
                </span>
              </div>
              <div className="text-xs font-mono text-neutral-200 break-all">
                {item.mime}
              </div>
              <div className="text-[11px] text-neutral-500">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
};
