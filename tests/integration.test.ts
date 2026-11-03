import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getToolFromHash, createHashForTool } from '../src/utils/routing.ts';

describe('Routing Logic', () => {
  it('extracts tool id from location hash', () => {
    assert.strictEqual(getToolFromHash('#timecode'), 'timecode');
    assert.strictEqual(getToolFromHash('#/contrast'), 'contrast');
    assert.strictEqual(getToolFromHash('#json-tools'), 'json-tools');
    assert.strictEqual(getToolFromHash('#base64'), 'base64');
    assert.strictEqual(getToolFromHash('#url-tools'), 'url-tools');
    assert.strictEqual(getToolFromHash('#hash-generator'), 'hash-generator');
    assert.strictEqual(getToolFromHash('#uuid-generator'), 'uuid-generator');
    assert.strictEqual(getToolFromHash('#color-converter'), 'color-converter');
    assert.strictEqual(getToolFromHash('#text-diff'), 'text-diff');
    assert.strictEqual(getToolFromHash('#note-frequency'), 'note-frequency');
    assert.strictEqual(getToolFromHash('#bitrate'), 'bitrate');
    assert.strictEqual(getToolFromHash(''), null);
    assert.strictEqual(getToolFromHash('#'), null);
  });

  it('creates clean hash for tool', () => {
    assert.strictEqual(createHashForTool('timecode'), '#timecode');
    assert.strictEqual(createHashForTool('base64'), '#base64');
    assert.strictEqual(createHashForTool('hash-generator'), '#hash-generator');
  });
});
