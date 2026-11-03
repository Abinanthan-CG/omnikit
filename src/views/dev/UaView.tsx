import React, { useState, useEffect } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { parseUserAgent } from '../../engines/dev/uaTools';

export const UaView: React.FC = () => {
  const [uaString, setUaString] = useState('');

  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.userAgent) {
      setUaString(navigator.userAgent);
    }
  }, []);

  const parsed = parseUserAgent(uaString);

  return (
    <ToolShell
      title="User Agent Inspector & Parser"
      category="dev"
      description="Inspect your active browser User Agent or parse arbitrary client strings into structured properties."
      icon="🕵️"
      onReset={() => {
        if (typeof navigator !== 'undefined') {
          setUaString(navigator.userAgent);
        }
      }}
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-mono text-neutral-400">User Agent String</label>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (typeof navigator !== 'undefined') setUaString(navigator.userAgent);
                }}
                className="text-xs text-neutral-400 hover:text-neutral-200"
              >
                Use My Browser
              </button>
              <CopyButton text={uaString} label="Copy UA" />
            </div>
          </div>
          <textarea
            value={uaString}
            onChange={(e) => setUaString(e.target.value)}
            rows={3}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono resize-none focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Browser</span>
            <div className="text-base font-semibold text-neutral-100 mt-1">{parsed.browser.name}</div>
            <div className="text-xs text-neutral-400 font-mono mt-0.5">{parsed.browser.version || 'Unknown version'}</div>
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Operating System</span>
            <div className="text-base font-semibold text-neutral-100 mt-1">{parsed.os.name}</div>
            <div className="text-xs text-neutral-400 font-mono mt-0.5">{parsed.os.version || 'Version detected'}</div>
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Layout Engine</span>
            <div className="text-base font-semibold text-neutral-100 mt-1">{parsed.engine.name}</div>
            <div className="text-xs text-neutral-400 font-mono mt-0.5">{parsed.engine.version || 'Rendering core'}</div>
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Device Type</span>
            <div className="text-base font-semibold text-emerald-400 capitalize mt-1">{parsed.device.type}</div>
            <div className="text-xs text-neutral-400 font-mono mt-0.5">Form factor</div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
