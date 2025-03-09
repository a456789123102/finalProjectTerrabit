import  {getTotalReviewsForCharts}  from '@/app/apis/review';
import React, { useEffect, useState, useCallback } from 'react';

function useFetchTotalReviewsForCharts(interval: string, startDate: Date | string, endDate: Date | string) {
  const [chartsData, setChartsData] = useState<any[]>([]);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const formattedStartDate = startDate instanceof Date ? startDate.toISOString().split("T")[0] : startDate;
      const formattedEndDate = endDate instanceof Date ? endDate.toISOString().split("T")[0] : endDate;

      const data = await getTotalReviewsForCharts(interval, formattedStartDate, formattedEndDate);
      console.log("data:", data);

      setChartsData(data.data || []);
      setTotalComments(data.totalComments || 0);
      setAverageRating(data.averageRating || 0);
    } catch (err) {
      console.error("Error fetching reviews data for charts:", err);
      setError("Failed to fetch reviews data");
    } finally {
      setLoading(false);
    }
  }, [interval, startDate, endDate]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { chartsData, totalComments, averageRating, loading, error };
}

export default useFetchTotalReviewsForCharts;
