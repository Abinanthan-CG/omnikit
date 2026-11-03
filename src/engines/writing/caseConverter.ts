import type { EngineResult } from '../../types/tool.ts';

export type SupportedCase = 'camel' | 'pascal' | 'kebab' | 'snake' | 'constant' | 'title' | 'sentence' | 'lower' | 'upper';

const MINOR_WORDS = new Set([
  'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'
]);

export function tokenizeWords(text: string): string[] {
  if (!text) return [];

  // Split on transition from lowercase to uppercase, or underscores, hyphens, spaces, and punctuation
  return text
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2')
    .split(/[\s_\-–—]+/)
    .map(w => w.replace(/[^\w]/g, ''))
    .filter(w => w.length > 0);
}

export function toCamelCase(words: string[]): string {
  if (words.length === 0) return '';
  const [first, ...rest] = words;
  return first.toLowerCase() + rest.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}

export function toPascalCase(words: string[]): string {
  return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}

export function toKebabCase(words: string[]): string {
  return words.map(w => w.toLowerCase()).join('-');
}

export function toSnakeCase(words: string[]): string {
  return words.map(w => w.toLowerCase()).join('_');
}

export function toConstantCase(words: string[]): string {
  return words.map(w => w.toUpperCase()).join('_');
}

export function toTitleCase(rawText: string): string {
  if (!rawText.trim()) return '';
  const words = rawText.trim().split(/\s+/);
  return words
    .map((word, idx) => {
      const lower = word.toLowerCase();
      if (idx > 0 && idx < words.length - 1 && MINOR_WORDS.has(lower)) {
        return lower;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export function toSentenceCase(rawText: string): string {
  if (!rawText) return '';
  return rawText
    .toLowerCase()
    .replace(/(^\s*|[.!?]\s+)([a-z])/g, (_, boundary, char) => boundary + char.toUpperCase());
}

export interface CaseVariants {
  camel: string;
  pascal: string;
  kebab: string;
  snake: string;
  constant: string;
  title: string;
  sentence: string;
  lower: string;
  upper: string;
}

export function getAllCaseVariants(text: string): CaseVariants {
  const words = tokenizeWords(text);
  return {
    camel: toCamelCase(words),
    pascal: toPascalCase(words),
    kebab: toKebabCase(words),
    snake: toSnakeCase(words),
    constant: toConstantCase(words),
    title: toTitleCase(text),
    sentence: toSentenceCase(text),
    lower: text.toLowerCase(),
    upper: text.toUpperCase(),
  };
}

export function convertCase(
  text: string,
  targetCase: SupportedCase
): EngineResult<string> {
  if (!text) {
    return { success: true, value: '' };
  }

  const words = tokenizeWords(text);
  let result = '';

  switch (targetCase) {
    case 'camel':
      result = toCamelCase(words);
      break;
    case 'pascal':
      result = toPascalCase(words);
      break;
    case 'kebab':
      result = toKebabCase(words);
      break;
    case 'snake':
      result = toSnakeCase(words);
      break;
    case 'constant':
      result = toConstantCase(words);
      break;
    case 'title':
      result = toTitleCase(text);
      break;
    case 'sentence':
      result = toSentenceCase(text);
      break;
    case 'lower':
      result = text.toLowerCase();
      break;
    case 'upper':
      result = text.toUpperCase();
      break;
    default:
      result = text;
  }

  return {
    success: true,
    value: result,
  };
}
