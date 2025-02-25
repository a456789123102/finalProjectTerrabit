'use client';
import React, { useState, useMemo } from "react";
import { useTheme } from '@/app/context/themeContext';
import PaginationControls from "../../components/PaginationControls"; 

import DataTable from "../../components/dataTable";
import SearchAndFilterBar from "../../components/SearchAndFilterBar";
import useFetchProducts from "../../hooks/products/useFetchProducts";
import {
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import Swal from 'sweetalert2';
import Link from 'next/link';
import { deleteProduct } from "@/app/apis/product";
import { SquarePlus } from "lucide-react";

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
    'id', 'name', 'price', 'discount', 'finalPrice', 'quantity', "ProductCategory", "Actions"
  ]);

  const products = useFetchProducts(searchQuery, category, pagination, setPagination, forceFetch);
  console.log("Products: ", products)

  const handleSearchQuery = (e) => {
    e.preventDefault();
    setSearchQuery(tempSearchQuery);
    setPagination(prev => ({ ...prev, page: 1 }));
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
        if (key === "Image") {
          return (
            <div className="flex justify-center">
              {Array.isArray(value) && value.length > 0 ? (
                <img
                  src={value[0]?.imageUrl} // ✅ ดึงรูปแรกออกมาแสดง
                  alt={row.original.name}
                  width={50} // ✅ กำหนดขนาดภาพ
                  height={50}
                  className="rounded-md shadow-md object-cover"
                />
              ) : (
                <span>No Image</span> // ✅ กรณีไม่มีรูปภาพ
              )}
            </div>
          );
        } if (key === "Actions") {
          return (
            <div className="flex flex-row justify-center gap-1">
              <button
                onClick={() => handleDelete(row.original.id)}
                className="bg-red-500 text-white px-2 py-1"
              >
                Delete
              </button>
              <Link href={`/admin/manage/product/${row.original.id}/edit`} className="bg-purple-500 text-white px-2 py-1">
                Edit
              </Link>
            </div>
          );
        }

        return value;
      },
    }));
  }, [columnKeysFiltered]);


  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleColumnToggle = (column) => {
    setColumnKeysFiltered(prev => {
      let updatedColumns = prev.includes(column)
        ? prev.filter(item => item !== column) 
        : [...prev.filter(item => item !== "Actions"), column]; 
  
      return [...updatedColumns, "Actions"]; // ใส่ "Actions" ไว้ท้ายสุดเสมอ
    });
  };
  

  return (
    <div
      className="min-h-screen my-7 flex flex-col justify-start items-center gap-5"
      style={{ backgroundColor: themeColors.bg, color: themeColors.text }}
    >
      <div className="w-full flex justify-end items-center border-gray-300 border-y  gap-1 px-7"
        style={{ backgroundColor: themeColors.base }}
      >
        <SearchAndFilterBar
          tempSearchQuery={tempSearchQuery}
          setTempSearchQuery={setTempSearchQuery}
          handleSearchQuery={handleSearchQuery}
          columnKeys={columnKeys}
          columnKeysFiltered={columnKeysFiltered}
          handleColumnToggle={handleColumnToggle}
          totalItems={pagination.totalProducts}
          fromSearch={searchQuery}
        />
        <Link
          className="  px-4 py-2 h-10 hover:text-yellow-300 text-[0.8rem]  bg-blue-500 text-white rounded-[4px]"
          href={`/admin/manage/product/create`}
        >
          <div className="flex flex-row items-center gap-1">
            <SquarePlus />
            <div>Create</div>
          </div>
        </Link>
      </div>
      <div className="px-10"  >
        <DataTable table={table} />
      </div>
      <div className="">
        <PaginationControls
          pagination={pagination}
         setPagination={setPagination}

        />
      </div>
    </div>
  );
}

export default ProductTable;
