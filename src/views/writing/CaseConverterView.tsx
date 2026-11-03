import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { getAllCaseVariants } from '../../engines/writing/caseConverter';

export const CaseConverterView: React.FC = () => {
  const [text, setText] = useState('the quick brown fox jumps over the lazy dog');

  const variants = getAllCaseVariants(text);

  const CASE_LIST = [
    { label: 'camelCase', val: variants.camel, desc: 'Variable naming in JS/TS' },
    { label: 'PascalCase', val: variants.pascal, desc: 'Classes and React components' },
    { label: 'kebab-case', val: variants.kebab, desc: 'URL slugs and CSS classes' },
    { label: 'snake_case', val: variants.snake, desc: 'Python variables and database fields' },
    { label: 'CONSTANT_CASE', val: variants.constant, desc: 'Global constants and environment vars' },
    { label: 'Title Case', val: variants.title, desc: 'Headlines preserving minor prepositions' },
    { label: 'Sentence case', val: variants.sentence, desc: 'Standard prose capitalization' },
    { label: 'lowercase', val: variants.lower, desc: 'All lower letters' },
    { label: 'UPPERCASE', val: variants.upper, desc: 'All capital letters' },
  ];

  return (
    <ToolShell
      title="Multi-Style Case Converter"
      category="writing"
      description="Instantly convert copy, headings, and code identifiers between 9 standard casing conventions."
      icon="✍️"
      onReset={() => setText('')}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs text-neutral-400 mb-1">Input Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Type or paste text here to convert..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 font-sans"
          />
        </div>

        {/* Results grid */}
        <div className="space-y-2.5">
          {CASE_LIST.map((c) => (
            <div
              key={c.label}
              className="p-3 rounded-lg bg-neutral-950/70 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-neutral-700 transition-colors"
            >
              <div className="min-w-[130px]">
                <div className="text-xs font-semibold text-emerald-400 font-mono">{c.label}</div>
                <div className="text-[10px] text-neutral-500">{c.desc}</div>
              </div>

              <div className="flex-1 font-mono text-sm text-neutral-200 select-all truncate px-2">
                {c.val || <span className="text-neutral-600 italic">Empty output</span>}
              </div>

              {c.val && <CopyButton text={c.val} />}
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
};
