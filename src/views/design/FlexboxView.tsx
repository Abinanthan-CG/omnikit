import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateFlexboxCss, FlexboxConfig } from '../../engines/design/flexboxTools';

export const FlexboxView: React.FC = () => {
  const [cfg, setCfg] = useState<FlexboxConfig>({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gapPx: 16
  });

  const res = generateFlexboxCss(cfg);

  return (
    <ToolShell
      title="CSS Flexbox Layout Studio"
      category="design"
      description="Interactive flexbox layout playground generating standard CSS rules and Tailwind utility classes."
      icon="📦"
      onReset={() => {
        setCfg({
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'nowrap',
          gapPx: 16
        });
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div>
            <label className="text-neutral-400 mb-1 block">Direction</label>
            <select
              value={cfg.flexDirection}
              onChange={e => setCfg({ ...cfg, flexDirection: e.target.value as FlexboxConfig['flexDirection'] })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-neutral-100"
            >
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>

          <div>
            <label className="text-neutral-400 mb-1 block">Justify Content</label>
            <select
              value={cfg.justifyContent}
              onChange={e => setCfg({ ...cfg, justifyContent: e.target.value as FlexboxConfig['justifyContent'] })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-neutral-100"
            >
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
            </select>
          </div>

          <div>
            <label className="text-neutral-400 mb-1 block">Align Items</label>
            <select
              value={cfg.alignItems}
              onChange={e => setCfg({ ...cfg, alignItems: e.target.value as FlexboxConfig['alignItems'] })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-neutral-100"
            >
              <option value="stretch">stretch</option>
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="baseline">baseline</option>
            </select>
          </div>

          <div>
            <label className="text-neutral-400 mb-1 block">Gap ({cfg.gapPx}px)</label>
            <input
              type="range"
              min="0"
              max="40"
              value={cfg.gapPx}
              onChange={e => setCfg({ ...cfg, gapPx: Number(e.target.value) })}
              className="w-full accent-emerald-500 pt-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">CSS Snippet</span>
                <CopyButton text={res.cssRules} label="Copy CSS" />
              </div>
              <pre className="p-3 bg-neutral-900 rounded font-mono text-emerald-400 text-xs">
                {res.cssRules}
              </pre>
            </div>

            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">Tailwind Utility Class</span>
                <CopyButton text={res.tailwindClasses} label="Copy Tailwind" />
              </div>
              <pre className="p-3 bg-neutral-900 rounded font-mono text-sky-400 text-xs">
                {res.tailwindClasses}
              </pre>
            </div>
          </div>

          {/* Interactive flex stage */}
          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-2xl flex flex-col justify-between min-h-[220px]">
            <span className="text-xs font-mono text-neutral-500 mb-2">Flex Container Preview</span>
            <div
              style={{
                display: 'flex',
                flexDirection: cfg.flexDirection,
                justifyContent: cfg.justifyContent,
                alignItems: cfg.alignItems,
                flexWrap: cfg.flexWrap,
                gap: `${cfg.gapPx}px`
              }}
              className="w-full h-44 bg-neutral-900/50 border border-dashed border-neutral-700 rounded-xl p-3 overflow-hidden transition-all"
            >
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center font-mono font-bold text-neutral-950 text-xs shadow-md">1</div>
              <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center font-mono font-bold text-neutral-950 text-xs shadow-md">2</div>
              <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center font-mono font-bold text-neutral-950 text-xs shadow-md">3</div>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
