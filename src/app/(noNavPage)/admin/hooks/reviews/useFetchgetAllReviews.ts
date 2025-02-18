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
  orderBy?: "asc" | "desc"| undefined;
  orderWith?: string;
  isPublished?: boolean |null;
  pagination?: PaginationType; 
  forceFetch?: boolean; 
  setPagination?: React.Dispatch<React.SetStateAction<PaginationType>>; 
}

function useFetchgetAllReviews({
  search,
  orderBy,
  orderWith,
  isPublished,
  pagination,
  forceFetch,
  setPagination, // ✅ ทำให้ Optional
}: FetchReviewsParams) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
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
  }, [search, orderBy, orderWith, isPublished,pagination?.page, pagination?.pageSize,forceFetch]); 

  return { reviews, loading, error };
}

export default useFetchgetAllReviews;
