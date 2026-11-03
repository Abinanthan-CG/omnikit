import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateQrMatrix, matrixToSvg } from '../../engines/dev/qrTools';

export const QrView: React.FC = () => {
  const [text, setText] = useState('https://abinanthan-cg.github.io/omnikit/');
  const [size, setSize] = useState(200);

  const matrix = generateQrMatrix(text);
  const svg = matrixToSvg(matrix, size);

  return (
    <ToolShell
      title="QR Code Generator"
      category="dev"
      description="Create clean, scannable vector QR codes client-side for links, text, and keys."
      icon="📱"
      onReset={() => setText('')}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs text-neutral-400 mb-1">Payload / Target URL</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-neutral-100 font-mono focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-neutral-950/70 border border-neutral-800 rounded-xl">
          <div className="bg-white p-4 rounded-xl shadow-lg shrink-0">
            <div dangerouslySetInnerHTML={{ __html: svg }} />
          </div>

          <div className="space-y-4 w-full">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Export Size ({size}px)</label>
              <input
                type="range"
                min="120"
                max="360"
                step="20"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div className="flex gap-2">
              <CopyButton text={svg} label="Copy SVG Markup" />
            </div>

            <div className="text-xs text-neutral-500">
              Generated completely in-browser without external APIs.
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
