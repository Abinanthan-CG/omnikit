export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  text: string;
  lineNumberOriginal?: number;
  lineNumberModified?: number;
}

export interface DiffResult {
  hasDifferences: boolean;
  lines: DiffLine[];
}

// Myers / LCS based line diff
export function computeLineDiff(original: string, modified: string): DiffResult {
  const origLines = original.split(/\r?\n/);
  const modLines = modified.split(/\r?\n/);

  // Simple dynamic programming LCS for clean line diffs
  const n = origLines.length;
  const m = modLines.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (origLines[i] === modLines[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  const result: DiffLine[] = [];
  let i = n;
  let j = m;
  let hasDiff = false;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && origLines[i - 1] === modLines[j - 1]) {
      result.unshift({
        type: 'unchanged',
        text: origLines[i - 1],
        lineNumberOriginal: i,
        lineNumberModified: j,
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({
        type: 'added',
        text: modLines[j - 1],
        lineNumberModified: j,
      });
      hasDiff = true;
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      result.unshift({
        type: 'removed',
        text: origLines[i - 1],
        lineNumberOriginal: i,
      });
      hasDiff = true;
      i--;
    }
  }

  return {
    hasDifferences: hasDiff,
    lines: result,
  };
}
