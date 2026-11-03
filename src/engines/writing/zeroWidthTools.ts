export interface InvisibleCharFinding {
  charName: string;
  unicode: string;
  count: number;
}

export const INVISIBLE_CHARS: { regex: RegExp; name: string; code: string }[] = [
  { regex: /\u200B/g, name: 'Zero-Width Space', code: 'U+200B' },
  { regex: /\u200C/g, name: 'Zero-Width Non-Joiner', code: 'U+200C' },
  { regex: /\u200D/g, name: 'Zero-Width Joiner', code: 'U+200D' },
  { regex: /\uFEFF/g, name: 'Zero-Width No-Break Space (BOM)', code: 'U+FEFF' },
  { regex: /\u00A0/g, name: 'Non-Breaking Space (NBSP)', code: 'U+00A0' },
  { regex: /\u200E/g, name: 'Left-to-Right Mark', code: 'U+200E' },
  { regex: /\u200F/g, name: 'Right-to-Left Mark', code: 'U+200F' },
  { regex: /\u00AD/g, name: 'Soft Hyphen', code: 'U+00AD' }
];

export function detectInvisibleChars(text: string): {
  hasInvisible: boolean;
  totalCount: number;
  findings: InvisibleCharFinding[];
  cleanedText: string;
} {
  if (!text) {
    return { hasInvisible: false, totalCount: 0, findings: [], cleanedText: '' };
  }

  const findings: InvisibleCharFinding[] = [];
  let totalCount = 0;
  let cleaned = text;

  for (const item of INVISIBLE_CHARS) {
    const matches = text.match(item.regex);
    if (matches && matches.length > 0) {
      findings.push({
        charName: item.name,
        unicode: item.code,
        count: matches.length
      });
      totalCount += matches.length;
      cleaned = cleaned.replace(item.regex, item.code === 'U+00A0' ? ' ' : '');
    }
  }

  return {
    hasInvisible: totalCount > 0,
    totalCount,
    findings,
    cleanedText: cleaned
  };
}
