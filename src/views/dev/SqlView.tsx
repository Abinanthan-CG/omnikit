import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { formatSql } from '../../engines/dev/sqlTools';

export const SqlView: React.FC = () => {
  const [sql, setSql] = useState(
    'select u.id, u.username, p.title, p.created_at from users u inner join posts p on p.user_id = u.id where u.active = 1 and p.published = true order by p.created_at desc limit 20;'
  );
  const [uppercase, setUppercase] = useState(true);

  const formatted = formatSql(sql, { uppercase, indent: '  ' });

  return (
    <ToolShell
      title="SQL Formatter & Beautifier"
      category="dev"
      description="Format and indent raw SQL queries with syntax structure and uppercase clause keywords."
      icon="🗄️"
      onReset={() => {
        setSql('');
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded bg-neutral-900 border-neutral-700 text-emerald-500 focus:ring-0"
            />
            Uppercase SQL Keywords
          </label>
          <button
            onClick={() => {
              setSql('SELECT * FROM customers WHERE country = \'US\' GROUP BY state ORDER BY total DESC LIMIT 10;');
            }}
            className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            Load Sample Query
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-2">Input Raw SQL</label>
            <textarea
              value={sql}
              onChange={(e) => setSql(e.target.value)}
              placeholder="Paste raw SQL query here..."
              rows={12}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono resize-y focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-mono text-neutral-400">Formatted SQL</label>
              <CopyButton text={formatted} label="Copy SQL" />
            </div>
            <textarea
              readOnly
              value={formatted}
              rows={12}
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl p-3 text-sm text-emerald-400 font-mono resize-y focus:outline-none"
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
