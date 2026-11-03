export function calculateTapBpm(tapTimestamps: number[], maxTimeoutMs = 2500): number {
  if (tapTimestamps.length < 2) return 0;

  // Filter out gaps exceeding timeout
  const intervals: number[] = [];
  for (let i = 1; i < tapTimestamps.length; i++) {
    const diff = tapTimestamps[i] - tapTimestamps[i - 1];
    if (diff > 0 && diff <= maxTimeoutMs) {
      intervals.push(diff);
    }
  }

  if (intervals.length === 0) return 0;

  // Take moving average of recent intervals (up to last 8)
  const recentIntervals = intervals.slice(-8);
  const avgIntervalMs = recentIntervals.reduce((sum, val) => sum + val, 0) / recentIntervals.length;

  if (avgIntervalMs <= 0) return 0;

  const bpm = 60000 / avgIntervalMs;
  return Math.round(bpm * 10) / 10;
}
