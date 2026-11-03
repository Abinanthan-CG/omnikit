import React from 'react';
import {
  Layers,
  Search,
  Shuffle,
  Star,
  Home,
  ArrowLeft
} from 'lucide-react';
import { playTactileClick } from '../utils/sound';

interface MobileNavProps {
  onOpenMobileSidebar: () => void;
  onOpenPalette: () => void;
  onRandomTool: () => void;
  activeToolId: string | null;
  onClearActiveTool: () => void;
  pinnedCount: number;
  totalCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  onOpenMobileSidebar,
  onOpenPalette,
  onRandomTool,
  activeToolId,
  onClearActiveTool,
  pinnedCount,
  totalCount
}) => {
  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800/80 px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom,0px))] select-none shadow-[0_-8px_24px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center justify-around gap-1 max-w-lg mx-auto">
        {/* Drawer Trigger */}
        <button
          onClick={() => {
            playTactileClick('pop');
            onOpenMobileSidebar();
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl text-neutral-400 hover:text-neutral-100 active:bg-neutral-900 active:scale-95 transition-all relative min-h-[44px]"
        >
          <div className="relative">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span className="absolute -top-1.5 -right-3.5 text-[8px] font-mono px-1 py-0.1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {totalCount}
            </span>
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-1 text-neutral-300">
            Utilities
          </span>
        </button>

        {/* Search / Palette Trigger */}
        <button
          onClick={() => {
            playTactileClick('pop');
            onOpenPalette();
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl text-neutral-400 hover:text-neutral-100 active:bg-neutral-900 active:scale-95 transition-all min-h-[44px]"
        >
          <Search className="w-4 h-4 text-neutral-300" />
          <span className="text-[10px] font-medium tracking-tight mt-1 text-neutral-400">
            Search
          </span>
        </button>

        {/* Shuffle Random Tool */}
        <button
          onClick={() => {
            playTactileClick('pop');
            onRandomTool();
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl text-neutral-400 hover:text-neutral-100 active:bg-neutral-900 active:scale-95 transition-all min-h-[44px]"
        >
          <Shuffle className="w-4 h-4 text-purple-400" />
          <span className="text-[10px] font-medium tracking-tight mt-1 text-neutral-400">
            Shuffle
          </span>
        </button>

        {/* Favorites Counter */}
        <button
          onClick={() => {
            playTactileClick('click');
            onOpenMobileSidebar();
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl text-neutral-400 hover:text-neutral-100 active:bg-neutral-900 active:scale-95 transition-all min-h-[44px]"
        >
          <div className="relative">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400/50" />
            {pinnedCount > 0 && (
              <span className="absolute -top-1 -right-2 text-[8px] font-mono px-1 rounded-full bg-amber-500/20 text-amber-300">
                {pinnedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-1 text-neutral-400">
            Favorites
          </span>
        </button>

        {/* Workbench Home / Back to Catalog */}
        <button
          onClick={() => {
            playTactileClick('click');
            onClearActiveTool();
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all min-h-[44px] ${
            activeToolId
              ? 'text-cyan-400 active:bg-cyan-950/40'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          {activeToolId ? (
            <>
              <ArrowLeft className="w-4 h-4" />
              <span className="text-[10px] font-medium tracking-tight mt-1">Back</span>
            </>
          ) : (
            <>
              <Home className="w-4 h-4" />
              <span className="text-[10px] font-medium tracking-tight mt-1">Overview</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
};
