"use client";
import React, { useMemo, useState } from "react";
import useFetchgetAllReviews from "../../hooks/reviews/useFetchgetAllReviews";
import { useTheme } from "@/app/context/themeContext";
import SortBySelectedDropDown from "../../components/SortBySelectedDropDown";
import PaginationControls from "../../components/PaginationControls";
import { getCoreRowModel, useReactTable, ColumnDef } from "@tanstack/react-table";
import DataTable from "../../components/dataTable";
import SearchAndFilterBar from "../../components/SearchAndFilterBar";
import PublishedCheckbox from "./components/publishedCheckbox";
import Swal from "sweetalert2";
import { changePublishedReviewStatus } from "@/app/apis/review";

interface Review {
  id: number;
  userName: string;
  rating: number;
  comments: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PaginationType {
  page: number;
  totalPages: number;
  pageSize: number;
  totalReviews: number;
}

function Page() {
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    totalPages: 1,
    pageSize: 10,
    totalReviews: 4,
  });

  const { themeColors } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tempSearchQuery, setTempSearchQuery] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("");
  const [orderWith, setOrderWith] = useState<string>("");
  const [isPublished, setIsPublished] = useState<boolean | null>(null);
  const [forceFetch, setForceFetch] = useState<boolean>(false);

  const { reviews, loading, error } = useFetchgetAllReviews({
    search: searchQuery,
    orderBy,
    orderWith,
    isPublished,
    pagination,
    forceFetch,
    setPagination,
  });

  const [columnKeysFiltered, setColumnKeysFiltered] = useState<string[]>([
    "id",
    "userName",
    "rating",
    "comments",
    "isPublished",
  ]);

  const sortByOptions = [
    { orderBy: "asc", orderWith: "createdAt", label: "Oldest Created" },
    { orderBy: "desc", orderWith: "createdAt", label: "Newest Created" },
    { orderBy: "asc", orderWith: "updatedAt", label: "Oldest Updated" },
    { orderBy: "desc", orderWith: "updatedAt", label: "Newest Updated" },
    { orderBy: "asc", orderWith: "rating", label: "Highest Rated" },
    { orderBy: "desc", orderWith: "rating", label: "Lowest Rated" },
  ];

  const columnKeys = useMemo(() => {
    if (!reviews.length) return [];
    return Object.keys(reviews[0]);
  }, [reviews]);

  const handleIsPublished = async (id: number, status: boolean) => {
    const currentStatus = status ? "Unpublished" : "Published";
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${currentStatus} Review ID: ${id} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes!",
      cancelButtonText: "No, cancel!",
      background: themeColors.primary,
      color: themeColors.text,
    });

    if (result.isConfirmed) {
      try {
        await changePublishedReviewStatus(id);
        setForceFetch((prev) => !prev);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Review Id ${id} ${currentStatus} successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error while changing status reviews:", error);
        Swal.fire("Error!", "Failed to change review status.", "error");
      }
    }
  };

  const columns: ColumnDef<Review>[] = useMemo(() => {
    return columnKeysFiltered.map((key) => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      accessorKey: key,
      cell: ({ row }) => {
        const val = row.original[key as keyof Review];

        if (key === "isPublished") {
          return (
            <input
              type="checkbox"
              checked={!!val}
              className="w-full self-center"
              onChange={() => handleIsPublished(row.original.id, row.original.isPublished)}
            />
          );
        }

        if (key === "createdAt" || key === "updatedAt") {
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
    data: reviews,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSearchQuery = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(tempSearchQuery);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleColumnToggle = (column: string) => {
    setColumnKeysFiltered((prev) => {
      const updatedColumns = prev.includes(column)
        ? prev.filter((item) => item !== column)
        : [...prev.filter((item) => item !== "isPublished"), column, "isPublished"];
  
      return Array.from(new Set(updatedColumns)); 
    });
  };
  
  return (
    <div
      className="min-h-screen my-7 flex flex-col justify-start items-center gap-5"
      style={{ backgroundColor: themeColors.bg, color: themeColors.text }}
    >
      <div
        className="w-full flex gap-2 justify-end items-center border-gray-300 border-y px-7 py-1"
        style={{ backgroundColor: themeColors.base }}
      >
        <SearchAndFilterBar
          tempSearchQuery={tempSearchQuery}
          setTempSearchQuery={setTempSearchQuery}
          handleSearchQuery={handleSearchQuery}
          columnKeys={columnKeys}
          columnKeysFiltered={columnKeysFiltered}
          handleColumnToggle={handleColumnToggle}
          totalItems={pagination.totalReviews}
          fromSearch={searchQuery}
          sortData={sortByOptions}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderWith={orderWith}
          setOrderWith={setOrderWith}
        />
        <div className="flex flex-row w-1/3 items-center justify-center gap-2">
          <PublishedCheckbox isPublished={isPublished} setIsPublished={setIsPublished} />
        </div>
      </div>

      <div className="px-10">
        <DataTable table={table} />
      </div>
      <div>
      <PaginationControls pagination={pagination as any} setPagination={setPagination as any} />
      </div>
    </div>
  );
}

export default Page;
