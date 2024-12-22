"use client";
import React, { useState, useEffect } from "react";
import { myOrder } from "@/app/apis/order";

function Orders() {
  const [order, setOrder] = useState([]); // สถานะสำหรับจัดเก็บข้อมูล order
  const [status, setStatus] = useState("pending"); // สถานะปัจจุบัน

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const orderItems = await myOrder(status);
        console.log("Fetched data from myOrder:", JSON.stringify(orderItems, null, 2));
  
        if (Array.isArray(orderItems)) {
          setOrder(orderItems);
        } else {
          console.error("Unexpected data format:", orderItems);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrderItems();
  }, [status]);
  
  useEffect(() => {
    console.log("Order state updated:", JSON.stringify(order, null, 2));
  }, [order]);

  return (
    <div>
      <h1>Payment Status</h1>
      <div>
        <button onClick={() => setStatus("pending")}>Pending</button>
        <button onClick={() => setStatus("approve")}>Approve</button>
        <button onClick={() => setStatus("reject")}>Reject</button>
      </div>
      <ul>
        {/* แสดงรายการ order */}
        {order.map((item: any) => (
          <li key={item.id}>
            Order ID: {item.id}, Total: {item.totalPrice}, Status: {item.status}
            <ul>
              {/* แสดงรายการ items */}
              {item.items.map((subItem: any) => (
                <li key={subItem.id}>
                  Product ID: {subItem.productId}, Quantity: {subItem.quantity}, Price: {subItem.price}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
