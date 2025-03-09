import { getYearlySaleForCharts } from "@/app/apis/order";
import { useState, useEffect } from "react";

function useFetchgetYearlySalesForCharts() {
  const [chartsData, setChartsData] = useState([]);
  const [totalOrders, setTotalOrders] = useState<{
    thisYear: number;
    lastYear: number;
    compareGrowth: number;
  }>({
    thisYear: 0,
    lastYear: 0,
    compareGrowth: 0,
  });
  const [totalSales, setTotalSales] = useState<{
    thisYear: number;
    lastYear: number;
    compareGrowth: number;
  }>({
    thisYear: 0,
    lastYear: 0,
    compareGrowth: 0,
  });

  const [totalItemsSales, setTotalItemsSales] = useState<{
    lastYear: number;
    thisYear: number;
    compareGrowth: number;
  }>({
    lastYear: 0,
    thisYear: 0,
    compareGrowth: 0,
  });

  const fetchSalesData = async () => {
    try {
      const data = await getYearlySaleForCharts();
      setChartsData(data.data);
      setTotalOrders(data.totalOrders);
      setTotalSales(data.totalSales);
      setTotalItemsSales(data.totalItemsSales);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);
  return { chartsData, totalOrders, totalSales, totalItemsSales };
}

export default useFetchgetYearlySalesForCharts;
