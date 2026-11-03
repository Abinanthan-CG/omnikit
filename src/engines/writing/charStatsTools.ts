export interface CharDistribution {
  totalChars: number;
  letters: number;
  digits: number;
  spaces: number;
  punctuation: number;
  uppercaseLetters: number;
  lowercaseLetters: number;
  asciiChars: number;
  nonAsciiChars: number;
  lineCount: number;
}

export function analyzeCharacterDistribution(text: string): CharDistribution {
  if (!text) {
    return {
      totalChars: 0,
      letters: 0,
      digits: 0,
      spaces: 0,
      punctuation: 0,
      uppercaseLetters: 0,
      lowercaseLetters: 0,
      asciiChars: 0,
      nonAsciiChars: 0,
      lineCount: 0
    };
  }

  let letters = 0;
  let digits = 0;
  let spaces = 0;
  let punctuation = 0;
  let uppercase = 0;
  let lowercase = 0;
  let ascii = 0;
  let nonAscii = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const code = text.charCodeAt(i);

    if (code <= 127) ascii++;
    else nonAscii++;

    if (/\s/.test(ch)) {
      spaces++;
    } else if (/[0-9]/.test(ch)) {
      digits++;
    } else if (/[a-zA-Z]/.test(ch)) {
      letters++;
      if (ch === ch.toUpperCase()) uppercase++;
      else lowercase++;
    } else if (/[.,!?;:'"()[\]{}\-—_/<>\\]/.test(ch)) {
      punctuation++;
    }
  }

  const lineCount = text.split(/\r?\n/).length;

  return {
    totalChars: text.length,
    letters,
    digits,
    spaces,
    punctuation,
    uppercaseLetters: uppercase,
    lowercaseLetters: lowercase,
    asciiChars: ascii,
    nonAsciiChars: nonAscii,
    lineCount
  };
}
