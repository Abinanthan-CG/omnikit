import { describe, it } from 'node:test';
import assert from 'node:assert';
import { formatSql } from '../src/engines/dev/sqlTools.ts';
import { parseUserAgent } from '../src/engines/dev/uaTools.ts';
import { generateAsciiBanner } from '../src/engines/dev/asciiTools.ts';
import { testRegex } from '../src/engines/dev/regexTools.ts';
import { calculateClamp } from '../src/engines/design/clampTools.ts';
import { generateAspectRatioCss } from '../src/engines/design/aspectRatioCssTools.ts';
import { generateMarkdownTable } from '../src/engines/writing/tableTools.ts';
import { calculateReadability, countSyllablesInWord } from '../src/engines/writing/readabilityTools.ts';
import { calculateShutter } from '../src/engines/video/shutterTools.ts';
import { estimateRecordTime } from '../src/engines/video/recordTimeTools.ts';

describe('Batch 4: SQL Formatter Engine', () => {
  it('formats SQL query with uppercase clauses', () => {
    const raw = 'select id, name, email from users where active = 1 order by id desc';
    const formatted = formatSql(raw);
    assert.ok(formatted.includes('SELECT'));
    assert.ok(formatted.includes('FROM users'));
    assert.ok(formatted.includes('WHERE active = 1'));
    assert.ok(formatted.includes('ORDER BY id desc'));
  });
});

describe('Batch 4: User Agent Parser Engine', () => {
  it('parses Chrome on Windows User Agent', () => {
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const res = parseUserAgent(ua);
    assert.strictEqual(res.browser.name, 'Google Chrome');
    assert.strictEqual(res.os.name, 'Windows');
    assert.strictEqual(res.os.version, '10 / 11');
    assert.strictEqual(res.device.type, 'desktop');
  });

  it('detects mobile device for iPhone', () => {
    const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
    const res = parseUserAgent(ua);
    assert.strictEqual(res.os.name, 'iOS');
    assert.strictEqual(res.browser.name, 'Apple Safari');
    assert.strictEqual(res.device.type, 'mobile');
  });
});

describe('Batch 4: ASCII Banner Generator Engine', () => {
  it('generates multi-line ASCII banner for text', () => {
    const banner = generateAsciiBanner('HI');
    const lines = banner.split('\n');
    assert.strictEqual(lines.length, 5);
    assert.ok(banner.includes('█'));
  });

  it('supports box style', () => {
    const banner = generateAsciiBanner('A', 'box');
    assert.ok(banner.includes('#'));
  });
});

describe('Batch 4: RegEx Tester Engine', () => {
  it('finds all regex matches with groups and indices', () => {
    const text = 'Order 101 and Order 202 shipped';
    const res = testRegex('Order (\\d+)', 'g', text);
    assert.strictEqual(res.isValid, true);
    assert.strictEqual(res.count, 2);
    assert.strictEqual(res.matches[0].groups[0], '101');
    assert.strictEqual(res.matches[1].groups[0], '202');
  });

  it('catches invalid regex syntax gracefully', () => {
    const res = testRegex('[unclosed-bracket', 'g', 'sample');
    assert.strictEqual(res.isValid, false);
    assert.ok(res.error);
  });
});

describe('Batch 4: CSS Clamp() Engine', () => {
  it('calculates clamp formula between 320px and 1280px', () => {
    const res = calculateClamp({
      minWidth: 320,
      maxWidth: 1280,
      minSize: 16,
      maxSize: 32,
      rootFontSize: 16
    });
    assert.strictEqual(res.minRem, '1rem');
    assert.strictEqual(res.maxRem, '2rem');
    assert.ok(res.clampCss.startsWith('clamp(1rem,'));
    assert.ok(res.clampCss.endsWith('2rem)'));
  });
});

describe('Batch 4: CSS Aspect Ratio Rule Engine', () => {
  it('generates 16:9 modern and padding-top CSS', () => {
    const res = generateAspectRatioCss(1920, 1080);
    assert.strictEqual(res.width, 16);
    assert.strictEqual(res.height, 9);
    assert.strictEqual(res.modernCss, 'aspect-ratio: 16 / 9;');
    assert.strictEqual(res.paddingPercent, '56.25%');
    assert.strictEqual(res.tailwindClass, 'aspect-video');
  });
});

describe('Batch 4: Markdown Table Generator Engine', () => {
  it('generates aligned Markdown table', () => {
    const table = generateMarkdownTable({
      headers: ['Name', 'Role', 'Status'],
      alignments: ['left', 'center', 'right'],
      rows: [
        ['Alice', 'Engineer', 'Active'],
        ['Bob', 'Designer', 'Pending']
      ]
    });
    assert.ok(table.includes('| Name'));
    assert.ok(table.includes('| :---'));
    assert.ok(table.includes(': |'));
    assert.ok(table.includes('Alice'));
  });
});

describe('Batch 4: Readability Calculator Engine', () => {
  it('counts syllables correctly', () => {
    assert.strictEqual(countSyllablesInWord('cat'), 1);
    assert.strictEqual(countSyllablesInWord('water'), 2);
    assert.strictEqual(countSyllablesInWord('syllable'), 3);
  });

  it('calculates Flesch scores for plain sentences', () => {
    const text = 'The quick brown fox jumps over the lazy dog. It was a sunny and pleasant day in the park.';
    const res = calculateReadability(text);
    assert.ok(res.words > 15);
    assert.ok(res.fleschReadingEase > 60);
    assert.ok(res.fleschKincaidGrade < 10);
  });
});

describe('Batch 4: Shutter Speed / Angle (180° Rule) Engine', () => {
  it('calculates 1/48s for 180° shutter at 24fps', () => {
    const res = calculateShutter(24, 180);
    assert.strictEqual(res.shutterSpeedFraction, '1/48');
    assert.strictEqual(res.reciprocalSpeed, 48);
  });

  it('calculates 1/100s for 180° shutter at 50fps', () => {
    const res = calculateShutter(50, 180);
    assert.strictEqual(res.shutterSpeedFraction, '1/100');
  });
});

describe('Batch 4: Video Storage Recording Time Engine', () => {
  it('estimates recording time for 128GB card at 100Mbps', () => {
    const res = estimateRecordTime(128, 100);
    // 128 * 8000 = 1024000 Mbits / 100 = 10240s = 2h 50m 40s
    assert.strictEqual(res.hours, 2);
    assert.strictEqual(res.minutes, 50);
    assert.strictEqual(res.seconds, 40);
    assert.strictEqual(res.formattedTime, '2h 50m 40s');
  });
});
