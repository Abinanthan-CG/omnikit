import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { simulateColorBlindness } from '../../engines/design/colorBlindTools';

export const ColorBlindView: React.FC = () => {
  const [baseHex, setBaseHex] = useState('#EF4444');

  const sims = simulateColorBlindness(baseHex);

  return (
    <ToolShell
      title="Color Vision Deficiency (Color Blindness) Simulator"
      category="design"
      description="Simulate how your brand colors appear to users with Protanopia, Deuteranopia, Tritanopia, and Achromatopsia."
      icon="👁️"
      onReset={() => setBaseHex('#EF4444')}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={baseHex}
              onChange={(e) => setBaseHex(e.target.value)}
              className="w-14 h-14 bg-transparent border-none rounded-xl cursor-pointer"
            />
            <div>
              <span className="text-xs text-neutral-500 font-mono">Original Standard RGB</span>
              <div className="text-xl font-bold font-mono text-neutral-100">{baseHex.toUpperCase()}</div>
            </div>
          </div>
          <div
            className="flex-1 w-full h-12 rounded-lg border border-neutral-700/50 flex items-center justify-center font-mono text-xs font-bold text-white shadow-inner"
            style={{ backgroundColor: baseHex }}
          >
            Normal Vision Preview
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Simulated Deficiencies</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sims.map((sim) => (
              <div
                key={sim.type}
                className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg border border-neutral-700 shadow"
                    style={{ backgroundColor: sim.simulatedHex }}
                  />
                  <div>
                    <span className="text-xs font-semibold text-neutral-200">{sim.name}</span>
                    <div className="text-xs font-mono text-emerald-400 mt-0.5">{sim.simulatedHex}</div>
                  </div>
                </div>
                <CopyButton text={sim.simulatedHex} label="Copy Hex" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
