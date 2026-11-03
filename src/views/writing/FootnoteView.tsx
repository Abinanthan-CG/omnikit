import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateFootnotes, FootnoteEntry } from '../../engines/writing/footnoteTools';

const DEFAULT_NOTES: FootnoteEntry[] = [
  { id: '1', label: '1', text: 'Shannon, C. E. (1948). A Mathematical Theory of Communication.' },
  { id: '2', label: 'privacy', text: 'All operations execute in local browser memory with zero network transfers.' }
];

export const FootnoteView: React.FC = () => {
  const [bodyText, setBodyText] = useState(
    'Omnikit is built upon foundational information theory[^1]. Every micro-tool prioritizes absolute user data sovereignty[^privacy].'
  );
  const [footnotes, setFootnotes] = useState<FootnoteEntry[]>(DEFAULT_NOTES);

  const res = generateFootnotes(bodyText, footnotes);

  const addNote = () => {
    const nextId = String(footnotes.length + 1);
    setFootnotes([...footnotes, { id: nextId, label: nextId, text: '' }]);
  };

  const updateNote = (index: number, field: keyof FootnoteEntry, val: string) => {
    const updated = [...footnotes];
    updated[index] = { ...updated[index], [field]: val };
    setFootnotes(updated);
  };

  const removeNote = (index: number) => {
    setFootnotes(footnotes.filter((_, i) => i !== index));
  };

  return (
    <ToolShell
      title="Markdown Footnote & Citation Builder"
      category="writing"
      description="Format academic footnotes, reference citations, and bibliography markers according to GitHub Flavored Markdown."
      icon="📑"
      onReset={() => {
        setBodyText('');
        setFootnotes([]);
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Markdown Article Body</label>
          <textarea
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            rows={4}
            placeholder="Write your prose with footnote markers like [^1] or [^note]..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-100 font-sans resize-y focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono text-neutral-400">Footnotes & Citations</label>
            <button
              onClick={addNote}
              className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-200 rounded-lg transition-colors"
            >
              + Add Citation
            </button>
          </div>

          <div className="space-y-2">
            {footnotes.map((fn, idx) => (
              <div key={fn.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={fn.label}
                  onChange={(e) => updateNote(idx, 'label', e.target.value)}
                  placeholder="label"
                  className="w-24 bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-emerald-400 font-mono text-center focus:outline-none"
                />
                <input
                  type="text"
                  value={fn.text}
                  onChange={(e) => updateNote(idx, 'text', e.target.value)}
                  placeholder="Citation source, authors, or link..."
                  className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-neutral-100 font-sans focus:outline-none"
                />
                <button
                  onClick={() => removeNote(idx)}
                  className="p-2 text-neutral-500 hover:text-rose-400 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono text-neutral-400">Complete Markdown Output</label>
            <CopyButton text={res.markdownDocument} label="Copy Complete Markdown" />
          </div>
          <textarea
            readOnly
            value={res.markdownDocument}
            rows={7}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-200 font-mono resize-y focus:outline-none"
          />
        </div>
      </div>
    </ToolShell>
  );
};
