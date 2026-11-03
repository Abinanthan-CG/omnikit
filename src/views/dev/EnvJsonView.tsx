import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { envToJson, jsonToEnv } from '../../engines/dev/envJsonTools';

const SAMPLE_ENV = `PORT=8080
DATABASE_URL=postgres://user:secret@localhost:5432/omnikit
# Logging configuration
LOG_LEVEL=debug
ENABLE_TELEMETRY=false
APP_NAME="Omnikit Developer Suite"`;

export const EnvJsonView: React.FC = () => {
  const [direction, setDirection] = useState<'env2json' | 'json2env'>('env2json');
  const [inputVal, setInputVal] = useState(SAMPLE_ENV);

  let outputVal = '';
  let errorMsg = '';

  try {
    if (direction === 'env2json') {
      const obj = envToJson(inputVal);
      outputVal = JSON.stringify(obj, null, 2);
    } else {
      const parsed = JSON.parse(inputVal);
      outputVal = jsonToEnv(parsed);
    }
  } catch (err: unknown) {
    errorMsg = err instanceof Error ? err.message : String(err);
  }

  const toggleDirection = () => {
    if (outputVal && !errorMsg) {
      setInputVal(outputVal);
      setDirection(direction === 'env2json' ? 'json2env' : 'env2json');
    }
  };

  return (
    <ToolShell
      title="Environment Variables (.env) ↔ JSON Converter"
      category="dev"
      description="Convert bidirectionally between standard .env config files and structured JSON configuration objects."
      icon="⚙️"
      onReset={() => {
        setInputVal(SAMPLE_ENV);
        setDirection('env2json');
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setDirection('env2json')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                direction === 'env2json' ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              .env ➔ JSON
            </button>
            <button
              onClick={() => setDirection('json2env')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                direction === 'json2env' ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              JSON ➔ .env
            </button>
          </div>
          <button
            onClick={toggleDirection}
            className="text-xs font-mono text-emerald-400 hover:underline"
          >
            ⇄ Swap Input & Output
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-2">
              {direction === 'env2json' ? '.env Key-Value Input' : 'JSON Object Input'}
            </label>
            <textarea
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              rows={12}
              placeholder={direction === 'env2json' ? 'KEY=value...' : '{"KEY": "value"}...'}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-100 font-mono resize-y focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-mono text-neutral-400">
                {direction === 'env2json' ? 'Converted JSON' : 'Converted .env Lines'}
              </label>
              {outputVal && <CopyButton text={outputVal} label="Copy Output" />}
            </div>
            {errorMsg ? (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-mono">
                {errorMsg}
              </div>
            ) : (
              <textarea
                readOnly
                value={outputVal}
                rows={12}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-emerald-400 font-mono resize-y focus:outline-none"
              />
            )}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
