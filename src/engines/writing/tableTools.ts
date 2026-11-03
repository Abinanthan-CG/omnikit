export type ColumnAlignment = 'left' | 'center' | 'right';

export interface MarkdownTableConfig {
  headers: string[];
  alignments: ColumnAlignment[];
  rows: string[][];
}

export function generateMarkdownTable(config: MarkdownTableConfig): string {
  const { headers, alignments, rows } = config;
  const colCount = headers.length;
  if (colCount === 0) return '';

  // Determine maximum width per column
  const colWidths = headers.map((h, i) => {
    let max = Math.max(h.length, 3);
    for (const row of rows) {
      const cell = row[i] || '';
      if (cell.length > max) max = cell.length;
    }
    return max;
  });

  // Header row
  const headerRow = '| ' + headers.map((h, i) => h.padEnd(colWidths[i], ' ')).join(' | ') + ' |';

  // Separator row
  const separatorRow = '| ' + alignments.map((align, i) => {
    const width = colWidths[i];
    if (align === 'center') {
      return ':' + '-'.repeat(Math.max(1, width - 2)) + ':';
    } else if (align === 'right') {
      return '-'.repeat(Math.max(1, width - 1)) + ':';
    } else {
      return ':' + '-'.repeat(Math.max(1, width - 1));
    }
  }).join(' | ') + ' |';

  // Body rows
  const bodyRows = rows.map(row => {
    return '| ' + headers.map((_, i) => {
      const cell = row[i] || '';
      const width = colWidths[i];
      const align = alignments[i] || 'left';
      if (align === 'right') {
        return cell.padStart(width, ' ');
      } else if (align === 'center') {
        const totalPad = width - cell.length;
        const leftPad = Math.floor(totalPad / 2);
        const rightPad = totalPad - leftPad;
        return ' '.repeat(leftPad) + cell + ' '.repeat(rightPad);
      } else {
        return cell.padEnd(width, ' ');
      }
    }).join(' | ') + ' |';
  });

  return [headerRow, separatorRow, ...bodyRows].join('\n');
}
