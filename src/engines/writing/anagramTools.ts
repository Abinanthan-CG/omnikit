export interface AnagramAnalysis {
  isPalindrome: boolean;
  isAnagramOfSecond: boolean;
  cleanStr1: string;
  cleanStr2: string;
  letterFrequency: Record<string, number>;
  totalPermutations: number;
}

export function analyzeAnagram(text1: string, text2: string = ''): AnagramAnalysis {
  const clean1 = (text1 || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const clean2 = (text2 || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  // Palindrome check on text1
  const reversed1 = clean1.split('').reverse().join('');
  const isPalindrome = clean1.length > 0 && clean1 === reversed1;

  // Anagram comparison between text1 and text2
  let isAnagramOfSecond = false;
  if (clean1.length > 0 && clean1.length === clean2.length) {
    const sorted1 = clean1.split('').sort().join('');
    const sorted2 = clean2.split('').sort().join('');
    isAnagramOfSecond = sorted1 === sorted2;
  }

  // Letter frequency of text1
  const freq: Record<string, number> = {};
  for (const ch of clean1) {
    freq[ch] = (freq[ch] || 0) + 1;
  }

  // Approximate permutations (n! / prod(k_i!))
  function factorial(n: number): number {
    if (n <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }

  const n = Math.min(10, clean1.length);
  let perms = factorial(n);
  for (const count of Object.values(freq)) {
    if (count > 1) {
      perms = Math.floor(perms / factorial(Math.min(count, 10)));
    }
  }

  return {
    isPalindrome,
    isAnagramOfSecond,
    cleanStr1: clean1,
    cleanStr2: clean2,
    letterFrequency: freq,
    totalPermutations: perms
  };
}
