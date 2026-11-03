export interface ParsedCurl {
  method: string;
  url: string;
  headers: Record<string, string>;
  data?: string;
}

export function parseCurl(command: string): ParsedCurl {
  const clean = command.trim().replace(/\\\r?\n/g, ' ');
  let method = 'GET';
  let url = '';
  const headers: Record<string, string> = {};
  let data: string | undefined;

  // Extract URL
  const urlMatch = clean.match(/(?:curl\s+)?(?:['"])(https?:\/\/[^'"]+)(?:['"])|(?:curl\s+)(https?:\/\/\S+)/i);
  if (urlMatch) {
    url = urlMatch[1] || urlMatch[2] || '';
  }

  // Extract method (-X POST / --request POST)
  const methodMatch = clean.match(/(?:-X|--request)\s+([A-Z]+)/i);
  if (methodMatch) {
    method = methodMatch[1].toUpperCase();
  }

  // Extract headers (-H '...' / --header '...')
  const headerRegex = /(?:-H|--header)\s+['"]([^'"]+)['"]/g;
  let hMatch;
  while ((hMatch = headerRegex.exec(clean)) !== null) {
    const headerStr = hMatch[1];
    const colonIdx = headerStr.indexOf(':');
    if (colonIdx !== -1) {
      const key = headerStr.slice(0, colonIdx).trim();
      const val = headerStr.slice(colonIdx + 1).trim();
      headers[key] = val;
    }
  }

  // Extract data (-d '...' / --data '...')
  const dataMatch = clean.match(/(?:-d|--data|--data-raw)\s+['"]([^'"]+)['"]/);
  if (dataMatch) {
    data = dataMatch[1];
    if (method === 'GET') method = 'POST';
  }

  return { method, url, headers, data };
}

export function curlToFetch(command: string): string {
  const parsed = parseCurl(command);
  const options: Record<string, unknown> = {
    method: parsed.method,
  };

  if (Object.keys(parsed.headers).length > 0) {
    options.headers = parsed.headers;
  }

  if (parsed.data) {
    options.body = parsed.data;
  }

  return `fetch('${parsed.url || 'https://api.example.com'}', ${JSON.stringify(options, null, 2)});`;
}

export function curlToPython(command: string): string {
  const parsed = parseCurl(command);
  let code = `import requests\n\n`;
  code += `url = '${parsed.url || 'https://api.example.com'}'\n`;

  if (Object.keys(parsed.headers).length > 0) {
    code += `headers = ${JSON.stringify(parsed.headers, null, 4)}\n`;
  } else {
    code += `headers = {}\n`;
  }

  if (parsed.data) {
    code += `data = '''${parsed.data}'''\n`;
    code += `response = requests.${parsed.method.toLowerCase()}(url, headers=headers, data=data)\n`;
  } else {
    code += `response = requests.${parsed.method.toLowerCase()}(url, headers=headers)\n`;
  }

  code += `print(response.status_code)\nprint(response.text)\n`;
  return code;
}
