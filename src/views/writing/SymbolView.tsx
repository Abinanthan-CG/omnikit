import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { filterSymbols } from '../../engines/writing/symbolTools';

export const SymbolView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [copiedChar, setCopiedChar] = useState<string | null>(null);

  const symbols = filterSymbols(query, category);

  const CATEGORIES = ['All', 'Arrows', 'Typography', 'Math', 'Currency', 'Tech'];

  const handleCopy = (char: string) => {
    navigator.clipboard?.writeText(char);
    setCopiedChar(char);
    setTimeout(() => setCopiedChar(null), 1500);
  };

  return (
    <ToolShell
      title="Unicode Symbol & Special Character Map"
      category="writing"
      description="Quick lookup and single-click copy for typographical dashes, math symbols, currency, and tech keys."
      icon="🔣"
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
            placeholder="Search symbol name, glyph, or unicode (e.g. arrow, dash, euro)..."
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

        {/* Symbol grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {symbols.map((s) => (
            <button
              key={s.code + s.name}
              onClick={() => handleCopy(s.char)}
              className="p-3 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all group relative"
            >
              <span className="text-2xl text-neutral-100 group-hover:scale-110 transition-transform">
                {s.char}
              </span>
              <span className="text-[11px] font-mono text-neutral-400 truncate w-full text-center">
                {s.name}
              </span>
              <span className="text-[9px] font-mono text-neutral-600">
                {s.code}
              </span>
              {copiedChar === s.char && (
                <div className="absolute inset-0 bg-emerald-500/90 rounded-xl flex items-center justify-center text-xs font-mono font-bold text-neutral-950 animate-fade-in">
                  Copied!
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </ToolShell>
  );
};
