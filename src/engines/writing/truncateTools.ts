export interface TruncateOptions {
  maxLength: number;
  byWords: boolean;
  ellipsis: string;
}

export function truncateText(text: string, options: TruncateOptions): string {
  if (!text) return '';
  const max = Math.max(1, options.maxLength || 50);
  const ellipsis = options.ellipsis ?? '...';

  if (text.length <= max) return text;

  if (!options.byWords) {
    const cut = Math.max(0, max - ellipsis.length);
    return text.slice(0, cut) + ellipsis;
  }

  // Word boundary truncation
  const words = text.split(/\s+/);
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if ((candidate + ellipsis).length <= max) {
      current = candidate;
    } else {
      break;
    }
  }

  return current ? current + ellipsis : text.slice(0, Math.max(1, max - ellipsis.length)) + ellipsis;
}
