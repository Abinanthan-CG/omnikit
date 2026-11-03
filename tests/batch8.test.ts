import { describe, it } from 'node:test';
import assert from 'node:assert';
import { searchMimes } from '../src/engines/dev/mimeTools.ts';
import { minifyCss, minifyHtml } from '../src/engines/dev/minifyTools.ts';
import { extractColors } from '../src/engines/dev/colorSnifferTools.ts';
import { generateNanoid, generateBatchNanoids } from '../src/engines/dev/nanoidTools.ts';
import { generateTextShadowCss } from '../src/engines/design/textShadowTools.ts';
import { convertCssUnits } from '../src/engines/design/unitsTools.ts';
import { analyzeCharacterDistribution } from '../src/engines/writing/charStatsTools.ts';
import { detectInvisibleChars } from '../src/engines/writing/zeroWidthTools.ts';
import { calculateHarmonics } from '../src/engines/audio/synthTools.ts';
import { scaleResolution, scaleToWidth } from '../src/engines/video/resScaleTools.ts';

describe('Batch 8: MIME Types Engine', () => {
  it('finds JSON and MP4 MIME types', () => {
    const jsonMime = searchMimes('json');
    assert.ok(jsonMime.some(m => m.mime === 'application/json'));
    const mp4Mime = searchMimes('mp4');
    assert.ok(mp4Mime.some(m => m.mime === 'video/mp4'));
  });
});

describe('Batch 8: Minifier Engine', () => {
  it('minifies CSS removing comments and extra spaces', () => {
    const raw = '/* banner */\n.box {\n  color: #fff;\n  margin: 10px;\n}';
    const min = minifyCss(raw);
    assert.strictEqual(min, '.box{color:#fff;margin:10px}');
  });

  it('minifies HTML tags', () => {
    const raw = '<div>  <!-- comment -->  <span>Hello</span>  </div>';
    const min = minifyHtml(raw);
    assert.strictEqual(min, '<div><span>Hello</span></div>');
  });
});

describe('Batch 8: Color Sniffer Engine', () => {
  it('extracts hex and rgb colors from stylesheet', () => {
    const css = 'body { background: #10b981; color: rgb(255, 255, 255); border: 1px solid #10b981; }';
    const colors = extractColors(css);
    assert.strictEqual(colors[0].color, '#10b981');
    assert.strictEqual(colors[0].count, 2);
    assert.ok(colors.some(c => c.color.includes('rgb')));
  });
});

describe('Batch 8: Nanoid Generator Engine', () => {
  it('generates random nanoid string of requested length', () => {
    const id = generateNanoid(16);
    assert.strictEqual(id.length, 16);
    const batch = generateBatchNanoids(5, 12);
    assert.strictEqual(batch.length, 5);
    assert.strictEqual(batch[0].length, 12);
  });
});

describe('Batch 8: Text Shadow Engine', () => {
  it('generates multi-layer text-shadow CSS rule', () => {
    const res = generateTextShadowCss([
      { offsetX: 0, offsetY: 0, blur: 10, color: '#10b981' },
      { offsetX: 0, offsetY: 0, blur: 20, color: '#047857' }
    ]);
    assert.strictEqual(res.fullCss, 'text-shadow: 0px 0px 10px #10b981, 0px 0px 20px #047857;');
  });
});

describe('Batch 8: CSS Units Converter Engine', () => {
  it('converts 16px to 1rem and 12pt', () => {
    const res = convertCssUnits(16, 'px', 16, 1920, 1080);
    assert.strictEqual(res.rem, 1);
    assert.strictEqual(res.pt, 12);
  });
});

describe('Batch 8: Character Distribution Engine', () => {
  it('counts letters, digits, and uppercase breakdown', () => {
    const res = analyzeCharacterDistribution('Hello World 123!');
    assert.strictEqual(res.letters, 10);
    assert.strictEqual(res.uppercaseLetters, 2);
    assert.strictEqual(res.lowercaseLetters, 8);
    assert.strictEqual(res.digits, 3);
    assert.strictEqual(res.punctuation, 1);
  });
});

describe('Batch 8: Invisible Zero-Width Cleaner Engine', () => {
  it('detects and cleans zero-width space characters', () => {
    const raw = 'Hello\u200BWorld\uFEFF!';
    const res = detectInvisibleChars(raw);
    assert.strictEqual(res.hasInvisible, true);
    assert.strictEqual(res.totalCount, 2);
    assert.strictEqual(res.cleanedText, 'HelloWorld!');
  });
});

describe('Batch 8: Audio Harmonics Engine', () => {
  it('generates harmonic series from fundamental 100 Hz', () => {
    const harmonics = calculateHarmonics(100, 4);
    assert.deepStrictEqual(harmonics, [100, 200, 300, 400]);
  });
});

describe('Batch 8: Video Resolution Scaling Engine', () => {
  it('scales 3840x2160 by 50% to 1920x1080', () => {
    const res = scaleResolution(3840, 2160, 50);
    assert.strictEqual(res.width, 1920);
    assert.strictEqual(res.height, 1080);
    assert.strictEqual(res.aspectRatio, '16:9');
  });

  it('scales to target width maintaining even height', () => {
    const res = scaleToWidth(1920, 1080, 1280);
    assert.strictEqual(res.width, 1280);
    assert.strictEqual(res.height, 720);
  });
});
