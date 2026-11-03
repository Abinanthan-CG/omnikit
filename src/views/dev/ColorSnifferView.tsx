import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { extractColors } from '../../engines/dev/colorSnifferTools';

export const ColorSnifferView: React.FC = () => {
  const [source, setSource] = useState(
    `<svg width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="#10b981" stroke="#047857" stroke-width="4" />
  <rect x="20" y="20" width="60" height="20" fill="rgba(255, 255, 255, 0.9)" />
  <path d="M10 80 Q 50 10 90 80" stroke="#06b6d4" fill="none" />
</svg>`
  );

  const colors = extractColors(source);

  return (
    <ToolShell
      title="Code Color Palette Sniffer & Extractor"
      category="dev"
      description="Extract all Hex, RGB, and HSL color values from arbitrary HTML, CSS, SVG, or JavaScript source code."
      icon="🎨"
      onReset={() => {
        setSource('');
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Source Code (HTML, CSS, SVG)</label>
          <textarea
            value={source}
            onChange={(e) => setSource(e.target.value)}
            rows={8}
            placeholder="Paste HTML, CSS, SVG, or JS code here to extract colors..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono resize-y focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-neutral-400">
              Extracted Color Palette ({colors.length} unique swatches)
            </span>
            {colors.length > 0 && (
              <CopyButton
                text={colors.map(c => c.color).join(', ')}
                label="Copy All Colors"
              />
            )}
          </div>

          {colors.length === 0 ? (
            <div className="p-6 bg-neutral-950/60 border border-neutral-800 rounded-xl text-center text-xs font-mono text-neutral-500">
              No hex, rgb, or hsl colors detected in source code
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {colors.map((c) => (
                <div
                  key={c.color}
                  className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center gap-3 group"
                >
                  <div
                    style={{ backgroundColor: c.color }}
                    className="w-8 h-8 rounded-lg border border-neutral-700/80 shadow-inner flex-shrink-0"
                  />
                  <div className="overflow-hidden">
                    <div className="text-xs font-mono font-semibold text-neutral-200 truncate">
                      {c.color}
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono">
                      {c.count} {c.count === 1 ? 'occurrence' : 'occurrences'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ToolShell>
  );
};
