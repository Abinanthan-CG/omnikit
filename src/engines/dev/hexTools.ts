export function textToHex(text: string, delimiter: string = ' ', prefix: string = ''): string {
  if (!text) return '';
  const bytes = new TextEncoder().encode(text);
  const hexArr: string[] = [];
  for (let i = 0; i < bytes.length; i++) {
    hexArr.push(prefix + bytes[i].toString(16).padStart(2, '0'));
  }
  return hexArr.join(delimiter);
}

export function hexToText(hex: string): string {
  if (!hex) return '';
  const clean = hex.replace(/0x/gi, '').replace(/[^0-9a-fA-F]/g, '');
  if (clean.length < 2) return '';
  const bytes: number[] = [];
  for (let i = 0; i < clean.length; i += 2) {
    const byte = parseInt(clean.substring(i, i + 2), 16);
    if (!isNaN(byte)) {
      bytes.push(byte);
    }
  }
  return new TextDecoder().decode(new Uint8Array(bytes));
}
