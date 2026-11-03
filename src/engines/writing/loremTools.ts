const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea',
  'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

function generateSentence(): string {
  const len = Math.floor(Math.random() * 8) + 8; // 8-16 words
  const words: string[] = [];
  for (let i = 0; i < len; i++) {
    const word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
    words.push(word);
  }
  const sentence = words.join(' ');
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
}

function generateParagraph(): string {
  const count = Math.floor(Math.random() * 3) + 4; // 4-6 sentences
  const sentences: string[] = [];
  for (let i = 0; i < count; i++) {
    sentences.push(generateSentence());
  }
  return sentences.join(' ');
}

export function generateLoremIpsum(type: 'paragraphs' | 'sentences' | 'words', count: number, startWithLorem = true): string {
  const qty = Math.max(1, Math.min(count, 50));

  if (type === 'words') {
    const words: string[] = [];
    if (startWithLorem) {
      words.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
    }
    while (words.length < qty) {
      words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
    }
    return words.slice(0, qty).join(' ');
  }

  if (type === 'sentences') {
    const sentences: string[] = [];
    if (startWithLorem) {
      sentences.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    }
    while (sentences.length < qty) {
      sentences.push(generateSentence());
    }
    return sentences.slice(0, qty).join(' ');
  }

  const paras: string[] = [];
  if (startWithLorem) {
    paras.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
  }
  while (paras.length < qty) {
    paras.push(generateParagraph());
  }
  return paras.slice(0, qty).join('\n\n');
}
