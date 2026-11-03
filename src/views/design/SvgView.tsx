import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { svgToDataUri, svgToReactJsx, cleanSvg } from '../../engines/design/svgTools';

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
</svg>`;

export const SvgView: React.FC = () => {
  const [svg, setSvg] = useState(SAMPLE_SVG);
  const [componentName, setComponentName] = useState('CustomStarIcon');

  const dataUri = svgToDataUri(svg);
  const jsxCode = svgToReactJsx(svg, componentName);
  const minified = cleanSvg(svg);

  return (
    <ToolShell
      title="SVG to Data-URI & React JSX"
      category="design"
      description="Clean SVGs, generate CSS Data URIs, and convert vectors into typed React JSX components."
      icon="📐"
      onReset={() => setSvg(SAMPLE_SVG)}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs text-neutral-400 mb-1">Raw SVG Markup</label>
          <textarea
            value={svg}
            onChange={(e) => setSvg(e.target.value)}
            rows={5}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-emerald-400 font-mono">CSS Data URI</span>
              <CopyButton text={dataUri} />
            </div>
            <div className="font-mono text-xs text-neutral-300 break-all select-all bg-neutral-900/50 p-2.5 rounded max-h-36 overflow-y-auto">
              {dataUri}
            </div>
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-emerald-400 font-mono">Minified SVG</span>
              <CopyButton text={minified} />
            </div>
            <div className="font-mono text-xs text-neutral-300 break-all select-all bg-neutral-900/50 p-2.5 rounded max-h-36 overflow-y-auto">
              {minified}
            </div>
          </div>
        </div>

        <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-lg space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400 font-mono">React Component</span>
              <input
                type="text"
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
                placeholder="ComponentName"
                className="bg-neutral-900 border border-neutral-800 rounded px-2 py-0.5 text-xs text-neutral-100 font-mono"
              />
            </div>
            <CopyButton text={jsxCode} label="Copy JSX" />
          </div>
          <pre className="font-mono text-xs text-neutral-300 bg-neutral-900/50 p-3 rounded overflow-x-auto max-h-48">
            {jsxCode}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};
