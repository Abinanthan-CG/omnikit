export interface HtaccessRule {
  type: 'redirect301' | 'redirect302' | 'forceHttps' | 'removeTrailingSlash' | 'customRewrite';
  sourcePath?: string;
  targetUrl?: string;
}

export function generateHtaccess(rules: HtaccessRule[]): string {
  const lines: string[] = ['<IfModule mod_rewrite.c>', 'RewriteEngine On', 'RewriteBase /'];

  for (const r of rules) {
    if (r.type === 'forceHttps') {
      lines.push('');
      lines.push('# Force HTTPS');
      lines.push('RewriteCond %{HTTPS} off');
      lines.push('RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]');
    } else if (r.type === 'removeTrailingSlash') {
      lines.push('');
      lines.push('# Remove trailing slash');
      lines.push('RewriteCond %{REQUEST_FILENAME} !-d');
      lines.push('RewriteRule ^(.*)/$ /$1 [L,R=301]');
    } else if (r.type === 'redirect301') {
      const src = r.sourcePath || '/old-page';
      const tgt = r.targetUrl || '/new-page';
      lines.push('');
      lines.push(`Redirect 301 ${src} ${tgt}`);
    } else if (r.type === 'redirect302') {
      const src = r.sourcePath || '/temp-page';
      const tgt = r.targetUrl || '/maintenance';
      lines.push('');
      lines.push(`Redirect 302 ${src} ${tgt}`);
    } else if (r.type === 'customRewrite') {
      const src = r.sourcePath || '^blog/([0-9]+)$';
      const tgt = r.targetUrl || 'index.php?post_id=$1 [L,QSA]';
      lines.push('');
      lines.push(`RewriteRule ${src} ${tgt}`);
    }
  }

  lines.push('');
  lines.push('</IfModule>');

  return lines.join('\n');
}
