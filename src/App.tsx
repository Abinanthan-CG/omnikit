import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { CommandPalette } from './components/CommandPalette';
import { MobileNav } from './components/MobileNav';
import { getTools, getToolById } from './registry/registry';
import { initializeTools } from './registry/registerAllTools';
import { getToolFromHash, createHashForTool } from './utils/routing';
import { playTactileClick } from './utils/sound';

// Initialize the tool registry once
initializeTools();

export default function App() {
  const [activeToolId, setActiveToolId] = useState<string | null>(() => {
    return getToolFromHash(window.location.hash);
  });
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

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

  // Listen for hash changes in browser URL
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
    setActiveToolId(id);
    window.location.hash = createHashForTool(id);

    // Update recents
    setRecentToolIds((prev) => {
      const updated = [id, ...prev.filter((item) => item !== id)].slice(0, 8);
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

  // Toggle sidebar collapse
  const handleToggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('omnikit_sidebar_collapsed', next ? 'true' : 'false');
      } catch {
        // ignore
      }
      return next;
    });
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

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        handleToggleSidebarCollapse();
      } else if (e.key === 'Escape') {
        if (isPaletteOpen) {
          setIsPaletteOpen(false);
        } else if (activeToolId) {
          handleClearActiveTool();
        } else if (isMobileSidebarOpen) {
          setIsMobileSidebarOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaletteOpen, activeToolId, isMobileSidebarOpen]);

  const activeTool = activeToolId ? getToolById(activeToolId) : null;
  const ActiveComponent = activeTool?.component;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Universal Top Header */}
      <Header
        onOpenPalette={() => setIsPaletteOpen(true)}
        activeToolTitle={activeTool?.title}
        activeToolCategory={activeTool?.category}
        onClearActiveTool={handleClearActiveTool}
        onRandomTool={handleRandomTool}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebarCollapse={handleToggleSidebarCollapse}
        onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        toolsCount={allTools.length}
      />

      {/* Main Two-Column Workspace Layout */}
      <div className="flex flex-1 min-h-[calc(100vh-3.5rem)] relative">
        {/* Persistent Desktop & Responsive Mobile Sidebar */}
        <Sidebar
          tools={allTools}
          activeToolId={activeToolId}
          onSelectTool={handleSelectTool}
          pinnedIds={pinnedIds}
          onTogglePin={handleTogglePin}
          recentToolIds={recentToolIds}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebarCollapse}
        />

        {/* Primary Workspace Canvas */}
        <main className="flex-1 min-w-0 p-3 sm:p-6 lg:p-8 pb-20 md:pb-8 overflow-y-auto bg-neutral-950/60 workbench-canvas">
          {ActiveComponent ? (
            <div className="animate-fade-in">
              <ActiveComponent />
            </div>
          ) : (
            <DashboardOverview
              tools={allTools}
              onSelectTool={handleSelectTool}
              pinnedIds={pinnedIds}
              onTogglePin={handleTogglePin}
              onRandomTool={handleRandomTool}
              onOpenPalette={() => setIsPaletteOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onRandomTool={handleRandomTool}
        activeToolId={activeToolId}
        onClearActiveTool={handleClearActiveTool}
        pinnedCount={pinnedIds.length}
        totalCount={allTools.length}
      />

      {/* Raycast-style Universal Command Palette */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        tools={allTools}
        onSelectTool={handleSelectTool}
      />
    </div>
  );
}
