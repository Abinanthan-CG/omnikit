import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { convertStorageBytes, StorageUnit } from '../../engines/dev/byteTools';

export const ByteView: React.FC = () => {
  const [val, setVal] = useState(1);
  const [unit, setUnit] = useState<StorageUnit>('GB');

  const res = convertStorageBytes(val, unit);

  const UNITS: StorageUnit[] = ['B', 'KB', 'MB', 'GB', 'TB', 'KiB', 'MiB', 'GiB', 'TiB'];

  return (
    <ToolShell
      title="Digital Storage & Byte Converter"
      category="dev"
      description="Convert data storage units across decimal (KB, MB, GB) and binary (KiB, MiB, GiB) architectures."
      icon="💾"
      onReset={() => {
        setVal(1);
        setUnit('GB');
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Quantity</label>
            <input
              type="number"
              min="0"
              value={val}
              onChange={(e) => setVal(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Source Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as StorageUnit)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
            >
              {UNITS.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Decimal */}
          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-3">
            <span className="text-xs font-semibold text-neutral-400 font-mono">Decimal Base (SI: 1000)</span>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2 bg-neutral-900 rounded">
                <span className="text-neutral-500">Bytes</span>
                <span className="text-emerald-400">{res.bytes.toLocaleString()} B</span>
              </div>
              <div className="flex justify-between p-2 bg-neutral-900 rounded">
                <span className="text-neutral-500">Kilobytes</span>
                <span className="text-neutral-200">{res.kb.toLocaleString()} KB</span>
              </div>
              <div className="flex justify-between p-2 bg-neutral-900 rounded">
                <span className="text-neutral-500">Megabytes</span>
                <span className="text-neutral-200">{res.mb.toLocaleString()} MB</span>
              </div>
              <div className="flex justify-between p-2 bg-neutral-900 rounded">
                <span className="text-neutral-500">Gigabytes</span>
                <span className="text-neutral-200">{res.gb.toLocaleString()} GB</span>
              </div>
            </div>
          </div>

          {/* Binary */}
          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-3">
            <span className="text-xs font-semibold text-neutral-400 font-mono">Binary Base (IEC: 1024)</span>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2 bg-neutral-900 rounded">
                <span className="text-neutral-500">Kibibytes</span>
                <span className="text-neutral-200">{(Math.round(res.kib * 100) / 100).toLocaleString()} KiB</span>
              </div>
              <div className="flex justify-between p-2 bg-neutral-900 rounded">
                <span className="text-neutral-500">Mebibytes</span>
                <span className="text-neutral-200">{(Math.round(res.mib * 100) / 100).toLocaleString()} MiB</span>
              </div>
              <div className="flex justify-between p-2 bg-neutral-900 rounded">
                <span className="text-neutral-500">Gibibytes</span>
                <span className="text-sky-400">{(Math.round(res.gib * 1000) / 1000).toLocaleString()} GiB</span>
              </div>
              <div className="flex justify-between p-2 bg-neutral-900 rounded">
                <span className="text-neutral-500">Tebibytes</span>
                <span className="text-neutral-200">{(Math.round(res.tib * 10000) / 10000).toLocaleString()} TiB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
