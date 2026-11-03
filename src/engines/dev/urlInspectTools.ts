export interface UrlInspection {
  isValid: boolean;
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  origin: string;
  queryParams: { key: string; value: string }[];
  pathSegments: string[];
}

export function inspectUrl(urlString: string): UrlInspection {
  if (!urlString || typeof urlString !== 'string') {
    return {
      isValid: false,
      protocol: '',
      hostname: '',
      port: '',
      pathname: '',
      search: '',
      hash: '',
      origin: '',
      queryParams: [],
      pathSegments: []
    };
  }

  try {
    const parsed = new URL(urlString.trim());
    const queryParams: { key: string; value: string }[] = [];
    parsed.searchParams.forEach((value, key) => {
      queryParams.push({ key, value });
    });

    const pathSegments = parsed.pathname
      .split('/')
      .filter((s) => s.length > 0);

    return {
      isValid: true,
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      port: parsed.port,
      pathname: parsed.pathname,
      search: parsed.search,
      hash: parsed.hash,
      origin: parsed.origin,
      queryParams,
      pathSegments
    };
  } catch {
    return {
      isValid: false,
      protocol: '',
      hostname: '',
      port: '',
      pathname: '',
      search: '',
      hash: '',
      origin: '',
      queryParams: [],
      pathSegments: []
    };
  }
}
