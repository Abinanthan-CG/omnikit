import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { generateCorsHeaders } from '../src/engines/dev/corsTools.ts';
import { generateHtaccess } from '../src/engines/dev/htaccessTools.ts';
import { cleanSvg } from '../src/engines/dev/svgCleanTools.ts';
import { inspectUrl } from '../src/engines/dev/urlInspectTools.ts';
import { generateGlowCardCss } from '../src/engines/design/glowCardTools.ts';
import { simulateColorBlindness } from '../src/engines/design/colorBlindTools.ts';
import { analyzeAnagram } from '../src/engines/writing/anagramTools.ts';
import { analyzePoeticMeter } from '../src/engines/writing/rhymeTools.ts';
import { calculateHeadroom } from '../src/engines/audio/headroomTools.ts';
import { calculateLightingRatio } from '../src/engines/video/lightingContrastTools.ts';

describe('Batch 11: CORS Headers Engine', () => {
  it('generates standard CORS headers and snippets', () => {
    const res = generateCorsHeaders({
      allowedOrigins: ['https://example.com'],
      allowCredentials: true
    });
    assert.equal(res.headers['Access-Control-Allow-Origin'], 'https://example.com');
    assert.equal(res.headers['Access-Control-Allow-Credentials'], 'true');
    assert.ok(res.expressMiddlewareSnippet.includes('Access-Control-Allow-Origin'));
    assert.ok(res.nginxSnippet.includes('add_header'));
  });
});

describe('Batch 11: Htaccess Redirect Engine', () => {
  it('generates Apache 301 and HTTPS rewrite rules', () => {
    const res = generateHtaccess([
      { type: 'forceHttps' },
      { type: 'redirect301', sourcePath: '/old-link', targetUrl: '/new-link' }
    ]);
    assert.ok(res.includes('RewriteEngine On'));
    assert.ok(res.includes('RewriteCond %{HTTPS} off'));
    assert.ok(res.includes('Redirect 301 /old-link /new-link'));
  });
});

describe('Batch 11: SVG Cleaner Engine', () => {
  it('strips XML comments and truncates path float precision', () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg"><!-- comment --><path d="M 12.34567 89.12345"/></svg>`;
    const res = cleanSvg(svg, 1);
    assert.ok(!res.cleanedSvg.includes('comment'));
    assert.ok(res.cleanedSvg.includes('12.3'));
    assert.ok(res.savingsPercent >= 0);
  });
});

describe('Batch 11: URL Inspector Engine', () => {
  it('breaks down protocol, hostname, query params, and paths', () => {
    const res = inspectUrl('https://omnikit.dev:8080/tools/viewer?filter=dev&page=2#top');
    assert.equal(res.isValid, true);
    assert.equal(res.protocol, 'https:');
    assert.equal(res.hostname, 'omnikit.dev');
    assert.equal(res.port, '8080');
    assert.equal(res.queryParams.length, 2);
    assert.equal(res.queryParams[0].key, 'filter');
    assert.equal(res.queryParams[0].value, 'dev');
    assert.equal(res.pathSegments.join('/'), 'tools/viewer');
  });
});

describe('Batch 11: Glow Card CSS Engine', () => {
  it('generates ambient neon glow box shadows', () => {
    const res = generateGlowCardCss({
      glowColor: '#10b981',
      glowSpreadPx: 30,
      glowOpacity: 0.5,
      borderRadiusPx: 16,
      borderWidthPx: 1,
      bgOpacity: 0.8
    });
    assert.ok(res.cssProperties.includes('box-shadow:'));
    assert.ok(res.cssProperties.includes('backdrop-filter: blur(12px)'));
  });
});

describe('Batch 11: Color Blindness Engine', () => {
  it('simulates color transformations for protanopia and deuteranopia', () => {
    const sims = simulateColorBlindness('#FF0000'); // Pure red
    assert.equal(sims.length, 4);
    const protanopia = sims.find((s) => s.type === 'protanopia');
    assert.ok(protanopia);
    assert.ok(protanopia?.simulatedHex.startsWith('#'));
  });
});

describe('Batch 11: Palindrome & Anagram Engine', () => {
  it('detects palindromes ignoring punctuation', () => {
    const res = analyzeAnagram('A man, a plan, a canal: Panama!');
    assert.equal(res.isPalindrome, true);
  });

  it('detects anagrams between two phrases', () => {
    const res = analyzeAnagram('rail safety', 'fairy tales');
    assert.equal(res.isAnagramOfSecond, true);
  });
});

describe('Batch 11: Poetic Meter Engine', () => {
  it('scans syllables and approximate stress patterns', () => {
    const poem = 'Shall I compare thee to a summer day?\nThou art more lovely and more temperate:';
    const res = analyzePoeticMeter(poem);
    assert.equal(res.totalLines, 2);
    assert.ok(res.totalSyllables >= 18);
  });
});

describe('Batch 11: Audio Headroom Engine', () => {
  it('calculates true peak headroom and streaming penalties', () => {
    const res = calculateHeadroom(-10, 0.5); // Very loud, clipping risk
    assert.equal(res.isClippingRisk, true);
    assert.ok(res.truePeakHeadroomDb < 0);
    const spotify = res.streamingPenalties.find((s) => s.service === 'Spotify');
    assert.equal(spotify?.willBeTurnedDown, true);
  });
});

describe('Batch 11: Cinema Lighting Ratio Engine', () => {
  it('calculates (Key + Fill) : Fill contrast ratio and f-stops', () => {
    const res = calculateLightingRatio(300, 100); // 400 : 100 = 4:1
    assert.equal(res.ratioText, '4:1');
    assert.equal(res.ratioDecimal, 4);
    assert.equal(res.stopDifference, 2); // 2 stops
    assert.ok(res.moodDescription.includes('Cinematic Drama'));
  });
});
