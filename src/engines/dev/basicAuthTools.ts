export interface BasicAuthResult {
  header: string;
  token: string;
}

export function generateBasicAuth(username: string, password: string): BasicAuthResult {
  const raw = `${username}:${password}`;
  // Safe base64 in browser or node
  let token = '';
  if (typeof btoa === 'function') {
    token = btoa(unescape(encodeURIComponent(raw)));
  } else {
    token = Buffer.from(raw, 'utf-8').toString('base64');
  }

  return {
    header: `Authorization: Basic ${token}`,
    token
  };
}

export function decodeBasicAuth(headerOrToken: string): { username: string; password: string } {
  const token = headerOrToken.replace(/^Basic\s+/i, '').trim();
  if (!token) return { username: '', password: '' };

  let decoded = '';
  try {
    if (typeof atob === 'function') {
      decoded = decodeURIComponent(escape(atob(token)));
    } else {
      decoded = Buffer.from(token, 'base64').toString('utf-8');
    }
  } catch {
    return { username: '', password: '' };
  }

  const colonIdx = decoded.indexOf(':');
  if (colonIdx === -1) {
    return { username: decoded, password: '' };
  }

  return {
    username: decoded.slice(0, colonIdx),
    password: decoded.slice(colonIdx + 1)
  };
}
