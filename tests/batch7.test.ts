import { describe, it } from 'node:test';
import assert from 'node:assert';
import { searchPorts } from '../src/engines/dev/portTools.ts';
import { filterHttpStatus } from '../src/engines/dev/httpStatusTools.ts';
import { generateSchemaFromJson } from '../src/engines/dev/schemaTools.ts';
import { filterGitRecipes } from '../src/engines/dev/gitTools.ts';
import { generateFilterCss, DEFAULT_FILTER_CONFIG } from '../src/engines/design/filterTools.ts';
import { generateFlexboxCss } from '../src/engines/design/flexboxTools.ts';
import { calculateWordFrequencies } from '../src/engines/writing/wordCloudTools.ts';
import { applyAffixes } from '../src/engines/writing/affixTools.ts';
import { calculateIntervals, calculateChordFrequencies } from '../src/engines/audio/intervalTools.ts';
import { calculateAov, SENSOR_SIZES } from '../src/engines/video/aovTools.ts';

describe('Batch 7: Port Lookup Engine', () => {
  it('finds HTTP port 80 and HTTPS port 443', () => {
    const p80 = searchPorts('80');
    assert.ok(p80.some(p => p.port === 80));
    const p443 = searchPorts('https');
    assert.ok(p443.some(p => p.port === 443));
  });
});

describe('Batch 7: HTTP Status Codes Engine', () => {
  it('filters 404 Not Found and 200 OK', () => {
    const notFound = filterHttpStatus('404');
    assert.strictEqual(notFound.length, 1);
    assert.strictEqual(notFound[0].message, 'Not Found');
    const successList = filterHttpStatus('', '2xx');
    assert.ok(successList.length >= 4);
  });
});

describe('Batch 7: JSON Schema Generator Engine', () => {
  it('infers schema from object with string, number, and array', () => {
    const raw = JSON.stringify({ id: 1, name: 'Alice', tags: ['admin'] });
    const schemaStr = generateSchemaFromJson(raw);
    const schema = JSON.parse(schemaStr);
    assert.strictEqual(schema.type, 'object');
    assert.strictEqual(schema.properties.id.type, 'integer');
    assert.strictEqual(schema.properties.name.type, 'string');
    assert.strictEqual(schema.properties.tags.type, 'array');
  });
});

describe('Batch 7: Git Cheat Sheet Engine', () => {
  it('searches for undo and commit recipes', () => {
    const undoList = filterGitRecipes('undo');
    assert.ok(undoList.length >= 2);
    assert.ok(undoList.some(r => r.command.includes('reset')));
  });
});

describe('Batch 7: CSS Filter Effects Engine', () => {
  it('generates filter CSS string for blur and brightness', () => {
    const res = generateFilterCss({
      ...DEFAULT_FILTER_CONFIG,
      blurPx: 5,
      brightnessPercent: 120
    });
    assert.strictEqual(res.fullCss, 'filter: blur(5px) brightness(120%);');
  });
});

describe('Batch 7: CSS Flexbox Engine', () => {
  it('generates flex-col and justify-center CSS & Tailwind classes', () => {
    const res = generateFlexboxCss({
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'nowrap',
      gapPx: 16
    });
    assert.ok(res.cssRules.includes('flex-direction: column;'));
    assert.ok(res.cssRules.includes('justify-content: center;'));
    assert.ok(res.tailwindClasses.includes('flex flex-col justify-center items-center'));
  });
});

describe('Batch 7: Word Frequency Engine', () => {
  it('calculates word frequencies ignoring stop words', () => {
    const text = 'apple banana apple orange apple banana';
    const freqs = calculateWordFrequencies(text, true);
    assert.strictEqual(freqs[0].word, 'apple');
    assert.strictEqual(freqs[0].count, 3);
    assert.strictEqual(freqs[1].word, 'banana');
    assert.strictEqual(freqs[1].count, 2);
  });
});

describe('Batch 7: Affix Tool Engine', () => {
  it('applies prefixes, suffixes, and line numbers', () => {
    const text = 'item1\nitem2';
    const res = applyAffixes(text, {
      prefix: '<li>',
      suffix: '</li>',
      numberLines: false,
      trimLines: true,
      skipEmpty: true
    });
    assert.strictEqual(res, '<li>item1</li>\n<li>item2</li>');
  });
});

describe('Batch 7: Musical Intervals Engine', () => {
  it('calculates 880 Hz for octave of A4 (440 Hz)', () => {
    const intervals = calculateIntervals(440);
    const octave = intervals.find(i => i.name === 'Octave');
    assert.ok(octave);
    assert.strictEqual(octave?.frequencyHz, 880);
  });

  it('calculates major triad chord notes', () => {
    const chords = calculateChordFrequencies(440);
    const maj = chords.find(c => c.name === 'Major Triad');
    assert.ok(maj);
    assert.strictEqual(maj?.notes.length, 3);
  });
});

describe('Batch 7: Angle of View (AoV) Engine', () => {
  it('calculates 50mm on Full Frame horizontal AoV around 39.6 deg', () => {
    const fullFrame = SENSOR_SIZES[0];
    const res = calculateAov(50, fullFrame);
    assert.strictEqual(res.horizontalAovDeg, 39.6);
    assert.strictEqual(res.diagonalMm, 43.3);
  });
});
