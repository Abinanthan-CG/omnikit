# Omnikit Expansion Battery (16 New Micro-Tools) Design Document

**Date:** 2026-11-03  
**Status:** Approved  
**Scope:** Major Feature Expansion (10 -> 26 Tools)  

---

## 1. Intent and Why

Omnikit is designed to be the universal, privacy-first computer Swiss Army knife for computer professionals. To scale from the initial 10-tool proof of concept into a high-utility everyday hub, this expansion adds 16 high-frequency micro-tools across Developer, Designer, Writer, Audio, and Video workflows.

Every tool adheres strictly to Omnikit's foundational rules:
- **100% Client-Side:** Zero network requests, zero telemetry, zero server dependencies.
- **Pure Engine Architecture:** Calculation engines are pure, deterministic TypeScript functions `(input: TInput) => EngineResult<TOutput>` verified by automated unit tests before UI wiring.
- **Global Command Integration:** All tools instantly searchable in the command palette (`Ctrl+K` / `/`) and accessible via URL hash deep links.

---

## 2. Tools in this Expansion Battery

### A. Dev & Data
1. **Base64 String & Text Converter (`base64-converter`)**: Bidirectional encoding and decoding supporting standard and URL-safe Base64 with UTF-8 byte handling.
2. **URL Encoder & Decoder (`url-encoder`)**: `encodeURIComponent` / `decodeURIComponent` utility plus live query parameter key-value table breakdown.
3. **Cryptographic Hash Generator (`hash-generator`)**: Deterministic hashing (SHA-256, SHA-512, SHA-1, MD5) running client-side with hexadecimal output.
4. **UUID Generator (`uuid-generator`)**: Bulk UUID v4 generation with configurable uppercase, hyphens, and single-click copy.
5. **HTML Entities Encoder / Decoder (`html-entities`)**: Converts special characters (`<`, `>`, `&`, `"`, `'`) to named and numeric entities and vice versa.

### B. Design & UI
6. **Color Format Converter (`color-converter`)**: Bidirectional conversion between HEX (#RRGGBB / #RRGGBBAA), RGB(A), and HSL(A) with live swatch and CSS values.
7. **SVG Cleaner & Data-URI Generator (`svg-to-data-uri`)**: Strips metadata, encodes SVG into clean CSS Data URI (`data:image/svg+xml,...`), and outputs copyable React/JSX SVG component wrappers.
8. **CSS Box Shadow Generator (`box-shadow`)**: Interactive sliders for X/Y offset, blur, spread, color, opacity, and inset with live preview card and CSS snippet.

### C. Text & Writing
9. **Side-by-Side Text Diff Checker (`text-diff`)**: Line-by-line and word-level text comparison showing additions, removals, and unchanged lines.
10. **Markdown Live Previewer (`markdown-preview`)**: Split-pane live Markdown editor with instant HTML rendering, word count, and HTML code exporter.
11. **Line Sorter & Deduplicator (`line-sorter`)**: Sorts text lists (A-Z, Z-A, length, natural), removes duplicates, strips blank lines, and reverses lists.

### D. Audio & Sound
12. **Musical Note to Frequency (Hz) Calculator (`note-frequency`)**: Converts musical notes (C0 to B8) and MIDI numbers to frequencies in Hz with configurable A4 base tuning (432Hz, 440Hz, 442Hz).
13. **Tap Tempo BPM Detector (`tap-tempo`)**: Calculates real-time BPM and average interval timing based on sequential taps via spacebar or click.

### E. Video & Film
14. **Video Bitrate & Storage Estimator (`bitrate-calculator`)**: Bidirectional calculator: calculates target file size from duration and bitrate, or calculates required video bitrate to fit a target file size (e.g. 25MB Discord limit, 500MB upload).
15. **Broadcast & Social Safe Area Calculator (`safe-area`)**: Computes exact pixel margins for SMPTE Action Safe (90%), Title Safe (80%), and social 9:16 safe UI overlays (TikTok / Instagram Reels icon exclusions).
16. **Frame Rate Speed Converter (`fps-converter`)**: Computes frame-for-frame timing and percentage speed changes when converting footage between 23.976, 24, 25, 29.97, 50, and 59.94 fps.

---

## 3. Architecture & Registry Additions

- **New Engines (`src/engines/*`)**:
  - `src/engines/dev/base64.ts`, `urlTools.ts`, `hash.ts`, `uuid.ts`, `htmlEntities.ts`
  - `src/engines/design/colorConverter.ts`, `svgTools.ts`, `boxShadow.ts`
  - `src/engines/writing/textDiff.ts`, `lineSorter.ts`
  - `src/engines/audio/noteFrequency.ts`, `tapTempo.ts`
  - `src/engines/video/bitrate.ts`, `safeArea.ts`, `fpsConverter.ts`
- **Unit Tests (`tests/*`)**:
  - `tests/devBattery.test.ts`, `tests/designBattery.test.ts`, `tests/writingBattery.test.ts`, `tests/audioBattery.test.ts`, `tests/videoBattery.test.ts`
- **Interactive Views (`src/views/*`)**:
  - Interactive components following the existing `ToolShell` pattern with responsive inputs, outputs, preset chips, and instant copy buttons.
- **Registry Update (`src/registry/registerAllTools.ts`)**:
  - Register all 16 tools into the central catalog, automatically populating the Command Palette and Category Pills.

---

## 4. Verification Plan

1. Execute test suite with `node --test tests/*.test.ts` to ensure 100% of engine tests pass (target: ~90+ tests total).
2. Execute `npm run build` to verify zero TypeScript errors and clean bundle emission.
3. Commit and push to `main` branch to trigger automated GitHub Actions deployment to GitHub Pages.
