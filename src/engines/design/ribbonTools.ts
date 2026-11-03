export interface RibbonOptions {
  text: string;
  position: 'top-left' | 'top-right';
  ribbonColor: string;
  textColor: string;
  sizePx: number;
}

export function generateCssRibbon(options: RibbonOptions): {
  containerCss: string;
  ribbonCss: string;
  fullHtmlSnippet: string;
} {
  const isLeft = options.position === 'top-left';
  const color = options.ribbonColor || '#10b981';
  const textCol = options.textColor || '#ffffff';
  const size = Math.max(60, options.sizePx || 100);

  const containerCss = `position: relative;
overflow: hidden;`;

  const ribbonCss = `position: absolute;
top: ${Math.round(size * 0.15)}px;
${isLeft ? `left: -${Math.round(size * 0.35)}px;` : `right: -${Math.round(size * 0.35)}px;`}
width: ${Math.round(size * 1.5)}px;
padding: 4px 0;
background-color: ${color};
color: ${textCol};
text-align: center;
font-size: 11px;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.05em;
transform: rotate(${isLeft ? '-45deg' : '45deg'});
box-shadow: 0 2px 4px rgba(0,0,0,0.25);`;

  const fullHtmlSnippet = `<div class="card" style="${containerCss}">
  <div class="ribbon" style="${ribbonCss.replace(/\n/g, ' ')}">
    ${options.text || 'NEW'}
  </div>
  <!-- Card Content -->
</div>`;

  return {
    containerCss,
    ribbonCss,
    fullHtmlSnippet
  };
}
