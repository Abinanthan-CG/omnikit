export interface AffixOptions {
  prefix: string;
  suffix: string;
  numberLines: boolean;
  trimLines: boolean;
  skipEmpty: boolean;
}

export function applyAffixes(text: string, options: AffixOptions): string {
  if (!text) return '';

  const lines = text.split(/\r?\n/);
  const result: string[] = [];
  let lineCounter = 1;

  for (const rawLine of lines) {
    const line = options.trimLines ? rawLine.trim() : rawLine;
    if (options.skipEmpty && !line) continue;

    let modified = line;
    if (options.numberLines) {
      modified = `${lineCounter}. ${modified}`;
      lineCounter++;
    }

    modified = `${options.prefix}${modified}${options.suffix}`;
    result.push(modified);
  }

  return result.join('\n');
}
