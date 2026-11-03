export interface ByteConversionResult {
  bytes: number;
  // Decimal (1000)
  kb: number;
  mb: number;
  gb: number;
  tb: number;
  // Binary (1024)
  kib: number;
  mib: number;
  gib: number;
  tib: number;
}

export type StorageUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'KiB' | 'MiB' | 'GiB' | 'TiB';

export function convertStorageBytes(value: number, fromUnit: StorageUnit): ByteConversionResult {
  const multipliers: Record<StorageUnit, number> = {
    B: 1,
    KB: 1e3,
    MB: 1e6,
    GB: 1e9,
    TB: 1e12,
    KiB: 1024,
    MiB: 1024 ** 2,
    GiB: 1024 ** 3,
    TiB: 1024 ** 4,
  };

  const bytes = Math.max(0, value) * (multipliers[fromUnit] || 1);

  return {
    bytes,
    kb: bytes / 1e3,
    mb: bytes / 1e6,
    gb: bytes / 1e9,
    tb: bytes / 1e12,
    kib: bytes / 1024,
    mib: bytes / (1024 ** 2),
    gib: bytes / (1024 ** 3),
    tib: bytes / (1024 ** 4),
  };
}
