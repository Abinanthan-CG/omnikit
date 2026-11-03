export interface IntervalRatio {
  name: string;
  semitones: number;
  frequencyHz: number;
  ratio: number;
}

export interface ChordFormula {
  name: string;
  semitones: number[];
  notes: { name: string; frequencyHz: number }[];
}

export const INTERVAL_NAMES = [
  'Unison', 'Minor 2nd', 'Major 2nd', 'Minor 3rd', 'Major 3rd',
  'Perfect 4th', 'Tritone', 'Perfect 5th', 'Minor 6th', 'Major 6th',
  'Minor 7th', 'Major 7th', 'Octave'
];

export function calculateIntervals(rootHz: number): IntervalRatio[] {
  const safeRoot = Math.max(10, rootHz || 440);
  return INTERVAL_NAMES.map((name, semitones) => {
    const ratio = Math.pow(2, semitones / 12);
    const freq = safeRoot * ratio;
    return {
      name,
      semitones,
      frequencyHz: Math.round(freq * 100) / 100,
      ratio: Math.round(ratio * 1000) / 1000
    };
  });
}

export function calculateChordFrequencies(rootHz: number): ChordFormula[] {
  const safeRoot = Math.max(10, rootHz || 440);

  const chords = [
    { name: 'Major Triad', semitones: [0, 4, 7] },
    { name: 'Minor Triad', semitones: [0, 3, 7] },
    { name: 'Dominant 7th', semitones: [0, 4, 7, 10] },
    { name: 'Major 7th', semitones: [0, 4, 7, 11] },
    { name: 'Minor 7th', semitones: [0, 3, 7, 10] },
    { name: 'Diminished Triad', semitones: [0, 3, 6] }
  ];

  return chords.map(ch => ({
    name: ch.name,
    semitones: ch.semitones,
    notes: ch.semitones.map(semi => ({
      name: INTERVAL_NAMES[semi] || `+${semi} semitones`,
      frequencyHz: Math.round(safeRoot * Math.pow(2, semi / 12) * 100) / 100
    }))
  }));
}
