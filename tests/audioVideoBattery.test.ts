import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { noteToFrequency, midiToFrequency, frequencyToNearestNote } from '../src/engines/audio/noteFrequency.ts';
import { calculateTapBpm } from '../src/engines/audio/tapTempo.ts';
import { estimateFileSize, estimateRequiredBitrate } from '../src/engines/video/bitrate.ts';
import { calculateSafeAreas } from '../src/engines/video/safeArea.ts';
import { convertFrameCount, calculateSpeedRatio } from '../src/engines/video/fpsConverter.ts';

describe('Note Frequency Engine', () => {
  it('calculates standard A4 frequency as 440Hz', () => {
    const freq = noteToFrequency('A4', 440);
    assert.equal(Math.round(freq), 440);
  });

  it('calculates C4 (Middle C) frequency correctly', () => {
    const freq = noteToFrequency('C4', 440);
    assert.equal(Math.round(freq * 10) / 10, 261.6);
  });

  it('calculates frequency from MIDI note 69 (A4)', () => {
    const freq = midiToFrequency(69, 440);
    assert.equal(Math.round(freq), 440);
  });

  it('finds nearest note from frequency', () => {
    const note = frequencyToNearestNote(440, 440);
    assert.equal(note.note, 'A4');
    assert.equal(note.cents, 0);
  });
});

describe('Tap Tempo Engine', () => {
  it('calculates BPM accurately from steady interval timestamps', () => {
    // 500ms intervals = 120 BPM
    const taps = [1000, 1500, 2000, 2500];
    const bpm = calculateTapBpm(taps);
    assert.equal(Math.round(bpm), 120);
  });

  it('returns 0 when fewer than 2 taps are present', () => {
    assert.equal(calculateTapBpm([]), 0);
    assert.equal(calculateTapBpm([1000]), 0);
  });
});

describe('Bitrate & Storage Engine', () => {
  it('estimates file size from duration and bitrate', () => {
    // 60 seconds at 8000 kbps video + 128 kbps audio
    const res = estimateFileSize(60, 8000, 128);
    // (8128 kbps * 60s) / 8 / 1024 = ~59.53 MB
    assert.equal(Math.round(res.megabytes * 10) / 10, 59.5);
  });

  it('estimates required video bitrate to hit target file size', () => {
    // Target 25MB for 60s video with 128kbps audio
    const res = estimateRequiredBitrate(60, 25, 128);
    assert.ok(res.videoBitrateKbps > 0);
  });
});

describe('Video Safe Area Engine', () => {
  it('calculates action and title safe rectangles for 1920x1080', () => {
    const safe = calculateSafeAreas(1920, 1080);
    assert.equal(safe.actionSafe.width, 1728); // 90%
    assert.equal(safe.actionSafe.height, 972);  // 90%
    assert.equal(safe.titleSafe.width, 1536);  // 80%
    assert.equal(safe.titleSafe.height, 864);   // 80%
  });
});

describe('Frame Rate Converter Engine', () => {
  it('scales frame counts correctly between frame rates', () => {
    // 24 frames at 24fps = 1 second = 60 frames at 60fps
    const frames = convertFrameCount(24, 24, 60);
    assert.equal(frames, 60);
  });

  it('calculates speed percentage difference', () => {
    // 24fps conform to 25fps = 4.16% speedup (PAL speedup)
    const ratio = calculateSpeedRatio(24, 25);
    assert.equal(Math.round(ratio.speedPercent * 10) / 10, 104.2);
  });
});
