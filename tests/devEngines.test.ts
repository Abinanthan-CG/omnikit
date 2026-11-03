import { describe, it } from 'node:test';
import assert from 'node:assert';
import { convertTimestamp, getCurrentTimestamp } from '../src/engines/dev/timestamp.ts';
import { formatAndRepairJson } from '../src/engines/dev/jsonTools.ts';

describe('Timestamp Engine', () => {
  it('converts unix epoch seconds to ISO string', () => {
    const res = convertTimestamp(1700000000);
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.utc, '2023-11-14T22:13:20.000Z');
    assert.strictEqual(res.value?.seconds, 1700000000);
    assert.strictEqual(res.value?.milliseconds, 1700000000000);
  });

  it('converts unix epoch milliseconds to ISO string', () => {
    const res = convertTimestamp(1700000000000);
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.utc, '2023-11-14T22:13:20.000Z');
  });

  it('parses ISO date string into timestamp numbers', () => {
    const res = convertTimestamp('2023-11-14T22:13:20.000Z');
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.seconds, 1700000000);
  });

  it('rejects invalid inputs', () => {
    assert.strictEqual(convertTimestamp('not a date').success, false);
  });

  it('provides current timestamp', () => {
    const now = getCurrentTimestamp();
    assert.ok(now.seconds > 1700000000);
  });
});

describe('JSON Engine', () => {
  it('formats valid JSON cleanly', () => {
    const res = formatAndRepairJson('{"a":1,"b":2}', 2);
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.formatted, '{\n  "a": 1,\n  "b": 2\n}');
    assert.strictEqual(res.value?.isValid, true);
  });

  it('minifies JSON when indent is 0', () => {
    const res = formatAndRepairJson('{\n  "a": 1\n}', 0);
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.formatted, '{"a":1}');
  });

  it('repairs single quotes and trailing commas', () => {
    const broken = "{'name': 'omnikit', 'items': [1, 2, ], }";
    const res = formatAndRepairJson(broken, 2);
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.wasRepaired, true);
    const parsed = JSON.parse(res.value!.formatted);
    assert.deepStrictEqual(parsed, { name: 'omnikit', items: [1, 2] });
  });

  it('handles unquoted object keys', () => {
    const broken = '{ name: "omnikit", count: 42 }';
    const res = formatAndRepairJson(broken, 2);
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.value?.wasRepaired, true);
    const parsed = JSON.parse(res.value!.formatted);
    assert.deepStrictEqual(parsed, { name: 'omnikit', count: 42 });
  });
});
