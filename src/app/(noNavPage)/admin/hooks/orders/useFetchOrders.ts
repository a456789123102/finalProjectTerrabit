import { useState, useEffect } from "react";
import { fetchAllOrders } from "@/app/apis/order";

export const useFetchOrders = (statuses:string[],forceFetch) => {
    const [orders, setOrders] = useState([]);

    const fetchOrderLists = async () => {
try {
    const orderData = await fetchAllOrders(statuses);
    setOrders(orderData.orders);
} catch (error) {
    console.error("Error fetching orders",error);
}
    };

    useEffect(() =>{
        fetchOrderLists();
    },[statuses, forceFetch]);

return orders;
}

export default useFetchOrders;