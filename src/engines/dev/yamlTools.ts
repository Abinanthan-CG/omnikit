export function jsonToYaml(jsonStr: string): string {
  try {
    const obj = JSON.parse(jsonStr);
    return serializeYaml(obj, 0);
  } catch (err) {
    throw new Error('Invalid JSON: ' + (err instanceof Error ? err.message : String(err)));
  }
}

function serializeYaml(val: unknown, indent = 0): string {
  const pad = ' '.repeat(indent);

  if (val === null || val === undefined) return 'null\n';
  if (typeof val === 'boolean' || typeof val === 'number') return `${val}\n`;
  if (typeof val === 'string') {
    if (val.includes('\n') || val.includes(': ') || val.includes('"') || val.includes("'")) {
      return `"${val.replace(/"/g, '\\"')}"\n`;
    }
    return `${val}\n`;
  }

  if (Array.isArray(val)) {
    if (val.length === 0) return '[]\n';
    let res = '\n';
    for (const item of val) {
      res += `${pad}- ${serializeYaml(item, indent + 2).trimStart()}`;
    }
    return res;
  }

  if (typeof val === 'object') {
    const keys = Object.keys(val as Record<string, unknown>);
    if (keys.length === 0) return '{}\n';
    let res = indent > 0 ? '\n' : '';
    for (const k of keys) {
      const v = (val as Record<string, unknown>)[k];
      res += `${pad}${k}: ${serializeYaml(v, indent + 2).trimStart()}`;
    }
    return res;
  }

  return `${String(val)}\n`;
}

export function yamlToJson(yamlStr: string, indent = 2): string {
  // Simple YAML line-by-line parser for standard key-value and list structures
  const lines = yamlStr.split(/\r?\n/).filter(l => l.trim() && !l.trim().startsWith('#'));
  const root: Record<string, unknown> = {};

  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const k = line.slice(0, colonIdx).trim();
      let v: unknown = line.slice(colonIdx + 1).trim();

      if (v === 'true') v = true;
      else if (v === 'false') v = false;
      else if (v === 'null') v = null;
      else if (!isNaN(Number(v)) && (v as string).length > 0) v = Number(v);
      else if (typeof v === 'string' && (v.startsWith('"') && v.endsWith('"') || v.startsWith("'") && v.endsWith("'"))) {
        v = (v as string).slice(1, -1);
      }

      root[k] = v;
    }
  }

  return JSON.stringify(root, null, indent);
}
