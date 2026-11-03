# Omnikit 🛠️

> **The Universal Computer Swiss Army Knife.**  
> Lightning-fast, privacy-first client-side micro-tools for creators, designers, audio engineers, writers, and developers.

Omnikit bundles essential, daily-driver micro-utilities under one clean roof with zero ads, zero trackers, and zero server roundtrips. Everything executes 100% locally in your browser.

---

## ⚡ Features & Included Tools

### 🎬 Video & Film
- **SMPTE Timecode Calculator:** Frame-accurate timecode addition, subtraction, and duration calculations. Supports 23.976, 24, 25, 29.97 drop-frame, 30, and 60 fps without drift.
- **Aspect Ratio & Letterbox Calculator:** Simplified aspect ratios (Euclidean GCD algorithm), decimal fractions, and exact padding math for 16:9, 9:16, 4:3, and 1:1 containers.

### 🎵 Audio & Music
- **BPM Delay & Reverb Sync:** Converts tempo into delay millisecond timings for standard, dotted, and triplet divisions (1/1 through 1/64 notes) plus reverb pre-delay and room decay sync guides.

### 🎨 Visual & UI Design
- **WCAG 2.1 Color Contrast Checker:** Instant relative luminance and contrast ratio calculations up to 21:1. Assesses WCAG 2.1 AA and AAA compliance for normal text, large text, and graphical UI components.
- **PX ↔ REM Converter:** Bidirectional pixel-to-REM converter with configurable root font size and quick-lookup reference scales.

### ✍️ Writing & Copy
- **Multi-Style Case Converter:** Transforms text across 9 casing conventions (camelCase, PascalCase, kebab-case, snake_case, CONSTANT_CASE, Title Case preserving minor words, Sentence case, etc.).
- **Word & Reading Metrics:** Real-time counters for characters, words, sentences, paragraphs, average word length, reading time (200 WPM), and speaking time (130 WPM).

### 💻 Developer & Data
- **Unix Epoch Timestamp Converter:** Bidirectional conversion between Unix timestamps (seconds & milliseconds) and ISO 8601 UTC / local datetime strings, complete with live epoch clock.
- **JSON Formatter & Auto-Fixer:** Formats, minifies, validates, and automatically repairs malformed JSON (single quotes, trailing commas, and unquoted keys).

---

## 🚀 Keyboard-First Ergonomics

- **Command Palette:** Press <kbd>Ctrl</kbd>+<kbd>K</kbd>, <kbd>Cmd</kbd>+<kbd>K</kbd>, or <kbd>/</kbd> anywhere to trigger the fuzzy search bar.
- **Category Filter Pills:** Switch instantly between disciplines (`Video & Film`, `Audio & Music`, `Design & UI`, `Writing & Copy`, `Dev & Data`).
- **Deep Linking:** Hash-based routing allows sharing or bookmarking specific tools (e.g. `/#timecode`, `/#contrast`, `/#bpm-delay`).
- **Zero Data Leakage:** 100% client-side computation. Sensitive tokens, text, and data never leave your browser sandbox.

---

## 🛠️ Tech Stack & Architecture

- **UI Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Engine Architecture:** Strict decoupling of pure computation engines (`src/engines/*`) from presentation components (`src/views/*`).
- **Testing:** Node.js native `node:test` runner executing full TypeScript suites in <300ms.

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- `npm`

### Installation

```bash
# Clone the repository
git clone https://github.com/Abinanthan-CG/omnikit.git
cd omnikit

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running Tests

```bash
npm test
```

### Production Build

```bash
npm run build
```

---

## 📄 License

MIT
