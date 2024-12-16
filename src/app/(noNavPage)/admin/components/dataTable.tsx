import React from "react";
import { flexRender } from "@tanstack/react-table";
import { useTheme } from '@/app/context/themeContext';

function DataTable({ table }: any) {
  const { theme, themeColors } = useTheme();

  return (
    <div>
      <table className="border-collapse border border-gray-300 w-full min-w-full" style={{ backgroundColor: themeColors.navbar, color: themeColors.text }}>
        <thead style={{ backgroundColor: themeColors.tertiary }}>
          {table.getHeaderGroups().map((group) => (
            <tr className="border-b" key={group.id}>
              {group.headers.map((header) => (
                <th className="p-2 px-4 border" key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody style={{ backgroundColor: themeColors.primary }}>
  {table.getRowModel().rows.map((row, index) => (
    <tr key={row.id || `row-${index}`} className="border-b">
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id || `cell-${index}-${cell.column.id}`} className="p-2 px-4 border">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}

export default DataTable;
