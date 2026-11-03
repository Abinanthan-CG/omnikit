export const MORSE_CODE_MAP: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
  G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
  M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
  S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
  '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
  '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
  '$': '...-..-', '@': '.--.-.'
};

const REVERSE_MORSE: Record<string, string> = Object.entries(MORSE_CODE_MAP).reduce(
  (acc, [char, code]) => {
    acc[code] = char;
    return acc;
  },
  {} as Record<string, string>
);

export function textToMorse(text: string): string {
  if (!text || typeof text !== 'string') return '';

  return text
    .toUpperCase()
    .split('')
    .map((ch) => {
      if (ch === ' ') return '/';
      return MORSE_CODE_MAP[ch] || ch;
    })
    .join(' ');
}

export function morseToText(morse: string): string {
  if (!morse || typeof morse !== 'string') return '';

  const words = morse.trim().split(/\s*\/\s*|\s{3,}/);

  return words
    .map((word) =>
      word
        .trim()
        .split(/\s+/)
        .map((code) => REVERSE_MORSE[code] || code)
        .join('')
    )
    .join(' ');
}
