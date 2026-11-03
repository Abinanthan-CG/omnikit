export interface RegexMatch {
  index: number;
  match: string;
  groups: string[];
}

export interface RegexTestResult {
  isValid: boolean;
  error?: string;
  matches: RegexMatch[];
  count: number;
  executionTimeMs: number;
}

export function testRegex(pattern: string, flags: string, text: string): RegexTestResult {
  if (!pattern) {
    return { isValid: true, matches: [], count: 0, executionTimeMs: 0 };
  }

  const start = performance.now();
  try {
    const rx = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
    const matches: RegexMatch[] = [];
    let match: RegExpExecArray | null;

    // Guard against catastrophic infinite zero-width loops
    let loops = 0;
    while ((match = rx.exec(text)) !== null && loops < 1000) {
      loops++;
      matches.push({
        index: match.index,
        match: match[0],
        groups: match.slice(1)
      });
      if (match.index === rx.lastIndex) {
        rx.lastIndex++;
      }
    }

    const elapsed = performance.now() - start;
    return {
      isValid: true,
      matches,
      count: matches.length,
      executionTimeMs: Math.round(elapsed * 100) / 100
    };
  } catch (err) {
    return {
      isValid: false,
      error: (err as Error).message,
      matches: [],
      count: 0,
      executionTimeMs: 0
    };
  }
}
