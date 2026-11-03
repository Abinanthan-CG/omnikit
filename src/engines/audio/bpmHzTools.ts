export interface BpmHzDivision {
  name: string;
  notes: string;
  factor: number;
  frequencyHz: number;
  periodMs: number;
}

export function calculateBpmToHz(bpm: number): {
  quarterHz: number;
  quarterMs: number;
  divisions: BpmHzDivision[];
} {
  const safeBpm = Math.max(1, bpm || 120);
  const quarterHz = safeBpm / 60;
  const quarterMs = 60000 / safeBpm;

  const standardDivisions: { name: string; notes: string; factor: number }[] = [
    { name: 'Whole Note (1/1)', notes: '4 beats', factor: 0.25 },
    { name: 'Half Note (1/2)', notes: '2 beats', factor: 0.5 },
    { name: 'Quarter Note (1/4)', notes: '1 beat', factor: 1.0 },
    { name: 'Eighth Note (1/8)', notes: '1/2 beat', factor: 2.0 },
    { name: 'Sixteenth Note (1/16)', notes: '1/4 beat', factor: 4.0 },
    { name: 'Thirty-Second Note (1/32)', notes: '1/8 beat', factor: 8.0 },
    { name: 'Quarter Triplet (1/4T)', notes: '2/3 beat', factor: 1.5 },
    { name: 'Eighth Triplet (1/8T)', notes: '1/3 beat', factor: 3.0 },
    { name: 'Sixteenth Triplet (1/16T)', notes: '1/6 beat', factor: 6.0 },
    { name: 'Dotted Quarter (1/4D)', notes: '1.5 beats', factor: 1 / 1.5 },
    { name: 'Dotted Eighth (1/8D)', notes: '0.75 beat', factor: 1 / 0.75 }
  ];

  const divisions: BpmHzDivision[] = standardDivisions.map((div) => {
    const freq = quarterHz * div.factor;
    const period = quarterMs / div.factor;
    return {
      name: div.name,
      notes: div.notes,
      factor: div.factor,
      frequencyHz: Math.round(freq * 1000) / 1000,
      periodMs: Math.round(period * 100) / 100
    };
  });

  return {
    quarterHz: Math.round(quarterHz * 1000) / 1000,
    quarterMs: Math.round(quarterMs * 100) / 100,
    divisions
  };
}
