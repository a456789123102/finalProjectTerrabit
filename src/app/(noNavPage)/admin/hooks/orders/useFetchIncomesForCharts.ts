import React, { useCallback, useEffect, useState } from "react";
import { getTotalIncomesForCharts } from "@/app/apis/order";
function useFetchIncomesForCharts(
  interval: string,
  startDate: Date,
  endDate: Date
) {
  const [chartsData, setChartsData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIncomes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTotalIncomesForCharts(interval, startDate, endDate);
      console.log("data:", data);
      setChartsData(data.data || []);
      setTotal(data.totalIncomes || 0);
    } catch (err) {
      console.error("Error fetching incomes data for charts:", err);
      setError("Failed to fetch incomes data");
    } finally {
      setLoading(false);
    }
  }, [interval, startDate, endDate]); 
  
  useEffect(() => {
    fetchIncomes();
  }, [fetchIncomes]);

  return { chartsData, total, loading, error };
}

export default useFetchIncomesForCharts;
