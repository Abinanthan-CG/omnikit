import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { encodeBase64, decodeBase64 } from '../src/engines/dev/base64Tools.ts';
import { encodeUrl, decodeUrl, parseQueryParams } from '../src/engines/dev/urlTools.ts';
import { generateSha256, generateMd5 } from '../src/engines/dev/hashTools.ts';
import { generateUuids } from '../src/engines/dev/uuidTools.ts';
import { encodeHtmlEntities, decodeHtmlEntities } from '../src/engines/dev/htmlEntityTools.ts';

describe('Base64 Engine', () => {
  it('encodes ASCII text to base64', () => {
    const res = encodeBase64('Hello, World!');
    assert.equal(res.success, true);
    assert.equal(res.value, 'SGVsbG8sIFdvcmxkIQ==');
  });

  it('decodes base64 string to original text', () => {
    const res = decodeBase64('SGVsbG8sIFdvcmxkIQ==');
    assert.equal(res.success, true);
    assert.equal(res.value, 'Hello, World!');
  });

  it('supports URL-safe base64', () => {
    const res = encodeBase64('subjects?_d=1', { urlSafe: true });
    assert.equal(res.success, true);
    assert.ok(!res.value.includes('+') && !res.value.includes('/'));
  });

  it('rejects invalid base64 string gracefully', () => {
    const res = decodeBase64('!!!NOT_BASE64###');
    assert.equal(res.success, false);
    assert.ok(res.error);
  });
});

describe('URL Tools Engine', () => {
  it('encodes query parameters and special chars', () => {
    const res = encodeUrl('https://example.com/search?q=hello world&lang=en');
    assert.equal(res.success, true);
    assert.ok(res.value.includes('hello%20world'));
  });

  it('decodes encoded URL components', () => {
    const res = decodeUrl('https%3A%2F%2Fexample.com%3Fq%3Dhello%20world');
    assert.equal(res.success, true);
    assert.equal(res.value, 'https://example.com?q=hello world');
  });

  it('parses URL query params into key-value pairs', () => {
    const pairs = parseQueryParams('https://site.com/api?user=alice&role=admin&active=true');
    assert.equal(pairs.length, 3);
    assert.deepEqual(pairs[0], { key: 'user', value: 'alice' });
    assert.deepEqual(pairs[1], { key: 'role', value: 'admin' });
  });
});

describe('Hash Tools Engine', () => {
  it('computes sha256 hex string for empty string', async () => {
    const res = await generateSha256('');
    assert.equal(res, 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  });

  it('computes sha256 hex string for text', async () => {
    const res = await generateSha256('omnikit');
    assert.equal(typeof res, 'string');
    assert.equal(res.length, 64);
  });

  it('computes MD5 hex hash', () => {
    const res = generateMd5('hello');
    assert.equal(res, '5d41402abc4b2a76b9719d911017c592');
  });
});

describe('UUID Tools Engine', () => {
  it('generates a valid v4 UUID', () => {
    const list = generateUuids(1, { uppercase: false, hyphens: true });
    assert.equal(list.length, 1);
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    assert.ok(uuidRegex.test(list[0]));
  });

  it('generates bulk UUIDs without hyphens and uppercase', () => {
    const list = generateUuids(5, { uppercase: true, hyphens: false });
    assert.equal(list.length, 5);
    assert.ok(!list[0].includes('-'));
    assert.equal(list[0], list[0].toUpperCase());
  });
});

describe('HTML Entities Engine', () => {
  it('encodes special HTML characters', () => {
    const res = encodeHtmlEntities('<h1>Hello & "World"!</h1>');
    assert.equal(res, '&lt;h1&gt;Hello &amp; &quot;World&quot;!&lt;/h1&gt;');
  });

  it('decodes named and numeric HTML entities', () => {
    const res = decodeHtmlEntities('&lt;div class=&quot;box&quot;&gt;&amp;copy; 2026 &#65;&lt;/div&gt;');
    assert.equal(res, '<div class="box">&copy; 2026 A</div>');
  });
});
