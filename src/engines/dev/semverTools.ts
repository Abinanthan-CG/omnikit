export interface ParsedSemver {
  major: number;
  minor: number;
  patch: number;
  prerelease?: string;
  build?: string;
  raw: string;
  isValid: boolean;
}

const SEMVER_REGEX = /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+([0-9A-Za-z.-]+))?$/;

export function parseSemver(version: string): ParsedSemver {
  if (!version || typeof version !== 'string') {
    return { major: 0, minor: 0, patch: 0, raw: '', isValid: false };
  }

  const match = version.trim().match(SEMVER_REGEX);
  if (!match) {
    return { major: 0, minor: 0, patch: 0, raw: version, isValid: false };
  }

  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    prerelease: match[4] || undefined,
    build: match[5] || undefined,
    raw: version.trim(),
    isValid: true
  };
}

export function compareSemver(v1: string, v2: string): -1 | 0 | 1 {
  const p1 = parseSemver(v1);
  const p2 = parseSemver(v2);

  if (!p1.isValid || !p2.isValid) return 0;

  if (p1.major !== p2.major) return p1.major > p2.major ? 1 : -1;
  if (p1.minor !== p2.minor) return p1.minor > p2.minor ? 1 : -1;
  if (p1.patch !== p2.patch) return p1.patch > p2.patch ? 1 : -1;

  // Prerelease comparison: non-prerelease > prerelease
  if (!p1.prerelease && p2.prerelease) return 1;
  if (p1.prerelease && !p2.prerelease) return -1;
  if (p1.prerelease && p2.prerelease) {
    return p1.prerelease.localeCompare(p2.prerelease) as -1 | 0 | 1;
  }

  return 0;
}

export function bumpSemver(version: string, type: 'major' | 'minor' | 'patch'): string {
  const parsed = parseSemver(version);
  if (!parsed.isValid) return version;

  let { major, minor, patch } = parsed;

  if (type === 'major') {
    major++;
    minor = 0;
    patch = 0;
  } else if (type === 'minor') {
    minor++;
    patch = 0;
  } else if (type === 'patch') {
    patch++;
  }

  return `${major}.${minor}.${patch}`;
}
