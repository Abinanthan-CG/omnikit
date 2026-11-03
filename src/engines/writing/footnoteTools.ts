export interface FootnoteEntry {
  id: string;
  label: string;
  text: string;
}

export function generateFootnotes(bodyText: string, footnotes: FootnoteEntry[]): {
  markdownDocument: string;
  footnoteSection: string;
} {
  const cleanBody = (bodyText || '').trim();
  const validNotes = footnotes.filter((fn) => fn.id && fn.text);

  const formattedNotes = validNotes
    .map((fn) => `[^${fn.label || fn.id}]: ${fn.text.trim()}`)
    .join('\n\n');

  const doc = formattedNotes
    ? `${cleanBody}\n\n---\n\n### References\n\n${formattedNotes}`
    : cleanBody;

  return {
    markdownDocument: doc,
    footnoteSection: formattedNotes
  };
}
