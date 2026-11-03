import { describe, it } from 'node:test';
import assert from 'node:assert';
import { convertCase, getAllCaseVariants } from '../src/engines/writing/caseConverter.ts';
import { analyzeTextMetrics } from '../src/engines/writing/wordMetrics.ts';

describe('Case Converter Engine', () => {
  const input = 'hello world of digital tools';

  it('converts to camelCase', () => {
    assert.strictEqual(convertCase(input, 'camel').value, 'helloWorldOfDigitalTools');
  });

  it('converts to PascalCase', () => {
    assert.strictEqual(convertCase(input, 'pascal').value, 'HelloWorldOfDigitalTools');
  });

  it('converts to kebab-case', () => {
    assert.strictEqual(convertCase(input, 'kebab').value, 'hello-world-of-digital-tools');
  });

  it('converts to snake_case', () => {
    assert.strictEqual(convertCase(input, 'snake').value, 'hello_world_of_digital_tools');
  });

  it('converts to CONSTANT_CASE', () => {
    assert.strictEqual(convertCase(input, 'constant').value, 'HELLO_WORLD_OF_DIGITAL_TOOLS');
  });

  it('converts to intelligent Title Case preserving minor words', () => {
    assert.strictEqual(convertCase('a tale of two cities', 'title').value, 'A Tale of Two Cities');
  });

  it('converts to Sentence case', () => {
    assert.strictEqual(convertCase('hello WORLD. this is cool.', 'sentence').value, 'Hello world. This is cool.');
  });

  it('returns all variants at once', () => {
    const all = getAllCaseVariants('simple test');
    assert.strictEqual(all.camel, 'simpleTest');
    assert.strictEqual(all.kebab, 'simple-test');
  });

  it('handles empty input gracefully', () => {
    assert.strictEqual(convertCase('', 'camel').value, '');
  });
});

describe('Word Metrics Engine', () => {
  it('accurately counts words, characters, and sentences', () => {
    const text = 'Omnikit is a Swiss Army knife. It has multiple utilities!';
    const res = analyzeTextMetrics(text);
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.words, 10);
    assert.strictEqual(res.value?.sentences, 2);
    assert.strictEqual(res.value?.paragraphs, 1);
    assert.ok((res.value?.readingTimeSeconds ?? 0) > 0);
    assert.ok((res.value?.speakingTimeSeconds ?? 0) > 0);
  });

  it('handles empty string without NaN', () => {
    const res = analyzeTextMetrics('');
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.words, 0);
    assert.strictEqual(res.value?.characters, 0);
    assert.strictEqual(res.value?.readingTimeMinutes, 0);
  });
});
