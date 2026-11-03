import React from 'react';
import { Layers, Film, Volume2, Palette, FileText, Code2, LucideIcon } from 'lucide-react';
import type { ToolCategory } from '../types/tool';
import { CATEGORY_THEMES } from '../utils/categoryTheme';
import { playTactileClick } from '../utils/sound';

interface CategoryPillsProps {
  selectedCategory: ToolCategory;
  onSelectCategory: (category: ToolCategory) => void;
  counts: Record<ToolCategory, number>;
}

interface CategoryItem {
  id: ToolCategory;
  label: string;
  icon: LucideIcon;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'all', label: 'All Utilities', icon: Layers },
  { id: 'dev', label: 'Developer & Data', icon: Code2 },
  { id: 'design', label: 'Design & UI', icon: Palette },
  { id: 'writing', label: 'Text & Copy', icon: FileText },
  { id: 'video', label: 'Video & Film', icon: Film },
  { id: 'audio', label: 'Audio & Sound', icon: Volume2 },
];

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedCategory,
  onSelectCategory,
  counts,
}) => {
  const handleSelect = (catId: ToolCategory) => {
    playTactileClick('toggle');
    onSelectCategory(catId);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-1">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        const count = counts[cat.id] ?? 0;
        const IconComponent = cat.icon;
        const theme = CATEGORY_THEMES[cat.id];

        return (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
              isSelected
                ? theme.activePillClass
                : 'bg-neutral-900/80 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-850 border border-neutral-800/80 hover:border-neutral-700'
            }`}
          >
            <IconComponent
              className={`w-3.5 h-3.5 transition-colors ${
                isSelected
                  ? 'text-neutral-950'
                  : 'text-neutral-500 group-hover:text-neutral-300'
              }`}
              strokeWidth={2}
            />
            <span>{cat.label}</span>
            <span
              className={`ml-0.5 px-1.5 py-0.5 rounded font-mono text-[10px] transition-colors ${
                isSelected
                  ? 'bg-black/20 text-neutral-950 font-bold'
                  : 'bg-neutral-800 text-neutral-500 group-hover:text-neutral-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
