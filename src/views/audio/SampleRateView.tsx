import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { calculateSampleRateMetrics, COMMON_SAMPLE_RATES } from '../../engines/audio/sampleRateTools';

export const SampleRateView: React.FC = () => {
  const [sampleRate, setSampleRate] = useState(48000);
  const [bitDepth, setBitDepth] = useState(24);
  const [channels, setChannels] = useState(2);

  const res = calculateSampleRateMetrics(sampleRate, bitDepth, channels);

  return (
    <ToolShell
      title="Audio Sample Rate & Nyquist Calculator"
      category="audio"
      description="Inspect acoustic bandwidth limits, Nyquist cutoffs, and uncompressed PCM bitrates across broadcast standards."
      icon="🎙️"
      onReset={() => {
        setSampleRate(48000);
        setBitDepth(24);
        setChannels(2);
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Standard Sample Rate Presets</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {COMMON_SAMPLE_RATES.map((r) => (
              <button
                key={r.rate}
                onClick={() => setSampleRate(r.rate)}
                className={`p-3 rounded-xl border text-left text-xs font-mono transition-colors ${
                  sampleRate === r.rate
                    ? 'bg-neutral-800 border-neutral-700 text-neutral-100'
                    : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Sample Rate (Hz)</label>
            <input
              type="number"
              value={sampleRate}
              onChange={(e) => setSampleRate(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Bit Depth</label>
            <select
              value={bitDepth}
              onChange={(e) => setBitDepth(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none"
            >
              <option value={16}>16-bit (CD / Podcast)</option>
              <option value={24}>24-bit (Studio Standard)</option>
              <option value={32}>32-bit Float (DAW Internal)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Channels</label>
            <select
              value={channels}
              onChange={(e) => setChannels(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none"
            >
              <option value={1}>1 (Mono)</option>
              <option value={2}>2 (Stereo)</option>
              <option value={6}>6 (5.1 Surround)</option>
            </select>
          </div>
        </div>

        <div className="p-5 bg-neutral-950/80 border border-neutral-800 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <span className="text-xs text-neutral-500 font-mono">Nyquist Limit</span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1">
              {(res.nyquistFrequencyHz / 1000).toFixed(1)} kHz
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Maximum audio frequency</div>
          </div>
          <div>
            <span className="text-xs text-neutral-500 font-mono">Data Rate</span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-sky-400 mt-1">
              {Math.round(res.bytesPerSecond / 1024)} KB/s
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Uncompressed PCM</div>
          </div>
          <div>
            <span className="text-xs text-neutral-500 font-mono">Storage / Minute</span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-purple-400 mt-1">
              {res.mbPerMinute} MB
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Megabytes per minute</div>
          </div>
          <div>
            <span className="text-xs text-neutral-500 font-mono">Dynamic Range</span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400 mt-1">
              ~{bitDepth * 6} dB
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Theoretical SNR ceiling</div>
          </div>
        </div>

        <div className="p-4 bg-neutral-950/50 border border-neutral-800 rounded-xl text-xs text-neutral-300">
          <span className="text-neutral-500 font-mono block mb-1">Standard Industry Usage</span>
          {res.usageDescription}
        </div>
      </div>
    </ToolShell>
  );
};
