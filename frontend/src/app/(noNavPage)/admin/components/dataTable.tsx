import React from "react";
import { flexRender, Table, HeaderGroup } from "@tanstack/react-table";
import { useTheme } from '@/app/context/themeContext';

interface DataTableProps<T> {
  table: Table<T>;
}

function DataTable<T>({ table }: DataTableProps<T>) { 
  const { theme, themeColors } = useTheme();

  return (
    <div className="w-full overflow-x-auto text-[0.9rem]">
      <table
        className="border-collapse border border-gray-300 w-full"
        style={{ backgroundColor: themeColors.bg, color: themeColors.text }}
      >
        <thead style={{ backgroundColor: themeColors.tertiary }}>
          {table.getHeaderGroups().map((group: HeaderGroup<T>) => (
            <tr className="border-b" key={group.id}>
              {group.headers.map((header) => (
                <th key={header.id} className="p-2 px-4 border">
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
