export interface ExtractedColor {
  color: string;
  count: number;
}

export function extractColors(source: string): ExtractedColor[] {
  if (!source) return [];

  const hexMatches = source.match(/#(?:[0-9a-fA-F]{3,4}){1,2}\b/g) || [];
  const rgbMatches = source.match(/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*[\d.]+\s*)?\)/gi) || [];
  const hslMatches = source.match(/hsla?\(\s*\d+\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?(?:\s*,\s*[\d.]+\s*)?\)/gi) || [];

  const allColors = [...hexMatches, ...rgbMatches, ...hslMatches];
  const countMap: Record<string, number> = {};

  for (const c of allColors) {
    const norm = c.toLowerCase();
    countMap[norm] = (countMap[norm] || 0) + 1;
  }

  return Object.entries(countMap)
    .map(([color, count]) => ({ color, count }))
    .sort((a, b) => b.count - a.count);
}
