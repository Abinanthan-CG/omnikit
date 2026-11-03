export function envToJson(envText: string): Record<string, string> {
  if (!envText || typeof envText !== 'string') return {};

  const lines = envText.split(/\r?\n/);
  const result: Record<string, string> = {};

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const eqIdx = line.indexOf('=');
    if (eqIdx === -1) {
      result[line] = '';
      continue;
    }

    const key = line.slice(0, eqIdx).trim();
    let val = line.slice(eqIdx + 1).trim();

    // Remove wrapping quotes if present
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }

    result[key] = val;
  }

  return result;
}

export function jsonToEnv(jsonObj: Record<string, unknown>): string {
  if (!jsonObj || typeof jsonObj !== 'object') return '';

  const lines: string[] = [];
  for (const [key, val] of Object.entries(jsonObj)) {
    const strVal = String(val ?? '');
    // Wrap in quotes if contains spaces or special characters
    const needsQuotes = /\s|[#$"'\\=]/.test(strVal);
    const formattedVal = needsQuotes ? `"${strVal.replace(/"/g, '\\"')}"` : strVal;
    lines.push(`${key}=${formattedVal}`);
  }

  return lines.join('\n');
}
