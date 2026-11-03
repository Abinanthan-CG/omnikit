import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { analyzeAnagram } from '../../engines/writing/anagramTools';

export const AnagramView: React.FC = () => {
  const [text1, setText1] = useState('A man, a plan, a canal: Panama!');
  const [text2, setText2] = useState('rail safety');
  const [comparePhrase, setComparePhrase] = useState('fairy tales');

  const analysis1 = analyzeAnagram(text1);
  const anagramCompare = analyzeAnagram(text2, comparePhrase);

  return (
    <ToolShell
      title="Palindrome & Anagram Wordplay Analyzer"
      category="writing"
      description="Detect palindromic symmetry, verify anagrams between phrases, and compute distinct letter permutation counts."
      icon="🔤"
      onReset={() => {
        setText1('A man, a plan, a canal: Panama!');
        setText2('rail safety');
        setComparePhrase('fairy tales');
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-1">Palindrome Test Phrase</label>
          <input
            type="text"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-100 font-sans focus:outline-none"
          />
        </div>

        <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-500 font-mono">Palindrome Symmetry Result</span>
            <div className="text-base font-bold font-mono mt-0.5">
              {analysis1.isPalindrome ? (
                <span className="text-emerald-400">✓ Valid Palindrome (Reads identical backwards)</span>
              ) : (
                <span className="text-neutral-400">✗ Not a palindrome</span>
              )}
            </div>
          </div>
          <div className="text-right font-mono text-xs text-neutral-500">
            {analysis1.cleanStr1.length} alphanumeric chars
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800">
          <label className="block text-xs font-mono text-neutral-400 mb-2">Anagram Comparison Between Two Phrases</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="First phrase..."
              className="bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-100 font-mono focus:outline-none"
            />
            <input
              type="text"
              value={comparePhrase}
              onChange={(e) => setComparePhrase(e.target.value)}
              placeholder="Second phrase..."
              className="bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-100 font-mono focus:outline-none"
            />
          </div>

          <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs text-neutral-500 font-mono">Anagram Status</span>
              <div className="text-sm font-bold font-mono mt-0.5">
                {anagramCompare.isAnagramOfSecond ? (
                  <span className="text-emerald-400">✓ Valid Anagram! Same letters in different order.</span>
                ) : (
                  <span className="text-neutral-400">✗ Not an anagram.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
