"use client";
import React, { useState, useEffect } from "react";
import { myOrder } from "@/app/apis/order";

function Orders() {
  const [orders, setOrders] = useState([]); // เก็บข้อมูล orders
  const [status, setStatus] = useState("pending"); // สถานะคำสั่งซื้อ

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderItems = await myOrder(status);
        console.log("Fetched orders:", JSON.stringify(orderItems, null, 2)); // Debug Response
        setOrders(orderItems); // อัปเดต State
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [status]);

  return (
    <div>
      <h1>Payment Status</h1>
      <div>
        <button onClick={() => setStatus("pending")}>Pending</button>
        <button onClick={() => setStatus("confirmed")}>Confirmed</button>
        <button onClick={() => setStatus("cancelled")}>Cancelled</button>
      </div>
      <ul>
        {orders.length > 0 ? (
          orders.map((order) => (
            <li key={order.id}>
              Order ID: {order.id}, Total: {order.totalPrice}, Status: {order.status}
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    Product ID: {item.productId}, Quantity: {item.quantity}, Price: {item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <li>No orders found.</li>
        )}
      </ul>
    </div>
  );
}

export default Orders;
