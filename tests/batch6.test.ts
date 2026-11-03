import { describe, it } from 'node:test';
import assert from 'node:assert';
import { calculateSubnet } from '../src/engines/dev/subnetTools.ts';
import { formatMacAddress, generateRandomMac } from '../src/engines/dev/macTools.ts';
import { generatePassword } from '../src/engines/dev/passwordTools.ts';
import { jsonToCsv, csvToJson } from '../src/engines/dev/csvTools.ts';
import { generatePolygonCss, CLIP_PRESETS } from '../src/engines/design/clipPathTools.ts';
import { calculateTransformMatrix } from '../src/engines/design/transformTools.ts';
import { truncateText } from '../src/engines/writing/truncateTools.ts';
import { filterSymbols } from '../src/engines/writing/symbolTools.ts';
import { dbToRatios, ratioToDb } from '../src/engines/audio/decibelTools.ts';
import { calculateSunTimes } from '../src/engines/video/sunTools.ts';

describe('Batch 6: Subnet & CIDR Engine', () => {
  it('calculates subnet details for /24 network', () => {
    const res = calculateSubnet('192.168.1.50', 24);
    assert.strictEqual(res.netmask, '255.255.255.0');
    assert.strictEqual(res.networkAddress, '192.168.1.0');
    assert.strictEqual(res.broadcastAddress, '192.168.1.255');
    assert.strictEqual(res.firstUsableIp, '192.168.1.1');
    assert.strictEqual(res.lastUsableIp, '192.168.1.254');
    assert.strictEqual(res.usableHosts, 254);
  });
});

describe('Batch 6: MAC Address Engine', () => {
  it('formats raw hex into colon, hyphen, and dot formats', () => {
    const raw = '001A2B3C4D5E';
    assert.strictEqual(formatMacAddress(raw, 'colon'), '00:1A:2B:3C:4D:5E');
    assert.strictEqual(formatMacAddress(raw, 'hyphen'), '00-1A-2B-3C-4D-5E');
    assert.strictEqual(formatMacAddress(raw, 'dot'), '001a.2b3c.4d5e');
  });

  it('generates 6 byte random MAC array', () => {
    const bytes = generateRandomMac();
    assert.strictEqual(bytes.length, 6);
  });
});

describe('Batch 6: Password Generator Engine', () => {
  it('generates requested length with symbols and numbers', () => {
    const res = generatePassword({
      length: 20,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
      excludeAmbiguous: false
    });
    assert.strictEqual(res.password.length, 20);
    assert.ok(res.entropyBits > 80);
  });
});

describe('Batch 6: JSON / CSV Converter Engine', () => {
  it('converts array of objects to CSV', () => {
    const json = JSON.stringify([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
    const csv = jsonToCsv(json);
    assert.ok(csv.startsWith('id,name'));
    assert.ok(csv.includes('1,Alice'));
  });

  it('converts CSV back to JSON array', () => {
    const csv = 'id,name\n1,Alice\n2,Bob';
    const jsonStr = csvToJson(csv);
    const parsed = JSON.parse(jsonStr);
    assert.strictEqual(parsed.length, 2);
    assert.strictEqual(parsed[0].name, 'Alice');
  });
});

describe('Batch 6: Clip-Path Polygon Engine', () => {
  it('generates clip-path CSS from polygon points', () => {
    const res = generatePolygonCss(CLIP_PRESETS.Triangle);
    assert.strictEqual(res.polygonValue, 'polygon(50% 0%, 100% 100%, 0% 100%)');
    assert.strictEqual(res.fullCss, 'clip-path: polygon(50% 0%, 100% 100%, 0% 100%);');
  });
});

describe('Batch 6: Transform Matrix Engine', () => {
  it('calculates 2D transform matrix for 10px translate and 2x scale', () => {
    const res = calculateTransformMatrix({
      translateX: 10,
      translateY: 20,
      scaleX: 2,
      scaleY: 2,
      rotateDeg: 0,
      skewXDeg: 0,
      skewYDeg: 0
    });
    assert.strictEqual(res.a, 2);
    assert.strictEqual(res.d, 2);
    assert.strictEqual(res.e, 10);
    assert.strictEqual(res.f, 20);
    assert.strictEqual(res.matrixCss, 'transform: matrix(2, 0, 0, 2, 10, 20);');
  });
});

describe('Batch 6: Truncate Text Engine', () => {
  it('truncates by character length', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    const res = truncateText(text, { maxLength: 15, byWords: false, ellipsis: '...' });
    assert.strictEqual(res.length, 15);
    assert.ok(res.endsWith('...'));
  });

  it('truncates at word boundary', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    const res = truncateText(text, { maxLength: 20, byWords: true, ellipsis: '...' });
    assert.ok(res.length <= 20);
    assert.strictEqual(res, 'The quick brown...');
  });
});

describe('Batch 6: Unicode Symbols Engine', () => {
  it('filters symbols by query', () => {
    const matches = filterSymbols('arrow');
    assert.ok(matches.length > 0);
    assert.strictEqual(matches[0].category, 'Arrows');
  });
});

describe('Batch 6: Decibel & Gain Multiplier Engine', () => {
  it('calculates +6 dB is approx 2x voltage ratio', () => {
    const res = dbToRatios(6.02);
    assert.strictEqual(Math.round(res.voltageRatio), 2);
  });

  it('calculates 2x voltage ratio is approx +6 dB', () => {
    const res = ratioToDb(2);
    assert.strictEqual(Math.round(res.db), 6);
  });
});

describe('Batch 6: Solar Golden Hour Engine', () => {
  it('calculates sun times with sunrise and sunset', () => {
    const res = calculateSunTimes(37.7749, -122.4194, new Date('2026-06-21T12:00:00Z'));
    assert.ok(res.sunrise.includes(':'));
    assert.ok(res.sunset.includes(':'));
    assert.ok(res.dayLengthHours > 10);
  });
});
