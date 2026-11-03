# Omnikit 🛠️

> **The Universal Computer Swiss Army Knife.**  
> Lightning-fast, privacy-first client-side micro-tools for creators, designers, audio engineers, writers, and developers.

Omnikit bundles **26 essential, daily-driver micro-utilities** under one clean roof with zero ads, zero trackers, and zero server roundtrips. Everything executes 100% locally in your browser.

---

## ⚡ 26 High-Utility Micro-Tools Across 5 Disciplines

### 🎬 Video & Film (5 Tools)
- **SMPTE Timecode Calculator:** Frame-accurate timecode addition, subtraction, and duration calculations. Supports 23.976, 24, 25, 29.97 drop-frame, 30, and 60 fps without drift.
- **Aspect Ratio & Letterbox Calculator:** Simplified aspect ratios (Euclidean GCD algorithm), decimal fractions, and exact padding math for 16:9, 9:16, 4:3, and 1:1 containers.
- **Video Bitrate & Storage Estimator:** Calculate expected export file sizes from duration and bitrate, or find the maximum bitrate to fit upload limits (e.g. 25MB Discord limit).
- **Video Safe Area Overlay Guide:** Pixel-accurate margins for broadcast SMPTE Action Safe (90%), Title Safe (80%), and social 9:16 UI exclusion margins (TikTok / Reels).
- **Frame Rate Speed Converter:** Frame-for-frame scaling and playback speed percentage calculations across standard film, PAL, and NTSC framerates.

### 🎵 Audio & Music (3 Tools)
- **BPM Delay & Reverb Sync:** Converts tempo into delay millisecond timings for standard, dotted, and triplet divisions (1/1 through 1/64 notes) plus reverb pre-delay and room decay sync guides.
- **Musical Note to Frequency (Hz):** Bidirectional conversion between musical notes, MIDI numbers, and frequencies with custom A4 concert pitch tuning (432Hz, 440Hz, 442Hz).
- **Tap Tempo BPM Detector:** High-precision interactive tap metronome calculating tempo from sequential keyboard or mouse taps.

### 🎨 Visual & UI Design (5 Tools)
- **WCAG 2.1 Color Contrast Checker:** Instant relative luminance and contrast ratio calculations up to 21:1. Assesses WCAG 2.1 AA and AAA compliance for normal text, large text, and graphical UI components.
- **PX ↔ REM Converter:** Bidirectional pixel-to-REM converter with configurable root font size and quick-lookup reference scales.
- **Color Format Converter:** Seamless conversions between HEX (#RRGGBB / #RRGGBBAA), RGB(A), and HSL(A) with live swatches and copyable CSS tokens.
- **SVG to Data-URI & React JSX:** Strips vector metadata, generates clean CSS Data URIs, and outputs typed, prop-forwarding React component wrappers.
- **CSS Box Shadow Generator:** Multi-layer interactive shadow designer with X/Y offsets, blur, spread, color, opacity, inset toggles, and live preview card.

### ✍️ Writing & Copy (5 Tools)
- **Multi-Style Case Converter:** Transforms text across 9 casing conventions (camelCase, PascalCase, kebab-case, snake_case, CONSTANT_CASE, Title Case preserving minor words, Sentence case, etc.).
- **Word & Reading Metrics:** Real-time counters for characters, words, sentences, paragraphs, average word length, reading time (200 WPM), and speaking time (130 WPM).
- **Side-by-Side Text Diff Checker:** Instant line-by-line comparison highlighting additions, deletions, and unchanged text.
- **Markdown Live Preview:** Split-pane Markdown notepad with instant HTML rendering and single-click Markdown export.
- **Line Sorter & Deduplicator:** Alphabetical (A-Z, Z-A), numerical natural, and length sorting with duplicate stripping and blank-line removal.

### 💻 Developer & Data (7 Tools)
- **Unix Epoch Timestamp Converter:** Bidirectional conversion between Unix timestamps (seconds & milliseconds) and ISO 8601 UTC / local datetime strings, complete with live epoch clock.
- **JSON Formatter & Auto-Fixer:** Formats, minifies, validates, and automatically repairs malformed JSON (single quotes, trailing commas, and unquoted keys).
- **Base64 String Converter:** Encodes and decodes strings with standard Base64 or URL-safe encoding without padding.
- **URL Encoder & Decoder:** Encodes and decodes URI components with automatic query parameter key-value table extraction.
- **Cryptographic Hash Generator:** Computes deterministic SHA-256, SHA-512, SHA-1, and MD5 digests 100% client-side via Web Crypto.
- **UUID v4 Generator:** Bulk-generates cryptographically random UUIDs with configurable hyphens and uppercase letters.
- **HTML Entities Encoder / Decoder:** Safely escapes special HTML characters (`<`, `>`, `&`, `"`, `'`) and restores named/numeric entities.

---

## 🚀 Keyboard-First Ergonomics

- **Command Palette:** Press <kbd>Ctrl</kbd>+<kbd>K</kbd>, <kbd>Cmd</kbd>+<kbd>K</kbd>, or <kbd>/</kbd> anywhere to trigger the fuzzy search bar across all 26 tools.
- **Category Filter Pills:** Switch instantly between disciplines (`Video & Film`, `Audio & Music`, `Design & UI`, `Writing & Copy`, `Dev & Data`).
- **Deep Linking:** Hash-based routing allows sharing or bookmarking specific tools (e.g. `/#timecode`, `/#contrast`, `/#base64`, `/#text-diff`).
- **Zero Data Leakage:** 100% client-side computation. Sensitive tokens, text, and data never leave your browser sandbox.

---

## 🛠️ Tech Stack & Architecture

- **UI Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Testing:** Node.js native `node:test` runner executing 91 TypeScript unit tests in <350ms.
- **CI/CD:** Automated GitHub Actions pipeline building and deploying directly to GitHub Pages on every push.

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
