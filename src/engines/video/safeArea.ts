export interface SafeRect {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface SafeAreaResults {
  width: number;
  height: number;
  actionSafe: SafeRect;
  titleSafe: SafeRect;
  socialSafeOverlay?: SafeRect;
}

export function calculateSafeAreas(width: number, height: number): SafeAreaResults {
  const w = Math.max(1, width);
  const h = Math.max(1, height);

  // SMPTE Action Safe (90%)
  const actionInsetX = Math.round(w * 0.05);
  const actionInsetY = Math.round(h * 0.05);
  const actionSafe: SafeRect = {
    x: actionInsetX,
    y: actionInsetY,
    width: w - actionInsetX * 2,
    height: h - actionInsetY * 2,
    top: actionInsetY,
    bottom: actionInsetY,
    left: actionInsetX,
    right: actionInsetX,
  };

  // SMPTE Title Safe (80%)
  const titleInsetX = Math.round(w * 0.1);
  const titleInsetY = Math.round(h * 0.1);
  const titleSafe: SafeRect = {
    x: titleInsetX,
    y: titleInsetY,
    width: w - titleInsetX * 2,
    height: h - titleInsetY * 2,
    top: titleInsetY,
    bottom: titleInsetY,
    left: titleInsetX,
    right: titleInsetX,
  };

  // Social 9:16 safe UI overlay (Instagram Reels / TikTok bottom 20% & right 15%)
  const socialSafeOverlay: SafeRect = {
    x: Math.round(w * 0.08),
    y: Math.round(h * 0.12), // top header exclusion
    width: Math.round(w * 0.77),
    height: Math.round(h * 0.68), // bottom caption exclusion
    top: Math.round(h * 0.12),
    bottom: Math.round(h * 0.2),
    left: Math.round(w * 0.08),
    right: Math.round(w * 0.15),
  };

  return {
    width: w,
    height: h,
    actionSafe,
    titleSafe,
    socialSafeOverlay,
  };
}
