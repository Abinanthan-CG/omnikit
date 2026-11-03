import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { decodeJwt } from '../../engines/dev/jwtTools';

const SAMPLE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIFNtaXRoIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxODkzNDU2MDAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export const JwtView: React.FC = () => {
  const [token, setToken] = useState(SAMPLE_JWT);

  const result = decodeJwt(token);

  return (
    <ToolShell
      title="JWT Token Inspector"
      category="dev"
      description="Inspect JWT headers and payloads safely client-side without sending tokens to any remote server."
      icon="🎫"
      onReset={() => setToken('')}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs text-neutral-400 mb-1">Encoded JWT String</label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            rows={3}
            placeholder="Paste JWT here..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-100 font-mono focus:outline-none focus:border-emerald-500 break-all"
          />
        </div>

        {result.success ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                result.isExpired ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {result.isExpired ? 'Expired' : 'Active / Valid Expiration'}
              </span>
              {result.expiresAt && (
                <span className="text-xs text-neutral-400 font-mono">
                  Expires: {result.expiresAt.toLocaleString()}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-rose-400 font-mono">Header (Algorithm & Type)</span>
                  <CopyButton text={JSON.stringify(result.header, null, 2)} />
                </div>
                <pre className="font-mono text-xs text-neutral-200 bg-neutral-900/50 p-3 rounded overflow-x-auto">
                  {JSON.stringify(result.header, null, 2)}
                </pre>
              </div>

              <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-sky-400 font-mono">Payload (Claims & Data)</span>
                  <CopyButton text={JSON.stringify(result.payload, null, 2)} />
                </div>
                <pre className="font-mono text-xs text-neutral-200 bg-neutral-900/50 p-3 rounded overflow-x-auto">
                  {JSON.stringify(result.payload, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400">
            {result.error}
          </div>
        )}
      </div>
    </ToolShell>
  );
};
