import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { calculateIntervals, calculateChordFrequencies } from '../../engines/audio/intervalTools';

export const IntervalView: React.FC = () => {
  const [rootHz, setRootHz] = useState(440);

  const intervals = calculateIntervals(rootHz);
  const chords = calculateChordFrequencies(rootHz);

  const ROOTS = [
    { label: 'C4 (261.6 Hz)', hz: 261.63 },
    { label: 'D4 (293.7 Hz)', hz: 293.66 },
    { label: 'E4 (329.6 Hz)', hz: 329.63 },
    { label: 'F4 (349.2 Hz)', hz: 349.23 },
    { label: 'G4 (392.0 Hz)', hz: 392.0 },
    { label: 'A4 (440.0 Hz)', hz: 440.0 },
    { label: 'B4 (493.9 Hz)', hz: 493.88 },
  ];

  return (
    <ToolShell
      title="Musical Interval & Chord Frequencies"
      category="audio"
      description="Calculate exact frequencies and mathematical ratios for musical intervals and harmonic triads."
      icon="🎼"
      onReset={() => {
        setRootHz(440);
      }}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">Root Presets:</span>
          {ROOTS.map((r) => (
            <button
              key={r.label}
              onClick={() => setRootHz(r.hz)}
              className={`px-2.5 py-1 text-xs rounded font-mono border transition-all ${
                Math.round(rootHz) === Math.round(r.hz)
                  ? 'bg-neutral-800 border-neutral-600 text-emerald-400 font-bold'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {r.label.split(' ')[0]}
            </button>
          ))}
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-neutral-400">Custom Root Pitch: {rootHz} Hz</span>
          </div>
          <input
            type="range"
            min="100"
            max="1000"
            value={rootHz}
            onChange={(e) => setRootHz(parseFloat(e.target.value) || 440)}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        {/* Chord cards */}
        <div>
          <span className="text-xs font-mono text-neutral-400 block mb-2">Chord Harmonics</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {chords.map((ch) => (
              <div key={ch.name} className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1.5">
                <div className="text-xs font-semibold text-emerald-400 font-mono">{ch.name}</div>
                <div className="space-y-1 text-[11px] font-mono text-neutral-300">
                  {ch.notes.map((n, idx) => (
                    <div key={idx} className="flex justify-between border-b border-neutral-900/60 pb-0.5">
                      <span className="text-neutral-500">{n.name}</span>
                      <span className="text-neutral-200 font-bold">{n.frequencyHz} Hz</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intervals table */}
        <div>
          <span className="text-xs font-mono text-neutral-400 block mb-2">Equal Temperament Intervals</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {intervals.map((i) => (
              <div key={i.name} className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono">
                <div className="text-neutral-500 text-[10px]">{i.name} (+{i.semitones})</div>
                <div className="text-neutral-100 font-bold mt-0.5">{i.frequencyHz} Hz</div>
                <div className="text-[10px] text-sky-400 mt-0.5">{i.ratio}:1 ratio</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
