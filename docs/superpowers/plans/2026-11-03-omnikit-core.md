# Omnikit Core Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Omnikit, a fast, client-side Swiss Army knife web app bundling multi-disciplinary micro-tools (video, audio, design, writing, code) with an instant command palette.

**Architecture:** A modular tool registry pattern where pure calculation engines `(input: TInput) => EngineResult<TOutput>` are strictly decoupled from React UI components. A global command bar manages fuzzy search, category filtering, and URL-hash routing with zero server roundtrips.

**Tech Stack:** Vite + React + TypeScript + Tailwind CSS + Vitest (unit tests).

**Spec:** `docs/superpowers/specs/2026-11-03-omnikit-design.md`

## Global Constraints

- Platform: Modern web browsers (Chromium, Firefox, Safari).
- Privacy: 100% client-side computation. No server requests, no external telemetry, no remote uploads.
- Domain Modeling: Every tool engine must be a pure, deterministic function with strict TypeScript interfaces.
- Testing: All domain calculations must be verified by automated unit tests before UI wiring.
- Performance: Command palette and search must respond in under 16ms with zero layout jank.

## Review Focus

- Invalid timecode strings or illegal frame rates must return clean error results rather than throwing exceptions or NaN.
- Invalid hex/rgb color codes in contrast checker must safely flag invalid input rather than crashing luminance math.
- Malformed JSON with unbalanced brackets or corrupt tokens must return line/column syntax errors or auto-fix suggestions.
- Negative or zero values in aspect ratio or BPM calculators must be guarded at the boundary with clear validation messages.
- Empty text inputs across writing tools must gracefully return zero counts and clean empty output strings.

---

### Task 1: Scaffolding and Test Harness

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `vitest.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Test: `tests/smoke.test.ts`

**Interfaces:**
- Produces: Runnable Vite dev server and working `npm test` command.

- [ ] **Step 1: Write the failing smoke test**

```typescript
// tests/smoke.test.ts
import { describe, it, expect } from 'vitest';

