"use client";
import React, { useState, useEffect } from "react";
import { myOrder, updateOrderAddress } from "@/app/apis/order";
import { getOwnAddress } from "@/app/apis/address";
import AddressDropdown from "../components/addressDropdown";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [status, setStatus] = useState("awaiting_slip_upload"); // สถานะคำสั่งซื้อ

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderItems = await myOrder(status);
        setOrders(orderItems); // อัปเดต State
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();

  }, [status]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const addressItems = await getOwnAddress();
        console.log("Fetched addresses:", JSON.stringify(addressItems, null, 2));
        setAddresses(addressItems.address);
        console.log("addresses:", addresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    }
    fetchAddress();
  }, [orders]);


  const handleSelectAddress = async (orderId: string, newAddressId: string) => {
    try {
      console.log("orderId:", orderId, "newAddressId:", newAddressId);
      //  const res = await updateOrderAddress(orderId,newAddressId);
      //  console.log("updated order addresses:", JSON.stringify(res, null, 2)); 
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const statuses = [
    { key: "awaiting_slip_upload", label: "To Pay" },
    { key: "awaiting_confirmation", label: "To Confirmed" },
    { key: "order_approved", label: "Approved" },
    { key: "order_cancelled", label: "Cancelled" },
  ];

  return (
    <div className="  flex flex-col items-center gap-3 min-w-[590px] ">
      <div className='self-start p-2 bg-white w-full pl-5'>checkout section</div>
      <div className=" bg-gray-100 w-5/6 justify-center flex flex-col mt-5 p-6 m-4 border">
        <div className="flex flex-row bg-white justify-between">
          {statuses.map((item) => (
            <button
              key={item.key}
              className={` p-4 px-6 transition-all duration-300  hover:text-yellow-600 text-[1.1rem] w-full
            ${status === item.key ? "border-b-2  border-yellow-600 text-yellow-600 " : "border-b-2"}`}
              onClick={() => setStatus(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-5 bg-white w-full mt-5 ">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="border-2 p-2 flex flex-row justify-between min-h-16">
                <div className="border p-2 w-1/4">
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
                <div className="border w-1/4 p-2 gap-1 flex flex-col">
                  <div>Upload slip here</div>
                  <input type="file" placeholder="Slip Image" />
                </div>
                <div className="border w-1/4 p-2 flex flex-col gap-2">
                  <div>Shipping to : </div>
                  <AddressDropdown addresses={addresses} selectedAddress={order.addressesId} oderId={order.id} handleSelectAddress={handleSelectAddress} />
                </div>
                <div className=" border w-1/4 p-2">
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
