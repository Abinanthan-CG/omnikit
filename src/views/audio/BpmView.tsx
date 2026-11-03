import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { calculateBpmTimings } from '../../engines/audio/bpmCalculator';

const COMMON_BPMS = [80, 95, 120, 128, 140, 150, 174];

export const BpmView: React.FC = () => {
  const [bpm, setBpm] = useState(120);

  const result = calculateBpmTimings(bpm);

  return (
    <ToolShell
      title="BPM Delay & Reverb Sync Calculator"
      category="audio"
      description="Translate song tempo into exact note delay milliseconds and synced reverb room decay times."
      icon="🎵"
      onReset={() => setBpm(120)}
    >
      <div className="space-y-6">
        {/* Tempo input & presets */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="w-full sm:w-48">
            <label className="block text-xs text-neutral-400 mb-1">Tempo (BPM)</label>
            <input
              type="number"
              value={bpm || ''}
              onChange={(e) => setBpm(parseFloat(e.target.value) || 0)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xl font-mono font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex-1">
            <label className="block text-xs text-neutral-400 mb-1">Common Genre Tempos:</label>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_BPMS.map((b) => (
                <button
                  key={b}
                  onClick={() => setBpm(b)}
                  className={`px-2.5 py-1 text-xs rounded-md font-mono ${
                    bpm === b
                      ? 'bg-emerald-500 text-neutral-950 font-bold'
                      : 'bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {!result.success && (
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-xs">
            {result.error || 'Invalid tempo entered. Please enter a positive BPM number.'}
          </div>
        )}

        {/* Timings Table */}
        {result.success && result.value && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-neutral-200 mb-3">Delay Times (Milliseconds)</h3>
              <div className="overflow-x-auto border border-neutral-800 rounded-xl bg-neutral-950/60">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-neutral-900/80 text-neutral-400 border-b border-neutral-800">
                    <tr>
                      <th className="p-3">Note</th>
                      <th className="p-3">Straight</th>
                      <th className="p-3">Dotted (1.5x)</th>
                      <th className="p-3">Triplet (0.667x)</th>
                      <th className="p-3">Hz Frequency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/40 text-neutral-200">
                    {Object.values(result.value.notes).map((note) => (
                      <tr key={note.name} className="hover:bg-neutral-900/40 transition-colors">
                        <td className="p-3 font-sans font-medium text-neutral-300">
                          {note.name} ({note.fraction})
                        </td>
                        <td className="p-3 text-emerald-400 font-bold">{note.normal} ms</td>
                        <td className="p-3 text-neutral-300">{note.dotted} ms</td>
                        <td className="p-3 text-neutral-300">{note.triplet} ms</td>
                        <td className="p-3 text-neutral-500">{note.hz} Hz</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reverb Times */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-200 mb-3">Reverb Sync Guide</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                  <div className="text-[11px] text-neutral-400">Tight Pre-Delay (1/64)</div>
                  <div className="text-lg font-mono font-bold text-emerald-400 mt-0.5">
                    {result.value.reverb.preDelayTight} ms
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                  <div className="text-[11px] text-neutral-400">1-Bar Decay Time</div>
                  <div className="text-lg font-mono font-bold text-neutral-100 mt-0.5">
                    {result.value.reverb.oneBar} ms
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                  <div className="text-[11px] text-neutral-400">2-Bar Decay Time</div>
                  <div className="text-lg font-mono font-bold text-neutral-100 mt-0.5">
                    {result.value.reverb.twoBars} ms
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
};
