import { describe, it } from 'node:test';
import assert from 'node:assert';
import { filterToolList } from '../src/components/paletteLogic.ts';
import type { ToolListItem } from '../src/components/paletteLogic.ts';

describe('Palette Filter Logic', () => {
  const tools: ToolListItem[] = [
    { id: 'timecode', title: 'Timecode Calculator', description: 'SMPTE frame math', category: 'video', tags: ['smpte', 'fps', 'frame'], keywords: ['24fps', 'dropframe'] },
    { id: 'contrast', title: 'Color Contrast Checker', description: 'WCAG 2.1 compliance', category: 'design', tags: ['wcag', 'color', 'accessibility'], keywords: ['aa', 'aaa'] },
    { id: 'bpm', title: 'BPM Delay & Reverb', description: 'Audio timing sync', category: 'audio', tags: ['music', 'delay', 'ms'], keywords: ['tempo', 'beats'] },
    { id: 'case', title: 'Case Converter', description: 'Transform text casing', category: 'writing', tags: ['camel', 'snake', 'kebab'], keywords: ['casing'] },
  ];

  it('returns all tools when query is empty and category is all', () => {
    assert.strictEqual(filterToolList(tools, '', 'all').length, 4);
  });

  it('filters by category alone', () => {
    const video = filterToolList(tools, '', 'video');
    assert.strictEqual(video.length, 1);
    assert.strictEqual(video[0].id, 'timecode');
  });

  it('filters by title query', () => {
    const res = filterToolList(tools, 'contrast', 'all');
    assert.strictEqual(res.length, 1);
    assert.strictEqual(res[0].id, 'contrast');
  });

  it('filters by tags and keywords', () => {
    const res = filterToolList(tools, 'smpte', 'all');
    assert.strictEqual(res.length, 1);
    assert.strictEqual(res[0].id, 'timecode');
  });

  it('combines category and query', () => {
    assert.strictEqual(filterToolList(tools, 'contrast', 'video').length, 0);
    assert.strictEqual(filterToolList(tools, 'contrast', 'design').length, 1);
  });
});
