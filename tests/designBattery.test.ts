import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '../src/engines/design/colorConverter.ts';
import { svgToDataUri, svgToReactJsx } from '../src/engines/design/svgTools.ts';
import { generateBoxShadowCss } from '../src/engines/design/boxShadow.ts';

describe('Color Converter Engine', () => {
  it('converts hex to rgb', () => {
    const rgb = hexToRgb('#3b82f6');
    assert.deepEqual(rgb, { r: 59, g: 130, b: 246 });
  });

  it('converts rgb to hex', () => {
    const hex = rgbToHex(59, 130, 246);
    assert.equal(hex.toLowerCase(), '#3b82f6');
  });

  it('converts rgb to hsl', () => {
    const hsl = rgbToHsl(255, 0, 0);
    assert.equal(hsl.h, 0);
    assert.equal(hsl.s, 100);
    assert.equal(hsl.l, 50);
  });

  it('converts hsl to rgb', () => {
    const rgb = hslToRgb(0, 100, 50);
    assert.deepEqual(rgb, { r: 255, g: 0, b: 0 });
  });
});

describe('SVG Tools Engine', () => {
  it('encodes svg into a clean data URI', () => {
    const svg = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>';
    const uri = svgToDataUri(svg);
    assert.ok(uri.startsWith('data:image/svg+xml,'));
    assert.ok(uri.includes('%3Csvg'));
  });

  it('transforms SVG into clean React JSX code', () => {
    const svg = '<svg class="icon" fill-rule="evenodd"><path stroke-width="2"/></svg>';
    const jsx = svgToReactJsx(svg, 'CustomIcon');
    assert.ok(jsx.includes('export function CustomIcon('));
    assert.ok(jsx.includes('className="icon"'));
    assert.ok(jsx.includes('fillRule="evenodd"'));
    assert.ok(jsx.includes('strokeWidth="2"'));
  });
});

describe('Box Shadow Engine', () => {
  it('generates single box shadow css rule', () => {
    const css = generateBoxShadowCss([
      { x: 0, y: 4, blur: 6, spread: -1, color: '#000000', opacity: 0.1, inset: false }
    ]);
    assert.equal(css, 'box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1);');
  });

  it('generates multi-layer box shadow css', () => {
    const css = generateBoxShadowCss([
      { x: 0, y: 10, blur: 15, spread: -3, color: '#000000', opacity: 0.1, inset: false },
      { x: 0, y: 4, blur: 6, spread: -4, color: '#000000', opacity: 0.1, inset: false }
    ]);
    assert.ok(css.includes('0px 10px 15px -3px'));
    assert.ok(css.includes('0px 4px 6px -4px'));
  });
});
