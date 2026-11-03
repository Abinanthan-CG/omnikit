import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CommandPalette } from './components/CommandPalette';
import { CategoryPills } from './components/CategoryPills';
import { ToolIcon } from './components/ToolIcon';
import { getTools, getToolById } from './registry/registry';
import { initializeTools } from './registry/registerAllTools';
import { getToolFromHash, createHashForTool } from './utils/routing';
import type { ToolCategory } from './types/tool';
import { ArrowRight, Clock, Search, ArrowLeft } from 'lucide-react';

// Initialize the tool registry once
initializeTools();

export default function App() {
  const [activeToolId, setActiveToolId] = useState<string | null>(() => {
    return getToolFromHash(window.location.hash);
  });
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [recentToolIds, setRecentToolIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('omnikit_recents');
      return stored ? JSON.parse(stored) : ['json-tools', 'contrast', 'timecode'];
    } catch {
      return ['json-tools', 'contrast', 'timecode'];
    }
  });

  const allTools = getTools();

  // Listen for hash change in browser URL
  useEffect(() => {
    const handleHashChange = () => {
      const id = getToolFromHash(window.location.hash);
      setActiveToolId(id);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when active tool changes
  const handleSelectTool = (id: string) => {
    setActiveToolId(id);
    window.location.hash = createHashForTool(id);

    // Update recents
    setRecentToolIds((prev) => {
      const updated = [id, ...prev.filter((item) => item !== id)].slice(0, 4);
      try {
        localStorage.setItem('omnikit_recents', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleClearActiveTool = () => {
    setActiveToolId(null);
    window.location.hash = '';
  };

  // Keyboard shortcut listener for '/' and 'Ctrl+K'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      } else if (e.key === '/' && !isPaletteOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaletteOpen]);

  // Compute category counts
  const categoryCounts: Record<ToolCategory, number> = {
    all: allTools.length,
    video: allTools.filter((t) => t.category === 'video').length,
    audio: allTools.filter((t) => t.category === 'audio').length,
    design: allTools.filter((t) => t.category === 'design').length,
    writing: allTools.filter((t) => t.category === 'writing').length,
    dev: allTools.filter((t) => t.category === 'dev').length,
  };

  // Filter tools for grid display
  const displayedTools = allTools.filter((t) => {
    if (selectedCategory === 'all') return true;
    return t.category === selectedCategory;
  });

  const activeTool = activeToolId ? getToolById(activeToolId) : null;
  const ActiveComponent = activeTool?.component;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-neutral-100">
      <Header
        onOpenPalette={() => setIsPaletteOpen(true)}
        activeToolTitle={activeTool?.title}
        onClearActiveTool={handleClearActiveTool}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        {ActiveComponent ? (
          <div>
            <div className="mb-4">
              <button
                onClick={handleClearActiveTool}
                className="text-xs text-neutral-400 hover:text-neutral-200 flex items-center gap-1.5 transition-colors font-mono"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to utilities</span>
              </button>
            </div>
            <ActiveComponent />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Hero Banner */}
            <div className="text-center max-w-2xl mx-auto pt-4 pb-2 space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                <span>125 utilities · 100% client-side · zero telemetry</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-100">
                Everyday developer & media utilities.
              </h1>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-lg mx-auto">
                Fast, single-purpose tools for code, text, visual design, audio, and video. Everything runs locally in your browser sandbox.
              </p>

              {/* Command Bar Trigger */}
              <div className="pt-2 max-w-lg mx-auto">
                <button
                  onClick={() => setIsPaletteOpen(true)}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 rounded-xl text-neutral-400 hover:text-neutral-200 transition-all shadow-sm group"
                >
                  <div className="flex items-center gap-2.5">
                    <Search className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
                    <span className="text-xs sm:text-sm">Search 125 utilities by name or keyword...</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="font-mono text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-700">
                      /
                    </kbd>
                    <kbd className="hidden sm:inline-block font-mono text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-700">
                      Ctrl+K
                    </kbd>
                  </div>
                </button>
              </div>
            </div>

            {/* Recently Used Tools */}
            {recentToolIds.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Recent</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {recentToolIds.map((id) => {
                    const tool = getToolById(id);
                    if (!tool) return null;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => handleSelectTool(tool.id)}
                        className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 transition-all text-left group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-neutral-800 border border-neutral-700/60 flex items-center justify-center text-neutral-400 group-hover:text-emerald-400 transition-colors shrink-0">
                            <ToolIcon toolId={tool.id} category={tool.category} className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 truncate">
                            <div className="text-xs font-medium text-neutral-200 group-hover:text-neutral-100 truncate">
                              {tool.title}
                            </div>
                            <div className="text-[10px] text-neutral-500 font-mono capitalize">
                              {tool.category}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Category Filter Pills & Tools Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                <CategoryPills
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  counts={categoryCounts}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {displayedTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => handleSelectTool(tool.id)}
                    className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/90 transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 rounded-lg bg-neutral-800/60 border border-neutral-750 flex items-center justify-center text-neutral-300 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                          <ToolIcon toolId={tool.id} category={tool.category} className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-neutral-800">
                          {tool.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-neutral-200 group-hover:text-neutral-100 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed line-clamp-2">
                        {tool.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-neutral-850 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                      <span className="group-hover:text-neutral-300 transition-colors">Open</span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-5 text-center text-xs text-neutral-500 mt-12 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-neutral-400 font-mono text-[11px]">
            <span className="font-semibold text-neutral-300">Omnikit</span>
            <span>•</span>
            <span>Local execution only. Zero data collection.</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-500">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">Ctrl+K</kbd> to search</span>
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">/</kbd> to quick-open</span>
          </div>
        </div>
      </footer>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        tools={allTools}
        onSelectTool={handleSelectTool}
      />
    </div>
  );
}
