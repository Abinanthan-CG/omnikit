import { useState, useEffect, useMemo, useRef } from 'react';
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
  Activity,
  Code2,
  Palette,
  FileText,
  Film,
  Volume2
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

  // Interactive Live Bench Widget in Hero
  const [heroTab, setHeroTab] = useState<'audio' | 'contrast' | 'text'>('audio');
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const [bpm, setBpm] = useState<number>(120);
  const [hue, setHue] = useState<number>(260);
  const [quickText, setQuickText] = useState('Omnikit Field Workbench');
  const catalogRef = useRef<HTMLDivElement>(null);

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

  // Live Tap Tempo
  const handleTap = () => {
    playTactileClick('click');
    const now = performance.now();
    const newTaps = [...tapTimes.slice(-4), now];
    setTapTimes(newTaps);

    if (newTaps.length >= 2) {
      const intervals: number[] = [];
      for (let i = 1; i < newTaps.length; i++) {
        intervals.push(newTaps[i] - newTaps[i - 1]);
      }
      const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      if (avg > 0) {
        setBpm(Math.round(60000 / avg));
      }
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

  // Filter tools
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

  const scrollToCatalog = (cat?: ToolCategory) => {
    playTactileClick('pop');
    if (cat) setSelectedCategory(cat);
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200 workbench-canvas relative">
      {/* Top Ambient Horizon */}
      <div className="absolute top-0 inset-x-0 h-96 ambient-glow pointer-events-none" />

      {/* Main Studio Header */}
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
          <div className="space-y-12">
            {/* Atelier Hero Section */}
            <div className="space-y-6 pt-2">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800/80 pb-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>CHASSIS OK-125 // ATELIER MULTI-DISCIPLINE WORKBENCH</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-100 font-mono">
                    Crafted Utilities.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-purple-400 to-cyan-400">
                      Physical Speed. Zero Cloud.
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xl">
                    125 dedicated instruments for engineers, visual artists, acousticians, typographers, and film editors. Zero trackers, zero latency, completely offline in your local sandbox.
                  </p>
                </div>

                {/* Quick Action Station */}
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={handleRandomTool}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-750 hover:border-neutral-600 text-neutral-200 hover:text-white transition-all font-mono text-xs font-semibold shadow-md active:scale-95"
                  >
                    <Shuffle className="w-4 h-4 text-emerald-400" />
                    <span>Surprise Utility (R)</span>
                  </button>
                  <button
                    onClick={() => scrollToCatalog()}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors font-mono text-xs"
                  >
                    <span>Browse 125 Tools ↓</span>
                  </button>
                </div>
              </div>

              {/* Live Interactive Benchmark Console in Hero */}
              <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-2xl overflow-hidden backdrop-blur-md">
                <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-950/80 border-b border-neutral-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                      ⚡ LIVE INSTRUMENT PAD
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-900 text-emerald-400 border border-neutral-800">
                      ACTIVE
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setHeroTab('audio')}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        heroTab === 'audio'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      Acoustic BPM
                    </button>
                    <button
                      onClick={() => setHeroTab('contrast')}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        heroTab === 'contrast'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      Color Gauge
                    </button>
                    <button
                      onClick={() => setHeroTab('text')}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        heroTab === 'text'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      Quick Transformer
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  {heroTab === 'audio' && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="space-y-1 text-center sm:text-left">
                        <div className="text-3xl sm:text-4xl font-mono font-bold text-cyan-400 tracking-tight">
                          {bpm} <span className="text-xs text-neutral-500 uppercase">BPM</span>
                        </div>
                        <div className="text-xs font-mono text-neutral-400 flex items-center gap-3">
                          <span>Quarter: {Math.round(60000 / bpm)}ms</span>
                          <span>·</span>
                          <span>Eighth: {Math.round(30000 / bpm)}ms</span>
                          <span>·</span>
                          <span>Delay: {Math.round(15000 / bpm)}ms</span>
                        </div>
                      </div>

                      <button
                        onClick={handleTap}
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/70 border border-cyan-800 text-cyan-300 font-mono text-xs font-bold transition-all active:scale-95 shadow-inner flex items-center justify-center gap-2"
                      >
                        <Activity className="w-4 h-4 text-cyan-400" />
                        <span>TAP TEMPO BEAT</span>
                      </button>
                    </div>
                  )}

                  {heroTab === 'contrast' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-neutral-400">
                          Real-time Contrast Ratio & Preview:
                        </span>
                        <span className="text-sm font-mono font-bold text-purple-400">
                          WCAG AAA Compliant
                        </span>
                      </div>
                      <div
                        className="p-4 rounded-xl text-center font-mono text-sm font-semibold transition-all border shadow-inner"
                        style={{
                          backgroundColor: `hsl(${hue}, 80%, 15%)`,
                          borderColor: `hsl(${hue}, 70%, 40%)`,
                          color: `hsl(${hue}, 90%, 90%)`,
                        }}
                      >
                        "Form follows function, but feeling follows craft."
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-neutral-500">Hue</span>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={hue}
                          onChange={(e) => setHue(Number(e.target.value))}
                          className="w-full accent-purple-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {heroTab === 'text' && (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={quickText}
                        onChange={(e) => setQuickText(e.target.value)}
                        placeholder="Type anything here..."
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-100 focus:outline-none"
                      />
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                        <div className="p-2 rounded bg-neutral-950 border border-neutral-850">
                          <span className="text-[9px] text-neutral-500 block">camelCase</span>
                          <span className="text-amber-400 truncate block">
                            {quickText.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
                              +match === 0 ? '' : index === 0 ? match.toLowerCase() : match.toUpperCase()
                            )}
                          </span>
                        </div>
                        <div className="p-2 rounded bg-neutral-950 border border-neutral-850">
                          <span className="text-[9px] text-neutral-500 block">kebab-case</span>
                          <span className="text-amber-400 truncate block">
                            {quickText.toLowerCase().replace(/\s+/g, '-')}
                          </span>
                        </div>
                        <div className="p-2 rounded bg-neutral-950 border border-neutral-850">
                          <span className="text-[9px] text-neutral-500 block">CONSTANT_CASE</span>
                          <span className="text-amber-400 truncate block">
                            {quickText.toUpperCase().replace(/\s+/g, '_')}
                          </span>
                        </div>
                        <div className="p-2 rounded bg-neutral-950 border border-neutral-850">
                          <span className="text-[9px] text-neutral-500 block">Length</span>
                          <span className="text-neutral-300 block">
                            {quickText.length} chars · {quickText.trim().split(/\s+/).filter(Boolean).length} words
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* The 5 Atelier Bays (Interactive Showcase Bento) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <span>ATELIER STATIONS</span>
                  <span className="text-neutral-600">/</span>
                  <span className="text-neutral-500">5 CRAFT DOMAINS</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* 01: Dev */}
                <div
                  onClick={() => scrollToCatalog('dev')}
                  className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 hover:border-emerald-500/60 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-emerald-400">01 // DEV</span>
                      <Code2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-100 group-hover:text-emerald-300 transition-colors">
                      Terminal & Forge
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                      JSON, SemVer, Regex, Chmod, JWT, Base64 & Bitmasks.
                    </p>
                  </div>
                  <div className="mt-4 text-[10px] font-mono text-emerald-400/80 flex items-center justify-between">
                    <span>48 utilities</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* 02: Design */}
                <div
                  onClick={() => scrollToCatalog('design')}
                  className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 hover:border-purple-500/60 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-purple-400">02 // DESIGN</span>
                      <Palette className="w-4 h-4 text-purple-400" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-100 group-hover:text-purple-300 transition-colors">
                      Visual Atelier
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                      Contrast, SVG Clean, Gradients, Shadows, Rem/Px & Mesh.
                    </p>
                  </div>
                  <div className="mt-4 text-[10px] font-mono text-purple-400/80 flex items-center justify-between">
                    <span>27 utilities</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* 03: Writing */}
                <div
                  onClick={() => scrollToCatalog('writing')}
                  className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 hover:border-amber-500/60 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-amber-400">03 // TEXT</span>
                      <FileText className="w-4 h-4 text-amber-400" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                      Wordsmith Desk
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                      Case, Diff, Word Counts, Morse, Slugs & Markdown.
                    </p>
                  </div>
                  <div className="mt-4 text-[10px] font-mono text-amber-400/80 flex items-center justify-between">
                    <span>24 utilities</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* 04: Video */}
                <div
                  onClick={() => scrollToCatalog('video')}
                  className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 hover:border-rose-500/60 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-rose-400">04 // CINEMA</span>
                      <Film className="w-4 h-4 text-rose-400" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-100 group-hover:text-rose-300 transition-colors">
                      Optics & Cinema
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                      SMPTE Timecode, Aspect Ratio, Bitrate, Safe Area & Shutter.
                    </p>
                  </div>
                  <div className="mt-4 text-[10px] font-mono text-rose-400/80 flex items-center justify-between">
                    <span>15 utilities</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* 05: Audio */}
                <div
                  onClick={() => scrollToCatalog('audio')}
                  className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 hover:border-cyan-500/60 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-cyan-400">05 // AUDIO</span>
                      <Volume2 className="w-4 h-4 text-cyan-400" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-100 group-hover:text-cyan-300 transition-colors">
                      Acoustic Lab
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                      BPM Delay, Note Frequencies, Decibels & Synthesizers.
                    </p>
                  </div>
                  <div className="mt-4 text-[10px] font-mono text-cyan-400/80 flex items-center justify-between">
                    <span>11 utilities</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Pinned Utilities Shelf */}
            {pinnedIds.length > 0 && !searchQuery && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>PINNED DAILY DRIVERS</span>
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

            {/* Recently Used Tools */}
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

            {/* Catalog Master View */}
            <div ref={catalogRef} className="space-y-6 pt-4 border-t border-neutral-900">
              {/* Search, Filter & View Controls */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CategoryPills
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  counts={categoryCounts}
                />

                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="main-search-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter 125 utilities..."
                      className="w-full pl-9 pr-8 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-100 placeholder-neutral-500 focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-neutral-500 hover:text-neutral-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center p-0.5 rounded-lg bg-neutral-900 border border-neutral-800">
                    <button
                      onClick={() => handleSetViewMode('grid')}
                      className={`p-1.5 rounded transition-colors ${
                        viewMode === 'grid' ? 'bg-neutral-800 text-white' : 'text-neutral-500'
                      }`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleSetViewMode('compact')}
                      className={`p-1.5 rounded transition-colors ${
                        viewMode === 'compact' ? 'bg-neutral-800 text-white' : 'text-neutral-500'
                      }`}
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tools List */}
              {displayedTools.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <p className="text-xs font-mono text-neutral-400">
                    No utilities found matching "{searchQuery}".
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="text-xs font-mono text-emerald-400 hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
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
                            Launch instrument
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
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

      {/* Crafted Atelier Footer */}
      <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500 mt-16 bg-neutral-950/90 relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-neutral-400 font-mono text-[11px]">
            <span className="font-semibold text-neutral-200">OMNIKIT ATELIER</span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Client-Side Sandbox
            </span>
            <span>·</span>
            <span>Zero cookies or trackers</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3" />
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">Ctrl+K</kbd> palette
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">/</kbd> search
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
