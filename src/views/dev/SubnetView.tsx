import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { calculateSubnet } from '../../engines/dev/subnetTools';

export const SubnetView: React.FC = () => {
  const [ip, setIp] = useState('192.168.1.100');
  const [cidr, setCidr] = useState(24);

  const res = calculateSubnet(ip, cidr);

  const COMMON_CIDRS = [8, 16, 24, 25, 26, 27, 28, 29, 30, 32];

  return (
    <ToolShell
      title="IPv4 Subnet & CIDR Calculator"
      category="dev"
      description="Calculate netmask, wildcard mask, broadcast address, and usable host ranges for any IPv4 CIDR block."
      icon="🌐"
      onReset={() => {
        setIp('192.168.1.100');
        setCidr(24);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-mono text-neutral-400 mb-1">IP Address</label>
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">CIDR Prefix (/{cidr})</label>
            <select
              value={cidr}
              onChange={(e) => setCidr(parseInt(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
            >
              {Array.from({ length: 33 }).map((_, idx) => (
                <option key={idx} value={idx}>/{idx}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {COMMON_CIDRS.map((c) => (
            <button
              key={c}
              onClick={() => setCidr(c)}
              className={`px-2.5 py-1 text-xs rounded font-mono transition-all border ${
                cidr === c
                  ? 'bg-neutral-800 border-neutral-600 text-emerald-400 font-bold'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              /{c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
            <div className="flex justify-between items-center py-1 border-b border-neutral-900">
              <span className="text-neutral-500">Network Address:</span>
              <span className="text-emerald-400 font-semibold">{res.networkAddress}/{res.cidr}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-neutral-900">
              <span className="text-neutral-500">Subnet Netmask:</span>
              <span className="text-neutral-200">{res.netmask}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-neutral-900">
              <span className="text-neutral-500">Wildcard Mask:</span>
              <span className="text-neutral-200">{res.wildcard}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-neutral-500">Broadcast Address:</span>
              <span className="text-neutral-200">{res.broadcastAddress}</span>
            </div>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
            <div className="flex justify-between items-center py-1 border-b border-neutral-900">
              <span className="text-neutral-500">First Usable Host:</span>
              <span className="text-sky-400 font-semibold">{res.firstUsableIp}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-neutral-900">
              <span className="text-neutral-500">Last Usable Host:</span>
              <span className="text-sky-400 font-semibold">{res.lastUsableIp}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-neutral-900">
              <span className="text-neutral-500">Usable Hosts:</span>
              <span className="text-emerald-400 font-bold">{res.usableHosts.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-neutral-500">Total Addresses:</span>
              <span className="text-neutral-400">{res.totalHosts.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <CopyButton
            text={`Network: ${res.networkAddress}/${res.cidr}\nNetmask: ${res.netmask}\nRange: ${res.firstUsableIp} - ${res.lastUsableIp}\nHosts: ${res.usableHosts}`}
            label="Copy Subnet Summary"
          />
        </div>
      </div>
    </ToolShell>
  );
};
