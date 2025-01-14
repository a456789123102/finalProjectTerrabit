"use client";
import React, { useState, useEffect } from "react";
import { myOrder } from "@/app/apis/order";

function Orders() {
  const [orders, setOrders] = useState([]); // เก็บข้อมูล orders
  const [status, setStatus] = useState("awaiting_slip_upload"); // สถานะคำสั่งซื้อ

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

  const statuses = [
    { key: "awaiting_slip_upload", label: "Pending upload slip" },
    { key: "awaiting_confirmation", label: "Pending confirmation" },
    { key: "order_approved", label: "Approved" },
    { key: "order_cancelled", label: "Cancelled" },
  ];

  return (
    <div className="  flex flex-col items-center gap-3 min-w-[590px]">
      <div className='self-start p-2 bg-white w-full pl-5'>checkout section</div>
      <div className=" bg-white w-5/6 justify-center flex flex-col mt-5 p-6">
        <div className="p-4 text-xl">Payment Status</div>
        <div className="flex flex-row ">
          {statuses.map((item) => (
            <button
              key={item.key}
              className={`p-2 px-4 transition-all duration-300 hover:text-blue-600 hover:border-b
            ${status === item.key ? "border-x border-b bg-gradient-to-t from-yellow-200 to-white" : ""}`}
              onClick={() => setStatus(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-4 bg-white w-full mt-5 ">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="border p-2 flex flex-row justify-between">
                <div className="border p-2 w-full">
                  <div className=" flex flex-row p-2 gap-3">
                    <div>Order ID: {order.id}</div>
                    <div>Total: {order.totalPrice} THB</div>
                    
                  </div>
                  <div className="bg-red-300 text-slate-700 text-[0.7rem]">
                    {order.items.map((item) => (
                      <div key={item.id}>
                        Product ID: {item.productId}, Quantity: {item.quantity}, Price: {item.price}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border w-full p-2 gap-1 flex flex-col">
                  <div>Upload slip here</div>
                  <input type="file" placeholder="Slip Image" />
                </div>
                <div className="border w-full p-2">Shipping to</div>
                <div className=" border w-full p-2">
                  <div>Action</div>
                  <div>delete</div>
                </div>
              </div>
            ))
          ) : (
            <li>No orders found.</li>
          )}
        </div>
      </div>

    </div>
  );
}

export default Orders;
