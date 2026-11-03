export interface WordFrequency {
  word: string;
  count: number;
  weight: number; // percentage 100 - 300%
}

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'by', 'from', 'up', 'about', 'into', 'over', 'after', 'is', 'are', 'was', 'were',
  'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
  'shall', 'should', 'may', 'might', 'must', 'can', 'could', 'it', 'its', 'this',
  'that', 'these', 'those', 'i', 'you', 'he', 'she', 'we', 'they', 'what', 'which',
  'who', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more',
  'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
  'than', 'too', 'very', 's', 't', 'just', 'don', 'now'
]);

export function calculateWordFrequencies(text: string, ignoreStopWords: boolean = true): WordFrequency[] {
  if (!text) return [];

  const words = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  const freqMap: Record<string, number> = {};
  for (const w of words) {
    if (w.length < 2) continue;
    if (ignoreStopWords && STOP_WORDS.has(w)) continue;
    freqMap[w] = (freqMap[w] || 0) + 1;
  }

  const entries = Object.entries(freqMap)
    .map(([word, count]) => ({ word, count, weight: 100 }))
    .sort((a, b) => b.count - a.count);

  if (entries.length === 0) return [];

  const maxCount = entries[0].count;
  const minCount = entries[entries.length - 1].count;
  const spread = Math.max(1, maxCount - minCount);

  for (const item of entries) {
    // scale between 100% and 300%
    item.weight = Math.round(100 + ((item.count - minCount) / spread) * 200);
  }

  return entries.slice(0, 50);
}
