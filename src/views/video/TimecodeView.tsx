import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { calculateTimecodeOperation, SupportedFps } from '../../engines/video/timecode';

const FPS_OPTIONS: SupportedFps[] = [23.976, 24, 25, 29.97, 30, 50, 59.94, 60];

export const TimecodeView: React.FC = () => {
  const [tc1, setTc1] = useState('01:00:00:00');
  const [op, setOp] = useState<'+' | '-'>('+');
  const [tc2, setTc2] = useState('00:05:30:12');
  const [fps, setFps] = useState<SupportedFps>(24);

  const result = calculateTimecodeOperation(tc1, op, tc2, fps);

  const handleReset = () => {
    setTc1('01:00:00:00');
    setOp('+');
    setTc2('00:05:30:12');
    setFps(24);
  };

  return (
    <ToolShell
      title="SMPTE Timecode Calculator"
      category="video"
      description="Add or subtract SMPTE timecodes with frame-accurate drop-frame and non-drop-frame calculations."
      icon="🎬"
      onReset={handleReset}
    >
      <div className="space-y-6">
        {/* Frame Rate Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-neutral-400">Frame Rate:</label>
          <div className="flex flex-wrap gap-1.5">
            {FPS_OPTIONS.map((f) => (
              <button
                key={f}
                onClick={() => setFps(f)}
                className={`px-2.5 py-1 text-xs rounded-md font-mono ${
                  fps === f
                    ? 'bg-emerald-500 text-neutral-950 font-bold'
                    : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {f} fps {f === 29.97 || f === 59.94 ? '(DF)' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Math inputs */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
          <div className="md:col-span-3">
            <label className="block text-xs text-neutral-400 mb-1">Timecode 1</label>
            <input
              type="text"
              value={tc1}
              onChange={(e) => setTc1(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-lg font-mono text-neutral-100 focus:outline-none focus:border-emerald-500"
              placeholder="00:00:00:00"
            />
          </div>

          <div className="flex justify-center md:col-span-1">
            <div className="flex bg-neutral-950 border border-neutral-800 rounded-lg p-1">
              <button
                onClick={() => setOp('+')}
                className={`px-3 py-1 text-sm font-bold rounded ${
                  op === '+' ? 'bg-emerald-500 text-neutral-950' : 'text-neutral-400'
                }`}
              >
                +
              </button>
              <button
                onClick={() => setOp('-')}
                className={`px-3 py-1 text-sm font-bold rounded ${
                  op === '-' ? 'bg-emerald-500 text-neutral-950' : 'text-neutral-400'
                }`}
              >
                -
              </button>
            </div>
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs text-neutral-400 mb-1">Timecode 2</label>
            <input
              type="text"
              value={tc2}
              onChange={(e) => setTc2(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-lg font-mono text-neutral-100 focus:outline-none focus:border-emerald-500"
              placeholder="00:00:00:00"
            />
          </div>
        </div>

        {/* Result Card */}
        {result.success && result.value ? (
          <div className="mt-6 p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-neutral-400">Calculated Timecode</div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 tracking-wider mt-0.5">
                {result.value.timecode}
              </div>
              <div className="flex gap-4 text-xs font-mono text-neutral-500 mt-1">
                <span>{result.value.frames.toLocaleString()} frames</span>
                <span>{result.value.seconds}s</span>
                <span>{result.value.milliseconds}ms</span>
              </div>
            </div>

            <CopyButton text={result.value.timecode} label="Copy Timecode" />
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-xs">
            {result.error || 'Invalid timecode entry'}
          </div>
        )}
      </div>
    </ToolShell>
  );
};
