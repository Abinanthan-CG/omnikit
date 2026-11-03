import type { ToolDefinition, ToolCategory } from '../types/tool.ts';

const registry: Map<string, ToolDefinition> = new Map();

export function registerTool(tool: ToolDefinition): void {
  registry.set(tool.id, tool);
}

export function getTools(): ToolDefinition[] {
  return Array.from(registry.values());
}

export function getToolById(id: string): ToolDefinition | undefined {
  return registry.get(id);
}

export function clearRegistry(): void {
  registry.clear();
}

export function searchTools(query: string, category: ToolCategory = 'all'): ToolDefinition[] {
  const q = query.trim().toLowerCase();
  const all = Array.from(registry.values());

  return all.filter((tool) => {
    const matchesCategory = category === 'all' || tool.category === category;
    if (!matchesCategory) return false;

    if (!q) return true;

    const inTitle = tool.title.toLowerCase().includes(q);
    const inDescription = tool.description.toLowerCase().includes(q);
    const inTags = tool.tags.some((tag) => tag.toLowerCase().includes(q));
    const inKeywords = tool.keywords.some((kw) => kw.toLowerCase().includes(q));

    return inTitle || inDescription || inTags || inKeywords;
  });
}
