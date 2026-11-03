export interface DecibelResult {
  db: number;
  voltageRatio: number;
  powerRatio: number;
  percentageChange: number;
}

export function dbToRatios(db: number): DecibelResult {
  const safeDb = db || 0;
  const voltageRatio = Math.pow(10, safeDb / 20);
  const powerRatio = Math.pow(10, safeDb / 10);
  const percentageChange = (voltageRatio - 1) * 100;

  return {
    db: safeDb,
    voltageRatio: Math.round(voltageRatio * 1000) / 1000,
    powerRatio: Math.round(powerRatio * 1000) / 1000,
    percentageChange: Math.round(percentageChange * 10) / 10
  };
}

export function ratioToDb(voltageRatio: number): { db: number; powerRatio: number } {
  const safeRatio = Math.max(0.00001, voltageRatio || 1);
  const db = 20 * Math.log10(safeRatio);
  const powerRatio = Math.pow(safeRatio, 2);

  return {
    db: Math.round(db * 100) / 100,
    powerRatio: Math.round(powerRatio * 1000) / 1000
  };
}
