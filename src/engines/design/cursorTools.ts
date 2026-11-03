export interface CursorItem {
  name: string;
  category: 'general' | 'links' | 'resizing' | 'selection' | 'zoom';
  description: string;
}

export const CURSOR_LIST: CursorItem[] = [
  { name: 'default', category: 'general', description: 'Platform default cursor (usually an arrow)' },
  { name: 'pointer', category: 'links', description: 'Hand pointer indicating clickable links/buttons' },
  { name: 'crosshair', category: 'general', description: 'Simple crosshair for precise coordinates' },
  { name: 'text', category: 'selection', description: 'I-beam indicating selectable text' },
  { name: 'move', category: 'general', description: 'Something can be dragged or moved' },
  { name: 'grab', category: 'general', description: 'Open hand indicating something can be grabbed' },
  { name: 'grabbing', category: 'general', description: 'Closed hand indicating something is currently grabbed' },
  { name: 'not-allowed', category: 'general', description: 'Action cannot be performed' },
  { name: 'wait', category: 'general', description: 'Program busy / hourglass' },
  { name: 'col-resize', category: 'resizing', description: 'Column can be resized horizontally' },
  { name: 'row-resize', category: 'resizing', description: 'Row can be resized vertically' },
  { name: 'zoom-in', category: 'zoom', description: 'Click to zoom in' },
  { name: 'zoom-out', category: 'zoom', description: 'Click to zoom out' },
];

export function getCursorCss(cursorName: string): string {
  return `cursor: ${cursorName};`;
}
