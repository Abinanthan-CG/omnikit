export interface IPv6Info {
  isValid: boolean;
  expanded: string;
  compressed: string;
  addressType: string;
  isIpv4Mapped: boolean;
}

export function isValidIPv6(ip: string): boolean {
  if (!ip || typeof ip !== 'string') return false;
  const trimmed = ip.trim();
  // Basic validation pattern
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::$|^:(:[0-9a-fA-F]{1,4}){1,7}$|^([0-9a-fA-F]{1,4}:){1,7}:$|^([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}$|^([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}$|^([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}$|^([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}$|^[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})$/;
  return ipv6Regex.test(trimmed);
}

export function expandIPv6(ip: string): string {
  if (!isValidIPv6(ip)) return '';
  const trimmed = ip.trim().toLowerCase();

  let parts: string[];
  if (trimmed.includes('::')) {
    const halves = trimmed.split('::');
    const first = halves[0] ? halves[0].split(':') : [];
    const second = halves[1] ? halves[1].split(':') : [];
    const missing = 8 - (first.length + second.length);
    const middle = Array(missing).fill('0000');
    parts = [...first, ...middle, ...second];
  } else {
    parts = trimmed.split(':');
  }

  return parts.map((p) => p.padStart(4, '0')).join(':');
}

export function compressIPv6(ip: string): string {
  const expanded = expandIPv6(ip);
  if (!expanded) return '';

  const groups = expanded.split(':').map((g) => g.replace(/^0+/, '') || '0');

  // Find longest sequence of '0's
  let bestStart = -1;
  let bestLen = 0;
  let curStart = -1;
  let curLen = 0;

  for (let i = 0; i < groups.length; i++) {
    if (groups[i] === '0') {
      if (curStart === -1) {
        curStart = i;
        curLen = 1;
      } else {
        curLen++;
      }
      if (curLen > bestLen) {
        bestLen = curLen;
        bestStart = curStart;
      }
    } else {
      curStart = -1;
      curLen = 0;
    }
  }

  if (bestLen > 1) {
    const head = groups.slice(0, bestStart).join(':');
    const tail = groups.slice(bestStart + bestLen).join(':');
    return `${head}::${tail}`;
  }

  return groups.join(':');
}

export function analyzeIPv6(ip: string): IPv6Info {
  const valid = isValidIPv6(ip);
  if (!valid) {
    return {
      isValid: false,
      expanded: '',
      compressed: '',
      addressType: 'Invalid IPv6 Address',
      isIpv4Mapped: false
    };
  }

  const exp = expandIPv6(ip);
  const comp = compressIPv6(ip);

  let addressType = 'Global Unicast';
  let isIpv4Mapped = false;

  if (exp === '0000:0000:0000:0000:0000:0000:0000:0000') {
    addressType = 'Unspecified (::)';
  } else if (exp === '0000:0000:0000:0000:0000:0000:0000:0001') {
    addressType = 'Loopback (::1)';
  } else if (exp.startsWith('fe80:')) {
    addressType = 'Link-Local Unicast (fe80::/10)';
  } else if (exp.startsWith('ff')) {
    addressType = 'Multicast (ff00::/8)';
  } else if (exp.startsWith('fc') || exp.startsWith('fd')) {
    addressType = 'Unique Local (fc00::/7)';
  } else if (exp.startsWith('0000:0000:0000:0000:0000:ffff:')) {
    addressType = 'IPv4-Mapped IPv6';
    isIpv4Mapped = true;
  }

  return {
    isValid: true,
    expanded: exp,
    compressed: comp,
    addressType,
    isIpv4Mapped
  };
}
