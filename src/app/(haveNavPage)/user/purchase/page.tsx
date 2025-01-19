"use client";
import React, { useState, useEffect } from "react";
import { myOrder, updateOrderAddress } from "@/app/apis/order";
import { getOwnAddress } from "@/app/apis/address";
import AddressDropdown from "../components/addressDropdown";

import SlipSection from "../components/slipSection";
import { uploadSlipImage } from "@/app/apis/slipImage";

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  totalPrice: number;
  items: OrderItem[];
  status: string;
  addressesId: number;
}

interface Address {
  id: number;
  recipientName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Status {
  key: string;
  label: string;
}


function Orders() {
  const [orders, setOrders] = useState<Order[]>([]); // Use Order interface
  const [addresses, setAddresses] = useState<Address[]>([]); // Use Address interface
  const [status, setStatus] = useState<string>("awaiting_slip_upload"); // Status key
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    fetchOrders(); // โหลดข้อมูลเมื่อ component ถูก mount หรือ status เปลี่ยน
  }, [status]);

  useEffect(() => {
    fetchAddress(); // โหลดข้อมูลเมื่อ orders เปลี่ยน
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const orderItems = await myOrder(status);
      setOrders(orderItems); // อัปเดตข้อมูล order
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchAddress = async () => {
    try {
      const addressItems = await getOwnAddress();
      console.log("Fetched addresses:", JSON.stringify(addressItems, null, 2));
      setAddresses(addressItems.address); // อัปเดตข้อมูล address
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleSelectAddress = async (orderId: number, newAddressId: number) => {
    try {
      console.log("orderId:", orderId, "newAddressId:", newAddressId);
      const res = await updateOrderAddress(orderId, newAddressId);
      console.log("updated order addresses:", JSON.stringify(res, null, 2));
      await fetchOrders(); // รีเฟรชข้อมูลหลังจากอัปเดตที่อยู่สำเร็จ
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handleUploadSlip = async (orderId: number, slip: File) => {
    try {
      console.log("orderId:", orderId, "slip:", slip);
    const res = await uploadSlipImage(orderId, slip);
    console.log("Uploaded slip:", JSON.stringify(res, null, 2));
    fetchOrders();
    } catch (error) {
      console.error("Error uploading slip:", error);
    }
  }


  const handleImageClick = () => {
    setIsModalOpen(true); // เปิด Modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // ปิด Modal
  };

  const statuses: Status[] = [
    { key: "awaiting_slip_upload", label: "To Pay" },
    { key: "awaiting_confirmation", label: "To Confirmed" },
    { key: "order_approved", label: "Approved" },
    { key: "order_rejected", label: "Rejected" },
    { key: "order_cancelled", label: "Cancelled" },
  ];

  return (
    <div className="flex flex-col items-center gap-3 min-w-[590px]">
      <div className="self-start p-2 bg-white w-full pl-5">Checkout Section</div>
      <div className="bg-gray-100 w-5/6 justify-center flex flex-col mt-5 p-6 m-4 border">
        <div className="flex flex-row bg-white justify-between">
          {statuses.map((item) => (
            <button
              key={item.key}
              className={`p-4 px-6 transition-all duration-300 hover:text-yellow-600 text-[1.1rem] w-full ${status === item.key
                ? "border-b-2 border-yellow-600 text-yellow-600"
                : "border-b-2"
                }`}
              onClick={() => setStatus(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-5 bg-white w-full mt-5">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="border-2 p-2 flex flex-row justify-between min-h-16"
              >
                <div className="border p-2 w-1/4">
                  <div className="flex flex-row p-2 gap-3">
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
                <div className="border w-1/4 p-2 gap-1 ">
                  <SlipSection
                    order={order}
                    isModalOpen={isModalOpen}
                    handleImageClick={handleImageClick}
                    handleModalClose={handleModalClose}
                    handleUploadSlip={handleUploadSlip}
                  />
                </div>
                <div className="border w-1/4 p-2 flex flex-col gap-2">
                  {order.addressesId ? (<div className="text-green-700">Shipping to:</div>):(<div className="text-red-700">Please Select an address:</div>)}
                  <AddressDropdown
                    addresses={addresses} // Array ของ Address
                    selectedAddress={order.addressesId} // ID ของที่อยู่ที่เลือก
                    orderId={order.id} // ID ของออร์เดอร์
                    handleSelectAddress={handleSelectAddress} // ฟังก์ชัน callback
                  />


                </div>
                <div className="border w-1/4 p-2">
                  <div>Action</div>
                  {order.status === "awaiting_slip_upload" ? (
                    <div>Delete</div>
                  ) : <div>Cancel</div>}
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