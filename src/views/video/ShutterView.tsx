import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { calculateShutter } from '../../engines/video/shutterTools';

export const ShutterView: React.FC = () => {
  const [fps, setFps] = useState(24);
  const [angle, setAngle] = useState(180);

  const res = calculateShutter(fps, angle);

  const FPS_PRESETS = [23.976, 24, 25, 29.97, 30, 48, 50, 60, 120];
  const ANGLE_PRESETS = [
    { label: '45° (Extreme Action)', val: 45 },
    { label: '90° (Crisp Action)', val: 90 },
    { label: '180° (Standard Cinema)', val: 180 },
    { label: '270° (Low Light)', val: 270 },
    { label: '360° (Max Blur)', val: 360 },
  ];

  return (
    <ToolShell
      title="Shutter Speed & Shutter Angle (180° Rule)"
      category="video"
      description="Calculate cinema shutter speed fractions from rotary shutter angles and framerates."
      icon="⏱️"
      onReset={() => {
        setFps(24);
        setAngle(180);
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Select Camera Frame Rate (FPS)</label>
          <div className="flex flex-wrap gap-2">
            {FPS_PRESETS.map((f) => (
              <button
                key={f}
                onClick={() => setFps(f)}
                className={`px-3 py-1.5 text-xs rounded-lg font-mono transition-all border ${
                  fps === f
                    ? 'bg-neutral-800 border-neutral-600 text-neutral-100 font-semibold'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {f} fps
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Shutter Angle Preset</label>
          <div className="flex flex-wrap gap-2">
            {ANGLE_PRESETS.map((a) => (
              <button
                key={a.label}
                onClick={() => setAngle(a.val)}
                className={`px-3 py-1.5 text-xs rounded-lg font-mono transition-all border ${
                  angle === a.val
                    ? 'bg-neutral-800 border-neutral-600 text-emerald-400 font-semibold'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-neutral-400">Custom Shutter Angle: {angle}°</span>
            <span className="text-xs font-mono text-neutral-500">Range 1° - 360°</span>
          </div>
          <input
            type="range"
            min="1"
            max="360"
            step="1"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value) || 180)}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Calculated Shutter Speed</span>
            <div className="text-3xl font-bold font-mono text-emerald-400 mt-2">
              {res.shutterSpeedFraction}
            </div>
            <div className="text-xs text-neutral-400 font-mono mt-1">
              ({res.exposureTimeSeconds}s exposure)
            </div>
          </div>

          <div className="p-5 bg-neutral-950/80 border border-neutral-800 rounded-xl md:col-span-2">
            <span className="text-xs text-neutral-500 font-mono">Motion Aesthetic Character</span>
            <div className="text-base font-semibold text-neutral-100 mt-2">
              {res.motionBlurDescription}
            </div>
            <div className="text-xs text-neutral-400 font-mono mt-1">
              Reciprocal speed: 1 / {res.reciprocalSpeed} at {res.fps} frames per second
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
