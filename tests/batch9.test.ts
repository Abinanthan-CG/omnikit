import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { analyzeIPv6, expandIPv6, compressIPv6 } from '../src/engines/dev/ipv6Tools.ts';
import { convertRadix } from '../src/engines/dev/radixTools.ts';
import { jsonToTypeScript } from '../src/engines/dev/jsonToTsTools.ts';
import { sanitizeHtml } from '../src/engines/dev/htmlSanitizeTools.ts';
import { splitGoldenRatio, generateGoldenScale } from '../src/engines/design/goldenRatioTools.ts';
import { calculateBoxModel } from '../src/engines/design/boxSizingTools.ts';
import { spellNato } from '../src/engines/writing/natoTools.ts';
import { generateFootnotes } from '../src/engines/writing/footnoteTools.ts';
import { calculateBpmToHz } from '../src/engines/audio/bpmHzTools.ts';
import { calculateMatte } from '../src/engines/video/letterboxTools.ts';

describe('Batch 9: IPv6 Address Engine', () => {
  it('expands compressed IPv6 addresses', () => {
    const exp = expandIPv6('2001:db8::1');
    assert.equal(exp, '2001:0db8:0000:0000:0000:0000:0000:0001');
  });

  it('compresses full IPv6 addresses', () => {
    const comp = compressIPv6('2001:0db8:0000:0000:0000:0000:0000:0001');
    assert.equal(comp, '2001:db8::1');
  });

  it('detects loopback and invalid IPv6', () => {
    const loop = analyzeIPv6('::1');
    assert.equal(loop.isValid, true);
    assert.equal(loop.addressType, 'Loopback (::1)');

    const bad = analyzeIPv6('192.168.1.1');
    assert.equal(bad.isValid, false);
  });
});

describe('Batch 9: Radix Multi-Base Converter', () => {
  it('converts decimal to hex, binary, octal, and base36', () => {
    const res = convertRadix('255', 10);
    assert.equal(res.hex, 'FF');
    assert.equal(res.binary, '11111111');
    assert.equal(res.octal, '377');
    assert.equal(res.decimal, '255');
  });

  it('converts hex to other bases', () => {
    const res = convertRadix('1A', 16);
    assert.equal(res.decimal, '26');
    assert.equal(res.binary, '11010');
  });
});

describe('Batch 9: JSON to TypeScript Generator', () => {
  it('generates interface from JSON object', () => {
    const json = JSON.stringify({ name: 'Omnikit', port: 3000, active: true });
    const ts = jsonToTypeScript(json, { rootInterfaceName: 'AppConfig' });
    assert.ok(ts.includes('export interface AppConfig {'));
    assert.ok(ts.includes('name: string;'));
    assert.ok(ts.includes('port: number;'));
    assert.ok(ts.includes('active: boolean;'));
  });
});

describe('Batch 9: HTML Sanitizer Engine', () => {
  it('strips dangerous script tags and event handlers', () => {
    const dirty = '<p>Hello <script>alert("xss")</script><b onclick="hack()">World</b></p>';
    const res = sanitizeHtml(dirty);
    assert.equal(res.removedScriptsCount, 1);
    assert.equal(res.removedEventHandlersCount, 1);
    assert.ok(!res.sanitizedHtml.includes('script'));
    assert.ok(!res.sanitizedHtml.includes('onclick'));
    assert.equal(res.cleanedText, 'Hello World');
  });
});

describe('Batch 9: Golden Ratio Engine', () => {
  it('splits dimensions by 1.618', () => {
    const split = splitGoldenRatio(1000);
    assert.equal(split.major, 618.03);
    assert.equal(split.minor, 381.97);
  });

  it('generates golden typography scale', () => {
    const scale = generateGoldenScale(16, 4);
    assert.equal(scale.length, 4);
    assert.equal(scale[0].valuePx, 16);
    assert.ok(scale[1].valuePx > 25);
  });
});

describe('Batch 9: CSS Box Sizing Engine', () => {
  it('calculates rendered size for border-box vs content-box', () => {
    const borderBox = calculateBoxModel(200, 100, 20, 5, 'border-box');
    assert.equal(borderBox.totalRenderedWidth, 200);
    assert.equal(borderBox.contentWidth, 150);

    const contentBox = calculateBoxModel(200, 100, 20, 5, 'content-box');
    assert.equal(contentBox.totalRenderedWidth, 250);
    assert.equal(contentBox.contentWidth, 200);
  });
});

describe('Batch 9: NATO Phonetic Alphabet Engine', () => {
  it('spells out letters using ICAO phonetic words', () => {
    const res = spellNato('SOS 123');
    assert.ok(res.formattedString.includes('Sierra Oscar Sierra'));
    assert.ok(res.formattedString.includes('One Two Three'));
  });
});

describe('Batch 9: Footnote Engine', () => {
  it('formats markdown footnotes section', () => {
    const res = generateFootnotes('Text with ref[^1].', [
      { id: '1', label: '1', text: 'Citation details' }
    ]);
    assert.ok(res.markdownDocument.includes('[^1]: Citation details'));
  });
});

describe('Batch 9: BPM to Hz Engine', () => {
  it('calculates quarter note frequency and period at 120 BPM', () => {
    const res = calculateBpmToHz(120);
    assert.equal(res.quarterHz, 2);
    assert.equal(res.quarterMs, 500);
    const eighth = res.divisions.find((d) => d.name.includes('Eighth Note'));
    assert.ok(eighth);
    assert.equal(eighth?.frequencyHz, 4);
    assert.equal(eighth?.periodMs, 250);
  });
});

describe('Batch 9: Video Letterbox Matte Engine', () => {
  it('calculates letterbox for 2.39:1 cinema footage in 16:9 container', () => {
    const matte = calculateMatte(239, 100, 1920, 1080);
    assert.equal(matte.type, 'letterbox');
    assert.ok(matte.topBottomBarPx > 0);
    assert.equal(matte.leftRightBarPx, 0);
  });

  it('calculates pillarbox for 4:3 SD footage in 16:9 container', () => {
    const matte = calculateMatte(4, 3, 1920, 1080);
    assert.equal(matte.type, 'pillarbox');
    assert.ok(matte.leftRightBarPx > 0);
    assert.equal(matte.topBottomBarPx, 0);
  });
});
