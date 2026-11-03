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

// Expansion Views (Batch 1, 2, 3, 4)
import { Base64View } from '../views/dev/Base64View';
import { UrlView } from '../views/dev/UrlView';
import { HashView } from '../views/dev/HashView';
import { UuidView } from '../views/dev/UuidView';
import { HtmlEntityView } from '../views/dev/HtmlEntityView';
import { ChmodView } from '../views/dev/ChmodView';
import { CronView } from '../views/dev/CronView';
import { JwtView } from '../views/dev/JwtView';
import { QrView } from '../views/dev/QrView';
import { CurlView } from '../views/dev/CurlView';
import { DockerView } from '../views/dev/DockerView';
import { XmlView } from '../views/dev/XmlView';
import { YamlView } from '../views/dev/YamlView';
import { ByteView } from '../views/dev/ByteView';
import { SqlView } from '../views/dev/SqlView';
import { UaView } from '../views/dev/UaView';
import { AsciiView } from '../views/dev/AsciiView';
import { RegexView } from '../views/dev/RegexView';

import { ColorConverterView } from '../views/design/ColorConverterView';
import { SvgView } from '../views/design/SvgView';
import { BoxShadowView } from '../views/design/BoxShadowView';
import { GradientView } from '../views/design/GradientView';
import { TriangleView } from '../views/design/TriangleView';
import { KeycodeView } from '../views/design/KeycodeView';
import { GlassmorphismView } from '../views/design/GlassmorphismView';
import { PaletteView } from '../views/design/PaletteView';
import { CursorView } from '../views/design/CursorView';
import { ClampView } from '../views/design/ClampView';
import { AspectRatioCssView } from '../views/design/AspectRatioCssView';

import { TextDiffView } from '../views/writing/TextDiffView';
import { MarkdownPreviewView } from '../views/writing/MarkdownPreviewView';
import { LineSorterView } from '../views/writing/LineSorterView';
import { LoremView } from '../views/writing/LoremView';
import { SlugView } from '../views/writing/SlugView';
import { TextAnalysisView } from '../views/writing/TextAnalysisView';
import { TableView } from '../views/writing/TableView';
import { ReadabilityView } from '../views/writing/ReadabilityView';

import { NoteFrequencyView } from '../views/audio/NoteFrequencyView';
import { TapTempoView } from '../views/audio/TapTempoView';
import { TransposerView } from '../views/audio/TransposerView';

import { ShutterView } from '../views/video/ShutterView';
import { RecordTimeView } from '../views/video/RecordTimeView';

