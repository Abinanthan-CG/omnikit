import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { calculateBoxModel } from '../../engines/design/boxSizingTools';

export const BoxSizingView: React.FC = () => {
  const [width, setWidth] = useState(240);
  const [height, setHeight] = useState(120);
  const [padding, setPadding] = useState(24);
  const [border, setBorder] = useState(4);
  const [boxSizing, setBoxSizing] = useState<'content-box' | 'border-box'>('border-box');

  const metrics = calculateBoxModel(width, height, padding, border, boxSizing);

  return (
    <ToolShell
      title="CSS Box Model & Sizing Visualizer"
      category="design"
      description="Inspect outer rendered dimensions versus inner content areas between content-box and border-box sizing models."
      icon="📦"
      onReset={() => {
        setWidth(240);
        setHeight(120);
        setPadding(24);
        setBorder(4);
        setBoxSizing('border-box');
      }}
    >
      <div className="space-y-6">
        <div className="flex gap-2">
          <button
            onClick={() => setBoxSizing('border-box')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-colors ${
              boxSizing === 'border-box'
                ? 'bg-neutral-800 text-emerald-400 font-bold border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            box-sizing: border-box (Modern Standard)
          </button>
          <button
            onClick={() => setBoxSizing('content-box')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-colors ${
              boxSizing === 'content-box'
                ? 'bg-neutral-800 text-sky-400 font-bold border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            box-sizing: content-box (W3C Default)
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">CSS Width (px)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">CSS Height (px)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Padding (px)</label>
            <input
              type="number"
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Border (px)</label>
            <input
              type="number"
              value={border}
              onChange={(e) => setBorder(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-100 font-mono focus:outline-none"
            />
          </div>
        </div>

        <div className="p-5 bg-neutral-950/80 border border-neutral-800 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-neutral-500 font-mono">Rendered Outer Box Size</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
              {metrics.totalRenderedWidth}px × {metrics.totalRenderedHeight}px
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Physical screen footprint in DOM layout</div>
          </div>
          <div>
            <span className="text-xs text-neutral-500 font-mono">Inner Content Usable Area</span>
            <div className="text-2xl font-bold font-mono text-sky-400 mt-1">
              {metrics.contentWidth}px × {metrics.contentHeight}px
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Space available for text and child elements</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono text-neutral-400">Generated CSS Rules</label>
            <CopyButton text={metrics.cssRuleSnippet} label="Copy CSS" />
          </div>
          <pre className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-neutral-300 overflow-x-auto">
            {metrics.cssRuleSnippet}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};
