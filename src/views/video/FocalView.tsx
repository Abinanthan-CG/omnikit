import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { calculateEquivalentFocalLength } from '../../engines/video/focalTools';

export const FocalView: React.FC = () => {
  const [focalLength, setFocalLength] = useState(50);
  const [cropFactor, setCropFactor] = useState(1.5); // APS-C default

  const result = calculateEquivalentFocalLength(focalLength, cropFactor);

  const SENSORS = [
    { label: 'Full Frame (35mm)', crop: 1.0 },
    { label: 'Super 35 / APS-C (Sony/Nikon/Fuji)', crop: 1.5 },
    { label: 'Canon APS-C', crop: 1.6 },
    { label: 'Micro Four Thirds (MFT)', crop: 2.0 },
    { label: '1-inch Type (RX100/Pocket)', crop: 2.7 },
  ];

  return (
    <ToolShell
      title="Camera Lens & Sensor Crop Factor Calculator"
      category="video"
      description="Calculate 35mm equivalent focal lengths and horizontal/vertical field of view across camera sensors."
      icon="📷"
      onReset={() => {
        setFocalLength(50);
        setCropFactor(1.5);
      }}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-xs text-neutral-400 font-semibold">Sensor Preset</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {SENSORS.map(s => (
              <button
                key={s.label}
                onClick={() => setCropFactor(s.crop)}
                className={`p-2.5 rounded-lg border text-left text-xs transition-colors ${
                  cropFactor === s.crop
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="font-medium text-neutral-200">{s.label}</div>
                <div className="font-mono text-[10px] text-neutral-500">{s.crop}x Crop Factor</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Physical Lens Focal Length ({focalLength}mm)</label>
            <input
              type="number"
              min="1"
              max="1200"
              value={focalLength}
              onChange={(e) => setFocalLength(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
            />
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {[16, 24, 35, 50, 85, 105, 135, 200].map(mm => (
                <button
                  key={mm}
                  onClick={() => setFocalLength(mm)}
                  className="px-2 py-0.5 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-300 font-mono hover:border-neutral-700"
                >
                  {mm}mm
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Custom Crop Factor ({cropFactor}x)</label>
            <input
              type="number"
              step="0.1"
              min="0.5"
              max="5.0"
              value={cropFactor}
              onChange={(e) => setCropFactor(Math.max(0.1, parseFloat(e.target.value) || 1))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-neutral-400">35mm Equivalent</span>
              <CopyButton text={`${result.equivalentFocalLength}mm`} />
            </div>
            <div className="text-3xl font-black font-mono text-emerald-400">
              {result.equivalentFocalLength} <span className="text-sm font-normal text-neutral-500">mm</span>
            </div>
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-1">
            <span className="text-xs text-neutral-400">Horizontal FOV</span>
            <div className="text-3xl font-black font-mono text-neutral-100">
              {result.horizontalFovDegrees}°
            </div>
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-1">
            <span className="text-xs text-neutral-400">Vertical FOV</span>
            <div className="text-3xl font-black font-mono text-neutral-100">
              {result.verticalFovDegrees}°
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
