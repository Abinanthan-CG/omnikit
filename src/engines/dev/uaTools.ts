export interface ParsedUserAgent {
  browser: { name: string; version: string };
  os: { name: string; version: string };
  engine: { name: string; version: string };
  device: { type: 'desktop' | 'mobile' | 'tablet' | 'bot' | 'unknown'; model?: string };
  raw: string;
}

export function parseUserAgent(ua: string): ParsedUserAgent {
  if (!ua) {
    return {
      browser: { name: 'Unknown', version: '' },
      os: { name: 'Unknown', version: '' },
      engine: { name: 'Unknown', version: '' },
      device: { type: 'unknown' },
      raw: ''
    };
  }

  // OS detection
  let osName = 'Unknown';
  let osVersion = '';
  if (/windows phone/i.test(ua)) {
    osName = 'Windows Phone';
  } else if (/win(dows|98|nt|ce)/i.test(ua)) {
    osName = 'Windows';
    if (/nt 10\.0/i.test(ua)) osVersion = '10 / 11';
    else if (/nt 6\.3/i.test(ua)) osVersion = '8.1';
    else if (/nt 6\.2/i.test(ua)) osVersion = '8';
    else if (/nt 6\.1/i.test(ua)) osVersion = '7';
  } else if (/android/i.test(ua)) {
    osName = 'Android';
    const match = ua.match(/android\s+([\d.]+)/i);
    if (match) osVersion = match[1];
  } else if (/ipad/i.test(ua)) {
    osName = 'iPadOS';
    const match = ua.match(/os\s+([\d_]+)/i);
    if (match) osVersion = match[1].replace(/_/g, '.');
  } else if (/iphone|ipod/i.test(ua)) {
    osName = 'iOS';
    const match = ua.match(/os\s+([\d_]+)/i);
    if (match) osVersion = match[1].replace(/_/g, '.');
  } else if (/mac os x/i.test(ua)) {
    osName = 'macOS';
    const match = ua.match(/mac os x\s+([\d_]+)/i);
    if (match) osVersion = match[1].replace(/_/g, '.');
  } else if (/linux/i.test(ua)) {
    osName = 'Linux';
  }

  // Browser detection
  let browserName = 'Unknown';
  let browserVersion = '';
  if (/edg(e|a|ios)?\/([\d.]+)/i.test(ua)) {
    browserName = 'Microsoft Edge';
    browserVersion = ua.match(/edg(e|a|ios)?\/([\d.]+)/i)?.[2] || '';
  } else if (/opr\/|opera\/([\d.]+)/i.test(ua)) {
    browserName = 'Opera';
    browserVersion = ua.match(/(opr|opera)\/([\d.]+)/i)?.[2] || '';
  } else if (/chrome|crios/i.test(ua)) {
    browserName = 'Google Chrome';
    browserVersion = ua.match(/(chrome|crios)\/([\d.]+)/i)?.[2] || '';
  } else if (/firefox|fxios/i.test(ua)) {
    browserName = 'Mozilla Firefox';
    browserVersion = ua.match(/(firefox|fxios)\/([\d.]+)/i)?.[2] || '';
  } else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) {
    browserName = 'Apple Safari';
    browserVersion = ua.match(/version\/([\d.]+)/i)?.[1] || '';
  }

  // Engine detection
  let engineName = 'Unknown';
  let engineVersion = '';
  if (/applewebkit\/([\d.]+)/i.test(ua)) {
    engineName = 'Blink / WebKit';
    engineVersion = ua.match(/applewebkit\/([\d.]+)/i)?.[1] || '';
  } else if (/gecko\/([\d.]+)/i.test(ua)) {
    engineName = 'Gecko';
    engineVersion = ua.match(/rv:([\d.]+)/i)?.[1] || '';
  } else if (/trident\/([\d.]+)/i.test(ua)) {
    engineName = 'Trident';
  }

  // Device type
  let deviceType: ParsedUserAgent['device']['type'] = 'desktop';
  if (/bot|crawler|spider|slurp|bingbot|googlebot/i.test(ua)) {
    deviceType = 'bot';
  } else if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) {
    deviceType = 'tablet';
  } else if (/mobile|iphone|ipod|android/i.test(ua)) {
    deviceType = 'mobile';
  }

  return {
    browser: { name: browserName, version: browserVersion },
    os: { name: osName, version: osVersion },
    engine: { name: engineName, version: engineVersion },
    device: { type: deviceType },
    raw: ua
  };
}
