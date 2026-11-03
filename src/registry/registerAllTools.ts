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

// Expansion Views (Batch 1, 2, 3, 4, 5, 6, 7)
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
import { BasicAuthView } from '../views/dev/BasicAuthView';
import { MdHtmlView } from '../views/dev/MdHtmlView';
import { BinaryView } from '../views/dev/BinaryView';
import { HexView } from '../views/dev/HexView';
import { SubnetView } from '../views/dev/SubnetView';
import { MacView } from '../views/dev/MacView';
import { PasswordView } from '../views/dev/PasswordView';
import { CsvView } from '../views/dev/CsvView';
import { PortView } from '../views/dev/PortView';
import { HttpStatusView } from '../views/dev/HttpStatusView';
import { SchemaView } from '../views/dev/SchemaView';
import { GitView } from '../views/dev/GitView';

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
import { BorderRadiusView } from '../views/design/BorderRadiusView';
import { BezierView } from '../views/design/BezierView';
import { ClipPathView } from '../views/design/ClipPathView';
import { TransformView } from '../views/design/TransformView';
import { FilterView } from '../views/design/FilterView';
import { FlexboxView } from '../views/design/FlexboxView';

import { TextDiffView } from '../views/writing/TextDiffView';
import { MarkdownPreviewView } from '../views/writing/MarkdownPreviewView';
import { LineSorterView } from '../views/writing/LineSorterView';
import { LoremView } from '../views/writing/LoremView';
import { SlugView } from '../views/writing/SlugView';
import { TextAnalysisView } from '../views/writing/TextAnalysisView';
import { TableView } from '../views/writing/TableView';
import { ReadabilityView } from '../views/writing/ReadabilityView';
import { AltCaseView } from '../views/writing/AltCaseView';
import { CipherView } from '../views/writing/CipherView';
import { TruncateView } from '../views/writing/TruncateView';
import { SymbolView } from '../views/writing/SymbolView';
import { WordCloudView } from '../views/writing/WordCloudView';
import { AffixView } from '../views/writing/AffixView';

import { NoteFrequencyView } from '../views/audio/NoteFrequencyView';
import { TapTempoView } from '../views/audio/TapTempoView';
import { TransposerView } from '../views/audio/TransposerView';
import { MetronomeView } from '../views/audio/MetronomeView';
import { DecibelView } from '../views/audio/DecibelView';
import { IntervalView } from '../views/audio/IntervalView';

import { ShutterView } from '../views/video/ShutterView';
import { RecordTimeView } from '../views/video/RecordTimeView';
import { TimelapseView } from '../views/video/TimelapseView';
import { SunView } from '../views/video/SunView';
import { AovView } from '../views/video/AovView';

import { BitrateView } from '../views/video/BitrateView';
import { SafeAreaView } from '../views/video/SafeAreaView';
import { FpsConverterView } from '../views/video/FpsConverterView';
import { FocalView } from '../views/video/FocalView';

import { MimeView } from '../views/dev/MimeView';
import { MinifyView } from '../views/dev/MinifyView';
import { ColorSnifferView } from '../views/dev/ColorSnifferView';
import { NanoidView } from '../views/dev/NanoidView';

import { TextShadowView } from '../views/design/TextShadowView';
import { UnitsView } from '../views/design/UnitsView';

import { CharStatsView } from '../views/writing/CharStatsView';
import { ZeroWidthView } from '../views/writing/ZeroWidthView';

import { SynthView } from '../views/audio/SynthView';

import { ResScaleView } from '../views/video/ResScaleView';

import { Ipv6View } from '../views/dev/Ipv6View';
import { RadixView } from '../views/dev/RadixView';
import { JsonToTsView } from '../views/dev/JsonToTsView';
import { HtmlSanitizeView } from '../views/dev/HtmlSanitizeView';

import { GoldenRatioView } from '../views/design/GoldenRatioView';
import { BoxSizingView } from '../views/design/BoxSizingView';

import { NatoView } from '../views/writing/NatoView';
import { FootnoteView } from '../views/writing/FootnoteView';

import { BpmHzView } from '../views/audio/BpmHzView';

import { LetterboxView } from '../views/video/LetterboxView';

import { EnvJsonView } from '../views/dev/EnvJsonView';
import { SemverView } from '../views/dev/SemverView';
import { SqlMinifyView } from '../views/dev/SqlMinifyView';
import { BitmaskView } from '../views/dev/BitmaskView';

import { GridView } from '../views/design/GridView';
import { RibbonView } from '../views/design/RibbonView';

import { MorseView } from '../views/writing/MorseView';
import { ZalgoView } from '../views/writing/ZalgoView';

import { SampleRateView } from '../views/audio/SampleRateView';

import { DofView } from '../views/video/DofView';

import { CorsView } from '../views/dev/CorsView';
import { HtaccessView } from '../views/dev/HtaccessView';
import { SvgCleanView } from '../views/dev/SvgCleanView';
import { UrlInspectView } from '../views/dev/UrlInspectView';

import { GlowCardView } from '../views/design/GlowCardView';
import { ColorBlindView } from '../views/design/ColorBlindView';

import { AnagramView } from '../views/writing/AnagramView';
import { RhymeView } from '../views/writing/RhymeView';

import { HeadroomView } from '../views/audio/HeadroomView';

import { LightingContrastView } from '../views/video/LightingContrastView';

import {
  DefangUrlTool,
  CidrCalculatorTool,
  HexDumpViewerTool,
  Base58Base32Tool,
  BcryptTool,
  UlidTool,
  DnsZoneTool,
  CurlBuilderTool,
  JsonDiffTool,
  SqlInsertJsonTool
} from '../components/tools/batch12Tools';

