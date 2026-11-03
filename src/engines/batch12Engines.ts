// Pure logic engines for Batch 12 (Developer & Security Utilities)

/**
 * 1. Defang & Refang URL / IP (CyberChef standard)
 */
export function defangUrl(text: string, refang = false): string {
  if (!text) return '';
  if (refang) {
    return text
      .replace(/hxxps/gi, 'https')
      .replace(/hxxp/gi, 'http')
      .replace(/\[:\/\/\]/g, '://')
      .replace(/\[:\]/g, ':')
      .replace(/\[\.\]/g, '.')
      .replace(/\(\.\)/g, '.')
      .replace(/\[@\]/g, '@');
  } else {
    return text
      .replace(/https/gi, 'hxxps')
      .replace(/http/gi, 'hxxp')
      .replace(/:\/\//g, '[://]')
      .replace(/(\w)\.(\w)/g, '$1[.]$2')
      .replace(/(\w)\.(\w)/g, '$1[.]$2') // second pass for multi-dots
      .replace(/@/g, '[@]');
  }
}

/**
 * 2. CIDR & Subnet Calculator
 */
export interface CidrResult {
  ip: string;
  prefix: number;
  netmask: string;
  wildcard: string;
  network: string;
  broadcast: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  usableHosts: number;
}

export function calculateCidr(cidrInput: string): CidrResult {
  const parts = cidrInput.trim().split('/');
  const ipStr = parts[0] || '192.168.1.0';
  const prefix = parseInt(parts[1] || '24', 10);

  if (isNaN(prefix) || prefix < 0 || prefix > 32) {
    throw new Error('Prefix must be between 0 and 32');
  }

  const octets = ipStr.split('.').map((o) => parseInt(o, 10));
  if (octets.length !== 4 || octets.some((o) => isNaN(o) || o < 0 || o > 255)) {
    throw new Error('Invalid IPv4 address');
  }

  const ipInt = ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;
  const maskInt = prefix === 0 ? 0 : ((0xffffffff << (32 - prefix)) >>> 0);
  const wildcardInt = (~maskInt) >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;

  const intToIp = (val: number): string =>
    [(val >>> 24) & 255, (val >>> 16) & 255, (val >>> 8) & 255, val & 255].join('.');

  const totalHosts = Math.pow(2, 32 - prefix);
  let usableHosts = totalHosts > 2 ? totalHosts - 2 : totalHosts;
  let firstHost = intToIp(networkInt + 1);
  let lastHost = intToIp(broadcastInt - 1);

  if (prefix === 32) {
    usableHosts = 1;
    firstHost = intToIp(networkInt);
    lastHost = intToIp(broadcastInt);
  } else if (prefix === 31) {
    usableHosts = 2;
    firstHost = intToIp(networkInt);
    lastHost = intToIp(broadcastInt);
  }

  return {
    ip: ipStr,
    prefix,
    netmask: intToIp(maskInt),
    wildcard: intToIp(wildcardInt),
    network: intToIp(networkInt),
    broadcast: intToIp(broadcastInt),
    firstHost,
    lastHost,
    totalHosts,
    usableHosts,
  };
}

/**
 * 3. YAML ⇄ JSON Converter
 */
export function convertYamlToJson(yamlStr: string): string {
  const lines = yamlStr.split('\n');
  const result: Record<string, unknown> = {};

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim().replace(/['"]/g, '');
      let val: unknown = line.slice(colonIdx + 1).trim();

      if (val === 'true') val = true;
      else if (val === 'false') val = false;
      else if (val === 'null' || val === '~') val = null;
      else if (!isNaN(Number(val)) && val !== '') val = Number(val);
      else if (typeof val === 'string' && (val.startsWith('"') || val.startsWith("'"))) {
        val = val.slice(1, -1);
      }

      result[key] = val;
    }
  }

  return JSON.stringify(result, null, 2);
}

export function convertJsonToYaml(jsonStr: string): string {
  const obj = JSON.parse(jsonStr);
  const toYaml = (data: unknown, indent = 0): string => {
    const pad = '  '.repeat(indent);
    if (data === null || data === undefined) return 'null\n';
    if (typeof data !== 'object') {
      return typeof data === 'string' ? `"${data}"\n` : `${data}\n`;
    }

    let out = '';
    if (Array.isArray(data)) {
      for (const item of data) {
        if (typeof item === 'object' && item !== null) {
          out += `${pad}- \n${toYaml(item, indent + 1)}`;
        } else {
          out += `${pad}- ${typeof item === 'string' ? `"${item}"` : item}\n`;
        }
      }
    } else {
      const entries = Object.entries(data as Record<string, unknown>);
      for (const [k, v] of entries) {
        if (typeof v === 'object' && v !== null) {
          out += `${pad}${k}:\n${toYaml(v, indent + 1)}`;
        } else {
          out += `${pad}${k}: ${typeof v === 'string' ? `"${v}"` : v}\n`;
        }
      }
    }
    return out;
  };

  return toYaml(obj).trim();
}

/**
 * 4. CSV ⇄ JSON Converter
 */
export function convertCsvToJson(csv: string, delimiter = ','): string {
  const lines = csv.trim().split('\n');
  if (lines.length === 0) return '[]';

  const headers = lines[0].split(delimiter).map((h) => h.trim().replace(/^["']|["']$/g, ''));
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = line.split(delimiter).map((v) => v.trim().replace(/^["']|["']$/g, ''));
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] ?? '';
    });
    rows.push(row);
  }

  return JSON.stringify(rows, null, 2);
}

export function convertJsonToCsv(jsonStr: string, delimiter = ','): string {
  const data = JSON.parse(jsonStr);
  if (!Array.isArray(data) || data.length === 0) return '';

  const headers = Array.from(new Set(data.flatMap((obj) => Object.keys(obj))));
  const csvLines: string[] = [headers.join(delimiter)];

  for (const item of data) {
    const row = headers.map((h) => {
      const val = item[h] !== undefined ? String(item[h]) : '';
      if (val.includes(delimiter) || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    });
    csvLines.push(row.join(delimiter));
  }

  return csvLines.join('\n');
}

/**
 * 5. Hex Dump Viewer (xxd style)
 */
export interface HexDumpLine {
  offset: string;
  hex: string;
  ascii: string;
}

export function generateHexDump(input: string): HexDumpLine[] {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(input);
  const lines: HexDumpLine[] = [];

  for (let i = 0; i < bytes.length; i += 16) {
    const chunk = bytes.slice(i, i + 16);
    const offset = i.toString(16).padStart(8, '0');

    const hexParts: string[] = [];
    let ascii = '';

    for (let j = 0; j < 16; j++) {
      if (j < chunk.length) {
        const b = chunk[j];
        hexParts.push(b.toString(16).padStart(2, '0'));
        ascii += b >= 32 && b <= 126 ? String.fromCharCode(b) : '.';
      } else {
        hexParts.push('  ');
      }
    }

    const hex = `${hexParts.slice(0, 8).join(' ')}  ${hexParts.slice(8).join(' ')}`;
    lines.push({ offset, hex, ascii });
  }

  return lines;
}

/**
 * 6. Base58 & Base32 Encoder & Decoder
 */
const B58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const B32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function encodeBase58(input: string): string {
  const bytes = new TextEncoder().encode(input);
  if (bytes.length === 0) return '';

  let num = 0n;
  for (const b of bytes) {
    num = (num << 8n) + BigInt(b);
  }

  let out = '';
  while (num > 0n) {
    const rem = Number(num % 58n);
    num = num / 58n;
    out = B58_ALPHABET[rem] + out;
  }

  for (let i = 0; i < bytes.length && bytes[i] === 0; i++) {
    out = '1' + out;
  }

  return out;
}

export function decodeBase58(input: string): string {
  let num = 0n;
  for (const ch of input.trim()) {
    const idx = B58_ALPHABET.indexOf(ch);
    if (idx === -1) throw new Error(`Invalid Base58 character: ${ch}`);
    num = num * 58n + BigInt(idx);
  }

  const bytes: number[] = [];
  while (num > 0n) {
    bytes.unshift(Number(num & 0xffn));
    num = num >> 8n;
  }

  for (let i = 0; i < input.length && input[i] === '1'; i++) {
    bytes.unshift(0);
  }

  return new TextDecoder().decode(new Uint8Array(bytes));
}

export function encodeBase32(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let bits = 0;
  let value = 0;
  let output = '';

  for (let i = 0; i < bytes.length; i++) {
    value = (value << 8) | bytes[i];
    bits += 8;
    while (bits >= 5) {
      output += B32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += B32_ALPHABET[(value << (5 - bits)) & 31];
  }

  while (output.length % 8 !== 0) {
    output += '=';
  }

  return output;
}

export function decodeBase32(input: string): string {
  const clean = input.trim().replace(/=+$/, '').toUpperCase();
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];

  for (let i = 0; i < clean.length; i++) {
    const idx = B32_ALPHABET.indexOf(clean[i]);
    if (idx === -1) throw new Error(`Invalid Base32 character: ${clean[i]}`);
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return new TextDecoder().decode(new Uint8Array(bytes));
}

/**
 * 7. User-Agent String Parser
 */
export interface UserAgentInfo {
  browser: string;
  version: string;
  os: string;
  device: 'Mobile' | 'Tablet' | 'Desktop';
  engine: string;
}

export function parseUserAgent(ua: string): UserAgentInfo {
  const s = ua.trim();
  let browser = 'Unknown Browser';
  let version = '';
  let os = 'Unknown OS';
  let device: 'Mobile' | 'Tablet' | 'Desktop' = 'Desktop';
  let engine = 'Unknown Engine';

  // Device
  if (/iPad|Tablet/i.test(s)) device = 'Tablet';
  else if (/Mobile|Android|iPhone/i.test(s)) device = 'Mobile';

  // OS
  if (/Windows NT 10.0/i.test(s)) os = 'Windows 10 / 11';
  else if (/Windows NT/i.test(s)) os = 'Windows';
  else if (/Macintosh|Mac OS X/i.test(s)) os = 'macOS';
  else if (/Android/i.test(s)) os = 'Android';
  else if (/iPhone|iPad/i.test(s)) os = 'iOS';
  else if (/Linux/i.test(s)) os = 'Linux';

  // Engine
  if (/WebKit/i.test(s)) engine = 'WebKit / Blink';
  else if (/Gecko/i.test(s)) engine = 'Gecko';

  // Browser
  if (/Edg\/([\d.]+)/i.test(s)) {
    browser = 'Microsoft Edge';
    version = RegExp.$1;
  } else if (/Chrome\/([\d.]+)/i.test(s)) {
    browser = 'Google Chrome';
    version = RegExp.$1;
  } else if (/Firefox\/([\d.]+)/i.test(s)) {
    browser = 'Mozilla Firefox';
    version = RegExp.$1;
  } else if (/Version\/([\d.]+).*Safari/i.test(s)) {
    browser = 'Apple Safari';
    version = RegExp.$1;
  }

  return { browser, version, os, device, engine };
}

/**
 * 8. HTTP Status Codes Reference
 */
export interface HttpStatusItem {
  code: number;
  title: string;
  category: string;
  description: string;
  cacheable: boolean;
}

export const HTTP_STATUSES: HttpStatusItem[] = [
  { code: 200, title: 'OK', category: '2xx Success', description: 'Standard response for successful HTTP requests.', cacheable: true },
  { code: 201, title: 'Created', category: '2xx Success', description: 'Request fulfilled and new resource created.', cacheable: false },
  { code: 204, title: 'No Content', category: '2xx Success', description: 'Action executed, no payload body returned.', cacheable: true },
  { code: 301, title: 'Moved Permanently', category: '3xx Redirection', description: 'Target resource has been assigned a permanent URI.', cacheable: true },
  { code: 302, title: 'Found', category: '3xx Redirection', description: 'Resource temporarily resides at a different URI.', cacheable: false },
  { code: 304, title: 'Not Modified', category: '3xx Redirection', description: 'Resource has not been modified since last fetch.', cacheable: true },
  { code: 400, title: 'Bad Request', category: '4xx Client Error', description: 'Server cannot process request due to client error.', cacheable: false },
  { code: 401, title: 'Unauthorized', category: '4xx Client Error', description: 'Authentication credentials missing or invalid.', cacheable: false },
  { code: 403, title: 'Forbidden', category: '4xx Client Error', description: 'Server understood request but refuses authorization.', cacheable: false },
  { code: 404, title: 'Not Found', category: '4xx Client Error', description: 'Requested resource could not be found.', cacheable: false },
  { code: 405, title: 'Method Not Allowed', category: '4xx Client Error', description: 'HTTP method not supported for target resource.', cacheable: false },
  { code: 409, title: 'Conflict', category: '4xx Client Error', description: 'Request conflicts with current state of resource.', cacheable: false },
  { code: 429, title: 'Too Many Requests', category: '4xx Client Error', description: 'Rate limit exceeded by the client.', cacheable: false },
  { code: 500, title: 'Internal Server Error', category: '5xx Server Error', description: 'Unexpected condition encountered by server.', cacheable: false },
  { code: 502, title: 'Bad Gateway', category: '5xx Server Error', description: 'Invalid response from inbound upstream server.', cacheable: false },
  { code: 503, title: 'Service Unavailable', category: '5xx Server Error', description: 'Server temporarily overloaded or in maintenance.', cacheable: false },
  { code: 504, title: 'Gateway Timeout', category: '5xx Server Error', description: 'Upstream server did not reply in time.', cacheable: false },
];

export function searchHttpStatus(query: string): HttpStatusItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return HTTP_STATUSES;
  return HTTP_STATUSES.filter(
    (item) =>
      item.code.toString().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
  );
}

/**
 * 9. ULID & NanoID Generator
 */
const CROCKFORD_BASE32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
const NANOID_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-';

export function generateUlid(nowMs = Date.now()): string {
  let timeStr = '';
  let time = nowMs;
  for (let i = 9; i >= 0; i--) {
    const mod = time % 32;
    timeStr = CROCKFORD_BASE32[mod] + timeStr;
    time = Math.floor(time / 32);
  }

  let randStr = '';
  for (let i = 0; i < 16; i++) {
    const rand = Math.floor(Math.random() * 32);
    randStr += CROCKFORD_BASE32[rand];
  }

  return timeStr + randStr;
}

export function generateNanoId(size = 21): string {
  let id = '';
  for (let i = 0; i < size; i++) {
    id += NANOID_CHARS[Math.floor(Math.random() * NANOID_CHARS.length)];
  }
  return id;
}

/**
 * 10. Bcrypt Hash Inspector / Simulator
 */
export function inspectBcrypt(hash: string): { valid: boolean; cost?: number; salt?: string } {
  const regex = /^\$2[aby]\$(\d\d)\$([A-Za-z0-9./]{22})([A-Za-z0-9./]{31})$/;
  const match = hash.trim().match(regex);
  if (!match) return { valid: false };
  return {
    valid: true,
    cost: parseInt(match[1], 10),
    salt: match[2],
  };
}


/**
 * 11. DNS Zone Records Parser & Formatter
 */
export interface DnsRecord {
  name: string;
  ttl: number;
  type: 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT' | 'NS' | 'SOA';
  value: string;
}

export function parseDnsZone(text: string): DnsRecord[] {
  const lines = text.split('\n');
  const records: DnsRecord[] = [];
  const validTypes = new Set(['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SOA', 'PTR', 'SRV']);

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith(';')) continue;
    const parts = line.split(/\s+/);
    if (parts.length >= 3) {
      const name = parts[0];
      let ttl = 300;
      let typeIdx = 1;

      // check if parts[1] is TTL number
      if (!isNaN(Number(parts[1]))) {
        ttl = parseInt(parts[1], 10);
        typeIdx = 2;
      }

      // skip IN class if present (e.g. IN A)
      if (parts[typeIdx] && parts[typeIdx].toUpperCase() === 'IN') {
        typeIdx++;
      }

      const type = (parts[typeIdx] ? parts[typeIdx].toUpperCase() : 'A') as DnsRecord['type'];
      const value = parts.slice(typeIdx + 1).join(' ');

      if (validTypes.has(type) && value) {
        records.push({ name, ttl, type, value });
      }
    }
  }
  return records;
}

/**
 * 12. cURL Command Builder
 */
export interface CurlParams {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers: { key: string; value: string }[];
  body?: string;
  insecure?: boolean;
  followRedirects?: boolean;
}

export function generateCurlCommand(p: CurlParams): string {
  let cmd = `curl -X ${p.method} "${p.url}"`;
  if (p.followRedirects) cmd += ' -L';
  if (p.insecure) cmd += ' -k';
  for (const h of p.headers) {
    if (h.key && h.value) cmd += ` \\\n  -H "${h.key}: ${h.value}"`;
  }
  if (p.body && p.method !== 'GET') {
    cmd += ` \\\n  -d '${p.body.replace(/'/g, "'\\''")}'`;
  }
  return cmd;
}

/**
 * 13. JSON Structural Diff
 */
export interface JsonDiffResult {
  added: string[];
  removed: string[];
  modified: { key: string; from: unknown; to: unknown }[];
  identical: boolean;
}

export function diffJsonObjects(aStr: string, bStr: string): JsonDiffResult {
  const a = JSON.parse(aStr);
  const b = JSON.parse(bStr);
  const added: string[] = [];
  const removed: string[] = [];
  const modified: { key: string; from: unknown; to: unknown }[] = [];

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  for (const k of bKeys) {
    if (!(k in a)) {
      added.push(k);
    } else if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) {
      modified.push({ key: k, from: a[k], to: b[k] });
    }
  }

  for (const k of aKeys) {
    if (!(k in b)) {
      removed.push(k);
    }
  }

  return {
    added,
    removed,
    modified,
    identical: added.length === 0 && removed.length === 0 && modified.length === 0,
  };
}

/**
 * 14. SQL INSERT to JSON Array
 */
export function sqlInsertToJson(sql: string): Record<string, unknown>[] {
  const insertRegex = /INSERT\s+INTO\s+[`"']?(\w+)[`"']?\s*\(([^)]+)\)\s*VALUES\s*(.+)/i;
  const match = sql.trim().match(insertRegex);
  if (!match) return [];

  const columns = match[2].split(',').map((c) => c.trim().replace(/[`"']/g, ''));
  const valuesBlock = match[3].trim();

  const rows: Record<string, unknown>[] = [];
  const rowRegex = /\(([^)]+)\)/g;
  let rowMatch;

  while ((rowMatch = rowRegex.exec(valuesBlock)) !== null) {
    const rawVals = rowMatch[1].split(',').map((v) => {
      const s = v.trim();
      if (s.startsWith("'") && s.endsWith("'")) return s.slice(1, -1);
      if (s === 'NULL' || s === 'null') return null;
      if (!isNaN(Number(s))) return Number(s);
      return s;
    });

    const row: Record<string, unknown> = {};
    columns.forEach((col, idx) => {
      row[col] = rawVals[idx] ?? null;
    });
    rows.push(row);
  }

  return rows;
}
