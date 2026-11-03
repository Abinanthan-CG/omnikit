import type { EngineResult } from '../../types/tool.ts';

export interface TextMetricsResult {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  readingTimeSeconds: number;
  speakingTimeMinutes: number;
  speakingTimeSeconds: number;
  avgWordLength: number;
}

export function analyzeTextMetrics(text: string): EngineResult<TextMetricsResult> {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;

  // Split sentences on .!? followed by whitespace or end of string
  const sentences = trimmed
    ? trimmed.split(/[.!?]+(?:\s+|$)/).filter(s => s.trim().length > 0).length
    : 0;

  // Paragraphs on newline sequences
  const paragraphs = trimmed
    ? trimmed.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
    : 0;

  // Reading time at 200 WPM
  const readingTimeMinutes = words > 0 ? Math.round((words / 200) * 10) / 10 : 0;
  const readingTimeSeconds = words > 0 ? Math.round((words / 200) * 60) : 0;

  // Speaking time at 130 WPM
  const speakingTimeMinutes = words > 0 ? Math.round((words / 130) * 10) / 10 : 0;
  const speakingTimeSeconds = words > 0 ? Math.round((words / 130) * 60) : 0;

  const avgWordLength = words > 0 ? Math.round((charactersNoSpaces / words) * 10) / 10 : 0;

  return {
    success: true,
    value: {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTimeMinutes,
      readingTimeSeconds,
      speakingTimeMinutes,
      speakingTimeSeconds,
      avgWordLength,
    },
  };
}
