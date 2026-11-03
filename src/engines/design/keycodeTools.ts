export interface KeyInfo {
  key: string;
  code: string;
  keyCode: number;
  which: number;
  shiftKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  description: string;
}

export function getKeyInfo(key: string, code: string, keyCode: number): KeyInfo {
  let desc = 'Standard character key';
  if (key === 'Enter') desc = 'Return / Enter key';
  else if (key === 'Escape') desc = 'Cancel / Escape key';
  else if (key === 'Backspace') desc = 'Delete left character';
  else if (key === 'Tab') desc = 'Tabulation / Indentation key';
  else if (key === ' ') desc = 'Whitespace / Spacebar key';
  else if (key.startsWith('Arrow')) desc = 'Navigation cursor key';
  else if (key.startsWith('F') && key.length <= 3) desc = 'Function key';

  return {
    key,
    code,
    keyCode,
    which: keyCode,
    description: desc,
  };
}
