import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  defangUrl,
  calculateCidr,
  convertYamlToJson,
  convertJsonToYaml,
  convertCsvToJson,
  convertJsonToCsv,
  generateHexDump,
  encodeBase58,
  decodeBase58,
  encodeBase32,
  decodeBase32,
  parseUserAgent,
  searchHttpStatus,
  generateUlid,
  generateNanoId,
  inspectBcrypt
} from '../src/engines/batch12Engines.ts';

describe('Batch 12: Defang & Refang URL', () => {
  it('defangs standard URLs and IPs', () => {
    assert.strictEqual(defangUrl('http://example.com/test'), 'hxxp[://]example[.]com/test');
    assert.strictEqual(defangUrl('https://1.1.1.1/dns'), 'hxxps[://]1[.]1[.]1[.]1/dns');
  });

  it('refangs defanged URLs back to valid URLs', () => {
    assert.strictEqual(defangUrl('hxxps[://]malicious[.]org', true), 'https://malicious.org');
    assert.strictEqual(defangUrl('hxxp[://]8[.]8[.]8[.]8', true), 'http://8.8.8.8');
  });
});

describe('Batch 12: CIDR Calculator', () => {
  it('calculates standard /24 subnet correctly', () => {
    const res = calculateCidr('192.168.1.10/24');
    assert.strictEqual(res.netmask, '255.255.255.0');
    assert.strictEqual(res.network, '192.168.1.0');
    assert.strictEqual(res.broadcast, '192.168.1.255');
    assert.strictEqual(res.firstHost, '192.168.1.1');
    assert.strictEqual(res.lastHost, '192.168.1.254');
    assert.strictEqual(res.usableHosts, 254);
  });

  it('handles /32 single host correctly', () => {
    const res = calculateCidr('10.0.0.1/32');
    assert.strictEqual(res.netmask, '255.255.255.255');
    assert.strictEqual(res.usableHosts, 1);
  });
});

describe('Batch 12: YAML ⇄ JSON', () => {
  it('converts YAML to JSON and vice-versa', () => {
    const yaml = 'name: omnikit\nversion: 1\nenabled: true';
    const json = convertYamlToJson(yaml);
    const parsed = JSON.parse(json);
    assert.strictEqual(parsed.name, 'omnikit');
    assert.strictEqual(parsed.version, 1);
    assert.strictEqual(parsed.enabled, true);

    const backToYaml = convertJsonToYaml(json);
    assert.ok(backToYaml.includes('name: "omnikit"'));
  });
});

describe('Batch 12: CSV ⇄ JSON', () => {
  it('converts CSV to JSON objects and vice versa', () => {
    const csv = 'id,name,role\n1,Alice,Admin\n2,Bob,Editor';
    const json = convertCsvToJson(csv);
    const parsed = JSON.parse(json);
    assert.strictEqual(parsed.length, 2);
    assert.strictEqual(parsed[0].name, 'Alice');

    const backCsv = convertJsonToCsv(json);
    assert.ok(backCsv.includes('Alice'));
  });
});

describe('Batch 12: Hex Dump', () => {
  it('generates 16-byte aligned hex dump rows', () => {
    const dump = generateHexDump('Hello World! 1234');
    assert.ok(dump.length >= 1);
    assert.strictEqual(dump[0].offset, '00000000');
    assert.ok(dump[0].ascii.includes('Hello World!'));
  });
});

describe('Batch 12: Base58 & Base32', () => {
  it('encodes and decodes Base58', () => {
    const enc = encodeBase58('Omnikit');
    assert.strictEqual(decodeBase58(enc), 'Omnikit');
  });

  it('encodes and decodes Base32', () => {
    const enc = encodeBase32('Omnikit');
    assert.strictEqual(decodeBase32(enc), 'Omnikit');
  });
});

describe('Batch 12: User-Agent Parser', () => {
  it('identifies Chrome on Windows', () => {
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const info = parseUserAgent(ua);
    assert.strictEqual(info.browser, 'Google Chrome');
    assert.strictEqual(info.os, 'Windows 10 / 11');
    assert.strictEqual(info.device, 'Desktop');
  });
});

describe('Batch 12: HTTP Status Codes', () => {
  it('searches status codes by number and keyword', () => {
    const notFound = searchHttpStatus('404');
    assert.strictEqual(notFound.length, 1);
    assert.strictEqual(notFound[0].title, 'Not Found');

    const gate = searchHttpStatus('gateway');
    assert.ok(gate.length >= 2);
  });
});

describe('Batch 12: ULID & NanoID', () => {
  it('generates valid 26-char ULID and 21-char NanoID', () => {
    const ulid = generateUlid();
    assert.strictEqual(ulid.length, 26);

    const nanoid = generateNanoId();
    assert.strictEqual(nanoid.length, 21);
  });
});

describe('Batch 12: Bcrypt Inspector', () => {
  it('validates bcrypt hash structure', () => {
    const valid = '$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW';
    const res = inspectBcrypt(valid);
    assert.strictEqual(res.valid, true);
    assert.strictEqual(res.cost, 12);

    const invalid = inspectBcrypt('plain-text-not-a-hash');
    assert.strictEqual(invalid.valid, false);
  });
});


import {
  parseDnsZone,
  generateCurlCommand,
  diffJsonObjects,
  sqlInsertToJson
} from '../src/engines/batch12Engines.ts';

describe('Batch 12: DNS Zone Records', () => {
  it('parses standard DNS zone lines', () => {
    const zone = 'example.com. 3600 IN A 93.184.216.34\nmail.example.com. 3600 IN MX 10 mail.server.com.';
    const records = parseDnsZone(zone);
    assert.strictEqual(records.length, 2);
    assert.strictEqual(records[0].type, 'A');
    assert.strictEqual(records[0].value, '93.184.216.34');
  });
});

describe('Batch 12: cURL Command Builder', () => {
  it('generates formatted cURL command', () => {
    const cmd = generateCurlCommand({
      url: 'https://api.example.com/v1/users',
      method: 'POST',
      headers: [{ key: 'Authorization', value: 'Bearer token123' }],
      body: '{"name":"Alice"}'
    });
    assert.ok(cmd.startsWith('curl -X POST "https://api.example.com/v1/users"'));
    assert.ok(cmd.includes('-H "Authorization: Bearer token123"'));
    assert.ok(cmd.includes('-d \'{"name":"Alice"}\''));
  });
});

describe('Batch 12: JSON Structural Diff', () => {
  it('detects added, removed, and modified keys', () => {
    const a = JSON.stringify({ name: 'Alice', age: 30, city: 'London' });
    const b = JSON.stringify({ name: 'Alice', age: 31, country: 'UK' });
    const diff = diffJsonObjects(a, b);
    assert.strictEqual(diff.identical, false);
    assert.deepStrictEqual(diff.added, ['country']);
    assert.deepStrictEqual(diff.removed, ['city']);
    assert.strictEqual(diff.modified.length, 1);
    assert.strictEqual(diff.modified[0].key, 'age');
  });
});

describe('Batch 12: SQL INSERT to JSON', () => {
  it('converts SQL insert values into JSON array', () => {
    const sql = "INSERT INTO users (id, name, age) VALUES (1, 'Alice', 30), (2, 'Bob', 25)";
    const res = sqlInsertToJson(sql);
    assert.strictEqual(res.length, 2);
    assert.strictEqual(res[0].name, 'Alice');
    assert.strictEqual(res[1].name, 'Bob');
    assert.strictEqual(res[1].age, 25);
  });
});
