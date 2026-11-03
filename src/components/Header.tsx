import React, { useState, useEffect } from 'react';
import { Layers, Terminal, ShieldCheck, Volume2, VolumeX, Shuffle, Github } from 'lucide-react';
import type { ToolCategory } from '../types/tool';
import { CATEGORY_THEMES } from '../utils/categoryTheme';
import { initSoundPreference, setSoundPreference, playTactileClick } from '../utils/sound';

interface HeaderProps {
  onOpenPalette: () => void;
  activeToolTitle?: string;
  activeToolCategory?: ToolCategory;
  onClearActiveTool?: () => void;
  onRandomTool?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPalette,
  activeToolTitle,
  activeToolCategory,
  onClearActiveTool,
  onRandomTool,
}) => {
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    setSoundOn(initSoundPreference());
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundPreference(next);
    if (next) {
      setTimeout(() => playTactileClick('pop'), 50);
    }
  };

  const handleBrandClick = () => {
    playTactileClick('click');
    onClearActiveTool?.();
  };

  const handleRandom = () => {
    playTactileClick('pop');
    onRandomTool?.();
  };

  const activeTheme = activeToolCategory ? CATEGORY_THEMES[activeToolCategory] : null;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/85 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Brand & Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={handleBrandClick}
            className="flex items-center gap-2.5 group text-left focus:outline-none shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-750 flex items-center justify-center text-neutral-200 group-hover:border-neutral-600 transition-all shadow-sm">
              <Layers className="w-4 h-4 text-emerald-400 group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-neutral-100 group-hover:text-white transition-colors">
                Omnikit
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                125 tools
              </span>
            </div>
          </button>

          {activeToolTitle && activeTheme && (
            <div className="flex items-center gap-2 text-xs min-w-0">
              <span className="text-neutral-700">/</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase tracking-wider shrink-0 ${activeTheme.badgeClass}`}>
                {activeTheme.shortLabel}
              </span>
              <span className="text-neutral-200 font-medium truncate max-w-[160px] sm:max-w-xs">
                {activeToolTitle}
              </span>
            </div>
          )}
        </div>

        {/* Action Controls & Triggers */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Random Tool Discovery */}
          {onRandomTool && (
            <button
              onClick={handleRandom}
              title="Surprise me with a random utility"
              className="p-2 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Tactile Audio Toggle */}
          <button
            onClick={toggleSound}
            title={soundOn ? 'Tactile clicks enabled (click to mute)' : 'Enable subtle tactile clicks'}
            className={`p-2 rounded-lg border transition-colors ${
              soundOn
                ? 'bg-neutral-800 text-emerald-400 border-neutral-700'
                : 'bg-neutral-900/80 text-neutral-500 hover:text-neutral-300 border-neutral-800'
            }`}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Quick Search Palette Trigger */}
          <button
            onClick={() => {
              playTactileClick('pop');
              onOpenPalette();
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg bg-neutral-900/90 border border-neutral-800 text-neutral-400 hover:text-neutral-100 hover:border-neutral-700 transition-all shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5 text-neutral-500" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline-block font-mono text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-700">
              Ctrl+K
            </kbd>
          </button>

          {/* Offline-First Privacy Status */}
          <div
            title="100% Client-Side. No telemetry, no remote servers, everything stays in your browser."
            className="hidden md:flex items-center gap-1.5 text-xs text-neutral-400 border border-neutral-800 px-2 py-1 rounded-md bg-neutral-900/40"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-mono">Offline-First</span>
          </div>

          {/* GitHub Repo */}
          <a
            href="https://github.com/Abinanthan-CG/omnikit"
            target="_blank"
            rel="noopener noreferrer"
            title="View source on GitHub"
            className="p-2 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
