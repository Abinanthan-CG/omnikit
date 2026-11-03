import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { humanizeCron } from '../../engines/dev/cronTools';

export const CronView: React.FC = () => {
  const [cron, setCron] = useState('*/15 * * * *');

  const result = humanizeCron(cron);

  const PRESETS = [
    { label: 'Every 15 min', expr: '*/15 * * * *' },
    { label: 'Every hour', expr: '0 * * * *' },
    { label: 'Daily at midnight', expr: '0 0 * * *' },
    { label: 'Weekdays at 9 AM', expr: '0 9 * * 1-5' },
    { label: 'Weekly on Sunday', expr: '0 0 * * 0' },
  ];

  return (
    <ToolShell
      title="Crontab Humanizer & Explainer"
      category="dev"
      description="Translate cryptic cron schedules into human English and explore common presets."
      icon="⏰"
      onReset={() => setCron('*/15 * * * *')}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => setCron(p.expr)}
              className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-300 hover:border-neutral-700 font-mono"
            >
              {p.label} ({p.expr})
            </button>
          ))}
        </div>

        <div>
          <label className="block text-xs text-neutral-400 mb-1">Cron Expression (5 parts)</label>
          <input
            type="text"
            value={cron}
            onChange={(e) => setCron(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-lg font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-neutral-400 font-semibold">Plain English Schedule</span>
            <CopyButton text={result.description} />
          </div>
          <div className="text-lg font-semibold text-neutral-100">
            {result.description}
          </div>
        </div>

        {result.success && (
          <div className="grid grid-cols-5 gap-2 text-center text-xs font-mono">
            <div className="p-2 bg-neutral-950 border border-neutral-800 rounded">
              <div className="text-emerald-400 font-bold">{result.parts.minute}</div>
              <div className="text-neutral-500 text-[10px] uppercase">minute</div>
            </div>
            <div className="p-2 bg-neutral-950 border border-neutral-800 rounded">
              <div className="text-emerald-400 font-bold">{result.parts.hour}</div>
              <div className="text-neutral-500 text-[10px] uppercase">hour</div>
            </div>
            <div className="p-2 bg-neutral-950 border border-neutral-800 rounded">
              <div className="text-emerald-400 font-bold">{result.parts.dayOfMonth}</div>
              <div className="text-neutral-500 text-[10px] uppercase">day (month)</div>
            </div>
            <div className="p-2 bg-neutral-950 border border-neutral-800 rounded">
              <div className="text-emerald-400 font-bold">{result.parts.month}</div>
              <div className="text-neutral-500 text-[10px] uppercase">month</div>
            </div>
            <div className="p-2 bg-neutral-950 border border-neutral-800 rounded">
              <div className="text-emerald-400 font-bold">{result.parts.dayOfWeek}</div>
              <div className="text-neutral-500 text-[10px] uppercase">day (week)</div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
};
