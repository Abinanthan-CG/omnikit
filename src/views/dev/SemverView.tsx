import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { parseSemver, compareSemver, bumpSemver } from '../../engines/dev/semverTools';

export const SemverView: React.FC = () => {
  const [versionA, setVersionA] = useState('1.4.2');
  const [versionB, setVersionB] = useState('2.0.0-rc.1');

  const pA = parseSemver(versionA);
  const comp = compareSemver(versionA, versionB);

  return (
    <ToolShell
      title="Semantic Versioning (SemVer) Inspector & Bumper"
      category="dev"
      description="Parse version strings, compare precedence between release versions, and calculate major/minor/patch increments."
      icon="🏷️"
      onReset={() => {
        setVersionA('1.4.2');
        setVersionB('2.0.0-rc.1');
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Version A</label>
            <input
              type="text"
              value={versionA}
              onChange={(e) => setVersionA(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none focus:border-neutral-600"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Version B</label>
            <input
              type="text"
              value={versionB}
              onChange={(e) => setVersionB(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none focus:border-neutral-600"
            />
          </div>
        </div>

        <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl flex items-center justify-between">
          <span className="text-xs text-neutral-500 font-mono">Precedence Comparison</span>
          <div className="text-sm font-bold font-mono">
            {comp === 1 ? (
              <span className="text-emerald-400">{versionA} &gt; {versionB} (Version A is newer)</span>
            ) : comp === -1 ? (
              <span className="text-sky-400">{versionA} &lt; {versionB} (Version B is newer)</span>
            ) : (
              <span className="text-amber-400">{versionA} == {versionB} (Equal Precedence)</span>
            )}
          </div>
        </div>

        {pA.isValid && (
          <div className="p-4 bg-neutral-950/60 border border-neutral-800 rounded-xl space-y-4">
            <span className="text-xs text-neutral-400 font-mono">Version A Increments</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['major', 'minor', 'patch'] as const).map((type) => {
                const bumped = bumpSemver(versionA, type);
                return (
                  <div key={type} className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-neutral-500 font-mono capitalize">{type}</span>
                      <CopyButton text={bumped} label="Copy" />
                    </div>
                    <div className="text-base font-bold font-mono text-emerald-400">{bumped}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
};
