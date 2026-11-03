import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { noteToFrequency, frequencyToNearestNote, noteToMidi } from '../../engines/audio/noteFrequency';

export const NoteFrequencyView: React.FC = () => {
  const [noteName, setNoteName] = useState('A4');
  const [a4Base, setA4Base] = useState(440);

  const freq = noteToFrequency(noteName, a4Base);
  const midi = noteToMidi(noteName);
  const nearest = frequencyToNearestNote(freq, a4Base);

  const COMMON_NOTES = ['C3', 'E3', 'G3', 'A3', 'C4', 'E4', 'G4', 'A4', 'C5'];

  return (
    <ToolShell
      title="Musical Note to Frequency (Hz)"
      category="audio"
      description="Convert between musical notes, MIDI numbers, and frequencies with custom A4 concert pitch tuning."
      icon="🎹"
      onReset={() => {
        setNoteName('A4');
        setA4Base(440);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Musical Note (e.g. C4, F#3, Bb5)</label>
            <input
              type="text"
              value={noteName}
              onChange={(e) => setNoteName(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono focus:outline-none focus:border-emerald-500 uppercase"
            />
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {COMMON_NOTES.map(n => (
                <button
                  key={n}
                  onClick={() => setNoteName(n)}
                  className="px-2 py-0.5 text-xs bg-neutral-900 border border-neutral-800 rounded hover:border-neutral-700 text-neutral-300 font-mono"
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Concert Pitch Tuning (A4 = {a4Base} Hz)</label>
            <div className="flex gap-2">
              {[432, 440, 442, 444].map(tuning => (
                <button
                  key={tuning}
                  onClick={() => setA4Base(tuning)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors ${
                    a4Base === tuning
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                  }`}
                >
                  {tuning} Hz
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-neutral-400">Exact Frequency</span>
              <CopyButton text={`${(Math.round(freq * 100) / 100).toFixed(2)} Hz`} />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400">
              {(Math.round(freq * 100) / 100).toFixed(2)} <span className="text-sm font-normal text-neutral-500">Hz</span>
            </div>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-neutral-400">MIDI Note Number</span>
              <CopyButton text={midi.toString()} />
            </div>
            <div className="text-2xl font-bold font-mono text-neutral-100">
              {midi}
            </div>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg">
            <div className="text-xs text-neutral-400 mb-1">Cents Deviation</div>
            <div className="text-2xl font-bold font-mono text-neutral-300">
              {nearest.cents > 0 ? `+${nearest.cents}` : nearest.cents} <span className="text-sm font-normal text-neutral-500">cents</span>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
