import test from 'node:test';
import assert from 'node:assert/strict';
import { detectSnippet } from '../src/engines/smartDetector.ts';

test('Smart Detector Engine', async (t) => {
  await t.test('detects JSON objects and arrays', () => {
    const res = detectSnippet('{"name": "Omnikit", "version": 1}');
    assert.ok(res);
    assert.equal(res.type, 'json');
    assert.ok(res.suggestedTools.some(tool => tool.id === 'json-tools'));

    const arrRes = detectSnippet('[1, 2, 3]');
    assert.ok(arrRes);
    assert.equal(arrRes.type, 'json');
  });

  await t.test('detects hex color codes', () => {
    const res = detectSnippet('#6366f1');
    assert.ok(res);
    assert.equal(res.type, 'hex-color');
    assert.ok(res.suggestedTools.some(tool => tool.id === 'color-harmonies'));
  });

  await t.test('detects unix epoch timestamps', () => {
    const res = detectSnippet('1730689945');
    assert.ok(res);
    assert.equal(res.type, 'timestamp');
    assert.ok(res.suggestedTools.some(tool => tool.id === 'timestamps'));
  });

  await t.test('detects web URLs and IP addresses', () => {
    const urlRes = detectSnippet('https://github.com/Abinanthan-CG/omnikit');
    assert.ok(urlRes);
    assert.equal(urlRes.type, 'url');

    const ipRes = detectSnippet('192.168.1.0/24');
    assert.ok(ipRes);
    assert.equal(ipRes.type, 'ip');
  });

  await t.test('detects SQL queries', () => {
    const res = detectSnippet('SELECT id, name FROM users WHERE active = 1');
    assert.ok(res);
    assert.equal(res.type, 'sql');
  });

  await t.test('returns null for plain conversational text', () => {
    assert.equal(detectSnippet('hello world how are you'), null);
    assert.equal(detectSnippet(''), null);
  });
});
