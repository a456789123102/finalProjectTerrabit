import { useState, useEffect } from "react";
import { getTopSellerItems } from "@/app/apis/order";

function useFetchTopSellerForCharts(interval?: string, startDate?: Date, endDate?: Date, orderBy?: string, length?: number) {
  const [chartsData, setChartsData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopSellerLists = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getTopSellerItems(interval, startDate, endDate, orderBy, length);
        console.log("Response from API:", response);

        // ✅ เช็ค response ก่อนใช้ isArray
        if (response && Array.isArray(response.chartsData)) {
          setChartsData(response.chartsData);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (error) {
        console.error("Error fetching top seller items:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellerLists();
  }, [interval, startDate, endDate, orderBy, length]);

  return { chartsData, loading, error };
}

export default useFetchTopSellerForCharts;
