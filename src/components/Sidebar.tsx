import React, { useState, useMemo } from 'react';
import {
  Search,
  Star,
  Clock,
  ChevronDown,
  ChevronRight,
  Code2,
  Palette,
  FileText,
  Film,
  Volume2,
  X,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import type { ToolDefinition, ToolCategory } from '../types/tool';
import { ToolIcon } from './ToolIcon';
import { CATEGORY_THEMES } from '../utils/categoryTheme';
import { playTactileClick } from '../utils/sound';

interface SidebarProps {
  tools: ToolDefinition[];
  activeToolId: string | null;
  onSelectTool: (id: string) => void;
  pinnedIds: string[];
  onTogglePin: (id: string, e?: React.MouseEvent) => void;
  recentToolIds: string[];
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const CATEGORY_META: { id: ToolCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dev', label: 'Developer & Data', icon: Code2 },
  { id: 'design', label: 'Design & UI', icon: Palette },
  { id: 'writing', label: 'Text & Copy', icon: FileText },
  { id: 'video', label: 'Video & Film', icon: Film },
  { id: 'audio', label: 'Audio & Sound', icon: Volume2 },
];

export const Sidebar: React.FC<SidebarProps> = ({
  tools,
  activeToolId,
  onSelectTool,
  pinnedIds,
  onTogglePin,
  recentToolIds,
  isMobileOpen,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (catId: string) => {
    playTactileClick('toggle');
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const handleToolClick = (toolId: string) => {
    playTactileClick('click');
    onSelectTool(toolId);
    onCloseMobile();
  };

  // Filter tools if query exists
  const filteredTools = useMemo(() => {
    const q = filterQuery.trim().toLowerCase();
    if (!q) return null;
    return tools.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(q))) ||
        (t.keywords && t.keywords.some((kw) => kw.toLowerCase().includes(q)))
    );
  }, [tools, filterQuery]);

  // Group tools by category
  const toolsByCategory = useMemo(() => {
    const groups: Record<ToolCategory, ToolDefinition[]> = {
      all: [],
      dev: [],
      design: [],
      writing: [],
      video: [],
      audio: [],
    };
    for (const tool of tools) {
      if (groups[tool.category]) {
        groups[tool.category].push(tool);
      }
    }
    return groups;
  }, [tools]);

  const pinnedTools = useMemo(() => {
    return pinnedIds
      .map((id) => tools.find((t) => t.id === id))
      .filter((t): t is ToolDefinition => Boolean(t));
  }, [pinnedIds, tools]);

  const recentTools = useMemo(() => {
    return recentToolIds
      .map((id) => tools.find((t) => t.id === id))
      .filter((t): t is ToolDefinition => Boolean(t))
      .slice(0, 5);
  }, [recentToolIds, tools]);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-neutral-925 border-r border-neutral-800/80 text-neutral-300 select-none">
      {/* Sidebar Search Bar */}
      <div className="p-3 border-b border-neutral-800/80 bg-neutral-950/60">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter utilities..."
            className="w-full pl-8 pr-7 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
          />
          {filterQuery ? (
            <button
              onClick={() => setFilterQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-neutral-500 hover:text-neutral-300"
            >
              <X className="w-3 h-3" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[9px] bg-neutral-800 text-neutral-500 px-1 py-0.2 rounded border border-neutral-750">
              /
            </kbd>
          )}
        </div>
      </div>

      {/* Scrollable Tool Directory */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 text-xs font-sans">
        {filteredTools !== null ? (
          /* Filtered Results View */
          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-mono text-neutral-500 uppercase tracking-wider flex items-center justify-between">
              <span>Matching Utilities</span>
              <span>{filteredTools.length}</span>
            </div>
            {filteredTools.length === 0 ? (
              <div className="px-3 py-6 text-center text-neutral-500 font-mono text-xs">
                No matching tools
              </div>
            ) : (
              filteredTools.map((tool) => {
                const isActive = activeToolId === tool.id;
                const theme = CATEGORY_THEMES[tool.category] || CATEGORY_THEMES.all;
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleToolClick(tool.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors group relative ${
                      isActive
                        ? 'bg-neutral-800 text-neutral-100 font-medium shadow-sm'
                        : 'hover:bg-neutral-850/60 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {isActive && (
                      <span className={`absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r ${theme.indicatorColor}`} />
                    )}
                    <div className="flex items-center gap-2 min-w-0 pl-1">
                      <ToolIcon toolId={tool.id} category={tool.category} className={`w-3.5 h-3.5 shrink-0 ${isActive ? theme.textAccent : 'text-neutral-500'}`} />
                      <span className="truncate text-xs">{tool.title}</span>
                    </div>
                    <span className={`text-[9px] font-mono uppercase px-1 py-0.2 rounded border shrink-0 ${theme.badgeClass}`}>
                      {theme.shortLabel}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        ) : (
          /* Grouped Categories, Pinned & Recents */
          <>
            {/* Pinned / Favorites */}
            {pinnedTools.length > 0 && (
              <div className="space-y-1">
                <div className="px-2 py-1 text-[10px] font-mono text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>Favorites</span>
                  <span className="ml-auto text-neutral-600 font-mono">{pinnedTools.length}</span>
                </div>
                {pinnedTools.map((tool) => {
                  const isActive = activeToolId === tool.id;
                  const theme = CATEGORY_THEMES[tool.category] || CATEGORY_THEMES.all;
                  return (
                    <div
                      key={tool.id}
                      onClick={() => handleToolClick(tool.id)}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors group relative ${
                        isActive
                          ? 'bg-neutral-800 text-neutral-100 font-medium shadow-sm'
                          : 'hover:bg-neutral-850/60 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {isActive && (
                        <span className={`absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r ${theme.indicatorColor}`} />
                      )}
                      <div className="flex items-center gap-2 min-w-0 pl-1">
                        <ToolIcon toolId={tool.id} category={tool.category} className={`w-3.5 h-3.5 shrink-0 ${isActive ? theme.textAccent : 'text-neutral-500'}`} />
                        <span className="truncate text-xs">{tool.title}</span>
                      </div>
                      <button
                        onClick={(e) => onTogglePin(tool.id, e)}
                        title="Unpin"
                        className="opacity-0 group-hover:opacity-100 p-0.5 text-neutral-500 hover:text-amber-400 transition-opacity"
                      >
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Recents */}
            {recentTools.length > 0 && (
              <div className="space-y-1">
                <div className="px-2 py-1 text-[10px] font-mono text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-neutral-500" />
                  <span>Recent</span>
                </div>
                {recentTools.map((tool) => {
                  const isActive = activeToolId === tool.id;
                  const theme = CATEGORY_THEMES[tool.category] || CATEGORY_THEMES.all;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => handleToolClick(tool.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors group relative ${
                        isActive
                          ? 'bg-neutral-800 text-neutral-100 font-medium shadow-sm'
                          : 'hover:bg-neutral-850/60 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {isActive && (
                        <span className={`absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r ${theme.indicatorColor}`} />
                      )}
                      <div className="flex items-center gap-2 min-w-0 pl-1">
                        <ToolIcon toolId={tool.id} category={tool.category} className={`w-3.5 h-3.5 shrink-0 ${isActive ? theme.textAccent : 'text-neutral-500'}`} />
                        <span className="truncate text-xs">{tool.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Disciplines Tree */}
            <div className="pt-1 space-y-3">
              <div className="px-2 text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                <span>Disciplines</span>
              </div>

              {CATEGORY_META.map((cat) => {
                const groupTools = toolsByCategory[cat.id] || [];
                const isCollapsed = collapsedCategories[cat.id];
                const theme = CATEGORY_THEMES[cat.id];
                const IconComponent = cat.icon;

                return (
                  <div key={cat.id} className="space-y-0.5">
                    {/* Category Header Bar */}
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full flex items-center justify-between px-2 py-1 rounded text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850/40 transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        {isCollapsed ? (
                          <ChevronRight className="w-3 h-3 text-neutral-500" />
                        ) : (
                          <ChevronDown className="w-3 h-3 text-neutral-500" />
                        )}
                        <IconComponent className={`w-3.5 h-3.5 ${theme.textAccent}`} />
                        <span className="font-medium text-xs text-neutral-300">{cat.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500">{groupTools.length}</span>
                    </button>

                    {/* Tools in this category */}
                    {!isCollapsed && (
                      <div className="space-y-0.5 pl-3 border-l border-neutral-800/80 ml-2.5 my-1">
                        {groupTools.map((tool) => {
                          const isActive = activeToolId === tool.id;
                          return (
                            <button
                              key={tool.id}
                              onClick={() => handleToolClick(tool.id)}
                              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors relative group ${
                                isActive
                                  ? 'bg-neutral-800 text-neutral-100 font-medium shadow-sm'
                                  : 'hover:bg-neutral-850/60 text-neutral-400 hover:text-neutral-200'
                              }`}
                            >
                              {isActive && (
                                <span className={`absolute -left-[13px] top-1.5 bottom-1.5 w-1 rounded-r ${theme.indicatorColor}`} />
                              )}
                              <span className="truncate text-xs">{tool.title}</span>
                              <button
                                onClick={(e) => onTogglePin(tool.id, e)}
                                title={pinnedIds.includes(tool.id) ? 'Unpin' : 'Pin'}
                                className={`p-0.5 text-neutral-600 hover:text-amber-400 transition-opacity ${
                                  pinnedIds.includes(tool.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                }`}
                              >
                                <Star
                                  className={`w-3 h-3 ${
                                    pinnedIds.includes(tool.id) ? 'fill-amber-400 text-amber-400' : ''
                                  }`}
                                />
                              </button>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Sidebar Footer Controls */}
      <div className="p-3 border-t border-neutral-800/80 bg-neutral-950/80 flex items-center justify-between text-xs text-neutral-500 font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>125 utilities</span>
        </div>
        <button
          onClick={onToggleCollapse}
          title="Toggle sidebar (Ctrl+B)"
          className="p-1 hover:text-neutral-300 rounded hover:bg-neutral-900 transition-colors hidden md:inline-block"
        >
          {isCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block shrink-0 transition-all duration-200 h-[calc(100vh-3.5rem)] sticky top-14 ${
          isCollapsed ? 'w-0 overflow-hidden border-none' : 'w-64 lg:w-72'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 animate-fade-in">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
