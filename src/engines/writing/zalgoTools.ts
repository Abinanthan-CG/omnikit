const ZALGO_UP = [
  '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310',
  '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343',
  '\u0344', '\u034a', '\u034b', '\u034c', '\u0350', '\u0300', '\u0301', '\u0302'
];

const ZALGO_DOWN = [
  '\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f',
  '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c',
  '\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339'
];

const ZALGO_MID = [
  '\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327',
  '\u0328', '\u0334', '\u0335', '\u0336', '\u0337', '\u0338', '\u0360', '\u0361'
];

export interface ZalgoOptions {
  intensity: 'low' | 'medium' | 'high';
  up: boolean;
  mid: boolean;
  down: boolean;
}

export function generateZalgo(text: string, options: Partial<ZalgoOptions> = {}): string {
  if (!text || typeof text !== 'string') return '';

  const intensity = options.intensity || 'medium';
  const up = options.up !== false;
  const mid = options.mid !== false;
  const down = options.down !== false;

  const countPerChar = intensity === 'low' ? 2 : intensity === 'medium' ? 5 : 12;

  let result = '';

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (/\s/.test(ch)) {
      result += ch;
      continue;
    }

    result += ch;

    for (let c = 0; c < countPerChar; c++) {
      if (up && Math.random() > 0.4) {
        result += ZALGO_UP[Math.floor(Math.random() * ZALGO_UP.length)];
      }
      if (mid && Math.random() > 0.6) {
        result += ZALGO_MID[Math.floor(Math.random() * ZALGO_MID.length)];
      }
      if (down && Math.random() > 0.4) {
        result += ZALGO_DOWN[Math.floor(Math.random() * ZALGO_DOWN.length)];
      }
    }
  }

  return result;
}
