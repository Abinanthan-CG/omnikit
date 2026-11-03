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
  if (typeof rawJson !== 'string' || !rawJson.trim()) {
    return {
      success: false,
      error: 'JSON string cannot be empty',
    };
  }

  const trimmed = rawJson.trim();

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
      const v8Match = initialErr.message.match(/at position (\d+)/);
      const ffMatch = initialErr.message.match(/line (\d+) column (\d+)/i);

      if (v8Match) {
        const pos = parseInt(v8Match[1], 10);
        const lines = trimmed.slice(0, pos).split('\n');
        errorLocation = {
          line: lines.length,
          column: lines[lines.length - 1].length + 1,
        };
      } else if (ffMatch) {
        errorLocation = {
          line: parseInt(ffMatch[1], 10),
          column: parseInt(ffMatch[2], 10),
        };
      }

      return {
        success: false,
        error: `JSON Syntax Error: ${initialErr.message}`,
        value: {
          formatted: '',
          isValid: false,
          wasRepaired: false,
          byteSize: 0,
          errorLocation,
        },
      };
    }
  }
}
