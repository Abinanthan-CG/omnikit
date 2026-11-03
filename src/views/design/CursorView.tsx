import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { CURSOR_LIST, getCursorCss } from '../../engines/design/cursorTools';

export const CursorView: React.FC = () => {
  const [activeCursor, setActiveCursor] = useState('pointer');

  const css = getCursorCss(activeCursor);

  return (
    <ToolShell
      title="CSS Cursor Visualizer & Reference"
      category="design"
      description="Hover and preview standard CSS cursors, copy css rules, and test interactive states."
      icon="👆"
      onReset={() => setActiveCursor('pointer')}
    >
      <div className="space-y-6">
        <div
          className="w-full h-32 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center space-y-1 select-none transition-colors"
          style={{ cursor: activeCursor }}
        >
          <div className="text-sm font-semibold text-neutral-200">Interactive Hover Sandbox</div>
          <div className="text-xs text-emerald-400 font-mono">cursor: {activeCursor};</div>
          <div className="text-[10px] text-neutral-500">Move your mouse here to test this cursor</div>
        </div>

        <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-neutral-400 font-semibold font-mono">CSS Rule</span>
            <CopyButton text={css} />
          </div>
          <div className="font-mono text-sm text-emerald-400 bg-neutral-900/50 p-2.5 rounded">
            {css}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {CURSOR_LIST.map(c => (
            <div
              key={c.name}
              onClick={() => setActiveCursor(c.name)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                activeCursor === c.name
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
              }`}
              style={{ cursor: c.name }}
            >
              <div className="font-mono text-xs font-bold">{c.name}</div>
              <div className="text-[10px] text-neutral-500 pt-0.5 line-clamp-1">{c.description}</div>
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
};
