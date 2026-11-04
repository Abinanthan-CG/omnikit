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
  ShieldCheck,
  LayoutGrid,
  List,
  Sparkles,
  Zap,
  ArrowRight,
  ChevronRight,
  ClipboardPaste
} from 'lucide-react';
import type { ToolDefinition, ToolCategory } from '../types/tool';
import { ToolIcon } from './ToolIcon';
import { CATEGORY_THEMES } from '../utils/categoryTheme';
import { playTactileClick } from '../utils/sound';
import { detectSnippet, type DetectedData } from '../engines/smartDetector';

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

const CATEGORY_ORDER: ToolCategory[] = ['dev', 'design', 'writing', 'video', 'audio'];

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
  const [scratchpadInput, setScratchpadInput] = useState('');

  // Live auto-detection of pasted snippets (DevUtils signature feature)
  const detectedSnippet: DetectedData | null = useMemo(() => {
    return detectSnippet(scratchpadInput);
  }, [scratchpadInput]);

  // Sort tools to prioritize Developer & Design first
  const sortedTools = useMemo(() => {
    return [...tools].sort((a, b) => {
      const aCatIdx = CATEGORY_ORDER.indexOf(a.category);
      const bCatIdx = CATEGORY_ORDER.indexOf(b.category);
      const diff = (aCatIdx === -1 ? 99 : aCatIdx) - (bCatIdx === -1 ? 99 : bCatIdx);
      if (diff !== 0) return diff;
      return a.title.localeCompare(b.title);
    });
  }, [tools]);

  // Filtered tools
  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sortedTools.filter((t) => {
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
  }, [sortedTools, selectedDiscipline, query]);

  // Group tools by category for structured discipline sections
  const toolsByDiscipline = useMemo(() => {
    const groups: Record<ToolCategory, ToolDefinition[]> = {
      all: [],
      dev: [],
      design: [],
      writing: [],
      video: [],
      audio: [],
    };
    for (const tool of sortedTools) {
      if (groups[tool.category]) {
        groups[tool.category].push(tool);
      }
    }
    return groups;
  }, [sortedTools]);

  const pinnedTools = useMemo(() => {
    return pinnedIds
      .map((id) => tools.find((t) => t.id === id))
      .filter((t): t is ToolDefinition => Boolean(t));
  }, [pinnedIds, tools]);

  const handleLaunch = (id: string) => {
    playTactileClick('click');
    onSelectTool(id);
  };

  const handleQuickExample = (exampleText: string) => {
    playTactileClick('pop');
    setScratchpadInput(exampleText);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 md:pb-12 text-neutral-100">
      {/* Studio Workstation Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-b from-neutral-900/80 via-neutral-900/40 to-neutral-950 border border-neutral-800/80 p-5 sm:p-7 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Subtle luminous ambient horizon line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-300">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>155 Offline In-Browser Utilities</span>
              <span className="text-emerald-500/60">·</span>
              <span className="text-neutral-400">Zero Telemetry</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <span>Developer & Creative Workbench</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
              High-performance client-side studio for software engineers, visual designers, audio producers, and video editors.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0 font-mono text-xs">
            <button
              onClick={onRandomTool}
              title="Surprise utility (Shuffle)"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 active:bg-neutral-800 border border-neutral-750 text-neutral-300 hover:text-white transition-all shadow-sm"
            >
              <Shuffle className="w-3.5 h-3.5 text-purple-400" />
              <span>Shuffle</span>
            </button>
            <button
              onClick={onOpenPalette}
              title="Open Command Palette (Ctrl+K)"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 active:bg-neutral-800 border border-neutral-750 text-neutral-300 hover:text-white transition-all shadow-sm"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Search</span>
              <kbd className="text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-700">
                Ctrl+K
              </kbd>
            </button>
          </div>
        </div>

        {/* DevUtils Signature: Smart Scratchpad & Auto-Inspector */}
        <div className="mt-5 pt-5 border-t border-neutral-800/80 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium text-neutral-200">Smart Clipboard Auto-Detector</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-neutral-500">
              <span>Try example:</span>
              <button
                onClick={() => handleQuickExample('{"service":"omnikit","status":"ok","ports":[80,443]}')}
                className="hover:text-emerald-400 hover:underline"
              >
                JSON
              </button>
              <span>·</span>
              <button
                onClick={() => handleQuickExample('#6366f1')}
                className="hover:text-purple-400 hover:underline"
              >
                #Color
              </button>
              <span>·</span>
              <button
                onClick={() => handleQuickExample('1730689945')}
                className="hover:text-cyan-400 hover:underline"
              >
                Timestamp
              </button>
              <span>·</span>
              <button
                onClick={() => handleQuickExample('https://api.github.com/repos/omnikit?branch=main&limit=50')}
                className="hover:text-amber-400 hover:underline"
              >
                URL
              </button>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={scratchpadInput}
              onChange={(e) => setScratchpadInput(e.target.value)}
              placeholder="Paste JSON, Unix epoch, Base64, Hex color, JWT, URL, IP, or SQL to auto-detect & launch..."
              className="w-full pl-9 pr-24 py-2.5 rounded-xl bg-neutral-950/90 border border-neutral-800 text-xs font-mono text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all shadow-inner"
            />
            <ClipboardPaste className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            {scratchpadInput && (
              <button
                onClick={() => setScratchpadInput('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-500 hover:text-neutral-300 px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800"
              >
                Clear
              </button>
            )}
          </div>

          {/* Live Auto-Detection Result Strip */}
          {detectedSnippet && (
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-emerald-300 font-mono text-xs">
                  {detectedSnippet.label}
                </span>
                <span className="text-neutral-400 text-xs font-mono">
                  ({detectedSnippet.detail})
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono text-neutral-400 mr-1 hidden sm:inline">
                  Launch:
                </span>
                {detectedSnippet.suggestedTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleLaunch(tool.id)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500 text-neutral-950 font-medium text-[11px] font-mono hover:bg-emerald-400 active:scale-95 transition-all shadow-sm flex items-center gap-1"
                  >
                    <span>{tool.title}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Daily Drivers Quick-Launch Shelf */}
      {pinnedTools.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-neutral-200 font-medium">Daily Drivers & Favorites</span>
              <span className="text-[10px] text-neutral-500">({pinnedTools.length})</span>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono hidden sm:inline">1-Click Launch</span>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2.5">
            {pinnedTools.map((tool, idx) => {
              const theme = CATEGORY_THEMES[tool.category] || CATEGORY_THEMES.all;
              return (
                <div
                  key={tool.id}
                  onClick={() => handleLaunch(tool.id)}
                  className={`flex items-center justify-between p-3 rounded-xl bg-neutral-900/70 border border-neutral-800/80 hover:bg-neutral-850/90 active:bg-neutral-800 active:scale-[0.99] cursor-pointer transition-all group shadow-sm ${theme.cardGlow}`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all ${theme.bgSubtle} ${theme.borderAccent}`}
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

                  <div className="flex items-center gap-1.5 shrink-0 ml-1">
                    <span className="hidden sm:inline-block font-mono text-[9px] text-neutral-600 group-hover:text-neutral-400 px-1 rounded bg-neutral-950/60 border border-neutral-800">
                      ⌘{idx + 1}
                    </span>
                    <button
                      onClick={(e) => onTogglePin(tool.id, e)}
                      title="Unpin utility"
                      className="p-1 text-neutral-500 hover:text-amber-400 rounded transition-colors"
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Raycast-style Universal Command Bar & Filters */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Filter all ${tools.length} utilities by keyword, format, or tag... (press /)`}
              className="w-full pl-9 pr-10 py-2.5 bg-neutral-900/90 border border-neutral-750 focus:border-neutral-600 rounded-xl text-xs sm:text-sm font-sans text-neutral-100 placeholder-neutral-500 focus:outline-none shadow-md transition-all"
            />
            {query ? (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 text-xs font-mono"
              >
                ✕
              </button>
            ) : (
              <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] bg-neutral-800 text-neutral-500 px-1 py-0.2 rounded border border-neutral-700">
                /
              </kbd>
            )}
          </div>

          <div className="flex items-center p-1 rounded-xl bg-neutral-900 border border-neutral-800 shrink-0 self-end sm:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-neutral-800 text-neutral-100 shadow-sm' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              title="Compact List View"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'compact' ? 'bg-neutral-800 text-neutral-100 shadow-sm' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Discipline Segmented Controls (macOS / Raycast style) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono scrollbar-none touch-pan-x p-1 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
          <button
            onClick={() => {
              playTactileClick('toggle');
              setSelectedDiscipline('all');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all font-medium whitespace-nowrap min-h-[34px] flex items-center gap-1.5 ${
              selectedDiscipline === 'all'
                ? 'bg-neutral-800 text-white font-semibold shadow-sm border border-neutral-700/60'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850/50'
            }`}
          >
            <span>All Crafts</span>
            <span className="text-[10px] opacity-70">({tools.length})</span>
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedDiscipline === cat.id;
            const count = toolsByDiscipline[cat.id]?.length || 0;
            const theme = CATEGORY_THEMES[cat.id];
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playTactileClick('toggle');
                  setSelectedDiscipline(cat.id);
                }}
                className={`px-2.5 py-1.5 rounded-lg transition-all font-medium inline-flex items-center gap-1.5 whitespace-nowrap min-h-[34px] ${
                  isSelected
                    ? `${theme.activePillClass} border border-neutral-700/60`
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-70 font-mono">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Catalog View: Either Grouped Disciplines OR Filtered Results */}
      {query || selectedDiscipline !== 'all' ? (
        /* Filtered Search / Single Discipline Results */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>Showing {filteredTools.length} utilities</span>
            <span className="hidden sm:inline">Click any tool to launch directly in workspace</span>
          </div>

          {filteredTools.length === 0 ? (
            <div className="py-16 text-center space-y-2 border border-dashed border-neutral-800 rounded-2xl">
              <p className="text-xs font-mono text-neutral-400">No utilities found matching "{query}".</p>
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedDiscipline('all');
                }}
                className="text-xs font-mono text-emerald-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTools.map((tool) => renderToolCard(tool))}
            </div>
          ) : (
            renderCompactList(filteredTools)
          )}
        </div>
      ) : (
        /* Curated Multi-Discipline Studio View (Organized by Craft) */
        <div className="space-y-8">
          {CATEGORIES.map((cat) => {
            const groupTools = toolsByDiscipline[cat.id] || [];
            if (groupTools.length === 0) return null;
            const theme = CATEGORY_THEMES[cat.id];
            const Icon = cat.icon;

            return (
              <div key={cat.id} className="space-y-3.5">
                <div className="flex items-center justify-between pb-1 border-b border-neutral-850">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center border ${theme.bgSubtle} ${theme.borderAccent}`}>
                      <Icon className={`w-3.5 h-3.5 ${theme.textAccent}`} />
                    </div>
                    <h2 className="text-sm font-semibold text-neutral-200 tracking-tight">
                      {cat.label}
                    </h2>
                    <span className="text-[10px] font-mono text-neutral-500">
                      ({groupTools.length})
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      playTactileClick('toggle');
                      setSelectedDiscipline(cat.id);
                    }}
                    className="text-[11px] font-mono text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                  >
                    <span>View all {groupTools.length}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {groupTools.slice(0, 6).map((tool) => renderToolCard(tool))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Professional Footer Strip */}
      <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-500">
        <div className="flex items-center gap-2 text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>100% Client-Side Engine · Zero Network Calls · Zero Telemetry</span>
        </div>
        <div className="flex items-center gap-4">
          <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">Ctrl+B</kbd> Sidebar</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">Ctrl+K</kbd> Palette</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">Esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );

  function renderToolCard(tool: ToolDefinition) {
    const theme = CATEGORY_THEMES[tool.category] || CATEGORY_THEMES.all;
    const isPinned = pinnedIds.includes(tool.id);

    return (
      <div
        key={tool.id}
        onClick={() => handleLaunch(tool.id)}
        className={`p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-850/80 active:bg-neutral-800 active:scale-[0.99] cursor-pointer transition-all flex flex-col justify-between group shadow-sm ${theme.cardGlow}`}
      >
        <div>
          <div className="flex items-center justify-between mb-2">
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

        <div className="mt-3 pt-2 border-t border-neutral-800/50 flex items-center justify-between text-[11px] font-mono text-neutral-500 group-hover:text-neutral-300 transition-colors">
          <span className="capitalize">{theme.label}</span>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-200 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    );
  }

  function renderCompactList(toolList: ToolDefinition[]) {
    return (
      <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/40 divide-y divide-neutral-850 overflow-hidden">
        {toolList.map((tool) => {
          const theme = CATEGORY_THEMES[tool.category] || CATEGORY_THEMES.all;
          const isPinned = pinnedIds.includes(tool.id);

          return (
            <div
              key={tool.id}
              onClick={() => handleLaunch(tool.id)}
              className="flex items-center justify-between p-2.5 hover:bg-neutral-850/80 active:bg-neutral-800 cursor-pointer transition-colors group"
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
    );
  }
};
