import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { parseChmodOctal, parseChmodFlags } from '../src/engines/dev/chmodTools.ts';
import { humanizeCron } from '../src/engines/dev/cronTools.ts';
import { decodeJwt } from '../src/engines/dev/jwtTools.ts';
import { generateQrMatrix } from '../src/engines/dev/qrTools.ts';
import { generateGradientCss } from '../src/engines/design/gradientTools.ts';
import { generateTriangleCss } from '../src/engines/design/triangleTools.ts';
import { getKeyInfo } from '../src/engines/design/keycodeTools.ts';
import { generateLoremIpsum } from '../src/engines/writing/loremTools.ts';
import { slugify } from '../src/engines/writing/slugTools.ts';
import { calculateEquivalentFocalLength } from '../src/engines/video/focalTools.ts';

describe('Chmod Calculator Engine', () => {
  it('converts octal 755 to symbolic rwxr-xr-x', () => {
    const res = parseChmodOctal('755');
    assert.equal(res.success, true);
    assert.equal(res.symbolic, 'rwxr-xr-x');
    assert.equal(res.owner.read, true);
    assert.equal(res.group.write, false);
    assert.equal(res.others.execute, true);
  });

  it('converts flags back to octal 644', () => {
    const res = parseChmodFlags({
      owner: { read: true, write: true, execute: false },
      group: { read: true, write: false, execute: false },
      others: { read: true, write: false, execute: false },
    });
    assert.equal(res.octal, '644');
    assert.equal(res.symbolic, 'rw-r--r--');
  });

  it('rejects invalid octal strings', () => {
    const res = parseChmodOctal('999');
    assert.equal(res.success, false);
  });
});

describe('Crontab Humanizer Engine', () => {
  it('explains standard cron expressions', () => {
    const res = humanizeCron('*/15 * * * *');
    assert.equal(res.success, true);
    assert.ok(res.description.toLowerCase().includes('15'));
  });

  it('explains hourly cron expression', () => {
    const res = humanizeCron('0 * * * *');
    assert.equal(res.success, true);
    assert.ok(res.description.toLowerCase().includes('hour'));
  });

  it('rejects malformed cron string', () => {
    const res = humanizeCron('not a cron');
    assert.equal(res.success, false);
  });
});

describe('JWT Decoder Engine', () => {
  it('decodes mock valid JWT token', () => {
    // header: {"alg":"HS256","typ":"JWT"}, payload: {"sub":"user123","name":"Alice","exp":1893456000}
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwibmFtZSI6IkFsaWNlIiwiZXhwIjoxODkzNDU2MDAwfQ.signature';
    const res = decodeJwt(token);
    assert.equal(res.success, true);
    assert.equal(res.header.alg, 'HS256');
    assert.equal(res.payload.name, 'Alice');
    assert.equal(res.isExpired, false);
  });

  it('rejects non-jwt string', () => {
    const res = decodeJwt('bad-token');
    assert.equal(res.success, false);
  });
});

describe('QR Code Matrix Engine', () => {
  it('generates a 2D matrix for text', () => {
    const matrix = generateQrMatrix('https://example.com');
    assert.ok(Array.isArray(matrix));
    assert.ok(matrix.length >= 21); // Version 1 is 21x21
    assert.equal(matrix.length, matrix[0].length);
  });
});

describe('CSS Gradient Generator Engine', () => {
  it('generates linear gradient CSS', () => {
    const css = generateGradientCss({
      type: 'linear',
      angle: 90,
      stops: [
        { color: '#ff0000', position: 0 },
        { color: '#0000ff', position: 100 },
      ],
    });
    assert.ok(css.includes('linear-gradient(90deg, #ff0000 0%, #0000ff 100%)'));
  });
});

describe('CSS Triangle Generator Engine', () => {
  it('generates top-pointing triangle CSS borders', () => {
    const css = generateTriangleCss('top', 20, 10, '#10b981');
    assert.ok(css.includes('border-color: transparent transparent #10b981 transparent'));
    assert.ok(css.includes('border-width: 0 10px 10px 10px'));
  });
});

describe('Keycode Info Engine', () => {
  it('returns clean information for Enter key', () => {
    const info = getKeyInfo('Enter', 'Enter', 13);
    assert.equal(info.key, 'Enter');
    assert.equal(info.keyCode, 13);
  });
});

describe('Lorem Ipsum Engine', () => {
  it('generates paragraphs with leading Lorem ipsum', () => {
    const text = generateLoremIpsum('paragraphs', 2, true);
    assert.ok(text.startsWith('Lorem ipsum'));
    const paras = text.split('\n\n');
    assert.equal(paras.length, 2);
  });

  it('generates words', () => {
    const text = generateLoremIpsum('words', 5, false);
    assert.equal(text.split(' ').length, 5);
  });
});

describe('Slugifier Engine', () => {
  it('normalizes titles into clean URL slugs', () => {
    const slug = slugify('Hello World! 2026: The New Era');
    assert.equal(slug, 'hello-world-2026-the-new-era');
  });

  it('supports custom underscore separator', () => {
    const slug = slugify('My Document Title', { separator: '_' });
    assert.equal(slug, 'my_document_title');
  });
});

describe('Focal Length Calculator Engine', () => {
  it('calculates 35mm equivalent for 50mm on APS-C (1.5x)', () => {
    const res = calculateEquivalentFocalLength(50, 1.5);
    assert.equal(res.equivalentFocalLength, 75);
    assert.ok(res.horizontalFovDegrees > 0);
  });
});
