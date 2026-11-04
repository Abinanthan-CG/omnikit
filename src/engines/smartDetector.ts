export interface DetectedData {
  type: 'json' | 'timestamp' | 'hex-color' | 'base64' | 'jwt' | 'url' | 'ip' | 'sql' | 'html' | 'text';
  label: string;
  detail: string;
  suggestedTools: {
    id: string;
    title: string;
  }[];
}

export function detectSnippet(input: string): DetectedData | null {
  const trimmed = input.trim();
  if (!trimmed || trimmed.length < 2) return null;

  // 1. JSON Detection
  if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
    try {
      const parsed = JSON.parse(trimmed);
      const isArray = Array.isArray(parsed);
      const count = isArray ? parsed.length : Object.keys(parsed).length;
      return {
        type: 'json',
        label: isArray ? 'JSON Array' : 'JSON Object',
        detail: isArray ? `${count} items in array` : `${count} keys in object`,
        suggestedTools: [
          { id: 'json-tools', title: 'Format & Repair JSON' },
          { id: 'json-to-ts', title: 'Convert to TypeScript' },
          { id: 'yaml-json', title: 'Convert to YAML' },
          { id: 'json-diff', title: 'Compare / Tree Diff' }
        ]
      };
    } catch {
      // Might be slightly broken JSON
      if (trimmed.includes(':') && (trimmed.includes('"') || trimmed.includes("'"))) {
        return {
          type: 'json',
          label: 'Unformatted / Broken JSON',
          detail: 'Syntax repair available',
          suggestedTools: [
            { id: 'json-tools', title: 'Format & Repair JSON' }
          ]
        };
      }
    }
  }

  // 2. JWT Token
  if (/^ey[A-Za-z0-9_-]+\.ey[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/.test(trimmed)) {
    return {
      type: 'jwt',
      label: 'JWT Bearer Token',
      detail: 'Compact 3-part signed token',
      suggestedTools: [
        { id: 'jwt-debugger', title: 'Decode & Inspect JWT' }
      ]
    };
  }

  // 3. Hex Color
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(trimmed)) {
    return {
      type: 'hex-color',
      label: 'Hex Color Code',
      detail: trimmed.toUpperCase(),
      suggestedTools: [
        { id: 'color-harmonies', title: 'Generate Harmonies' },
        { id: 'contrast', title: 'Check WCAG Contrast' },
        { id: 'color-mixer', title: 'Blend & Mix Tints' },
        { id: 'color-shades', title: 'Color Shades Ladder' }
      ]
    };
  }

  // 4. Unix Timestamp (10 digits seconds or 13 digits ms)
  if (/^\d{10}(\d{3})?$/.test(trimmed)) {
    const num = parseInt(trimmed, 10);
    const ms = trimmed.length === 10 ? num * 1000 : num;
    const date = new Date(ms);
    if (!isNaN(date.getTime()) && date.getFullYear() >= 1990 && date.getFullYear() <= 2080) {
      return {
        type: 'timestamp',
        label: 'Unix Epoch Timestamp',
        detail: date.toUTCString(),
        suggestedTools: [
          { id: 'timestamps', title: 'Timestamp Converter' },
          { id: 'timecode', title: 'Timecode Calculator' }
        ]
      };
    }
  }

  // 5. URL or IP Address
  if (/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(trimmed)) {
    return {
      type: 'url',
      label: 'Web URL',
      detail: trimmed.length > 40 ? trimmed.slice(0, 37) + '...' : trimmed,
      suggestedTools: [
        { id: 'url-inspector', title: 'Inspect URL & Params' },
        { id: 'defang-url', title: 'Defang URL' },
        { id: 'url-tools', title: 'URL Encoder / Decoder' },
        { id: 'curl-builder', title: 'cURL Request Studio' }
      ]
    };
  }

  // IP Address / CIDR
  if (/^(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?$/.test(trimmed)) {
    return {
      type: 'ip',
      label: trimmed.includes('/') ? 'CIDR Subnet Block' : 'IPv4 Address',
      detail: trimmed,
      suggestedTools: [
        { id: 'cidr-calc', title: 'CIDR Subnet Calculator' },
        { id: 'defang-url', title: 'Defang IP' }
      ]
    };
  }

  // 6. SQL Query
  if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|WITH)\b/i.test(trimmed)) {
    const isInsert = /^INSERT\s+INTO\b/i.test(trimmed);
    return {
      type: 'sql',
      label: 'SQL Query',
      detail: trimmed.slice(0, 35) + '...',
      suggestedTools: isInsert
        ? [
            { id: 'sql-to-json', title: 'Convert SQL INSERT to JSON' },
            { id: 'sql-minify', title: 'Minify SQL Query' }
          ]
        : [
            { id: 'sql-minify', title: 'Minify & Clean SQL' }
          ]
    };
  }

  // 7. Base64 Encoded Text
  if (trimmed.length >= 16 && trimmed.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(trimmed)) {
    try {
      if (typeof atob !== 'undefined') {
        const decoded = atob(trimmed);
        if (/^[\x20-\x7E\r\n\t]+$/.test(decoded)) {
          return {
            type: 'base64',
            label: 'Base64 Encoded String',
            detail: `Decodes to: "${decoded.slice(0, 30)}${decoded.length > 30 ? '...' : ''}"`,
            suggestedTools: [
              { id: 'base64', title: 'Base64 Studio' },
              { id: 'base58-base32', title: 'Base58 / Base32 Studio' }
            ]
          };
        }
      }
    } catch {
      // not valid base64
    }
  }

  // 8. HTML or SVG Markup
  if (/^<([a-z0-9-]+)[\s\S]*>[\s\S]*<\/\1>$/i.test(trimmed) || /^<svg[\s\S]*<\/svg>$/i.test(trimmed)) {
    const isSvg = trimmed.toLowerCase().includes('<svg');
    return {
      type: 'html',
      label: isSvg ? 'SVG Vector Markup' : 'HTML Code',
      detail: isSvg ? 'Vector graphic markup' : 'DOM tree snippet',
      suggestedTools: isSvg
        ? [
            { id: 'svg-data-uri', title: 'Convert to CSS Data URI' },
            { id: 'svg-cleaner', title: 'Optimize & Clean SVG' },
            { id: 'svg-tools', title: 'SVG Studio' },
            { id: 'svg-path-visualizer', title: 'Visualize Path' }
          ]
        : [
            { id: 'html-sanitize', title: 'Sanitize HTML' },
            { id: 'html-entities', title: 'Encode/Decode Entities' }
          ]
    };
  }

  return null;
}
