import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { formatAndRepairJson } from '../../engines/dev/jsonTools';

const SAMPLE_JSON = `{
  "name": "Omnikit",
  "version": "1.0.0",
  "features": ["timecode", "aspect-ratio", "contrast", "timestamps"],
  "privacy": {
    "clientOnly": true,
    "telemetry": false
  }
}`;

export const JsonView: React.FC = () => {
  const [raw, setRaw] = useState(SAMPLE_JSON);
  const [indent, setIndent] = useState<number>(2);

  const res = formatAndRepairJson(raw, indent);
  const data = res.value;

  return (
    <ToolShell
      title="JSON Formatter, Validator & Fixer"
      category="dev"
      description="Format, validate, minify, and automatically repair common syntax mistakes like single quotes and trailing commas."
      icon="⚙️"
      onReset={() => setRaw(SAMPLE_JSON)}
    >
      <div className="space-y-4">
        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">Indentation:</span>
            <div className="flex bg-neutral-950 border border-neutral-800 rounded-lg p-1 text-xs">
              <button
                onClick={() => setIndent(2)}
                className={`px-2.5 py-0.5 rounded font-mono ${
                  indent === 2 ? 'bg-emerald-500 text-neutral-950 font-bold' : 'text-neutral-400'
                }`}
              >
                2 spaces
              </button>
              <button
                onClick={() => setIndent(4)}
                className={`px-2.5 py-0.5 rounded font-mono ${
                  indent === 4 ? 'bg-emerald-500 text-neutral-950 font-bold' : 'text-neutral-400'
                }`}
              >
                4 spaces
              </button>
              <button
                onClick={() => setIndent(0)}
                className={`px-2.5 py-0.5 rounded font-mono ${
                  indent === 0 ? 'bg-emerald-500 text-neutral-950 font-bold' : 'text-neutral-400'
                }`}
              >
                Minify
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {data && <CopyButton text={data.formatted} label="Copy Formatted" />}
          </div>
        </div>

        {/* Status Alert if Repaired or Errored */}
        {data?.wasRepaired && (
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
            <span>✨ Automatically repaired JSON (fixed single quotes, trailing commas, or unquoted keys).</span>
            <button
              onClick={() => setRaw(data.formatted)}
              className="text-[11px] underline hover:text-amber-200"
            >
              Apply to Input
            </button>
          </div>
        )}

        {!res.success && (
          <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/30 text-red-400 text-xs">
            {res.error}
            {data?.errorLocation && (
              <span className="ml-2 font-mono">
                (Line {data.errorLocation.line}, Col {data.errorLocation.column})
              </span>
            )}
          </div>
        )}

        {/* Editor Grid: Raw vs Formatted */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-neutral-400">Input JSON / Scratchpad</label>
              <button
                onClick={() => setRaw('')}
                className="text-[10px] text-neutral-500 hover:text-neutral-300"
              >
                Clear
              </button>
            </div>
            <textarea
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              rows={16}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 font-mono text-xs text-neutral-100 focus:outline-none focus:border-emerald-500 leading-relaxed"
              placeholder="Paste raw or messy JSON here..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-neutral-400">Formatted Output</label>
              {data && (
                <span className="text-[10px] text-neutral-500 font-mono">
                  {data.byteSize} bytes
                  {data.itemCount !== undefined ? ` • ${data.itemCount} items` : ''}
                </span>
              )}
            </div>
            <textarea
              readOnly
              value={data?.formatted || ''}
              rows={16}
              className="w-full bg-neutral-950/60 border border-neutral-800 rounded-lg p-3 font-mono text-xs text-emerald-400 focus:outline-none leading-relaxed select-all"
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
