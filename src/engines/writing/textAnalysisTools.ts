export interface KeywordFrequency {
  word: string;
  count: number;
  percentage: number;
}

export interface TextAnalysisResult {
  totalWords: number;
  uniqueWords: number;
  frequencies: KeywordFrequency[];
}

export function analyzeKeywordDensity(text: string, stopWords = true): TextAnalysisResult {
  const commonStopWords = new Set([
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are',
    'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but',
    'by', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from',
    'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him',
    'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me',
    'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only',
    'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should',
    'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then',
    'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up',
    'very', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why',
    'with', 'would', 'you', 'your', 'yours', 'yourself', 'yourselves'
  ]);

  const rawWords = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 1);

  const totalWords = rawWords.length;
  if (totalWords === 0) {
    return { totalWords: 0, uniqueWords: 0, frequencies: [] };
  }

  const counts = new Map<string, number>();
  for (const w of rawWords) {
    if (stopWords && commonStopWords.has(w)) continue;
    counts.set(w, (counts.get(w) || 0) + 1);
  }

  const frequencies: KeywordFrequency[] = Array.from(counts.entries())
    .map(([word, count]) => ({
      word,
      count,
      percentage: Math.round((count / totalWords) * 1000) / 10,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  return {
    totalWords,
    uniqueWords: counts.size,
    frequencies,
  };
}
