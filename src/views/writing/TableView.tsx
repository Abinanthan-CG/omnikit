import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { generateMarkdownTable, ColumnAlignment } from '../../engines/writing/tableTools';

export const TableView: React.FC = () => {
  const [headers, setHeaders] = useState(['Product', 'Category', 'Price', 'Stock']);
  const [alignments, setAlignments] = useState<ColumnAlignment[]>(['left', 'left', 'right', 'center']);
  const [rows, setRows] = useState<string[][]>([
    ['Wireless Microphone', 'Audio', '$149.00', 'In Stock'],
    ['4K HDMI Cable (2m)', 'Cables', '$19.99', 'Low Stock'],
    ['RGB Light Wand', 'Lighting', '$89.50', 'In Stock'],
  ]);

  const markdown = generateMarkdownTable({ headers, alignments, rows });

  const addColumn = () => {
    setHeaders([...headers, `Column ${headers.length + 1}`]);
    setAlignments([...alignments, 'left']);
    setRows(rows.map(r => [...r, '']));
  };

  const addRow = () => {
    setRows([...rows, Array(headers.length).fill('')]);
  };

  const removeRow = (rIdx: number) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, idx) => idx !== rIdx));
    }
  };

  const removeColumn = (cIdx: number) => {
    if (headers.length > 1) {
      setHeaders(headers.filter((_, idx) => idx !== cIdx));
      setAlignments(alignments.filter((_, idx) => idx !== cIdx));
      setRows(rows.map(r => r.filter((_, idx) => idx !== cIdx)));
    }
  };

  return (
    <ToolShell
      title="Markdown Table Generator & Editor"
      category="writing"
      description="Design interactive tabular data with custom alignments and copy clean GitHub Flavored Markdown."
      icon="📊"
      onReset={() => {
        setHeaders(['Product', 'Category', 'Price', 'Stock']);
        setAlignments(['left', 'left', 'right', 'center']);
        setRows([
          ['Wireless Microphone', 'Audio', '$149.00', 'In Stock'],
          ['4K HDMI Cable (2m)', 'Cables', '$19.99', 'Low Stock'],
        ]);
      }}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={addRow}
              className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-200 rounded-lg font-mono transition-colors"
            >
              + Add Row
            </button>
            <button
              onClick={addColumn}
              className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-200 rounded-lg font-mono transition-colors"
            >
              + Add Column
            </button>
          </div>
          <CopyButton text={markdown} label="Copy Markdown Table" />
        </div>

        {/* Visual interactive table editor */}
        <div className="overflow-x-auto border border-neutral-800 rounded-xl bg-neutral-950 p-2">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-neutral-800">
                {headers.map((h, cIdx) => (
                  <th key={cIdx} className="p-2 text-left min-w-[120px]">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between gap-1">
                        <input
                          type="text"
                          value={h}
                          onChange={(e) => {
                            const copy = [...headers];
                            copy[cIdx] = e.target.value;
                            setHeaders(copy);
                          }}
                          className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-neutral-100 font-semibold w-full focus:outline-none focus:border-neutral-600"
                        />
                        {headers.length > 1 && (
                          <button
                            onClick={() => removeColumn(cIdx)}
                            className="text-neutral-500 hover:text-red-400 p-1"
                            title="Delete Column"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      <select
                        value={alignments[cIdx] || 'left'}
                        onChange={(e) => {
                          const copy = [...alignments];
                          copy[cIdx] = e.target.value as ColumnAlignment;
                          setAlignments(copy);
                        }}
                        className="bg-neutral-900 border border-neutral-800 rounded px-1.5 py-0.5 text-[10px] text-neutral-400 focus:outline-none"
                      >
                        <option value="left">Align Left</option>
                        <option value="center">Align Center</option>
                        <option value="right">Align Right</option>
                      </select>
                    </div>
                  </th>
                ))}
                <th className="p-2 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-neutral-900/60 hover:bg-neutral-900/30">
                  {headers.map((_, cIdx) => (
                    <td key={cIdx} className="p-1.5">
                      <input
                        type="text"
                        value={row[cIdx] || ''}
                        onChange={(e) => {
                          const newRows = [...rows];
                          newRows[rIdx][cIdx] = e.target.value;
                          setRows(newRows);
                        }}
                        className="w-full bg-transparent border border-neutral-900 hover:border-neutral-800 focus:border-neutral-700 rounded px-2 py-1 text-neutral-200 focus:outline-none"
                      />
                    </td>
                  ))}
                  <td className="p-1.5 text-center">
                    {rows.length > 1 && (
                      <button
                        onClick={() => removeRow(rIdx)}
                        className="text-neutral-500 hover:text-red-400 p-1"
                        title="Delete Row"
                      >
                        ×
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Markdown preview */}
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-1">Generated Markdown</label>
          <pre className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre">
            {markdown}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};
