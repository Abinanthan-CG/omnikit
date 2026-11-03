export interface JsonToTsOptions {
  rootInterfaceName?: string;
  useTypeAlias?: boolean;
}

export function jsonToTypeScript(jsonStr: string, options: JsonToTsOptions = {}): string {
  const rootName = options.rootInterfaceName?.trim() || 'RootObject';
  const useType = options.useTypeAlias ?? false;

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Invalid JSON: ${msg}`);
  }

  const interfaces: Map<string, string> = new Map();

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function inferType(val: unknown, propName: string): string {
    if (val === null) return 'null';
    if (val === undefined) return 'undefined';

    const type = typeof val;
    if (type === 'string') return 'string';
    if (type === 'number') return 'number';
    if (type === 'boolean') return 'boolean';

    if (Array.isArray(val)) {
      if (val.length === 0) return 'unknown[]';
      const itemTypes = Array.from(new Set(val.map((item) => inferType(item, `${propName}Item`))));
      if (itemTypes.length === 1) {
        return `${itemTypes[0]}[]`;
      }
      return `(${itemTypes.join(' | ')})[]`;
    }

    if (type === 'object') {
      const typeName = capitalize(propName);
      generateInterface(val as Record<string, unknown>, typeName);
      return typeName;
    }

    return 'unknown';
  }

  function generateInterface(obj: Record<string, unknown>, name: string): void {
    if (interfaces.has(name)) return;

    const lines: string[] = [];
    const keyword = useType ? `export type ${name} = {` : `export interface ${name} {`;
    lines.push(keyword);

    for (const [key, val] of Object.entries(obj)) {
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
      const inferred = inferType(val, key);
      lines.push(`  ${safeKey}: ${inferred};`);
    }

    lines.push(useType ? '};' : '}');
    interfaces.set(name, lines.join('\n'));
  }

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      generateInterface(parsed[0] as Record<string, unknown>, rootName);
      return `${Array.from(interfaces.values()).join('\n\n')}\n\nexport type ${rootName}List = ${rootName}[];`;
    }
    const itemType = parsed.length > 0 ? inferType(parsed[0], 'Item') : 'unknown';
    return `export type ${rootName} = ${itemType}[];`;
  }

  if (typeof parsed === 'object' && parsed !== null) {
    generateInterface(parsed as Record<string, unknown>, rootName);
    return Array.from(interfaces.values()).join('\n\n');
  }

  return `export type ${rootName} = ${typeof parsed};`;
}
