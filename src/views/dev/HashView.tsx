import React, { useState, useEffect } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateSha256, generateSha512, generateSha1, generateMd5 } from '../../engines/dev/hashTools';

export const HashView: React.FC = () => {
  const [text, setText] = useState('Omnikit Universal Toolkit');
  const [sha256, setSha256] = useState('');
  const [sha512, setSha512] = useState('');
  const [sha1, setSha1] = useState('');
  const [md5, setMd5] = useState('');

  useEffect(() => {
    generateSha256(text).then(setSha256);
    generateSha512(text).then(setSha512);
    generateSha1(text).then(setSha1);
    setMd5(generateMd5(text));
  }, [text]);

  const HASHES = [
    { name: 'SHA-256', val: sha256, bits: '256-bit secure hash' },
    { name: 'MD5', val: md5, bits: '128-bit checksum' },
    { name: 'SHA-1', val: sha1, bits: '160-bit hash (legacy)' },
    { name: 'SHA-512', val: sha512, bits: '512-bit high-security' },
  ];

  return (
    <ToolShell
      title="Cryptographic Hash Generator"
      category="dev"
      description="Compute client-side cryptographic digests (SHA-256, MD5, SHA-1, SHA-512) via Web Crypto."
      icon="#️⃣"
      onReset={() => setText('')}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs text-neutral-400 mb-1">Plaintext String</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Type or paste text to hash..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        <div className="space-y-3">
          {HASHES.map((h) => (
            <div key={h.name} className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-lg space-y-1 hover:border-neutral-700 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400 font-mono">{h.name} <span className="text-neutral-500 font-normal">({h.bits})</span></span>
                <CopyButton text={h.val} />
              </div>
              <div className="font-mono text-xs text-neutral-200 break-all select-all bg-neutral-900/40 p-2 rounded">
                {h.val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
};
