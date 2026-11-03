export function caesarCipher(text: string, shift: number): string {
  const normShift = ((shift % 26) + 26) % 26;
  return text.split('').map(ch => {
    const code = ch.charCodeAt(0);
    // Uppercase A-Z: 65 - 90
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 + normShift) % 26) + 65);
    }
    // Lowercase a-z: 97 - 122
    if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 + normShift) % 26) + 97);
    }
    return ch;
  }).join('');
}

export function rot13(text: string): string {
  return caesarCipher(text, 13);
}
