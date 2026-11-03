import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { CommandPalette } from './components/CommandPalette';
import { CategoryPills } from './components/CategoryPills';
import { ToolIcon } from './components/ToolIcon';
import { getTools, getToolById } from './registry/registry';
import { initializeTools } from './registry/registerAllTools';
import { getToolFromHash, createHashForTool } from './utils/routing';
import type { ToolCategory } from './types/tool';
import { CATEGORY_THEMES } from './utils/categoryTheme';
import { playTactileClick } from './utils/sound';
import {
  ArrowRight,
  Clock,
  Search,
  Star,
  LayoutGrid,
  List,
  X,
  Shuffle,
  ShieldCheck,
  Terminal,
  Zap
} from 'lucide-react';

// Initialize the tool registry once
initializeTools();

export default function App() {
  const [activeToolId, setActiveToolId] = useState<string | null>(() => {
    return getToolFromHash(window.location.hash);
  });
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>(() => {
    try {
      return (localStorage.getItem('omnikit_view_mode') as 'grid' | 'compact') || 'grid';
    } catch {
      return 'grid';
    }
  });

  const [pinnedIds, setPinnedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('omnikit_pinned');
      return stored ? JSON.parse(stored) : ['json-tools', 'contrast', 'timecode', 'base64'];
    } catch {
      return ['json-tools', 'contrast', 'timecode', 'base64'];
    }
  });

  const [recentToolIds, setRecentToolIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('omnikit_recents');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const allTools = useMemo(() => getTools(), []);

  // Listen for hash change in browser URL
  useEffect(() => {
    const handleHashChange = () => {
      const id = getToolFromHash(window.location.hash);
      setActiveToolId(id);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Select tool
  const handleSelectTool = (id: string) => {
    playTactileClick('click');
    setActiveToolId(id);
    window.location.hash = createHashForTool(id);

    // Update recents
    setRecentToolIds((prev) => {
      const updated = [id, ...prev.filter((item) => item !== id)].slice(0, 6);
      try {
        localStorage.setItem('omnikit_recents', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleClearActiveTool = () => {
    playTactileClick('click');
    setActiveToolId(null);
    window.location.hash = '';
  };

  // Toggle favorite / pin
  const handleTogglePin = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPinnedIds((prev) => {
      let updated: string[];
      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
        playTactileClick('toggle');
      } else {
        updated = [...prev, id];
        playTactileClick('pin');
      }
      try {
        localStorage.setItem('omnikit_pinned', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Switch view mode
  const handleSetViewMode = (mode: 'grid' | 'compact') => {
    playTactileClick('toggle');
    setViewMode(mode);
    try {
      localStorage.setItem('omnikit_view_mode', mode);
    } catch {
      // ignore
    }
  };

  // Pick a random tool
  const handleRandomTool = () => {
    if (allTools.length === 0) return;
    const randomIndex = Math.floor(Math.random() * allTools.length);
    const chosen = allTools[randomIndex];
    if (chosen) {
      handleSelectTool(chosen.id);
    }
  };

  // Keyboard shortcut listener for '/' and 'Ctrl+K'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      } else if (e.key === 'Escape' && activeToolId) {
        e.preventDefault();
        handleClearActiveTool();
      } else if (
        e.key === '/' &&
        !isPaletteOpen &&
        !activeToolId &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        const searchInput = document.getElementById('main-search-input');
        searchInput?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaletteOpen, activeToolId]);

  // Compute category counts
  const categoryCounts: Record<ToolCategory, number> = useMemo(() => {
    return {
      all: allTools.length,
      video: allTools.filter((t) => t.category === 'video').length,
      audio: allTools.filter((t) => t.category === 'audio').length,
      design: allTools.filter((t) => t.category === 'design').length,
      writing: allTools.filter((t) => t.category === 'writing').length,
      dev: allTools.filter((t) => t.category === 'dev').length,
    };
  }, [allTools]);

  // Filter tools based on category and search query
  const displayedTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allTools.filter((t) => {
      if (selectedCategory !== 'all' && t.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(q))) ||
        (t.keywords && t.keywords.some((kw) => kw.toLowerCase().includes(q)))
      );
    });
  }, [allTools, selectedCategory, searchQuery]);

  const activeTool = activeToolId ? getToolById(activeToolId) : null;
  const ActiveComponent = activeTool?.component;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200 workbench-canvas relative">
      {/* Ambient Horizon Glow */}
      <div className="absolute top-0 inset-x-0 h-96 ambient-glow pointer-events-none" />

      {/* Main Header */}
      <Header
        onOpenPalette={() => setIsPaletteOpen(true)}
        activeToolTitle={activeTool?.title}
        activeToolCategory={activeTool?.category}
        onClearActiveTool={handleClearActiveTool}
        onRandomTool={handleRandomTool}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:py-8 relative z-10">
        {ActiveComponent ? (
          <div>
            <ActiveComponent />
          </div>
        ) : (
          <div className="space-y-10">
            {/* Hero / Studio Headline */}
            <div className="text-center max-w-2xl mx-auto pt-2 space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-neutral-300 bg-neutral-900/90 border border-neutral-750 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span>125 In-Browser Utilities · 100% Client-Side · Zero Telemetry</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-100">
                The Multi-Discipline Workbench.
              </h1>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl mx-auto">
                Single-purpose instruments for code, visual design, audio acoustics, typography, and cinema. No accounts, no cloud dependencies, everything executes inside your browser sandbox.
              </p>

              {/* Integrated Search Bar with View Mode Controls */}
              <div className="pt-3 max-w-xl mx-auto flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="main-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 125 utilities by keyword or tag (press / to focus)..."
                    className="w-full pl-10 pr-10 py-2.5 bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 focus:border-neutral-600 rounded-xl text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none transition-all shadow-inner"
                  />
                  {searchQuery ? (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-500 hover:text-neutral-300"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-700">
                      /
                    </kbd>
                  )}
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center p-1 rounded-xl bg-neutral-900 border border-neutral-800">
                  <button
                    onClick={() => handleSetViewMode('grid')}
                    title="Grid card view"
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleSetViewMode('compact')}
                    title="Compact list view"
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'compact'
                        ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Random Utility Button */}
                <button
                  onClick={handleRandomTool}
                  title="Surprise me with a random utility"
                  className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 transition-colors shrink-0"
                >
                  <Shuffle className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Pinned Utilities Tray (Customizable Daily Drivers) */}
            {pinnedIds.length > 0 && !searchQuery && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>Pinned Utilities</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-900 border border-neutral-800 text-neutral-500">
                      {pinnedIds.length}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {pinnedIds.map((id) => {
                    const tool = getToolById(id);
                    if (!tool) return null;
                    const theme = CATEGORY_THEMES[tool.category] || CATEGORY_THEMES.all;
                    return (
                      <div
                        key={tool.id}
                        onClick={() => handleSelectTool(tool.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:bg-neutral-850 cursor-pointer transition-all group ${theme.cardGlow}`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${theme.bgSubtle} ${theme.borderAccent}`}
                          >
                            <ToolIcon toolId={tool.id} category={tool.category} className={`w-3.5 h-3.5 ${theme.textAccent}`} />
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
                          onClick={(e) => handleTogglePin(tool.id, e)}
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

            {/* Recently Used Tools (If not empty and no active search) */}
            {recentToolIds.length > 0 && !searchQuery && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Recently Used</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {recentToolIds.map((id) => {
                    const tool = getToolById(id);
                    if (!tool) return null;
                    const theme = CATEGORY_THEMES[tool.category] || CATEGORY_THEMES.all;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => handleSelectTool(tool.id)}
                        className="flex items-center gap-2 p-2 rounded-lg bg-neutral-900/40 border border-neutral-800/60 hover:border-neutral-700 hover:bg-neutral-850 transition-all text-left group min-w-0"
                      >
                        <ToolIcon toolId={tool.id} category={tool.category} className={`w-3.5 h-3.5 shrink-0 ${theme.textAccent}`} />
                        <span className="text-xs text-neutral-300 group-hover:text-neutral-100 truncate">
                          {tool.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Category Filter Pills & Tools Catalog */}
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-900 pb-3">
                <CategoryPills
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  counts={categoryCounts}
                />

                <div className="text-xs font-mono text-neutral-500 shrink-0">
                  Showing {displayedTools.length} of {allTools.length} utilities
                </div>
              </div>

              {/* Tools Catalog - Grid or Compact List View */}
              {displayedTools.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <p className="text-sm text-neutral-400">
                    No utilities found matching "{searchQuery}".
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="text-xs font-mono text-emerald-400 hover:underline"
                  >
                    Reset search filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                /* Grid View (Cards with rich details & discipline rim glows) */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {displayedTools.map((tool) => {
                    const theme = CATEGORY_THEMES[tool.category] || CATEGORY_THEMES.all;
                    const isPinned = pinnedIds.includes(tool.id);

                    return (
                      <div
                        key={tool.id}
                        onClick={() => handleSelectTool(tool.id)}
                        className={`p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:bg-neutral-900/90 transition-all duration-150 cursor-pointer flex flex-col justify-between group ${theme.cardGlow}`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all ${theme.bgSubtle} ${theme.borderAccent}`}
                            >
                              <ToolIcon
                                toolId={tool.id}
                                category={tool.category}
                                className={`w-4 h-4 ${theme.textAccent}`}
                              />
                            </div>

                            <div className="flex items-center gap-1.5">
                              <span
                                className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${theme.badgeClass}`}
                              >
                                {theme.shortLabel}
                              </span>
                              <button
                                onClick={(e) => handleTogglePin(tool.id, e)}
                                title={isPinned ? 'Unpin' : 'Pin utility'}
                                className="p-1 rounded text-neutral-500 hover:text-amber-400 transition-colors"
                              >
                                <Star
                                  className={`w-3.5 h-3.5 transition-all ${
                                    isPinned ? 'fill-amber-400 text-amber-400' : 'hover:scale-110'
                                  }`}
                                />
                              </button>
                            </div>
                          </div>

                          <h3 className="text-sm font-semibold text-neutral-200 group-hover:text-neutral-100 transition-colors">
                            {tool.title}
                          </h3>
                          <p className="text-xs text-neutral-400 mt-1 leading-relaxed line-clamp-2">
                            {tool.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-2.5 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                          <span className="group-hover:text-neutral-300 transition-colors">
                            Launch utility
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Compact List View (High-density Raycast / Linear scan mode) */
                <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/40 divide-y divide-neutral-850 overflow-hidden">
                  {displayedTools.map((tool) => {
                    const theme = CATEGORY_THEMES[tool.category] || CATEGORY_THEMES.all;
                    const isPinned = pinnedIds.includes(tool.id);

                    return (
                      <div
                        key={tool.id}
                        onClick={() => handleSelectTool(tool.id)}
                        className="flex items-center justify-between p-3 hover:bg-neutral-850/80 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${theme.bgSubtle} ${theme.borderAccent}`}
                          >
                            <ToolIcon
                              toolId={tool.id}
                              category={tool.category}
                              className={`w-4 h-4 ${theme.textAccent}`}
                            />
                          </div>

                          <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                            <span className="text-xs sm:text-sm font-medium text-neutral-200 group-hover:text-neutral-100 shrink-0">
                              {tool.title}
                            </span>
                            <span className="text-xs text-neutral-400 truncate max-w-lg">
                              {tool.description}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 ml-3">
                          <span
                            className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded border hidden sm:inline-block ${theme.badgeClass}`}
                          >
                            {theme.shortLabel}
                          </span>
                          <button
                            onClick={(e) => handleTogglePin(tool.id, e)}
                            className="p-1 rounded text-neutral-500 hover:text-amber-400 transition-colors"
                          >
                            <Star
                              className={`w-3.5 h-3.5 ${
                                isPinned ? 'fill-amber-400 text-amber-400' : ''
                              }`}
                            />
                          </button>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Crafted Footer */}
      <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500 mt-16 bg-neutral-950/90 relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-neutral-400 font-mono text-[11px]">
            <span className="font-semibold text-neutral-200">Omnikit</span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Client-Side
            </span>
            <span>·</span>
            <span>Zero cookies or trackers</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3" />
              Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">Ctrl+K</kbd> to search
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3 h-3" />
              Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">/</kbd> to quick-filter
            </span>
          </div>
        </div>
      </footer>

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        tools={allTools}
        onSelectTool={handleSelectTool}
      />
    </div>
  );
}
