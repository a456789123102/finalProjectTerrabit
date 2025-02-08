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
        console.log('Fetched data:', data);  // ทดสอบการ log ข้อมูล เพื่อทดสอบการใช้ API ใน component อื่น��
        setOrderChartsData(data.data);
        setTotalOrders(data.totalOrders);
        setLastWowOrders(data.lastWowOrders);
        setTotalIncome(data.totalIncome);
        setLastWowIncomes(data.lastWowIncomes);
    };
    useEffect(() =>{
        fetchOrderData();
        console.log(
            'ChartsData:', orderChartsData,
            'TotalOrders:', totalOrders,
            'LastWowOrders:', lastWowOrders,
            'TotalIncome:', totalIncome,
            'LastWowIncomes:', lastWowIncomes,
        )
    },[])
    return { orderChartsData, totalOrders, lastWowOrders, totalIncome, lastWowIncomes };
}

export default useFetchWeeklySaleForCharts