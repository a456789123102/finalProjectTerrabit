'use client'
import React, { useState, useEffect, useCallback } from "react";
import { getAllOrders } from "@/app/apis/order";

function CheckoutStatus() {
  const [selectedStatus, setSelectedStatus] = useState<string[]>(["pending", "confirmed", "rejected"]);
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const orderData = await getAllOrders(selectedStatus);
      setOrders(orderData);
      console.log("Fetched orders:", orderData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, [selectedStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div>
      <h1>Checkout Orders</h1>
      <div>
        {/* UI สำหรับแสดงผลคำสั่งซื้อ */}
      </div>
    </div>
  );
}

export default CheckoutStatus;

