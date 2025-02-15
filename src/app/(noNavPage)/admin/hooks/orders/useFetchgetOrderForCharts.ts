import { useState, useEffect } from "react";
import { fetchgetOrderForCharts } from "@/app/apis/order";

interface TotalData {
    totalOrders: number;
    pending: number;
    success: number;
    rejected: number;
}

interface ComparativeGrowthData {
    totalOrders: number;
    pending: number;
    success: number;
    rejected: number;
}

export const useFetchOrderForCharts = (interval: string, startDate: Date, endDate: Date) => {
    const [chartsData, setChartsData] = useState<any[]>([]);
    const [total, setTotal] = useState<TotalData>({ totalOrders: 0, pending: 0, success: 0, rejected: 0 });
    const [comparativeGrowth, setComparativeGrowth] = useState<ComparativeGrowthData>({ totalOrders: 0, pending: 0, success: 0, rejected: 0 });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrderData = async () => {
        setLoading(true);
        setError(null);
        try {
            const chartData = await fetchgetOrderForCharts(interval, startDate, endDate);
            setChartsData(chartData.data || []);
            setTotal(chartData.total || { totalOrders: 0, pending: 0, success: 0, rejected: 0 });
            setComparativeGrowth(chartData.ComparativeGrowth || { totalOrders: 0, pending: 0, success: 0, rejected: 0 });
        } catch (err) {
            console.error("Error fetching order data for charts:", err);
            setError("Failed to fetch order data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderData();
    }, [interval, startDate, endDate]);

    return { chartsData, total, comparativeGrowth, loading, error };
};

export default useFetchOrderForCharts;
