import { useState, useEffect } from "react";
import { fetchgetOrderForCharts } from "@/app/apis/order";

export const useFetchOrderForCharts = (interval:string,startDate:Date,endDate:Date) => {
    const [chartsData, setChartsData] = useState([]);

    const fetchOrderData = async () => {
        try {
            const chartData = await fetchgetOrderForCharts(interval,startDate,endDate);
            setChartsData(chartData);
        } catch (error) {
            console.error("Error fetching order data for charts:", error);
        }
    };

    useEffect(() => {
        fetchOrderData();
    }, [interval,startDate,endDate]);

    return chartsData;
};

export default useFetchOrderForCharts;