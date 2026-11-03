export function getToolFromHash(hash: string): string | null {
  if (!hash) return null;
  const clean = hash.replace(/^#\/?/, '').trim();
  return clean.length > 0 ? clean : null;
}

export function createHashForTool(toolId: string): string {
  return `#${toolId}`;
}
