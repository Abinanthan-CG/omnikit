export function cleanSvg(svg: string): string {
  return svg
    .replace(/<\?xml.*?\?>/gi, '')
    .replace(/<!DOCTYPE.*?>/gi, '')
    .replace(/<!--.*?-->/gs, '')
    .trim();
}

export function svgToDataUri(svg: string): string {
  const cleaned = cleanSvg(svg);
  const encoded = encodeURIComponent(cleaned)
    .replace(/%20/g, ' ')
    .replace(/%3D/g, '=')
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/');
  return `data:image/svg+xml,${encoded}`;
}

export function svgToReactJsx(svg: string, componentName = 'Icon'): string {
  const cleaned = cleanSvg(svg);
  // Transform common HTML attributes to React camelCase
  let jsxBody = cleaned
    .replace(/class=/g, 'className=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
    .replace(/stop-color=/g, 'stopColor=')
    .replace(/stop-opacity=/g, 'stopOpacity=')
    .replace(/xmlns:xlink=/g, 'xmlnsXlink=');

  // Insert props forwarding into root svg element if not present
  jsxBody = jsxBody.replace(/<svg\b([^>]*)>/, '<svg $1 {...props}>');

  return `import React from 'react';

export function ${componentName}(props: React.SVGProps<SVGSVGElement>) {
  return (
    ${jsxBody}
  );
}
`;
}