describe('Omnikit Environment', () => {
  it('initializes test runner correctly', () => {
    expect(true).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify runner status**

Run: `npx vitest run tests/smoke.test.ts`  
Expected: FAIL before config, or PASS once vitest is installed.

- [ ] **Step 3: Scaffold Vite React TypeScript project and Tailwind CSS**

Initialize `package.json` with React 19, TypeScript, Tailwind CSS, Lucide-React icons, and Vitest. Create `vite.config.ts`, `vitest.config.ts`, `tsconfig.json`, `index.html`, and `src/main.tsx`.

- [ ] **Step 4: Run test to verify environment passes**

Run: `npm test`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Omnikit with Vite, React, TypeScript, Tailwind, and Vitest"
```

---

### Task 2: Core Domain Models and Tool Registry

**Files:**
- Create: `src/types/tool.ts`
- Create: `src/registry/registry.ts`
- Test: `tests/registry.test.ts`

**Interfaces:**
- Produces: `ToolDefinition`, `ToolCategory`, `EngineResult<T>`, `registerTool()`, `getTools()`, `searchTools(query, category)`.

- [ ] **Step 1: Write the failing test for registry and search**

```typescript
// tests/registry.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { registerTool, getTools, searchTools, clearRegistry } from '../src/registry/registry';
import { ToolDefinition } from '../src/types/tool';

describe('Tool Registry', () => {
  beforeEach(() => clearRegistry());

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
    expect(getTools()).toHaveLength(1);
    expect(getTools()[0].id).toBe('test-tool');
  });

  it('filters tools by category and search keyword', () => {
    registerTool(mockTool);
    expect(searchTools('dimensions', 'all')).toHaveLength(1);
    expect(searchTools('dimensions', 'design')).toHaveLength(0);
    expect(searchTools('ratio', 'video')).toHaveLength(1);
    expect(searchTools('nonexistent', 'all')).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/registry.test.ts`  
Expected: FAIL ("cannot find module ../src/registry/registry")

- [ ] **Step 3: Implement domain types and registry functions in `src/types/tool.ts` and `src/registry/registry.ts`**

Define `ToolCategory = 'all' | 'video' | 'audio' | 'design' | 'writing' | 'dev'`. Implement `registerTool`, `getTools`, `clearRegistry`, and `searchTools` with case-insensitive token and tag matching.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/registry.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/types/tool.ts src/registry/registry.ts tests/registry.test.ts
git commit -m "feat: add domain types and tool registry engine"
```

---

### Task 3: Video & Media Engines (Timecode & Aspect Ratio)

**Files:**
- Create: `src/engines/video/timecode.ts`
- Create: `src/engines/video/aspectRatio.ts`
- Test: `tests/videoEngines.test.ts`

**Interfaces:**
- Produces: `calculateTimecodeOperation(tc1, op, tc2, fps)` and `calculateAspectRatio(width, height, targetRatio)`.

- [ ] **Step 1: Write failing tests for Timecode math and Aspect Ratio calculation**

```typescript
// tests/videoEngines.test.ts
import { describe, it, expect } from 'vitest';
import { calculateTimecodeOperation, timecodeToFrames, framesToTimecode } from '../src/engines/video/timecode';
import { calculateAspectRatio } from '../src/engines/video/aspectRatio';

describe('Timecode Engine', () => {
  it('converts non-drop-frame timecode to frames at 24fps', () => {
    expect(timecodeToFrames('00:01:00:00', 24)).toBe(1440);
  });

  it('adds two timecodes correctly at 24fps', () => {
    const res = calculateTimecodeOperation('00:01:00:00', '+', '00:00:30:12', 24);
    expect(res.success).toBe(true);
    expect(res.value?.timecode).toBe('00:01:30:12');
  });

  it('subtracts two timecodes correctly and flags negative durations', () => {
    const res = calculateTimecodeOperation('00:00:10:00', '-', '00:00:15:00', 24);
    expect(res.success).toBe(false);
    expect(res.error).toBeDefined();
  });
});

describe('Aspect Ratio Engine', () => {
  it('calculates greatest common divisor aspect ratio for 1920x1080', () => {
    const res = calculateAspectRatio(1920, 1080);
    expect(res.success).toBe(true);
    expect(res.value?.ratioString).toBe('16:9');
    expect(res.value?.decimal).toBeCloseTo(1.777, 2);
  });

  it('calculates letterbox padding inside a target container', () => {
    const res = calculateAspectRatio(1920, 800, '16:9');
    expect(res.value?.letterboxPadding.top).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/videoEngines.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement timecode math and aspect ratio algorithms**

Implement SMPTE frame conversions with support for 23.976, 24, 25, 29.97 DF/NDF, 30, and 60 fps. Implement GCD (Euclidean algorithm) and pillar/letterbox padding calculations.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/videoEngines.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/engines/video/ tests/videoEngines.test.ts
git commit -m "feat: implement video timecode and aspect ratio engines with unit tests"
```

---

### Task 4: Audio Engine (BPM Delay & Reverb Timing)

**Files:**
- Create: `src/engines/audio/bpmCalculator.ts`
- Test: `tests/audioEngines.test.ts`

**Interfaces:**
- Produces: `calculateBpmTimings(bpm: number): EngineResult<BpmTimingResult>`.

- [ ] **Step 1: Write failing tests for BPM calculations**

```typescript
// tests/audioEngines.test.ts
import { describe, it, expect } from 'vitest';
import { calculateBpmTimings } from '../src/engines/audio/bpmCalculator';

describe('BPM Delay & Reverb Engine', () => {
  it('calculates exact milliseconds for 120 BPM', () => {
    const res = calculateBpmTimings(120);
    expect(res.success).toBe(true);
    const timings = res.value!;
    // 60,000 / 120 = 500ms for quarter note
    expect(timings.notes.quarter.normal).toBe(500);
    expect(timings.notes.quarter.dotted).toBe(750);
    expect(timings.notes.quarter.triplet).toBeCloseTo(333.33, 1);
    expect(timings.notes.eighth.normal).toBe(250);
  });

  it('rejects zero or negative BPM inputs', () => {
    expect(calculateBpmTimings(0).success).toBe(false);
    expect(calculateBpmTimings(-20).success).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/audioEngines.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement `calculateBpmTimings` in `src/engines/audio/bpmCalculator.ts`**

Calculate standard divisions (1/1, 1/2, 1/4, 1/8, 1/16, 1/32, 1/64) with normal, dotted, and triplet values, alongside pre-delay and reverb decay bar sync times.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/audioEngines.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/engines/audio/ tests/audioEngines.test.ts
git commit -m "feat: implement audio BPM delay and reverb timing engine"
```

---

### Task 5: Design & UI Engines (WCAG Contrast & PX-to-REM)

**Files:**
- Create: `src/engines/design/contrast.ts`
- Create: `src/engines/design/pxRem.ts`
- Test: `tests/designEngines.test.ts`

**Interfaces:**
- Produces: `calculateWcagContrast(fgHex, bgHex)` and `convertPxRem(value, basePx, direction)`.

- [ ] **Step 1: Write failing tests for WCAG contrast and PX/REM conversions**

```typescript
// tests/designEngines.test.ts
import { describe, it, expect } from 'vitest';
import { calculateWcagContrast } from '../src/engines/design/contrast';
import { convertPxRem } from '../src/engines/design/pxRem';

describe('WCAG Contrast Engine', () => {
  it('computes 21:1 for black on white', () => {
    const res = calculateWcagContrast('#000000', '#ffffff');
    expect(res.success).toBe(true);
    expect(res.value?.ratio).toBeCloseTo(21.0, 1);
    expect(res.value?.aaNormal).toBe(true);
    expect(res.value?.aaaNormal).toBe(true);
  });

  it('correctly assesses poor contrast', () => {
    const res = calculateWcagContrast('#888888', '#ffffff');
    expect(res.value?.ratio).toBeLessThan(4.5);
    expect(res.value?.aaNormal).toBe(false);
  });
});

describe('PX-to-REM Engine', () => {
  it('converts 16px to 1rem with base 16', () => {
    expect(convertPxRem(16, 16, 'px-to-rem').value).toBe(1);
    expect(convertPxRem(24, 16, 'px-to-rem').value).toBe(1.5);
  });

  it('converts 2rem to 32px with base 16', () => {
    expect(convertPxRem(2, 16, 'rem-to-px').value).toBe(32);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/designEngines.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement luminance formulas and conversion algorithms**

Implement relative luminance ($L = 0.2126R + 0.7152G + 0.0722B$) using sRGB color space transformation, contrast ratio calculation $(L1 + 0.05) / (L2 + 0.05)$, and standard scale lookup table generation.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/designEngines.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/engines/design/ tests/designEngines.test.ts
git commit -m "feat: implement WCAG contrast and PX-REM design engines"
```

---

### Task 6: Writing Engines (Multi-Style Case Converter & Word Counter)

**Files:**
- Create: `src/engines/writing/caseConverter.ts`
- Create: `src/engines/writing/wordMetrics.ts`
- Test: `tests/writingEngines.test.ts`

**Interfaces:**
- Produces: `convertCase(text, targetCase)` and `analyzeTextMetrics(text)`.

- [ ] **Step 1: Write failing tests for case conversion and text metrics**

```typescript
// tests/writingEngines.test.ts
import { describe, it, expect } from 'vitest';
import { convertCase } from '../src/engines/writing/caseConverter';
import { analyzeTextMetrics } from '../src/engines/writing/wordMetrics';

describe('Case Converter Engine', () => {
  const input = 'hello world of digital tools';

  it('converts to camelCase, kebab-case, snake_case, and CONSTANT_CASE', () => {
    expect(convertCase(input, 'camel').value).toBe('helloWorldOfDigitalTools');
    expect(convertCase(input, 'kebab').value).toBe('hello-world-of-digital-tools');
    expect(convertCase(input, 'snake').value).toBe('hello_world_of_digital_tools');
    expect(convertCase(input, 'constant').value).toBe('HELLO_WORLD_OF_DIGITAL_TOOLS');
  });

  it('converts to intelligent Title Case preserving minor prepositions', () => {
    expect(convertCase('a tale of two cities', 'title').value).toBe('A Tale of Two Cities');
  });
});

describe('Word Metrics Engine', () => {
  it('accurately counts words, characters, and reading times', () => {
    const text = 'Omnikit is a Swiss Army knife. It has multiple utilities.';
    const res = analyzeTextMetrics(text);
    expect(res.value?.words).toBe(10);
    expect(res.value?.sentences).toBe(2);
    expect(res.value?.readingTimeMinutes).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/writingEngines.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement casing transformation rules and text analytics**

Implement tokenization, case mapping with preposition preservation rules, syllable estimation, and 200 WPM reading rate math.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/writingEngines.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/engines/writing/ tests/writingEngines.test.ts
git commit -m "feat: implement case converter and text metrics engines"
```

---

### Task 7: Dev & Data Engines (Timestamp & JSON Formatter/Fixer)

**Files:**
- Create: `src/engines/dev/timestamp.ts`
- Create: `src/engines/dev/jsonTools.ts`
- Test: `tests/devEngines.test.ts`

**Interfaces:**
- Produces: `convertTimestamp(input)` and `formatAndRepairJson(rawJson, indent)`.

- [ ] **Step 1: Write failing tests for timestamp conversion and JSON repair**

```typescript
// tests/devEngines.test.ts
import { describe, it, expect } from 'vitest';
import { convertTimestamp } from '../src/engines/dev/timestamp';
import { formatAndRepairJson } from '../src/engines/dev/jsonTools';

describe('Timestamp Engine', () => {
  it('converts unix epoch seconds to ISO string', () => {
    const res = convertTimestamp(1700000000);
    expect(res.success).toBe(true);
    expect(res.value?.utc).toBe('2023-11-14T22:13:20.000Z');
  });
});

describe('JSON Engine', () => {
  it('formats valid JSON cleanly', () => {
    const res = formatAndRepairJson('{"a":1,"b":2}', 2);
    expect(res.success).toBe(true);
    expect(res.value?.formatted).toBe('{\n  "a": 1,\n  "b": 2\n}');
  });

  it('repairs single quotes and trailing commas', () => {
    const broken = "{'name': 'omnikit', 'items': [1, 2, ], }";
    const res = formatAndRepairJson(broken, 2);
    expect(res.success).toBe(true);
    expect(JSON.parse(res.value!.formatted)).toEqual({ name: 'omnikit', items: [1, 2] });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/devEngines.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement timestamp conversion and relaxed JSON repair algorithms**

Handle millisecond/second auto-detection, UTC/local date formatting, and regex-based AST sanitization for common JSON human mistakes.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/devEngines.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/engines/dev/ tests/devEngines.test.ts
git commit -m "feat: implement timestamp converter and JSON repair engines"
```

---

### Task 8: Command Palette and Navigation UI

**Files:**
- Create: `src/components/CommandPalette.tsx`
- Create: `src/components/CategoryPills.tsx`
- Create: `src/components/Header.tsx`
- Modify: `src/App.tsx`
- Test: `tests/commandPalette.test.ts`

**Interfaces:**
- Consumes: `src/registry/registry.ts`.
- Produces: Global keyboard shortcut handler (`Ctrl+K`, `/`), category selection, search filtering, and active tool selection.

- [ ] **Step 1: Write unit test for command palette filter logic**

```typescript
// tests/commandPalette.test.ts
import { describe, it, expect } from 'vitest';
import { filterToolList } from '../src/components/paletteLogic';

describe('Palette Filter Logic', () => {
  const tools = [
    { id: 'tc', title: 'Timecode', category: 'video', tags: ['smpte', 'fps'] },
    { id: 'contrast', title: 'Color Contrast', category: 'design', tags: ['wcag'] },
  ];

  it('filters by query and category', () => {
    expect(filterToolList(tools, 'smpte', 'all')).toHaveLength(1);
    expect(filterToolList(tools, '', 'video')).toHaveLength(1);
    expect(filterToolList(tools, 'contrast', 'video')).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/commandPalette.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement Palette components and keyboard listeners**

Build `CommandPalette.tsx` with autofocus input, keyboard arrow navigation, Escape to close/clear, Category pills for `All`, `Video`, `Audio`, `Design`, `Writing`, and `Dev`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/commandPalette.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ tests/commandPalette.test.ts
git commit -m "feat: implement global command palette and category navigation"
```

---

### Task 9: Tool Panel Shell and Tool Views

**Files:**
- Create: `src/components/ToolShell.tsx`
- Create: `src/views/video/TimecodeView.tsx`
- Create: `src/views/video/AspectRatioView.tsx`
- Create: `src/views/audio/BpmView.tsx`
- Create: `src/views/design/ContrastView.tsx`
- Create: `src/views/design/PxRemView.tsx`
- Create: `src/views/writing/CaseConverterView.tsx`
- Create: `src/views/writing/WordMetricsView.tsx`
- Create: `src/views/dev/TimestampView.tsx`
- Create: `src/views/dev/JsonView.tsx`
- Create: `src/registry/registerAllTools.ts`

**Interfaces:**
- Consumes: All engines and domain types.
- Produces: Interactive React tool views wired into `toolRegistry`.

- [ ] **Step 1: Create reusable `ToolShell.tsx`**

Provides tool title, description, category badge, reset button, and one-click copy toast feedback.

- [ ] **Step 2: Build interactive view components for each tool**

Wire inputs with real-time updates directly to pure engine functions with zero latency. Include presets and quick buttons (e.g., "Now" for timestamp, "16:9 / 9:16" for aspect ratio, "120 BPM" for audio, "Sample Text" for case conversion).

- [ ] **Step 3: Register all tools in `src/registry/registerAllTools.ts`**

Register all 8 primary tools across the 5 disciplines into the global registry.

- [ ] **Step 4: Run all test suites to ensure no regressions**

Run: `npm test`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/views/ src/components/ToolShell.tsx src/registry/registerAllTools.ts
git commit -m "feat: build interactive tool views and connect to registry"
```

---

### Task 10: App Wiring, URL Hash Routing, and Production Build

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`
- Test: `tests/integration.test.ts`

**Interfaces:**
- Produces: Complete working Omnikit application with URL hash synchronization (`/#timecode`, `/#contrast`, etc.), LocalStorage history, and green production build.

- [ ] **Step 1: Write integration test for URL hash route sync**

```typescript
// tests/integration.test.ts
import { describe, it, expect } from 'vitest';
import { getToolFromHash } from '../src/utils/routing';

describe('Routing Logic', () => {
  it('extracts tool id from location hash', () => {
    expect(getToolFromHash('#timecode')).toBe('timecode');
    expect(getToolFromHash('')).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/integration.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement routing and wire full `App.tsx`**

Connect URL hash changes, command palette tool launcher, and recent tool history in LocalStorage.

- [ ] **Step 4: Run full test suite and production build**

Run: `npm test && npm run build`  
Expected: All tests PASS, build completes with 0 errors in `dist/`.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: complete Omnikit application with URL routing and verified production build"
```
