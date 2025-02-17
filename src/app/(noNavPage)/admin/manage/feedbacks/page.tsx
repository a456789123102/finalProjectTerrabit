"use client"
import React, { useMemo, useState } from 'react'
import useFetchgetAllReviews from '../../hooks/reviews/useFetchgetAllReviews';
import { useTheme } from '@/app/context/themeContext';
import SortBySelectedDropDown from '../../components/SortBySelectedDropDown';
import PaginationControls from '../../components/PaginationControls';
import { getCoreRowModel, useReactTable,ColumnDef } from '@tanstack/react-table';

function page() {
  const [pagination, setPagination] = useState({
    "page": 1,
    "totalPages": 1,
    "pageSize": 5,
    "totalReviews": 4
  });
  const { themeColors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearchQuery, setTempSearchQuery] = useState("")
  const [forceFetch, setForceFetch] = useState(false);

  const [orderBy, setOrderBy] = useState("");
  const [tempOrderBy, setTempOrderBy] = useState("");

  const [orderWith, setOrderWith] = useState("");
  const [tempOrderWith, setTempOrderWith] = useState("");

  const [isPublished, setIsPublished] = useState(null);
  const [tempIsPublished, setTempIsPublished] = useState(null);

  const { reviews, loading, error } = useFetchgetAllReviews({
    search: searchQuery,
    orderBy:orderBy,
    orderWith: orderWith,
    isPublished: true,
    pagination,
    setPagination,
  });

      const [columnKeysFiltered, setColumnKeysFiltered] = useState<string[]>([
          'id',
          "productId",
          "userId",
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

  const columns = useMemo(() => {
    return columnKeysFiltered.map(key => ({
      header: key.charAt(0).toUpperCase() + key.slice(1), 
      accessorKey: key, 
      cell: ({ row }) => row.original[key], 
    }));
  }, [columnKeysFiltered]);

  const table = useReactTable({
    data:reviews,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  

  return (
    <div
      className="min-h-screen my-7 flex flex-col justify-start items-center gap-5"
      style={{ backgroundColor: themeColors.bg, color: themeColors.text }}
    >
      <div className="w-full flex justify-end items-center border-gray-300 border-y px-7 py-1"
        style={{ backgroundColor: themeColors.base }}
      >
        <div> header should be here</div>
        <SortBySelectedDropDown
          data={sortByOptions}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderWith={orderWith}
          setOrderWith={setOrderWith}
        />
      </div>
<div>
<PaginationControls
pagination={pagination}
setPagination={setPagination}
/>
</div>
    </div>
  )
}

export default page;