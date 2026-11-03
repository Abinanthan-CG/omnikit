export interface BoxModelMetrics {
  contentWidth: number;
  contentHeight: number;
  totalRenderedWidth: number;
  totalRenderedHeight: number;
  cssRuleSnippet: string;
}

export function calculateBoxModel(
  width: number,
  height: number,
  padding: number,
  border: number,
  boxSizing: 'content-box' | 'border-box'
): BoxModelMetrics {
  const w = Math.max(0, width || 200);
  const h = Math.max(0, height || 100);
  const p = Math.max(0, padding || 0);
  const b = Math.max(0, border || 0);

  const horizontalExtra = (p + b) * 2;
  const verticalExtra = (p + b) * 2;

  let contentW: number;
  let contentH: number;
  let totalW: number;
  let totalH: number;

  if (boxSizing === 'border-box') {
    totalW = w;
    totalH = h;
    contentW = Math.max(0, w - horizontalExtra);
    contentH = Math.max(0, h - verticalExtra);
  } else {
    contentW = w;
    contentH = h;
    totalW = w + horizontalExtra;
    totalH = h + verticalExtra;
  }

  const snippet = `/* ${boxSizing} */
box-sizing: ${boxSizing};
width: ${w}px;
height: ${h}px;
padding: ${p}px;
border: ${b}px solid currentColor;
/* Rendered Outer Size: ${totalW}px × ${totalH}px */`;

  return {
    contentWidth: contentW,
    contentHeight: contentH,
    totalRenderedWidth: totalW,
    totalRenderedHeight: totalH,
    cssRuleSnippet: snippet
  };
}
