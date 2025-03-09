import { getTotalUsersForCharts } from '@/app/apis/user';
import React, { useEffect, useState, useCallback } from 'react';

function useFetchUsersForCharts(interval: string, startDate: string | Date, endDate: string | Date) {
  const [chartsData, setChartsData] = useState<any[]>([]);
  const [totalActiveUsers, setTotalActiveUsers] = useState<number>(0);
  const [totalInactiveUsers, setTotalInactiveUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const formattedStartDate = startDate instanceof Date ? startDate.toISOString().split('T')[0] : startDate;
      const formattedEndDate = endDate instanceof Date ? endDate.toISOString().split('T')[0] : endDate;

      const data = await getTotalUsersForCharts(interval, formattedStartDate, formattedEndDate);
      console.log("data:", data);

      setChartsData(data.data || []);
      setTotalActiveUsers(data.totalActiveUsers || 0);
      setTotalInactiveUsers(data.totalInactiveUsers || 0);
    } catch (err) {
      console.error("Error fetching users data for charts:", err);
      setError("Failed to fetch users data");
    } finally {
      setLoading(false);
    }
  }, [interval, startDate, endDate]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { chartsData, totalActiveUsers, totalInactiveUsers, loading, error };
}

export default useFetchUsersForCharts;
