import { useState, useEffect } from "react";
import { fetchAllOrders } from "@/app/apis/order";

export const useFetchOrders = (statuses:string[],forceFetch,searchQuery,pagination, setPagination) => {
    const [orders, setOrders] = useState([]);

    const fetchOrderLists = async () => {
try {
    const orderData = await fetchAllOrders(statuses,searchQuery,pagination.page.toString(),
    pagination.pageSize.toString());
    setOrders(orderData.orders);
    setPagination(orderData.pagination);
} catch (error) {
    console.error("Error fetching orders",error);
}
    };

    useEffect(() =>{
        fetchOrderLists();
    },[statuses, forceFetch,searchQuery, pagination.page, pagination.pageSize]);

return orders;
}

export default useFetchOrders;