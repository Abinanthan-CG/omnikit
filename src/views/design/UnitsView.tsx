import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { convertCssUnits } from '../../engines/design/unitsTools';

export const UnitsView: React.FC = () => {
  const [value, setValue] = useState(16);
  const [unit, setUnit] = useState<'px' | 'rem' | 'em' | 'pt' | 'in' | 'mm'>('px');
  const [root, setRoot] = useState(16);

  const res = convertCssUnits(value, unit, root, 1920, 1080);

  return (
    <ToolShell
      title="CSS Length & Viewport Units Converter"
      category="design"
      description="Convert distances across pixels, REM, EM, points, inches, millimeters, and viewport width/height."
      icon="📏"
      onReset={() => {
        setValue(16);
        setUnit('px');
        setRoot(16);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Value</label>
            <input
              type="number"
              step="0.1"
              value={value}
              onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Source Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as typeof unit)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
            >
              <option value="px">Pixels (px)</option>
              <option value="rem">Root REM (rem)</option>
              <option value="em">Relative EM (em)</option>
              <option value="pt">Typography Points (pt)</option>
              <option value="in">Inches (in)</option>
              <option value="mm">Millimeters (mm)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Root Base (px)</label>
            <input
              type="number"
              value={root}
              onChange={(e) => setRoot(parseFloat(e.target.value) || 16)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl">
            <span className="text-neutral-500">Pixels</span>
            <div className="text-xl font-bold text-emerald-400 mt-1">{res.px} px</div>
          </div>

          <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl">
            <span className="text-neutral-500">Root REM</span>
            <div className="text-xl font-bold text-sky-400 mt-1">{res.rem} rem</div>
          </div>

          <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl">
            <span className="text-neutral-500">Typography Pt</span>
            <div className="text-xl font-bold text-neutral-100 mt-1">{res.pt} pt</div>
          </div>

          <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl">
            <span className="text-neutral-500">Viewport Width</span>
            <div className="text-xl font-bold text-amber-400 mt-1">{res.vw} vw</div>
          </div>

          <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl">
            <span className="text-neutral-500">Inches</span>
            <div className="text-xl font-bold text-neutral-100 mt-1">{res.in} in</div>
          </div>

          <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl">
            <span className="text-neutral-500">Millimeters</span>
            <div className="text-xl font-bold text-neutral-100 mt-1">{res.mm} mm</div>
          </div>

          <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl">
            <span className="text-neutral-500">Viewport Height</span>
            <div className="text-xl font-bold text-amber-400 mt-1">{res.vh} vh</div>
          </div>

          <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl">
            <span className="text-neutral-500">Scale Ratio</span>
            <div className="text-xl font-bold text-neutral-300 mt-1">{(res.px / root).toFixed(2)}x</div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
