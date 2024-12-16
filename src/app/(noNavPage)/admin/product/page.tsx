'use client';
import React, { useState, useEffect, useMemo } from "react";
import { fetchProducts } from '@/app/apis/product';
import { useTheme } from '@/app/context/themeContext';
import DataTable from "../components/dataTable";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";

function ProductTable() {
  const { theme, themeColors } = useTheme();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data only once when the component mounts
  useEffect(() => {
    const fetchProductLists = async () => {
      try {
        const productData = await fetchProducts();
        setProducts(productData.products);
        console.log(`Success fetching product lists.${products}`);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProductLists();
  }, []);
  
  const handleDelete = async (id) => {
    console.log("Delete product with id:", id);
    // Implement delete logic here
  };

  // Memoize column keys to avoid unnecessary re-calculation
  const columnKeys = useMemo(() => {
    if (!products.length) return [];
    return Object.keys(products[0]);
  }, [products]);

  // Memoize column definitions
  const columns = useMemo(() => {
    return columnKeys.map((key, index) => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      cell: ({ row }) => {
        const value = row.original[key];
        if (key === 'ProductCategory' && Array.isArray(value)) {
          const categories = value.map((categoryItem) => categoryItem.category?.name).join(', ');
          return <span>{categories}</span>;
        }
        if (key === 'Image' && Array.isArray(value)) {
          return (
            <div>
              {value.map((imageItem, i) => (
                <span key={i}>{imageItem.imageUrl}</span>
              ))}
            </div>
          );
        }        
        return value;
      },
    }));
  }, [columnKeys]);

  // Setup table instance with React Table
  const table = useReactTable({
    data: useMemo(() => {
      return products.filter((product) =>
        Object.values(product).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }, [products, searchQuery]),
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div
      className="min-h-screen p-7 flex flex-col justify-center items-center"
      style={{ backgroundColor: themeColors.navbar, color: themeColors.text }}
    >
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="p-2 border rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <DataTable table={table} onDelete={handleDelete} />
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductTable;
