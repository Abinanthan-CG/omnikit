import React, { useState, useEffect, useRef } from 'react';
import { Search, X, CornerDownLeft, Star } from 'lucide-react';
import type { ToolDefinition, ToolCategory } from '../types/tool';
import { filterToolList } from './paletteLogic';
import { ToolIcon } from './ToolIcon';
import { CATEGORY_THEMES } from '../utils/categoryTheme';
import { playTactileClick } from '../utils/sound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  tools: ToolDefinition[];
  onSelectTool: (id: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  tools,
  onSelectTool,
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ToolCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = filterToolList(tools, query, category);

  // Load pinned IDs
  useEffect(() => {
    try {
      const stored = localStorage.getItem('omnikit_pinned');
      if (stored) setPinnedIds(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, [isOpen]);

  // Lock background body scroll when palette is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Arrow key navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      playTactileClick('pop');
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      playTactileClick('pop');
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      playTactileClick('click');
      onSelectTool(filtered[selectedIndex].id);
      onClose();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      playTactileClick('click');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-2 sm:pt-20 px-2 sm:px-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-neutral-900 border border-neutral-750 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] sm:max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-3 sm:px-4 border-b border-neutral-800 h-14 gap-2.5 sm:gap-3 bg-neutral-900/95">
          <Search className="w-4 sm:w-5 h-4 sm:h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search utilities, category, or keyword..."
            className="w-full bg-transparent text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
              }}
              className="p-1.5 text-neutral-400 hover:text-neutral-200 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => {
              playTactileClick('pop');
              onClose();
            }}
            className="sm:hidden px-2.5 py-1 text-xs font-mono text-neutral-300 hover:text-white bg-neutral-800 rounded-lg border border-neutral-700 active:bg-neutral-700"
          >
            Close
          </button>
          <kbd className="hidden sm:inline-block font-mono text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-700">
            Esc
          </kbd>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-950/70 border-b border-neutral-800/80 overflow-x-auto text-[11px] scrollbar-none touch-pan-x">
          {(['all', 'dev', 'design', 'writing', 'video', 'audio'] as ToolCategory[]).map((cat) => {
            const isSelected = category === cat;
            const theme = CATEGORY_THEMES[cat];
            return (
              <button
                key={cat}
                onClick={() => {
                  playTactileClick('toggle');
                  setCategory(cat);
                  setSelectedIndex(0);
                }}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  isSelected
                    ? theme.activePillClass
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 border border-transparent'
                }`}
              >
                {theme.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-neutral-800/30">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-neutral-500">
              No matching utilities found for "{query}".
            </div>
          ) : (
            filtered.map((tool, idx) => {
              const isSelected = idx === selectedIndex;
              const theme = CATEGORY_THEMES[tool.category] || CATEGORY_THEMES.all;
              const isPinned = pinnedIds.includes(tool.id);

              return (
                <div
                  key={tool.id}
                  onClick={() => {
                    playTactileClick('click');
                    onSelectTool(tool.id);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-neutral-800/90 text-neutral-100 shadow-sm'
                      : 'text-neutral-300 hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                        isSelected
                          ? `${theme.bgSubtle} ${theme.borderAccent}`
                          : 'bg-neutral-850 border-neutral-750 text-neutral-400'
                      }`}
                    >
                      <ToolIcon
                        toolId={tool.id}
                        category={tool.category}
                        className={`w-4 h-4 ${isSelected ? theme.textAccent : 'text-neutral-400'}`}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium flex items-center gap-2">
                        <span className="truncate">{tool.title}</span>
                        {isPinned && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
                        <span
                          className={`text-[9px] uppercase font-mono tracking-wider px-1.5 py-0.2 rounded border shrink-0 ${theme.badgeClass}`}
                        >
                          {theme.shortLabel}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-400 truncate max-w-md">
                        {tool.description}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono shrink-0 ml-2">
                      <span className="hidden sm:inline">Open</span>
                      <CornerDownLeft className="w-3.5 h-3.5 text-neutral-300" />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 border-t border-neutral-800 text-[11px] text-neutral-500 flex items-center justify-between bg-neutral-950/70">
          <div className="flex items-center gap-3 font-mono">
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>Esc Close</span>
          </div>
          <span className="font-mono text-neutral-400">
            {filtered.length} {filtered.length === 1 ? 'utility' : 'utilities'}
          </span>
        </div>
      </div>
    </div>
  );
};
