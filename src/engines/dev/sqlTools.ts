export interface SqlFormatOptions {
  uppercase?: boolean;
  indent?: string;
}

export function formatSql(sql: string, options: SqlFormatOptions = {}): string {
  if (!sql.trim()) return '';

  const uppercase = options.uppercase ?? true;
  const indent = options.indent ?? '  ';

  const majorClauses = [
    'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'HAVING', 'GROUP BY', 'ORDER BY',
    'LIMIT', 'OFFSET', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN',
    'CROSS JOIN', 'JOIN', 'ON', 'UNION ALL', 'UNION', 'INSERT INTO', 'VALUES',
    'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE'
  ];

  // Tokenize preserving strings
  let normalized = sql.replace(/\s+/g, ' ').trim();

  // If uppercase requested, uppercase keywords
  if (uppercase) {
    majorClauses.forEach(clause => {
      const regex = new RegExp(`\\b${clause.replace(/ /g, '\\s+')}\\b`, 'gi');
      normalized = normalized.replace(regex, clause.toUpperCase());
    });
  }

  // Insert linebreaks before major clauses
  let formatted = normalized;
  majorClauses.forEach(clause => {
    const regex = new RegExp(`\\s*\\b(${clause.replace(/ /g, '\\s+')})\\b\\s*`, 'gi');
    formatted = formatted.replace(regex, (match) => {
      const kw = uppercase ? match.trim().toUpperCase() : match.trim();
      return `\n${kw} `;
    });
  });

  // Clean up comma indentation in SELECT / column lists
  formatted = formatted.replace(/,\s*/g, ',\n' + indent);

  // Clean double newlines and trim
  const lines = formatted.split('\n').map(l => l.trim()).filter(Boolean);
  
  const result: string[] = [];
  for (const line of lines) {
    const isMajor = majorClauses.some(c => line.toUpperCase().startsWith(c.toUpperCase()));
    if (isMajor) {
      result.push(line);
    } else {
      result.push(indent + line);
    }
  }

  return result.join('\n');
}
