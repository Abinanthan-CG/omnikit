# Omnikit Expansion Battery (16 New Micro-Tools) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand Omnikit by 16 new high-utility micro-tools across Dev, Design, Writing, Audio, and Video disciplines, scaling the total catalog from 10 to 26 tools with 100% client-side privacy, automated unit tests, and GitHub Pages deployment.

**Spec:** `docs/superpowers/specs/2026-11-03-omnikit-expansion-battery.md`

---

### Task 1: Dev & Data Engines (Base64, URL, Hash, UUID, HTML Entities)

**Files:**
- Create: `src/engines/dev/base64Tools.ts`
- Create: `src/engines/dev/urlTools.ts`
- Create: `src/engines/dev/hashTools.ts`
- Create: `src/engines/dev/uuidTools.ts`
- Create: `src/engines/dev/htmlEntityTools.ts`
- Test: `tests/devBattery.test.ts`

- [ ] **Step 1: Write failing unit tests for Dev engines**
- [ ] **Step 2: Implement Base64, URL, Hash, UUID, and HTML Entity engines**
- [ ] **Step 3: Run unit tests and verify they pass**
- [ ] **Step 4: Commit task 1**

---

### Task 2: Design & UI Engines (Color Converter, SVG to Data URI, Box Shadow)

**Files:**
- Create: `src/engines/design/colorConverter.ts`
- Create: `src/engines/design/svgTools.ts`
- Create: `src/engines/design/boxShadow.ts`
- Test: `tests/designBattery.test.ts`

- [ ] **Step 1: Write failing unit tests for Design engines**
- [ ] **Step 2: Implement Color Converter, SVG to Data-URI, and Box Shadow engines**
- [ ] **Step 3: Run unit tests and verify they pass**
- [ ] **Step 4: Commit task 2**

---

### Task 3: Writing & Copy Engines (Text Diff, Line Sorter)

**Files:**
- Create: `src/engines/writing/textDiff.ts`
- Create: `src/engines/writing/lineSorter.ts`
- Test: `tests/writingBattery.test.ts`

- [ ] **Step 1: Write failing unit tests for Writing engines**
- [ ] **Step 2: Implement Text Diff and Line Sorter engines**
- [ ] **Step 3: Run unit tests and verify they pass**
- [ ] **Step 4: Commit task 3**

---

### Task 4: Audio & Video Engines (Note Frequency, Tap Tempo, Bitrate, Safe Area, FPS)

**Files:**
- Create: `src/engines/audio/noteFrequency.ts`
- Create: `src/engines/audio/tapTempo.ts`
- Create: `src/engines/video/bitrate.ts`
- Create: `src/engines/video/safeArea.ts`
- Create: `src/engines/video/fpsConverter.ts`
- Test: `tests/audioVideoBattery.test.ts`

- [ ] **Step 1: Write failing unit tests for Audio and Video engines**
- [ ] **Step 2: Implement Note Frequency, Tap Tempo, Bitrate, Safe Area, and FPS engines**
- [ ] **Step 3: Run unit tests and verify they pass**
- [ ] **Step 4: Commit task 4**

---

### Task 5: Interactive UI Views for All 16 Tools

**Files:**
- Create Views:
  - `src/views/dev/Base64View.tsx`
  - `src/views/dev/UrlView.tsx`
  - `src/views/dev/HashView.tsx`
  - `src/views/dev/UuidView.tsx`
  - `src/views/dev/HtmlEntityView.tsx`
  - `src/views/design/ColorConverterView.tsx`
  - `src/views/design/SvgView.tsx`
  - `src/views/design/BoxShadowView.tsx`
  - `src/views/writing/TextDiffView.tsx`
  - `src/views/writing/MarkdownPreviewView.tsx`
  - `src/views/writing/LineSorterView.tsx`
  - `src/views/audio/NoteFrequencyView.tsx`
  - `src/views/audio/TapTempoView.tsx`
  - `src/views/video/BitrateView.tsx`
  - `src/views/video/SafeAreaView.tsx`
  - `src/views/video/FpsConverterView.tsx`

- [ ] **Step 1: Build the 16 view components with inputs, outputs, and instant copy buttons**
- [ ] **Step 2: Verify zero TypeScript diagnostics with `npx tsc --noEmit`**
- [ ] **Step 3: Commit task 5**

---

### Task 6: Registry Integration, End-to-End Verification, and GitHub Pages Deployment

**Files:**
- Modify: `src/registry/registerAllTools.ts`
- Test: `tests/integration.test.ts`
- Modify: `README.md`

- [ ] **Step 1: Register all 16 new tools into the central catalog**
- [ ] **Step 2: Run complete unit test suite across all 18+ test suites**
- [ ] **Step 3: Run production build `npm run build`**
- [ ] **Step 4: Update README.md with the expanded 26-tool catalogue**
- [ ] **Step 5: Commit and push to GitHub `main` branch to trigger live deployment**
- [ ] **Step 6: Verify live deployment status on GitHub Pages**
