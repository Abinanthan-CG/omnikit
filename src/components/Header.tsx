import React, { useState, useEffect } from 'react';
import {
  Layers,
  Terminal,
  ShieldCheck,
  Volume2,
  VolumeX,
  Shuffle,
  Github,
  PanelLeftClose,
  PanelLeft,
  Menu
} from 'lucide-react';
import type { ToolCategory } from '../types/tool';
import { CATEGORY_THEMES } from '../utils/categoryTheme';
import { initSoundPreference, setSoundPreference, playTactileClick } from '../utils/sound';

interface HeaderProps {
  onOpenPalette: () => void;
  activeToolTitle?: string;
  activeToolCategory?: ToolCategory;
  onClearActiveTool?: () => void;
  onRandomTool?: () => void;
  isSidebarCollapsed: boolean;
  onToggleSidebarCollapse: () => void;
  onOpenMobileSidebar: () => void;
  toolsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPalette,
  activeToolTitle,
  activeToolCategory,
  onClearActiveTool,
  onRandomTool,
  isSidebarCollapsed,
  onToggleSidebarCollapse,
  onOpenMobileSidebar,
  toolsCount = 155,
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
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-xl">
      <div className="w-full px-3 sm:px-4 h-14 flex items-center justify-between gap-3">
        {/* Left Side: Sidebar Toggle & Brand & Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Mobile Sidebar Hamburger */}
          <button
            onClick={() => {
              playTactileClick('pop');
              onOpenMobileSidebar();
            }}
            title="Open utilities menu"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-neutral-300 hover:text-neutral-100 hover:bg-neutral-900 active:bg-neutral-800 border border-neutral-800 md:hidden shrink-0 touch-manipulation"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Desktop Sidebar Collapse Toggle */}
          <button
            onClick={() => {
              playTactileClick('toggle');
              onToggleSidebarCollapse();
            }}
            title="Toggle sidebar (Ctrl+B)"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900 border border-neutral-800 hidden md:inline-flex"
          >
            {isSidebarCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>

          {/* Brand */}
          <button
            onClick={handleBrandClick}
            className="flex items-center gap-2 group text-left focus:outline-none shrink-0"
          >
            <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-750 flex items-center justify-center text-neutral-200 group-hover:border-neutral-600 transition-all shadow-sm">
              <Layers className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs sm:text-sm tracking-tight text-neutral-100 group-hover:text-white transition-colors">
                Omnikit
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.2 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                {toolsCount}
              </span>
            </div>
          </button>

          {/* Active Tool Breadcrumb or Studio Mode */}
          {activeToolTitle && activeTheme ? (
            <div className="flex items-center gap-1.5 text-xs min-w-0">
              <span className="text-neutral-700">/</span>
              <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border uppercase tracking-wider shrink-0 ${activeTheme.badgeClass}`}>
                {activeTheme.shortLabel}
              </span>
              <span className="text-neutral-200 font-medium truncate max-w-[100px] sm:max-w-xs text-xs">
                {activeToolTitle}
              </span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-400">
              <span className="text-neutral-700">/</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-900 text-emerald-400 border border-neutral-800">
                Studio Workbench
              </span>
            </div>
          )}
        </div>

        {/* Center: Raycast Quick Search Pill on Desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
          <button
            onClick={() => {
              playTactileClick('pop');
              onOpenPalette();
            }}
            className="w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-xl bg-neutral-900/80 hover:bg-neutral-850 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 transition-all shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-sans text-xs">Search 155 offline utilities...</span>
            </div>
            <kbd className="font-mono text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-700">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right Side: Quick Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Random Tool Discovery */}
          {onRandomTool && (
            <button
              onClick={handleRandom}
              title="Surprise me with a random utility"
              className="p-1.5 sm:p-2 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Tactile Audio Toggle */}
          <button
            onClick={toggleSound}
            title={soundOn ? 'Tactile clicks enabled (click to mute)' : 'Enable subtle tactile clicks'}
            className={`p-1.5 sm:p-2 rounded-lg border transition-colors ${
              soundOn
                ? 'bg-neutral-800 text-emerald-400 border-neutral-700'
                : 'bg-neutral-900/80 text-neutral-500 hover:text-neutral-300 border-neutral-800'
            }`}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Search Palette Trigger */}
          <button
            onClick={() => {
              playTactileClick('pop');
              onOpenPalette();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900/90 border border-neutral-800 text-neutral-400 hover:text-neutral-100 hover:border-neutral-700 transition-all shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5 text-neutral-500" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-block font-mono text-[9px] bg-neutral-800 text-neutral-400 px-1 py-0.2 rounded border border-neutral-700">
              Ctrl+K
            </kbd>
          </button>

          {/* Offline Badge */}
          <div
            title="100% Client-Side Sandbox. Zero network requests, zero telemetry."
            className="hidden lg:flex items-center gap-1.5 text-xs text-neutral-400 border border-neutral-800 px-2 py-1 rounded-md bg-neutral-900/40"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-mono">Offline-First</span>
          </div>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/Abinanthan-CG/omnikit"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub repository"
            className="p-1.5 sm:p-2 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
