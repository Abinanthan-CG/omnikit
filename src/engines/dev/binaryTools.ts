export function textToBinary(text: string, delimiter: string = ' '): string {
  if (!text) return '';
  const bytes = new TextEncoder().encode(text);
  const binArr: string[] = [];
  for (let i = 0; i < bytes.length; i++) {
    binArr.push(bytes[i].toString(2).padStart(8, '0'));
  }
  return binArr.join(delimiter);
}

export function binaryToText(binary: string): string {
  if (!binary) return '';
  const clean = binary.replace(/[^01]/g, ' ').trim().split(/\s+/).filter(Boolean);
  const bytes = new Uint8Array(clean.map(b => parseInt(b, 2)));
  return new TextDecoder().decode(bytes);
}
