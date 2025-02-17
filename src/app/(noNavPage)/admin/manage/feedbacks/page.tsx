"use client"
import React, { useMemo, useState } from 'react'
import useFetchgetAllReviews from '../../hooks/reviews/useFetchgetAllReviews';
import { useTheme } from '@/app/context/themeContext';
import SortBySelectedDropDown from '../../components/SortBySelectedDropDown';
import PaginationControls from '../../components/PaginationControls';
import { getCoreRowModel, useReactTable, ColumnDef } from '@tanstack/react-table';
import DataTable from '../../components/dataTable';
import SearchAndFilterBar from '../../components/SearchAndFilterBar';
import PublishedCheckbox from './components/publishedCheckbox';
import Swal from 'sweetalert2';
import{changePublishedReviewStatus} from"@/app/apis/review" 

function page() {
  const [pagination, setPagination] = useState({
    "page": 1,
    "totalPages": 1,
    "pageSize": 10,
    "totalReviews": 4
  });
  const { themeColors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearchQuery, setTempSearchQuery] = useState("")
  const [orderBy, setOrderBy] = useState("");
  const [tempOrderBy, setTempOrderBy] = useState("");
  const [orderWith, setOrderWith] = useState("");
  const [tempOrderWith, setTempOrderWith] = useState("");
  const [isPublished, setIsPublished] = useState(null);
  const [tempIsPublished, setTempIsPublished] = useState(null); 
  const [forceFetch, setForceFetch] = useState(false);
  const { reviews, loading, error } = useFetchgetAllReviews({
    search: searchQuery,
    orderBy,
    orderWith,
    isPublished,
    pagination,
    forceFetch,
    setPagination,
  });

  const handleComfirm = () => {
    setSearchQuery(tempSearchQuery);
    setOrderBy(tempOrderBy);
    setOrderWith(tempOrderWith);
    setIsPublished(tempIsPublished);

  }

  const [columnKeysFiltered, setColumnKeysFiltered] = useState<string[]>([
    'id',
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
    return Object.keys(reviews[0])
  }, [reviews])

  const handleIsPublished = async (id, status) => {
    const currentStatus = status ? "Unpublished" : "Published"
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${currentStatus} Review ID: ${id} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No, cancel!',
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
                  timer: 1500
                });

      } catch (error) {
  console.error("Error while chaning status reviews:", error);
        Swal.fire('Error!', 'Failed to change review status.', 'error');
      }
    }
  }

  const columns = useMemo(() => {
    return columnKeysFiltered.map(key => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      accessorKey: key,
      cell: ({ row }) => {
        const val = row.original[key]; // ✅ ใช้ค่าจริงจาก Data

        if (key === "isPublished") {
          return<input
          type="checkbox"
          checked={!!val}
          onChange={() => handleIsPublished(row.original.id, row.original[key])} // ✅ แก้ให้เป็น arrow function
        />
         // ✅ ใช้ val แทน key
        } else {
          return val;
        }
      }
    }));
  }, [columnKeysFiltered]);


  const table = useReactTable({
    data: reviews,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSearchQuery = (e) => {
    e.preventDefault();
    setSearchQuery(tempSearchQuery);
    setPagination(prev => ({ ...prev, page: 1 }));
  };
  const handleColumnToggle = (column) => {
    setColumnKeysFiltered((prev) =>
      prev.includes(column)
        ? prev.filter((item) => item !== column) // ลบ column ออก
        : [...prev, column] // เพิ่ม column เข้าไป
    );
  };


  return (
    <div
      className="min-h-screen my-7 flex flex-col justify-start items-center gap-5"
      style={{ backgroundColor: themeColors.bg, color: themeColors.text }}
    >
      <div className="w-full flex gap-2 justify-end items-center border-gray-300 border-y px-7 py-1"
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
        />
        <div className='flex flex-row w-1/2 items-center justify-between'>
          <PublishedCheckbox isPublished={tempIsPublished} setIsPublished={setTempIsPublished} />
          <SortBySelectedDropDown
            data={sortByOptions}
            orderBy={tempOrderBy}
            setOrderBy={setTempOrderBy}
            orderWith={tempOrderWith}
            setOrderWith={setTempOrderWith}
          />
          <div className=' p-2 ml-2 bg-blue-500 text-white font-bold rounded-[4px] cursor-pointer hover:bg-blue-600' onClick={handleComfirm}>
            Confirm
          </div>
        </div>
      </div>

      <div className="px-10"  >
        <DataTable table={table} />
      </div>
      <div className=' '>
        <PaginationControls
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>

    </div>
  )
}

export default page;