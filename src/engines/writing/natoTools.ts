export const NATO_ALPHABET: Record<string, string> = {
  A: 'Alfa',
  B: 'Bravo',
  C: 'Charlie',
  D: 'Delta',
  E: 'Echo',
  F: 'Foxtrot',
  G: 'Golf',
  H: 'Hotel',
  I: 'India',
  J: 'Juliett',
  K: 'Kilo',
  L: 'Lima',
  M: 'Mike',
  N: 'November',
  O: 'Oscar',
  P: 'Papa',
  Q: 'Quebec',
  R: 'Romeo',
  S: 'Sierra',
  T: 'Tango',
  U: 'Uniform',
  V: 'Victor',
  W: 'Whiskey',
  X: 'X-ray',
  Y: 'Yankee',
  Z: 'Zulu',
  '0': 'Zero',
  '1': 'One',
  '2': 'Two',
  '3': 'Three',
  '4': 'Four',
  '5': 'Five',
  '6': 'Six',
  '7': 'Seven',
  '8': 'Eight',
  '9': 'Nine'
};

export interface NatoWord {
  char: string;
  word: string;
  isSpelled: boolean;
}

export function spellNato(text: string): {
  words: NatoWord[];
  formattedString: string;
  totalLetters: number;
} {
  if (!text || typeof text !== 'string') {
    return { words: [], formattedString: '', totalLetters: 0 };
  }

  const words: NatoWord[] = [];
  let totalLetters = 0;

  for (const ch of text) {
    const upper = ch.toUpperCase();
    if (NATO_ALPHABET[upper]) {
      words.push({ char: ch, word: NATO_ALPHABET[upper], isSpelled: true });
      totalLetters++;
    } else if (ch === ' ') {
      words.push({ char: ' ', word: '—', isSpelled: false });
    } else {
      words.push({ char: ch, word: ch, isSpelled: false });
    }
  }

  const formatted = words.map((w) => w.word).join(' ');

  return {
    words,
    formattedString: formatted,
    totalLetters
  };
}
