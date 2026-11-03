import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { estimateFileSize, estimateRequiredBitrate } from '../../engines/video/bitrate';

export const BitrateView: React.FC = () => {
  const [durationMin, setDurationMin] = useState(2);
  const [durationSec, setDurationSec] = useState(30);
  const [videoBitrate, setVideoBitrate] = useState(12000); // 12 Mbps
  const [audioBitrate, setAudioBitrate] = useState(192);

  const totalDuration = durationMin * 60 + durationSec;
  const fileSize = estimateFileSize(totalDuration, videoBitrate, audioBitrate);
  const discordFit = estimateRequiredBitrate(totalDuration, 25, audioBitrate);

  return (
    <ToolShell
      title="Video Bitrate & Storage Estimator"
      category="video"
      description="Estimate video render file sizes and calculate required bitrates to meet upload limits."
      icon="💾"
      onReset={() => {
        setDurationMin(2);
        setDurationSec(30);
        setVideoBitrate(12000);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Duration</label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                value={durationMin}
                onChange={(e) => setDurationMin(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-1/2 bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
              />
              <span className="self-center text-xs text-neutral-500">min</span>
              <input
                type="number"
                min="0"
                max="59"
                value={durationSec}
                onChange={(e) => setDurationSec(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-1/2 bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
              />
              <span className="self-center text-xs text-neutral-500">sec</span>
            </div>
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Video Bitrate (kbps)</label>
            <input
              type="number"
              step="500"
              value={videoBitrate}
              onChange={(e) => setVideoBitrate(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            />
            <div className="flex gap-1.5 mt-1.5 text-[10px]">
              {[5000, 8000, 12000, 20000, 50000].map(b => (
                <button
                  key={b}
                  onClick={() => setVideoBitrate(b)}
                  className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-neutral-400 hover:text-neutral-200"
                >
                  {b / 1000}M
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Audio Bitrate (kbps)</label>
            <select
              value={audioBitrate}
              onChange={(e) => setAudioBitrate(parseInt(e.target.value, 10))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100"
            >
              <option value="96">96 kbps (Voice/Web)</option>
              <option value="128">128 kbps (Standard)</option>
              <option value="192">192 kbps (High Quality)</option>
              <option value="320">320 kbps (Master/Music)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-400 font-semibold">Estimated File Size</span>
              <CopyButton text={`${(Math.round(fileSize.megabytes * 10) / 10).toFixed(1)} MB`} />
            </div>
            <div className="text-3xl font-black font-mono text-emerald-400">
              {(Math.round(fileSize.megabytes * 10) / 10).toFixed(1)} <span className="text-base font-normal text-neutral-400">MB</span>
            </div>
            <div className="text-xs text-neutral-500 font-mono">
              ~{(Math.round(fileSize.gigabytes * 100) / 100).toFixed(2)} GB
            </div>
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-400 font-semibold">To Fit 25MB Discord Limit</span>
              <CopyButton text={`${discordFit.videoBitrateKbps} kbps`} />
            </div>
            <div className="text-3xl font-black font-mono text-sky-400">
              {discordFit.videoBitrateKbps} <span className="text-base font-normal text-neutral-400">kbps</span>
            </div>
            <div className="text-xs text-neutral-500">
              Max recommended video bitrate for this duration
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
