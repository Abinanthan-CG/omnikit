export interface SanitizeReport {
  sanitizedHtml: string;
  removedTagsCount: number;
  removedScriptsCount: number;
  removedEventHandlersCount: number;
  cleanedText: string;
}

const DANGEROUS_TAGS = [
  'script',
  'iframe',
  'object',
  'embed',
  'applet',
  'link',
  'style',
  'base',
  'meta'
];

export function sanitizeHtml(rawHtml: string): SanitizeReport {
  if (!rawHtml || typeof rawHtml !== 'string') {
    return {
      sanitizedHtml: '',
      removedTagsCount: 0,
      removedScriptsCount: 0,
      removedEventHandlersCount: 0,
      cleanedText: ''
    };
  }

  let cleaned = rawHtml;
  let scriptsCount = 0;
  let dangerousTagsCount = 0;
  let eventHandlersCount = 0;

  // 1. Remove script tags and contents
  const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const scriptMatches = cleaned.match(scriptRegex);
  if (scriptMatches) {
    scriptsCount += scriptMatches.length;
    cleaned = cleaned.replace(scriptRegex, '');
  }

  // 2. Remove other dangerous tags and contents
  for (const tag of DANGEROUS_TAGS) {
    if (tag === 'script') continue;
    const tagRegex = new RegExp(`<${tag}\\b[^<]*(?:(?!<\\/${tag}>)<[^<]*)*<\\/${tag}>`, 'gi');
    const matches = cleaned.match(tagRegex);
    if (matches) {
      dangerousTagsCount += matches.length;
      cleaned = cleaned.replace(tagRegex, '');
    }
    // Also remove self-closing or lone tags
    const loneTagRegex = new RegExp(`<${tag}\\b[^>]*\\/?>`, 'gi');
    const loneMatches = cleaned.match(loneTagRegex);
    if (loneMatches) {
      dangerousTagsCount += loneMatches.length;
      cleaned = cleaned.replace(loneTagRegex, '');
    }
  }

  // 3. Remove inline event handlers like onclick, onload, onerror, etc.
  const eventRegex = /\s+on[a-zA-Z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi;
  const eventMatches = cleaned.match(eventRegex);
  if (eventMatches) {
    eventHandlersCount += eventMatches.length;
    cleaned = cleaned.replace(eventRegex, '');
  }

  // 4. Remove javascript: pseudo-protocols in href and src
  const jsProtoRegex = /(href|src)\s*=\s*(?:'javascript:[^']*'|"javascript:[^"]*")/gi;
  cleaned = cleaned.replace(jsProtoRegex, '$1="#"');

  // 5. Extract plain text content
  const plainText = cleaned
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return {
    sanitizedHtml: cleaned.trim(),
    removedTagsCount: dangerousTagsCount,
    removedScriptsCount: scriptsCount,
    removedEventHandlersCount: eventHandlersCount,
    cleanedText: plainText
  };
}
