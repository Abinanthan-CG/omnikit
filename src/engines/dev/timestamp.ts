import type { EngineResult } from '../../types/tool.ts';

export interface TimestampResult {
  seconds: number;
  milliseconds: number;
  utc: string;
  local: string;
  relative: string;
  dayOfWeek: string;
  dayOfYear: number;
  isLeapYear: boolean;
}

export function isLeap(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDayOfYear(date: Date): number {
  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export function getRelativeTimeString(date: Date): string {
  const now = Date.now();
  const diffSec = Math.round((date.getTime() - now) / 1000);
  const absSec = Math.abs(diffSec);

  const prefix = diffSec < 0 ? '' : 'in ';
  const suffix = diffSec < 0 ? ' ago' : '';

  if (absSec < 5) return 'just now';
  if (absSec < 60) return `${prefix}${absSec}s${suffix}`;
  const minutes = Math.floor(absSec / 60);
  if (minutes < 60) return `${prefix}${minutes}m${suffix}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${prefix}${hours}h${suffix}`;
  const days = Math.floor(hours / 24);
  return `${prefix}${days}d${suffix}`;
}

export function getCurrentTimestamp(): TimestampResult {
  const now = new Date();
  const ms = now.getTime();
  const sec = Math.floor(ms / 1000);

  return {
    seconds: sec,
    milliseconds: ms,
    utc: now.toISOString(),
    local: now.toLocaleString(),
    relative: 'just now',
    dayOfWeek: now.toLocaleDateString('en-US', { weekday: 'long' }),
    dayOfYear: getDayOfYear(now),
    isLeapYear: isLeap(now.getUTCFullYear()),
  };
}

export function convertTimestamp(input: string | number): EngineResult<TimestampResult> {
  let date: Date;

  if (typeof input === 'number') {
    // If input < 1e11, it's seconds, else milliseconds
    const ms = input < 1e11 ? input * 1000 : input;
    date = new Date(ms);
  } else {
    const trimmed = input.trim();
    if (!trimmed) {
      return { success: false, error: 'Input cannot be empty' };
    }

    if (/^-?\d+$/.test(trimmed)) {
      const num = parseInt(trimmed, 10);
      const ms = num < 1e11 ? num * 1000 : num;
      date = new Date(ms);
    } else {
      date = new Date(trimmed);
    }
  }

  if (isNaN(date.getTime())) {
    return {
      success: false,
      error: 'Invalid date or timestamp. Provide unix epoch seconds/ms or ISO date string.',
    };
  }

  const ms = date.getTime();
  const sec = Math.floor(ms / 1000);

  return {
    success: true,
    value: {
      seconds: sec,
      milliseconds: ms,
      utc: date.toISOString(),
      local: date.toLocaleString(),
      relative: getRelativeTimeString(date),
      dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' }),
      dayOfYear: getDayOfYear(date),
      isLeapYear: isLeap(date.getUTCFullYear()),
    },
  };
}
