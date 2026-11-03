export interface JwtResult {
  success: boolean;
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  isExpired: boolean;
  issuedAt?: Date;
  expiresAt?: Date;
  error?: string;
}

function base64UrlDecode(str: string): string {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw new Error('Illegal base64url string');
  }
  return decodeURIComponent(
    escape(atob(output))
  );
}

export function decodeJwt(token: string): JwtResult {
  try {
    const parts = token.trim().split('.');
    if (parts.length !== 3) {
      return {
        success: false,
        header: {},
        payload: {},
        signature: '',
        isExpired: false,
        error: 'Invalid JWT format: expected three dot-separated segments',
      };
    }

    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    const signature = parts[2];

    let isExpired = false;
    let expiresAt: Date | undefined;
    let issuedAt: Date | undefined;

    if (typeof payload.exp === 'number') {
      expiresAt = new Date(payload.exp * 1000);
      isExpired = Date.now() > expiresAt.getTime();
    }

    if (typeof payload.iat === 'number') {
      issuedAt = new Date(payload.iat * 1000);
    }

    return {
      success: true,
      header,
      payload,
      signature,
      isExpired,
      expiresAt,
      issuedAt,
    };
  } catch (err) {
    return {
      success: false,
      header: {},
      payload: {},
      signature: '',
      isExpired: false,
      error: err instanceof Error ? err.message : 'Failed to decode JWT',
    };
  }
}
