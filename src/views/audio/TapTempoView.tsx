import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { calculateTapBpm } from '../../engines/audio/tapTempo';

export const TapTempoView: React.FC = () => {
  const [taps, setTaps] = useState<number[]>([]);

  const handleTap = () => {
    const now = Date.now();
    setTaps(prev => {
      // If gap is more than 3 seconds, reset
      if (prev.length > 0 && now - prev[prev.length - 1] > 3000) {
        return [now];
      }
      return [...prev, now].slice(-16);
    });
  };

  const bpm = calculateTapBpm(taps);

  return (
    <ToolShell
      title="Tap Tempo BPM Detector"
      category="audio"
      description="Tap repeatedly to discover accurate musical tempos in Beats Per Minute."
      icon="🥁"
      onReset={() => setTaps([])}
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center p-8 bg-neutral-950/70 border border-neutral-800 rounded-2xl space-y-4">
          <div className="text-center">
            <div className="text-6xl font-black font-mono text-emerald-400 tracking-tight">
              {bpm > 0 ? bpm : '--'}
            </div>
            <div className="text-xs text-neutral-400 uppercase tracking-widest mt-1">Beats Per Minute (BPM)</div>
          </div>

          <button
            onClick={handleTap}
            className="w-48 h-20 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-neutral-950 font-bold text-lg shadow-lg shadow-emerald-500/20 transition-all flex flex-col items-center justify-center select-none"
          >
            <span>TAP TEMPO</span>
            <span className="text-[10px] font-normal opacity-70">Click repeatedly</span>
          </button>

          <div className="text-xs text-neutral-500">
            {taps.length > 1 ? `Recorded ${taps.length} taps` : 'Tap at least 2 times to calculate tempo'}
          </div>
        </div>

        {bpm > 0 && (
          <div className="flex justify-center">
            <CopyButton text={`${bpm} BPM`} label={`Copy ${bpm} BPM`} />
          </div>
        )}
      </div>
    </ToolShell>
  );
};
