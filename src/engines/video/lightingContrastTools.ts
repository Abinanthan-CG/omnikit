export interface LightingContrast {
  ratioText: string;
  ratioDecimal: number;
  stopDifference: number;
  moodDescription: string;
}

export function calculateLightingRatio(keyFootCandles: number, fillFootCandles: number): LightingContrast {
  const key = Math.max(0.1, keyFootCandles || 100);
  const fill = Math.max(0.1, fillFootCandles || 50);

  // Lighting ratio = (Key + Fill) : Fill
  const totalKeySide = key + fill;
  const ratioVal = totalKeySide / fill;
  const roundedRatio = Math.round(ratioVal * 10) / 10;

  // Stop difference = log2(ratioVal)
  const stops = Math.round(Math.log2(ratioVal) * 10) / 10;

  let mood = 'Balanced High-Key (Daylight TV, Sitcoms, Commercials)';
  if (ratioVal >= 16) {
    mood = 'Extreme Low-Key / Silhouette (Horror, Thriller, High Contrast)';
  } else if (ratioVal >= 8) {
    mood = 'Dramatic Chiaroscuro (Film Noir, Moody Cinema Drama)';
  } else if (ratioVal >= 4) {
    mood = 'Standard Cinematic Drama (Defined Shadows with Detail)';
  } else if (ratioVal >= 3) {
    mood = 'Subtle Drama / Natural Portraiture';
  }

  return {
    ratioText: `${roundedRatio}:1`,
    ratioDecimal: roundedRatio,
    stopDifference: stops,
    moodDescription: mood
  };
}
