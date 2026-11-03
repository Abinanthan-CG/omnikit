import type { EngineResult } from '../../types/tool.ts';

export interface Base64Options {
  urlSafe?: boolean;
}

export function encodeBase64(input: string, options: Base64Options = {}): EngineResult<string> {
  try {
    const bytes = new TextEncoder().encode(input);
    let binString = '';
    for (let i = 0; i < bytes.length; i++) {
      binString += String.fromCharCode(bytes[i]);
    }
    let b64 = btoa(binString);
    if (options.urlSafe) {
      b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    return { success: true, value: b64 };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Encoding failed' };
  }
}

export function decodeBase64(input: string, options: Base64Options = {}): EngineResult<string> {
  try {
    let clean = input.trim();
    if (options.urlSafe || clean.includes('-') || clean.includes('_')) {
      clean = clean.replace(/-/g, '+').replace(/_/g, '/');
      while (clean.length % 4 !== 0) {
        clean += '=';
      }
    }
    const binString = atob(clean);
    const bytes = new Uint8Array(binString.length);
    for (let i = 0; i < binString.length; i++) {
      bytes[i] = binString.charCodeAt(i);
    }
    const decoded = new TextDecoder().decode(bytes);
    return { success: true, value: decoded };
  } catch (err) {
    return { success: false, error: 'Invalid Base64 payload' };
  }
}