import {
  SrtVttTool,
  FfmpegGenTool,
  TimecodeDriftTool,
  SensorCropTool,
  AnamorphicDeSqueezeTool,
  ChromaSubsamplingTool,
  WhiteNoiseGenTool,
  DtmfDialerTool,
  MusicScalesTool,
  BinauralBeatsTool
} from '../components/tools/batch13Tools';

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

  // ==========================================
  // Batch 5 Registrations (Tools 56 - 65)
  // ==========================================
  registerTool({
    id: 'basic-auth',
    title: 'HTTP Basic Auth Generator & Decoder',
    description: 'Generate standard HTTP Authorization Basic header tokens or decode incoming authorization headers',
    category: 'dev',
    tags: ['basic auth', 'auth', 'http', 'authorization', 'header', 'credentials', 'dev'],
    keywords: ['basic auth generator', 'authorization basic', 'decode basic auth'],
    component: BasicAuthView,
    icon: '🔐',
  });

  registerTool({
    id: 'markdown-html',
    title: 'Markdown ↔ HTML Converter',
    description: 'Convert bidirectionally between Markdown content and clean HTML tags',
    category: 'dev',
    tags: ['markdown', 'html', 'converter', 'parser', 'content', 'web', 'dev'],
    keywords: ['markdown to html', 'html to markdown', 'md2html'],
    component: MdHtmlView,
    icon: '📄',
  });

  registerTool({
    id: 'binary-converter',
    title: 'Text ↔ Binary Byte Converter',
    description: 'Translate ASCII / UTF-8 strings to 8-bit binary strings and decode binary bytes back to readable text',
    category: 'dev',
    tags: ['binary', 'bytes', 'ascii', 'encoder', 'decoder', 'text', 'dev'],
    keywords: ['text to binary', 'binary to text', 'binary decoder'],
    component: BinaryView,
    icon: '🔢',
  });

  registerTool({
    id: 'hex-converter',
    title: 'Text ↔ Hex Byte String Converter',
    description: 'Convert text strings to hexadecimal byte representations and decode hex dumps back into clear UTF-8 text',
    category: 'dev',
    tags: ['hex', 'hexadecimal', 'bytes', 'encoding', 'dump', 'dev'],
    keywords: ['text to hex', 'hex to text', 'hex string'],
    component: HexView,
    icon: '🔣',
  });

  registerTool({
    id: 'border-radius-blob',
    title: 'CSS 8-Value Border Radius & Blob Generator',
    description: 'Design organic fluid blob shapes using advanced CSS 8-value border-radius properties',
    category: 'design',
    tags: ['border-radius', 'blob', 'css', 'organic', 'shapes', 'design'],
    keywords: ['8-value border radius', 'blob generator', 'fancy border radius'],
    component: BorderRadiusView,
    icon: '🫧',
  });

  registerTool({
    id: 'cubic-bezier',
    title: 'CSS Cubic-Bezier Easing Generator',
    description: 'Design custom transition timing functions and preview smooth animation physics',
    category: 'design',
    tags: ['cubic-bezier', 'easing', 'transition', 'animation', 'css', 'curve', 'design'],
    keywords: ['cubic bezier', 'ease curve', 'transition timing function'],
    component: BezierView,
    icon: '📈',
  });

  registerTool({
    id: 'alt-case',
    title: 'Alternating & Inverted Case Generator',
    description: 'Transform text into sarcastic meme aLtErNaTiNg cAsE, inverted case, or randomized casing',
    category: 'writing',
    tags: ['alternating case', 'sarcasm', 'meme', 'invert', 'case', 'mocking', 'writing'],
    keywords: ['sponge bob case', 'mocking case', 'invert case'],
    component: AltCaseView,
    icon: '🙃',
  });

  registerTool({
    id: 'caesar-cipher',
    title: 'Caesar & ROT13 Cipher Obfuscator',
    description: 'Encrypt or scramble text using historical Caesar shift ciphers and symmetrical ROT13 obfuscation',
    category: 'writing',
    tags: ['caesar', 'rot13', 'cipher', 'obfuscate', 'crypto', 'shift', 'writing'],
    keywords: ['caesar cipher', 'rot13', 'letter shift', 'secret message'],
    component: CipherView,
    icon: '🏛️',
  });

  registerTool({
    id: 'metronome',
    title: 'Precision Audio Metronome & Tempo Guide',
    description: 'Interactive tempo metronome with downbeat accents, customizable time signatures, and classical Italian markings',
    category: 'audio',
    tags: ['metronome', 'tempo', 'bpm', 'click', 'rhythm', 'beats', 'audio', 'music'],
    keywords: ['tempo clicker', 'metronome online', 'bpm guide'],
    component: MetronomeView,
    icon: '⏱️',
  });

  registerTool({
    id: 'timelapse-calculator',
    title: 'Timelapse Interval & Frame Calculator',
    description: 'Calculate photography shooting intervals, total frames, and storage space for smooth timelapse videos',
    category: 'video',
    tags: ['timelapse', 'intervalometer', 'frames', 'camera', 'interval', 'storage', 'video', 'film'],
    keywords: ['timelapse calculator', 'intervalometer interval', 'timelapse frames'],
    component: TimelapseView,
    icon: '⏳',
  });

  // ==========================================
  // Batch 6 Registrations (Tools 66 - 75)
  // ==========================================
  registerTool({
    id: 'subnet-calculator',
    title: 'IPv4 Subnet & CIDR Calculator',
    description: 'Calculate netmask, wildcard mask, broadcast address, and usable host ranges for any IPv4 CIDR block',
    category: 'dev',
    tags: ['subnet', 'cidr', 'ipv4', 'network', 'ip', 'netmask', 'broadcast', 'dev'],
    keywords: ['subnet mask', 'cidr calculator', 'ip range', 'usable hosts'],
    component: SubnetView,
    icon: '🌐',
  });

  registerTool({
    id: 'mac-formatter',
    title: 'MAC Address Generator & Formatter',
    description: 'Generate random unicast MAC addresses or convert notation between colon, hyphen, Cisco dot, and raw hex',
    category: 'dev',
    tags: ['mac', 'address', 'ethernet', 'hardware', 'cisco', 'format', 'dev'],
    keywords: ['mac address', 'mac generator', 'cisco mac format'],
    component: MacView,
    icon: '🏷️',
  });

  registerTool({
    id: 'password-generator',
    title: 'Secure Password & Secret Generator',
    description: 'Cryptographically secure random password generator using Web Crypto API with entropy scoring',
    category: 'dev',
    tags: ['password', 'generator', 'security', 'crypto', 'token', 'secret', 'dev'],
    keywords: ['random password', 'secure password', 'password entropy'],
    component: PasswordView,
    icon: '🔑',
  });

  registerTool({
    id: 'json-csv',
    title: 'JSON ↔ CSV Table Converter',
    description: 'Convert bidirectionally between JSON array objects and comma-separated CSV tabular data',
    category: 'dev',
    tags: ['json', 'csv', 'convert', 'table', 'spreadsheet', 'excel', 'dev'],
    keywords: ['json to csv', 'csv to json', 'export csv'],
    component: CsvView,
    icon: '📑',
  });

  registerTool({
    id: 'css-clip-path',
    title: 'CSS Clip-Path Polygon Generator',
    description: 'Design geometric UI mask polygons and cutouts with live vector shape preview',
    category: 'design',
    tags: ['clip-path', 'polygon', 'css', 'mask', 'geometry', 'shapes', 'design'],
    keywords: ['css clip path', 'polygon generator', 'shape mask'],
    component: ClipPathView,
    icon: '✂️',
  });

  registerTool({
    id: 'transform-matrix',
    title: 'CSS 2D Transform & Matrix Visualizer',
    description: 'Interactive 2D transforms (translate, rotate, scale, skew) with exact affine matrix() calculation',
    category: 'design',
    tags: ['transform', 'matrix', 'rotate', 'scale', 'skew', 'css', 'affine', 'design'],
    keywords: ['css transform', 'matrix 2d', 'transform visualizer'],
    component: TransformView,
    icon: '🔄',
  });

  registerTool({
    id: 'truncate-text',
    title: 'Text Truncation & Smart Ellipsis',
    description: 'Trim long text strings to precise character or word boundaries with custom ellipsis markers',
    category: 'writing',
    tags: ['truncate', 'ellipsis', 'shorten', 'text', 'word boundary', 'trim', 'writing'],
    keywords: ['truncate string', 'smart ellipsis', 'word truncate'],
    component: TruncateView,
    icon: '✂️',
  });

  registerTool({
    id: 'unicode-symbols',
    title: 'Unicode Symbol & Special Character Map',
    description: 'Quick lookup and single-click copy for typographical dashes, math symbols, currency, and tech keys',
    category: 'writing',
    tags: ['unicode', 'symbol', 'character', 'special', 'em dash', 'arrows', 'math', 'writing'],
    keywords: ['unicode map', 'special characters', 'copy symbols'],
    component: SymbolView,
    icon: '🔣',
  });

  registerTool({
    id: 'decibel-calculator',
    title: 'Audio Decibel (dB) & Gain Multiplier',
    description: 'Translate audio decibel gain (dB) to linear voltage amplitude multipliers and power ratios',
    category: 'audio',
    tags: ['decibel', 'db', 'gain', 'voltage', 'power', 'ratio', 'audio', 'sound'],
    keywords: ['db to ratio', 'audio gain', 'decibel multiplier'],
    component: DecibelView,
    icon: '🎚️',
  });

  registerTool({
    id: 'golden-hour',
    title: 'Golden Hour & Blue Hour Sun Calculator',
    description: 'Calculate morning and evening Golden Hour, Blue Hour, and solar noon for outdoor photography shoots',
    category: 'video',
    tags: ['golden hour', 'blue hour', 'sun', 'sunrise', 'sunset', 'photography', 'video', 'film'],
    keywords: ['golden hour calculator', 'blue hour', 'magic hour', 'solar noon'],
    component: SunView,
    icon: '🌅',
  });

  // ==========================================
  // Batch 7 Registrations (Tools 76 - 85)
  // ==========================================
  registerTool({
    id: 'port-lookup',
    title: 'TCP / UDP Port Directory & Lookup',
    description: 'Quick reference directory for standard IANA network ports, databases, and dev server sockets',
    category: 'dev',
    tags: ['port', 'tcp', 'udp', 'network', 'iana', 'service', 'socket', 'dev'],
    keywords: ['port lookup', 'common ports', 'network ports', 'port number'],
    component: PortView,
    icon: '🔌',
  });

  registerTool({
    id: 'http-status',
    title: 'HTTP Status Codes Explorer',
    description: 'Interactive directory of official RFC HTTP status response codes with descriptions and categories',
    category: 'dev',
    tags: ['http', 'status', 'codes', '200', '404', '500', 'rfc', 'network', 'dev'],
    keywords: ['http status codes', '404 not found', '500 server error', 'http response'],
    component: HttpStatusView,
    icon: '🌐',
  });

  registerTool({
    id: 'json-schema',
    title: 'JSON Schema Inferrer & Generator',
    description: 'Infer Draft-07 JSON Schema specifications including types, nested objects, and required fields from JSON',
    category: 'dev',
    tags: ['json', 'schema', 'infer', 'types', 'spec', 'generator', 'dev'],
    keywords: ['json schema', 'infer schema', 'json validator'],
    component: SchemaView,
    icon: '📐',
  });

  registerTool({
    id: 'git-cheat-sheet',
    title: 'Git Cheat Sheet & Command Generator',
    description: 'Quick reference and copyable commands for undoing commits, squashing, stashing, and safe force pushing',
    category: 'dev',
    tags: ['git', 'cheat sheet', 'vcs', 'commit', 'rebase', 'stash', 'undo', 'dev'],
    keywords: ['git undo commit', 'git cheat sheet', 'git commands'],
    component: GitView,
    icon: '🌿',
  });

  registerTool({
    id: 'css-filters',
    title: 'CSS Filter Effects Studio',
    description: 'Visual studio for CSS image filters (blur, contrast, grayscale, hue-rotate, sepia) with instant CSS snippets',
    category: 'design',
    tags: ['filter', 'blur', 'contrast', 'brightness', 'sepia', 'css', 'design'],
    keywords: ['css filter', 'image effects', 'css blur', 'filter playground'],
    component: FilterView,
    icon: '🪄',
  });

  registerTool({
    id: 'flexbox-studio',
    title: 'CSS Flexbox Layout Studio',
    description: 'Interactive flexbox layout playground generating standard CSS rules and Tailwind utility classes',
    category: 'design',
    tags: ['flexbox', 'flex', 'layout', 'justify', 'align', 'css', 'tailwind', 'design'],
    keywords: ['flexbox generator', 'css flex', 'flex layout', 'tailwind flex'],
    component: FlexboxView,
    icon: '📦',
  });

  registerTool({
    id: 'word-cloud',
    title: 'Word Cloud & Frequency Analyzer',
    description: 'Analyze key recurring themes and generate a visual proportional weighted word cloud from prose',
    category: 'writing',
    tags: ['word cloud', 'frequency', 'themes', 'analysis', 'weights', 'writing'],
    keywords: ['word cloud', 'term frequency', 'tag cloud'],
    component: WordCloudView,
    icon: '☁️',
  });

  registerTool({
    id: 'affix-tool',
    title: 'Batch Line Prefix & Suffix Tool',
    description: 'Batch prepend and append custom prefixes, suffixes, quotes, or sequential numbers to each line',
    category: 'writing',
    tags: ['prefix', 'suffix', 'affix', 'lines', 'batch', 'append', 'prepend', 'writing'],
    keywords: ['add prefix to lines', 'batch suffix', 'line numbers'],
    component: AffixView,
    icon: '🏷️',
  });

  registerTool({
    id: 'musical-intervals',
    title: 'Musical Interval & Chord Frequencies',
    description: 'Calculate exact frequencies and mathematical ratios for musical intervals and harmonic triads',
    category: 'audio',
    tags: ['intervals', 'chords', 'harmonics', 'triad', 'frequency', 'ratios', 'audio', 'music'],
    keywords: ['musical intervals', 'chord frequencies', 'harmonic ratios'],
    component: IntervalView,
    icon: '🎼',
  });

  registerTool({
    id: 'lens-aov',
    title: 'Camera Lens Angle of View (AoV) Geometry',
    description: 'Calculate horizontal, vertical, and diagonal field of view angles across cinema sensor standards',
    category: 'video',
    tags: ['aov', 'angle of view', 'fov', 'lens', 'focal length', 'sensor', 'cinema', 'video', 'film'],
    keywords: ['angle of view', 'lens fov', 'sensor aov', 'camera geometry'],
    component: AovView,
    icon: '📷',
  });

  // ==========================================
  // Batch 8 Tools (86-95)
  // ==========================================
  registerTool({
    id: 'mime-types',
    title: 'MIME Types & File Extensions Explorer',
    description: 'Search standard MIME content types by file extension or content-type header with charset info',
    category: 'dev',
    tags: ['mime', 'content-type', 'extension', 'headers', 'file types', 'dev', 'http'],
    keywords: ['mime type', 'extension lookup', 'content-type'],
    component: MimeView,
    icon: '📄',
  });

  registerTool({
    id: 'code-minifier',
    title: 'HTML & CSS Code Minifier',
    description: 'Strip comments, collapse whitespaces, and optimize HTML & CSS stylesheets with size reduction metrics',
    category: 'dev',
    tags: ['minify', 'compress', 'html', 'css', 'clean code', 'dev'],
    keywords: ['html minifier', 'css minifier', 'code compressor'],
    component: MinifyView,
    icon: '🗜️',
  });

  registerTool({
    id: 'color-sniffer',
    title: 'Code Color Palette Sniffer',
    description: 'Scan code, stylesheets, or markup to extract all Hex, RGB, and HSL color definitions into a visual palette',
    category: 'dev',
    tags: ['colors', 'extract', 'palette', 'sniffer', 'hex', 'rgb', 'dev', 'design'],
    keywords: ['color extractor', 'find colors in css', 'palette sniffer'],
    component: ColorSnifferView,
    icon: '🎨',
  });

  registerTool({
    id: 'nanoid-generator',
    title: 'Nano ID & Compact UUID Generator',
    description: 'Generate URL-safe, collision-resistant unique identifiers with customizable lengths and alphabets',
    category: 'dev',
    tags: ['nanoid', 'uuid', 'id generator', 'unique id', 'token', 'dev'],
    keywords: ['nanoid generator', 'short uuid', 'random id'],
    component: NanoidView,
    icon: '🔑',
  });

  registerTool({
    id: 'text-shadow',
    title: 'CSS Text Shadow & Neon Glow Studio',
    description: 'Design multi-layer text shadows, ambient glows, and neon sign effects with live copyable CSS',
    category: 'design',
    tags: ['text shadow', 'neon', 'glow', 'css', 'typography', 'design'],
    keywords: ['css text-shadow', 'neon glow css', 'text glow generator'],
    component: TextShadowView,
    icon: '✨',
  });

  registerTool({
    id: 'css-units',
    title: 'CSS Length & Viewport Units Converter',
    description: 'Convert between px, rem, em, %, vw, and vh based on customizable root font and viewport dimensions',
    category: 'design',
    tags: ['units', 'px to rem', 'rem to px', 'em', 'vw', 'vh', 'css', 'design'],
    keywords: ['css units converter', 'px to rem converter', 'rem calculator'],
    component: UnitsView,
    icon: '📏',
  });

  registerTool({
    id: 'char-distribution',
    title: 'Character & Case Distribution',
    description: 'Inspect character breakdowns, uppercase/lowercase balance, digits, punctuation, and ASCII counts',
    category: 'writing',
    tags: ['characters', 'case', 'stats', 'uppercase', 'lowercase', 'ascii', 'metrics', 'writing'],
    keywords: ['character distribution', 'case counter', 'text stats'],
    component: CharStatsView,
    icon: '📊',
  });

  registerTool({
    id: 'zero-width-cleaner',
    title: 'Invisible & Zero-Width Character Cleaner',
    description: 'Detect and purge zero-width spaces, non-breaking spaces, BOMs, and hidden unicode anomalies',
    category: 'writing',
    tags: ['zero width', 'invisible characters', 'clean text', 'bom', 'nbsp', 'writing', 'dev'],
    keywords: ['remove zero width space', 'invisible character detector', 'clean hidden characters'],
    component: ZeroWidthView,
    icon: '👻',
  });

  registerTool({
    id: 'tone-synthesizer',
    title: 'Tone Synthesizer & Audio Oscillator',
    description: 'Generate precise calibration sine waves, test tones, and analyze fundamental harmonic frequencies',
    category: 'audio',
    tags: ['oscillator', 'synth', 'sine wave', 'tone generator', 'test tone', 'frequency', 'audio'],
    keywords: ['audio test tone', 'sine wave generator', 'frequency oscillator', 'tuning pitch'],
    component: SynthView,
    icon: '🔊',
  });

  registerTool({
    id: 'video-res-scaler',
    title: 'Video Resolution & Proxy Scaler',
    description: 'Calculate proportional downscaling, proxy dimensions, aspect ratio parity, and pixel counts for video codecs',
    category: 'video',
    tags: ['resolution', 'scaler', 'proxy', 'video', 'downscale', '4k', '1080p', 'film'],
    keywords: ['proxy resolution calculator', 'video scale', 'aspect ratio scaler'],
    component: ResScaleView,
    icon: '📐',
  });

  // ==========================================
  // Batch 9 Tools (96-105)
  // ==========================================
  registerTool({
    id: 'ipv6-tools',
    title: 'IPv6 Address Expander & Shortener',
    description: 'Expand compressed IPv6 addresses into full 32-nibble notation or shorten them to RFC 5952 standard form',
    category: 'dev',
    tags: ['ipv6', 'network', 'expand', 'compress', 'ip', 'rfc5952', 'dev'],
    keywords: ['expand ipv6', 'compress ipv6', 'ipv6 address format'],
    component: Ipv6View,
    icon: '🌐',
  });

  registerTool({
    id: 'radix-converter',
    title: 'Multi-Base Radix Converter',
    description: 'Convert large integers across Decimal, Hexadecimal, Binary, Octal, and Base36 notations with bit length inspection',
    category: 'dev',
    tags: ['radix', 'base', 'decimal', 'hex', 'binary', 'octal', 'bits', 'dev'],
    keywords: ['number base converter', 'decimal to binary', 'hex to decimal'],
    component: RadixView,
    icon: '🔢',
  });

  registerTool({
    id: 'json-to-typescript',
    title: 'JSON to TypeScript Interface Generator',
    description: 'Infer typed TypeScript interfaces and nested types directly from raw JSON objects or arrays',
    category: 'dev',
    tags: ['json', 'typescript', 'types', 'interfaces', 'generator', 'dev'],
    keywords: ['json to ts', 'generate typescript interface', 'json type inference'],
    component: JsonToTsView,
    icon: '🔷',
  });

  registerTool({
    id: 'html-sanitizer',
    title: 'Safe HTML Sanitizer & XSS Cleaner',
    description: 'Purge executable scripts, iframe embeds, and inline DOM event handlers (onclick, onerror) to prevent XSS',
    category: 'dev',
    tags: ['html', 'sanitizer', 'xss', 'security', 'clean html', 'dev'],
    keywords: ['html sanitizer', 'strip scripts', 'xss cleaner'],
    component: HtmlSanitizeView,
    icon: '🛡️',
  });

  registerTool({
    id: 'golden-ratio',
    title: 'Golden Ratio (φ 1.618) Layout & Typography',
    description: 'Calculate aesthetically balanced column layouts and harmonic typography scale steps using the divine proportion',
    category: 'design',
    tags: ['golden ratio', 'phi', 'layout', 'typography', 'scale', 'design'],
    keywords: ['golden ratio calculator', 'phi scale', 'golden ratio typography'],
    component: GoldenRatioView,
    icon: '🌀',
  });

  registerTool({
    id: 'box-sizing',
    title: 'CSS Box Model & Sizing Visualizer',
    description: 'Inspect outer rendered dimensions versus inner content areas between content-box and border-box sizing models',
    category: 'design',
    tags: ['box-sizing', 'border-box', 'content-box', 'css', 'box model', 'design'],
    keywords: ['css box-sizing', 'border-box vs content-box', 'box model calculator'],
    component: BoxSizingView,
    icon: '📦',
  });

  registerTool({
    id: 'nato-alphabet',
    title: 'NATO Phonetic Alphabet & Aviation Spelling',
    description: 'Translate words, callsigns, and serial numbers into clear ICAO / NATO phonetic code words for voice radio clarity',
    category: 'writing',
    tags: ['nato', 'phonetic', 'alphabet', 'icao', 'aviation', 'radio', 'spelling', 'writing'],
    keywords: ['nato phonetic alphabet', 'aviation alphabet', 'alpha bravo charlie'],
    component: NatoView,
    icon: '✈️',
  });

  registerTool({
    id: 'markdown-footnotes',
    title: 'Markdown Footnote & Citation Builder',
    description: 'Format academic footnotes, reference citations, and bibliography markers according to GitHub Flavored Markdown',
    category: 'writing',
    tags: ['footnote', 'citation', 'references', 'markdown', 'gfm', 'writing'],
    keywords: ['markdown footnotes', 'citation builder', 'gfm footnotes'],
    component: FootnoteView,
    icon: '📑',
  });

  registerTool({
    id: 'bpm-to-hz',
    title: 'BPM to Hz Frequency & Period Converter',
    description: 'Translate musical tempo into LFO oscillation frequencies in Hertz (Hz) and waveform cycle periods in milliseconds',
    category: 'audio',
    tags: ['bpm to hz', 'frequency', 'lfo', 'oscillation', 'hertz', 'milliseconds', 'audio', 'music'],
    keywords: ['bpm to hz', 'tempo to frequency', 'lfo sync calculator'],
    component: BpmHzView,
    icon: '🎚️',
  });

  registerTool({
    id: 'letterbox-matte',
    title: 'Video Letterbox & Pillarbox Matte Visualizer',
    description: 'Calculate exact matte bar dimensions (top/bottom or pillarbox left/right) and active screen surface efficiency',
    category: 'video',
    tags: ['letterbox', 'pillarbox', 'matte', 'aspect ratio', 'black bars', 'video', 'film'],
    keywords: ['letterbox calculator', 'pillarbox math', 'aspect matte visualizer'],
    component: LetterboxView,
    icon: '🎞️',
  });

  // ==========================================
  // Batch 10 Tools (106-115)
  // ==========================================
  registerTool({
    id: 'env-to-json',
    title: 'Environment (.env) ↔ JSON Converter',
    description: 'Convert bidirectionally between standard .env config files and structured JSON configuration objects',
    category: 'dev',
    tags: ['env', 'json', 'config', 'environment variables', 'dev', 'converter'],
    keywords: ['env to json', 'json to env', 'dotenv converter'],
    component: EnvJsonView,
    icon: '⚙️',
  });

  registerTool({
    id: 'semver-inspector',
    title: 'Semantic Versioning (SemVer) Inspector & Bumper',
    description: 'Parse version strings, compare precedence between release versions, and calculate major/minor/patch increments',
    category: 'dev',
    tags: ['semver', 'version', 'bump', 'release', 'npm', 'dev'],
    keywords: ['semver compare', 'semver bumper', 'semantic versioning calculator'],
    component: SemverView,
    icon: '🏷️',
  });

  registerTool({
    id: 'sql-minifier',
    title: 'SQL Query Minifier & Comment Stripper',
    description: 'Compress database queries, strip single/multi-line comments, and collapse whitespace for embedded SQL strings',
    category: 'dev',
    tags: ['sql', 'minify', 'compress', 'database', 'clean sql', 'dev'],
    keywords: ['minify sql', 'strip sql comments', 'sql compressor'],
    component: SqlMinifyView,
    icon: '🗄️',
  });

  registerTool({
    id: 'bitmask-permissions',
    title: 'Permission Bitmask Flag Inspector & Builder',
    description: 'Inspect bitwise flags, calculate combined permission integers, binary bit sequences, and hexadecimal representations',
    category: 'dev',
    tags: ['bitmask', 'flags', 'permissions', 'bitwise', 'binary', 'rbac', 'dev'],
    keywords: ['permission bitmask', 'bitwise flags calculator', 'binary permissions'],
    component: BitmaskView,
    icon: '🛡️',
  });

  registerTool({
    id: 'css-grid',
    title: 'CSS Grid Layout Generator',
    description: 'Design responsive CSS Grid structures with live preview, fr/auto unit controls, and Tailwind utility classes',
    category: 'design',
    tags: ['grid', 'css grid', 'layout', 'tailwind', 'columns', 'rows', 'design'],
    keywords: ['css grid generator', 'grid layout preview', 'tailwind grid'],
    component: GridView,
    icon: '▦',
  });

  registerTool({
    id: 'css-ribbon',
    title: 'CSS Corner Ribbon & Badge Generator',
    description: 'Design diagonal corner ribbons for pricing tiers, new badges, and promotional product cards',
    category: 'design',
    tags: ['ribbon', 'badge', 'banner', 'corner', 'css', 'card', 'design'],
    keywords: ['css ribbon', 'corner banner', 'diagonal badge css'],
    component: RibbonView,
    icon: '🎗️',
  });

  registerTool({
    id: 'morse-code',
    title: 'International Morse Code Translator',
    description: 'Translate plain text to international Morse code dots and dashes, or decode transmissions back to readable text',
    category: 'writing',
    tags: ['morse', 'morse code', 'translator', 'radio', 'telegraph', 'writing'],
    keywords: ['morse code translator', 'text to morse', 'morse decoder'],
    component: MorseView,
    icon: '📻',
  });

  registerTool({
    id: 'zalgo-glitch',
    title: 'Zalgo Glitch & Corrupted Text Generator',
    description: 'Inject chaotic stacked Unicode diacritical marks to generate void, cursed, and glitch aesthetic typography',
    category: 'writing',
    tags: ['zalgo', 'glitch', 'corrupted text', 'void', 'cursed', 'unicode', 'writing'],
    keywords: ['zalgo text generator', 'glitch font', 'cursed text generator'],
    component: ZalgoView,
    icon: '👹',
  });

  registerTool({
    id: 'sample-rate-calculator',
    title: 'Audio Sample Rate & Nyquist Calculator',
    description: 'Inspect acoustic bandwidth limits, Nyquist cutoffs, and uncompressed PCM bitrates across broadcast standards',
    category: 'audio',
    tags: ['sample rate', 'nyquist', 'frequency', 'pcm', 'audio bitrate', 'audio', 'music'],
    keywords: ['nyquist frequency calculator', 'audio sample rate math', 'pcm data rate'],
    component: SampleRateView,
    icon: '🎙️',
  });

  registerTool({
    id: 'depth-of-field',
    title: 'Camera Depth of Field (DoF) & Hyperfocal Geometry',
    description: 'Calculate hyperfocal distance, near limit, far limit, and total depth of field sharpness zone',
    category: 'video',
    tags: ['dof', 'depth of field', 'hyperfocal', 'aperture', 'focal length', 'camera', 'video', 'film'],
    keywords: ['depth of field calculator', 'hyperfocal distance', 'camera dof'],
    component: DofView,
    icon: '🎯',
  });

  // ==========================================
  // Batch 11 Tools (116-125)
  // ==========================================
  registerTool({
    id: 'cors-headers',
    title: 'HTTP CORS Header Generator',
    description: 'Generate standard Cross-Origin Resource Sharing (CORS) response headers, Express.js middleware, and Nginx blocks',
    category: 'dev',
    tags: ['cors', 'headers', 'http', 'express', 'nginx', 'preflight', 'security', 'dev'],
    keywords: ['cors generator', 'access-control-allow-origin', 'cors headers'],
    component: CorsView,
    icon: '🌐',
  });

  registerTool({
    id: 'htaccess-generator',
    title: 'Apache .htaccess Redirect & Rewrite Generator',
    description: 'Generate standard mod_rewrite rules for HTTPS redirection, trailing slash normalization, and 301 permanent redirects',
    category: 'dev',
    tags: ['htaccess', 'apache', 'redirect', 'rewrite', '301', 'https', 'dev'],
    keywords: ['htaccess generator', '301 redirect', 'apache rewrite rules'],
    component: HtaccessView,
    icon: '📄',
  });

  registerTool({
    id: 'svg-cleaner',
    title: 'SVG Path Cleaner & Vector Optimizer',
    description: 'Purge editor metadata, comments, and truncate floating-point coordinate precision to slim down vector SVGs',
    category: 'dev',
    tags: ['svg', 'clean', 'optimize', 'vector', 'minify svg', 'dev', 'design'],
    keywords: ['svg cleaner', 'optimize svg', 'clean vector'],
    component: SvgCleanView,
    icon: '📐',
  });

  registerTool({
    id: 'url-inspector',
    title: 'Deep URL & Query String Inspector',
    description: 'Deconstruct URLs into protocol, host, port, subpaths, anchor hash, and structured query parameter matrix',
    category: 'dev',
    tags: ['url', 'query', 'params', 'protocol', 'hash', 'parser', 'inspector', 'dev'],
    keywords: ['url parser', 'query string inspector', 'url breakdown'],
    component: UrlInspectView,
    icon: '🔍',
  });

  registerTool({
    id: 'neon-glow-card',
    title: 'Cyberpunk Neon Glow Card Designer',
    description: 'Design modern glowing cards with ambient outer drop glows, interior edge highlights, and blur backdrop filters',
    category: 'design',
    tags: ['glow', 'neon', 'card', 'box-shadow', 'cyberpunk', 'ambient', 'css', 'design'],
    keywords: ['neon glow card', 'cyberpunk css', 'ambient card glow'],
    component: GlowCardView,
    icon: '✨',
  });

  registerTool({
    id: 'color-blindness-simulator',
    title: 'Color Vision Deficiency Simulator',
    description: 'Simulate how your brand colors appear to users with Protanopia, Deuteranopia, Tritanopia, and Achromatopsia',
    category: 'design',
    tags: ['colorblind', 'accessibility', 'a11y', 'protanopia', 'deuteranopia', 'wcag', 'design'],
    keywords: ['color blindness simulator', 'a11y color test', 'colorblind palette'],
    component: ColorBlindView,
    icon: '👁️',
  });

  registerTool({
    id: 'anagram-palindrome',
    title: 'Palindrome & Anagram Wordplay Analyzer',
    description: 'Detect palindromic symmetry, verify anagrams between phrases, and compute distinct letter permutation counts',
    category: 'writing',
    tags: ['palindrome', 'anagram', 'wordplay', 'letters', 'symmetry', 'writing'],
    keywords: ['palindrome checker', 'anagram solver', 'wordplay analyzer'],
    component: AnagramView,
    icon: '🔤',
  });

  registerTool({
    id: 'poetic-meter',
    title: 'Poetic Meter & Syllabic Scansion Tool',
    description: 'Calculate line-by-line syllable counts, estimate poetic foot metrics (iambic scansion), and inspect rhythmic flow',
    category: 'writing',
    tags: ['poetry', 'meter', 'syllables', 'scansion', 'rhyme', 'iambic', 'lyrics', 'writing'],
    keywords: ['poetic meter calculator', 'syllable counter poetry', 'scansion tool'],
    component: RhymeView,
    icon: '📜',
  });

  registerTool({
    id: 'audio-headroom',
    title: 'Mastering Audio Headroom & True Peak Analyzer',
    description: 'Estimate true-peak clip risks, inter-sample overs, and loudness normalization gain adjustments across streaming platforms',
    category: 'audio',
    tags: ['headroom', 'true peak', 'lufs', 'mastering', 'spotify', 'clipping', 'audio', 'music'],
    keywords: ['true peak headroom', 'lufs penalty calculator', 'mastering clipping test'],
    component: HeadroomView,
    icon: '🎚️',
  });

  registerTool({
    id: 'lighting-contrast-ratio',
    title: 'Cinema Lighting Contrast Ratio & Stop Calculator',
    description: 'Calculate Key-to-Fill lighting ratios, exposure f-stop differences, and cinematic mood aesthetics for gaffers and DPs',
    category: 'video',
    tags: ['lighting', 'contrast ratio', 'cinematography', 'key light', 'fill light', 'stops', 'video', 'film'],
    keywords: ['lighting contrast ratio', 'key to fill ratio', 'cinematography lighting calculator'],
    component: LightingContrastView,
    icon: '💡',
  });

  // ==========================================
  // Batch 12: Developer & Security Workstation (10 tools -> 135 total)
  // ==========================================
  registerTool({
    id: 'defang-url',
    title: 'Defang & Refang URL / IP',
    description: 'Neutralize active URLs, IPs, and email links for safe incident reports and ticketing',
    category: 'dev',
    tags: ['defang', 'refang', 'url', 'ip', 'security', 'cyberchef', 'hxxp', 'ioc', 'dev'],
    keywords: ['defang url', 'refang ip', 'ioc sanitizer', 'malicious link safe'],
    component: DefangUrlTool,
    icon: '🛡️',
  });

  registerTool({
    id: 'cidr-calc',
    title: 'CIDR Subnet & IP Range Calculator',
    description: 'Calculate network address, broadcast address, netmask, wildcard, and usable host ranges',
    category: 'dev',
    tags: ['cidr', 'subnet', 'ip', 'netmask', 'networking', 'broadcast', 'host range', 'dev'],
    keywords: ['cidr calculator', 'subnet mask calculator', 'ip range calculator'],
    component: CidrCalculatorTool,
    icon: '🌐',
  });

  registerTool({
    id: 'hexdump',
    title: 'Hex Dump (xxd) Byte Inspector',
    description: 'Inspect binary byte offsets, hexadecimal pairs, and ASCII output matrix of arbitrary payloads',
    category: 'dev',
    tags: ['hexdump', 'xxd', 'hex', 'bytes', 'binary', 'offset', 'ascii', 'dev'],
    keywords: ['hex dump viewer', 'xxd inspector', 'binary hex view'],
    component: HexDumpViewerTool,
    icon: '🔢',
  });

  registerTool({
    id: 'base58-base32',
    title: 'Base58 & Base32 Encoder / Decoder',
    description: 'Encode and decode Bitcoin Base58 and RFC 4648 Base32 payloads offline without server calls',
    category: 'dev',
    tags: ['base58', 'base32', 'bitcoin', 'crypto', 'encoding', 'decoding', 'rfc4648', 'dev'],
    keywords: ['base58 encode', 'base32 decode', 'bitcoin address base58'],
    component: Base58Base32Tool,
    icon: '🔤',
  });

  registerTool({
    id: 'bcrypt-inspector',
    title: 'Bcrypt Password Hash Inspector',
    description: 'Inspect salt parameters, iteration cost factor, and validity of Bcrypt hashes',
    category: 'dev',
    tags: ['bcrypt', 'hash', 'password', 'security', 'salt', 'cost', 'rounds', 'dev'],
    keywords: ['bcrypt inspector', 'bcrypt salt', 'bcrypt cost factor'],
    component: BcryptTool,
    icon: '🔒',
  });

  registerTool({
    id: 'ulid-generator',
    title: 'ULID Time-Ordered Unique ID Generator',
    description: 'Generate 26-character Universally Unique Lexicographically Sortable Identifiers for databases',
    category: 'dev',
    tags: ['ulid', 'id', 'uuid', 'timestamp', 'sortable', 'crockford', 'database', 'dev'],
    keywords: ['ulid generator', 'lexicographical id', 'time ordered uuid'],
    component: UlidTool,
    icon: '🆔',
  });

  registerTool({
    id: 'dns-records',
    title: 'DNS Zone Record Parser & Formatter',
    description: 'Parse, validate, and structure standard DNS zone records (A, AAAA, MX, CNAME, TXT)',
    category: 'dev',
    tags: ['dns', 'zone', 'mx', 'cname', 'txt', 'records', 'networking', 'dev'],
    keywords: ['dns record formatter', 'zone file parser', 'dns inspector'],
    component: DnsZoneTool,
    icon: '📡',
  });

  registerTool({
    id: 'curl-builder',
    title: 'cURL Command Visual Builder',
    description: 'Visually assemble authenticated cURL CLI requests with custom headers, JSON payloads, and flags',
    category: 'dev',
    tags: ['curl', 'cli', 'api', 'http', 'request', 'post', 'headers', 'dev'],
    keywords: ['curl command generator', 'curl builder', 'api request builder'],
    component: CurlBuilderTool,
    icon: '💻',
  });

  registerTool({
    id: 'json-diff',
    title: 'JSON Structural Tree Diff & Comparator',
    description: 'Compare two JSON objects structurally to identify added keys, removed fields, and modified values',
    category: 'dev',
    tags: ['json', 'diff', 'compare', 'objects', 'keys', 'structural diff', 'dev'],
    keywords: ['json diff checker', 'json tree compare', 'json object diff'],
    component: JsonDiffTool,
    icon: '🌿',
  });

  registerTool({
    id: 'sql-to-json',
    title: 'SQL INSERT Statement to JSON Array',
    description: 'Parse SQL INSERT INTO query statements directly into a clean, structured array of JSON objects',
    category: 'dev',
    tags: ['sql', 'json', 'insert', 'converter', 'database', 'parser', 'table', 'dev'],
    keywords: ['sql to json', 'sql insert parser', 'sql values to json'],
    component: SqlInsertJsonTool,
    icon: '🗄️',
  });

  // ==========================================
  // Batch 13: Media, Video & Audio Workstation (10 tools -> 145 total)
  // ==========================================
  registerTool({
    id: 'srt-vtt',
    title: 'Subtitle SRT ⇄ WebVTT Converter',
    description: 'Convert subtitle files between SubRip (.srt) and HTML5 WebVTT (.vtt) with frame-accurate delimiters',
    category: 'video',
    tags: ['subtitle', 'srt', 'vtt', 'webvtt', 'captions', 'video', 'converter'],
    keywords: ['srt to vtt', 'vtt to srt', 'subtitle converter'],
    component: SrtVttTool,
    icon: '📝',
  });

  registerTool({
    id: 'ffmpeg-gen',
    title: 'FFmpeg Command Studio Generator',
    description: 'Quickly construct battle-tested FFmpeg CLI commands for transcoding, compression, audio extraction, and trimming',
    category: 'video',
    tags: ['ffmpeg', 'video', 'transcode', 'compress', 'cli', 'trim', 'convert'],
    keywords: ['ffmpeg generator', 'ffmpeg command builder', 'video compress ffmpeg'],
    component: FfmpegGenTool,
    icon: '🎬',
  });

  registerTool({
    id: 'timecode-drift',
    title: 'Timecode Drop-Frame Sync Drift Calculator',
    description: 'Diagnose audio/video sync drift over time caused by 29.97 NDF vs real wall-clock timing',
    category: 'video',
    tags: ['timecode', 'drift', 'dropframe', 'ndf', 'sync', 'audio drift', 'video'],
    keywords: ['timecode drift calculator', 'drop frame drift', '29.97 drift'],
    component: TimecodeDriftTool,
    icon: '⏱️',
  });

  registerTool({
    id: 'sensor-crop',
    title: 'Camera Sensor Crop Factor & 35mm Equiv',
    description: 'Calculate effective 35mm full-frame focal lengths and depth-of-field across cinema and camera sensors',
    category: 'video',
    tags: ['camera', 'sensor', 'crop factor', 'focal length', 'aperture', 'dof', '35mm', 'video'],
    keywords: ['crop factor calculator', '35mm equivalent', 'full frame crop'],
    component: SensorCropTool,
    icon: '📷',
  });

  registerTool({
    id: 'anamorphic-desqueeze',
    title: 'Anamorphic De-Squeeze & Aspect Scaler',
    description: 'Calculate post-production de-squeeze pixel dimensions and aspect ratios for anamorphic lenses',
    category: 'video',
    tags: ['anamorphic', 'desqueeze', 'aspect ratio', 'scope', 'cinematography', 'video'],
    keywords: ['anamorphic desqueeze calculator', 'anamorphic squeeze ratio', 'scope aspect'],
    component: AnamorphicDeSqueezeTool,
    icon: '📐',
  });

  registerTool({
    id: 'chroma-subsampling',
    title: 'Video Chroma Subsampling Analyzer',
    description: 'Compare color resolution, pixel grids, and data savings across 4:4:4, 4:2:2, and 4:2:0 formats',
    category: 'video',
    tags: ['chroma', 'subsampling', '420', '422', '444', 'yuv', 'video', 'codecs'],
    keywords: ['chroma subsampling calculator', '420 vs 422', 'yuv subsampling'],
    component: ChromaSubsamplingTool,
    icon: '🎨',
  });

  registerTool({
    id: 'white-noise-gen',
    title: 'Acoustic Noise Synthesizer (White, Pink, Brown)',
    description: 'Synthesize calibrated acoustic noise signals in-browser for sound masking and acoustic evaluation',
    category: 'audio',
    tags: ['noise', 'white noise', 'pink noise', 'brown noise', 'acoustic', 'audio', 'sleep'],
    keywords: ['white noise generator', 'pink noise synth', 'acoustic noise'],
    component: WhiteNoiseGenTool,
    icon: '📻',
  });

  registerTool({
    id: 'dtmf-dialer',
    title: 'DTMF Dual-Tone Telephone Dialer',
    description: 'Synthesize standard Dual-Tone Multi-Frequency telecom frequencies for touch-tone telephone keypads',
    category: 'audio',
    tags: ['dtmf', 'telephone', 'dialer', 'tones', 'telecom', 'keypad', 'audio'],
    keywords: ['dtmf tone generator', 'telephone keypad dialer', 'dual tone synth'],
    component: DtmfDialerTool,
    icon: '☎️',
  });

  registerTool({
    id: 'music-scales',
    title: 'Musical Scale & Chord Interval Explorer',
    description: 'Inspect notes, intervals, and modal degrees across standard major, minor, and exotic musical scales',
    category: 'audio',
    tags: ['music', 'scales', 'intervals', 'chords', 'modes', 'dorian', 'blues', 'audio'],
    keywords: ['musical scale finder', 'scale intervals', 'modes explorer'],
    component: MusicScalesTool,
    icon: '🎵',
  });

  registerTool({
    id: 'binaural-beats',
    title: 'Binaural Beat Brainwave Synthesizer',
    description: 'Generate stereo frequency offsets to stimulate Delta, Theta, Alpha, Beta, and Gamma brainwave states',
    category: 'audio',
    tags: ['binaural', 'beats', 'brainwaves', 'alpha', 'theta', 'meditation', 'focus', 'audio'],
    keywords: ['binaural beat generator', 'brainwave synthesizer', 'alpha wave generator'],
    component: BinauralBeatsTool,
    icon: '🎧',
  });
}
