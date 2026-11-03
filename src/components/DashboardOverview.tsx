import React, { useState, useMemo } from 'react';
import {
  Search,
  Star,
  Shuffle,
  Terminal,
  Code2,
  Palette,
  FileText,
  Film,
  Volume2,
  ArrowRight,
  ShieldCheck,
  LayoutGrid,
  List
} from 'lucide-react';
import type { ToolDefinition, ToolCategory } from '../types/tool';
import { ToolIcon } from './ToolIcon';
import { CATEGORY_THEMES } from '../utils/categoryTheme';
import { playTactileClick } from '../utils/sound';

interface DashboardOverviewProps {
  tools: ToolDefinition[];
  onSelectTool: (id: string) => void;
  pinnedIds: string[];
  onTogglePin: (id: string, e?: React.MouseEvent) => void;
  onRandomTool: () => void;
  onOpenPalette: () => void;
}

const CATEGORIES: { id: ToolCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dev', label: 'Developer & Data', icon: Code2 },
  { id: 'design', label: 'Design & UI', icon: Palette },
  { id: 'writing', label: 'Text & Copy', icon: FileText },
  { id: 'video', label: 'Video & Film', icon: Film },
  { id: 'audio', label: 'Audio & Sound', icon: Volume2 },
];

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  tools,
  onSelectTool,
  pinnedIds,
  onTogglePin,
  onRandomTool,
  onOpenPalette,
}) => {
  const [query, setQuery] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<ToolCategory>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((t) => {
      if (selectedDiscipline !== 'all' && t.category !== selectedDiscipline) {
        return false;
      }
      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(q))) ||
        (t.keywords && t.keywords.some((kw) => kw.toLowerCase().includes(q)))
      );
    });
  }, [tools, selectedDiscipline, query]);

  const pinnedTools = useMemo(() => {
    return pinnedIds
      .map((id) => tools.find((t) => t.id === id))
      .filter((t): t is ToolDefinition => Boolean(t));
  }, [pinnedIds, tools]);

  const handleLaunch = (id: string) => {
    playTactileClick('click');
    onSelectTool(id);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Raycast-style Universal Command Bar */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 125 utilities by keyword, format, or tag..."
            className="w-full pl-12 pr-28 py-3.5 bg-neutral-900/90 border border-neutral-750 focus:border-neutral-600 rounded-2xl text-sm font-sans text-neutral-100 placeholder-neutral-500 focus:outline-none shadow-xl transition-all"
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <button
              onClick={onRandomTool}
              title="Surprise utility (Shuffle)"
              className="p-1.5 text-neutral-400 hover:text-neutral-200 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenPalette}
              title="Command Palette (Ctrl+K)"
              className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-neutral-800 border border-neutral-700 text-[10px] font-mono text-neutral-400 hover:text-neutral-200"
            >
              <Terminal className="w-3 h-3" />
              <span>Ctrl+K</span>
            </button>
          </div>
        </div>

        {/* Discipline Selector Ribbon */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                playTactileClick('toggle');
                setSelectedDiscipline('all');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                selectedDiscipline === 'all'
                  ? 'bg-neutral-100 text-neutral-900 font-bold'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850'
              }`}
            >
              All (125)
            </button>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedDiscipline === cat.id;
              const count = tools.filter((t) => t.category === cat.id).length;
              const theme = CATEGORY_THEMES[cat.id];
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playTactileClick('toggle');
                    setSelectedDiscipline(cat.id);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg transition-all font-medium inline-flex items-center gap-1.5 ${
                    isSelected
                      ? theme.activePillClass
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="text-[10px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center p-0.5 rounded-lg bg-neutral-900 border border-neutral-800 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-500'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'compact' ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-500'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Pinned Daily Drivers Shelf (If no search query) */}
      {pinnedTools.length > 0 && !query && selectedDiscipline === 'all' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Daily Drivers</span>
              <span className="text-[10px] text-neutral-500">({pinnedTools.length})</span>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">Quick Launch</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {pinnedTools.map((tool) => {
              const theme = CATEGORY_THEMES[tool.category] || CATEGORY_THEMES.all;
              return (
                <div
                  key={tool.id}
                  onClick={() => handleLaunch(tool.id)}
                  className={`flex items-center justify-between p-3 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:bg-neutral-850 cursor-pointer transition-all group ${theme.cardGlow}`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${theme.bgSubtle} ${theme.borderAccent}`}
                    >
                      <ToolIcon toolId={tool.id} category={tool.category} className={`w-4 h-4 ${theme.textAccent}`} />
                    </div>
                    <div className="min-w-0 truncate">
                      <div className="text-xs font-medium text-neutral-200 group-hover:text-neutral-100 truncate">
                        {tool.title}
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono capitalize">
                        {theme.shortLabel}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => onTogglePin(tool.id, e)}
                    title="Unpin utility"
                    className="p-1 text-neutral-500 hover:text-amber-400 rounded transition-colors shrink-0 ml-1"
                  >
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Tools Catalog */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
          <span>Showing {filteredTools.length} utilities</span>
          <span className="hidden sm:inline">Click any tool to launch directly in workspace</span>
        </div>

        {filteredTools.length === 0 ? (
          <div className="py-16 text-center space-y-2 border border-dashed border-neutral-800 rounded-2xl">
            <p className="text-xs font-mono text-neutral-400">No utilities found for "{query}".</p>
            <button
              onClick={() => {
                setQuery('');
                setSelectedDiscipline('all');
              }}
              className="text-xs font-mono text-emerald-400 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTools.map((tool) => {
              const theme = CATEGORY_THEMES[tool.category] || CATEGORY_THEMES.all;
              const isPinned = pinnedIds.includes(tool.id);

              return (
                <div
                  key={tool.id}
                  onClick={() => handleLaunch(tool.id)}
                  className={`p-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:bg-neutral-850/80 cursor-pointer transition-all flex flex-col justify-between group ${theme.cardGlow}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${theme.bgSubtle} ${theme.borderAccent}`}
                      >
                        <ToolIcon toolId={tool.id} category={tool.category} className={`w-4 h-4 ${theme.textAccent}`} />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] uppercase font-mono px-1.5 py-0.2 rounded border ${theme.badgeClass}`}>
                          {theme.shortLabel}
                        </span>
                        <button
                          onClick={(e) => onTogglePin(tool.id, e)}
                          title={isPinned ? 'Unpin' : 'Pin to daily drivers'}
                          className="p-1 rounded text-neutral-500 hover:text-amber-400 transition-colors"
                        >
                          <Star className={`w-3.5 h-3.5 ${isPinned ? 'fill-amber-400 text-amber-400' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-xs sm:text-sm font-semibold text-neutral-200 group-hover:text-neutral-100 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed line-clamp-2">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                    <span className="group-hover:text-neutral-300 transition-colors">Launch</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* High-Density Compact List View */
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/40 divide-y divide-neutral-850 overflow-hidden">
            {filteredTools.map((tool) => {
              const theme = CATEGORY_THEMES[tool.category] || CATEGORY_THEMES.all;
              const isPinned = pinnedIds.includes(tool.id);

              return (
                <div
                  key={tool.id}
                  onClick={() => handleLaunch(tool.id)}
                  className="flex items-center justify-between p-2.5 hover:bg-neutral-850/80 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${theme.bgSubtle} ${theme.borderAccent}`}
                    >
                      <ToolIcon toolId={tool.id} category={tool.category} className={`w-3.5 h-3.5 ${theme.textAccent}`} />
                    </div>

                    <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-center sm:gap-3">
                      <span className="text-xs sm:text-sm font-medium text-neutral-200 group-hover:text-neutral-100 shrink-0">
                        {tool.title}
                      </span>
                      <span className="text-xs text-neutral-500 truncate max-w-md hidden sm:inline">
                        {tool.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className={`text-[9px] uppercase font-mono px-1.5 py-0.2 rounded border ${theme.badgeClass}`}>
                      {theme.shortLabel}
                    </span>
                    <button
                      onClick={(e) => onTogglePin(tool.id, e)}
                      className="p-1 rounded text-neutral-500 hover:text-amber-400 transition-colors"
                    >
                      <Star className={`w-3.5 h-3.5 ${isPinned ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts & Architecture Footer Strip */}
      <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-500">
        <div className="flex items-center gap-2 text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>100% Client-Side Offline Execution · Zero Telemetry</span>
        </div>
        <div className="flex items-center gap-4">
          <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">Ctrl+B</kbd> Toggle sidebar</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">Ctrl+K</kbd> Command palette</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">Esc</kbd> Close tool</span>
        </div>
      </div>
    </div>
  );
};
