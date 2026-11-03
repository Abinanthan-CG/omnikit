export interface ReadabilityMetrics {
  words: number;
  sentences: number;
  syllables: number;
  fleschReadingEase: number;
  fleschKincaidGrade: number;
  readingEaseLabel: string;
  gradeLabel: string;
  avgWordsPerSentence: number;
  avgSyllablesPerWord: number;
}

export function countSyllablesInWord(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) return 0;
  if (clean.length <= 3) return 1;

  // Handle words ending in consonant + 'le' like syllable, table, bottle
  const hasLe = /[^aeiou]le$/.test(clean);

  // Remove silent 'e' at end
  const modified = clean.replace(/e$/, '');
  const matches = modified.match(/[aeiouy]{1,2}/g);
  let count = matches ? matches.length : 1;

  if (hasLe) {
    count++;
  }

  return Math.max(1, count);
}

export function calculateReadability(text: string): ReadabilityMetrics {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      words: 0,
      sentences: 0,
      syllables: 0,
      fleschReadingEase: 100,
      fleschKincaidGrade: 0,
      readingEaseLabel: 'N/A',
      gradeLabel: 'N/A',
      avgWordsPerSentence: 0,
      avgSyllablesPerWord: 0
    };
  }

  // Count sentences
  const sentenceList = trimmed.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  const sentenceCount = Math.max(1, sentenceList.length);

  // Count words
  const wordList = trimmed.match(/\b[a-zA-Z0-9'-]+\b/g) || [];
  const wordCount = Math.max(1, wordList.length);

  // Count syllables
  let syllableCount = 0;
  for (const word of wordList) {
    syllableCount += countSyllablesInWord(word);
  }

  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = syllableCount / wordCount;

  // Flesch Reading Ease
  // 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
  let readingEase = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
  readingEase = Math.max(0, Math.min(100, Math.round(readingEase * 10) / 10));

  // Flesch-Kincaid Grade Level
  // 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59
  let gradeLevel = (0.39 * avgWordsPerSentence) + (11.8 * avgSyllablesPerWord) - 15.59;
  gradeLevel = Math.max(0, Math.round(gradeLevel * 10) / 10);

  let readingEaseLabel = 'Standard';
  if (readingEase >= 90) readingEaseLabel = 'Very Easy (5th Grade)';
  else if (readingEase >= 80) readingEaseLabel = 'Easy (6th Grade)';
  else if (readingEase >= 70) readingEaseLabel = 'Fairly Easy (7th Grade)';
  else if (readingEase >= 60) readingEaseLabel = 'Standard (8th-9th Grade)';
  else if (readingEase >= 50) readingEaseLabel = 'Fairly Difficult (High School)';
  else if (readingEase >= 30) readingEaseLabel = 'Difficult (College)';
  else readingEaseLabel = 'Very Difficult (Academic / Graduate)';

  let gradeLabel = `Grade ${Math.floor(gradeLevel)}`;
  if (gradeLevel < 1) gradeLabel = 'Kindergarten';
  else if (gradeLevel > 12) gradeLabel = 'College / Professional';

  return {
    words: wordCount,
    sentences: sentenceCount,
    syllables: syllableCount,
    fleschReadingEase: readingEase,
    fleschKincaidGrade: gradeLevel,
    readingEaseLabel,
    gradeLabel,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100
  };
}
