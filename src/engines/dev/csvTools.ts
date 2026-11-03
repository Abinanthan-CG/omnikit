export function jsonToCsv(jsonStr: string, delimiter: string = ','): string {
  if (!jsonStr.trim()) return '';
  let data: unknown;
  try {
    data = JSON.parse(jsonStr);
  } catch {
    return 'Invalid JSON';
  }

  if (!Array.isArray(data)) {
    data = [data];
  }

  const arr = data as Record<string, unknown>[];
  if (arr.length === 0) return '';

  const headers = Array.from(new Set(arr.flatMap(item => Object.keys(item))));

  const escapeCell = (val: unknown): string => {
    if (val === null || val === undefined) return '';
    const s = typeof val === 'object' ? JSON.stringify(val) : String(val);
    if (s.includes(delimiter) || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const headerRow = headers.map(escapeCell).join(delimiter);
  const rows = arr.map(item => {
    return headers.map(h => escapeCell(item[h])).join(delimiter);
  });

  return [headerRow, ...rows].join('\n');
}

export function csvToJson(csvStr: string, delimiter: string = ','): string {
  if (!csvStr.trim()) return '[]';

  const lines = csvStr.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length === 0) return '[]';

  const parseRow = (line: string): string[] => {
    const cells: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === delimiter && !inQuotes) {
        cells.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
    cells.push(current);
    return cells;
  };

  const headers = parseRow(lines[0]);
  const result: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = parseRow(lines[i]);
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = row[idx] || '';
    });
    result.push(obj);
  }

  return JSON.stringify(result, null, 2);
}
