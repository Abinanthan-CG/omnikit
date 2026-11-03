const DEFAULT_ALPHABET = 'useandom-26T1983_40STAkExportCycleImvxypjhgqwb9ZEF_57hIJKLuVWX';

export function generateNanoid(size: number = 21, alphabet: string = DEFAULT_ALPHABET): string {
  const safeSize = Math.max(4, Math.min(128, size || 21));
  const alpha = alphabet && alphabet.length >= 2 ? alphabet : DEFAULT_ALPHABET;

  const bytes = new Uint8Array(safeSize);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < safeSize; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }

  let id = '';
  for (let i = 0; i < safeSize; i++) {
    id += alpha[bytes[i] % alpha.length];
  }
  return id;
}

export function generateBatchNanoids(count: number = 5, size: number = 21, alphabet?: string): string[] {
  const safeCount = Math.max(1, Math.min(50, count || 5));
  const result: string[] = [];
  for (let i = 0; i < safeCount; i++) {
    result.push(generateNanoid(size, alphabet));
  }
  return result;
}
