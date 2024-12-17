'use client';
import React, { useState, useEffect, useMemo } from "react";
import { fetchProducts } from '@/app/apis/product';
import { useTheme } from '@/app/context/themeContext';
import DataTable from "../components/dataTable";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import FilterTableDropdown from "../components/filterTableDropdown";
function ProductTable() {
  const { theme, themeColors } = useTheme();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [category, setCategory] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    totalPages: 1,
    totalProducts: 0,
  });
  const [columnKeysFiltered, setColumnKeysFiltered] = useState([
    'id', 'name', 'price', 'discount', 'finalPrice', 'quantity', 'ProductCategory'
  ]);

  // ฟังก์ชันสำหรับดึงข้อมูลผลิตภัณฑ์
  const fetchProductLists = async () => {
    try {
      const productData = await fetchProducts(
        searchQuery,
        category ? [parseInt(category)] : [],
        pagination.page.toString(),
        pagination.pageSize.toString()
      );
      setProducts(productData.products);
      setPagination(productData.pagination);
      console.log("Success fetching product lists:", productData.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductLists();
  }, [searchQuery, category, pagination.page, pagination.pageSize]);

  const handlePrevPage = () =>{
    if (pagination.page > 1) {
      setPagination((prev) => ({...prev, page: prev.page - 1 }));
    }
  }
  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  // จัดการการค้นหา
  const handleSearchQuery = (e) => {
    e.preventDefault();
    setSearchQuery(tempSearchQuery);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleDelete = async (id: number) => {
    console.log("Delete product with id:", id);
  };

  // Memoize column keys
  const columnKeys = useMemo(() => {
    if (!products.length) return [];
    return Object.keys(products[0]);
  }, [products]);
  console.log(`columnKeys = ${columnKeys}`);
  // Memoize column definitions
  const columns = useMemo(() => {
    return columnKeysFiltered.map((key) => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      cell: ({ row }) => {
        const value = row.original[key];
        if (key === 'ProductCategory' && Array.isArray(value)) {
          return <span>{value.map((categoryItem) => categoryItem.category?.name).join(', ')}</span>;
        }
        if (key === 'Image' && Array.isArray(value)) {
          return <div>{value.map((imageItem, i) => <span key={i}>{imageItem.imageUrl}</span>)}</div>;
        }
        return value;
      },
    }));
  }, [columnKeysFiltered]);

  // Setup table instance
  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleColumnToggle = (column) => {
    setColumnKeysFiltered((prev) => {
      if (prev.includes(column)) {
        return prev.filter((item) => item !== column);  // ลบคอลัมน์ออกจาก list
      } else {
        return [...prev, column];  // เพิ่มคอลัมน์เข้าไปใน list
      }
    });
  };

  return (
    <div
      className="min-h-screen p-7 flex flex-col justify-start items-center"
      style={{ backgroundColor: themeColors.navbar, color: themeColors.text }}
    >
      <div className=" flex justify-end w-full" style={{ backgroundColor: themeColors.navbar, color: themeColors.text }}>
        {/* dorpdownmenu */}
        <FilterTableDropdown
        columnKeys={columnKeys}
        handleColumnToggle={handleColumnToggle}
        columnKeysFiltered={columnKeysFiltered}
      />
        <div className="my-4 flex flex-row">
          <input
            type="text"
            value={tempSearchQuery}
            onChange={(e) => setTempSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="p-2 border rounded text-black"
          />
          <div onClick={handleSearchQuery} className="ml-4 p-1 border">Search</div>
        </div>
      </div>
      <div className=" w-full">
        <div className="p-1">{pagination.totalProducts} products found. {searchQuery === "" ? '' : `on searching ${searchQuery}`}</div>
        <DataTable table={table} onDelete={handleDelete} />
      </div>
      <div className="mt-4 flex gap-2">
        <button
onClick={handlePrevPage} 
disabled={pagination.page === 1} 
          className="p-2 bg-blue-500 text-white rounded"
          
        >
          Previous
        </button>
        <div>  Page {pagination.page} / {pagination.totalPages}</div>
        <button
  onClick={handleNextPage} 
  disabled={pagination.page === pagination.totalPages} 
          className="p-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductTable;
