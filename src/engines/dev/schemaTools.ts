export function inferJsonSchema(value: unknown): Record<string, unknown> {
  if (value === null) {
    return { type: 'null' };
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return { type: 'array', items: {} };
    }
    return {
      type: 'array',
      items: inferJsonSchema(value[0])
    };
  }

  const typeofVal = typeof value;

  if (typeofVal === 'string') {
    return { type: 'string' };
  }

  if (typeofVal === 'number') {
    return { type: Number.isInteger(value) ? 'integer' : 'number' };
  }

  if (typeofVal === 'boolean') {
    return { type: 'boolean' };
  }

  if (typeofVal === 'object') {
    const obj = value as Record<string, unknown>;
    const properties: Record<string, unknown> = {};
    const required: string[] = [];

    for (const key of Object.keys(obj)) {
      properties[key] = inferJsonSchema(obj[key]);
      required.push(key);
    }

    return {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'object',
      properties,
      required
    };
  }

  return { type: 'string' };
}

export function generateSchemaFromJson(jsonStr: string): string {
  if (!jsonStr.trim()) return '';
  try {
    const parsed = JSON.parse(jsonStr);
    const schema = inferJsonSchema(parsed);
    return JSON.stringify(schema, null, 2);
  } catch (err) {
    return `Error: ${(err as Error).message}`;
  }
}
