export type SortMode = 'asc' | 'desc' | 'length-asc' | 'length-desc' | 'natural' | 'reverse';

export interface LineSorterOptions {
  mode: SortMode;
  dedupe?: boolean;
  stripEmpty?: boolean;
  caseSensitive?: boolean;
}

export function sortLines(text: string, options: LineSorterOptions = { mode: 'asc' }): string {
  let lines = text.split(/\r?\n/);

  if (options.stripEmpty) {
    lines = lines.filter(l => l.trim().length > 0);
  }

  if (options.dedupe) {
    if (options.caseSensitive) {
      lines = Array.from(new Set(lines));
    } else {
      const seen = new Set<string>();
      lines = lines.filter(line => {
        const lower = line.toLowerCase();
        if (seen.has(lower)) return false;
        seen.add(lower);
        return true;
      });
    }
  }

  switch (options.mode) {
    case 'asc':
      lines.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: options.caseSensitive ? 'case' : 'base' }));
      break;
    case 'desc':
      lines.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: options.caseSensitive ? 'case' : 'base' }));
      break;
    case 'length-asc':
      lines.sort((a, b) => a.length - b.length || a.localeCompare(b));
      break;
    case 'length-desc':
      lines.sort((a, b) => b.length - a.length || a.localeCompare(b));
      break;
    case 'natural':
      lines.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
      break;
    case 'reverse':
      lines.reverse();
      break;
  }

  return lines.join('\n');
}
