import type { EngineResult } from '../../types/tool.ts';

export interface NoteTiming {
  name: string;
  fraction: string;
  normal: number;
  dotted: number;
  triplet: number;
  hz: number;
}

export interface BpmTimingResult {
  bpm: number;
  notes: {
    whole: NoteTiming;
    half: NoteTiming;
    quarter: NoteTiming;
    eighth: NoteTiming;
    sixteenth: NoteTiming;
    thirtySecond: NoteTiming;
    sixtyFourth: NoteTiming;
  };
  reverb: {
    preDelayTight: number; // 1/64
    preDelayMedium: number; // 1/32
    preDelayLoose: number; // 1/16 triplet
    oneBar: number;
    twoBars: number;
    fourBars: number;
  };
}

function createNoteTiming(name: string, fraction: string, baseMs: number): NoteTiming {
  const normal = Math.round(baseMs * 100) / 100;
  const dotted = Math.round(baseMs * 1.5 * 100) / 100;
  const triplet = Math.round(baseMs * (2 / 3) * 100) / 100;
  const hz = Math.round((1000 / baseMs) * 100) / 100;

  return { name, fraction, normal, dotted, triplet, hz };
}

export function calculateBpmTimings(bpm: number): EngineResult<BpmTimingResult> {
  if (!bpm || !Number.isFinite(bpm) || bpm <= 0) {
    return {
      success: false,
      error: 'BPM must be a positive finite number greater than 0',
    };
  }

  const quarterMs = 60000 / bpm;

  const whole = createNoteTiming('Whole', '1/1', quarterMs * 4);
  const half = createNoteTiming('Half', '1/2', quarterMs * 2);
  const quarter = createNoteTiming('Quarter', '1/4', quarterMs);
  const eighth = createNoteTiming('Eighth', '1/8', quarterMs / 2);
  const sixteenth = createNoteTiming('Sixteenth', '1/16', quarterMs / 4);
  const thirtySecond = createNoteTiming('Thirty-Second', '1/32', quarterMs / 8);
  const sixtyFourth = createNoteTiming('Sixty-Fourth', '1/64', quarterMs / 16);

  return {
    success: true,
    value: {
      bpm,
      notes: {
        whole,
        half,
        quarter,
        eighth,
        sixteenth,
        thirtySecond,
        sixtyFourth,
      },
      reverb: {
        preDelayTight: sixtyFourth.normal,
        preDelayMedium: thirtySecond.normal,
        preDelayLoose: sixteenth.triplet,
        oneBar: Math.round(quarterMs * 4),
        twoBars: Math.round(quarterMs * 8),
        fourBars: Math.round(quarterMs * 16),
      },
    },
  };
}
