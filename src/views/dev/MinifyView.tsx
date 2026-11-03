import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { minifyCss, minifyHtml } from '../../engines/dev/minifyTools';

export const MinifyView: React.FC = () => {
  const [lang, setLang] = useState<'css' | 'html'>('css');
  const [input, setInput] = useState(
    '/* Primary Stylesheet */\n.hero-card {\n  background-color: #0a0a0a;\n  color: #10b981;\n  padding: 24px;\n  border-radius: 12px;\n}'
  );

  const minified = lang === 'css' ? minifyCss(input) : minifyHtml(input);

  const savedChars = Math.max(0, input.length - minified.length);
  const percentSaved = input.length > 0 ? Math.round((savedChars / input.length) * 100) : 0;

  return (
    <ToolShell
      title="HTML & CSS Code Minifier"
      category="dev"
      description="Compress CSS and HTML files by stripping comments, redundant spaces, and trailing semicolons."
      icon="🗜️"
      onReset={() => {
        setInput('');
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setLang('css');
                setInput('/* Style */\n.container {\n  display: flex;\n  gap: 16px;\n}');
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all border ${
                lang === 'css'
                  ? 'bg-neutral-800 border-neutral-600 text-emerald-400 font-bold'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400'
              }`}
            >
              CSS Minifier
            </button>
            <button
              onClick={() => {
                setLang('html');
                setInput('<div class="app">\n  <!-- Content -->\n  <h1>Omnikit</h1>\n</div>');
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all border ${
                lang === 'html'
                  ? 'bg-neutral-800 border-neutral-600 text-emerald-400 font-bold'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400'
              }`}
            >
              HTML Minifier
            </button>
          </div>

          <span className="text-xs font-mono text-emerald-400">
            Saved {savedChars} bytes ({percentSaved}%)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-2">Original Code</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono resize-y focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono text-neutral-400">Minified Code</label>
              <CopyButton text={minified} label="Copy Minified" />
            </div>
            <textarea
              readOnly
              value={minified}
              rows={12}
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl p-3 text-sm text-emerald-400 font-mono resize-y focus:outline-none"
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
