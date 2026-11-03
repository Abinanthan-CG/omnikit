import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { calculatePitchShift } from '../../engines/audio/transposerTools';

export const TransposerView: React.FC = () => {
  const [semitones, setSemitones] = useState(2); // +2 semitones
  const [cents, setCents] = useState(0);

  const shift = calculatePitchShift(semitones, cents);

  return (
    <ToolShell
      title="Musical Pitch Shift & Speed Transposer"
      category="audio"
      description="Calculate frequency ratios, resampling playback speed changes, and track duration scaling."
      icon="🎛️"
      onReset={() => {
        setSemitones(0);
        setCents(0);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-neutral-400">Semitones Transposition</label>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {semitones > 0 ? `+${semitones}` : semitones} st
              </span>
            </div>
            <input
              type="range"
              min="-24"
              max="24"
              value={semitones}
              onChange={(e) => setSemitones(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
              <span>-24 (2 oct down)</span>
              <span>0</span>
              <span>+24 (2 oct up)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-neutral-400">Fine Tuning (Cents)</label>
              <span className="text-xs font-mono font-bold text-sky-400">
                {cents > 0 ? `+${cents}` : cents} cents
              </span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={cents}
              onChange={(e) => setCents(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-neutral-400">Frequency Ratio</span>
              <CopyButton text={`${shift.frequencyRatio}x`} />
            </div>
            <div className="text-3xl font-black font-mono text-emerald-400">
              {shift.frequencyRatio} <span className="text-sm font-normal text-neutral-500">×</span>
            </div>
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-neutral-400">Tape / Vinyl Speed</span>
              <CopyButton text={`${shift.speedChangePercent}%`} />
            </div>
            <div className="text-3xl font-black font-mono text-sky-400">
              {shift.speedChangePercent} <span className="text-sm font-normal text-neutral-500">%</span>
            </div>
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-neutral-400">Track Length Ratio</span>
              <CopyButton text={`${shift.lengthRatio}x`} />
            </div>
            <div className="text-3xl font-black font-mono text-neutral-200">
              {shift.lengthRatio} <span className="text-sm font-normal text-neutral-500">×</span>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
