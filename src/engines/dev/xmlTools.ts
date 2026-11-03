export interface XmlFormatOptions {
  indent?: number; // 2 or 4
  minify?: boolean;
}

export function formatXml(xml: string, options: XmlFormatOptions = { indent: 2 }): string {
  if (options.minify) {
    return xml.replace(/>\s+</g, '><').trim();
  }

  const indentStr = ' '.repeat(options.indent || 2);
  let formatted = '';
  let pad = 0;

  // Split tokens by tag boundaries
  const reg = /(>)(<)(\/*)/g;
  const cleanXml = xml.replace(reg, '$1\r\n$2$3');
  const lines = cleanXml.split('\r\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.match(/^<\/\w/)) {
      pad = Math.max(0, pad - 1);
    }

    formatted += indentStr.repeat(pad) + trimmed + '\n';

    if (trimmed.match(/^<\w[^>]*[^\/]>$/)) {
      pad++;
    }
  }

  return formatted.trim();
}
