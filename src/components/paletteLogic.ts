import type { ToolCategory } from '../types/tool.ts';

export interface ToolListItem {
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  tags: string[];
  keywords: string[];
  icon?: string;
}

export function filterToolList(
  tools: ToolListItem[],
  query: string,
  category: ToolCategory = 'all'
): ToolListItem[] {
  const q = query.trim().toLowerCase();

  return tools.filter((tool) => {
    const matchesCategory = category === 'all' || tool.category === category;
    if (!matchesCategory) return false;

    if (!q) return true;

    const inTitle = tool.title.toLowerCase().includes(q);
    const inDescription = tool.description.toLowerCase().includes(q);
    const inTags = tool.tags.some(t => t.toLowerCase().includes(q));
    const inKeywords = tool.keywords.some(k => k.toLowerCase().includes(q));

    return inTitle || inDescription || inTags || inKeywords;
  });
}
