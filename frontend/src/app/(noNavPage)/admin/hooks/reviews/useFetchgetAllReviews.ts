import React, { useEffect, useState, useCallback } from "react";
import { getAllReviews } from "@/app/apis/review";

interface PaginationType {
  page: number;
  totalPages: number;
  pageSize: number;
  totalReviews: number;
}

interface FetchReviewsParams {
  search?: string;
  orderBy?: string; 
  orderWith?: string;
  isPublished?: boolean | null;
  pagination: PaginationType;
  forceFetch?: boolean;
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>;
}

function useFetchgetAllReviews({
  search,
  orderBy = "desc", 
  orderWith = "createdAt",
  isPublished,
  pagination,
  forceFetch,
  setPagination,
}: FetchReviewsParams) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);

    try {
      const validOrderBy: "asc" | "desc" = orderBy === "asc" ? "asc" : "desc";

      const response = await getAllReviews(
        search ?? "",
        validOrderBy,
        orderWith,
        isPublished !== undefined ? String(isPublished) : "",
        pagination.page.toString(),
        pagination.pageSize.toString()
      );

      setReviews(response.reviews ?? []);
      setError(null);

      setPagination((prev) => ({
        ...prev,
        page: response.pagination?.page ?? prev.page,
        totalPages: response.pagination?.totalPages ?? prev.totalPages,
        totalReviews: response.pagination?.totalReviews ?? prev.totalReviews,
      }));
    } catch (err) {
      setError("Failed to fetch reviews");
    }

    setLoading(false);
  }, [search, orderBy, orderWith, isPublished, pagination.page, pagination.pageSize, setPagination]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews, forceFetch]);

  return { reviews, loading, error };
}

export default useFetchgetAllReviews;
