import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { dbToRatios, ratioToDb } from '../../engines/audio/decibelTools';

export const DecibelView: React.FC = () => {
  const [db, setDb] = useState(6);
  const [ratio, setRatio] = useState(2);

  const resFromDb = dbToRatios(db);
  const resFromRatio = ratioToDb(ratio);

  const COMMON_DB = [-18, -12, -6, -3, 0, 3, 6, 12, 18];

  return (
    <ToolShell
      title="Audio Decibel (dB) & Gain Multiplier"
      category="audio"
      description="Translate audio decibel gain (dB) to linear voltage amplitude multipliers and power ratios."
      icon="🎚️"
      onReset={() => {
        setDb(6);
        setRatio(2);
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Common Audio Gain Offsets (dB)</label>
          <div className="flex flex-wrap gap-2">
            {COMMON_DB.map((d) => (
              <button
                key={d}
                onClick={() => setDb(d)}
                className={`px-3 py-1.5 text-xs rounded-lg font-mono border transition-all ${
                  db === d
                    ? 'bg-neutral-800 border-neutral-600 text-emerald-400 font-bold'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {d > 0 ? `+${d}` : d} dB
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-neutral-400">Decibel Slider: {db > 0 ? `+${db}` : db} dB</span>
            <span className="text-emerald-400 font-semibold">{resFromDb.voltageRatio}x Voltage</span>
          </div>
          <input
            type="range"
            min="-30"
            max="30"
            step="0.5"
            value={db}
            onChange={(e) => setDb(parseFloat(e.target.value) || 0)}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Voltage / Amplitude Ratio</span>
            <div className="text-3xl font-bold font-mono text-emerald-400 mt-2">
              {resFromDb.voltageRatio}x
            </div>
            <div className="text-xs text-neutral-400 font-mono mt-1">
              {resFromDb.percentageChange > 0 ? `+${resFromDb.percentageChange}%` : `${resFromDb.percentageChange}%`} signal amplitude
            </div>
          </div>

          <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Acoustic / Electrical Power</span>
            <div className="text-3xl font-bold font-mono text-sky-400 mt-2">
              {resFromDb.powerRatio}x
            </div>
            <div className="text-xs text-neutral-400 font-mono mt-1">
              Watts ratio (10^(dB/10))
            </div>
          </div>

          <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Ratio to dB Calculator</span>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                min="0.01"
                value={ratio}
                onChange={(e) => setRatio(parseFloat(e.target.value) || 1)}
                className="w-20 bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-xs font-mono text-neutral-100"
              />
              <span className="text-xs font-mono text-emerald-400 font-bold">
                = {resFromRatio.db > 0 ? `+${resFromRatio.db}` : resFromRatio.db} dB
              </span>
            </div>
            <div className="text-xs text-neutral-500 font-mono mt-2">
              Formula: 20 * log10(ratio)
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
