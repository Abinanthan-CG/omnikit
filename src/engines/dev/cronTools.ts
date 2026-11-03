export interface CronHumanizeResult {
  success: boolean;
  expression: string;
  description: string;
  parts: {
    minute: string;
    hour: string;
    dayOfMonth: string;
    month: string;
    dayOfWeek: string;
  };
  error?: string;
}

export function humanizeCron(cronStr: string): CronHumanizeResult {
  const parts = cronStr.trim().split(/\s+/);
  if (parts.length !== 5) {
    return {
      success: false,
      expression: cronStr,
      description: 'Invalid cron expression: expected 5 space-separated parts',
      parts: { minute: '', hour: '', dayOfMonth: '', month: '', dayOfWeek: '' },
      error: 'Expected 5 parts (minute hour day-of-month month day-of-week)',
    };
  }

  const [min, hour, dom, mon, dow] = parts;

  let desc = 'Runs: ';

  if (min === '*' && hour === '*') {
    desc += 'Every minute';
  } else if (min.startsWith('*/')) {
    const interval = min.slice(2);
    desc += `Every ${interval} minutes`;
    if (hour !== '*') desc += ` during hour ${hour}`;
  } else if (hour === '*' && min !== '*') {
    desc += `At minute ${min} past every hour`;
  } else if (hour !== '*' && min !== '*') {
    desc += `At ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`;
  }

  if (dom !== '*') {
    desc += ` on day ${dom} of the month`;
  }

  if (mon !== '*') {
    desc += ` in month ${mon}`;
  }

  if (dow !== '*') {
    if (dow === '1-5') {
      desc += ' on Monday through Friday';
    } else if (dow === '0,6' || dow === '6,0') {
      desc += ' on weekends';
    } else {
      desc += ` on day-of-week ${dow}`;
    }
  }

  return {
    success: true,
    expression: cronStr,
    description: desc,
    parts: {
      minute: min,
      hour: hour,
      dayOfMonth: dom,
      month: mon,
      dayOfWeek: dow,
    },
  };
}
