import React from 'react';
import { Sparkles, Terminal, ShieldCheck } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClearActiveTool}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-neutral-100 flex items-center gap-1.5">
                Omnikit
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  100% Client-Side
                </span>
              </span>
            </div>
          </button>

          {activeToolTitle && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-neutral-400">
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-200 font-medium">{activeToolTitle}</span>
            </div>
          )}
        </div>

        {/* Global Search Trigger & Privacy Badge */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 transition-all shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5 text-neutral-500" />
            <span>Search tools...</span>
            <kbd className="hidden sm:inline-block font-mono text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-700">
              Ctrl+K
            </kbd>
          </button>

          <div
            title="Zero server calls. Every calculation, conversion, and file remains local in your browser."
            className="hidden md:flex items-center gap-1.5 text-xs text-neutral-500 border border-neutral-800/60 px-2 py-1 rounded-md"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Privacy Guard</span>
          </div>
        </div>
      </div>
    </header>
  );
};
