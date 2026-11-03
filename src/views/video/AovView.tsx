import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { calculateAov, SENSOR_SIZES } from '../../engines/video/aovTools';

export const AovView: React.FC = () => {
  const [focalLength, setFocalLength] = useState(50);
  const [sensorIdx, setSensorIdx] = useState(0);

  const sensor = SENSOR_SIZES[sensorIdx] || SENSOR_SIZES[0];
  const res = calculateAov(focalLength, sensor);

  const LENSES = [16, 24, 35, 50, 85, 105, 135, 200];

  return (
    <ToolShell
      title="Camera Lens Angle of View (AoV) Geometry"
      category="video"
      description="Calculate horizontal, vertical, and diagonal field of view angles across cinema sensor standards."
      icon="📷"
      onReset={() => {
        setFocalLength(50);
        setSensorIdx(0);
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Camera Sensor Format</label>
          <select
            value={sensorIdx}
            onChange={(e) => setSensorIdx(parseInt(e.target.value))}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
          >
            {SENSOR_SIZES.map((s, idx) => (
              <option key={s.name} value={idx}>
                {s.name} ({s.widthMm}mm × {s.heightMm}mm)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Standard Prime Focal Lengths (mm)</label>
          <div className="flex flex-wrap gap-2">
            {LENSES.map((mm) => (
              <button
                key={mm}
                onClick={() => setFocalLength(mm)}
                className={`px-3 py-1.5 text-xs rounded-lg font-mono border transition-all ${
                  focalLength === mm
                    ? 'bg-neutral-800 border-neutral-600 text-emerald-400 font-bold'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {mm}mm
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-neutral-400">Custom Lens Focal Length: {focalLength}mm</span>
          </div>
          <input
            type="range"
            min="10"
            max="300"
            value={focalLength}
            onChange={(e) => setFocalLength(parseInt(e.target.value) || 50)}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Horizontal AoV</span>
            <div className="text-3xl font-bold font-mono text-emerald-400 mt-2">
              {res.horizontalAovDeg}°
            </div>
            <div className="text-xs text-neutral-400 font-mono mt-1">
              across {sensor.widthMm}mm width
            </div>
          </div>

          <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Vertical AoV</span>
            <div className="text-3xl font-bold font-mono text-sky-400 mt-2">
              {res.verticalAovDeg}°
            </div>
            <div className="text-xs text-neutral-400 font-mono mt-1">
              across {sensor.heightMm}mm height
            </div>
          </div>

          <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Diagonal AoV</span>
            <div className="text-3xl font-bold font-mono text-amber-400 mt-2">
              {res.diagonalAovDeg}°
            </div>
            <div className="text-xs text-neutral-400 font-mono mt-1">
              across {res.diagonalMm}mm diagonal
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
