import React from 'react';
import { Layers, Terminal, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenPalette: () => void;
  activeToolTitle?: string;
  onClearActiveTool?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPalette,
  activeToolTitle,
  onClearActiveTool,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClearActiveTool}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-200 group-hover:border-neutral-700 transition-colors">
              <Layers className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="font-semibold text-sm tracking-tight text-neutral-100 flex items-center gap-2">
                Omnikit
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                  125 tools
                </span>
              </span>
            </div>
          </button>

          {activeToolTitle && (
            <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400">
              <span className="text-neutral-700">/</span>
              <span className="text-neutral-200 font-medium truncate max-w-xs">{activeToolTitle}</span>
            </div>
          )}
        </div>

        {/* Global Search Trigger & Privacy Badge */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenPalette}
            className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg bg-neutral-900/90 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 transition-all shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5 text-neutral-500" />
            <span className="hidden sm:inline">Search utilities...</span>
            <span className="sm:hidden">Search</span>
            <kbd className="hidden sm:inline-block font-mono text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-700">
              Ctrl+K
            </kbd>
          </button>

          <div
            title="All operations execute locally in your browser. Zero network tracking or remote server calls."
            className="hidden md:flex items-center gap-1.5 text-xs text-neutral-400 border border-neutral-800 px-2 py-1 rounded-md bg-neutral-900/40"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-mono">Offline-First</span>
          </div>
        </div>
      </div>
    </header>
  );
};
