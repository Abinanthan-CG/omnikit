import React, { useState, useEffect, useRef } from 'react';
import { Search, X, CornerDownLeft, Sparkles } from 'lucide-react';
import type { ToolDefinition, ToolCategory } from '../types/tool';
import { filterToolList } from './paletteLogic';

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
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = filterToolList(tools, query, category);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global keyboard shortcuts (Ctrl+K, Cmd+K, /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      } else if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        // open handled in parent
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Arrow key navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      onSelectTool(filtered[selectedIndex].id);
      onClose();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-neutral-800 h-14 gap-3 bg-neutral-900/90">
          <Search className="w-5 h-5 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a tool name, category, or keyword..."
            className="w-full bg-transparent text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-500 hover:text-neutral-300 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block font-mono text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-700">
            ESC to close
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-neutral-800/40">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-neutral-500">
              No matching tools found for "{query}".
            </div>
          ) : (
            filtered.map((tool, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={tool.id}
                  onClick={() => {
                    onSelectTool(tool.id);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-neutral-800 text-neutral-100'
                      : 'text-neutral-300 hover:bg-neutral-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm ${
                        isSelected
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-neutral-800 border border-neutral-700/60 text-neutral-400'
                      }`}
                    >
                      {tool.icon || <Sparkles className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium flex items-center gap-2">
                        {tool.title}
                        <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                          {tool.category}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-400 line-clamp-1">
                        {tool.description}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-mono">
                      <span>Jump</span>
                      <CornerDownLeft className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 border-t border-neutral-800 text-[11px] text-neutral-500 flex items-center justify-between bg-neutral-950/50">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>{filtered.length} {filtered.length === 1 ? 'tool' : 'tools'}</span>
        </div>
      </div>
    </div>
  );
};
