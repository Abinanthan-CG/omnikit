import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { parseCurl, curlToFetch, curlToPython } from '../src/engines/dev/curlTools.ts';
import { parseDockerRun, dockerRunToCompose } from '../src/engines/dev/dockerTools.ts';
import { formatXml } from '../src/engines/dev/xmlTools.ts';
import { jsonToYaml, yamlToJson } from '../src/engines/dev/yamlTools.ts';
import { convertStorageBytes } from '../src/engines/dev/byteTools.ts';
import { generateGlassCss } from '../src/engines/design/glassmorphismTools.ts';
import { generateColorShades } from '../src/engines/design/paletteTools.ts';
import { getCursorCss, CURSOR_LIST } from '../src/engines/design/cursorTools.ts';
import { analyzeKeywordDensity } from '../src/engines/writing/textAnalysisTools.ts';
import { calculatePitchShift } from '../src/engines/audio/transposerTools.ts';

describe('Curl to Code Engine', () => {
  it('parses basic curl GET', () => {
    const parsed = parseCurl('curl https://api.example.com/users');
    assert.equal(parsed.url, 'https://api.example.com/users');
    assert.equal(parsed.method, 'GET');
  });

  it('generates fetch syntax for POST with headers and data', () => {
    const fetchCode = curlToFetch(`curl -X POST "https://api.site.com" -H "Authorization: Bearer token123" -d '{"name":"bob"}'`);
    assert.ok(fetchCode.includes("fetch('https://api.site.com'"));
    assert.ok(fetchCode.includes('"method": "POST"'));
    assert.ok(fetchCode.includes('Bearer token123'));
  });

  it('generates Python requests code', () => {
    const py = curlToPython('curl -X GET https://example.com');
    assert.ok(py.includes('import requests'));
    assert.ok(py.includes('requests.get('));
  });
});

describe('Docker Run to Compose Engine', () => {
  it('converts docker run command with ports and envs', () => {
    const cmd = 'docker run -d -p 8080:80 -e NODE_ENV=production --name web-server nginx:alpine';
    const compose = dockerRunToCompose(cmd);
    assert.ok(compose.includes('image: nginx:alpine'));
    assert.ok(compose.includes('container_name: web-server'));
    assert.ok(compose.includes('- "8080:80"'));
    assert.ok(compose.includes('NODE_ENV: "production"'));
  });
});

describe('XML Formatter Engine', () => {
  it('indents nested XML tags cleanly', () => {
    const raw = '<root><child><name>Omnikit</name></child></root>';
    const formatted = formatXml(raw, { indent: 2 });
    assert.ok(formatted.includes('  <child>'));
    assert.ok(formatted.includes('    <name>Omnikit</name>'));
  });

  it('minifies XML', () => {
    const raw = '<root>\n  <item>1</item>\n</root>';
    const min = formatXml(raw, { minify: true });
    assert.equal(min, '<root><item>1</item></root>');
  });
});

describe('YAML/JSON Engine', () => {
  it('converts json to clean yaml', () => {
    const json = JSON.stringify({ name: 'Omnikit', active: true, count: 42 });
    const yaml = jsonToYaml(json);
    assert.ok(yaml.includes('name: Omnikit'));
    assert.ok(yaml.includes('active: true'));
    assert.ok(yaml.includes('count: 42'));
  });

  it('converts yaml to json', () => {
    const yaml = 'name: Omnikit\nversion: 1.0\nactive: true';
    const jsonStr = yamlToJson(yaml);
    const parsed = JSON.parse(jsonStr);
    assert.equal(parsed.name, 'Omnikit');
    assert.equal(parsed.version, 1.0);
    assert.equal(parsed.active, true);
  });
});

describe('Storage Byte Converter Engine', () => {
  it('converts GB to Megabytes and Binary GiB', () => {
    const res = convertStorageBytes(1, 'GB');
    assert.equal(res.mb, 1000);
    assert.equal(res.bytes, 1e9);
    assert.ok(res.gib < 1); // 1 GB is ~0.9313 GiB
  });

  it('converts GiB accurately', () => {
    const res = convertStorageBytes(1, 'GiB');
    assert.equal(res.bytes, 1024 ** 3);
    assert.equal(res.gib, 1);
  });
});

describe('Glassmorphism Engine', () => {
  it('generates frosted glass CSS properties', () => {
    const css = generateGlassCss({ blur: 10, transparency: 0.2, borderOpacity: 0.3, backgroundColor: '#ffffff' });
    assert.ok(css.includes('backdrop-filter: blur(10px);'));
    assert.ok(css.includes('rgba(255, 255, 255, 0.2)'));
  });
});

describe('Color Palette Shades Engine', () => {
  it('generates 11 shades from 50 to 950', () => {
    const shades = generateColorShades('#3b82f6');
    assert.equal(shades.length, 11);
    assert.equal(shades[0].step, 50);
    assert.equal(shades[10].step, 950);
  });
});

describe('CSS Cursor Engine', () => {
  it('provides cursor items and css rules', () => {
    assert.ok(CURSOR_LIST.length >= 10);
    assert.equal(getCursorCss('pointer'), 'cursor: pointer;');
  });
});

describe('Text Keyword Density Engine', () => {
  it('extracts top keywords and densities', () => {
    const text = 'Omnikit is fast. Omnikit is private. Omnikit is clean.';
    const res = analyzeKeywordDensity(text, false);
    assert.equal(res.totalWords, 9);
    assert.equal(res.frequencies[0].word, 'omnikit');
    assert.equal(res.frequencies[0].count, 3);
  });
});

describe('Pitch Shift Transposer Engine', () => {
  it('calculates octave shift (+12 semitones = 2x frequency)', () => {
    const res = calculatePitchShift(12);
    assert.equal(res.frequencyRatio, 2);
    assert.equal(res.speedChangePercent, 200);
    assert.equal(res.lengthRatio, 0.5);
  });
});
