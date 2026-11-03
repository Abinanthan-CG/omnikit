import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { calculateTimelapse } from '../../engines/video/timelapseTools';

export const TimelapseView: React.FC = () => {
  const [clipSeconds, setClipSeconds] = useState(15);
  const [clipFps, setClipFps] = useState(24);
  const [eventMinutes, setEventMinutes] = useState(120);
  const [photoMb, setPhotoMb] = useState(25);

  const res = calculateTimelapse({
    targetClipSeconds: clipSeconds,
    clipFps,
    eventDurationMinutes: eventMinutes,
    photoSizeMb: photoMb
  });

  return (
    <ToolShell
      title="Timelapse Interval & Frame Calculator"
      category="video"
      description="Calculate photography shooting intervals, total frames, and storage space for smooth timelapse videos."
      icon="⏳"
      onReset={() => {
        setClipSeconds(15);
        setClipFps(24);
        setEventMinutes(120);
        setPhotoMb(25);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Target Video Length (s)</label>
            <input
              type="number"
              min="1"
              value={clipSeconds}
              onChange={(e) => setClipSeconds(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Playback FPS</label>
            <select
              value={clipFps}
              onChange={(e) => setClipFps(parseInt(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            >
              {[24, 25, 30, 60].map((f) => (
                <option key={f} value={f}>{f} fps</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Real Event Time (min)</label>
            <input
              type="number"
              min="1"
              value={eventMinutes}
              onChange={(e) => setEventMinutes(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Photo Size (MB / RAW)</label>
            <input
              type="number"
              min="1"
              value={photoMb}
              onChange={(e) => setPhotoMb(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-sm text-neutral-100 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Intervalometer Setting</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
              Every {res.intervalSeconds}s
            </div>
            <div className="text-xs text-neutral-400 mt-0.5">take 1 photo</div>
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Total Photos to Capture</span>
            <div className="text-2xl font-bold font-mono text-neutral-100 mt-1">
              {res.totalFrames.toLocaleString()}
            </div>
            <div className="text-xs text-neutral-400 mt-0.5">frames needed</div>
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Estimated Storage</span>
            <div className="text-2xl font-bold font-mono text-neutral-100 mt-1">
              {res.totalStorageGb} GB
            </div>
            <div className="text-xs text-neutral-400 mt-0.5">on SD / CF card</div>
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Speedup Factor</span>
            <div className="text-2xl font-bold font-mono text-sky-400 mt-1">
              {res.speedupFactor}x
            </div>
            <div className="text-xs text-neutral-400 mt-0.5">faster than real-time</div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
