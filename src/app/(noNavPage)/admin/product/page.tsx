'use client'
import React, { useState, useEffect } from "react";
import { fetchProducts } from '@/app/apis/product';
import { useTheme } from '@/app/context/themeContext';
import DataTable from "../components/dataTable";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";

function ProductTable() {
  const { theme, themeColors } = useTheme();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProductLists = async () => {
      try {
        const productData = await fetchProducts();
        setProducts(productData.products);
        console.log(`success to fetch product lists:`);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductLists();
  }, []);

  const handleDelete = async (id) => {
    console.log('delete product with id:', id);
    // Implement delete logic here, e.g., make API call to delete product
  }

  const columnKeys = products.length ? Object.keys(products[0]) : [];

  const columns = columnKeys.map(key => ({
    accessorKey: key,
    header: key.charAt(0).toUpperCase() + key.slice(1), 
    cell: ({ row }) => {
      const value = row.original[key];
      if (key === 'ProductCategory' && Array.isArray(value)) {
        const categories = value.map(categoryItem => categoryItem.category?.name).join(', ');
        return <span>{categories}</span>;
      }

      if (key === 'Image' && Array.isArray(value)) {
        return (
          <div>
            {value.map((imageItem,i) => (
                <span key={i}>{imageItem.imageUrl}</span>
            ))}
          </div>
        );
      }
   
      if (typeof value === 'object' && value !== null) {
        
        return <span>{JSON.stringify(value)}</span>; 
      }
      return value; 
    }
  }));
  
  columns.push({
    accessorKey: 'delete',
    header: 'Delete',
    cell: ({ row }) => (
      <button onClick={() => handleDelete(row.original.id)} className="bg-orange-400 p-1 rounded hover:bg-orange-500">Delete</button>
    ),
  });

  const table = useReactTable({
    data: products.filter((product) => {
      return Object.values(product).some(value =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }),
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });


  return (
    <div className="min-h-screen p-7 justify-center items-center" style={{ backgroundColor: themeColors.navbar, color: themeColors.text }}>
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
      <div className="mt-4">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="p-2 mr-2 bg-blue-500 text-white rounded">
          Previous
        </button>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="p-2 bg-blue-500 text-white rounded">
          Next
        </button>
      </div>
    </div>
  );
}


export default ProductTable;
