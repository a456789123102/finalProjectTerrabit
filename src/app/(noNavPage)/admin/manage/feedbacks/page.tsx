"use client"
import React, { useState } from 'react'
import useFetchgetAllReviews from '../../hooks/reviews/useFetchgetAllReviews';
import { useTheme } from '@/app/context/themeContext';

function page() {
const [pagination, setPagination] = useState({
  "currentPage": 1,
  "totalPages": 1,
  "pageSize": 5,
  "totalReviews": 4
});
 const { themeColors } = useTheme();

  const { reviews, loading, error } = useFetchgetAllReviews({
    search: "",
    orderBy: "desc",
    orderWith: "createdAt",
    isPublished: true,
   pagination, 
    setPagination,
  })
  return (
    <div
      className="min-h-screen my-7 flex flex-col justify-start items-center gap-5"
      style={{ backgroundColor: themeColors.bg, color: themeColors.text }}
    >
            <div className="w-full flex justify-end items-center border-gray-300 border-y px-7"
        style={{ backgroundColor: themeColors.base }}
      >
        <div> header should be here</div>
      </div>

    </div>
  )
}

export default page;