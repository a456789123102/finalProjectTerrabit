"use client"
import React, { useEffect, useState } from "react";
import { getAllReviews } from "@/app/apis/review";

interface PaginationType {
  page: number;
  totalPages: number;
  pageSize: number;
  totalReviews: number;
}

interface FetchReviewsParams {
  search?: string;
  orderBy?: "asc" | "desc";
  orderWith?: string;
  isPublished?: boolean;
  pagination?: PaginationType; // ✅ ใช้ Type ที่ชัดเจน
  setPagination?: React.Dispatch<React.SetStateAction<PaginationType>>; // ✅ ใช้ Dispatch ของ React
}

function useFetchgetAllReviews({
  search,
  orderBy,
  orderWith,
  isPublished,
  pagination,
  setPagination, // ✅ ทำให้ Optional
}: FetchReviewsParams) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        // ✅ ดึงข้อมูลรีวิวจาก API
        const response = await getAllReviews(
          search ?? "",                      
          orderBy ?? "desc",                 
          orderWith ?? "createdAt",          
          isPublished !== undefined ? String(isPublished) : "", 
          pagination?.page?.toString() ?? "1",   
          pagination?.pageSize?.toString() ?? "10" 
        );
        console.log("reviews all response: ",response)
        setReviews(response.reviews);
        setError(null);

        // ✅ ตรวจสอบและอัปเดต Pagination ถ้ามี setPagination
        if (setPagination) {
          setPagination(response.pagination);
        }
      } catch (err) {
        setError("Failed to fetch reviews");
      }
      setLoading(false);
    };
    fetchReviews();
  }, [search, orderBy, orderWith, isPublished,pagination?.page, pagination?.pageSize]); 

  return { reviews, loading, error };
}

export default useFetchgetAllReviews;
