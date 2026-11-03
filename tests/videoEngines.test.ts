import { describe, it } from 'node:test';
import assert from 'node:assert';
import { calculateTimecodeOperation, timecodeToFrames, framesToTimecode } from '../src/engines/video/timecode.ts';
import { calculateAspectRatio } from '../src/engines/video/aspectRatio.ts';

describe('Timecode Engine', () => {
  it('converts non-drop-frame timecode to frames at 24fps', () => {
    assert.strictEqual(timecodeToFrames('00:01:00:00', 24), 1440);
  });

  it('converts frames to timecode at 24fps', () => {
    assert.strictEqual(framesToTimecode(1440, 24), '00:01:00:00');
  });

  it('adds two timecodes correctly at 24fps', () => {
    const res = calculateTimecodeOperation('00:01:00:00', '+', '00:00:30:12', 24);
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.timecode, '00:01:30:12');
    assert.strictEqual(res.value?.frames, 2172);
  });

  it('subtracts two timecodes correctly', () => {
    const res = calculateTimecodeOperation('00:01:00:00', '-', '00:00:15:00', 24);
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.timecode, '00:00:45:00');
  });

  it('flags negative durations when subtracting larger timecode', () => {
    const res = calculateTimecodeOperation('00:00:10:00', '-', '00:00:15:00', 24);
    assert.strictEqual(res.success, false);
    assert.ok(res.error);
  });

  it('handles 29.97 drop-frame timecode rules', () => {
    // In drop frame, frame 00:01:00;00 doesn't exist, it drops frames 00 and 01 (starts at 02)
    const res = calculateTimecodeOperation('00:00:59;29', '+', '00:00:00;01', 29.97);
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.timecode, '00:01:00;02');
  });
});

describe('Aspect Ratio Engine', () => {
  it('calculates greatest common divisor aspect ratio for 1920x1080', () => {
    const res = calculateAspectRatio(1920, 1080);
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.ratioString, '16:9');
    assert.ok(Math.abs((res.value?.decimal ?? 0) - 1.777) < 0.01);
  });

  it('calculates 9:16 vertical video ratio for 1080x1920', () => {
    const res = calculateAspectRatio(1080, 1920);
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.ratioString, '9:16');
  });

  it('calculates letterbox padding inside a target 16:9 container', () => {
    const res = calculateAspectRatio(1920, 800, '16:9');
    assert.strictEqual(res.success, true);
    assert.ok((res.value?.letterboxPadding.top ?? 0) > 0);
    assert.strictEqual(res.value?.letterboxPadding.left, 0);
  });

  it('rejects invalid dimensions', () => {
    assert.strictEqual(calculateAspectRatio(0, 1080).success, false);
    assert.strictEqual(calculateAspectRatio(-100, 200).success, false);
  });
});
