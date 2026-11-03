export interface UuidOptions {
  uppercase?: boolean;
  hyphens?: boolean;
}

export function generateUuids(count = 1, options: UuidOptions = {}): string[] {
  const quantity = Math.max(1, Math.min(count, 100));
  const results: string[] = [];

  for (let i = 0; i < quantity; i++) {
    let id: string;
    if (typeof globalThis.crypto?.randomUUID === 'function') {
      id = globalThis.crypto.randomUUID();
    } else {
      id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    if (options.hyphens === false) {
      id = id.replace(/-/g, '');
    }

    if (options.uppercase) {
      id = id.toUpperCase();
    }

    results.push(id);
  }

  return results;
}
