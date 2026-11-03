import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { calculateLightingRatio } from '../../engines/video/lightingContrastTools';

export const LightingContrastView: React.FC = () => {
  const [keyFc, setKeyFc] = useState(250);
  const [fillFc, setFillFc] = useState(50);

  const res = calculateLightingRatio(keyFc, fillFc);

  return (
    <ToolShell
      title="Cinema Lighting Contrast Ratio & Stop Calculator"
      category="video"
      description="Calculate Key-to-Fill lighting ratios, exposure f-stop differences, and cinematic mood aesthetics for gaffers and DPs."
      icon="💡"
      onReset={() => {
        setKeyFc(250);
        setFillFc(50);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Key Light Alone (Foot-Candles or Lux)</label>
            <input
              type="number"
              value={keyFc}
              onChange={(e) => setKeyFc(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Fill Light Alone (Foot-Candles or Lux)</label>
            <input
              type="number"
              value={fillFc}
              onChange={(e) => setFillFc(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none"
            />
          </div>
        </div>

        <div className="p-5 bg-neutral-950/80 border border-neutral-800 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <span className="text-xs text-neutral-500 font-mono">Lighting Ratio (Key+Fill : Fill)</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{res.ratioText}</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">{res.ratioDecimal}:1 contrast</div>
          </div>
          <div>
            <span className="text-xs text-neutral-500 font-mono">Exposure Stop Difference</span>
            <div className="text-2xl font-bold font-mono text-sky-400 mt-1">{res.stopDifference} Stops</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">log2 exposure variance</div>
          </div>
          <div>
            <span className="text-xs text-neutral-500 font-mono">Dramatic Ratio Style</span>
            <div className="text-xs font-bold text-amber-400 mt-2">{res.moodDescription}</div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Standard Cinematography Ratio Guide</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { ratio: '2:1 (1 stop)', desc: 'High-Key / Sitcoms / Glamour' },
              { ratio: '3:1 (1.5 stops)', desc: 'Natural Drama / Documentaries' },
              { ratio: '4:1 (2 stops)', desc: 'Standard Cinematic Feature' },
              { ratio: '8:1 (3 stops)', desc: 'Low-Key Film Noir / Moody' }
            ].map((g) => (
              <div key={g.ratio} className="p-3 bg-neutral-950/60 border border-neutral-800 rounded-xl">
                <div className="text-xs font-bold font-mono text-neutral-200">{g.ratio}</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">{g.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
