export interface MatteMatrics {
  type: 'letterbox' | 'pillarbox' | 'exact-fit';
  contentWidth: number;
  contentHeight: number;
  matteSizePx: number;
  topBottomBarPx: number;
  leftRightBarPx: number;
  activeAreaPercent: number;
  matteWastePercent: number;
}

export function calculateMatte(
  sourceW: number,
  sourceH: number,
  containerW: number,
  containerH: number
): MatteMatrics {
  const sw = Math.max(1, sourceW || 1920);
  const sh = Math.max(1, sourceH || 1080);
  const cw = Math.max(1, containerW || 1920);
  const ch = Math.max(1, containerH || 1080);

  const sourceAspect = sw / sh;
  const containerAspect = cw / ch;

  let contentW = cw;
  let contentH = ch;
  let topBottom = 0;
  let leftRight = 0;
  let type: 'letterbox' | 'pillarbox' | 'exact-fit' = 'exact-fit';

  // Compare aspect ratios (epsilon 0.001)
  if (Math.abs(sourceAspect - containerAspect) < 0.001) {
    type = 'exact-fit';
    contentW = cw;
    contentH = ch;
  } else if (sourceAspect > containerAspect) {
    // Source is wider than container -> Letterbox (black bars top & bottom)
    type = 'letterbox';
    contentW = cw;
    contentH = Math.round((cw / sourceAspect) / 2) * 2;
    topBottom = Math.round((ch - contentH) / 2);
  } else {
    // Source is taller than container -> Pillarbox (black bars left & right)
    type = 'pillarbox';
    contentH = ch;
    contentW = Math.round((ch * sourceAspect) / 2) * 2;
    leftRight = Math.round((cw - contentW) / 2);
  }

  const containerTotalPx = cw * ch;
  const contentTotalPx = contentW * contentH;
  const activePercent = Math.round((contentTotalPx / containerTotalPx) * 1000) / 10;
  const wastePercent = Math.round((100 - activePercent) * 10) / 10;

  return {
    type,
    contentWidth: contentW,
    contentHeight: contentH,
    matteSizePx: type === 'letterbox' ? topBottom : leftRight,
    topBottomBarPx: topBottom,
    leftRightBarPx: leftRight,
    activeAreaPercent: activePercent,
    matteWastePercent: wastePercent
  };
}
