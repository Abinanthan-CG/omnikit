export function minifyCss(css: string): string {
  if (!css) return '';
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
    .replace(/\s+/g, ' ')             // collapse whitespace
    .replace(/\s*([\{\}:;,>])\s*/g, '$1') // remove space around separators
    .replace(/;}/g, '}')              // remove trailing semicolons
    .trim();
}

export function minifyHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<!--[\s\S]*?-->/g, '') // remove HTML comments
    .replace(/\s+/g, ' ')            // collapse multiple spaces into one
    .replace(/>\s+</g, '><')         // remove whitespace between tags
    .trim();
}
