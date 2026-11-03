import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getToolFromHash, createHashForTool } from '../src/utils/routing.ts';

describe('Routing Logic', () => {
  it('extracts tool id from location hash', () => {
    assert.strictEqual(getToolFromHash('#timecode'), 'timecode');
    assert.strictEqual(getToolFromHash('#/contrast'), 'contrast');
    assert.strictEqual(getToolFromHash('#json-tools'), 'json-tools');
    assert.strictEqual(getToolFromHash(''), null);
    assert.strictEqual(getToolFromHash('#'), null);
  });

  it('creates clean hash for tool', () => {
    assert.strictEqual(createHashForTool('timecode'), '#timecode');
  });
});
