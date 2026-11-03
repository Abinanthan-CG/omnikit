import React from 'react';
import type { ToolCategory } from '../types/tool';

interface CategoryPillsProps {
  selectedCategory: ToolCategory;
  onSelectCategory: (category: ToolCategory) => void;
  counts: Record<ToolCategory, number>;
}

const CATEGORIES: Array<{ id: ToolCategory; label: string; icon: string }> = [
  { id: 'all', label: 'All Tools', icon: '⚡' },
  { id: 'video', label: 'Video & Film', icon: '🎬' },
  { id: 'audio', label: 'Audio & Music', icon: '🎵' },
  { id: 'design', label: 'Design & UI', icon: '🎨' },
  { id: 'writing', label: 'Text & Copy', icon: '✍️' },
  { id: 'dev', label: 'Dev & Data', icon: '💻' },
];

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedCategory,
  onSelectCategory,
  counts,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        const count = counts[cat.id] ?? 0;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isSelected
                ? 'bg-neutral-100 text-neutral-900 shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
            <span
              className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${
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
