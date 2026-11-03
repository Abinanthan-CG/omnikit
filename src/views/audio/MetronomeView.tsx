import React, { useState, useEffect, useRef } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { calculateMetronome, TEMPO_MARKINGS } from '../../engines/audio/metronomeTools';

export const MetronomeView: React.FC = () => {
  const [bpm, setBpm] = useState(120);
  const [beatsPerBar, setBeatsPerBar] = useState(4);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const beatRef = useRef(0);

  const meta = calculateMetronome(bpm, beatsPerBar);

  const playClick = (isDownbeat: boolean) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isDownbeat ? 1000 : 700, ctx.currentTime);

      gain.gain.setValueAtTime(0.7, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio context might fail on older browsers
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      setCurrentBeat(0);
      beatRef.current = 0;
      return;
    }

    const interval = (60 / bpm) * 1000;
    timerRef.current = window.setInterval(() => {
      const beat = beatRef.current;
      playClick(beat === 0);
      setCurrentBeat(beat);
      beatRef.current = (beat + 1) % beatsPerBar;
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, bpm, beatsPerBar]);

  return (
    <ToolShell
      title="Precision Audio Metronome & Tempo Guide"
      category="audio"
      description="Interactive tempo metronome with downbeat accents, customizable time signatures, and classical Italian markings."
      icon="⏱️"
      onReset={() => {
        setIsPlaying(false);
        setBpm(120);
        setBeatsPerBar(4);
      }}
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center p-8 bg-neutral-950/70 border border-neutral-800 rounded-2xl space-y-4">
          <div className="text-5xl font-mono font-bold text-emerald-400">
            {bpm} <span className="text-xl text-neutral-500 font-normal">BPM</span>
          </div>
          <div className="text-xs font-mono text-neutral-400">
            {meta.tempoName}
          </div>

          {/* Visual beat dots */}
          <div className="flex gap-3 pt-2">
            {Array.from({ length: beatsPerBar }).map((_, idx) => (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full transition-all ${
                  isPlaying && currentBeat === idx
                    ? idx === 0
                      ? 'bg-emerald-400 scale-125 shadow-lg shadow-emerald-500/50'
                      : 'bg-sky-400 scale-110'
                    : 'bg-neutral-800'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-8 py-3 rounded-xl font-mono text-sm font-semibold transition-all ${
              isPlaying
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20'
                : 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-lg shadow-emerald-500/20'
            }`}
          >
            {isPlaying ? 'Stop Metronome' : 'Start Metronome'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <label className="block text-xs font-mono text-neutral-400">BPM Slider ({bpm})</label>
            <input
              type="range"
              min="30"
              max="260"
              value={bpm}
              onChange={(e) => setBpm(parseInt(e.target.value) || 120)}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <label className="block text-xs font-mono text-neutral-400">Time Signature (Beats per Bar)</label>
            <div className="flex gap-2">
              {[2, 3, 4, 6].map((b) => (
                <button
                  key={b}
                  onClick={() => setBeatsPerBar(b)}
                  className={`flex-1 py-1 text-xs font-mono rounded ${
                    beatsPerBar === b ? 'bg-neutral-800 text-neutral-100 font-bold border border-neutral-700' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {b}/4
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick tempo presets */}
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Classical Tempo Presets</label>
          <div className="flex flex-wrap gap-2">
            {TEMPO_MARKINGS.map((tm) => (
              <button
                key={tm.name}
                onClick={() => setBpm(Math.round((tm.minBpm + tm.maxBpm) / 2))}
                className="px-3 py-1.5 text-xs rounded-lg font-mono bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                {tm.name} ({tm.minBpm}-{tm.maxBpm})
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
