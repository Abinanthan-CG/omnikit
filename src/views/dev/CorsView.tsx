import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateCorsHeaders } from '../../engines/dev/corsTools';

export const CorsView: React.FC = () => {
  const [origins, setOrigins] = useState('https://app.example.com, https://admin.example.com');
  const [methods, setMethods] = useState('GET, POST, PUT, DELETE, OPTIONS');
  const [headers, setHeaders] = useState('Content-Type, Authorization, X-Requested-With');
  const [credentials, setCredentials] = useState(true);
  const [maxAge, setMaxAge] = useState(86400);

  const res = generateCorsHeaders({
    allowedOrigins: origins.split(',').map((s) => s.trim()).filter(Boolean),
    allowedMethods: methods.split(',').map((s) => s.trim()).filter(Boolean),
    allowedHeaders: headers.split(',').map((s) => s.trim()).filter(Boolean),
    allowCredentials: credentials,
    maxAgeSeconds: maxAge
  });

  return (
    <ToolShell
      title="HTTP CORS Header Generator"
      category="dev"
      description="Generate standard Cross-Origin Resource Sharing (CORS) response headers, Express.js middleware, and Nginx blocks."
      icon="🌐"
      onReset={() => {
        setOrigins('*');
        setMethods('GET, POST, OPTIONS');
        setHeaders('Content-Type, Authorization');
        setCredentials(false);
        setMaxAge(86400);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Allowed Origins (comma-separated or *)</label>
            <input
              type="text"
              value={origins}
              onChange={(e) => setOrigins(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Allowed HTTP Methods</label>
            <input
              type="text"
              value={methods}
              onChange={(e) => setMethods(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Allowed Request Headers</label>
            <input
              type="text"
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-6 pt-5">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-neutral-300">
              <input
                type="checkbox"
                checked={credentials}
                onChange={(e) => setCredentials(e.target.checked)}
                className="rounded accent-emerald-500 w-4 h-4"
              />
              Allow Credentials (Cookies / Auth)
            </label>
            <div>
              <span className="text-xs font-mono text-neutral-500 mr-2">Max Age (s):</span>
              <input
                type="number"
                value={maxAge}
                onChange={(e) => setMaxAge(Number(e.target.value))}
                className="w-20 bg-neutral-950 border border-neutral-800 rounded p-1 text-xs font-mono text-neutral-200"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono text-neutral-400">Raw HTTP Response Headers</label>
            <CopyButton text={res.headerString} label="Copy Headers" />
          </div>
          <pre className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto">
            {res.headerString}
          </pre>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-mono text-neutral-400">Express / Node.js Middleware</label>
              <CopyButton text={res.expressMiddlewareSnippet} label="Copy Express" />
            </div>
            <pre className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-sky-400 overflow-x-auto">
              {res.expressMiddlewareSnippet}
            </pre>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-mono text-neutral-400">Nginx Config Snippet</label>
              <CopyButton text={res.nginxSnippet} label="Copy Nginx" />
            </div>
            <pre className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-purple-400 overflow-x-auto">
              {res.nginxSnippet}
            </pre>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
