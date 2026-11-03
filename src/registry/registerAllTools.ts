import { registerTool } from './registry';
import { TimecodeView } from '../views/video/TimecodeView';
import { AspectRatioView } from '../views/video/AspectRatioView';
import { BpmView } from '../views/audio/BpmView';
import { ContrastView } from '../views/design/ContrastView';
import { PxRemView } from '../views/design/PxRemView';
import { CaseConverterView } from '../views/writing/CaseConverterView';
import { WordMetricsView } from '../views/writing/WordMetricsView';
import { TimestampView } from '../views/dev/TimestampView';
import { JsonView } from '../views/dev/JsonView';

export function initializeTools(): void {
  // Video & Media
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

  // Audio & Music
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

  // Design & UI
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

  // Writing & Copy
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

  // Dev & Data
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
}
