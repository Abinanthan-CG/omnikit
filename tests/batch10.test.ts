import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { envToJson, jsonToEnv } from '../src/engines/dev/envJsonTools.ts';
import { parseSemver, compareSemver, bumpSemver } from '../src/engines/dev/semverTools.ts';
import { minifySql } from '../src/engines/dev/sqlMinifierTools.ts';
import { evaluateBitmask, buildBitmask } from '../src/engines/dev/bitmaskTools.ts';
import { generateCssGrid } from '../src/engines/design/gridTools.ts';
import { generateCssRibbon } from '../src/engines/design/ribbonTools.ts';
import { textToMorse, morseToText } from '../src/engines/writing/morseTools.ts';
import { generateZalgo } from '../src/engines/writing/zalgoTools.ts';
import { calculateSampleRateMetrics } from '../src/engines/audio/sampleRateTools.ts';
import { calculateDof } from '../src/engines/video/dofTools.ts';

describe('Batch 10: Env/JSON Engine', () => {
  it('parses .env lines into JSON', () => {
    const env = 'PORT=3000\nNODE_ENV=production\n# Comment\nAPP_NAME="Omnikit Swiss Knife"';
    const json = envToJson(env);
    assert.equal(json.PORT, '3000');
    assert.equal(json.NODE_ENV, 'production');
    assert.equal(json.APP_NAME, 'Omnikit Swiss Knife');
  });

  it('converts JSON object back to .env lines', () => {
    const envStr = jsonToEnv({ HOST: '127.0.0.1', DEBUG: true, TITLE: 'Omnikit App' });
    assert.ok(envStr.includes('HOST=127.0.0.1'));
    assert.ok(envStr.includes('TITLE="Omnikit App"'));
  });
});

describe('Batch 10: SemVer Engine', () => {
  it('parses semver versions', () => {
    const v = parseSemver('v2.4.1-alpha.1');
    assert.equal(v.major, 2);
    assert.equal(v.minor, 4);
    assert.equal(v.patch, 1);
    assert.equal(v.prerelease, 'alpha.1');
  });

  it('compares semver versions accurately', () => {
    assert.equal(compareSemver('1.2.0', '1.1.9'), 1);
    assert.equal(compareSemver('2.0.0', '2.0.0'), 0);
    assert.equal(compareSemver('1.0.0-alpha', '1.0.0'), -1);
  });

  it('bumps versions', () => {
    assert.equal(bumpSemver('1.2.3', 'major'), '2.0.0');
    assert.equal(bumpSemver('1.2.3', 'minor'), '1.3.0');
    assert.equal(bumpSemver('1.2.3', 'patch'), '1.2.4');
  });
});

describe('Batch 10: SQL Minifier Engine', () => {
  it('strips comments and collapses whitespace in SQL', () => {
    const sql = `
      -- Fetch active users
      SELECT id, name, email
      /* multi-line comment */
      FROM users
      WHERE is_active = 1;
    `;
    const res = minifySql(sql);
    assert.ok(!res.minifiedSql.includes('--'));
    assert.ok(!res.minifiedSql.includes('/*'));
    assert.ok(res.minifiedSql.includes('SELECT'));
    assert.ok(res.savingsPercent > 20);
  });
});

describe('Batch 10: Permission Bitmask Engine', () => {
  it('evaluates active flags from bitmask number', () => {
    const res = evaluateBitmask(1 | 2); // Read (1) + Write (2) = 3
    assert.equal(res.totalActive, 2);
    assert.equal(res.activeFlags[0].name, 'Read');
    assert.equal(res.activeFlags[1].name, 'Write');
  });

  it('builds bitmask value from flag list', () => {
    const mask = buildBitmask([1, 4, 8]);
    assert.equal(mask, 13);
  });
});

describe('Batch 10: CSS Grid Engine', () => {
  it('generates grid CSS with columns and gaps', () => {
    const grid = generateCssGrid({
      columns: 3,
      rows: 2,
      columnGapPx: 20,
      rowGapPx: 10,
      colUnit: 'fr',
      rowUnit: 'auto'
    });
    assert.ok(grid.cssProperties.includes('repeat(3, minmax(0, 1fr))'));
    assert.ok(grid.cssProperties.includes('gap: 10px 20px;'));
  });
});

describe('Batch 10: Ribbon Badge Engine', () => {
  it('generates rotated ribbon styles', () => {
    const res = generateCssRibbon({
      text: 'BETA',
      position: 'top-right',
      ribbonColor: '#ef4444',
      textColor: '#ffffff',
      sizePx: 100
    });
    assert.ok(res.ribbonCss.includes('rotate(45deg)'));
    assert.ok(res.ribbonCss.includes('background-color: #ef4444'));
  });
});

describe('Batch 10: Morse Code Engine', () => {
  it('translates text to international Morse code', () => {
    const morse = textToMorse('SOS');
    assert.equal(morse, '... --- ...');
  });

  it('translates Morse code back to plain text', () => {
    const text = morseToText('... --- ...');
    assert.equal(text, 'SOS');
  });
});

describe('Batch 10: Zalgo Glitch Engine', () => {
  it('decorates text with chaotic unicode accents', () => {
    const res = generateZalgo('OMNIKIT', { intensity: 'low' });
    assert.ok(res.length > 7);
    assert.ok(res.includes('O'));
  });
});

describe('Batch 10: Sample Rate Engine', () => {
  it('calculates Nyquist and uncompressed data rates', () => {
    const res = calculateSampleRateMetrics(48000, 24, 2);
    assert.equal(res.nyquistFrequencyHz, 24000);
    assert.equal(res.bytesPerSecond, 288000); // 48000 * 3 bytes * 2 ch
    assert.ok(res.mbPerMinute > 15);
  });
});

describe('Batch 10: Depth of Field Engine', () => {
  it('calculates hyperfocal distance and near/far limits', () => {
    const dof = calculateDof(50, 2.8, 3.0, 0.030);
    assert.ok(dof.hyperfocalDistanceMeters > 20);
    assert.ok(dof.nearLimitMeters < 3.0);
    assert.ok(dof.farLimitMeters > 3.0);
  });
});
