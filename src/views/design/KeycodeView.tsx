import React, { useState, useEffect } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { getKeyInfo, KeyInfo } from '../../engines/design/keycodeTools';

export const KeycodeView: React.FC = () => {
  const [keyInfo, setKeyInfo] = useState<KeyInfo>({
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    description: 'Return / Enter key',
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      const info = getKeyInfo(e.key, e.code, e.keyCode);
      info.shiftKey = e.shiftKey;
      info.ctrlKey = e.ctrlKey;
      info.altKey = e.altKey;
      info.metaKey = e.metaKey;
      setKeyInfo(info);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ToolShell
      title="Keyboard Keycode Inspector"
      category="design"
      description="Press any key on your keyboard to instantly inspect JavaScript keycodes and event properties."
      icon="⌨️"
      onReset={() => setKeyInfo({
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        which: 13,
        description: 'Return / Enter key',
      })}
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center p-8 bg-neutral-950/70 border border-neutral-800 rounded-2xl space-y-2 text-center">
          <div className="text-6xl font-black font-mono text-emerald-400">
            {keyInfo.keyCode}
          </div>
          <div className="text-xs text-neutral-400 uppercase tracking-widest">
            event.keyCode / event.which
          </div>
          <div className="text-xs text-neutral-500 pt-2">
            Press any physical key on your keyboard right now
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
            <span className="text-[10px] text-neutral-500 font-mono uppercase">event.key</span>
            <div className="text-lg font-bold font-mono text-neutral-100 truncate">{keyInfo.key === ' ' ? '(Space)' : keyInfo.key}</div>
            <CopyButton text={keyInfo.key} />
          </div>

          <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
            <span className="text-[10px] text-neutral-500 font-mono uppercase">event.code</span>
            <div className="text-lg font-bold font-mono text-neutral-100 truncate">{keyInfo.code}</div>
            <CopyButton text={keyInfo.code} />
          </div>

          <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
            <span className="text-[10px] text-neutral-500 font-mono uppercase">Modifiers</span>
            <div className="flex gap-1 flex-wrap pt-1">
              {keyInfo.shiftKey && <span className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] rounded text-emerald-400 font-mono">Shift</span>}
              {keyInfo.ctrlKey && <span className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] rounded text-emerald-400 font-mono">Ctrl</span>}
              {keyInfo.altKey && <span className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] rounded text-emerald-400 font-mono">Alt</span>}
              {keyInfo.metaKey && <span className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] rounded text-emerald-400 font-mono">Meta</span>}
              {!keyInfo.shiftKey && !keyInfo.ctrlKey && !keyInfo.altKey && !keyInfo.metaKey && (
                <span className="text-xs text-neutral-500">None</span>
              )}
            </div>
          </div>

          <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
            <span className="text-[10px] text-neutral-500 font-mono uppercase">Description</span>
            <div className="text-xs text-neutral-300 font-sans pt-1 leading-relaxed">{keyInfo.description}</div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
