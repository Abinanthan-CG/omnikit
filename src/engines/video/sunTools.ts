export interface SunTimesResult {
  date: string;
  solarNoon: string;
  sunrise: string;
  sunset: string;
  morningGoldenHour: string;
  eveningGoldenHour: string;
  morningBlueHour: string;
  eveningBlueHour: string;
  dayLengthHours: number;
}

export function calculateSunTimes(lat: number, lng: number, date: Date = new Date()): SunTimesResult {
  const safeLat = Math.max(-90, Math.min(90, lat || 37.7749));
  const safeLng = Math.max(-180, Math.min(180, lng || -122.4194));

  const rad = (d: number) => (d * Math.PI) / 180;
  const deg = (r: number) => (r * 180) / Math.PI;

  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);

  // Solar declination approx
  const declination = deg(23.45 * Math.sin(rad((360 / 365) * (dayOfYear - 81))));

  // Hour angle calculation for a given sun elevation angle
  const calculateHourAngle = (elevationAngle: number): number => {
    const latRad = rad(safeLat);
    const decRad = rad(declination);
    const elevRad = rad(elevationAngle);

    const cosH = (Math.sin(elevRad) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
    if (cosH > 1) return 0; // Polar night
    if (cosH < -1) return 180; // Midnight sun
    return deg(Math.acos(cosH));
  };

  // Solar noon in hours UTC (approx)
  const solarNoonUtc = 12 - (safeLng / 15);

  const formatHours = (utcHours: number): string => {
    // Convert to local time offset
    const localOffset = -date.getTimezoneOffset() / 60;
    let localHours = (utcHours + localOffset + 24) % 24;
    const h = Math.floor(localHours);
    const m = Math.floor((localHours - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  // Standard horizon (-0.833 deg)
  const sunriseH = calculateHourAngle(-0.833);
  const sunriseUtc = solarNoonUtc - (sunriseH / 15);
  const sunsetUtc = solarNoonUtc + (sunriseH / 15);

  // Golden hour (between -4 deg and +6 deg)
  const goldenH1 = calculateHourAngle(-4);
  const goldenH2 = calculateHourAngle(6);

  const mornGoldenStart = solarNoonUtc - (goldenH1 / 15);
  const mornGoldenEnd = solarNoonUtc - (goldenH2 / 15);

  const eveGoldenStart = solarNoonUtc + (goldenH2 / 15);
  const eveGoldenEnd = solarNoonUtc + (goldenH1 / 15);

  // Blue hour (between -6 deg and -4 deg)
  const blueH = calculateHourAngle(-6);
  const mornBlueStart = solarNoonUtc - (blueH / 15);
  const eveBlueEnd = solarNoonUtc + (blueH / 15);

  const dayLengthHours = Math.round((sunsetUtc - sunriseUtc) * 10) / 10;

  return {
    date: date.toISOString().slice(0, 10),
    solarNoon: formatHours(solarNoonUtc),
    sunrise: formatHours(sunriseUtc),
    sunset: formatHours(sunsetUtc),
    morningGoldenHour: `${formatHours(mornGoldenStart)} - ${formatHours(mornGoldenEnd)}`,
    eveningGoldenHour: `${formatHours(eveGoldenStart)} - ${formatHours(eveGoldenEnd)}`,
    morningBlueHour: `${formatHours(mornBlueStart)} - ${formatHours(mornGoldenStart)}`,
    eveningBlueHour: `${formatHours(eveGoldenEnd)} - ${formatHours(eveBlueEnd)}`,
    dayLengthHours: Math.max(0, dayLengthHours)
  };
}
