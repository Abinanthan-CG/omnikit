import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { minifySql } from '../../engines/dev/sqlMinifierTools';

const SAMPLE_SQL = `-- Retrieve users with active subscription
SELECT 
    u.id, 
    u.username, 
    u.email,
    s.plan_name,
    s.expires_at
/* Join subscription table */
FROM users u
LEFT JOIN subscriptions s ON u.id = s.user_id
WHERE u.status = 'ACTIVE' 
  AND s.is_paid = 1
ORDER BY u.created_at DESC;`;

export const SqlMinifyView: React.FC = () => {
  const [sql, setSql] = useState(SAMPLE_SQL);

  const res = minifySql(sql);

  return (
    <ToolShell
      title="SQL Query Minifier & Comment Stripper"
      category="dev"
      description="Compress database queries, strip single/multi-line comments, and collapse whitespace for embedded SQL strings."
      icon="🗄️"
      onReset={() => setSql(SAMPLE_SQL)}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Formatted SQL Input</label>
          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            rows={8}
            placeholder="Paste verbose SQL query here..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-100 font-mono resize-y focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Original Size</span>
            <div className="text-lg font-bold font-mono text-neutral-200 mt-1">{res.originalBytes} bytes</div>
          </div>
          <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Minified Size</span>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-1">{res.minifiedBytes} bytes</div>
          </div>
          <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Size Savings</span>
            <div className="text-lg font-bold font-mono text-sky-400 mt-1">{res.savingsPercent}%</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono text-neutral-400">Minified Single-Line SQL</label>
            <CopyButton text={res.minifiedSql} label="Copy Minified SQL" />
          </div>
          <textarea
            readOnly
            value={res.minifiedSql}
            rows={4}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-emerald-400 font-mono resize-y focus:outline-none"
          />
        </div>
      </div>
    </ToolShell>
  );
};
