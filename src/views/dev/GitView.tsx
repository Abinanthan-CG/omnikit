import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { filterGitRecipes } from '../../engines/dev/gitTools';

export const GitView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const recipes = filterGitRecipes(query, category);

  const CATEGORIES = ['All', 'Undoing', 'Commits', 'Branches', 'Stash', 'Remote'];

  return (
    <ToolShell
      title="Git Cheat Sheet & Command Generator"
      category="dev"
      description="Quick reference and copyable commands for undoing commits, squashing, stashing, and safe force pushing."
      icon="🌿"
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
            placeholder="Search git commands (e.g. undo, amend, stash, branch, cherry-pick)..."
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

        <div className="space-y-3">
          {recipes.map((r) => (
            <div
              key={r.title}
              className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2 hover:border-neutral-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-100 font-mono">
                  {r.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                  {r.category}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 p-2 bg-neutral-900 rounded-lg">
                <code className="text-xs font-mono text-emerald-400 select-all overflow-x-auto">
                  {r.command}
                </code>
                <CopyButton text={r.command} label="Copy" />
              </div>
              <p className="text-[11px] text-neutral-400">
                {r.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
};
