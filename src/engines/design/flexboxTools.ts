export interface FlexboxConfig {
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems: 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline';
  flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse';
  gapPx: number;
}

export function generateFlexboxCss(cfg: FlexboxConfig): { cssRules: string; tailwindClasses: string } {
  const css = [
    'display: flex;',
    `flex-direction: ${cfg.flexDirection};`,
    `justify-content: ${cfg.justifyContent};`,
    `align-items: ${cfg.alignItems};`,
    `flex-wrap: ${cfg.flexWrap};`,
    `gap: ${cfg.gapPx}px;`
  ].join('\n');

  const twParts = ['flex'];
  if (cfg.flexDirection === 'row-reverse') twParts.push('flex-row-reverse');
  else if (cfg.flexDirection === 'column') twParts.push('flex-col');
  else if (cfg.flexDirection === 'column-reverse') twParts.push('flex-col-reverse');

  if (cfg.justifyContent === 'center') twParts.push('justify-center');
  else if (cfg.justifyContent === 'flex-end') twParts.push('justify-end');
  else if (cfg.justifyContent === 'space-between') twParts.push('justify-between');
  else if (cfg.justifyContent === 'space-around') twParts.push('justify-around');
  else if (cfg.justifyContent === 'space-evenly') twParts.push('justify-evenly');

  if (cfg.alignItems === 'center') twParts.push('items-center');
  else if (cfg.alignItems === 'flex-start') twParts.push('items-start');
  else if (cfg.alignItems === 'flex-end') twParts.push('items-end');
  else if (cfg.alignItems === 'baseline') twParts.push('items-baseline');

  if (cfg.flexWrap === 'wrap') twParts.push('flex-wrap');
  else if (cfg.flexWrap === 'wrap-reverse') twParts.push('flex-wrap-reverse');

  if (cfg.gapPx > 0) twParts.push(`gap-[${cfg.gapPx}px]`);

  return {
    cssRules: css,
    tailwindClasses: twParts.join(' ')
  };
}
