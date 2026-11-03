export interface CorsConfig {
  allowedOrigins: string[];
  allowedMethods: string[];
  allowedHeaders: string[];
  allowCredentials: boolean;
  maxAgeSeconds: number;
}

export function generateCorsHeaders(config: Partial<CorsConfig>): {
  headers: Record<string, string>;
  headerString: string;
  expressMiddlewareSnippet: string;
  nginxSnippet: string;
} {
  const origins = config.allowedOrigins?.length ? config.allowedOrigins.join(', ') : '*';
  const methods = config.allowedMethods?.length
    ? config.allowedMethods.join(', ')
    : 'GET, POST, PUT, DELETE, OPTIONS';
  const headersList = config.allowedHeaders?.length
    ? config.allowedHeaders.join(', ')
    : 'Content-Type, Authorization, X-Requested-With';
  const creds = config.allowCredentials ? 'true' : 'false';
  const maxAge = config.maxAgeSeconds ?? 86400;

  const headers: Record<string, string> = {
    'Access-Control-Allow-Origin': origins,
    'Access-Control-Allow-Methods': methods,
    'Access-Control-Allow-Headers': headersList,
    'Access-Control-Max-Age': String(maxAge)
  };

  if (config.allowCredentials) {
    headers['Access-Control-Allow-Credentials'] = creds;
  }

  const headerString = Object.entries(headers)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  const expressSnippet = `app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '${origins}');
  res.header('Access-Control-Allow-Methods', '${methods}');
  res.header('Access-Control-Allow-Headers', '${headersList}');
  ${config.allowCredentials ? "res.header('Access-Control-Allow-Credentials', 'true');\n  " : ''}if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});`;

  const nginxSnippet = `add_header 'Access-Control-Allow-Origin' '${origins}' always;
add_header 'Access-Control-Allow-Methods' '${methods}' always;
add_header 'Access-Control-Allow-Headers' '${headersList}' always;
${config.allowCredentials ? "add_header 'Access-Control-Allow-Credentials' 'true' always;\n" : ''}if ($request_method = 'OPTIONS') {
  return 204;
}`;

  return {
    headers,
    headerString,
    expressMiddlewareSnippet: expressSnippet,
    nginxSnippet
  };
}
