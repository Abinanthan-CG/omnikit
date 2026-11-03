import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { analyzeIPv6 } from '../../engines/dev/ipv6Tools';

const PRESETS = [
  { name: 'Cloudflare DNS', ip: '2606:4700:4700::1111' },
  { name: 'Google Public DNS', ip: '2001:4860:4860::8888' },
  { name: 'IPv6 Loopback', ip: '::1' },
  { name: 'Link-Local Address', ip: 'fe80::1ff:fe00:3a60' },
  { name: 'IPv4-Mapped IPv6', ip: '::ffff:192.0.2.128' }
];

export const Ipv6View: React.FC = () => {
  const [inputIp, setInputIp] = useState('2001:4860:4860::8888');

  const res = analyzeIPv6(inputIp);

  return (
    <ToolShell
      title="IPv6 Address Expander & Shortener"
      category="dev"
      description="Expand compressed IPv6 addresses into full 32-nibble notation or shorten them to RFC 5952 standard form."
      icon="🌐"
      onReset={() => setInputIp('2001:4860:4860::8888')}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Preset Addresses</label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => setInputIp(p.ip)}
                className="px-3 py-1.5 bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-300 transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-1">IPv6 Address Input</label>
          <input
            type="text"
            value={inputIp}
            onChange={(e) => setInputIp(e.target.value)}
            placeholder="e.g. 2001:db8::1 or fe80::1"
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none focus:border-neutral-600"
          />
        </div>

        {res.isValid ? (
          <div className="space-y-4">
            <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-500 font-mono">Address Classification</span>
                <div className="text-sm font-semibold text-emerald-400 mt-0.5">{res.addressType}</div>
              </div>
              {res.isIpv4Mapped && (
                <span className="px-2 py-1 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono rounded-lg">
                  IPv4 Mapped
                </span>
              )}
            </div>

            <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-neutral-500 font-mono">Full Expanded Format (32 Hex Digits)</span>
                  <CopyButton text={res.expanded} label="Copy Expanded" />
                </div>
                <div className="p-3 bg-neutral-900/60 rounded-lg font-mono text-xs text-neutral-200 select-all break-all">
                  {res.expanded}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-neutral-500 font-mono">Compressed Format (RFC 5952)</span>
                  <CopyButton text={res.compressed} label="Copy Compressed" />
                </div>
                <div className="p-3 bg-neutral-900/60 rounded-lg font-mono text-xs text-emerald-400 select-all break-all">
                  {res.compressed}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm font-mono">
            Please enter a valid IPv6 address notation (e.g. 2001:db8::1).
          </div>
        )}
      </div>
    </ToolShell>
  );
};
