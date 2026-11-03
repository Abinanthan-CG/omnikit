export interface UnicodeSymbol {
  char: string;
  name: string;
  code: string;
  category: 'Arrows' | 'Typography' | 'Math' | 'Currency' | 'Tech';
}

export const UNICODE_SYMBOLS: UnicodeSymbol[] = [
  // Arrows
  { char: '→', name: 'Right Arrow', code: 'U+2192', category: 'Arrows' },
  { char: '←', name: 'Left Arrow', code: 'U+2190', category: 'Arrows' },
  { char: '↑', name: 'Up Arrow', code: 'U+2191', category: 'Arrows' },
  { char: '↓', name: 'Down Arrow', code: 'U+2193', category: 'Arrows' },
  { char: '⇒', name: 'Rightwards Double Arrow', code: 'U+21D2', category: 'Arrows' },
  { char: '⇔', name: 'Left Right Double Arrow', code: 'U+21D4', category: 'Arrows' },
  { char: '↵', name: 'Downwards Arrow with Corner Left (Enter)', code: 'U+21B5', category: 'Arrows' },
  { char: '↺', name: 'Anticlockwise Open Circle Arrow', code: 'U+21BA', category: 'Arrows' },
  { char: '↻', name: 'Clockwise Open Circle Arrow', code: 'U+21BB', category: 'Arrows' },

  // Typography
  { char: '—', name: 'Em Dash', code: 'U+2014', category: 'Typography' },
  { char: '–', name: 'En Dash', code: 'U+2013', category: 'Typography' },
  { char: '“', name: 'Left Double Quotation Mark', code: 'U+201C', category: 'Typography' },
  { char: '”', name: 'Right Double Quotation Mark', code: 'U+201D', category: 'Typography' },
  { char: '‘', name: 'Left Single Quotation Mark', code: 'U+2018', category: 'Typography' },
  { char: '’', name: 'Right Single Quotation Mark (Apostrophe)', code: 'U+2019', category: 'Typography' },
  { char: '•', name: 'Bullet Point', code: 'U+2022', category: 'Typography' },
  { char: '…', name: 'Horizontal Ellipsis', code: 'U+2026', category: 'Typography' },
  { char: '§', name: 'Section Sign', code: 'U+00A7', category: 'Typography' },
  { char: '©', name: 'Copyright Sign', code: 'U+00A9', category: 'Typography' },
  { char: '®', name: 'Registered Sign', code: 'U+00AE', category: 'Typography' },
  { char: '™', name: 'Trade Mark Sign', code: 'U+2122', category: 'Typography' },

  // Math
  { char: '±', name: 'Plus-Minus Sign', code: 'U+00B1', category: 'Math' },
  { char: '×', name: 'Multiplication Sign', code: 'U+00D7', category: 'Math' },
  { char: '÷', name: 'Division Sign', code: 'U+00F7', category: 'Math' },
  { char: '≠', name: 'Not Equal To', code: 'U+2260', category: 'Math' },
  { char: '≈', name: 'Almost Equal To', code: 'U+2248', category: 'Math' },
  { char: '≤', name: 'Less-Than or Equal To', code: 'U+2264', category: 'Math' },
  { char: '≥', name: 'Greater-Than or Equal To', code: 'U+2265', category: 'Math' },
  { char: '∞', name: 'Infinity', code: 'U+221E', category: 'Math' },
  { char: '√', name: 'Square Root', code: 'U+221A', category: 'Math' },
  { char: '∑', name: 'N-Ary Summation', code: 'U+2211', category: 'Math' },
  { char: 'π', name: 'Greek Small Letter Pi', code: 'U+03C0', category: 'Math' },

  // Currency
  { char: '$', name: 'Dollar Sign', code: 'U+0024', category: 'Currency' },
  { char: '€', name: 'Euro Sign', code: 'U+20AC', category: 'Currency' },
  { char: '£', name: 'Pound Sign', code: 'U+00A3', category: 'Currency' },
  { char: '¥', name: 'Yen Sign', code: 'U+00A5', category: 'Currency' },
  { char: '₹', name: 'Indian Rupee Sign', code: 'U+20B9', category: 'Currency' },
  { char: '₿', name: 'Bitcoin Sign', code: 'U+20BF', category: 'Currency' },

  // Tech
  { char: '⌘', name: 'Command Key (Apple)', code: 'U+2318', category: 'Tech' },
  { char: '⌥', name: 'Option Key (Apple)', code: 'U+2325', category: 'Tech' },
  { char: '⇧', name: 'Shift Key', code: 'U+21E7', category: 'Tech' },
  { char: '⌃', name: 'Control Key', code: 'U+2303', category: 'Tech' },
  { char: '⎋', name: 'Escape Key', code: 'U+238B', category: 'Tech' },
  { char: '', name: 'Apple Logo', code: 'U+F8FF', category: 'Tech' },
];

export function filterSymbols(query: string, category?: string): UnicodeSymbol[] {
  const q = query.toLowerCase().trim();
  return UNICODE_SYMBOLS.filter(s => {
    const matchesCat = !category || category === 'All' || s.category === category;
    const matchesQuery = !q || s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || s.char === q;
    return matchesCat && matchesQuery;
  });
}
