import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { formatXml } from '../../engines/dev/xmlTools';

const SAMPLE_XML = `<bookstore><book category="cooking"><title lang="en">Everyday Italian</title><author>Giada De Laurentiis</author><year>2005</year><price>30.00</price></book></bookstore>`;

export const XmlView: React.FC = () => {
  const [xml, setXml] = useState(SAMPLE_XML);
  const [indent, setIndent] = useState(2);
  const [minify, setMinify] = useState(false);

  const formatted = formatXml(xml, { indent, minify });

  return (
    <ToolShell
      title="XML Formatter & Minifier"
      category="dev"
      description="Beautify, indent, clean, and minify XML, SVG, and HTML markup strings."
      icon="📄"
      onReset={() => setXml(SAMPLE_XML)}
    >
      <div className="space-y-6">
        <div className="flex gap-4 items-center text-xs text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Indent:</span>
            <button
              onClick={() => { setIndent(2); setMinify(false); }}
              className={`px-2.5 py-1 rounded ${indent === 2 && !minify ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-neutral-900'}`}
            >
              2 Spaces
            </button>
            <button
              onClick={() => { setIndent(4); setMinify(false); }}
              className={`px-2.5 py-1 rounded ${indent === 4 && !minify ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-neutral-900'}`}
            >
              4 Spaces
            </button>
            <button
              onClick={() => setMinify(true)}
              className={`px-2.5 py-1 rounded ${minify ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-neutral-900'}`}
            >
              Minify
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs text-neutral-400 mb-1">XML / HTML Markup</label>
          <textarea
            value={xml}
            onChange={(e) => setXml(e.target.value)}
            rows={5}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-100 font-mono focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-neutral-400 font-semibold font-mono">Formatted XML</span>
            <CopyButton text={formatted} />
          </div>
          <pre className="font-mono text-xs text-emerald-400 bg-neutral-900/50 p-3 rounded overflow-x-auto leading-relaxed max-h-80">
            {formatted}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};
