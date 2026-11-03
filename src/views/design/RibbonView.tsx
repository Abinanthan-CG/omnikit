import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateCssRibbon } from '../../engines/design/ribbonTools';

export const RibbonView: React.FC = () => {
  const [text, setText] = useState('FEATURED');
  const [position, setPosition] = useState<'top-left' | 'top-right'>('top-right');
  const [color, setColor] = useState('#10b981');

  const { ribbonCss, fullHtmlSnippet } = generateCssRibbon({
    text,
    position,
    ribbonColor: color,
    textColor: '#ffffff',
    sizePx: 100
  });

  return (
    <ToolShell
      title="CSS Corner Ribbon & Badge Generator"
      category="design"
      description="Design diagonal corner ribbons for pricing tiers, new badges, and promotional product cards."
      icon="🎗️"
      onReset={() => {
        setText('FEATURED');
        setPosition('top-right');
        setColor('#10b981');
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Ribbon Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Position</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value as 'top-left' | 'top-right')}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-mono focus:outline-none"
            >
              <option value="top-right">Top Right Corner</option>
              <option value="top-left">Top Left Corner</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Badge Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-11 bg-neutral-950 border border-neutral-800 rounded-xl p-1 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-2">Live Card Preview</label>
          <div className="relative overflow-hidden w-full max-w-sm mx-auto h-48 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-end shadow-xl">
            <div
              style={{
                position: 'absolute',
                top: 15,
                [position === 'top-left' ? 'left' : 'right']: -35,
                width: 140,
                padding: '4px 0',
                backgroundColor: color,
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transform: position === 'top-left' ? 'rotate(-45deg)' : 'rotate(45deg)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.25)'
              }}
            >
              {text}
            </div>
            <div className="text-sm font-bold text-neutral-100">Pro Developer Plan</div>
            <div className="text-xs text-neutral-400 mt-1">Full access to 105+ client-side micro-tools.</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono text-neutral-400">Ribbon CSS Rules</label>
            <CopyButton text={ribbonCss} label="Copy CSS" />
          </div>
          <pre className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto">
            {ribbonCss}
          </pre>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono text-neutral-400">HTML & CSS Snippet</label>
            <CopyButton text={fullHtmlSnippet} label="Copy HTML" />
          </div>
          <pre className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-neutral-300 overflow-x-auto">
            {fullHtmlSnippet}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};
