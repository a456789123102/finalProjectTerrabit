"use client";
import React, { useMemo, useState } from "react";
import useFetchUsers from "../../hooks/users/useFetchUser"; 
import { useTheme } from "@/app/context/themeContext";
import SortBySelectedDropDown from "../../components/SortBySelectedDropDown";
import PaginationControls from "../../components/PaginationControls";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import DataTable from "../../components/dataTable";
import SearchAndFilterBar from "../../components/SearchAndFilterBar";
import Swal from "sweetalert2";
import { changeIsActiveStatus } from "@/app/apis/user";

function Page() {
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    pageSize: 10,
    totalUsers: 0,
  });

  const { themeColors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [orderWith, setOrderWith] = useState("");
  const [isActive, setIsActive] = useState<boolean | null>(null);
  const [forceFetch, setForceFetch] = useState(false);

  const { users, loading, error } = useFetchUsers({
    search: searchQuery,
    orderBy,
    orderWith,
    isActive,
    pagination,
    forceFetch,
    setPagination,
  });

  const [columnKeysFiltered, setColumnKeysFiltered] = useState<string[]>([
    "id",
    "email",
    "username",
    "createdAt",
    "isActive",
  ]);

  const sortByOptions = [
    { orderBy: "asc", orderWith: "createdAt", label: "Oldest Created" },
    { orderBy: "desc", orderWith: "createdAt", label: "Newest Created" },
    { orderBy: "asc", orderWith: "updatedAt", label: "Oldest Updated" },
    { orderBy: "desc", orderWith: "updatedAt", label: "Newest Updated" },
    // { orderBy: "asc", orderWith: "rating", label: "Highest Rated" },
    // { orderBy: "desc", orderWith: "rating", label: "Lowest Rated" },
  ];


  const handleIsActive = async (id: number, status: boolean) => {
    const action = status ? "Ban" : "Unban";
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${action} User ID: ${id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes!",
      cancelButtonText: "No, cancel!",
      background: themeColors.primary,
      color: themeColors.text,
    });

    if (result.isConfirmed) {
      try {
        await changeIsActiveStatus(id);
        setForceFetch((prev) => !prev);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `User ID ${id} ${action} successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error changing user status:", error);
        Swal.fire("Error!", "Failed to change user status.", "error");
      }
    }
  };

  const columns = useMemo(() => {
    return columnKeysFiltered.map((key) => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      accessorKey: key,
      cell:  ({ row }: { row: any }) => {
        const val = row.original[key];
        if (key === "isActive") {
          return (
            <input
              type="checkbox"
              checked={!!val}
              onChange={() => handleIsActive(row.original.id, row.original[key])}
            />
          );
        }
        if (key === 'createdAt' || key === 'updatedAt') {
          const formatDate = (dateStr: string) => {
              const options: Intl.DateTimeFormatOptions = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              };
              return new Date(dateStr).toLocaleDateString(undefined, options);
          };
          

          return <div>{formatDate(val as string)}</div>;
      }
        return val;
      },
    }));
  }, [columnKeysFiltered]);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleColumnToggle = (column: string) => {
    setColumnKeysFiltered((prev: string[]) => {
      if (!prev) return []; 
  
      const updatedColumns = prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev.filter((c) => c !== "isActive"), column, "isActive"];
  
      return Array.from(new Set(updatedColumns)); 
    });
  };
  

  return (
    <div
      className="min-h-screen my-7 flex flex-col justify-start items-center gap-5"
      style={{ backgroundColor: themeColors.bg, color: themeColors.text }}
    >
      <div
        className="w-full flex gap-2 justify-between items-center border-gray-300 border-y px-7 py-1"
        style={{ backgroundColor: themeColors.base }}
      >
        <SearchAndFilterBar
          tempSearchQuery={searchQuery}
          setTempSearchQuery={setSearchQuery}
          handleSearchQuery={() => setForceFetch((prev) => !prev)}
          columnKeys={Object.keys(users[0] || {})}
          columnKeysFiltered={columnKeysFiltered}
          handleColumnToggle={handleColumnToggle}          
          totalItems={pagination.totalUsers}
          fromSearch={searchQuery}
          sortData={sortByOptions}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderWith={orderWith}
          setOrderWith={setOrderWith}
        />
        
        <button
          className="p-2 ml-2 bg-blue-500 text-white font-bold rounded-[4px] cursor-pointer hover:bg-blue-600"
          onClick={() => setForceFetch((prev) => !prev)}
        >
          Confirm
        </button>
      </div>

      <div className="px-10">
        <DataTable table={table} />
      </div>

      <PaginationControls pagination={pagination as any} setPagination={setPagination as any} />
    </div>
  );
}

export default Page;
