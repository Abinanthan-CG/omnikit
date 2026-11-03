import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CommandPalette } from './components/CommandPalette';
import { CategoryPills } from './components/CategoryPills';
import { getTools, getToolById } from './registry/registry';
import { initializeTools } from './registry/registerAllTools';
import { getToolFromHash, createHashForTool } from './utils/routing';
import type { ToolCategory } from './types/tool';
import { ArrowRight, Clock, Terminal, Sparkles } from 'lucide-react';

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
      return stored ? JSON.parse(stored) : ['timecode', 'contrast', 'bpm-delay'];
    } catch {
      return ['timecode', 'contrast', 'bpm-delay'];
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
      const updated = [id, ...prev.filter((item) => item !== id)].slice(0, 5);
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
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-neutral-950">
      <Header
        onOpenPalette={() => setIsPaletteOpen(true)}
        activeToolTitle={activeTool?.title}
        onClearActiveTool={handleClearActiveTool}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {ActiveComponent ? (
          <div>
            <div className="mb-4">
              <button
                onClick={handleClearActiveTool}
                className="text-xs text-neutral-400 hover:text-neutral-200 flex items-center gap-1.5 transition-colors"
              >
                ← Back to all utilities
              </button>
            </div>
            <ActiveComponent />
          </div>
        ) : (
          <div className="space-y-10">
            {/* Hero Banner */}
            <div className="text-center max-w-2xl mx-auto pt-6 pb-2 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Privacy-First Multi-Discipline Workbench</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-100">
                Small tools, built right.
              </h1>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                Single-purpose utilities for video editors, sound designers, visual artists, copywriters, and developers. Zero ads, zero tracking, 100% in-browser computation.
              </p>

              {/* Big Command Bar Trigger */}
              <div className="pt-2 max-w-lg mx-auto">
                <button
                  onClick={() => setIsPaletteOpen(true)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 rounded-xl text-neutral-400 hover:text-neutral-200 transition-all shadow-lg group"
                >
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">What do you want to calculate or convert?</span>
                  </div>
                  <kbd className="font-mono text-xs bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded border border-neutral-700">
                    Ctrl + K
                  </kbd>
                </button>
              </div>
            </div>

            {/* Recently Used Tools */}
            {recentToolIds.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Recently Used</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {recentToolIds.map((id) => {
                    const tool = getToolById(id);
                    if (!tool) return null;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => handleSelectTool(tool.id)}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-800/60 transition-all text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{tool.icon}</span>
                          <div>
                            <div className="text-sm font-semibold text-neutral-200 group-hover:text-emerald-400 transition-colors">
                              {tool.title}
                            </div>
                            <div className="text-[11px] text-neutral-500 capitalize">
                              {tool.category}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Category Filter Pills & Tools Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <CategoryPills
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  counts={categoryCounts}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => handleSelectTool(tool.id)}
                    className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/90 transition-all cursor-pointer flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl">{tool.icon}</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-neutral-950 text-neutral-400 border border-neutral-800">
                          {tool.category}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed line-clamp-2">
                        {tool.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-500 font-mono">
                      <span>Launch</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500 mt-12 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-400">Omnikit</span>
            <span>•</span>
            <span>Zero telemetry. All computations run 100% locally.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-500">
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
