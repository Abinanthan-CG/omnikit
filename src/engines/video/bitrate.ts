export interface FileSizeEstimate {
  megabytes: number;
  gigabytes: number;
  totalKilobits: number;
}

export interface RequiredBitrateEstimate {
  videoBitrateKbps: number;
  totalBitrateKbps: number;
}

export function estimateFileSize(
  durationSeconds: number,
  videoBitrateKbps: number,
  audioBitrateKbps = 128
): FileSizeEstimate {
  const safeDuration = Math.max(0, durationSeconds);
  const totalBitrate = Math.max(0, videoBitrateKbps) + Math.max(0, audioBitrateKbps);

  const totalKilobits = totalBitrate * safeDuration;
  const megabytes = totalKilobits / 8 / 1024;
  const gigabytes = megabytes / 1024;

  return {
    megabytes,
    gigabytes,
    totalKilobits,
  };
}

export function estimateRequiredBitrate(
  durationSeconds: number,
  targetFileSizeBytes: number, // in MB
  audioBitrateKbps = 128
): RequiredBitrateEstimate {
  const safeDuration = Math.max(1, durationSeconds);
  const totalKilobits = targetFileSizeBytes * 1024 * 8;
  const totalBitrateKbps = totalKilobits / safeDuration;
  const videoBitrateKbps = Math.max(0, totalBitrateKbps - audioBitrateKbps);

  return {
    videoBitrateKbps: Math.round(videoBitrateKbps),
    totalBitrateKbps: Math.round(totalBitrateKbps),
  };
}
