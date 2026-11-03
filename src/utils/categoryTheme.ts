import type { ToolCategory } from '../types/tool';

export interface CategoryTheme {
  label: string;
  shortLabel: string;
  accentHex: string;
  textAccent: string;
  borderAccent: string;
  bgSubtle: string;
  badgeClass: string;
  cardGlow: string;
  activePillClass: string;
  indicatorColor: string;
}

export const CATEGORY_THEMES: Record<ToolCategory, CategoryTheme> = {
  all: {
    label: 'All Utilities',
    shortLabel: 'All',
    accentHex: '#d4d4d8',
    textAccent: 'text-zinc-200',
    borderAccent: 'border-zinc-700',
    bgSubtle: 'bg-zinc-800/40',
    badgeClass: 'bg-zinc-900/90 text-zinc-300 border-zinc-750',
    cardGlow: 'hover:border-zinc-700 hover:shadow-[0_0_24px_-6px_rgba(255,255,255,0.06)]',
    activePillClass: 'bg-zinc-100 text-zinc-950 shadow-sm font-semibold',
    indicatorColor: 'bg-zinc-400',
  },
  dev: {
    label: 'Developer & Data',
    shortLabel: 'Dev',
    accentHex: '#10b981',
    textAccent: 'text-emerald-400',
    borderAccent: 'border-emerald-500/30',
    bgSubtle: 'bg-emerald-950/25',
    badgeClass: 'bg-emerald-950/50 text-emerald-300 border-emerald-800/50',
    cardGlow: 'hover:border-emerald-500/40 hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.18)]',
    activePillClass: 'bg-emerald-500 text-neutral-950 shadow-[0_0_16px_-3px_rgba(16,185,129,0.45)] font-semibold',
    indicatorColor: 'bg-emerald-400',
  },
  design: {
    label: 'Design & UI',
    shortLabel: 'Design',
    accentHex: '#a855f7',
    textAccent: 'text-purple-400',
    borderAccent: 'border-purple-500/30',
    bgSubtle: 'bg-purple-950/25',
    badgeClass: 'bg-purple-950/50 text-purple-300 border-purple-800/50',
    cardGlow: 'hover:border-purple-500/40 hover:shadow-[0_0_25px_-5px_rgba(168,85,247,0.18)]',
    activePillClass: 'bg-purple-500 text-neutral-950 shadow-[0_0_16px_-3px_rgba(168,85,247,0.45)] font-semibold',
    indicatorColor: 'bg-purple-400',
  },
  writing: {
    label: 'Text & Copy',
    shortLabel: 'Writing',
    accentHex: '#f59e0b',
    textAccent: 'text-amber-400',
    borderAccent: 'border-amber-500/30',
    bgSubtle: 'bg-amber-950/25',
    badgeClass: 'bg-amber-950/50 text-amber-300 border-amber-800/50',
    cardGlow: 'hover:border-amber-500/40 hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.18)]',
    activePillClass: 'bg-amber-500 text-neutral-950 shadow-[0_0_16px_-3px_rgba(245,158,11,0.45)] font-semibold',
    indicatorColor: 'bg-amber-400',
  },
  video: {
    label: 'Video & Film',
    shortLabel: 'Video',
    accentHex: '#f43f5e',
    textAccent: 'text-rose-400',
    borderAccent: 'border-rose-500/30',
    bgSubtle: 'bg-rose-950/25',
    badgeClass: 'bg-rose-950/50 text-rose-300 border-rose-800/50',
    cardGlow: 'hover:border-rose-500/40 hover:shadow-[0_0_25px_-5px_rgba(244,63,94,0.18)]',
    activePillClass: 'bg-rose-500 text-neutral-950 shadow-[0_0_16px_-3px_rgba(244,63,94,0.45)] font-semibold',
    indicatorColor: 'bg-rose-400',
  },
  audio: {
    label: 'Audio & Sound',
    shortLabel: 'Audio',
    accentHex: '#06b6d4',
    textAccent: 'text-cyan-400',
    borderAccent: 'border-cyan-500/30',
    bgSubtle: 'bg-cyan-950/25',
    badgeClass: 'bg-cyan-950/50 text-cyan-300 border-cyan-800/50',
    cardGlow: 'hover:border-cyan-500/40 hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.18)]',
    activePillClass: 'bg-cyan-500 text-neutral-950 shadow-[0_0_16px_-3px_rgba(6,182,212,0.45)] font-semibold',
    indicatorColor: 'bg-cyan-400',
  },
};
