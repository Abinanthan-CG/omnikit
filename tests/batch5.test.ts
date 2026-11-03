import { describe, it } from 'node:test';
import assert from 'node:assert';
import { generateBasicAuth, decodeBasicAuth } from '../src/engines/dev/basicAuthTools.ts';
import { markdownToHtml, htmlToMarkdown } from '../src/engines/dev/mdHtmlTools.ts';
import { textToBinary, binaryToText } from '../src/engines/dev/binaryTools.ts';
import { textToHex, hexToText } from '../src/engines/dev/hexTools.ts';
import { generateBorderRadiusCss } from '../src/engines/design/borderRadiusTools.ts';
import { formatCubicBezier, evaluateBezier } from '../src/engines/design/bezierTools.ts';
import { toAlternatingCase, toInvertedCase } from '../src/engines/writing/altCaseTools.ts';
import { caesarCipher, rot13 } from '../src/engines/writing/cipherTools.ts';
import { calculateMetronome, getTempoMarking } from '../src/engines/audio/metronomeTools.ts';
import { calculateTimelapse } from '../src/engines/video/timelapseTools.ts';

describe('Batch 5: Basic Auth Engine', () => {
  it('encodes username and password into Basic Auth header', () => {
    const res = generateBasicAuth('admin', 'secret123');
    assert.strictEqual(res.token, 'YWRtaW46c2VjcmV0MTIz');
    assert.strictEqual(res.header, 'Authorization: Basic YWRtaW46c2VjcmV0MTIz');
  });

  it('decodes Basic Auth token back to username and password', () => {
    const dec = decodeBasicAuth('Basic YWRtaW46c2VjcmV0MTIz');
    assert.strictEqual(dec.username, 'admin');
    assert.strictEqual(dec.password, 'secret123');
  });
});

describe('Batch 5: Markdown / HTML Converter Engine', () => {
  it('converts markdown headings and bold to html', () => {
    const md = '# Title\n\nThis is **bold** text.';
    const html = markdownToHtml(md);
    assert.ok(html.includes('<h1>Title</h1>'));
    assert.ok(html.includes('<strong>bold</strong>'));
  });

  it('converts basic html tags back to markdown', () => {
    const html = '<h1>Heading</h1><p>Some <em>italic</em> words.</p>';
    const md = htmlToMarkdown(html);
    assert.ok(md.includes('# Heading'));
    assert.ok(md.includes('*italic*'));
  });
});

describe('Batch 5: Binary Converter Engine', () => {
  it('converts text to binary bytes and decodes back', () => {
    const raw = 'Omni';
    const bin = textToBinary(raw);
    assert.ok(bin.startsWith('01001111'));
    const recovered = binaryToText(bin);
    assert.strictEqual(recovered, raw);
  });
});

describe('Batch 5: Hex Converter Engine', () => {
  it('converts text to hex pairs and decodes back', () => {
    const raw = 'Hello';
    const hex = textToHex(raw);
    assert.strictEqual(hex, '48 65 6c 6c 6f');
    const recovered = hexToText(hex);
    assert.strictEqual(recovered, raw);
  });
});

describe('Batch 5: Border Radius Engine', () => {
  it('generates 8-value border-radius CSS rule', () => {
    const res = generateBorderRadiusCss({
      tlX: 30, trX: 70, brX: 70, blX: 30,
      tlY: 30, trY: 30, brY: 70, blY: 70
    });
    assert.strictEqual(res.cssValue, '30% 70% 70% 30% / 30% 30% 70% 70%');
    assert.strictEqual(res.fullCss, 'border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;');
  });
});

describe('Batch 5: Cubic Bezier Engine', () => {
  it('formats cubic-bezier CSS function string', () => {
    const str = formatCubicBezier({ x1: 0.25, y1: 0.1, x2: 0.25, y2: 1 });
    assert.strictEqual(str, 'cubic-bezier(0.25, 0.1, 0.25, 1)');
  });

  it('evaluates cubic bezier point at t=0.5', () => {
    const pt = evaluateBezier({ x1: 0.25, y1: 0.1, x2: 0.25, y2: 1 }, 0.5);
    assert.ok(pt.x > 0 && pt.x < 1);
    assert.ok(pt.y > 0 && pt.y < 1);
  });
});

describe('Batch 5: Alt / Invert Case Engine', () => {
  it('alternates letters uppercase and lowercase', () => {
    const res = toAlternatingCase('hello world');
    assert.strictEqual(res, 'HeLlO wOrLd');
  });

  it('inverts case swapping upper and lower', () => {
    const res = toInvertedCase('Hello World!');
    assert.strictEqual(res, 'hELLO wORLD!');
  });
});

describe('Batch 5: Caesar / ROT13 Cipher Engine', () => {
  it('shifts letters with ROT13', () => {
    const secret = rot13('hello');
    assert.strictEqual(secret, 'uryyb');
    assert.strictEqual(rot13(secret), 'hello');
  });

  it('shifts letters by custom amount', () => {
    const enc = caesarCipher('ABC', 3);
    assert.strictEqual(enc, 'DEF');
  });
});

describe('Batch 5: Metronome Engine', () => {
  it('calculates 500ms intervals for 120 BPM', () => {
    const res = calculateMetronome(120, 4);
    assert.strictEqual(res.intervalMs, 500);
    assert.strictEqual(res.barDurationMs, 2000);
    assert.ok(res.tempoName.includes('Moderato') || res.tempoName.includes('Allegro'));
  });

  it('identifies Italian tempo marking', () => {
    const name = getTempoMarking(60);
    assert.ok(name.includes('Largo'));
  });
});

describe('Batch 5: Timelapse Calculator Engine', () => {
  it('calculates shooting interval for 10s video from 60min event', () => {
    const res = calculateTimelapse({
      targetClipSeconds: 10,
      clipFps: 24,
      eventDurationMinutes: 60,
      photoSizeMb: 20
    });
    // 10s * 24fps = 240 frames
    assert.strictEqual(res.totalFrames, 240);
    // 3600 seconds / 240 frames = 15 seconds interval
    assert.strictEqual(res.intervalSeconds, 15);
    assert.strictEqual(res.shootingDurationFormatted, '1h 0m');
  });
});
