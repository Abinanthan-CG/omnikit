import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { calculateHeadroom } from '../../engines/audio/headroomTools';

export const HeadroomView: React.FC = () => {
  const [lufs, setLufs] = useState(-11.5);
  const [peak, setPeak] = useState(-0.3);

  const res = calculateHeadroom(lufs, peak);

  return (
    <ToolShell
      title="Mastering Audio Headroom & True Peak Analyzer"
      category="audio"
      description="Estimate true-peak clip risks, inter-sample overs, and loudness normalization gain adjustments across streaming platforms."
      icon="🎚️"
      onReset={() => {
        setLufs(-14);
        setPeak(-1.0);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono text-neutral-400">Integrated Loudness (LUFS)</label>
              <span className="text-xs font-mono font-bold text-sky-400">{lufs} LUFS</span>
            </div>
            <input
              type="range"
              min="-24"
              max="-6"
              step="0.5"
              value={lufs}
              onChange={(e) => setLufs(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono text-neutral-400">Maximum Peak Level (dBFS / dBTP)</label>
              <span className="text-xs font-mono font-bold text-emerald-400">{peak} dB</span>
            </div>
            <input
              type="range"
              min="-6"
              max="1.5"
              step="0.1"
              value={peak}
              onChange={(e) => setPeak(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>
        </div>

        <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-500 font-mono">True Peak Headroom Margin</span>
            <div className="text-xl font-bold font-mono mt-0.5">
              {res.truePeakHeadroomDb >= 0 ? (
                <span className="text-emerald-400">+{res.truePeakHeadroomDb} dB (Safe for Lossy Encoding)</span>
              ) : (
                <span className="text-rose-400">{res.truePeakHeadroomDb} dB (High Distortion Risk!)</span>
              )}
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            {res.isClippingRisk ? (
              <span className="px-2.5 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg">
                ⚠️ Transcoding Clip Warning
              </span>
            ) : (
              <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
                ✓ Streaming Compliant
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Streaming Platform Normalization Forecast</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {res.streamingPenalties.map((p) => (
              <div key={p.service} className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl">
                <div className="text-xs font-semibold text-neutral-200">{p.service}</div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-850">
                  <span className="text-xs font-mono text-neutral-400">Gain Adjustment:</span>
                  <span
                    className={`text-xs font-mono font-bold ${
                      p.gainAdjustmentDb < 0 ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {p.gainAdjustmentDb > 0 ? `+${p.gainAdjustmentDb}` : p.gainAdjustmentDb} dB
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
