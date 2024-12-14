'use client'
import React from "react";
import {fetchProducts} from '@/app/apis/product';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

function ProductTable() {
  // ข้อมูลสำหรับตาราง
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  // โครงสร้างคอลัมน์
  const columns = Object.keys(data[0]).map(key => ({
    accessorKey: key, 
    header: key.charAt(0).toUpperCase() + key.slice(1), 
  }));


  const table = useReactTable({
    data, 
    columns, 
    getCoreRowModel: getCoreRowModel(), 
  });

  // JSX สำหรับแสดงตาราง
  return (
    <table >
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
