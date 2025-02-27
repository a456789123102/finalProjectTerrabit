"use client";
import React, { useState, useEffect } from "react";
import { myOrder, updateOrderAddress, deleteOrder, refoundOrder, cancelledOrder } from "@/app/apis/order";
import { getOwnAddress } from "@/app/apis/address";
import AddressDropdown from "../components/addressDropdown";

import SlipSection from "../components/slipSection";
import { deleteImage, uploadSlipImage } from "@/app/apis/slipImage";
import ActionSection from "../components/ActionSection";
import Number from "@/app/components/Number";

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
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
  currentAddress: string;
  provinceName: string;
  amphureName: string;
  tambonName: string;
  zipCode: string;
  mobileNumber: string;
  email?: string;
}

interface Status {
  key: string;
  label: string;
}


function Orders() {
  const [orders, setOrders] = useState<Order[]>([]); // Use Order interface
  const [addresses, setAddresses] = useState<Address[]>([]); // Use Address interface
  const [status, setStatus] = useState<string[]>(["pending_payment_proof"]); // Status key
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
      setAddresses(addressItems.addresses); // อัปเดตข้อมูล address
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

  const handleClearSlipImage = async (orderId: number, status: string) => {
    try {

      if (status === "pending_payment_proof" || status === "pending_payment_verification") {
        const res = await deleteImage(orderId);
        console.log("clear slipImage", res);
        fetchOrders();
      }
    } catch (error) {
      console.error("error clearing slip", error)
    }
  }


  const handleRefoundOrder = async (orderId: number) => {
    try {
      console.log("request Refound orderId:", orderId);
      const res = await refoundOrder(orderId);
      console.log("request cancel order:", JSON.stringify(res, null, 2));
      fetchOrders();
      setStatus(["pending_refound"]);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  }

  const handleCancelledOrder = async (orderId: number) => {
    try {
      console.log("request Refound orderId:", orderId);
      const res = await cancelledOrder(orderId);
      console.log("request cancel order:", JSON.stringify(res, null, 2));
      fetchOrders();
      setStatus(["pending_refound"]);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  }

  // const handleOrderDelete = async (orderId: number) => {
  //   try {
  //     console.log("orderId:", orderId);
  //     const res = await deleteOrder(orderId);
  //     console.log("Deleted order:", JSON.stringify(res, null, 2));
  //     fetchOrders();
  //   } catch (error) {
  //     console.error("Error deleting order:", error);
  //   }
  // }

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const statuses: { key: string[], label: string }[] = [
    { key: ["pending_payment_proof"], label: "To Pay" },
    { key: ["pending_payment_verification"], label: "Awaiting Confirm" },
    { key: ["payment_verified"], label: "Payment Verified" },
    { key: ["cancelled_by_admin", "cancelled_by_user", "refund_rejected"], label: "Unsuccessful Order" },
    { key: ["refund_completed"], label: "Refund Completed" },
  ];

  return (
    <div className="flex flex-col items-center gap-3 min-w-[590px]">
      <div className="self-start p-2 bg-white w-full pl-5">Checkout Section</div>
      <div className="bg-gray-100 w-5/6 justify-center flex flex-col mt-5 p-6 m-4">
        <div className="flex flex-row bg-white justify-between w-full shadow-sm">
          {statuses.map((item) => (
            <button
              key={item.key}
              className={`p-4 px-6 transition-all duration-300 hover:text-yellow-600 text-[1.1rem] w-full ${item.key.every((k) => status.includes(k))
                ? "border-b-2 border-yellow-600 text-yellow-600"
                : "border-b-2"
                }`}
              onClick={() => setStatus(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-5 bg-gray-100 w-full mt-5">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="font-poppins shadow-sm flex flex-row justify-between min-h-24 bg-white"
              >
                <div className=" border-x border-gray-300  w-1/4 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-row gap-3 items-center">
                      <div className=" flex flex-row gap-2 border-b border-gray-300 mb-3 py-[10px] w-full items-baseline text-[1.1rem]">
                        <div className="font-bold pl-2">Order ID:</div>
                        <div> {order.id}</div>
                      </div>
                    </div>
                    <div className=" text-slate-700 text-[0.75rem]">
                      {order.items.map((item,i) => (
                        <div key={item.id} className=" px-2 gap-2 flex flex-row">
                           <div className="text-black">{i}.</div> 
                          <div className="text-black overflow-clip">{item.productName},</div> 
                          <div>Quantity: {item.quantity},</div> 
                          <div>Price:</div> 
                          <Number>{item.price}</Number>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-row  p-2 gap-2 self-end">
                    <div className="font-bold">Total: </div>
                    <div>{order.totalPrice} </div>
                    <div>THB</div>
                  </div>

                </div>
                <div className="border-r border-gray-300  w-1/4 flex flex-col justify-between">
                  <SlipSection
                    order={order}
                    isModalOpen={isModalOpen}
                    handleImageClick={handleImageClick}
                    handleModalClose={handleModalClose}
                    handleUploadSlip={handleUploadSlip}
                    handleClearSlipImage={handleClearSlipImage}
                  />
                </div>
                <div className="border-r-2 w-1/4 p-3 flex flex-col gap-2">
                  {
                    order.addressesId && order.status !== "pending_payment_proof" && order.status !== "pending_payment_verification" ? (
                      <div>
                        <div className="text-green-700 text-[1.1rem] mb-2 font-bold">Shipping to:</div>
                        {(() => {
                          const curradd = addresses.find((address) => address.id === order.addressesId)
                          return curradd ? (
                            <div className="text-[0.8rem] text-slate-800">
                              {curradd.recipientName}, {curradd.currentAddress}, {curradd.tambonName}, {curradd.amphureName}, {curradd.provinceName}, {curradd.zipCode}
                            </div>
                          ) : (
                            <div>No address found</div>
                          );

                        })()
                        }
                      </div>
                    ) : (
                      <div>
                        {order.addressesId ? (<div className="text-green-700 text-[1.1rem] mb-2 font-bold">Shipping to:</div>) : (<div className="text-red-700 text-[1.1rem] mb-2 font-bold">Please Select an address:</div>)}
                        <AddressDropdown
                          addresses={addresses}
                          selectedAddress={order.addressesId}
                          orderId={order.id}
                          handleSelectAddress={handleSelectAddress}
                        />
                      </div>
                    )
                  }

                </div>
                <div className="border-r-2 w-1/4 p-3">
                  {/* <div className="text-[1.1rem] mb-2 font-bold">Action:</div>
                  <div className="text-[0.8rem] text-white">
                    {order.status === "pending_payment_proof" ? (
                      <button className="p-2 px-4 bg-red-500 hover:bg-red-400 shadow-md rounded" onClick={() => { handleOrderDelete(order.id) }}>Delete this Order</button>
                    ) : order.status === "pending_payment_verification" || order.status === "payment_verified" ? 
                    (<button className="p-2 px-4 bg-orange-500 hover:bg-orange-400  shadow-md rounded" onClick={() => {handleRefoundOrder(order.id) }}>Cancel this order.</button>) :
                      <button className="p-2 px-4 bg-red-400 hover:bg-red-500  shadow-md rounded">Undo the cancellation.</button>}
                  </div> */}
                  <ActionSection
                    order={order}
                    handleRefoundOrder={handleRefoundOrder}
                    handleCancelledOrder={handleCancelledOrder}
                  />

                </div>
              </div>
            ))
          ) : (
            <div className="p-5">No orders found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;