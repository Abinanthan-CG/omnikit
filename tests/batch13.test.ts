import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  convertSrtToVtt,
  convertVttToSrt,
  generateFfmpegCommand,
  calculateTimecodeDrift,
  calculateSensorCrop,
  calculateAnamorphicDeSqueeze,
  calculateChromaSubsampling,
  getDtmfFrequencies,
  getScaleNotes,
  calculateBinauralFrequencies,
  generateNoiseSamples
} from '../src/engines/batch13Engines.ts';

describe('Batch 13: SRT ⇄ VTT Subtitles', () => {
  it('converts SRT to WebVTT with periods', () => {
    const srt = '1\n00:00:01,234 --> 00:00:04,567\nHello World';
    const vtt = convertSrtToVtt(srt);
    assert.ok(vtt.startsWith('WEBVTT'));
    assert.ok(vtt.includes('00:00:01.234 --> 00:00:04.567'));
  });

  it('converts WebVTT back to SRT with commas', () => {
    const vtt = 'WEBVTT\n\n1\n00:00:01.234 --> 00:00:04.567\nHello World';
    const srt = convertVttToSrt(vtt);
    assert.ok(!srt.includes('WEBVTT'));
    assert.ok(srt.includes('00:00:01,234 --> 00:00:04,567'));
  });
});

describe('Batch 13: FFmpeg Command Generator', () => {
  it('generates compress command with crf', () => {
    const cmd = generateFfmpegCommand({
      input: 'sample.mov',
      output: 'sample.mp4',
      task: 'compress',
      crf: 20
    });
    assert.ok(cmd.includes('ffmpeg -i "sample.mov"'));
    assert.ok(cmd.includes('-crf 20'));
  });

  it('generates extract audio command', () => {
    const cmd = generateFfmpegCommand({
      input: 'video.mp4',
      output: 'audio.mp3',
      task: 'extract-audio'
    });
    assert.ok(cmd.includes('-vn -c:a libmp3lame'));
  });
});

describe('Batch 13: Timecode Drift Calculator', () => {
  it('calculates 29.97 NDF drift over 60 minutes', () => {
    const drift = calculateTimecodeDrift(60);
    assert.strictEqual(drift.ndfFrames, 108000);
    assert.strictEqual(drift.dfFrames, 107892);
    assert.strictEqual(drift.frameDifference, 108);
    assert.ok(drift.timeDiscrepancyMs > 3500);
  });
});

describe('Batch 13: Sensor Crop Factor', () => {
  it('calculates 35mm equivalent for MFT (2.0x)', () => {
    const res = calculateSensorCrop(25, 1.4, 'mft');
    assert.strictEqual(res.equivFocalLength, 50);
    assert.strictEqual(res.equivAperture, 2.8);
    assert.strictEqual(res.cropFactor, 2.0);
  });
});

describe('Batch 13: Anamorphic De-Squeeze', () => {
  it('calculates 2x squeeze on 4:3 1920x1440', () => {
    const res = calculateAnamorphicDeSqueeze(1920, 1440, 2.0);
    assert.strictEqual(res.deSqueezedWidth, 3840);
    assert.strictEqual(res.deSqueezedHeight, 1440);
    assert.strictEqual(res.aspectRatioDecimal, 2.67);
  });
});

describe('Batch 13: Chroma Subsampling', () => {
  it('calculates 50% savings for 4:2:0 distribution', () => {
    const res = calculateChromaSubsampling('4:2:0');
    assert.strictEqual(res.chromaPercentage, 25);
    assert.strictEqual(res.dataRateSavingsPercent, 50);
  });
});

describe('Batch 13: DTMF Frequencies', () => {
  it('returns valid dual tones for key 5 and key *', () => {
    assert.deepStrictEqual(getDtmfFrequencies('5'), [770, 1336]);
    assert.deepStrictEqual(getDtmfFrequencies('*'), [941, 1209]);
    assert.strictEqual(getDtmfFrequencies('Z'), null);
  });
});

describe('Batch 13: Musical Scales', () => {
  it('generates C Major and A Minor scale notes', () => {
    const cMaj = getScaleNotes('C', 'Major (Ionian)');
    assert.deepStrictEqual(cMaj, ['C', 'D', 'E', 'F', 'G', 'A', 'B']);

    const aMin = getScaleNotes('A', 'Natural Minor (Aeolian)');
    assert.deepStrictEqual(aMin, ['A', 'B', 'C', 'D', 'E', 'F', 'G']);
  });
});

describe('Batch 13: Binaural Beat Frequencies', () => {
  it('calculates Alpha wave differential', () => {
    const res = calculateBinauralFrequencies(200, 'alpha');
    assert.strictEqual(res.baseHz, 200);
    assert.strictEqual(res.diffHz, 10);
    assert.strictEqual(res.leftHz, 200);
    assert.strictEqual(res.rightHz, 210);
  });
});

describe('Batch 13: Noise Sample Generator', () => {
  it('generates non-empty Float32Array noise buffers', () => {
    const white = generateNoiseSamples('white', 1000);
    const pink = generateNoiseSamples('pink', 1000);
    const brown = generateNoiseSamples('brown', 1000);

    assert.strictEqual(white.length, 1000);
    assert.strictEqual(pink.length, 1000);
    assert.strictEqual(brown.length, 1000);
    assert.ok(white.some((v) => v !== 0));
  });
});
