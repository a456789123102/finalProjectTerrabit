'use client';
import React, { useState, useEffect, useCallback } from "react";
import { getAllOrders } from "@/app/apis/order";

function CheckoutStatus() {
  const [selectedStatus, setSelectedStatus] = useState<string[]>(["awaiting_slip_upload","awaiting_confirmation", "order_approved", "order_cancelled"]);
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const orderData = await getAllOrders(selectedStatus);
      setOrders(orderData.orders); 
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
        {orders.map((order) => (
          <div key={order.id}>
            Total Price: {order.totalPrice}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckoutStatus;
