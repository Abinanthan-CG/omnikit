export interface SqlMinifyResult {
  minifiedSql: string;
  originalBytes: number;
  minifiedBytes: number;
  savingsPercent: number;
}

export function minifySql(sql: string): SqlMinifyResult {
  if (!sql || typeof sql !== 'string') {
    return { minifiedSql: '', originalBytes: 0, minifiedBytes: 0, savingsPercent: 0 };
  }

  const originalBytes = new TextEncoder().encode(sql).length;

  // 1. Remove multi-line comments /* ... */
  let cleaned = sql.replace(/\/\*[\s\S]*?\*\//g, ' ');

  // 2. Remove single-line comments -- ...
  cleaned = cleaned.replace(/--.*$/gm, ' ');

  // 3. Normalize whitespace
  cleaned = cleaned.replace(/\s+/g, ' ');

  // 4. Remove spaces around operators and parentheses
  cleaned = cleaned
    .replace(/\s*([,;()=><+\-*/])\s*/g, '$1')
    .replace(/\b(SELECT|FROM|WHERE|INSERT|INTO|UPDATE|DELETE|JOIN|LEFT|RIGHT|INNER|OUTER|GROUP|BY|ORDER|HAVING|LIMIT)\b/gi, (m) => ` ${m.toUpperCase()} `)
    .replace(/\s+/g, ' ')
    .trim();

  const minifiedBytes = new TextEncoder().encode(cleaned).length;
  const savings = originalBytes > 0
    ? Math.max(0, Math.round(((originalBytes - minifiedBytes) / originalBytes) * 1000) / 10)
    : 0;

  return {
    minifiedSql: cleaned,
    originalBytes,
    minifiedBytes,
    savingsPercent: savings
  };
}
