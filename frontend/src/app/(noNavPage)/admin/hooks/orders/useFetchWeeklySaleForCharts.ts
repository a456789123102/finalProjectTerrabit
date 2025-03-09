import { useState, useEffect } from "react";
import { fetchgetWeeklySaleForCharts } from "@/app/apis/order";
function useFetchWeeklySaleForCharts() {
    const [orderChartsData, setOrderChartsData] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [lastWowOrders, setLastWowOrders] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [lastWowIncomes, setLastWowIncomes] = useState(0);

    const fetchOrderData = async() => {
        const data =  await fetchgetWeeklySaleForCharts();
        setOrderChartsData(data.data);
        setTotalOrders(data.totalOrders);
        setLastWowOrders(data.lastWowOrders);
        setTotalIncome(data.totalIncome);
        setLastWowIncomes(data.lastWowIncomes);
    };
    useEffect(() =>{
        fetchOrderData();
    },[])
    return { orderChartsData, totalOrders, lastWowOrders, totalIncome, lastWowIncomes };
}

export default useFetchWeeklySaleForCharts