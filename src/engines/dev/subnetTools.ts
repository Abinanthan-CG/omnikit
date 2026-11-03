export interface SubnetResult {
  ip: string;
  cidr: number;
  netmask: string;
  wildcard: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableIp: string;
  lastUsableIp: string;
  totalHosts: number;
  usableHosts: number;
}

function ipToLong(ip: string): number {
  return ip.split('.').reduce((acc, octet) => ((acc << 8) + parseInt(octet, 10)) >>> 0, 0);
}

function longToIp(long: number): string {
  return [
    (long >>> 24) & 255,
    (long >>> 16) & 255,
    (long >>> 8) & 255,
    long & 255
  ].join('.');
}

export function calculateSubnet(ipStr: string, cidrBits: number): SubnetResult {
  const cidr = Math.max(0, Math.min(32, cidrBits || 24));
  const cleanIp = (ipStr || '192.168.1.1').trim();

  const ipLong = ipToLong(cleanIp);
  const maskLong = cidr === 0 ? 0 : ((0xFFFFFFFF << (32 - cidr)) >>> 0);
  const wildcardLong = (~maskLong) >>> 0;

  const networkLong = (ipLong & maskLong) >>> 0;
  const broadcastLong = (networkLong | wildcardLong) >>> 0;

  const totalHosts = Math.pow(2, 32 - cidr);
  const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

  const firstUsable = cidr >= 31 ? networkLong : networkLong + 1;
  const lastUsable = cidr >= 31 ? broadcastLong : broadcastLong - 1;

  return {
    ip: cleanIp,
    cidr,
    netmask: longToIp(maskLong),
    wildcard: longToIp(wildcardLong),
    networkAddress: longToIp(networkLong),
    broadcastAddress: longToIp(broadcastLong),
    firstUsableIp: longToIp(firstUsable),
    lastUsableIp: longToIp(lastUsable),
    totalHosts,
    usableHosts
  };
}
