import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { formatMacAddress, generateRandomMac } from '../../engines/dev/macTools';

export const MacView: React.FC = () => {
  const [mac, setMac] = useState('001A2B3C4D5E');

  const colon = formatMacAddress(mac, 'colon');
  const hyphen = formatMacAddress(mac, 'hyphen');
  const dot = formatMacAddress(mac, 'dot');
  const raw = formatMacAddress(mac, 'raw');

  const randomize = () => {
    setMac(generateRandomMac().join(''));
  };

  return (
    <ToolShell
      title="MAC Address Generator & Formatter"
      category="dev"
      description="Generate random unicast MAC addresses or convert notation between colon, hyphen, Cisco dot, and raw hex."
      icon="🏷️"
      onReset={() => {
        setMac('001A2B3C4D5E');
      }}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={mac}
            onChange={(e) => setMac(e.target.value)}
            placeholder="Enter any MAC address format..."
            className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
          />
          <button
            onClick={randomize}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold rounded-lg text-xs font-mono transition-colors"
          >
            Generate Random MAC
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">Standard Colon (Linux / Unix / macOS)</span>
              <CopyButton text={colon} label="Copy" />
            </div>
            <pre className="p-2.5 bg-neutral-900 rounded font-mono text-emerald-400 text-xs">
              {colon}
            </pre>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">Hyphen (Windows)</span>
              <CopyButton text={hyphen} label="Copy" />
            </div>
            <pre className="p-2.5 bg-neutral-900 rounded font-mono text-sky-400 text-xs">
              {hyphen}
            </pre>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">Cisco Triple Dot Format</span>
              <CopyButton text={dot} label="Copy" />
            </div>
            <pre className="p-2.5 bg-neutral-900 rounded font-mono text-amber-400 text-xs">
              {dot}
            </pre>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">Raw Hexadecimal (No Delimiter)</span>
              <CopyButton text={raw} label="Copy" />
            </div>
            <pre className="p-2.5 bg-neutral-900 rounded font-mono text-neutral-300 text-xs">
              {raw}
            </pre>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
