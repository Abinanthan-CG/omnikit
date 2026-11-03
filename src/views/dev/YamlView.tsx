import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { jsonToYaml, yamlToJson } from '../../engines/dev/yamlTools';

const SAMPLE_YAML = `name: Omnikit
version: 1.0.0
description: Universal Swiss Army Knife
features:
  - client-side
  - fast
  - private`;

export const YamlView: React.FC = () => {
  const [input, setInput] = useState(SAMPLE_YAML);
  const [direction, setDirection] = useState<'yaml2json' | 'json2yaml'>('yaml2json');

  let output = '';
  let error = '';

  try {
    if (direction === 'yaml2json') {
      output = yamlToJson(input);
    } else {
      output = jsonToYaml(input);
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Conversion error';
  }

  return (
    <ToolShell
      title="YAML & JSON Bidirectional Converter"
      category="dev"
      description="Convert structured configurations smoothly between YAML and JSON syntax."
      icon="🔄"
      onReset={() => setInput(SAMPLE_YAML)}
    >
      <div className="space-y-6">
        <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-800 w-fit">
          <button
            onClick={() => setDirection('yaml2json')}
            className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
              direction === 'yaml2json' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            YAML → JSON
          </button>
          <button
            onClick={() => setDirection('json2yaml')}
            className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
              direction === 'json2yaml' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            JSON → YAML
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">
              {direction === 'yaml2json' ? 'Input YAML' : 'Input JSON'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-100 font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-neutral-400">
                {direction === 'yaml2json' ? 'Output JSON' : 'Output YAML'}
              </label>
              {output && <CopyButton text={output} />}
            </div>
            {error ? (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 font-mono">
                {error}
              </div>
            ) : (
              <textarea
                readOnly
                value={output}
                rows={10}
                className="w-full bg-neutral-950/80 border border-neutral-800 rounded-lg p-3 text-xs text-emerald-400 font-mono focus:outline-none select-all"
              />
            )}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
