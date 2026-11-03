import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { computeLineDiff } from '../src/engines/writing/textDiff.ts';
import { sortLines } from '../src/engines/writing/lineSorter.ts';

describe('Text Diff Engine', () => {
  it('identifies identical text with no changes', () => {
    const diff = computeLineDiff('hello\nworld', 'hello\nworld');
    assert.equal(diff.hasDifferences, false);
    assert.equal(diff.lines.length, 2);
    assert.equal(diff.lines[0].type, 'unchanged');
  });

  it('detects added and removed lines', () => {
    const diff = computeLineDiff('apple\nbanana', 'apple\norange\nbanana');
    assert.equal(diff.hasDifferences, true);
    const added = diff.lines.filter(l => l.type === 'added');
    assert.equal(added.length, 1);
    assert.equal(added[0].text, 'orange');
  });
});

describe('Line Sorter Engine', () => {
  it('sorts lines alphabetically ascending and descending', () => {
    const input = 'zebra\napple\nmango';
    const asc = sortLines(input, { mode: 'asc' });
    assert.equal(asc, 'apple\nmango\nzebra');

    const desc = sortLines(input, { mode: 'desc' });
    assert.equal(desc, 'zebra\nmango\napple');
  });

  it('deduplicates lines and strips empty lines', () => {
    const input = 'apple\n\nbanana\napple\n';
    const res = sortLines(input, { mode: 'asc', dedupe: true, stripEmpty: true });
    assert.equal(res, 'apple\nbanana');
  });

  it('sorts by line length', () => {
    const input = 'longest\nhi\nmedium';
    const res = sortLines(input, { mode: 'length-asc' });
    assert.equal(res, 'hi\nmedium\nlongest');
  });
});
