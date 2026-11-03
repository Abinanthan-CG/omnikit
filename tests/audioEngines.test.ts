import { describe, it } from 'node:test';
import assert from 'node:assert';
import { calculateBpmTimings } from '../src/engines/audio/bpmCalculator.ts';

describe('BPM Delay & Reverb Engine', () => {
  it('calculates exact milliseconds for 120 BPM', () => {
    const res = calculateBpmTimings(120);
    assert.strictEqual(res.success, true);
    const timings = res.value!;
    // 60,000 / 120 = 500ms for quarter note
    assert.strictEqual(timings.notes.quarter.normal, 500);
    assert.strictEqual(timings.notes.quarter.dotted, 750);
    assert.ok(Math.abs(timings.notes.quarter.triplet - 333.33) < 0.1);
    assert.strictEqual(timings.notes.eighth.normal, 250);
    assert.strictEqual(timings.notes.whole.normal, 2000);
  });

  it('calculates reverb pre-delay and decay bar timings', () => {
    const res = calculateBpmTimings(120);
    assert.strictEqual(res.success, true);
    const timings = res.value!;
    assert.strictEqual(timings.reverb.oneBar, 2000);
    assert.strictEqual(timings.reverb.twoBars, 4000);
    assert.strictEqual(timings.reverb.fourBars, 8000);
  });

  it('rejects zero or negative BPM inputs', () => {
    assert.strictEqual(calculateBpmTimings(0).success, false);
    assert.strictEqual(calculateBpmTimings(-20).success, false);
    assert.strictEqual(calculateBpmTimings(Infinity).success, false);
    assert.ok(calculateBpmTimings(0).error);
  });
});
