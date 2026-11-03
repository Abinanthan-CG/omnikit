export interface TempoMarking {
  name: string;
  minBpm: number;
  maxBpm: number;
  description: string;
}

export const TEMPO_MARKINGS: TempoMarking[] = [
  { name: 'Largo', minBpm: 40, maxBpm: 60, description: 'Broad, very slow and dignified' },
  { name: 'Adagio', minBpm: 66, maxBpm: 76, description: 'Slow and stately, at ease' },
  { name: 'Andante', minBpm: 76, maxBpm: 108, description: 'Walking pace, flowing gracefully' },
  { name: 'Moderato', minBpm: 108, maxBpm: 120, description: 'Moderately paced' },
  { name: 'Allegro', minBpm: 120, maxBpm: 156, description: 'Fast, quickly and bright' },
  { name: 'Vivace', minBpm: 156, maxBpm: 176, description: 'Lively and fast' },
  { name: 'Presto', minBpm: 168, maxBpm: 200, description: 'Very fast, rapid tempo' },
];

export function getTempoMarking(bpm: number): string {
  const match = TEMPO_MARKINGS.find(m => bpm >= m.minBpm && bpm <= m.maxBpm);
  return match ? `${match.name} (${match.description})` : bpm < 40 ? 'Larghissimo (extremely slow)' : 'Prestissimo (extremely fast)';
}

export function calculateMetronome(bpm: number, beatsPerBar: number = 4): {
  intervalMs: number;
  barDurationMs: number;
  tempoName: string;
} {
  const safeBpm = Math.max(20, Math.min(300, bpm || 120));
  const safeBeats = Math.max(1, Math.min(16, beatsPerBar || 4));

  const intervalMs = 60000 / safeBpm;
  const barDurationMs = intervalMs * safeBeats;

  return {
    intervalMs: Math.round(intervalMs * 100) / 100,
    barDurationMs: Math.round(barDurationMs * 10) / 10,
    tempoName: getTempoMarking(safeBpm)
  };
}
