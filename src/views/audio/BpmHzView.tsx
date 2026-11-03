import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { calculateBpmToHz } from '../../engines/audio/bpmHzTools';

export const BpmHzView: React.FC = () => {
  const [bpm, setBpm] = useState(128);

  const res = calculateBpmToHz(bpm);

  return (
    <ToolShell
      title="BPM to Hz Frequency & Period Converter"
      category="audio"
      description="Translate musical tempo into LFO oscillation frequencies in Hertz (Hz) and waveform cycle periods in milliseconds."
      icon="🎚️"
      onReset={() => setBpm(120)}
    >
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-mono text-neutral-400">Tempo: {bpm} BPM</label>
            <input
              type="number"
              min="20"
              max="300"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-20 bg-neutral-950 border border-neutral-800 rounded px-2 py-0.5 text-xs font-mono text-right text-neutral-200"
            />
          </div>
          <input
            type="range"
            min="40"
            max="240"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>

        <div className="p-5 bg-neutral-950/80 border border-neutral-800 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-neutral-500 font-mono">Quarter Note Base Frequency</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{res.quarterHz} Hz</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Cycles per second</div>
          </div>
          <div>
            <span className="text-xs text-neutral-500 font-mono">Quarter Note Period (1 beat)</span>
            <div className="text-2xl font-bold font-mono text-sky-400 mt-1">{res.quarterMs} ms</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Milliseconds per cycle</div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Note Divisions & LFO Frequencies</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {res.divisions.map((div) => (
              <div key={div.name} className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-neutral-200">{div.name}</span>
                  <span className="text-[10px] text-neutral-500 font-mono">{div.notes}</span>
                </div>
                <div className="flex justify-between items-end mt-2 pt-2 border-t border-neutral-850">
                  <span className="text-xs font-mono font-bold text-emerald-400">{div.frequencyHz} Hz</span>
                  <span className="text-xs font-mono text-neutral-400">{div.periodMs} ms</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
