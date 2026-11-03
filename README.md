# Omnikit 🛠️

> **The Universal Computer Swiss Army Knife.**  
> Lightning-fast, privacy-first client-side micro-tools for creators, designers, audio engineers, writers, and developers.

Omnikit bundles **65 essential, daily-driver micro-utilities** under one clean roof with zero ads, zero trackers, and zero server roundtrips. Everything executes 100% locally in your browser.

---

## ⚡ 65 High-Utility Micro-Tools Across 5 Disciplines

### 🎬 Video & Film (9 Tools)
- **SMPTE Timecode Calculator:** Frame-accurate timecode addition, subtraction, and duration calculations. Supports 23.976, 24, 25, 29.97 drop-frame, 30, and 60 fps without drift.
- **Aspect Ratio & Letterbox Calculator:** Simplified aspect ratios (Euclidean GCD algorithm), decimal fractions, and exact padding math for 16:9, 9:16, 4:3, and 1:1 containers.
- **Video Bitrate & Storage Estimator:** Calculate expected export file sizes from duration and bitrate, or find the maximum bitrate to fit upload limits (e.g. 25MB Discord limit).
- **Video Safe Area Overlay Guide:** Pixel-accurate margins for broadcast SMPTE Action Safe (90%), Title Safe (80%), and social 9:16 UI exclusion margins (TikTok / Reels).
- **Frame Rate Speed Converter:** Frame-for-frame scaling and playback speed percentage calculations across standard film, PAL, and NTSC framerates.
- **Camera Lens & Sensor Crop Factor Calculator:** 35mm equivalent focal length and horizontal/vertical field of view calculations across Full Frame, Super 35, APS-C, and MFT sensors.
- **Shutter Speed & Shutter Angle (180° Rule):** Calculate cinema shutter speed fractions from rotary shutter angles and framerates for natural cinematic motion blur.
- **Video Recording Time & Storage Estimator:** Calculate how many hours and minutes of footage can record onto your SD card, CFexpress, or SSD across ProRes, RAW, and H.264/H.265.
- **Timelapse Interval & Frame Calculator:** Calculate photography shooting intervals, total frames, and storage space for smooth timelapse videos.

### 🎵 Audio & Music (5 Tools)
- **BPM Delay & Reverb Sync:** Converts tempo into delay millisecond timings for standard, dotted, and triplet divisions (1/1 through 1/64 notes) plus reverb pre-delay and room decay sync guides.
- **Musical Note to Frequency (Hz):** Bidirectional conversion between musical notes, MIDI numbers, and frequencies with custom A4 concert pitch tuning (432Hz, 440Hz, 442Hz).
- **Tap Tempo BPM Detector:** High-precision interactive tap metronome calculating tempo from sequential keyboard or mouse taps.
- **Pitch Shift & Tape Speed Transposer:** Calculate pitch shift ratios, semitone alterations, cent fine-tuning, and tape speed factors across vintage tape or digital sampler rates.
- **Precision Audio Metronome & Tempo Guide:** Interactive tempo metronome with downbeat accents, customizable time signatures, and classical Italian markings.

