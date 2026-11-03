import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';

const SAMPLE_MD = `# Omnikit Live Notes

Welcome to the **Markdown Live Editor**!

- ⚡ 100% Client-side
- 🔒 Zero tracking
- 🚀 Instant rendering

> "The true Swiss Army knife is always in your pocket."

### Code Block
\`\`\`ts
const add = (a: number, b: number) => a + b;
\`\`\`
`;

export const MarkdownPreviewView: React.FC = () => {
  const [markdown, setMarkdown] = useState(SAMPLE_MD);

  // Lightweight safe client-side markdown to HTML renderer
  const renderSimpleHtml = (md: string) => {
    let html = md
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-neutral-100 mt-3 mb-1">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-neutral-100 mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold text-emerald-400 mt-2 mb-3">$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-2 border-emerald-500 pl-3 my-2 text-neutral-300 italic">$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-neutral-100 font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="text-neutral-300">$1</em>')
      .replace(/`([^`]+)`/gim, '<code class="bg-neutral-800 text-emerald-400 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-neutral-300">$1</li>')
      .replace(/\n\n/gim, '<div class="h-2"></div>');

    return html;
  };

  const previewHtml = renderSimpleHtml(markdown);

  return (
    <ToolShell
      title="Markdown Live Preview"
      category="writing"
      description="Write Markdown notes with side-by-side formatted live preview and instant export."
      icon="📝"
      onReset={() => setMarkdown(SAMPLE_MD)}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs text-neutral-400 font-semibold">Markdown Source</label>
              <CopyButton text={markdown} label="Copy Raw MD" />
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              rows={12}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-100 font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs text-neutral-400 font-semibold">Live Preview</label>
            </div>
            <div
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded-lg p-4 min-h-[250px] text-xs text-neutral-200 overflow-y-auto leading-relaxed"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
