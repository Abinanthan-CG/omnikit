import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateSchemaFromJson } from '../../engines/dev/schemaTools';

export const SchemaView: React.FC = () => {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        userId: 1042,
        username: 'octocat',
        isActive: true,
        roles: ['admin', 'developer'],
        profile: {
          bio: 'Open source contributor',
          avatarUrl: 'https://github.com/octocat.png'
        }
      },
      null,
      2
    )
  );

  const schema = generateSchemaFromJson(jsonInput);

  return (
    <ToolShell
      title="JSON Schema Inferrer & Generator"
      category="dev"
      description="Infer Draft-07 JSON Schema specifications including types, nested objects, and required fields from JSON."
      icon="📐"
      onReset={() => {
        setJsonInput('{}');
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-2">Sample JSON Data</label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              rows={14}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono resize-y focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono text-neutral-400">Inferred JSON Schema</label>
              <CopyButton text={schema} label="Copy Schema" />
            </div>
            <textarea
              readOnly
              value={schema}
              rows={14}
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl p-3 text-sm text-emerald-400 font-mono resize-y focus:outline-none"
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
