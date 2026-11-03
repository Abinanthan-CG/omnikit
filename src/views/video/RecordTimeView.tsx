import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { estimateRecordTime, CODEC_PRESETS } from '../../engines/video/recordTimeTools';

export const RecordTimeView: React.FC = () => {
  const [cardGb, setCardGb] = useState(128);
  const [bitrateMbps, setBitrateMbps] = useState(100);

  const res = estimateRecordTime(cardGb, bitrateMbps);

  const CARDS = [32, 64, 128, 256, 512, 1000, 2000];

  return (
    <ToolShell
      title="Video Recording Time & Storage Estimator"
      category="video"
      description="Calculate how many hours and minutes of footage can record onto your SD card, CFexpress, or SSD."
      icon="📼"
      onReset={() => {
        setCardGb(128);
        setBitrateMbps(100);
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Media Card / Drive Capacity</label>
          <div className="flex flex-wrap gap-2">
            {CARDS.map((gb) => (
              <button
                key={gb}
                onClick={() => setCardGb(gb)}
                className={`px-3 py-1.5 text-xs rounded-lg font-mono transition-all border ${
                  cardGb === gb
                    ? 'bg-neutral-800 border-neutral-600 text-neutral-100 font-semibold'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {gb >= 1000 ? `${gb / 1000} TB` : `${gb} GB`}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Video Codec & Quality Presets</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {CODEC_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setBitrateMbps(preset.bitrateMbps)}
                className={`p-2.5 text-left rounded-lg text-xs font-mono border transition-all ${
                  bitrateMbps === preset.bitrateMbps
                    ? 'bg-neutral-900 border-emerald-500/80 text-emerald-400'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <div className="font-semibold text-neutral-200">{preset.name}</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">{preset.category} • {preset.bitrateMbps} Mbps</div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-neutral-400">Custom Bitrate: {bitrateMbps} Mbps</span>
            <span className="text-neutral-500">{(bitrateMbps / 8).toFixed(1)} MB/s</span>
          </div>
          <input
            type="range"
            min="10"
            max="1500"
            step="10"
            value={bitrateMbps}
            onChange={(e) => setBitrateMbps(parseInt(e.target.value) || 100)}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-neutral-950/80 border border-neutral-800 rounded-xl md:col-span-2">
            <span className="text-xs text-neutral-500 font-mono">Total Recording Duration Available</span>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400 mt-2">
              {res.formattedTime}
            </div>
            <div className="text-xs text-neutral-400 font-mono mt-1">
              Fits {cardGb >= 1000 ? `${cardGb / 1000} TB` : `${cardGb} GB`} of continuous camera recording
            </div>
          </div>

          <div className="p-5 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Storage Consumption</span>
            <div className="text-2xl font-bold font-mono text-neutral-200 mt-2">
              {res.gigabytesPerHour} GB / hr
            </div>
            <div className="text-xs text-neutral-400 font-mono mt-1">
              ~{(res.bytesPerMinute / (1024 * 1024)).toFixed(0)} MB per minute
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
