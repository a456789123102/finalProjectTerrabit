'use client';
import React, { useState, useEffect, useMemo } from "react";
import { fetchProducts } from '@/app/apis/product';
import { useTheme } from '@/app/context/themeContext';
import PaginationControls from '../components/PaginationControls';
import DataTable from "../components/dataTable";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import FilterTableDropdown from "../components/filterTableDropdown";
import Swal from 'sweetalert2';

function ProductTable() {
  const { themeColors } = useTheme();
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
    'id', 'name', 'price', 'discount', 'finalPrice', 'quantity', 'ProductCategory', "Actions"
  ]);
  const [sorting, setSorting] = useState([]); // ไม่มีการระบุ type

  // ดึงข้อมูลผลิตภัณฑ์
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
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductLists();
  }, [searchQuery, category, pagination.page, pagination.pageSize]);

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      setPagination(prev => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handleSearchQuery = (e) => {
    e.preventDefault();
    setSearchQuery(tempSearchQuery);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageSizeChange = (newPageSize:number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: newPageSize,
      page: 1, // Reset to first page when pageSize changes
    }));
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      background: themeColors.primary,
      color: themeColors.text,
    });

    if (result.isConfirmed) {
      try {
        console.log(`Deleting product with id: ${id}`);
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire('Error!', 'Failed to delete the product.', 'error');
      }
    }
  };

  const columnKeys = useMemo(() => {
    if (!products.length) return [];
    return [...Object.keys(products[0]), "Actions"];
  }, [products]);

  const columns = useMemo(() => {
    return columnKeysFiltered.map((key) => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      accessorKey: key,
      cell: ({ row }) => {
        const value = row.original[key];
        if (key === "ProductCategory" && Array.isArray(value)) {
          return <span>{value.map((item) => item.category?.name).join(", ")}</span>;
        }
        if (key === "discount") {
          return <span>{(value * 100).toFixed(2)}%</span>;
        }
        if (key === "Actions") {
          return (
            <button
              onClick={() => handleDelete(row.original.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          );
        }
        return value;
      },
      // ลบ enableSorting
    }));
  }, [columnKeysFiltered]);  

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleColumnToggle = (column) => {
    setColumnKeysFiltered(prev => {
      if (prev.includes(column)) {
        return prev.filter(item => item !== column);
      } else {
        return [...prev, column];
      }
    });
  };

  return (
    <div
      className="min-h-screen p-7 flex flex-col justify-start items-center"
      style={{ backgroundColor: themeColors.navbar, color: themeColors.text }}
    >
      <div className="flex justify-end w-full">
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
      <div className="w-full">
        <div className="p-1">{pagination.totalProducts} products found.</div>
        <DataTable table={table}  />
      </div>
      <div className="min-w-full">
      <PaginationControls
        pagination={pagination}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handlePageSizeChange={handlePageSizeChange}
      />
      </div>
    </div>
  );
}

export default ProductTable;
