export type ColorBlindType = 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export interface SimulatedColor {
  type: ColorBlindType;
  name: string;
  simulatedHex: string;
  simulatedRgb: { r: number; g: number; b: number };
}

// Brettel / Machado color transformation matrices
const MATRICES: Record<ColorBlindType, number[][]> = {
  protanopia: [
    [0.56667, 0.43333, 0.0],
    [0.55833, 0.44167, 0.0],
    [0.0, 0.24167, 0.75833]
  ],
  deuteranopia: [
    [0.625, 0.375, 0.0],
    [0.7, 0.3, 0.0],
    [0.0, 0.3, 0.7]
  ],
  tritanopia: [
    [0.95, 0.05, 0.0],
    [0.0, 0.43333, 0.56667],
    [0.0, 0.475, 0.525]
  ],
  achromatopsia: [
    [0.299, 0.587, 0.114],
    [0.299, 0.587, 0.114],
    [0.299, 0.587, 0.114]
  ]
};

export function simulateColorBlindness(hexColor: string): SimulatedColor[] {
  const cleanHex = hexColor.replace('#', '').trim();
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;

  const types: { type: ColorBlindType; name: string }[] = [
    { type: 'protanopia', name: 'Protanopia (Red-Blind / 1% males)' },
    { type: 'deuteranopia', name: 'Deuteranopia (Green-Blind / 6% males)' },
    { type: 'tritanopia', name: 'Tritanopia (Blue-Blind / Rare)' },
    { type: 'achromatopsia', name: 'Achromatopsia (Complete Monochromacy)' }
  ];

  return types.map(({ type, name }) => {
    const mat = MATRICES[type];
    const simR = Math.min(255, Math.max(0, Math.round(r * mat[0][0] + g * mat[0][1] + b * mat[0][2])));
    const simG = Math.min(255, Math.max(0, Math.round(r * mat[1][0] + g * mat[1][1] + b * mat[1][2])));
    const simB = Math.min(255, Math.max(0, Math.round(r * mat[2][0] + g * mat[2][1] + b * mat[2][2])));

    const hexStr = `#${simR.toString(16).padStart(2, '0')}${simG.toString(16).padStart(2, '0')}${simB.toString(16).padStart(2, '0')}`.toUpperCase();

    return {
      type,
      name,
      simulatedHex: hexStr,
      simulatedRgb: { r: simR, g: simG, b: simB }
    };
  });
}
