import React, { useState } from 'react';
import { Copy, Check, RotateCcw, Sparkles } from 'lucide-react';
import type { ToolCategory } from '../types/tool';

interface ToolShellProps {
  title: string;
  category: ToolCategory;
  description: string;
  icon?: string;
  onReset?: () => void;
  children: React.ReactNode;
}

export const ToolShell: React.FC<ToolShellProps> = ({
  title,
  category,
  description,
  icon,
  onReset,
  children,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xl shrink-0">
            {icon || <Sparkles className="w-5 h-5 text-emerald-400" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-neutral-100">{title}</h2>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-400 border border-neutral-800">
                {category}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">{description}</p>
          </div>
        </div>

        {onReset && (
          <button
            onClick={onReset}
            className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 bg-neutral-900 hover:bg-neutral-800 rounded-lg border border-neutral-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Main Tool Canvas */}
      <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
};

export const CopyButton: React.FC<{ text: string; label?: string }> = ({ text, label = 'Copy' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
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
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
        copied
          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700'
      }`}
    >
      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
      <span>{copied ? 'Copied' : label}</span>
    </button>
  );
};
