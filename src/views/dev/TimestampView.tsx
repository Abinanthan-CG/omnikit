import React, { useState, useEffect } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { convertTimestamp, getCurrentTimestamp } from '../../engines/dev/timestamp';

export const TimestampView: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const [liveNow, setLiveNow] = useState(getCurrentTimestamp());

  // Update live clock every second
  useEffect(() => {
    const timer = setInterval(() => setLiveNow(getCurrentTimestamp()), 1000);
    return () => clearInterval(timer);
  }, []);

  const effectiveInput = inputVal || liveNow.seconds.toString();
  const res = convertTimestamp(effectiveInput);
  const data = res.value;

  return (
    <ToolShell
      title="Unix Epoch & Timestamp Converter"
      category="dev"
      description="Convert Unix timestamps in seconds or milliseconds into UTC, local human-readable time, and relative dates."
      icon="⏱️"
      onReset={() => setInputVal('')}
    >
      <div className="space-y-6">
        {/* Live Current Epoch Banner */}
        <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-neutral-400">Current Epoch Timestamp (Live)</div>
            <div className="text-2xl font-mono font-bold text-emerald-400 mt-0.5">
              {liveNow.seconds}
            </div>
            <div className="text-xs text-neutral-500 font-mono mt-0.5">
              {liveNow.utc}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setInputVal(liveNow.seconds.toString())}
              className="px-3 py-1.5 text-xs rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
            >
              Use Current Time
            </button>
            <CopyButton text={liveNow.seconds.toString()} label="Copy Epoch" />
          </div>
        </div>

        {/* Custom Input */}
        <div>
          <label className="block text-xs text-neutral-400 mb-1">
            Input Unix Timestamp (seconds or ms) or ISO String
          </label>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={`e.g. ${liveNow.seconds} or 2026-11-03T14:00:00Z`}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 font-mono text-sm text-neutral-100 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Converted Output Breakdown */}
        {res.success && data ? (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">UTC (ISO 8601)</div>
                <div className="text-sm font-mono text-emerald-400 mt-0.5">{data.utc}</div>
              </div>
              <CopyButton text={data.utc} />
            </div>

            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">Local Timezone</div>
                <div className="text-sm font-mono text-neutral-200 mt-0.5">{data.local}</div>
              </div>
              <CopyButton text={data.local} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-500">Relative</div>
                <div className="text-sm font-semibold text-neutral-200 mt-0.5">{data.relative}</div>
              </div>
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-500">Day of Week</div>
                <div className="text-sm font-semibold text-neutral-200 mt-0.5">{data.dayOfWeek}</div>
              </div>
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-500">Day of Year</div>
                <div className="text-sm font-semibold text-neutral-200 mt-0.5">Day {data.dayOfYear}</div>
              </div>
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-500">Leap Year</div>
                <div className="text-sm font-semibold text-neutral-200 mt-0.5">{data.isLeapYear ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/30 text-red-400 text-xs">
            {res.error}
          </div>
        )}
      </div>
    </ToolShell>
  );
};
