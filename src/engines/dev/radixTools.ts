export interface RadixConversions {
  decimal: string;
  hex: string;
  binary: string;
  octal: string;
  base36: string;
  isValid: boolean;
  bitLength: number;
}

export function convertRadix(value: string, fromRadix: number = 10): RadixConversions {
  if (!value || typeof value !== 'string') {
    return { decimal: '', hex: '', binary: '', octal: '', base36: '', isValid: false, bitLength: 0 };
  }

  const clean = value.trim().toLowerCase();
  let num: bigint;

  try {
    if (fromRadix === 16) {
      num = BigInt(`0x${clean.replace(/^0x/, '')}`);
    } else if (fromRadix === 2) {
      num = BigInt(`0b${clean.replace(/^0b/, '')}`);
    } else if (fromRadix === 8) {
      num = BigInt(`0o${clean.replace(/^0o/, '')}`);
    } else if (fromRadix === 10) {
      num = BigInt(clean);
    } else {
      // General radix parsing for numbers within safe integer range
      const parsed = parseInt(clean, fromRadix);
      if (isNaN(parsed)) throw new Error('Invalid number');
      num = BigInt(parsed);
    }
  } catch {
    return { decimal: '', hex: '', binary: '', octal: '', base36: '', isValid: false, bitLength: 0 };
  }

  const binStr = num >= 0n ? num.toString(2) : `-${(-num).toString(2)}`;
  const bitLength = num >= 0n ? binStr.length : binStr.length - 1;

  return {
    decimal: num.toString(10),
    hex: num >= 0n ? num.toString(16).toUpperCase() : `-${(-num).toString(16).toUpperCase()}`,
    binary: binStr,
    octal: num >= 0n ? num.toString(8) : `-${(-num).toString(8)}`,
    base36: num >= 0n ? num.toString(36).toUpperCase() : `-${(-num).toString(36).toUpperCase()}`,
    isValid: true,
    bitLength
  };
}
