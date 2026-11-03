import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { calculateTransformMatrix } from '../../engines/design/transformTools';

export const TransformView: React.FC = () => {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [rotateDeg, setRotateDeg] = useState(15);
  const [skewXDeg, setSkewXDeg] = useState(0);
  const [skewYDeg, setSkewYDeg] = useState(0);

  const res = calculateTransformMatrix({
    translateX,
    translateY,
    scaleX,
    scaleY,
    rotateDeg,
    skewXDeg,
    skewYDeg
  });

  return (
    <ToolShell
      title="CSS 2D Transform & Matrix Visualizer"
      category="design"
      description="Interactive 2D transforms (translate, rotate, scale, skew) with exact affine matrix() calculation."
      icon="🔄"
      onReset={() => {
        setTranslateX(0);
        setTranslateY(0);
        setScaleX(1);
        setScaleY(1);
        setRotateDeg(0);
        setSkewXDeg(0);
        setSkewYDeg(0);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div>
            <label className="text-neutral-400">Rotate ({rotateDeg}°)</label>
            <input type="range" min="-180" max="180" value={rotateDeg} onChange={e => setRotateDeg(Number(e.target.value))} className="w-full accent-emerald-500" />
          </div>
          <div>
            <label className="text-neutral-400">Scale X ({scaleX}x)</label>
            <input type="range" min="0.2" max="2" step="0.1" value={scaleX} onChange={e => setScaleX(Number(e.target.value))} className="w-full accent-emerald-500" />
          </div>
          <div>
            <label className="text-neutral-400">Translate X ({translateX}px)</label>
            <input type="range" min="-100" max="100" value={translateX} onChange={e => setTranslateX(Number(e.target.value))} className="w-full accent-sky-500" />
          </div>
          <div>
            <label className="text-neutral-400">Translate Y ({translateY}px)</label>
            <input type="range" min="-100" max="100" value={translateY} onChange={e => setTranslateY(Number(e.target.value))} className="w-full accent-sky-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Outputs */}
          <div className="space-y-4">
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">Standard Transform CSS</span>
                <CopyButton text={res.individualCss} label="Copy CSS" />
              </div>
              <pre className="p-3 bg-neutral-900 rounded font-mono text-emerald-400 text-xs select-all">
                {res.individualCss}
              </pre>
            </div>

            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">Matrix Notation (matrix(a, b, c, d, e, f))</span>
                <CopyButton text={res.matrixCss} label="Copy Matrix" />
              </div>
              <pre className="p-3 bg-neutral-900 rounded font-mono text-sky-400 text-xs select-all">
                {res.matrixCss}
              </pre>
            </div>
          </div>

          {/* Interactive visual canvas */}
          <div className="p-8 bg-neutral-950/60 border border-neutral-800 rounded-2xl flex items-center justify-center min-h-[260px] overflow-hidden">
            <div
              style={{
                transform: `translate(${translateX}px, ${translateY}px) rotate(${rotateDeg}deg) scale(${scaleX}, ${scaleY}) skew(${skewXDeg}deg, ${skewYDeg}deg)`
              }}
              className="w-32 h-32 bg-gradient-to-tr from-emerald-500 to-sky-500 rounded-2xl shadow-xl flex items-center justify-center text-neutral-950 font-bold font-mono text-xs transition-transform duration-75"
            >
              TRANSFORM
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
