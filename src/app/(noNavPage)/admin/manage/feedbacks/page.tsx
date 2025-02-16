"use client"
import React, { useState } from 'react'
import useFetchgetAllReviews from '../../hooks/reviews/useFetchgetAllReviews';

function page() {
const [pagination, setPagination] = useState({
  "currentPage": 1,
  "totalPages": 1,
  "pageSize": 5,
  "totalReviews": 4
});

  const { reviews, loading, error } = useFetchgetAllReviews({
    search: "",
    orderBy: "desc",
    orderWith: "createdAt",
    isPublished: true,
   pagination, 
    setPagination,
  })
  return (
    <div>ertgertertertertertert</div>
  )
}

export default page;