export type MacFormat = 'colon' | 'hyphen' | 'dot' | 'raw';

export function generateRandomMac(): string[] {
  const bytes: string[] = [];
  for (let i = 0; i < 6; i++) {
    const val = Math.floor(Math.random() * 256);
    bytes.push(val.toString(16).padStart(2, '0').toUpperCase());
  }
  // Ensure unicast and locally administered
  const firstByte = parseInt(bytes[0], 16);
  bytes[0] = ((firstByte & 0xFE) | 0x02).toString(16).padStart(2, '0').toUpperCase();
  return bytes;
}

export function formatMacAddress(mac: string | string[], format: MacFormat = 'colon'): string {
  const cleanHex = Array.isArray(mac)
    ? mac.join('')
    : mac.replace(/[^0-9a-fA-F]/g, '');

  if (cleanHex.length < 12) return cleanHex;

  const hex12 = cleanHex.slice(0, 12).toUpperCase();
  const bytes = [
    hex12.slice(0, 2),
    hex12.slice(2, 4),
    hex12.slice(4, 6),
    hex12.slice(6, 8),
    hex12.slice(8, 10),
    hex12.slice(10, 12)
  ];

  switch (format) {
    case 'hyphen':
      return bytes.join('-');
    case 'dot':
      return `${bytes[0]}${bytes[1]}.${bytes[2]}${bytes[3]}.${bytes[4]}${bytes[5]}`.toLowerCase();
    case 'raw':
      return hex12;
    case 'colon':
    default:
      return bytes.join(':');
  }
}
