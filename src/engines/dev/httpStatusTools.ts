export interface HttpStatus {
  code: number;
  message: string;
  category: '1xx Informational' | '2xx Success' | '3xx Redirection' | '4xx Client Error' | '5xx Server Error';
  description: string;
}

export const HTTP_STATUS_CODES: HttpStatus[] = [
  // 1xx
  { code: 100, message: 'Continue', category: '1xx Informational', description: 'Server received initial request headers, client should proceed.' },
  { code: 101, message: 'Switching Protocols', category: '1xx Informational', description: 'Requester asked server to switch protocols (e.g. WebSocket).' },

  // 2xx
  { code: 200, message: 'OK', category: '2xx Success', description: 'Standard response for successful HTTP requests.' },
  { code: 201, message: 'Created', category: '2xx Success', description: 'Request fulfilled and a new resource was created.' },
  { code: 202, message: 'Accepted', category: '2xx Success', description: 'Request accepted for background processing, but not yet completed.' },
  { code: 204, message: 'No Content', category: '2xx Success', description: 'Request succeeded and response payload body is intentionally empty.' },

  // 3xx
  { code: 301, message: 'Moved Permanently', category: '3xx Redirection', description: 'Resource permanently moved to new URL; search engines transfer SEO rank.' },
  { code: 302, message: 'Found (Temporary Redirect)', category: '3xx Redirection', description: 'Resource temporarily resides at different URL.' },
  { code: 304, message: 'Not Modified', category: '3xx Redirection', description: 'Client cached version is still fresh and valid (ETag / If-Modified-Since).' },
  { code: 307, message: 'Temporary Redirect', category: '3xx Redirection', description: 'Redirect with guaranteed same HTTP method (e.g. POST remains POST).' },
  { code: 308, message: 'Permanent Redirect', category: '3xx Redirection', description: 'Permanent redirect with guaranteed same HTTP method.' },

  // 4xx
  { code: 400, message: 'Bad Request', category: '4xx Client Error', description: 'Malformed request syntax, invalid routing, or deceptive parameters.' },
  { code: 401, message: 'Unauthorized', category: '4xx Client Error', description: 'Authentication is required and has failed or not been provided.' },
  { code: 403, message: 'Forbidden', category: '4xx Client Error', description: 'Request was authenticated, but client lacks permission for the resource.' },
  { code: 404, message: 'Not Found', category: '4xx Client Error', description: 'Requested resource could not be found on server.' },
  { code: 405, message: 'Method Not Allowed', category: '4xx Client Error', description: 'Target resource does not support the HTTP request method.' },
  { code: 408, message: 'Request Timeout', category: '4xx Client Error', description: 'Server timed out waiting for client request.' },
  { code: 409, message: 'Conflict', category: '4xx Client Error', description: 'Request conflict with current resource state (e.g. duplicate key or edit conflict).' },
  { code: 418, message: "I'm a teapot", category: '4xx Client Error', description: 'RFC 2324 Hyper Text Coffee Pot Control Protocol April Fools specification.' },
  { code: 422, message: 'Unprocessable Entity', category: '4xx Client Error', description: 'Syntax is valid, but semantic business validation rules failed.' },
  { code: 429, message: 'Too Many Requests', category: '4xx Client Error', description: 'User or client has sent too many requests in given time (Rate Limited).' },

  // 5xx
  { code: 500, message: 'Internal Server Error', category: '5xx Server Error', description: 'Generic error message when server encounters an unhandled exception.' },
  { code: 501, message: 'Not Implemented', category: '5xx Server Error', description: 'Server does not recognize request method or lacks capability.' },
  { code: 502, message: 'Bad Gateway', category: '5xx Server Error', description: 'Gateway or reverse proxy received an invalid response from upstream server.' },
  { code: 503, message: 'Service Unavailable', category: '5xx Server Error', description: 'Server is overloaded or down for maintenance.' },
  { code: 504, message: 'Gateway Timeout', category: '5xx Server Error', description: 'Upstream server failed to respond to gateway in time.' }
];

export function filterHttpStatus(query: string, category?: string): HttpStatus[] {
  const q = query.toLowerCase().trim();
  return HTTP_STATUS_CODES.filter(item => {
    const matchesCat = !category || category === 'All' || item.category.startsWith(category);
    const matchesQuery = !q || String(item.code).includes(q) || item.message.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });
}
