import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { testRegex } from '../../engines/dev/regexTools';

export const RegexView: React.FC = () => {
  const [pattern, setPattern] = useState('([A-Z0-9._%+-]+)@([A-Z0-9.-]+\\.[A-Z]{2,})');
  const [flags, setFlags] = useState('gi');
  const [testText, setTestText] = useState(
    'Contact support at help@omnikit.dev or sales@example.org for enterprise license questions.'
  );

  const res = testRegex(pattern, flags, testText);

  return (
    <ToolShell
      title="RegEx Match Tester & Groups"
      category="dev"
      description="Test Regular Expressions in real-time with capture group extraction, flags, and match indices."
      icon="🔍"
      onReset={() => {
        setPattern('');
        setTestText('');
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="sm:col-span-3">
            <label className="block text-xs font-mono text-neutral-400 mb-1">Regular Expression Pattern</label>
            <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden focus-within:border-neutral-600">
              <span className="px-3 text-neutral-500 font-mono text-sm">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="pattern..."
                className="w-full bg-transparent p-2 text-sm text-neutral-100 font-mono focus:outline-none"
              />
              <span className="px-3 text-neutral-500 font-mono text-sm">/</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Flags (g, i, m, s)</label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono focus:outline-none focus:border-neutral-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Test String</label>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            rows={4}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono resize-y focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <label className="text-xs font-mono text-neutral-400">Match Results</label>
              <span className="px-2 py-0.5 text-xs bg-neutral-800 text-neutral-200 rounded-full font-mono">
                {res.count} {res.count === 1 ? 'match' : 'matches'}
              </span>
            </div>
            {res.isValid && (
              <span className="text-xs text-neutral-500 font-mono">{res.executionTimeMs}ms execution</span>
            )}
          </div>

          {!res.isValid ? (
            <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-red-400 text-xs font-mono">
              Syntax Error: {res.error}
            </div>
          ) : res.matches.length === 0 ? (
            <div className="p-4 bg-neutral-950/60 border border-neutral-800/80 rounded-xl text-center text-xs text-neutral-500 font-mono">
              No matches found in test string
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {res.matches.map((m, idx) => (
                <div key={idx} className="p-3 bg-neutral-950/80 border border-neutral-800 rounded-lg flex flex-col gap-1 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 font-semibold">Match #{idx + 1}: &quot;{m.match}&quot;</span>
                    <span className="text-neutral-500">index {m.index}</span>
                  </div>
                  {m.groups.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {m.groups.map((grp, gIdx) => (
                        <span key={gIdx} className="px-2 py-0.5 bg-neutral-900 border border-neutral-700/60 rounded text-neutral-300">
                          Group {gIdx + 1}: {grp}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ToolShell>
  );
};
