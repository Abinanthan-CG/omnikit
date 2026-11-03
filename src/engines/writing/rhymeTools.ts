export interface LineMeterAnalysis {
  line: string;
  syllableCount: number;
  wordCount: number;
  meterPattern: string; // e.g. "da-DUM da-DUM"
}

export function analyzePoeticMeter(poemText: string): {
  lines: LineMeterAnalysis[];
  totalLines: number;
  totalSyllables: number;
  rhymeSchemeEstimate: string;
} {
  if (!poemText || typeof poemText !== 'string') {
    return { lines: [], totalLines: 0, totalSyllables: 0, rhymeSchemeEstimate: '' };
  }

  const rawLines = poemText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  let totalSyllables = 0;

  function countSyllablesInWord(word: string): number {
    const clean = word.toLowerCase().replace(/[^a-z]/g, '');
    if (!clean) return 0;
    if (clean.length <= 3) return 1;

    let count = 0;
    const vowels = 'aeiouy';
    let prevIsVowel = false;

    for (let i = 0; i < clean.length; i++) {
      const isVowel = vowels.includes(clean[i]);
      if (isVowel && !prevIsVowel) count++;
      prevIsVowel = isVowel;
    }

    if (clean.endsWith('e') && !clean.endsWith('le') && count > 1) {
      count--;
    }

    return Math.max(1, count);
  }

  const lines: LineMeterAnalysis[] = rawLines.map((line) => {
    const words = line.trim().split(/\s+/).filter(Boolean);
    let lineSyllables = 0;

    for (const w of words) {
      lineSyllables += countSyllablesInWord(w);
    }

    totalSyllables += lineSyllables;

    // Build iambic-style stress pattern approximation
    const pattern = Array.from({ length: lineSyllables })
      .map((_, i) => (i % 2 === 1 ? 'DUM' : 'da'))
      .join(' ');

    return {
      line,
      syllableCount: lineSyllables,
      wordCount: words.length,
      meterPattern: pattern
    };
  });

  return {
    lines,
    totalLines: lines.length,
    totalSyllables,
    rhymeSchemeEstimate: lines.length === 4 ? 'AABB / ABAB' : 'Free / Blank Verse'
  };
}
