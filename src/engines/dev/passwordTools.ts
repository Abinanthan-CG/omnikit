export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean; // e.g. 0, O, I, 1, l
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

const AMBIGUOUS = /[O0l1I]/g;

export function generatePassword(options: PasswordOptions): { password: string; entropyBits: number } {
  let pool = '';
  if (options.uppercase) pool += UPPERCASE;
  if (options.lowercase) pool += LOWERCASE;
  if (options.numbers) pool += NUMBERS;
  if (options.symbols) pool += SYMBOLS;

  if (options.excludeAmbiguous) {
    pool = pool.replace(AMBIGUOUS, '');
  }

  if (!pool) {
    return { password: '', entropyBits: 0 };
  }

  const length = Math.max(4, Math.min(128, options.length || 16));
  const randomBytes = new Uint8Array(length);

  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(randomBytes);
  } else {
    for (let i = 0; i < length; i++) {
      randomBytes[i] = Math.floor(Math.random() * 256);
    }
  }

  let result = '';
  for (let i = 0; i < length; i++) {
    result += pool[randomBytes[i] % pool.length];
  }

  // Entropy = length * log2(poolSize)
  const entropyBits = Math.round(length * Math.log2(pool.length));

  return { password: result, entropyBits };
}
