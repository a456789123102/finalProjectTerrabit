'use client';
import React, { useState, useMemo } from "react";
import { useTheme } from '@/app/context/themeContext';
import PaginationControls from '../components/PaginationControls';
import DataTable from "../components/dataTable";
import SearchAndFilterBar from "../components/SearchAndFilterBar";
import useFetchProducts from "../hooks/products/useFetchProducts";
import {
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import Swal from 'sweetalert2';
import Link from 'next/link';
import { deleteProduct } from "@/app/apis/product";

function ProductTable() {
  const { themeColors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [category, setCategory] = useState('');
  const [forceFetch, setForceFetch] = useState(false); 
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalPages: 1,
    totalProducts: 0,
  });
  const [columnKeysFiltered, setColumnKeysFiltered] = useState([
    'id', 'name', 'price', 'discount', 'finalPrice', 'quantity', 'ProductCategory', "Actions"
  ]);

  const products = useFetchProducts(searchQuery, category, pagination, setPagination, forceFetch);

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

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: newPageSize,
      page: 1, // Reset to first page when pageSize changes
    }));
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete product ID: ${id} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      background: themeColors.primary,
      color: themeColors.text,
    });

    if (result.isConfirmed) {
      try {
        await deleteProduct(id);

        // บังคับให้รีเฟรชข้อมูลใหม่
        setForceFetch((prev) => !prev);

    Swal.fire({
  position: "center",
  icon: "success",
  title: `Product Id ${id} deleted successfully`,
  showConfirmButton: false,
  timer: 1500
});
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
          return <span>{value}%</span>;
        }
        if (key === "Actions") {
          return (
            <div className="flex flex-row  justify-center gap-1">
              <button
                onClick={() => handleDelete(row.original.id)}
                className="bg-red-500 text-white px-2 py-1"
              >
                Delete
              </button>
              <Link href={`/admin/product/${row.original.id}/edit`} className="bg-purple-500 text-white px-2 py-1">Edit</Link>
            </div>
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
      className="min-h-screen p-7 flex flex-col justify-start items-center gap-5"
      style={{ backgroundColor: themeColors.navbar, color: themeColors.text }}
    >
      <div className="w-full flex justify-between items-center border p-4">
        <div className="flex-1">
          <SearchAndFilterBar
            tempSearchQuery={tempSearchQuery}
            setTempSearchQuery={setTempSearchQuery}
            handleSearchQuery={handleSearchQuery}
            columnKeys={columnKeys}
            columnKeysFiltered={columnKeysFiltered}
            handleColumnToggle={handleColumnToggle}
            totalProduct={pagination.totalProducts}
            fromSearch={searchQuery}
          />
        </div>
        <Link
          className="  px-4 py-2 hover:text-yellow-600 border"
          href={`/admin/product/create`}
          style={{ backgroundColor: themeColors.tertiary }}
        >
          <div className="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>

            <div>Create Product</div>
          </div>
        </Link>
      </div>
      <div className="w-full"  >
        <DataTable table={table} />
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
