import type { EngineResult } from '../../types/tool.ts';

export interface QueryParamPair {
  key: string;
  value: string;
}

export function encodeUrl(input: string, fullUrl = true): EngineResult<string> {
  try {
    if (fullUrl) {
      return { success: true, value: encodeURI(input) };
    }
    return { success: true, value: encodeURIComponent(input) };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'URL encode failed' };
  }
}

export function decodeUrl(input: string): EngineResult<string> {
  try {
    return { success: true, value: decodeURIComponent(input) };
  } catch (err) {
    return { success: false, error: 'Malformed URI sequence' };
  }
}

export function parseQueryParams(input: string): QueryParamPair[] {
  const pairs: QueryParamPair[] = [];
  try {
    let queryString = input;
    const qIndex = input.indexOf('?');
    if (qIndex !== -1) {
      queryString = input.substring(qIndex + 1);
    }
    const hashIndex = queryString.indexOf('#');
    if (hashIndex !== -1) {
      queryString = queryString.substring(0, hashIndex);
    }

    const searchParams = new URLSearchParams(queryString);
    searchParams.forEach((value, key) => {
      pairs.push({ key, value });
    });
  } catch {
    // fallback
  }
  return pairs;
}
