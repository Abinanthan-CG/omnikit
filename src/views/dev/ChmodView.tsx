import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { parseChmodOctal, parseChmodFlags, PermissionGroup } from '../../engines/dev/chmodTools';

export const ChmodView: React.FC = () => {
  const [octalInput, setOctalInput] = useState('755');
  const [flags, setFlags] = useState<{ owner: PermissionGroup; group: PermissionGroup; others: PermissionGroup }>({
    owner: { read: true, write: true, execute: true },
    group: { read: true, write: false, execute: true },
    others: { read: true, write: false, execute: true },
  });

  const handleOctalChange = (val: string) => {
    setOctalInput(val);
    const parsed = parseChmodOctal(val);
    if (parsed.success) {
      setFlags({ owner: parsed.owner, group: parsed.group, others: parsed.others });
    }
  };

  const toggleFlag = (target: 'owner' | 'group' | 'others', perm: 'read' | 'write' | 'execute') => {
    const next = {
      ...flags,
      [target]: { ...flags[target], [perm]: !flags[target][perm] },
    };
    setFlags(next);
    const res = parseChmodFlags(next);
    setOctalInput(res.octal);
  };

  const parsed = parseChmodFlags(flags);

  return (
    <ToolShell
      title="Linux Chmod Calculator"
      category="dev"
      description="Calculate file permissions between octal (755, 644) and symbolic (rwxr-xr-x) notations."
      icon="🛡️"
      onReset={() => handleOctalChange('755')}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
            <span className="text-xs text-neutral-400 font-semibold">Octal Notation</span>
            <input
              type="text"
              maxLength={4}
              value={octalInput}
              onChange={(e) => handleOctalChange(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-3xl font-black font-mono text-emerald-400 focus:outline-none"
            />
          </div>

          <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-400 font-semibold">Symbolic & Command</span>
              <CopyButton text={parsed.command} />
            </div>
            <div className="text-2xl font-bold font-mono text-neutral-200">{parsed.symbolic}</div>
            <div className="text-xs text-neutral-500 font-mono select-all bg-neutral-900 p-2 rounded">
              {parsed.command}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4 bg-neutral-950 border border-neutral-800 rounded-xl">
          {(['owner', 'group', 'others'] as const).map(scope => (
            <div key={scope} className="space-y-3">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono border-b border-neutral-800 pb-1">
                {scope}
              </div>
              {(['read', 'write', 'execute'] as const).map(perm => (
                <label key={perm} className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={flags[scope][perm]}
                    onChange={() => toggleFlag(scope, perm)}
                    className="rounded bg-neutral-900 border-neutral-800 text-emerald-500"
                  />
                  {perm} ({perm === 'read' ? '4' : perm === 'write' ? '2' : '1'})
                </label>
              ))}
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
};
