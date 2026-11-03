import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateHtaccess, HtaccessRule } from '../../engines/dev/htaccessTools';

export const HtaccessView: React.FC = () => {
  const [forceHttps, setForceHttps] = useState(true);
  const [removeTrailingSlash, setRemoveTrailingSlash] = useState(true);
  const [sourceRedirect, setSourceRedirect] = useState('/old-blog-post');
  const [targetRedirect, setTargetRedirect] = useState('/articles/modern-web');

  const rules: HtaccessRule[] = [];
  if (forceHttps) rules.push({ type: 'forceHttps' });
  if (removeTrailingSlash) rules.push({ type: 'removeTrailingSlash' });
  if (sourceRedirect && targetRedirect) {
    rules.push({ type: 'redirect301', sourcePath: sourceRedirect, targetUrl: targetRedirect });
  }

  const output = generateHtaccess(rules);

  return (
    <ToolShell
      title="Apache .htaccess Redirect & Rewrite Generator"
      category="dev"
      description="Generate standard mod_rewrite rules for HTTPS redirection, trailing slash normalization, and 301 permanent redirects."
      icon="📄"
      onReset={() => {
        setForceHttps(true);
        setRemoveTrailingSlash(true);
        setSourceRedirect('/old-page');
        setTargetRedirect('/new-page');
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={forceHttps}
              onChange={(e) => setForceHttps(e.target.checked)}
              className="rounded accent-emerald-500 w-4 h-4"
            />
            <div>
              <div className="text-xs font-semibold text-neutral-200">Force HTTPS Redirection</div>
              <div className="text-[11px] text-neutral-500">Redirect insecure http:// to https://</div>
            </div>
          </label>

          <label className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={removeTrailingSlash}
              onChange={(e) => setRemoveTrailingSlash(e.target.checked)}
              className="rounded accent-emerald-500 w-4 h-4"
            />
            <div>
              <div className="text-xs font-semibold text-neutral-200">Strip Trailing Slashes</div>
              <div className="text-[11px] text-neutral-500">Normalize /path/ to /path for SEO</div>
            </div>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">301 Source Path</label>
            <input
              type="text"
              value={sourceRedirect}
              onChange={(e) => setSourceRedirect(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">301 Target URL</label>
            <input
              type="text"
              value={targetRedirect}
              onChange={(e) => setTargetRedirect(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono text-neutral-400">Generated .htaccess Configuration</label>
            <CopyButton text={output} label="Copy .htaccess" />
          </div>
          <textarea
            readOnly
            value={output}
            rows={10}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-emerald-400 font-mono resize-y focus:outline-none"
          />
        </div>
      </div>
    </ToolShell>
  );
};
