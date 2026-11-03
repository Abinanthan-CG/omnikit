export interface SlugOptions {
  separator?: string;
  lowercase?: boolean;
}

export function slugify(text: string, options: SlugOptions = {}): string {
  const sep = options.separator || '-';
  let str = text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // strip accents/diacritics

  if (options.lowercase !== false) {
    str = str.toLowerCase();
  }

  return str
    .replace(/[^a-zA-Z0-9\s-_]/g, '') // remove special characters
    .trim()
    .replace(/[\s-_]+/g, sep) // replace spaces/underscores with separator
    .replace(new RegExp(`^\\${sep}+|\\${sep}+$`, 'g'), ''); // trim leading/trailing separators
}
