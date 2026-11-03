import React, { useState, useEffect } from 'react';
import { Copy, Check, RotateCcw, ArrowLeft, Star, Link2, ArrowRight } from 'lucide-react';
import type { ToolCategory } from '../types/tool';
import { ToolIcon } from './ToolIcon';
import { CATEGORY_THEMES } from '../utils/categoryTheme';
import { getTools } from '../registry/registry';
import { playTactileClick } from '../utils/sound';

interface ToolShellProps {
  title: string;
  category: ToolCategory;
  description: string;
  toolId?: string;
  icon?: string;
  onReset?: () => void;
  onBack?: () => void;
  onSelectTool?: (id: string) => void;
  children: React.ReactNode;
}

export const ToolShell: React.FC<ToolShellProps> = ({
  title,
  category,
  description,
  toolId,
  onReset,
  onBack,
  onSelectTool,
  children,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const theme = CATEGORY_THEMES[category] || CATEGORY_THEMES.all;

  // Check pinned status
  useEffect(() => {
    if (!toolId) return;
    try {
      const stored = localStorage.getItem('omnikit_pinned');
      if (stored) {
        const list: string[] = JSON.parse(stored);
        setIsPinned(list.includes(toolId));
      }
    } catch {
      // ignore
    }
  }, [toolId]);

  const togglePin = () => {
    if (!toolId) return;
    try {
      const stored = localStorage.getItem('omnikit_pinned');
      const list: string[] = stored ? JSON.parse(stored) : [];
      let updated: string[];
      if (list.includes(toolId)) {
        updated = list.filter((id) => id !== toolId);
        setIsPinned(false);
        playTactileClick('toggle');
      } else {
        updated = [...list, toolId];
        setIsPinned(true);
        playTactileClick('pin');
      }
      localStorage.setItem('omnikit_pinned', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleCopyLink = async () => {
    playTactileClick('click');
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // fallback
    }
  };

  // Find 3 companion tools from the same category
  const companionTools = toolId
    ? getTools()
        .filter((t) => t.category === category && t.id !== toolId)
        .slice(0, 3)
    : [];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Top Navigation & Action Ribbon */}
      <div className="flex items-center justify-between gap-4 pb-2">
        <button
          onClick={() => {
            playTactileClick('click');
            if (onBack) onBack();
            else window.location.hash = '';
          }}
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-neutral-100 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to utilities</span>
          <kbd className="hidden sm:inline-block font-mono text-[9px] bg-neutral-900 text-neutral-500 px-1 py-0.2 rounded border border-neutral-800">
            Esc
          </kbd>
        </button>

        <div className="flex items-center gap-2">
          {/* Favorite/Pin Button */}
          {toolId && (
            <button
              onClick={togglePin}
              title={isPinned ? 'Remove from pinned utilities' : 'Pin to top of your workbench'}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border transition-all ${
                isPinned
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 border-neutral-800'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${isPinned ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span className="hidden sm:inline text-[11px] font-mono">{isPinned ? 'Pinned' : 'Pin tool'}</span>
            </button>
          )}

          {/* Copy Direct Link */}
          <button
            onClick={handleCopyLink}
            title="Copy direct shareable link to this tool"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg bg-neutral-900/80 hover:bg-neutral-850 text-neutral-400 hover:text-neutral-200 border border-neutral-800 transition-all"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link2 className="w-3.5 h-3.5" />}
            <span className="text-[11px] font-mono">{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>

          {/* Reset Action */}
          {onReset && (
            <button
              onClick={() => {
                playTactileClick('click');
                onReset();
              }}
              title="Reset fields to default"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg bg-neutral-900/80 hover:bg-neutral-850 text-neutral-400 hover:text-neutral-200 border border-neutral-800 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] font-mono">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Tool Canvas Card with Discipline Ambient Rim */}
      <div className="relative rounded-2xl bg-neutral-900/70 border border-neutral-800 shadow-2xl backdrop-blur-md overflow-hidden">
        {/* Subtle luminous accent bar at top edge */}
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.accentHex}, transparent)`,
          }}
        />

        {/* Tool Header Inside Canvas */}
        <div className="p-6 border-b border-neutral-800/80 flex items-start gap-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${theme.bgSubtle} ${theme.borderAccent}`}
          >
            <ToolIcon toolId={toolId} category={category} className={`w-5 h-5 ${theme.textAccent}`} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-xl font-bold tracking-tight text-neutral-100">{title}</h2>
              <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${theme.badgeClass}`}>
                {theme.label}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6">{children}</div>
      </div>

      {/* Companion / Related Utilities Tray */}
      {companionTools.length > 0 && onSelectTool && (
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-neutral-500 uppercase tracking-wider">
            <span>Related {theme.label} Utilities</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {companionTools.map((comp) => (
              <button
                key={comp.id}
                onClick={() => {
                  playTactileClick('pop');
                  onSelectTool(comp.id);
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-850 transition-all text-left group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${theme.bgSubtle} ${theme.borderAccent}`}>
                    <ToolIcon toolId={comp.id} category={comp.category} className={`w-3.5 h-3.5 ${theme.textAccent}`} />
                  </div>
                  <div className="min-w-0 truncate">
                    <div className="text-xs font-medium text-neutral-200 group-hover:text-neutral-100 truncate">
                      {comp.title}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const CopyButton: React.FC<{ text: string; label?: string }> = ({ text, label = 'Copy' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    playTactileClick('click');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
        copied
          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          : 'bg-neutral-800 hover:bg-neutral-750 text-neutral-300 border border-neutral-700'
      }`}
    >
      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
      <span>{copied ? 'Copied' : label}</span>
    </button>
  );
};
