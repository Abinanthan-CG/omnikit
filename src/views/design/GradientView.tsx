import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateGradientCss, GradientStop } from '../../engines/design/gradientTools';

export const GradientView: React.FC = () => {
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<GradientStop[]>([
    { color: '#10b981', position: 0 },
    { color: '#3b82f6', position: 100 },
  ]);

  const css = generateGradientCss({ type, angle, stops });

  const updateStop = (idx: number, key: keyof GradientStop, val: unknown) => {
    setStops(prev => prev.map((s, i) => i === idx ? { ...s, [key]: val } : s));
  };

  const addStop = () => {
    setStops(prev => [...prev, { color: '#8b5cf6', position: 50 }]);
  };

  const removeStop = (idx: number) => {
    if (stops.length > 2) {
      setStops(prev => prev.filter((_, i) => i !== idx));
    }
  };

  return (
    <ToolShell
      title="CSS Gradient Generator"
      category="design"
      description="Design smooth linear and radial CSS gradients with live preview and code export."
      icon="🌈"
      onReset={() => {
        setType('linear');
        setAngle(135);
        setStops([
          { color: '#10b981', position: 0 },
          { color: '#3b82f6', position: 100 },
        ]);
      }}
    >
      <div className="space-y-6">
        <div
          className="w-full h-36 rounded-2xl shadow-lg border border-neutral-700/50 transition-all"
          style={{ background: css.replace('background: ', '').replace(';', '') }}
        />

        <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-neutral-400 font-semibold">CSS Rule</span>
            <CopyButton text={css} />
          </div>
          <pre className="font-mono text-xs text-emerald-400 bg-neutral-900/50 p-2.5 rounded">
            {css}
          </pre>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={() => setType('linear')}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  type === 'linear' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                }`}
              >
                Linear Gradient
              </button>
              <button
                onClick={() => setType('radial')}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  type === 'radial' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                }`}
              >
                Radial Gradient
              </button>
            </div>

            {type === 'linear' && (
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Angle ({angle}°)</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500"
                />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-400 font-semibold">Color Stops ({stops.length})</span>
              <button
                onClick={addStop}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
              >
                + Add Stop
              </button>
            </div>

            {stops.map((s, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 bg-neutral-950 border border-neutral-800 rounded-lg">
                <input
                  type="color"
                  value={s.color}
                  onChange={(e) => updateStop(idx, 'color', e.target.value)}
                  className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={s.position}
                  onChange={(e) => updateStop(idx, 'position', parseInt(e.target.value, 10))}
                  className="flex-1 accent-emerald-500"
                />
                <span className="text-xs font-mono text-neutral-400 w-10 text-right">{s.position}%</span>
                {stops.length > 2 && (
                  <button
                    onClick={() => removeStop(idx)}
                    className="text-xs text-red-400 hover:text-red-300 ml-1"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
