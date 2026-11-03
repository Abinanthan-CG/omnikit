import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../ToolShell';
import {
  generateColorHarmonies,
  mixColors,
  generateNeumorphismCss,
  svgToDataUri,
  inspectSvgPath,
  calculateAspectPadding,
  deduplicateStrings,
  applyRot13,
  scrambleTypoglycemia,
  convertDecibelVoltages
} from '../../engines/batch14Engines';

/**
 * 1. Color Harmony & Palette Generator
 */
export const ColorHarmoniesTool: React.FC = () => {
  const [baseHex, setBaseHex] = useState('#6366f1');
  const harmonies = generateColorHarmonies(baseHex);

  const renderSwatches = (title: string, list: string[]) => (
    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
      <span className="text-neutral-400 font-bold block">{title}</span>
      <div className="flex gap-2">
        {list.map((hex, i) => (
          <div key={i} className="flex-1 space-y-1">
            <div
              className="h-12 rounded-lg border border-neutral-700/60 shadow-sm"
              style={{ backgroundColor: hex }}
            />
            <div className="text-center font-mono text-[10px] text-neutral-300 select-all">
              {hex}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <ToolShell
      title="Color Harmony & Palette Generator"
      category="design"
      description="Generate complementary, triadic, analogous, and split-harmonic color schemes based on color wheel theory."
      toolId="color-harmonies"
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <label className="text-neutral-400">Base Root Color:</label>
          <input
            type="color"
            value={baseHex}
            onChange={(e) => setBaseHex(e.target.value)}
            className="w-10 h-8 rounded border border-neutral-700 bg-transparent cursor-pointer"
          />
          <input
            type="text"
            value={baseHex}
            onChange={(e) => setBaseHex(e.target.value)}
            className="w-28 p-1.5 bg-neutral-950 border border-neutral-800 rounded text-purple-300 font-bold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {renderSwatches('Complementary (180°)', harmonies.complementary)}
          {renderSwatches('Triadic (120° / 240°)', harmonies.triadic)}
          {renderSwatches('Analogous (±30°)', harmonies.analogous)}
          {renderSwatches('Split-Complementary (150° / 210°)', harmonies.splitComplementary)}
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 2. Color Mixer & Alpha Compositor
 */
export const ColorMixerTool: React.FC = () => {
  const [color1, setColor1] = useState('#3b82f6');
  const [color2, setColor2] = useState('#ef4444');
  const [weight, setWeight] = useState(50);

  const mixed = mixColors(color1, color2, weight);

  return (
    <ToolShell
      title="Color Blending & Mixer Calculator"
      category="design"
      description="Blend two colors by exact percentage weights to calculate intermediate hues and tint steps."
      toolId="color-mixer"
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-9 h-8 rounded border border-neutral-700 bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="flex-1 p-2 bg-neutral-950 border border-neutral-800 rounded text-neutral-200"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-9 h-8 rounded border border-neutral-700 bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="flex-1 p-2 bg-neutral-950 border border-neutral-800 rounded text-neutral-200"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-neutral-400">Mix Ratio:</span>
            <span className="text-purple-400 font-bold">{100 - weight}% Color 1 / {weight}% Color 2</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
        </div>

        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col items-center justify-center gap-3">
          <div
            className="w-32 h-20 rounded-xl border border-neutral-750 shadow-md transition-colors"
            style={{ backgroundColor: mixed }}
          />
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-neutral-100">{mixed}</span>
            <CopyButton text={mixed} />
          </div>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 3. Neumorphism Soft UI Dual Shadow Builder
 */
export const NeumorphismTool: React.FC = () => {
  const [baseHex, setBaseHex] = useState('#262626');
  const [distance, setDistance] = useState(12);
  const [blur, setBlur] = useState(24);
  const [shape, setShape] = useState<'flat' | 'convex' | 'concave' | 'pressed'>('flat');

  const res = generateNeumorphismCss(baseHex, distance, blur, shape);

  return (
    <ToolShell
      title="Neumorphism Soft UI CSS Generator"
      category="design"
      description="Design tactile dual-shadow soft UI elements with convex, concave, flat, or inset pressed surfaces."
      toolId="neumorphism"
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="text-neutral-400 block mb-1">Surface Base Color:</label>
            <input
              type="text"
              value={baseHex}
              onChange={(e) => setBaseHex(e.target.value)}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded text-neutral-100"
            />
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Distance ({distance}px):</label>
            <input
              type="range"
              min="2"
              max="30"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full accent-purple-500 mt-2"
            />
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Blur Radius ({blur}px):</label>
            <input
              type="range"
              min="4"
              max="60"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-purple-500 mt-2"
            />
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Shape:</label>
            <select
              value={shape}
              onChange={(e) => setShape(e.target.value as typeof shape)}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded text-purple-400 font-bold"
            >
              <option value="flat">Flat Surface</option>
              <option value="convex">Convex (Bulging)</option>
              <option value="concave">Concave (Sunken)</option>
              <option value="pressed">Pressed (Inset)</option>
            </select>
          </div>
        </div>

        {/* Live Preview Canvas */}
        <div
          className="p-12 rounded-2xl border border-neutral-800/80 flex items-center justify-center transition-colors"
          style={{ backgroundColor: baseHex }}
        >
          <div
            className="w-36 h-36 rounded-2xl flex items-center justify-center font-bold text-neutral-400 transition-all select-none"
            style={{
              background: res.background,
              boxShadow: res.boxShadow,
            }}
          >
            Soft UI
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-neutral-400 font-bold">Generated CSS:</span>
            <CopyButton text={res.css} />
          </div>
          <pre className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-purple-300 overflow-x-auto select-all">
            {res.css}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 4. SVG to Clean Data URI / CSS Background
 */
export const SvgDataUriTool: React.FC = () => {
  const [svg, setSvg] = useState(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>'
  );
  const dataUri = svgToDataUri(svg);
  const cssRule = `background-image: url("${dataUri}");`;

  return (
    <ToolShell
      title="SVG to Clean Data URI / CSS Background"
      category="design"
      description="Encode raw SVG markup into ready-to-paste data:image/svg+xml URIs for inline CSS background-image rules."
      toolId="svg-data-uri"
    >
      <div className="space-y-4 font-mono text-xs">
        <div>
          <label className="text-neutral-400 block mb-1">SVG Code:</label>
          <textarea
            value={svg}
            onChange={(e) => setSvg(e.target.value)}
            rows={5}
            className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Raw Data URI:</span>
              <CopyButton text={dataUri} />
            </div>
            <textarea
              readOnly
              value={dataUri}
              rows={4}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded text-purple-300 break-all select-all focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">CSS Background Rule:</span>
              <CopyButton text={cssRule} />
            </div>
            <textarea
              readOnly
              value={cssRule}
              rows={4}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded text-emerald-400 break-all select-all focus:outline-none"
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 5. SVG Path (d attribute) Inspector & Visualizer
 */
export const SvgPathVisualizerTool: React.FC = () => {
  const [d, setD] = useState('M 10 80 Q 95 10 180 80 T 360 80');
  const info = inspectSvgPath(d);

  return (
    <ToolShell
      title="SVG Path (d attribute) Inspector"
      category="design"
      description="Deconstruct vector SVG path strings to analyze M, L, C, Q, S, and Z command distributions."
      toolId="svg-path-visualizer"
    >
      <div className="space-y-4 font-mono text-xs">
        <div>
          <label className="text-neutral-400 block mb-1">SVG Path Data (d string):</label>
          <textarea
            value={d}
            onChange={(e) => setD(e.target.value)}
            rows={3}
            className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none"
          />
        </div>

        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
          <svg viewBox="0 0 400 120" className="w-full max-w-md h-28 stroke-purple-400 fill-none" strokeWidth="3">
            <path d={d} />
          </svg>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
          <span className="text-neutral-500 text-[10px] uppercase block">Command Statistics ({info.totalCommands} total commands):</span>
          <div className="flex flex-wrap gap-2">
            {Object.entries(info.commandCounts).map(([cmd, count]) => (
              <span key={cmd} className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-purple-300">
                <span className="font-bold text-emerald-400">{cmd}</span>: {count}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 6. Aspect Ratio Percentage Padding Calculator
 */
export const AspectPaddingTool: React.FC = () => {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const res = calculateAspectPadding(width, height);

  return (
    <ToolShell
      title="Aspect Ratio CSS Padding Calculator"
      category="design"
      description="Calculate responsive padding-top percentage ratios (e.g. 56.25% for 16:9) for responsive video and iframe embeds."
      toolId="aspect-ratio-padding"
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-neutral-400 block mb-1">Width (px):</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded text-neutral-100"
            />
          </div>
          <div>
            <label className="text-neutral-400 block mb-1">Height (px):</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded text-neutral-100"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-neutral-500 text-[10px] uppercase block">Ratio & Padding Value</span>
            <span className="text-purple-400 font-bold text-lg">{res.paddingTopPercent}% ({res.ratioLabel})</span>
          </div>
          <CopyButton text={`${res.paddingTopPercent}%`} label="Copy Value" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-neutral-400">Responsive Embed CSS:</span>
            <CopyButton text={res.cssSnippet} />
          </div>
          <pre className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-purple-300 overflow-x-auto select-all">
            {res.cssSnippet}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 7. String Deduplicator & List Sanitizer
 */
export const StringDedupTool: React.FC = () => {
  const [input, setInput] = useState('apple\nbanana\norange\napple\ngrape\nbanana\npear');
  const [sort, setSort] = useState<'none' | 'asc' | 'desc'>('asc');
  const [fmt, setFmt] = useState<'newline' | 'csv' | 'json'>('newline');

  const output = deduplicateStrings(input, { sort, outputFormat: fmt });

  return (
    <ToolShell
      title="String Deduplicator & List Sanitizer"
      category="writing"
      description="Remove duplicate lines or comma-separated items, trim whitespaces, and sort into clean formats."
      toolId="string-dedup"
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="p-1 bg-neutral-950 border border-neutral-800 rounded text-amber-400"
            >
              <option value="none">Original Order</option>
              <option value="asc">Alphabetical (A → Z)</option>
              <option value="desc">Reverse (Z → A)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Format:</span>
            <select
              value={fmt}
              onChange={(e) => setFmt(e.target.value as typeof fmt)}
              className="p-1 bg-neutral-950 border border-neutral-800 rounded text-amber-400"
            >
              <option value="newline">Lines</option>
              <option value="csv">Comma Separated</option>
              <option value="json">JSON Array</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-neutral-400 block mb-1">Input List:</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-neutral-400">Sanitized Output:</span>
              <CopyButton text={output} />
            </div>
            <textarea
              readOnly
              value={output}
              rows={8}
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-amber-300 focus:outline-none select-all"
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 8. ROT-13 & Caesar Cipher
 */
export const TextRot13Tool: React.FC = () => {
  const [text, setText] = useState('Omnikit: Fast, client-side developer toolbox.');
  const [shift, setShift] = useState(13);

  const encoded = applyRot13(text, shift);

  return (
    <ToolShell
      title="ROT-13 & Caesar Alphabet Shift Cipher"
      category="writing"
      description="Obfuscate and decode text using classic ROT-13 and adjustable Caesar alphabet rotation ciphers."
      toolId="text-rot13"
    >
      <div className="space-y-4 font-mono text-xs">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-neutral-400">Rotation Shift Offset:</label>
            <span className="text-amber-400 font-bold">{shift} ({shift === 13 ? 'Standard ROT-13' : `Caesar +${shift}`})</span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            value={shift}
            onChange={(e) => setShift(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-neutral-400 block mb-1">Plaintext:</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-neutral-400">Rotated Cipher:</span>
              <CopyButton text={encoded} />
            </div>
            <textarea
              readOnly
              value={encoded}
              rows={6}
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-amber-300 focus:outline-none select-all"
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 9. Typoglycemia Scrambler
 */
export const TextScrambleTool: React.FC = () => {
  const [text, setText] = useState(
    'According to research, the human brain can still read words easily even when the internal letters are scrambled, as long as the first and last letters remain intact.'
  );
  const [scrambled, setScrambled] = useState(() => scrambleTypoglycemia(text));

  const handleScramble = () => setScrambled(scrambleTypoglycemia(text));

  return (
    <ToolShell
      title="Typoglycemia Text Scrambler"
      category="writing"
      description="Scramble internal letters of words while preserving first and last characters for cognitive reading tests."
      toolId="text-scramble"
    >
      <div className="space-y-4 font-mono text-xs">
        <div>
          <label className="text-neutral-400 block mb-1">Original Text:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-neutral-400">Scrambled Typoglycemia:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleScramble}
                className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold"
              >
                Re-Scramble
              </button>
              <CopyButton text={scrambled} />
            </div>
          </div>
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-amber-200 leading-relaxed select-all">
            {scrambled}
          </div>
        </div>
      </div>
    </ToolShell>
  );
};

/**
 * 10. Decibel Voltage & Sound Pressure Level Converter
 */
export const DecibelRatioTool: React.FC = () => {
  const [volts, setVolts] = useState(1.0);
  const res = convertDecibelVoltages(volts);

  return (
    <ToolShell
      title="Decibel Voltage & Signal Ratio Calculator"
      category="audio"
      description="Convert root-mean-square (RMS) signal voltages to dBu, dBV, and relative pressure amplification ratios."
      toolId="decibel-ratio"
    >
      <div className="space-y-4 font-mono text-xs">
        <div>
          <label className="text-neutral-400 block mb-1">Signal Voltage (V RMS):</label>
          <input
            type="number"
            step="0.01"
            value={volts}
            onChange={(e) => setVolts(Number(e.target.value))}
            className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded text-cyan-400 font-bold text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] uppercase block">dBu (ref 0.7746V)</span>
            <span className="text-cyan-400 font-bold text-lg">{res.dBu} dBu</span>
            <span className="text-neutral-500 text-[10px] block">Standard pro audio line level (+4 dBu = 1.228V)</span>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] uppercase block">dBV (ref 1.000V)</span>
            <span className="text-neutral-200 font-bold text-lg">{res.dBV} dBV</span>
            <span className="text-neutral-500 text-[10px] block">Consumer audio line level (-10 dBV = 0.316V)</span>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] uppercase block">Amplitude Gain Factor</span>
            <span className="text-emerald-400 font-bold text-lg">{res.pressureRatio}×</span>
            <span className="text-neutral-500 text-[10px] block">Linear voltage multiplier</span>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
