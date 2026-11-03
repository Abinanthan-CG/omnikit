const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function noteToMidi(noteName: string): number {
  const match = noteName.trim().match(/^([A-Ga-g][#b]?)(-?\d+)$/);
  if (!match) return 69; // default A4

  let note = match[1].toUpperCase();
  const octave = parseInt(match[2], 10);

  // Normalize flats to sharps
  const flatMap: Record<string, string> = {
    'DB': 'C#',
    'EB': 'D#',
    'GB': 'F#',
    'AB': 'G#',
    'BB': 'A#',
  };
  if (flatMap[note]) note = flatMap[note];

  const noteIndex = NOTE_NAMES.indexOf(note);
  if (noteIndex === -1) return 69;

  return (octave + 1) * 12 + noteIndex;
}

export function midiToFrequency(midi: number, a4 = 440): number {
  return a4 * Math.pow(2, (midi - 69) / 12);
}

export function noteToFrequency(noteName: string, a4 = 440): number {
  const midi = noteToMidi(noteName);
  return midiToFrequency(midi, a4);
}

export function frequencyToNearestNote(freq: number, a4 = 440): { note: string; cents: number; midi: number } {
  if (freq <= 0) return { note: 'A4', cents: 0, midi: 69 };

  const midiExact = 69 + 12 * Math.log2(freq / a4);
  const midiRounded = Math.round(midiExact);
  const cents = Math.round((midiExact - midiRounded) * 100);

  const noteIndex = ((midiRounded % 12) + 12) % 12;
  const octave = Math.floor(midiRounded / 12) - 1;
  const noteName = `${NOTE_NAMES[noteIndex]}${octave}`;

  return { note: noteName, cents, midi: midiRounded };
}
