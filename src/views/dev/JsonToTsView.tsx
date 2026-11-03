import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { jsonToTypeScript } from '../../engines/dev/jsonToTsTools';

const SAMPLE_JSON = `{
  "id": "tool_1024",
  "name": "Omnikit Engine",
  "version": 2.5,
  "isActive": true,
  "tags": ["offline", "privacy", "tools"],
  "metadata": {
    "author": "Antigravity",
    "stars": 1250,
    "license": "MIT"
  }
}`;

export const JsonToTsView: React.FC = () => {
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [rootName, setRootName] = useState('ToolConfig');
  const [useType, setUseType] = useState(false);

  let generatedTs = '';
  let errorMsg = '';

  try {
    generatedTs = jsonToTypeScript(jsonInput, { rootInterfaceName: rootName, useTypeAlias: useType });
  } catch (err: unknown) {
    errorMsg = err instanceof Error ? err.message : String(err);
  }

  return (
    <ToolShell
      title="JSON to TypeScript Interface Generator"
      category="dev"
      description="Infer typed TypeScript interfaces and nested types directly from raw JSON objects or arrays."
      icon="🔷"
      onReset={() => {
        setJsonInput(SAMPLE_JSON);
        setRootName('ToolConfig');
        setUseType(false);
      }}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">Root Identifier</label>
              <input
                type="text"
                value={rootName}
                onChange={(e) => setRootName(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs font-mono text-neutral-200"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setUseType(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                !useType ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              interface
            </button>
            <button
              onClick={() => setUseType(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                useType ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              type alias
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-2">Input JSON</label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              rows={14}
              placeholder="Paste JSON here..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-100 font-mono resize-y focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-mono text-neutral-400">Generated TypeScript</label>
              {generatedTs && <CopyButton text={generatedTs} label="Copy TypeScript" />}
            </div>
            {errorMsg ? (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-mono">
                {errorMsg}
              </div>
            ) : (
              <textarea
                readOnly
                value={generatedTs}
                rows={14}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-sky-400 font-mono resize-y focus:outline-none"
              />
            )}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
