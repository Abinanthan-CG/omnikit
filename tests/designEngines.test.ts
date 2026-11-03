import { describe, it } from 'node:test';
import assert from 'node:assert';
import { calculateWcagContrast, hexToRgb, getRelativeLuminance } from '../src/engines/design/contrast.ts';
import { convertPxRem, generatePxRemScale } from '../src/engines/design/pxRem.ts';

describe('WCAG Contrast Engine', () => {
  it('computes 21:1 for pure black on pure white', () => {
    const res = calculateWcagContrast('#000000', '#ffffff');
    assert.strictEqual(res.success, true);
    assert.ok(Math.abs((res.value?.ratio ?? 0) - 21.0) < 0.1);
    assert.strictEqual(res.value?.aaNormal, true);
    assert.strictEqual(res.value?.aaaNormal, true);
    assert.strictEqual(res.value?.aaLarge, true);
    assert.strictEqual(res.value?.aaaLarge, true);
  });

  it('computes 1:1 for identical colors', () => {
    const res = calculateWcagContrast('#ff0000', '#ff0000');
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.ratio, 1.0);
    assert.strictEqual(res.value?.aaNormal, false);
  });

  it('correctly assesses poor contrast below 4.5', () => {
    const res = calculateWcagContrast('#888888', '#ffffff');
    assert.strictEqual(res.success, true);
    assert.ok((res.value?.ratio ?? 0) < 4.5);
    assert.strictEqual(res.value?.aaNormal, false);
  });

  it('rejects invalid hex codes', () => {
    assert.strictEqual(calculateWcagContrast('xyz', '#fff').success, false);
    assert.strictEqual(calculateWcagContrast(null as any, '#fff').success, false);
    assert.strictEqual(calculateWcagContrast('#fff', undefined as any).success, false);
  });
});

describe('PX-to-REM Engine', () => {
  it('converts 16px to 1rem with base 16', () => {
    const res = convertPxRem(16, 16, 'px-to-rem');
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.result, 1);
    assert.strictEqual(res.value?.cssString, '1rem');
  });

  it('converts 24px to 1.5rem with base 16', () => {
    const res = convertPxRem(24, 16, 'px-to-rem');
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.result, 1.5);
    assert.strictEqual(res.value?.cssString, '1.5rem');
  });

  it('converts 2rem to 32px with base 16', () => {
    const res = convertPxRem(2, 16, 'rem-to-px');
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.result, 32);
    assert.strictEqual(res.value?.cssString, '32px');
  });

  it('generates a lookup scale table', () => {
    const scale = generatePxRemScale(16);
    assert.ok(scale.length > 5);
    const item16 = scale.find(s => s.px === 16);
    assert.strictEqual(item16?.rem, 1);
  });
});
