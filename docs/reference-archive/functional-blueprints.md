# Functional Blueprints & Reference Archive

This document archives the functional specifications, input/output behaviors, and math models extracted from top utility websites to serve as the blueprint for Omnikit's clean-room implementations.

---

## 1. Video & Media: Timecode Math & Aspect Ratio
*Reference Sites: CineMath (`cinemath.app`), FilmAhava (`filmahava.com`), Digital Rebellion (`digitalrebellion.com`)*

### A. Timecode Calculator
- **Inputs:**
  - Timecode 1 (`HH:MM:SS:FF`)
  - Operation: `+` (Add), `-` (Subtract)
  - Timecode 2 (`HH:MM:SS:FF`)
  - Frame Rate (FPS): `23.976`, `24`, `25`, `29.97 DF` (Drop Frame), `29.97 NDF`, `30`, `59.94 DF`, `60`
- **Outputs:**
  - Result Timecode string
  - Total frame count
  - Duration in seconds & milliseconds
- **Math & Edge Cases:**
  - SMPTE standard: Drop Frame skips frames `00` and `01` of the first second of every minute, except minutes divisible by 10 (`00`, `10`, `20`, `30`, `40`, `50`).
  - Rollover past 24 hours (`86,400` seconds).

### B. Aspect Ratio & Letterbox Calculator
- **Inputs:**
  - Source Width & Height (e.g., `1920x1080` or `3840x2160`)
  - Target Ratio (Preset: `16:9`, `9:16`, `4:3`, `1:1`, `2.39:1`, `2:1`, or Custom)
- **Outputs:**
  - Simplified Aspect Ratio (calculated using Greatest Common Divisor)
  - Rescaled dimensions keeping aspect ratio (width-locked or height-locked)
  - Letterbox (top/bottom) or Pillarbox (left/right) padding in exact pixels to fit inside target container.

---

## 2. Audio & Sound: BPM Delay & Reverb Timing
*Reference Sites: DelayReverbCalculator.com, Meshplugins*

### A. BPM to Milliseconds Calculator
- **Inputs:**
  - Tempo in BPM (e.g., `120.0`)
- **Outputs:**
  - Delay times in milliseconds for:
    - Normal notes: Whole (1/1), 1/2, 1/4, 1/8, 1/16, 1/32, 1/64
    - Dotted notes: Normal × 1.5
    - Triplet notes: Normal × (2 / 3)
  - Reverb Pre-Delay suggestions (1/64, 1/32, 1/16 triplet)
  - Reverb Decay Time suggestions synced to 1-bar, 2-bar, and 4-bar lengths.

---

## 3. Design & UI: Contrast & Units
*Reference Sites: WebAIM, Omatsuri (`omatsuri.app`), Coolors*

### A. WCAG Color Contrast Checker
- **Inputs:**
  - Foreground Color (HEX, RGB, or HSL)
  - Background Color (HEX, RGB, or HSL)
- **Outputs:**
  - Contrast Ratio (e.g. `4.54:1` to `21:1`)
  - Relative Luminance $L = 0.2126 R + 0.7152 G + 0.0722 B$
  - WCAG 2.1 compliance badges:
    - Normal Text: AA (>= 4.5:1), AAA (>= 7:1)
    - Large Text: AA (>= 3:1), AAA (>= 4.5:1)
    - UI Components / Graphics: AA (>= 3:1)

### B. PX to REM Converter
- **Inputs:**
  - Base Font Size in PX (default `16px`)
  - Target PX value or Target REM value
- **Outputs:**
  - Converted REM or PX value
  - Quick lookup scale table (8px, 10px, 12px, 14px, 16px, 18px, 20px, 24px, 32px, 48px, 64px)
  - Copyable Tailwind / CSS snippet (e.g. `fontSize: '1.25rem'`).

---

## 4. Writing & Marketing: Casing & Metrics
*Reference Sites: ConvertCase.net, WordCounter.net*

### A. Multi-Style Case Converter
- **Inputs:**
  - Raw text string
- **Outputs:**
  - `camelCase`
  - `PascalCase`
  - `kebab-case`
  - `snake_case`
  - `CONSTANT_CASE`
  - `Title Case` (preserves lower-case for minor words like *a, an, and, the, in, of* unless leading)
  - `Sentence case`

### B. Word, Character & Reading Time Counter
- **Inputs:**
  - Raw text
- **Outputs:**
  - Word count, Character count (with & without spaces)
  - Sentence count, Paragraph count
  - Estimated Reading Time (based on 200 words/min)
  - Estimated Speaking Time (based on 130 words/min)

---

## 5. Dev & Data: Timestamp & JSON
*Reference Sites: EpochConverter.com, IT-Tools.tech, transform.tools*

### A. Unix Epoch Timestamp Converter
- **Inputs:**
  - Unix Timestamp (seconds or milliseconds) or Date string / ISO string
  - Current Time button ("Now")
- **Outputs:**
  - UTC ISO-8601 string (`YYYY-MM-DDTHH:mm:ss.sssZ`)
  - Local Datetime string
  - Relative time ("3 hours ago", "in 2 days")
  - Day of week, Day of year

### B. JSON Formatter, Validator & Fixer
- **Inputs:**
  - Raw or broken JSON text
- **Outputs:**
  - Formatted JSON (2-space, 4-space, or minified)
  - Syntax error line and column indicators
  - Auto-fix button: cleans single quotes to double quotes, strips trailing commas, handles unquoted keys.
