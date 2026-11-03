# Omnikit (Universal Computer Swiss Army Knife) Design Document

**Date:** 2026-11-03  
**Status:** Draft  
**Scope:** Project  

---

## 1. Intent and Why

Computer professionals across disciplines (video editors, designers, developers, writers, and analysts) frequently need small, single-purpose utilities during their daily workflows. Today, these utilities are scattered across hundreds of ad-heavy, slow, tracking-laden websites (such as ad-infested timestamp converters, shady file format converters, or insecure JSON formatters). 

Omnikit is a unified, lightning-fast, privacy-first web application that bundles these high-friction micro-tools under one clean roof. Every tool runs 100% locally in the browser with zero server roundtrips, ensuring sensitive client data, source files, and tokens never leave the user's machine.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- **Instant Discovery & Execution:** Provide a global command palette (`Ctrl+K` / `/`) and role-based category filtering so any tool can be located and used in under 3 seconds.
- **Multi-Disciplinary Scope from Day One:** Include initial high-value micro-tools for video/audio editors, visual designers, writers/marketers, and software developers.
- **Zero-Latency Client-Side Computation:** All operations (calculations, conversions, parsing, hashing, formatting) run strictly in the browser using Web APIs, Canvas, and pure TypeScript functions.
- **Extensible Architecture:** A declarative `ToolDefinition` registry that allows adding a new micro-tool in a single self-contained module with zero boilerplate.
- **Clean Keyboard & Clipboard Ergonomics:** Automatic focus on inputs, keyboard shortcuts, instant output copying, and clean visual feedback.

### Non-Goals
- Full-fledged desktop software replacement (e.g., this is not a full video NLE, Photoshop, or IDE; it is for the micro-math, conversions, and checks surrounding those workflows).
- Server-side persistence or user accounts for launch (no logins, no databases; local storage handles favorites/history).
- Cloud AI API integration for launch (focus is deterministic, zero-latency local utilities).

### Anti-Goals
- No telemetry, analytics tracking, or external data leaks.
- No heavy bloated frameworks that compromise initial load time.
- No ads, paywalls, or feature gates for basic utilities.

---

## 3. Constraints

- **Platform:** Modern web browsers (Chromium, Firefox, Safari).
- **Tech Stack:** Vite + React + TypeScript + Tailwind CSS (fast, modular, type-safe).
- **Execution Boundary:** Client-side only. Zero backend server required.
- **Privacy:** User data must never leave the browser sandbox.

---

## 4. Approaches Considered

### Approach 1: Command Bar with Instant Utility Canvas (Chosen)
Users land directly on a global search bar with role/category pills. Typing or pressing shortcuts instantly filters tools. Selecting a tool loads a focused, clean utility panel with presets, instant inputs/outputs, and copy buttons.
- **Trade-offs:** Emphasizes speed and keyboard ergonomics over massive catalog walls. Category tags ensure discoverability for users browsing without specific keywords.
- **Why Chosen:** A Swiss Army knife must be immediate. It matches the workflow of power tools like Raycast and DevToys while remaining accessible in any browser tab.

### Approach 2: Persistent Category Sidebar with Tool Cards (Rejected)
A two-column layout with category navigation on the left and a grid of interactive cards on the right.
- **Trade-offs:** High visual discovery, but consumes excessive screen real estate and feels like an administrative dashboard rather than an instant utility.

### Approach 3: Multi-Tool Split Canvas with Chaining (Deferred)
A desktop-like windowed layout where users open multiple tools side by side and pipe outputs between them.
- **Trade-offs:** Powerful for complex chaining, but introduces unnecessary friction and cognitive overhead for quick, single-purpose lookups.

---

## 5. What Was Decided

1. **Target Audiences & Initial Tool Battery:**
   - **Video & Media:** Timecode Calculator (multi-fps math: 23.976, 24, 29.97, 60fps), Aspect Ratio & Letterbox Padding Calculator, Frame-to-Milliseconds Converter.
   - **Design & UI:** Color Contrast Checker (WCAG AA/AAA compliance), PX-to-REM Converter, SVG Cleaner & Data-URI generator.
   - **Writers & Marketers:** Case Converter (Title, Camel, Kebab, Snake, Sentence), Word & Character Counter with Reading Time, Text Diff Checker.
   - **Dev & Data:** Unix Timestamp / Epoch Converter, JSON Formatter & Validator, Base64 & URL Encoder/Decoder.

2. **Domain Model & Architecture (pstack Principles):**
   - **Boundary Discipline:** Pure transformation logic separated completely from UI rendering. Every tool engine is a pure function: `(input: TInput) => Result<TOutput>`.
   - **Type System Discipline:** Strict typing for tool metadata, categories, inputs, and validation results.
   - **Extensible Registry:** A central `toolRegistry` array where each tool exports its id, title, description, category, tags, keywords, component, and pure runner.

3. **Search & Command Bar Experience:**
   - Global keyboard listener (`Ctrl+K`, `Cmd+K`, `/`).
   - Fuzzy search against tool title, description, category, and alias tags.
   - Quick category pills: `All`, `Video & Media`, `Design`, `Text & Writing`, `Dev & Data`.
   - LocalStorage for recently used and favorite tools.

---

## 6. What Is Left to the Builder

- Exact UI styling details, transitions, and dark/light theme token definitions.
- Detailed unit test suite verifying the pure engine functions for each tool (timecode math, aspect ratio formulas, WCAG contrast formula, etc.).
- Build scripts and verification command setup (`npm test`, `npm run build`, `npm run dev`).
