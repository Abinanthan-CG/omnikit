import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { registerTool, getTools, searchTools, clearRegistry } from '../src/registry/registry.ts';
import type { ToolDefinition } from '../src/types/tool.ts';

describe('Tool Registry', () => {
  beforeEach(() => {
    clearRegistry();
  });

  const mockTool: ToolDefinition = {
    id: 'test-tool',
    title: 'Aspect Ratio Calculator',
    description: 'Calculate video and image aspect ratios',
    category: 'video',
    tags: ['aspect', 'ratio', 'dimensions', 'resolution'],
    keywords: ['16:9', '4:3', 'crop'],
    component: () => null,
  };

  it('registers and retrieves tools', () => {
    registerTool(mockTool);
    const tools = getTools();
    assert.strictEqual(tools.length, 1);
    assert.strictEqual(tools[0].id, 'test-tool');
  });

  it('filters tools by category and search keyword', () => {
    registerTool(mockTool);
    assert.strictEqual(searchTools('dimensions', 'all').length, 1);
    assert.strictEqual(searchTools('dimensions', 'design').length, 0);
    assert.strictEqual(searchTools('ratio', 'video').length, 1);
    assert.strictEqual(searchTools('nonexistent', 'all').length, 0);
  });
});
