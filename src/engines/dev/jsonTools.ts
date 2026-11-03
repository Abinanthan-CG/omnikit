import type { EngineResult } from '../../types/tool.ts';

export interface JsonResult {
  formatted: string;
  isValid: boolean;
  wasRepaired: boolean;
  byteSize: number;
  itemCount?: number;
  errorLocation?: { line: number; column: number };
}

export function repairJsonString(raw: string): string {
  let text = raw.trim();

  // Strip single line and multi-line comments
  text = text.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');

  // Convert unquoted keys: { key: "value" } -> { "key": "value" }
  text = text.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');

  // Convert single-quoted string values/keys to double quotes: 'value' -> "value"
  text = text.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, (_, inner) => {
    return `"${inner.replace(/"/g, '\\"')}"`;
  });

  // Remove trailing commas before closing braces/brackets
  text = text.replace(/,(\s*[}\]])/g, '$1');

  return text;
}

export function formatAndRepairJson(
  rawJson: string,
  indent: number = 2
): EngineResult<JsonResult> {
  const trimmed = rawJson.trim();
  if (!trimmed) {
    return {
      success: false,
      error: 'JSON string cannot be empty',
    };
  }

  // 1. First attempt native JSON.parse
  try {
    const parsed = JSON.parse(trimmed);
    const formatted = indent === 0 ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent);
    const byteSize = new TextEncoder().encode(formatted).length;
    const itemCount = Array.isArray(parsed)
      ? parsed.length
      : typeof parsed === 'object' && parsed !== null
        ? Object.keys(parsed).length
        : undefined;

    return {
      success: true,
      value: {
        formatted,
        isValid: true,
        wasRepaired: false,
        byteSize,
        itemCount,
      },
    };
  } catch (initialErr: any) {
    // 2. Attempt automatic repair
    try {
      const repaired = repairJsonString(trimmed);
      const parsed = JSON.parse(repaired);
      const formatted = indent === 0 ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent);
      const byteSize = new TextEncoder().encode(formatted).length;
      const itemCount = Array.isArray(parsed)
        ? parsed.length
        : typeof parsed === 'object' && parsed !== null
          ? Object.keys(parsed).length
          : undefined;

      return {
        success: true,
        value: {
          formatted,
          isValid: true,
          wasRepaired: true,
          byteSize,
          itemCount,
        },
      };
    } catch {
      // Extract line/column error if possible
      let errorLocation: { line: number; column: number } | undefined;
      const match = initialErr.message.match(/at position (\d+)/);
      if (match) {
        const pos = parseInt(match[1], 10);
        const lines = trimmed.slice(0, pos).split('\n');
        errorLocation = {
          line: lines.length,
          column: lines[lines.length - 1].length + 1,
        };
      }

      return {
        success: false,
        error: `JSON Syntax Error: ${initialErr.message}`,
        value: {
          formatted: rawJson,
          isValid: false,
          wasRepaired: false,
          byteSize: new TextEncoder().encode(rawJson).length,
          errorLocation,
        },
      };
    }
  }
}