### 🎨 Visual & UI Design (15 Tools)
- **WCAG 2.1 Color Contrast Checker:** Instant relative luminance and contrast ratio calculations up to 21:1. Assesses WCAG 2.1 AA and AAA compliance for normal text, large text, and graphical UI components.
- **PX ↔ REM Converter:** Bidirectional pixel-to-REM converter with configurable root font size and quick-lookup reference scales.
- **Color Format Converter:** Seamless conversions between HEX (#RRGGBB / #RRGGBBAA), RGB(A), and HSL(A) with live swatches and copyable CSS tokens.
- **SVG to Data-URI & React JSX:** Strips vector metadata, generates clean CSS Data URIs, and outputs typed, prop-forwarding React component wrappers.
- **CSS Box Shadow Generator:** Multi-layer interactive shadow designer with X/Y offsets, blur, spread, color, opacity, inset toggles, and live preview card.
- **CSS Gradient Generator:** Interactive linear and radial gradient builder with angle control, custom color stops, and CSS snippet export.
- **CSS Triangle Generator:** Directional CSS border triangle generator with configurable width, height, and color.
- **Keyboard Keycode Inspector:** Live keyboard event properties visualizer displaying `event.keyCode`, `key`, `code`, and modifier flags.
- **CSS Glassmorphism Generator:** Design modern frosted glass UI cards with backdrop blur, transparency, borders, and copyable CSS.
- **Color Tint & Shade Palette Generator:** Generate complete 50-950 Tailwind-style color step scales from any base hex color.
- **CSS Cursor Visualizer & Rule Generator:** Browse, test, and copy standard CSS cursor properties with interactive hover test area.
- **CSS Clamp() Fluid Typography Calculator:** Calculate fluid clamp() formulas for responsive typography and spacing across any viewport range.
- **CSS Aspect-Ratio Rule Generator:** Generate modern CSS aspect-ratio properties and legacy padding-top container hack snippets.
- **CSS 8-Value Border Radius & Blob Generator:** Design organic fluid blob shapes using advanced CSS 8-value border-radius properties.
- **CSS Cubic-Bezier Easing Generator:** Design custom transition timing functions and preview smooth animation physics.

### ✍️ Writing & Copy (12 Tools)
- **Multi-Style Case Converter:** Transforms text across 9 casing conventions (camelCase, PascalCase, kebab-case, snake_case, CONSTANT_CASE, Title Case preserving minor words, Sentence case, etc.).
- **Word & Reading Metrics:** Real-time counters for characters, words, sentences, paragraphs, average word length, reading time (200 WPM), and speaking time (130 WPM).
- **Side-by-Side Text Diff Checker:** Instant line-by-line comparison highlighting additions, deletions, and unchanged text.
- **Markdown Live Preview:** Split-pane Markdown notepad with instant HTML rendering and single-click Markdown export.
- **Line Sorter & Deduplicator:** Alphabetical (A-Z, Z-A), numerical natural, and length sorting with duplicate stripping and blank-line removal.
- **Lorem Ipsum Copy Generator:** Fast dummy placeholder text generator by paragraphs, sentences, or words with optional standard Latin opening.
- **URL Slug & Filename Normalizer:** Sanitizes article headings and file names into SEO-friendly, clean URL slugs by stripping accents and special characters.
- **Keyword Density & Frequency Analyzer:** Analyze word frequency counts, percentage densities, and SEO occurrence metrics in text.
- **Markdown Table Generator & Editor:** Design interactive tabular data with custom alignments and copy clean GitHub Flavored Markdown.
- **Flesch Readability & Grade Level:** Evaluate reading ease, Flesch-Kincaid school grade level, and average sentence complexity metrics.
- **Alternating & Inverted Case Generator:** Transform text into sarcastic meme aLtErNaTiNg cAsE, inverted case, or randomized casing.
- **Caesar & ROT13 Cipher Obfuscator:** Encrypt or scramble text using historical Caesar shift ciphers and symmetrical ROT13 obfuscation.

### 💻 Developer & Data (24 Tools)
- **Unix Epoch Timestamp Converter:** Bidirectional conversion between Unix timestamps (seconds & milliseconds) and ISO 8601 UTC / local datetime strings, complete with live epoch clock.
- **JSON Formatter & Auto-Fixer:** Formats, minifies, validates, and automatically repairs malformed JSON (single quotes, trailing commas, and unquoted keys).
- **Base64 String Converter:** Encodes and decodes strings with standard Base64 or URL-safe encoding without padding.
- **URL Encoder & Decoder:** Encodes and decodes URI components with automatic query parameter key-value table extraction.
- **Cryptographic Hash Generator:** Computes deterministic SHA-256, SHA-512, SHA-1, and MD5 digests 100% client-side via Web Crypto.
- **UUID v4 Generator:** Bulk-generates cryptographically random UUIDs with configurable hyphens and uppercase letters.
- **HTML Entities Encoder / Decoder:** Safely escapes special HTML characters (`<`, `>`, `&`, `"`, `'`) and restores named/numeric entities.
- **Linux Chmod Calculator:** Visual file permission calculator translating between octal (`755`, `644`) and symbolic (`rwxr-xr-x`) notations.
- **Crontab Humanizer & Explainer:** Translates 5-part cron schedules into clear plain English descriptions with quick-pick common presets.
- **JWT Token Inspector:** Decodes and inspects JSON Web Token headers, payload claims, and expiration timestamps completely client-side.
- **QR Code Generator:** Generates clean, scannable vector QR code SVGs for URLs, Wi-Fi credentials, or plain text without remote APIs.
- **cURL Command to Code Converter:** Parse raw curl commands into executable JavaScript fetch, Node.js, and Python requests snippets.
- **Docker Run to Compose Converter:** Convert single docker run commands into multi-service docker-compose.yml specifications.
- **XML Formatter & Minifier:** Beautify indentation or collapse XML feeds, sitemaps, and payloads into minified single lines.
- **YAML ↔ JSON Bidirectional Converter:** Convert between YAML manifests and JSON data with syntax formatting and error detection.
- **Data Storage & Byte Unit Converter:** Convert data amounts between Bytes, KB, MB, GB, TB, and binary kibibytes (KiB, MiB, GiB).
- **SQL Formatter & Beautifier:** Format and indent raw SQL queries with syntax structure and uppercase clause keywords.
- **User Agent Inspector & Parser:** Inspect your active browser User Agent or parse arbitrary client strings into structured properties.
- **ASCII Text Banner Generator:** Generate retro ASCII block banners and typography headers for terminal scripts and code comments.
- **RegEx Match Tester & Groups:** Test Regular Expressions in real-time with capture group extraction, flags, and match indices.
- **HTTP Basic Auth Generator & Decoder:** Generate standard HTTP Authorization Basic header tokens or decode incoming authorization headers.
- **Markdown ↔ HTML Converter:** Convert bidirectionally between Markdown content and clean HTML tags.
- **Text ↔ Binary Byte Converter:** Translate ASCII / UTF-8 strings to 8-bit binary strings and decode binary bytes back to readable text.
- **Text ↔ Hex Byte String Converter:** Convert text strings to hexadecimal byte representations and decode hex dumps back into clear UTF-8 text.

---

## 🚀 Keyboard-First Ergonomics

- **Command Palette:** Press <kbd>Ctrl</kbd>+<kbd>K</kbd>, <kbd>Cmd</kbd>+<kbd>K</kbd>, or <kbd>/</kbd> anywhere to trigger the fuzzy search bar across all 35 tools.
- **Category Filter Pills:** Switch instantly between disciplines (`Video & Film`, `Audio & Music`, `Design & UI`, `Writing & Copy`, `Dev & Data`).
- **Deep Linking:** Hash-based routing allows sharing or bookmarking specific tools (e.g. `/#chmod-calculator`, `/#qr-code`, `/#jwt-decoder`).
- **Zero Data Leakage:** 100% client-side computation. Sensitive tokens, text, and data never leave your browser sandbox.

---

## 🛠️ Tech Stack & Architecture

- **UI Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Testing:** Node.js native `node:test` runner executing 108 TypeScript unit tests in <400ms.
- **CI/CD:** Automated GitHub Actions pipeline building and deploying directly to GitHub Pages on every push.

---

## 🏁 Getting Started

```bash
git clone https://github.com/Abinanthan-CG/omnikit.git
cd omnikit
npm install
npm run dev
```

---

## 📄 License

MIT
