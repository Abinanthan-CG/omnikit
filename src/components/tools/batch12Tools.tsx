import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../ToolShell';
import {
  defangUrl,
  calculateCidr,
  generateHexDump,
  encodeBase58,
  decodeBase58,
  encodeBase32,
  decodeBase32,
  inspectBcrypt,
  generateUlid,
  parseDnsZone,
  generateCurlCommand,
  diffJsonObjects,
  sqlInsertToJson,
  CurlParams
} from '../../engines/batch12Engines';

/**
 * 1. Defang & Refang URL / IP
 */
export const DefangUrlTool: React.FC = () => {
  const [input, setInput] = useState('https://malicious-domain.com/payload.exe');
  const [mode, setMode] = useState<'defang' | 'refang'>('defang');
  const output = defangUrl(input, mode === 'refang');

  return (
    <ToolShell
      title="Defang / Refang URL & IP"
      category="dev"
      description="Neutralize active URLs, IPs, and email links for safe sharing in tickets, chat, or documentation."
      toolId="defang-url"
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('defang')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              mode === 'defang'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-semibold'
                : 'bg-neutral-850 text-neutral-400 border-neutral-750'
            }`}
          >
            Defang (Safe Format)
          </button>
          <button
            onClick={() => setMode('refang')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              mode === 'refang'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-semibold'
                : 'bg-neutral-850 text-neutral-400 border-neutral-750'
            }`}
          >
            Refang (Restore Original)
          </button>
        </div>

        <div>
          <label className="text-neutral-400 block mb-1">Input URL, IP, or Email:</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-neutral-400">Result:</span>
            <CopyButton text={output} />
          </div>
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 select-all break-all">
            {output || <span className="text-neutral-600">No input</span>}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 2. CIDR & Subnet Calculator
 */
export const CidrCalculatorTool: React.FC = () => {
  const [cidr, setCidr] = useState('192.168.1.10/24');
  let result: ReturnType<typeof calculateCidr> | null = null;
  let error = '';

  try {
    result = calculateCidr(cidr);
  } catch (err: unknown) {
    error = err instanceof Error ? err.message : 'Invalid CIDR';
  }

  return (
    <ToolShell
      title="CIDR & Subnet Calculator"
      category="dev"
      description="Calculate network address, broadcast address, netmask, wildcard, and usable IP host range."
      toolId="cidr-calc"
    >
      <div className="space-y-4 font-mono text-xs">
        <div>
          <label className="text-neutral-400 block mb-1">IPv4 CIDR Notation (e.g. 10.0.0.0/16):</label>
          <input
            type="text"
            value={cidr}
            onChange={(e) => setCidr(e.target.value)}
            className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none"
          />
        </div>

        {error ? (
          <div className="p-3 bg-rose-950/40 border border-rose-800/60 text-rose-300 rounded-lg">
            {error}
          </div>
        ) : result ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
              <span className="text-neutral-500 text-[10px] uppercase block">Network Address</span>
              <span className="text-emerald-400 font-bold text-sm">{result.network}</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
              <span className="text-neutral-500 text-[10px] uppercase block">Broadcast Address</span>
              <span className="text-neutral-200 font-bold text-sm">{result.broadcast}</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
              <span className="text-neutral-500 text-[10px] uppercase block">Subnet Mask</span>
              <span className="text-neutral-200 text-xs">{result.netmask}</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
              <span className="text-neutral-500 text-[10px] uppercase block">Wildcard Mask</span>
              <span className="text-neutral-200 text-xs">{result.wildcard}</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
              <span className="text-neutral-500 text-[10px] uppercase block">Usable Host Range</span>
              <span className="text-neutral-200 text-xs">{result.firstHost} – {result.lastHost}</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
              <span className="text-neutral-500 text-[10px] uppercase block">Usable Host Count</span>
              <span className="text-emerald-400 font-bold text-sm">{result.usableHosts.toLocaleString()}</span>
            </div>
          </div>
        ) : null}
      </div>
    </ToolShell>
  );
};

/**
 * 3. Hex Dump (xxd) Viewer
 */
