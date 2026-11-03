export function toAlternatingCase(text: string): string {
  let upper = true;
  return text.split('').map(ch => {
    if (/[a-zA-Z]/.test(ch)) {
      const res = upper ? ch.toUpperCase() : ch.toLowerCase();
      upper = !upper;
      return res;
    }
    return ch;
  }).join('');
}

export function toInvertedCase(text: string): string {
  return text.split('').map(ch => {
    if (ch === ch.toUpperCase()) {
      return ch.toLowerCase();
    } else {
      return ch.toUpperCase();
    }
  }).join('');
}

export function toRandomCase(text: string): string {
  return text.split('').map(ch => {
    if (/[a-zA-Z]/.test(ch)) {
      return Math.random() > 0.5 ? ch.toUpperCase() : ch.toLowerCase();
    }
    return ch;
  }).join('');
}
