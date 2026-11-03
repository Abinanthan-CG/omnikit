import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { convertFrameCount, calculateSpeedRatio } from '../../engines/video/fpsConverter';

export const FpsConverterView: React.FC = () => {
  const [sourceFps, setSourceFps] = useState(24);
  const [targetFps, setTargetFps] = useState(60);
  const [frameCount, setFrameCount] = useState(240);

  const convertedFrames = convertFrameCount(frameCount, sourceFps, targetFps);
  const speed = calculateSpeedRatio(sourceFps, targetFps);

  const FPS_OPTIONS = [23.976, 24, 25, 29.97, 30, 48, 50, 59.94, 60, 120];

  return (
    <ToolShell
      title="Video Frame Rate Speed Converter"
      category="video"
      description="Calculate frame scaling, PAL/NTSC speedup, and timing changes when converting framerates."
      icon="🎞️"
      onReset={() => {
        setSourceFps(24);
        setTargetFps(60);
        setFrameCount(240);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Source Frame Rate</label>
            <select
              value={sourceFps}
              onChange={(e) => setSourceFps(parseFloat(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            >
              {FPS_OPTIONS.map(f => (
                <option key={f} value={f}>{f} fps</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Target Frame Rate</label>
            <select
              value={targetFps}
              onChange={(e) => setTargetFps(parseFloat(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            >
              {FPS_OPTIONS.map(f => (
                <option key={f} value={f}>{f} fps</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Frame Count (or Timeline Frames)</label>
            <input
              type="number"
              value={frameCount}
              onChange={(e) => setFrameCount(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-400 font-semibold">Scaled Frame Count</span>
              <CopyButton text={convertedFrames.toString()} />
            </div>
            <div className="text-3xl font-black font-mono text-emerald-400">
              {convertedFrames} <span className="text-base font-normal text-neutral-400">frames</span>
            </div>
            <div className="text-xs text-neutral-500 font-mono">
              Equivalent duration: {(frameCount / sourceFps).toFixed(2)}s
            </div>
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-400 font-semibold">Conform Speed Ratio</span>
              <CopyButton text={`${(Math.round(speed.speedPercent * 10) / 10).toFixed(1)}%`} />
            </div>
            <div className="text-3xl font-black font-mono text-sky-400">
              {(Math.round(speed.speedPercent * 10) / 10).toFixed(1)}%
            </div>
            <div className="text-xs text-neutral-500">
              {speed.direction === 'speedup' && 'Footage will play faster (speedup)'}
              {speed.direction === 'slowdown' && 'Footage will play slower (overcrank/slowdown)'}
              {speed.direction === 'identical' && 'Identical playback speed'}
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
