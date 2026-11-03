const ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const REVERSE_ENTITY_MAP: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&nbsp;': ' ',
};

export function encodeHtmlEntities(input: string): string {
  return input.replace(/[&<>"']/g, match => ENTITY_MAP[match] || match);
}

export function decodeHtmlEntities(input: string): string {
  let output = input.replace(/&(amp|lt|gt|quot|apos|#39|nbsp);/g, match => REVERSE_ENTITY_MAP[match] || match);
  // Decode decimal entities &#65;
  output = output.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
  // Decode hex entities &#x41;
  output = output.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  return output;
}
