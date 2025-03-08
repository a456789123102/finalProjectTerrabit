"use client";
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
  orderBy?: "asc" | "desc" | undefined;
  orderWith?: string;
  isPublished?: boolean | null;
  pagination: PaginationType;
  forceFetch?: boolean;
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>;
}

function useFetchgetAllReviews({
  search,
  orderBy,
  orderWith,
  isPublished,
  pagination,
  forceFetch,
  setPagination,
}: FetchReviewsParams) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);

      // ✅ Log ค่าที่กำลังส่งไป API
      console.log("🔹 Sending pagination to API:", pagination);

      try {
        const response = await getAllReviews(
          search ?? "",
          orderBy ?? "desc",
          orderWith ?? "createdAt",
          isPublished !== undefined ? String(isPublished) : "",
          pagination.page.toString(),
          pagination.pageSize.toString()
        );

        // ✅ Log ค่าที่ได้รับกลับจาก API
        console.log("✅ Received response from API:", response);

        setReviews(response.reviews);
        setError(null);

        // ✅ Log ค่าของ pagination ที่จะอัปเดต
        console.log("🔄 Updating pagination state:", response.pagination);

        setPagination((prev) => ({
          ...prev,
          page: response.pagination.page,
          totalPages: response.pagination.totalPages,
          totalReviews: response.pagination.totalReviews,
        }));
      } catch (err) {
        setError("Failed to fetch reviews");
      }

      setLoading(false);
    };

    fetchReviews();
  }, [search, orderBy, orderWith, isPublished, pagination.page, pagination.pageSize, forceFetch]);

  return { reviews, loading, error };
}

export default useFetchgetAllReviews;
