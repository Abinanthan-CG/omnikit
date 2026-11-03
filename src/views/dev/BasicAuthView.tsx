import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateBasicAuth, decodeBasicAuth } from '../../engines/dev/basicAuthTools';

export const BasicAuthView: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('secret123');

  const [inputHeader, setInputHeader] = useState('');
  const [decoded, setDecoded] = useState<{ username: string; password: string } | null>(null);

  const auth = generateBasicAuth(username, password);

  const handleDecode = () => {
    setDecoded(decodeBasicAuth(inputHeader));
  };

  return (
    <ToolShell
      title="HTTP Basic Auth Generator & Decoder"
      category="dev"
      description="Generate standard HTTP Authorization Basic header tokens or decode incoming authorization headers."
      icon="🔐"
      onReset={() => {
        setUsername('admin');
        setPassword('');
        setInputHeader('');
        setDecoded(null);
      }}
    >
      <div className="space-y-6">
        {/* Generator Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">1. Generate Header</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">Username / Client ID</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">Password / API Secret</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
              />
            </div>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">HTTP Authorization Header</span>
              <CopyButton text={auth.header} label="Copy Header" />
            </div>
            <pre className="p-3 bg-neutral-900 rounded font-mono text-emerald-400 text-xs select-all">
              {auth.header}
            </pre>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-mono text-neutral-500">Base64 Token: {auth.token}</span>
              <CopyButton text={auth.token} label="Copy Token" />
            </div>
          </div>
        </div>

        {/* Decoder Section */}
        <div className="space-y-4 pt-4 border-t border-neutral-800/80">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">2. Decode Header or Token</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Paste Authorization: Basic ... or base64 token"
              value={inputHeader}
              onChange={(e) => setInputHeader(e.target.value)}
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
            />
            <button
              onClick={handleDecode}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-lg text-xs font-mono transition-colors"
            >
              Decode
            </button>
          </div>

          {decoded && (
            <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-neutral-500">Decoded Username:</span>
                <div className="text-emerald-400 font-semibold mt-0.5">{decoded.username || '(empty)'}</div>
              </div>
              <div>
                <span className="text-neutral-500">Decoded Password:</span>
                <div className="text-emerald-400 font-semibold mt-0.5">{decoded.password || '(empty)'}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolShell>
  );
};
