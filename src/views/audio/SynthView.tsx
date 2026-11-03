import React, { useState, useEffect, useRef } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { OscillatorWaveform, AUDIO_TEST_PRESETS, calculateHarmonics } from '../../engines/audio/synthTools';

export const SynthView: React.FC = () => {
  const [frequency, setFrequency] = useState(440);
  const [waveform, setWaveform] = useState<OscillatorWaveform>('sine');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const harmonics = calculateHarmonics(frequency, 6);

  const stopTone = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch {
        // already stopped
      }
      oscRef.current = null;
    }
    setIsPlaying(false);
  };

  const startTone = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      stopTone();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = waveform;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(volume, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
      setIsPlaying(true);
    } catch {
      // AudioContext unavailable
    }
  };

  const toggleTone = () => {
    if (isPlaying) {
      stopTone();
    } else {
      startTone();
    }
  };

  useEffect(() => {
    if (oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime);
    }
  }, [frequency]);

  useEffect(() => {
    if (oscRef.current) {
      oscRef.current.type = waveform;
    }
  }, [waveform]);

  useEffect(() => {
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopTone();
    };
  }, []);

  return (
    <ToolShell
      title="Tone Synthesizer & Audio Oscillator"
      category="audio"
      description="Generate precise calibration sine waves, test tones, and analyze fundamental harmonic frequencies."
      icon="🔊"
      onReset={() => {
        stopTone();
        setFrequency(440);
        setWaveform('sine');
        setVolume(0.2);
      }}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-neutral-950/70 border border-neutral-800 rounded-2xl">
          <div>
            <div className="text-2xl font-bold font-mono text-neutral-100">{frequency} Hz</div>
            <div className="text-xs text-neutral-400 capitalize">{waveform} Waveform · Volume {Math.round(volume * 100)}%</div>
          </div>
          <button
            onClick={toggleTone}
            className={`px-6 py-3 rounded-xl font-medium text-sm transition-all shadow-lg ${
              isPlaying
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-950'
                : 'bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold shadow-emerald-950'
            }`}
          >
            {isPlaying ? '⏹ Stop Tone' : '▶ Play Test Tone'}
          </button>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Waveform Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['sine', 'square', 'sawtooth', 'triangle'] as OscillatorWaveform[]).map((wf) => (
              <button
                key={wf}
                onClick={() => setWaveform(wf)}
                className={`py-2 px-3 rounded-lg text-xs font-mono capitalize transition-colors ${
                  waveform === wf
                    ? 'bg-neutral-800 text-neutral-100 border border-neutral-700'
                    : 'bg-neutral-900/50 text-neutral-400 hover:text-neutral-200 border border-transparent'
                }`}
              >
                {wf}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono text-neutral-400">Frequency (20 Hz - 20,000 Hz)</label>
              <input
                type="number"
                min="20"
                max="20000"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-24 bg-neutral-950 border border-neutral-800 rounded px-2 py-0.5 text-xs font-mono text-right text-neutral-200"
              />
            </div>
            <input
              type="range"
              min="20"
              max="2000"
              step="1"
              value={Math.min(2000, frequency)}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono text-neutral-400">Output Gain Level</label>
              <span className="text-xs font-mono text-neutral-400">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.8"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Studio Presets</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {AUDIO_TEST_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setFrequency(preset.frequencyHz)}
                className="p-3 bg-neutral-900/40 hover:bg-neutral-900 border border-neutral-800 rounded-xl text-left transition-colors"
              >
                <div className="text-xs font-semibold text-neutral-200">{preset.name}</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">{preset.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Harmonic Series (Overtones)</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {harmonics.map((h, i) => (
              <div key={i} className="p-2.5 bg-neutral-950 border border-neutral-800/80 rounded-lg text-center">
                <span className="text-[10px] text-neutral-500 font-mono">H{i + 1}</span>
                <div className="text-xs font-bold font-mono text-neutral-200 mt-0.5">{h} Hz</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
