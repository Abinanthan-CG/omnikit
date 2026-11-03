import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { calculateDof } from '../../engines/video/dofTools';

const SENSOR_COC = [
  { name: 'Full Frame 35mm (0.030mm)', coc: 0.030 },
  { name: 'Super 35 / APS-C (0.020mm)', coc: 0.020 },
  { name: 'Micro Four Thirds (0.015mm)', coc: 0.015 },
  { name: '1-inch Sensor (0.011mm)', coc: 0.011 }
];

export const DofView: React.FC = () => {
  const [focalLength, setFocalLength] = useState(50);
  const [aperture, setAperture] = useState(2.8);
  const [distance, setDistance] = useState(3.0);
  const [coc, setCoc] = useState(0.030);

  const dof = calculateDof(focalLength, aperture, distance, coc);

  return (
    <ToolShell
      title="Camera Depth of Field (DoF) & Hyperfocal Geometry"
      category="video"
      description="Calculate hyperfocal distance, near limit, far limit, and total depth of field sharpness zone."
      icon="🎯"
      onReset={() => {
        setFocalLength(50);
        setAperture(2.8);
        setDistance(3.0);
        setCoc(0.030);
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Sensor Format & Circle of Confusion (CoC)</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {SENSOR_COC.map((s) => (
              <button
                key={s.name}
                onClick={() => setCoc(s.coc)}
                className={`p-2.5 rounded-lg border text-left text-xs font-mono transition-colors ${
                  coc === s.coc
                    ? 'bg-neutral-800 border-neutral-700 text-neutral-100'
                    : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Focal Length (mm)</label>
            <input
              type="number"
              value={focalLength}
              onChange={(e) => setFocalLength(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Aperture (f-stop)</label>
            <input
              type="number"
              step="0.1"
              value={aperture}
              onChange={(e) => setAperture(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Subject Distance (m)</label>
            <input
              type="number"
              step="0.1"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none"
            />
          </div>
        </div>

        <div className="p-5 bg-neutral-950/80 border border-neutral-800 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <span className="text-xs text-neutral-500 font-mono">Hyperfocal Distance</span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1">
              {dof.hyperfocalDistanceMeters} m
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Focus here for ∞ sharpness</div>
          </div>
          <div>
            <span className="text-xs text-neutral-500 font-mono">Near Limit</span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-sky-400 mt-1">
              {dof.nearLimitMeters} m
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Start of sharp focus</div>
          </div>
          <div>
            <span className="text-xs text-neutral-500 font-mono">Far Limit</span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-purple-400 mt-1">
              {dof.farLimitMeters === 'Infinity' ? '∞' : `${dof.farLimitMeters} m`}
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">End of sharp focus</div>
          </div>
          <div>
            <span className="text-xs text-neutral-500 font-mono">Total Depth of Field</span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400 mt-1">
              {dof.totalDepthOfFieldMeters === 'Infinity' ? '∞' : `${dof.totalDepthOfFieldMeters} m`}
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">{dof.inFrontPercent}% front / {dof.behindPercent}% back</div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
