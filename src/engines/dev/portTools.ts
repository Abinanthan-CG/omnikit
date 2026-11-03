export interface PortEntry {
  port: number;
  protocol: 'TCP' | 'UDP' | 'TCP/UDP';
  service: string;
  description: string;
}

export const COMMON_PORTS: PortEntry[] = [
  { port: 20, protocol: 'TCP', service: 'FTP-DATA', description: 'File Transfer Protocol (Data Transfer)' },
  { port: 21, protocol: 'TCP', service: 'FTP', description: 'File Transfer Protocol (Command Control)' },
  { port: 22, protocol: 'TCP', service: 'SSH', description: 'Secure Shell, SFTP, and SCP remote login' },
  { port: 23, protocol: 'TCP', service: 'Telnet', description: 'Unencrypted text communications' },
  { port: 25, protocol: 'TCP', service: 'SMTP', description: 'Simple Mail Transfer Protocol (Email Routing)' },
  { port: 53, protocol: 'TCP/UDP', service: 'DNS', description: 'Domain Name System name resolution' },
  { port: 67, protocol: 'UDP', service: 'DHCP', description: 'Dynamic Host Configuration Protocol (Server)' },
  { port: 68, protocol: 'UDP', service: 'DHCP', description: 'Dynamic Host Configuration Protocol (Client)' },
  { port: 80, protocol: 'TCP', service: 'HTTP', description: 'Hypertext Transfer Protocol (Standard Web)' },
  { port: 110, protocol: 'TCP', service: 'POP3', description: 'Post Office Protocol v3 (Email Retrieval)' },
  { port: 123, protocol: 'UDP', service: 'NTP', description: 'Network Time Protocol (Clock Sync)' },
  { port: 143, protocol: 'TCP', service: 'IMAP', description: 'Internet Message Access Protocol' },
  { port: 443, protocol: 'TCP', service: 'HTTPS', description: 'HTTP over TLS/SSL (Encrypted Web)' },
  { port: 465, protocol: 'TCP', service: 'SMTPS', description: 'SMTP over SSL (Secure Email Submission)' },
  { port: 587, protocol: 'TCP', service: 'SMTP Submission', description: 'Modern email client submission' },
  { port: 993, protocol: 'TCP', service: 'IMAPS', description: 'IMAP over TLS/SSL' },
  { port: 995, protocol: 'TCP', service: 'POP3S', description: 'POP3 over TLS/SSL' },
  { port: 1433, protocol: 'TCP', service: 'MSSQL', description: 'Microsoft SQL Server database engine' },
  { port: 1521, protocol: 'TCP', service: 'Oracle', description: 'Oracle database default listener' },
  { port: 3000, protocol: 'TCP', service: 'Dev Server', description: 'Common React, Next.js, Node.js development port' },
  { port: 3306, protocol: 'TCP', service: 'MySQL', description: 'MySQL and MariaDB relational databases' },
  { port: 5000, protocol: 'TCP', service: 'Flask / Dev', description: 'Python Flask, Vite preview, ASP.NET' },
  { port: 5173, protocol: 'TCP', service: 'Vite', description: 'Vite modern dev server default' },
  { port: 5432, protocol: 'TCP', service: 'PostgreSQL', description: 'PostgreSQL relational database' },
  { port: 6379, protocol: 'TCP', service: 'Redis', description: 'Redis in-memory key-value cache' },
  { port: 8000, protocol: 'TCP', service: 'Django / HTTP Dev', description: 'Python Django / FastAPI default port' },
  { port: 8080, protocol: 'TCP', service: 'HTTP Alternate', description: 'Apache Tomcat, Spring Boot, proxy servers' },
  { port: 8443, protocol: 'TCP', service: 'HTTPS Alternate', description: 'Apache Tomcat SSL, secondary web' },
  { port: 9000, protocol: 'TCP', service: 'PHP-FPM / SonarQube', description: 'PHP FastCGI Process Manager' },
  { port: 9200, protocol: 'TCP', service: 'Elasticsearch', description: 'Elasticsearch REST API listener' },
  { port: 27017, protocol: 'TCP', service: 'MongoDB', description: 'MongoDB NoSQL document database' }
];

export function searchPorts(query: string): PortEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return COMMON_PORTS;

  return COMMON_PORTS.filter(p => {
    return (
      String(p.port).includes(q) ||
      p.service.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.protocol.toLowerCase().includes(q)
    );
  });
}