export const HexDumpViewerTool: React.FC = () => {
  const [text, setText] = useState('Omnikit 2026: Fast, single-purpose client-side utilities.');
  const lines = generateHexDump(text);

  return (
    <ToolShell
      title="Hex Dump (xxd) Inspector"
      category="dev"
      description="Inspect binary offsets, hex bytes, and ASCII representations of arbitrary text or payloads."
      toolId="hexdump"
    >
      <div className="space-y-4 font-mono text-xs">
        <div>
          <label className="text-neutral-400 block mb-1">Input Text:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none"
          />
        </div>

        <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 overflow-x-auto text-neutral-300">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-neutral-500 border-b border-neutral-850">
                <th className="py-1 px-2 font-normal">OFFSET</th>
                <th className="py-1 px-2 font-normal">HEX BYTES (0-7  8-F)</th>
                <th className="py-1 px-2 font-normal">ASCII</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l, i) => (
                <tr key={i} className="hover:bg-neutral-900/60">
                  <td className="py-0.5 px-2 text-emerald-400">{l.offset}:</td>
                  <td className="py-0.5 px-2 font-mono tracking-wider">{l.hex}</td>
                  <td className="py-0.5 px-2 text-neutral-200">{l.ascii}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 4. Base58 & Base32 Encoder & Decoder
 */
export const Base58Base32Tool: React.FC = () => {
  const [input, setInput] = useState('Omnikit Workspace');
  const [b58, setB58] = useState(() => encodeBase58('Omnikit Workspace'));
  const [b32, setB32] = useState(() => encodeBase32('Omnikit Workspace'));

  const handleEncode = () => {
    try {
      setB58(encodeBase58(input));
      setB32(encodeBase32(input));
    } catch {
      // ignore
    }
  };

  const handleDecodeB58 = () => {
    try {
      setInput(decodeBase58(b58));
    } catch {
      // ignore
    }
  };

  const handleDecodeB32 = () => {
    try {
      setInput(decodeBase32(b32));
    } catch {
      // ignore
    }
  };

  return (
    <ToolShell
      title="Base58 & Base32 Encoder / Decoder"
      category="dev"
      description="Encode and decode Bitcoin Base58 and RFC 4648 Base32 payloads offline."
      toolId="base58-base32"
    >
      <div className="space-y-4 font-mono text-xs">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-neutral-400">Plaintext Input:</label>
            <button
              onClick={handleEncode}
              className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold"
            >
              Encode All
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none"
          />
        </div>

        <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400 font-bold">Base58 (Bitcoin):</span>
            <div className="flex items-center gap-2">
              <button onClick={handleDecodeB58} className="text-neutral-400 hover:text-emerald-400">
                Decode → Plaintext
              </button>
              <CopyButton text={b58} />
            </div>
          </div>
          <input
            type="text"
            value={b58}
            onChange={(e) => setB58(e.target.value)}
            className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
          />
        </div>

        <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400 font-bold">Base32 (RFC 4648):</span>
            <div className="flex items-center gap-2">
              <button onClick={handleDecodeB32} className="text-neutral-400 hover:text-emerald-400">
                Decode → Plaintext
              </button>
              <CopyButton text={b32} />
            </div>
          </div>
          <input
            type="text"
            value={b32}
            onChange={(e) => setB32(e.target.value)}
            className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-200"
          />
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 5. Bcrypt Hash Inspector
 */
export const BcryptTool: React.FC = () => {
  const [hash, setHash] = useState('$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW');
  const info = inspectBcrypt(hash);

  return (
    <ToolShell
      title="Bcrypt Password Hash Inspector"
      category="dev"
      description="Inspect salt parameters, iteration cost factor, and validity of Bcrypt hashes."
      toolId="bcrypt-inspector"
    >
      <div className="space-y-4 font-mono text-xs">
        <div>
          <label className="text-neutral-400 block mb-1">Bcrypt Hash String:</label>
          <input
            type="text"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none"
          />
        </div>

        {info.valid ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
              <span className="text-neutral-500 text-[10px] uppercase block">Validity</span>
              <span className="text-emerald-400 font-bold">Valid Bcrypt Hash Format</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
              <span className="text-neutral-500 text-[10px] uppercase block">Cost Factor (Rounds)</span>
              <span className="text-neutral-200 font-bold">{info.cost} ({Math.pow(2, info.cost || 0).toLocaleString()} iterations)</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1 sm:col-span-2">
              <span className="text-neutral-500 text-[10px] uppercase block">Salt Payload</span>
              <span className="text-neutral-300 break-all">{info.salt}</span>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300">
            Invalid Bcrypt hash format (expected standard $2a$, $2b$, or $2y$ prefix).
          </div>
        )}
      </div>
    </ToolShell>
  );
};

/**
 * 6. ULID Generator
 */
export const UlidTool: React.FC = () => {
  const [ulids, setUlids] = useState<string[]>(() => [generateUlid(), generateUlid(), generateUlid()]);

  const handleRegenerate = () => {
    setUlids([generateUlid(), generateUlid(), generateUlid()]);
  };

  return (
    <ToolShell
      title="ULID Time-Ordered ID Generator"
      category="dev"
      description="Generate 26-character Universally Unique Lexicographically Sortable Identifiers for databases."
      toolId="ulid-generator"
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="text-neutral-400">Fresh ULID Sequence:</span>
          <button
            onClick={handleRegenerate}
            className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold"
          >
            Generate New Sequence
          </button>
        </div>

        <div className="space-y-2">
          {ulids.map((u, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-2">
              <span className="text-emerald-400 font-bold text-sm tracking-wide">{u}</span>
              <CopyButton text={u} />
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 7. DNS Zone Records Parser
 */
export const DnsZoneTool: React.FC = () => {
  const [zoneText, setZoneText] = useState(
    'example.com.      3600 IN A     93.184.216.34\nexample.com.      3600 IN AAAA  2606:2800:220:1:248:1893:25c8:1946\nmail.example.com. 3600 IN MX    10 mail.server.com.\nexample.com.      3600 IN TXT   "v=spf1 include:_spf.example.com ~all"'
  );
  const records = parseDnsZone(zoneText);

  return (
    <ToolShell
      title="DNS Record Formatter & Zone Parser"
      category="dev"
      description="Parse and validate standard DNS zone records (A, AAAA, MX, CNAME, TXT) and export as clean structured tables."
      toolId="dns-records"
    >
      <div className="space-y-4 font-mono text-xs">
        <div>
          <label className="text-neutral-400 block mb-1">DNS Zone File / Records:</label>
          <textarea
            value={zoneText}
            onChange={(e) => setZoneText(e.target.value)}
            rows={5}
            className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none"
          />
        </div>

        <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-neutral-500 border-b border-neutral-850">
                <th className="py-1 px-2 font-normal">NAME</th>
                <th className="py-1 px-2 font-normal">TTL</th>
                <th className="py-1 px-2 font-normal">TYPE</th>
                <th className="py-1 px-2 font-normal">RDATA VALUE</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i} className="hover:bg-neutral-900/60 border-b border-neutral-900">
                  <td className="py-1.5 px-2 text-neutral-200">{r.name}</td>
                  <td className="py-1.5 px-2 text-neutral-500">{r.ttl}s</td>
                  <td className="py-1.5 px-2">
                    <span className="px-1.5 py-0.2 rounded bg-neutral-900 border border-neutral-800 text-emerald-400 font-bold">
                      {r.type}
                    </span>
                  </td>
                  <td className="py-1.5 px-2 text-neutral-300 font-mono">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 8. cURL Command Visual Builder
 */
export const CurlBuilderTool: React.FC = () => {
  const [url, setUrl] = useState('https://api.example.com/v1/users');
  const [method, setMethod] = useState<CurlParams['method']>('POST');
  const [headerKey, setHeaderKey] = useState('Authorization');
  const [headerVal, setHeaderVal] = useState('Bearer YOUR_API_KEY');
  const [body, setBody] = useState('{\n  "name": "Jane Doe",\n  "role": "admin"\n}');

  const cmd = generateCurlCommand({
    url,
    method,
    headers: [{ key: headerKey, value: headerVal }],
    body,
    followRedirects: true,
  });

  return (
    <ToolShell
      title="cURL Command Visual Builder"
      category="dev"
      description="Visually assemble authenticated cURL CLI requests with headers, JSON payloads, and redirect flags."
      toolId="curl-builder"
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="text-neutral-400 block mb-1">Method:</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as CurlParams['method'])}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-emerald-400 font-bold"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
          </div>
          <div className="sm:col-span-3">
            <label className="text-neutral-400 block mb-1">Target URL:</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-neutral-400 block mb-1">Header Key:</label>
            <input
              type="text"
              value={headerKey}
              onChange={(e) => setHeaderKey(e.target.value)}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200"
            />
          </div>
          <div>
            <label className="text-neutral-400 block mb-1">Header Value:</label>
            <input
              type="text"
              value={headerVal}
              onChange={(e) => setHeaderVal(e.target.value)}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200"
            />
          </div>
        </div>

        {method !== 'GET' && (
          <div>
            <label className="text-neutral-400 block mb-1">Payload Body (JSON/Raw):</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100"
            />
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-neutral-400 font-bold">Generated cURL Command:</span>
            <CopyButton text={cmd} />
          </div>
          <pre className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-emerald-400 overflow-x-auto whitespace-pre-wrap select-all">
            {cmd}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 9. JSON Structural Diff
 */
export const JsonDiffTool: React.FC = () => {
  const [jsonA, setJsonA] = useState('{\n  "name": "Omnikit",\n  "version": 1,\n  "offline": true\n}');
  const [jsonB, setJsonB] = useState('{\n  "name": "Omnikit",\n  "version": 2,\n  "tier": "pro"\n}');

  let diff: ReturnType<typeof diffJsonObjects> | null = null;
  let error = '';

  try {
    diff = diffJsonObjects(jsonA, jsonB);
  } catch (err: unknown) {
    error = err instanceof Error ? err.message : 'Invalid JSON format';
  }

  return (
    <ToolShell
      title="JSON Structural Diff & Key Comparator"
      category="dev"
      description="Compare two JSON objects structurally to identify added keys, removed fields, and modified values."
      toolId="json-diff"
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-neutral-400 block mb-1">Original JSON (A):</label>
            <textarea
              value={jsonA}
              onChange={(e) => setJsonA(e.target.value)}
              rows={8}
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-neutral-400 block mb-1">Modified JSON (B):</label>
            <textarea
              value={jsonB}
              onChange={(e) => setJsonB(e.target.value)}
              rows={8}
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none"
            />
          </div>
        </div>

        {error ? (
          <div className="p-3 bg-rose-950/40 border border-rose-800/60 text-rose-300 rounded-lg">
            {error}
          </div>
        ) : diff ? (
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-200">Diff Summary:</span>
              {diff.identical ? (
                <span className="text-emerald-400">Objects are identical</span>
              ) : (
                <span className="text-amber-400">Structural differences detected</span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800 space-y-1">
                <span className="text-emerald-400 font-bold block">+ Added Keys ({diff.added.length})</span>
                {diff.added.map((k) => (
                  <div key={k} className="text-emerald-300 text-[11px] truncate">
                    + {k}
                  </div>
                ))}
              </div>

              <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800 space-y-1">
                <span className="text-rose-400 font-bold block">- Removed Keys ({diff.removed.length})</span>
                {diff.removed.map((k) => (
                  <div key={k} className="text-rose-300 text-[11px] truncate">
                    - {k}
                  </div>
                ))}
              </div>

              <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800 space-y-1">
                <span className="text-cyan-400 font-bold block">~ Modified ({diff.modified.length})</span>
                {diff.modified.map((m) => (
                  <div key={m.key} className="text-cyan-300 text-[11px] truncate">
                    {m.key}: {String(m.from)} → {String(m.to)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </ToolShell>
  );
};

/**
 * 10. SQL INSERT to JSON
 */
export const SqlInsertJsonTool: React.FC = () => {
  const [sql, setSql] = useState(
    "INSERT INTO users (id, username, email, active) VALUES\n(1, 'alice', 'alice@domain.com', 1),\n(2, 'bob', 'bob@domain.com', 0);"
  );
  const rows = sqlInsertToJson(sql);
  const jsonOut = JSON.stringify(rows, null, 2);

  return (
    <ToolShell
      title="SQL INSERT to JSON Array"
      category="dev"
      description="Parse SQL INSERT INTO query statements directly into a structured array of JSON objects."
      toolId="sql-to-json"
    >
      <div className="space-y-4 font-mono text-xs">
        <div>
          <label className="text-neutral-400 block mb-1">SQL INSERT Statement:</label>
          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            rows={5}
            className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-neutral-400">JSON Output ({rows.length} records):</span>
            <CopyButton text={jsonOut} />
          </div>
          <pre className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-emerald-400 overflow-x-auto max-h-72">
            {jsonOut}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};
