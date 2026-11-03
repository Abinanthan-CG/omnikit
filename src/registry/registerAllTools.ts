import { registerTool } from './registry';

// Existing Views
import { TimecodeView } from '../views/video/TimecodeView';
import { AspectRatioView } from '../views/video/AspectRatioView';
import { BpmView } from '../views/audio/BpmView';
import { ContrastView } from '../views/design/ContrastView';
import { PxRemView } from '../views/design/PxRemView';
import { CaseConverterView } from '../views/writing/CaseConverterView';
import { WordMetricsView } from '../views/writing/WordMetricsView';
import { TimestampView } from '../views/dev/TimestampView';
import { JsonView } from '../views/dev/JsonView';

// Expansion Views
import { Base64View } from '../views/dev/Base64View';
import { UrlView } from '../views/dev/UrlView';
import { HashView } from '../views/dev/HashView';
import { UuidView } from '../views/dev/UuidView';
import { HtmlEntityView } from '../views/dev/HtmlEntityView';
import { ColorConverterView } from '../views/design/ColorConverterView';
import { SvgView } from '../views/design/SvgView';
import { BoxShadowView } from '../views/design/BoxShadowView';
import { TextDiffView } from '../views/writing/TextDiffView';
import { MarkdownPreviewView } from '../views/writing/MarkdownPreviewView';
import { LineSorterView } from '../views/writing/LineSorterView';
import { NoteFrequencyView } from '../views/audio/NoteFrequencyView';
import { TapTempoView } from '../views/audio/TapTempoView';
import { BitrateView } from '../views/video/BitrateView';
import { SafeAreaView } from '../views/video/SafeAreaView';
import { FpsConverterView } from '../views/video/FpsConverterView';

