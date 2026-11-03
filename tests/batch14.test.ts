import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  hexToHsl,
  hslToHex,
  generateColorHarmonies,
  mixColors,
  generateNeumorphismCss,
  svgToDataUri,
  inspectSvgPath,
  calculateAspectPadding,
  deduplicateStrings,
  applyRot13,
  scrambleTypoglycemia,
  convertDecibelVoltages
} from '../src/engines/batch14Engines.ts';

describe('Batch 14: HSL & Color Harmonies', () => {
  it('converts HEX to HSL and back', () => {
    const [h, s, l] = hexToHsl('#ff0000');
    assert.strictEqual(h, 0);
    assert.strictEqual(s, 100);
    assert.strictEqual(l, 50);

    const backHex = hslToHex(h, s, l);
    assert.strictEqual(backHex.toLowerCase(), '#ff0000');
  });

  it('generates complementary and triadic harmonies', () => {
    const harmonies = generateColorHarmonies('#0000ff');
    assert.strictEqual(harmonies.complementary.length, 2);
    assert.strictEqual(harmonies.triadic.length, 3);
  });
});

describe('Batch 14: Color Mixer', () => {
  it('mixes black and white equally into mid gray', () => {
    const mixed = mixColors('#000000', '#ffffff', 50);
    assert.strictEqual(mixed.toLowerCase(), '#808080');
  });
});

describe('Batch 14: Neumorphism CSS', () => {
  it('generates dual light and dark box shadows', () => {
    const res = generateNeumorphismCss('#e0e0e0', 10, 20, 'flat');
    assert.ok(res.boxShadow.includes('10px 10px 20px'));
    assert.ok(res.boxShadow.includes('-10px -10px 20px'));
  });
});

describe('Batch 14: SVG to Data URI', () => {
  it('encodes svg into clean data URI', () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><circle r="5"/></svg>';
    const uri = svgToDataUri(svg);
    assert.ok(uri.startsWith('data:image/svg+xml,'));
    assert.ok(uri.includes('%3Ccircle') || uri.includes('<circle'));
  });
});

describe('Batch 14: SVG Path Inspector', () => {
  it('inspects M, C, and Z commands', () => {
    const d = 'M 10 10 C 20 20, 40 20, 50 10 Z';
    const info = inspectSvgPath(d);
    assert.strictEqual(info.totalCommands, 3);
    assert.strictEqual(info.commandCounts['M'], 1);
    assert.strictEqual(info.commandCounts['C'], 1);
    assert.strictEqual(info.commandCounts['Z'], 1);
  });
});

describe('Batch 14: Aspect Ratio Padding', () => {
  it('calculates 56.25% for 16:9 1920x1080', () => {
    const res = calculateAspectPadding(1920, 1080);
    assert.strictEqual(res.paddingTopPercent, 56.25);
    assert.strictEqual(res.ratioLabel, '16:9');
  });
});

describe('Batch 14: String Deduplicator', () => {
  it('removes duplicate items and sorts', () => {
    const input = 'apple\nbanana\nApple\norange\nbanana';
    const dedup = deduplicateStrings(input, { caseSensitive: false, sort: 'asc' });
    const items = dedup.split('\n');
    assert.strictEqual(items.length, 3);
    assert.strictEqual(items[0], 'apple');
    assert.strictEqual(items[1], 'banana');
    assert.strictEqual(items[2], 'orange');
  });
});

describe('Batch 14: ROT-13 & Caesar Cipher', () => {
  it('applies standard ROT-13 rotate and restore', () => {
    const orig = 'Hello World!';
    const rotated = applyRot13(orig, 13);
    assert.strictEqual(rotated, 'Uryyb Jbeyq!');
    assert.strictEqual(applyRot13(rotated, 13), orig);
  });
});

describe('Batch 14: Typoglycemia Scrambler', () => {
  it('preserves first and last letter of words', () => {
    const sentence = 'incredible engineering';
    const scrambled = scrambleTypoglycemia(sentence);
    const words = scrambled.split(' ');
    assert.strictEqual(words[0][0], 'i');
    assert.strictEqual(words[0][words[0].length - 1], 'e');
    assert.strictEqual(words[1][0], 'e');
    assert.strictEqual(words[1][words[1].length - 1], 'g');
  });
});

describe('Batch 14: Decibel Voltages', () => {
  it('converts 0.7746V to 0 dBu and 1.0V to 0 dBV', () => {
    const dBuZero = convertDecibelVoltages(0.7746);
    assert.strictEqual(dBuZero.dBu, 0);

    const dBVZero = convertDecibelVoltages(1.0);
    assert.strictEqual(dBVZero.dBV, 0);
  });
});
