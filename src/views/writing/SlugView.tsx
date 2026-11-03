import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { slugify } from '../../engines/writing/slugTools';

export const SlugView: React.FC = () => {
  const [text, setText] = useState('Top 10 High-Efficiency Tools in 2026!');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [lowercase, setLowercase] = useState(true);

  const slug = slugify(text, { separator, lowercase });

  return (
    <ToolShell
      title="URL Slug & Filename Normalizer"
      category="writing"
      description="Clean titles and article names into web-standard slugs by removing special characters and accents."
      icon="🏷️"
      onReset={() => setText('')}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs text-neutral-400 mb-1">Source Title / Heading</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste title..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-neutral-100 font-sans focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex gap-4 p-3 bg-neutral-950/70 border border-neutral-800 rounded-lg text-xs">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Separator:</span>
            <button
              onClick={() => setSeparator('-')}
              className={`px-2.5 py-1 rounded font-mono ${separator === '-' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-neutral-400'}`}
            >
              Hyphen (-)
            </button>
            <button
              onClick={() => setSeparator('_')}
              className={`px-2.5 py-1 rounded font-mono ${separator === '_' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-neutral-400'}`}
            >
              Underscore (_)
            </button>
          </div>

          <label className="flex items-center gap-2 text-neutral-300 cursor-pointer ml-auto">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
              className="rounded bg-neutral-900 border-neutral-800 text-emerald-500"
            />
            Lowercase
          </label>
        </div>

        <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-neutral-400 font-semibold">Normalized Slug</span>
            <CopyButton text={slug} />
          </div>
          <div className="text-lg font-mono text-emerald-400 break-all select-all bg-neutral-900/50 p-3 rounded">
            {slug || <span className="text-neutral-600 italic">No output</span>}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