import { BitrateView } from '../views/video/BitrateView';
import { SafeAreaView } from '../views/video/SafeAreaView';
import { FpsConverterView } from '../views/video/FpsConverterView';
import { FocalView } from '../views/video/FocalView';

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

  // ==========================================
  // Batch 2 Additions (10 tools -> 35 total)
  // ==========================================
  registerTool({
    id: 'chmod-calculator',
    title: 'Linux Chmod Permissions Calculator',
    description: 'Calculate file permissions between octal (755, 644) and symbolic (rwxr-xr-x) notations',
    category: 'dev',
    tags: ['chmod', 'permissions', 'linux', 'unix', 'terminal', 'octal', 'symbolic', 'dev'],
    keywords: ['755', '644', 'rwx', 'owner', 'group', 'security'],
    component: ChmodView,
    icon: '🛡️',
  });

  registerTool({
    id: 'cron-humanizer',
    title: 'Crontab Humanizer & Explainer',
    description: 'Translate cryptic cron schedules into human English and explore common presets',
    category: 'dev',
    tags: ['cron', 'crontab', 'schedule', 'timer', 'automation', 'dev', 'sysadmin'],
    keywords: ['crontab', 'schedule', 'interval', 'minutes', 'hours'],
    component: CronView,
    icon: '⏰',
  });

  registerTool({
    id: 'jwt-decoder',
    title: 'JWT Token Inspector',
    description: 'Inspect JWT headers and claims safely client-side without sending tokens to any server',
    category: 'dev',
    tags: ['jwt', 'token', 'auth', 'oauth', 'bearer', 'decode', 'claims', 'dev'],
    keywords: ['json web token', 'payload', 'header', 'expiration'],
    component: JwtView,
    icon: '🎫',
  });

  registerTool({
    id: 'qr-code',
    title: 'QR Code Generator',
    description: 'Create clean, scannable vector QR codes client-side for links, text, and keys',
    category: 'dev',
    tags: ['qr', 'qrcode', 'matrix', 'barcode', 'generator', 'svg', 'scan', 'dev', 'design'],
    keywords: ['qr code', 'svg qr', 'scanner', 'share link'],
    component: QrView,
    icon: '📱',
  });

  registerTool({
    id: 'css-gradient',
    title: 'CSS Gradient Generator',
    description: 'Design smooth linear and radial CSS gradients with live preview and code export',
    category: 'design',
    tags: ['gradient', 'css', 'linear', 'radial', 'color', 'background', 'design'],
    keywords: ['linear-gradient', 'radial-gradient', 'color stops', 'tailwind'],
    component: GradientView,
    icon: '🌈',
  });

  registerTool({
    id: 'css-triangle',
    title: 'CSS Triangle Generator',
    description: 'Create pure CSS border triangles in any direction with zero extra markup',
    category: 'design',
    tags: ['triangle', 'css', 'borders', 'arrows', 'shapes', 'design'],
    keywords: ['css triangle', 'tooltip arrow', 'pointer'],
    component: TriangleView,
    icon: '🔺',
  });

  registerTool({
    id: 'keycode-info',
    title: 'Keyboard Keycode Inspector',
    description: 'Press any key on your keyboard to inspect JavaScript keycodes and event properties',
    category: 'design',
    tags: ['keycode', 'keyboard', 'event', 'key', 'code', 'which', 'shortcut', 'dev', 'design'],
    keywords: ['event.keyCode', 'event.key', 'event.which', 'keypress'],
    component: KeycodeView,
    icon: '⌨️',
  });

  registerTool({
    id: 'lorem-ipsum',
    title: 'Lorem Ipsum Copy Generator',
    description: 'Generate placeholder text by paragraphs, sentences, or words with single-click copy',
    category: 'writing',
    tags: ['lorem', 'ipsum', 'placeholder', 'dummy text', 'copy', 'mockup', 'writing'],
    keywords: ['dummy copy', 'filler text', 'paragraphs', 'sentences'],
    component: LoremView,
    icon: '📄',
  });

  registerTool({
    id: 'slugifier',
    title: 'URL Slug & Filename Normalizer',
    description: 'Clean titles and article names into web-standard slugs by removing special chars and accents',
    category: 'writing',
    tags: ['slug', 'url', 'filename', 'clean', 'seo', 'normalize', 'writing'],
    keywords: ['slugify', 'kebab', 'url safe', 'seo friendly'],
    component: SlugView,
    icon: '🏷️',
  });

  registerTool({
    id: 'focal-length',
    title: 'Camera Lens & Crop Factor Calculator',
    description: 'Calculate 35mm equivalent focal lengths and horizontal/vertical field of view',
    category: 'video',
    tags: ['focal length', 'lens', 'crop factor', 'camera', 'sensor', 'fov', 'video', 'film'],
    keywords: ['35mm equivalent', 'full frame', 'aps-c', 'super 35', 'mft'],
    component: FocalView,
    icon: '📷',
  });

  // ==========================================
  // Batch 3 Registrations (Tools 36 - 45)
  // ==========================================
  registerTool({
    id: 'curl-to-code',
    title: 'cURL Command to Code Converter',
    description: 'Parse raw curl commands into executable JavaScript fetch, Node.js, and Python requests snippets',
    category: 'dev',
    tags: ['curl', 'fetch', 'python', 'requests', 'http', 'api', 'dev', 'code'],
    keywords: ['curl to fetch', 'curl to python', 'http request', 'api call'],
    component: CurlView,
    icon: '🌐',
  });

  registerTool({
    id: 'docker-compose-converter',
    title: 'Docker Run to Compose Converter',
    description: 'Convert single docker run commands into multi-service docker-compose.yml specifications',
    category: 'dev',
    tags: ['docker', 'compose', 'container', 'devops', 'yaml', 'ports', 'volumes', 'dev'],
    keywords: ['docker run', 'docker-compose', 'container orchestration'],
    component: DockerView,
    icon: '🐳',
  });

  registerTool({
    id: 'xml-formatter',
    title: 'XML Formatter & Minifier',
    description: 'Beautify indentation or collapse XML feeds, sitemaps, and payloads into minified single lines',
    category: 'dev',
    tags: ['xml', 'format', 'beautify', 'minify', 'sitemap', 'rss', 'dev'],
    keywords: ['xml prettifier', 'xml indent', 'clean xml'],
    component: XmlView,
    icon: '📰',
  });

  registerTool({
    id: 'yaml-json',
    title: 'YAML ↔ JSON Bidirectional Converter',
    description: 'Convert between YAML manifests and JSON data with syntax formatting and error detection',
    category: 'dev',
    tags: ['yaml', 'json', 'convert', 'parser', 'kubernetes', 'config', 'dev'],
    keywords: ['yaml to json', 'json to yaml', 'k8s yaml'],
    component: YamlView,
    icon: '🔄',
  });

  registerTool({
    id: 'byte-converter',
    title: 'Data Storage & Byte Unit Converter',
    description: 'Convert data amounts between Bytes, KB, MB, GB, TB, and binary kibibytes (KiB, MiB, GiB)',
    category: 'dev',
    tags: ['byte', 'megabyte', 'gigabyte', 'storage', 'data', 'kib', 'mib', 'dev'],
    keywords: ['byte converter', 'mb to gb', 'binary prefix', 'storage calculation'],
    component: ByteView,
    icon: '💾',
  });

  registerTool({
    id: 'glassmorphism',
    title: 'CSS Glassmorphism Generator',
    description: 'Design modern frosted glass UI cards with backdrop blur, opacity, shadows, and copyable CSS',
    category: 'design',
    tags: ['glassmorphism', 'backdrop-filter', 'blur', 'css', 'card', 'frosted', 'design'],
    keywords: ['glass ui', 'frosted glass', 'translucent card', 'css backdrop'],
    component: GlassmorphismView,
    icon: '🧊',
  });

  registerTool({
    id: 'color-shades',
    title: 'Color Tint & Shade Palette Generator',
    description: 'Generate complete 50-950 Tailwind-style color step scales from any base hex color',
    category: 'design',
    tags: ['palette', 'tint', 'shade', 'tailwind', '50-950', 'color scale', 'design'],
    keywords: ['tailwind colors', 'tints and shades', 'color steps', 'palette generator'],
    component: PaletteView,
    icon: '🎨',
  });

  registerTool({
    id: 'css-cursor',
    title: 'CSS Cursor Visualizer & Rule Generator',
    description: 'Browse, test, and copy standard CSS cursor properties with live interactive pointer feedback',
    category: 'design',
    tags: ['cursor', 'pointer', 'css', 'hover', 'ui', 'feedback', 'design'],
    keywords: ['cursor pointer', 'grab', 'not-allowed', 'cursor style'],
    component: CursorView,
    icon: '👆',
  });

  registerTool({
    id: 'keyword-density',
    title: 'Keyword Density & Frequency Analyzer',
    description: 'Analyze word frequency counts, percentage densities, and SEO occurrence metrics in text',
    category: 'writing',
    tags: ['keyword', 'density', 'frequency', 'seo', 'content', 'word count', 'writing'],
    keywords: ['seo keywords', 'word frequency', 'top words', 'density checker'],
    component: TextAnalysisView,
    icon: '📊',
  });

  registerTool({
    id: 'audio-transposer',
    title: 'Pitch Shift & Tape Speed Transposer',
    description: 'Calculate pitch shift ratios, semitone alterations, cent tuning, and tape speed factors',
    category: 'audio',
    tags: ['pitch', 'transpose', 'semitones', 'cents', 'tape speed', 'varispeed', 'audio', 'music'],
    keywords: ['pitch transposer', 'tape speed', 'playback rate', 'audio pitch'],
    component: TransposerView,
    icon: '🎚️',
  });

  // ==========================================
  // Batch 4 Registrations (Tools 46 - 55)
  // ==========================================
  registerTool({
    id: 'sql-formatter',
    title: 'SQL Formatter & Beautifier',
    description: 'Format and indent raw SQL queries with syntax structure and uppercase clause keywords',
    category: 'dev',
    tags: ['sql', 'format', 'beautify', 'database', 'query', 'mysql', 'postgres', 'dev'],
    keywords: ['sql prettifier', 'sql indent', 'format sql query'],
    component: SqlView,
    icon: '🗄️',
  });

  registerTool({
    id: 'user-agent-parser',
    title: 'User Agent Inspector & Parser',
    description: 'Inspect your active browser User Agent or parse arbitrary client strings into structured properties',
    category: 'dev',
    tags: ['user agent', 'browser', 'os', 'device', 'navigator', 'client', 'dev'],
    keywords: ['ua parser', 'browser detection', 'device info', 'navigator.userAgent'],
    component: UaView,
    icon: '🕵️',
  });

  registerTool({
    id: 'ascii-banner',
    title: 'ASCII Text Banner Generator',
    description: 'Generate retro ASCII block banners and typography headers for terminal scripts and code comments',
    category: 'dev',
    tags: ['ascii', 'banner', 'figlet', 'terminal', 'retro', 'text art', 'dev'],
    keywords: ['ascii art', 'text banner', 'block letters', 'cli header'],
    component: AsciiView,
    icon: '🔤',
  });

  registerTool({
    id: 'regex-tester',
    title: 'RegEx Match Tester & Groups',
    description: 'Test Regular Expressions in real-time with capture group extraction, flags, and match indices',
    category: 'dev',
    tags: ['regex', 'regexp', 'regular expression', 'test', 'pattern', 'match', 'dev'],
    keywords: ['regex tester', 'regex match', 'capture groups', 'regexp flags'],
    component: RegexView,
    icon: '🔍',
  });

  registerTool({
    id: 'clamp-calculator',
    title: 'CSS Clamp() Fluid Typography Calculator',
    description: 'Calculate fluid clamp() formulas for responsive typography and spacing across any viewport range',
    category: 'design',
    tags: ['clamp', 'css', 'fluid', 'typography', 'responsive', 'vw', 'rem', 'design'],
    keywords: ['css clamp', 'fluid type', 'responsive font size', 'viewport math'],
    component: ClampView,
    icon: '📐',
  });

  registerTool({
    id: 'aspect-ratio-css',
    title: 'CSS Aspect-Ratio Rule Generator',
    description: 'Generate modern CSS aspect-ratio properties and legacy padding-top container hack snippets',
    category: 'design',
    tags: ['aspect ratio', 'css', 'container', 'responsive', 'padding-top', 'tailwind', 'design'],
    keywords: ['aspect-ratio', 'padding hack', 'responsive box', 'video ratio'],
    component: AspectRatioCssView,
    icon: '📐',
  });

  registerTool({
    id: 'markdown-table',
    title: 'Markdown Table Generator & Editor',
    description: 'Design interactive tabular data with custom alignments and copy clean GitHub Flavored Markdown',
    category: 'writing',
    tags: ['markdown', 'table', 'gfm', 'grid', 'columns', 'rows', 'alignment', 'writing'],
    keywords: ['markdown table', 'table generator', 'github table', 'ascii table'],
    component: TableView,
    icon: '📊',
  });

  registerTool({
    id: 'readability-score',
    title: 'Flesch Readability & Grade Level',
    description: 'Evaluate reading ease, Flesch-Kincaid school grade level, and average sentence complexity metrics',
    category: 'writing',
    tags: ['readability', 'flesch', 'kincaid', 'grade level', 'syllables', 'ease', 'writing'],
    keywords: ['flesch reading ease', 'grade level', 'reading score', 'text complexity'],
    component: ReadabilityView,
    icon: '📖',
  });

  registerTool({
    id: 'shutter-calculator',
    title: 'Shutter Speed & Shutter Angle (180° Rule)',
    description: 'Calculate cinema shutter speed fractions from rotary shutter angles and framerates',
    category: 'video',
    tags: ['shutter', 'speed', 'angle', '180 degree', 'motion blur', 'cinema', 'camera', 'video', 'film'],
    keywords: ['180 degree rule', 'shutter angle', 'exposure time', 'cinematography'],
    component: ShutterView,
    icon: '⏱️',
  });

  registerTool({
    id: 'record-time-estimator',
    title: 'Video Recording Time & Storage Estimator',
    description: 'Calculate how many hours and minutes of footage can record onto your SD card, CFexpress, or SSD',
    category: 'video',
    tags: ['recording time', 'storage', 'sd card', 'ssd', 'prores', 'raw', 'bitrate', 'video', 'film'],
    keywords: ['record time', 'card capacity', 'video storage', 'prores recording'],
    component: RecordTimeView,
    icon: '📼',
  });
}