export function initializeTools(): void {
  // ==========================================
  // Video & Media (5 tools)
  // ==========================================
  registerTool({
    id: 'timecode',
    title: 'SMPTE Timecode Calculator',
    description: 'Add or subtract video timecodes with drop-frame and non-drop-frame calculations',
    category: 'video',
    tags: ['timecode', 'smpte', 'fps', 'frame', 'premiere', 'davinci', 'video', 'film'],
    keywords: ['23.976', '24fps', '29.97', 'drop frame', 'calculator', 'duration'],
    component: TimecodeView,
    icon: '🎬',
  });

  registerTool({
    id: 'aspect-ratio',
    title: 'Aspect Ratio & Letterbox Calculator',
    description: 'Compute simplified aspect ratios, decimal scales, and pillarbox/letterbox padding',
    category: 'video',
    tags: ['aspect', 'ratio', 'resolution', 'letterbox', 'pillarbox', 'dimensions', 'video', 'image'],
    keywords: ['16:9', '9:16', '4:3', '21:9', '2.39:1', 'crop', 'fit', 'padding'],
    component: AspectRatioView,
    icon: '📐',
  });

  registerTool({
    id: 'bitrate',
    title: 'Video Bitrate & Storage Estimator',
    description: 'Estimate render file sizes and calculate required bitrates to meet upload limits',
    category: 'video',
    tags: ['video', 'bitrate', 'filesize', 'mb', 'gb', 'calculator', 'render', 'discord', 'storage'],
    keywords: ['megabytes', 'kbps', 'upload limit', 'discord 25mb', 'encode'],
    component: BitrateView,
    icon: '💾',
  });

  registerTool({
    id: 'safe-area',
    title: 'Video Safe Area Overlay Guide',
    description: 'Calculate broadcast SMPTE Action Safe (90%), Title Safe (80%), and social UI exclusions',
    category: 'video',
    tags: ['video', 'safe area', 'action safe', 'title safe', 'broadcast', 'tiktok', 'reels', 'margins'],
    keywords: ['smpte', '9:16', '16:9', 'overlays', 'subtitles', 'graphics'],
    component: SafeAreaView,
    icon: '📺',
  });

  registerTool({
    id: 'fps-converter',
    title: 'Video Frame Rate Speed Converter',
    description: 'Calculate frame scaling, PAL/NTSC speedup, and timing changes when converting framerates',
    category: 'video',
    tags: ['fps', 'framerate', 'speedup', 'slowdown', 'conform', 'pal', 'ntsc', '24fps', '60fps'],
    keywords: ['frames', 'speed change', 'playback', '23.976', '59.94'],
    component: FpsConverterView,
    icon: '🎞️',
  });

  // ==========================================
  // Audio & Music (3 tools)
  // ==========================================
  registerTool({
    id: 'bpm-delay',
    title: 'BPM Delay & Reverb Sync',
    description: 'Convert song tempo into exact note delay milliseconds and synced reverb decay times',
    category: 'audio',
    tags: ['audio', 'music', 'bpm', 'tempo', 'delay', 'reverb', 'ms', 'sound', 'daw'],
    keywords: ['quarter note', 'dotted', 'triplet', 'pre-delay', 'decay', 'sync'],
    component: BpmView,
    icon: '🎵',
  });

  registerTool({
    id: 'note-frequency',
    title: 'Musical Note to Frequency (Hz)',
    description: 'Convert between musical notes, MIDI numbers, and frequencies with custom A4 tuning',
    category: 'audio',
    tags: ['note', 'frequency', 'pitch', 'hz', 'midi', 'tuning', 'a4', '432hz', '440hz', 'audio'],
    keywords: ['c4', 'middle c', 'cents', 'cents deviation', 'scales', 'synth'],
    component: NoteFrequencyView,
    icon: '🎹',
  });

  registerTool({
    id: 'tap-tempo',
    title: 'Tap Tempo BPM Detector',
    description: 'Tap repeatedly to discover accurate musical tempos in Beats Per Minute',
    category: 'audio',
    tags: ['tempo', 'tap tempo', 'bpm', 'metronome', 'timing', 'audio', 'music'],
    keywords: ['beats per minute', 'rhythm', 'speed', 'detector'],
    component: TapTempoView,
    icon: '🥁',
  });

  // ==========================================
  // Design & UI (5 tools)
  // ==========================================
  registerTool({
    id: 'contrast',
    title: 'WCAG Color Contrast Checker',
    description: 'Calculate contrast ratios and test WCAG 2.1 Level AA and AAA compliance',
    category: 'design',
    tags: ['color', 'contrast', 'wcag', 'accessibility', 'a11y', 'design', 'palette', 'ui'],
    keywords: ['ratio', 'luminance', 'aa', 'aaa', 'hex', 'color picker'],
    component: ContrastView,
    icon: '🎨',
  });

  registerTool({
    id: 'px-rem',
    title: 'PX to REM Converter',
    description: 'Convert pixel measurements to CSS relative REM units with typography reference tables',
    category: 'design',
    tags: ['px', 'rem', 'css', 'typography', 'units', 'font', 'converter', 'design', 'tailwind'],
    keywords: ['pixels', 'rem', 'root font size', 'scale', '16px'],
    component: PxRemView,
    icon: '📏',
  });

  registerTool({
    id: 'color-converter',
    title: 'Color Format Converter',
    description: 'Convert between HEX, RGB, HSL color spaces with live preview and CSS tokens',
    category: 'design',
    tags: ['color', 'hex', 'rgb', 'hsl', 'converter', 'css', 'design', 'palette'],
    keywords: ['alpha', 'rgba', 'hsla', 'tokens', 'swatch'],
    component: ColorConverterView,
    icon: '🌈',
  });

  registerTool({
    id: 'svg-tools',
    title: 'SVG to Data-URI & React JSX',
    description: 'Clean SVGs, generate CSS Data URIs, and convert vectors into typed React JSX components',
    category: 'design',
    tags: ['svg', 'data-uri', 'react', 'jsx', 'vector', 'icons', 'css', 'design'],
    keywords: ['clean svg', 'inline svg', 'component', 'icon component'],
    component: SvgView,
    icon: '📐',
  });

  registerTool({
    id: 'box-shadow',
    title: 'CSS Box Shadow Generator',
    description: 'Design multi-layered smooth box shadows with live preview card and copyable CSS',
    category: 'design',
    tags: ['box shadow', 'shadow', 'css', 'elevation', 'card', 'tailwind', 'design'],
    keywords: ['blur', 'spread', 'inset', 'multi-layer', 'ui elevation'],
    component: BoxShadowView,
    icon: '📦',
  });

  // ==========================================
  // Writing & Copy (5 tools)
  // ==========================================
  registerTool({
    id: 'case-converter',
    title: 'Multi-Style Case Converter',
    description: 'Instantly convert copy, headings, and code between 9 standard casing conventions',
    category: 'writing',
    tags: ['case', 'text', 'camel', 'kebab', 'snake', 'constant', 'title', 'sentence', 'copy'],
    keywords: ['camelCase', 'PascalCase', 'kebab-case', 'snake_case', 'CONSTANT_CASE', 'title case'],
    component: CaseConverterView,
    icon: '✍️',
  });

  registerTool({
    id: 'word-metrics',
    title: 'Word, Character & Reading Metrics',
    description: 'Calculate real-time word counts, character lengths, sentence structures, and reading times',
    category: 'writing',
    tags: ['word', 'character', 'reading time', 'speaking time', 'metrics', 'sentences', 'count', 'copy'],
    keywords: ['wpm', 'words', 'characters', 'letters', 'length', 'analysis'],
    component: WordMetricsView,
    icon: '📊',
  });

  registerTool({
    id: 'text-diff',
    title: 'Side-by-Side Text Diff Checker',
    description: 'Compare two text blocks to instantly detect additions, deletions, and modifications',
    category: 'writing',
    tags: ['diff', 'compare', 'text diff', 'changes', 'revisions', 'copy', 'writing'],
    keywords: ['added', 'removed', 'side by side', 'comparison', 'version check'],
    component: TextDiffView,
    icon: '🔍',
  });

  registerTool({
    id: 'markdown-preview',
    title: 'Markdown Live Preview',
    description: 'Write Markdown notes with side-by-side formatted live preview and instant export',
    category: 'writing',
    tags: ['markdown', 'preview', 'editor', 'notes', 'docs', 'html', 'writing'],
    keywords: ['md', 'cheat sheet', 'formatting', 'live editor'],
    component: MarkdownPreviewView,
    icon: '📝',
  });

  registerTool({
    id: 'line-sorter',
    title: 'Line Sorter & Deduplicator',
    description: 'Alphabetize, sort by length, remove duplicate items, and strip empty lines',
    category: 'writing',
    tags: ['sort', 'lines', 'alphabetize', 'deduplicate', 'unique', 'clean list', 'writing'],
    keywords: ['a-z', 'z-a', 'length', 'remove duplicates', 'blank lines'],
    component: LineSorterView,
    icon: '📑',
  });

  // ==========================================
  // Dev & Data (7 tools)
  // ==========================================
  registerTool({
    id: 'timestamp',
    title: 'Unix Epoch & Timestamp Converter',
    description: 'Convert Unix timestamps into UTC, local human-readable time, and relative dates',
    category: 'dev',
    tags: ['timestamp', 'epoch', 'unix', 'time', 'date', 'utc', 'iso', 'dev'],
    keywords: ['epoch', 'milliseconds', 'seconds', 'iso8601', 'relative time', 'now'],
    component: TimestampView,
    icon: '⏱️',
  });

  registerTool({
    id: 'json-tools',
    title: 'JSON Formatter & Auto-Fixer',
    description: 'Format, validate, minify, and automatically repair common syntax mistakes',
    category: 'dev',
    tags: ['json', 'formatter', 'validator', 'fixer', 'minify', 'repair', 'data', 'dev'],
    keywords: ['syntax error', 'trailing comma', 'single quotes', 'beautify', 'clean'],
    component: JsonView,
    icon: '⚙️',
  });

  registerTool({
    id: 'base64',
    title: 'Base64 String Converter',
    description: 'Encode and decode text to and from Base64 with standard or URL-safe encoding',
    category: 'dev',
    tags: ['base64', 'encode', 'decode', 'btoa', 'atob', 'url-safe', 'data', 'dev'],
    keywords: ['binary', 'ascii', 'payload', 'base64url'],
    component: Base64View,
    icon: '🔐',
  });

  registerTool({
    id: 'url-tools',
    title: 'URL Encoder & Decoder',
    description: 'Encode and decode query strings, parse parameters, and format clean URI components',
    category: 'dev',
    tags: ['url', 'uri', 'encode', 'decode', 'query', 'params', 'query string', 'dev'],
    keywords: ['encodeURIComponent', 'url params', 'search query'],
    component: UrlView,
    icon: '🔗',
  });

  registerTool({
    id: 'hash-generator',
    title: 'Cryptographic Hash Generator',
    description: 'Compute client-side cryptographic digests (SHA-256, MD5, SHA-1, SHA-512) via Web Crypto',
    category: 'dev',
    tags: ['hash', 'sha256', 'sha512', 'md5', 'sha1', 'crypto', 'digest', 'checksum', 'dev'],
    keywords: ['cryptography', 'security', 'fingerprint', 'web crypto'],
    component: HashView,
    icon: '#️⃣',
  });

  registerTool({
    id: 'uuid-generator',
    title: 'UUID v4 Generator',
    description: 'Generate cryptographically random UUIDs (version 4) individually or in bulk',
    category: 'dev',
    tags: ['uuid', 'guid', 'v4', 'random', 'id', 'generator', 'bulk', 'dev'],
    keywords: ['unique identifier', 'hyphens', 'uppercase', 'rfc4122'],
    component: UuidView,
    icon: '🎲',
  });

  registerTool({
    id: 'html-entities',
    title: 'HTML Entities Encoder & Decoder',
    description: 'Safely escape text for HTML markup or restore entities to raw characters',
    category: 'dev',
    tags: ['html', 'entities', 'escape', 'unescape', 'xss', 'markup', 'special characters', 'dev'],
    keywords: ['&amp;', '&lt;', '&gt;', '&quot;', 'xml', 'escape'],
    component: HtmlEntityView,
    icon: '🏷️',
  });
}
