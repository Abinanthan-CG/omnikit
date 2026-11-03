export interface MimeEntry {
  mime: string;
  extension: string;
  category: 'Application' | 'Audio' | 'Image' | 'Text' | 'Video' | 'Font';
  description: string;
}

export const COMMON_MIMES: MimeEntry[] = [
  // Application
  { mime: 'application/json', extension: '.json', category: 'Application', description: 'JavaScript Object Notation' },
  { mime: 'application/pdf', extension: '.pdf', category: 'Application', description: 'Adobe Portable Document Format' },
  { mime: 'application/zip', extension: '.zip', category: 'Application', description: 'ZIP compressed archive' },
  { mime: 'application/xml', extension: '.xml', category: 'Application', description: 'Extensible Markup Language' },
  { mime: 'application/javascript', extension: '.js', category: 'Application', description: 'JavaScript programming language file' },
  { mime: 'application/wasm', extension: '.wasm', category: 'Application', description: 'WebAssembly binary code' },
  { mime: 'application/octet-stream', extension: '.bin', category: 'Application', description: 'Arbitrary binary data stream' },
  { mime: 'application/x-tar', extension: '.tar', category: 'Application', description: 'Tape Archive file' },
  { mime: 'application/gzip', extension: '.gz', category: 'Application', description: 'GNU Gzip compressed archive' },

  // Audio
  { mime: 'audio/mpeg', extension: '.mp3', category: 'Audio', description: 'MPEG-1 Audio Layer 3' },
  { mime: 'audio/wav', extension: '.wav', category: 'Audio', description: 'Waveform Audio File Format (Lossless LPCM)' },
  { mime: 'audio/ogg', extension: '.ogg', category: 'Audio', description: 'Ogg Vorbis compressed audio' },
  { mime: 'audio/aac', extension: '.aac', category: 'Audio', description: 'Advanced Audio Coding' },
  { mime: 'audio/flac', extension: '.flac', category: 'Audio', description: 'Free Lossless Audio Codec' },
  { mime: 'audio/webm', extension: '.weba', category: 'Audio', description: 'WebM open audio stream' },

  // Image
  { mime: 'image/png', extension: '.png', category: 'Image', description: 'Portable Network Graphics (Lossless)' },
  { mime: 'image/jpeg', extension: '.jpg, .jpeg', category: 'Image', description: 'Joint Photographic Experts Group (Lossy)' },
  { mime: 'image/webp', extension: '.webp', category: 'Image', description: 'Modern WebP compressed web graphic' },
  { mime: 'image/avif', extension: '.avif', category: 'Image', description: 'AV1 Image File Format (Next-Gen)' },
  { mime: 'image/svg+xml', extension: '.svg', category: 'Image', description: 'Scalable Vector Graphics' },
  { mime: 'image/gif', extension: '.gif', category: 'Image', description: 'Graphics Interchange Format' },
  { mime: 'image/x-icon', extension: '.ico', category: 'Image', description: 'Favicon browser icon' },

  // Video
  { mime: 'video/mp4', extension: '.mp4', category: 'Video', description: 'MPEG-4 Part 14 video container' },
  { mime: 'video/webm', extension: '.webm', category: 'Video', description: 'WebM open media video container (VP9/AV1)' },
  { mime: 'video/quicktime', extension: '.mov', category: 'Video', description: 'Apple QuickTime Movie container (ProRes)' },
  { mime: 'video/x-matroska', extension: '.mkv', category: 'Video', description: 'Matroska Multimedia Container' },

  // Text
  { mime: 'text/html', extension: '.html, .htm', category: 'Text', description: 'HyperText Markup Language' },
  { mime: 'text/css', extension: '.css', category: 'Text', description: 'Cascading Style Sheets' },
  { mime: 'text/plain', extension: '.txt', category: 'Text', description: 'Plain raw text' },
  { mime: 'text/csv', extension: '.csv', category: 'Text', description: 'Comma-Separated Values spreadsheet' },
  { mime: 'text/markdown', extension: '.md', category: 'Text', description: 'Markdown formatted plain text' },

  // Fonts
  { mime: 'font/woff2', extension: '.woff2', category: 'Font', description: 'Web Open Font Format 2 (Compressed)' },
  { mime: 'font/woff', extension: '.woff', category: 'Font', description: 'Web Open Font Format' },
  { mime: 'font/ttf', extension: '.ttf', category: 'Font', description: 'TrueType Font' },
  { mime: 'font/otf', extension: '.otf', category: 'Font', description: 'OpenType Font' }
];

export function searchMimes(query: string, category?: string): MimeEntry[] {
  const q = query.toLowerCase().trim();
  return COMMON_MIMES.filter(m => {
    const matchesCat = !category || category === 'All' || m.category === category;
    const matchesQuery = !q || m.mime.toLowerCase().includes(q) || m.extension.toLowerCase().includes(q) || m.description.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });
}
