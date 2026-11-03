import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { markdownToHtml, htmlToMarkdown } from '../../engines/dev/mdHtmlTools';

export const MdHtmlView: React.FC = () => {
  const [mode, setMode] = useState<'md2html' | 'html2md'>('md2html');
  const [input, setInput] = useState(
    '# Omnikit Utility\n\nThis is a **high performance** client-side tool.\n\n* Privacy first\n* 100% offline\n\nVisit [Omnikit](https://abinanthan-cg.github.io/omnikit/) today.'
  );

  const output = mode === 'md2html' ? markdownToHtml(input) : htmlToMarkdown(input);

  const switchMode = (newMode: 'md2html' | 'html2md') => {
    if (newMode !== mode) {
      setMode(newMode);
      setInput(output);
    }
  };

  return (
    <ToolShell
      title="Markdown ↔ HTML Converter"
      category="dev"
      description="Convert bidirectionally between Markdown content and clean HTML tags."
      icon="📄"
      onReset={() => {
        setInput('');
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => switchMode('md2html')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
              mode === 'md2html' ? 'bg-neutral-800 text-neutral-100 font-semibold border border-neutral-700' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Markdown → HTML
          </button>
          <button
            onClick={() => switchMode('html2md')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
              mode === 'html2md' ? 'bg-neutral-800 text-neutral-100 font-semibold border border-neutral-700' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            HTML → Markdown
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-2">
              {mode === 'md2html' ? 'Markdown Source' : 'HTML Source'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono resize-y focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono text-neutral-400">
                {mode === 'md2html' ? 'Generated HTML' : 'Generated Markdown'}
              </label>
              <CopyButton text={output} label="Copy Output" />
            </div>
            <textarea
              readOnly
              value={output}
              rows={12}
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl p-3 text-sm text-emerald-400 font-mono resize-y focus:outline-none"
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
