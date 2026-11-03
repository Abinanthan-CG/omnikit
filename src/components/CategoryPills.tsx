import React from 'react';
import { Layers, Film, Volume2, Palette, FileText, Code2, LucideIcon } from 'lucide-react';
import type { ToolCategory } from '../types/tool';

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
  { id: 'all', label: 'All Tools', icon: Layers },
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
  return (
    <div className="flex flex-wrap items-center gap-1.5 py-2">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        const count = counts[cat.id] ?? 0;
        const IconComponent = cat.icon;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isSelected
                ? 'bg-neutral-100 text-neutral-900 shadow-sm font-semibold'
                : 'bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-neutral-900' : 'text-neutral-500'}`} strokeWidth={2} />
            <span>{cat.label}</span>
            <span
              className={`ml-0.5 px-1.5 py-0.2 rounded font-mono text-[10px] ${
                isSelected
                  ? 'bg-neutral-300 text-neutral-900'
                  : 'bg-neutral-800 text-neutral-500'
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
