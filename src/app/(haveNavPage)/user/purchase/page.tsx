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
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [status, setStatus] = useState<string[]>(["pending_payment_proof"]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    fetchOrders();
  }, [status]);

  useEffect(() => {
    fetchAddress();
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const orderItems = await myOrder(status);
      setOrders(orderItems);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchAddress = async () => {
    try {
      const addressItems = await getOwnAddress();
      console.log("Fetched addresses:", JSON.stringify(addressItems, null, 2));
      setAddresses(addressItems.addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleSelectAddress = async (orderId: number, newAddressId: number) => {
    try {
      console.log("orderId:", orderId, "newAddressId:", newAddressId);
      const res = await updateOrderAddress(orderId, newAddressId);
      console.log("updated order addresses:", JSON.stringify(res, null, 2));
      await fetchOrders();
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
    { key: ["pending_payment_verification", "pending_refound"], label: "Awaiting Confirm" },
    { key: ["payment_verified"], label: "Payment Verified" },
    { key: ["cancelled_by_admin", "cancelled_by_user", "refund_rejected"], label: "Unsuccessful Order" },
    { key: ["refund_completed"], label: "Refund Completed" },
  ];

  return (
    <div className="flex flex-col items-center gap-3 ">
      <div className="self-start p-2 bg-white w-full pl-5 border border-gray-300">Checkout Section</div>
      <div className="bg-gray-100 w-full justify-center flex flex-col mt-5 p-6 m-4 min-w-96">
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
        <div className="flex flex-col gap-5 bg-gray-100 w-full mt-5 ">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="font-poppins shadow-sm flex flex-row justify-between min-h-40 bg-white py-2"
              >
                <div className=" px-2 border-x border-gray-300  w-1/4 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-row gap-3 items-center">
                      <div className=" flex flex-row gap-2 border-b border-gray-300 mb-3 py-[10px] w-full items-baseline text-[1.1rem]">
                        <div className=" pl-2">Order ID:</div>
                        <div> #{String(order.id).padStart(4, "0")}</div>
                      </div>
                    </div>
                    <div className=" text-slate-700 text-[0.75rem] flex flex-col">
                      <div className="px-2 py-2 grid grid-cols-4 items-center gap-2 text-black font-bold">
                        <div className="col-span-2">Items</div>
                        <div className="col-span-1">Quantity</div>
                        <div className="col-span-1">Price</div>
                      </div>
                      {order.items.map((item, i) => (
                        <div key={item.id} className="px-2 grid grid-cols-4 items-center gap-2">
                          <div className="text-black overflow-hidden col-span-2">{i + 1}.{item.productName}</div>
                          <div className="col-span-1">{item.quantity}</div>
                          <div className="col-span-1"><Number>{item.price}</Number></div>
                        </div>

                      ))}
                    </div>
                  </div>
                  <div className="flex flex-row  p-2 gap-2 justify-between">
                    <div className="flex flex-row gap-2">
                      <div className="font-bold">Total: </div>
                      <div>{order.totalPrice} </div>
                      <div>THB</div>
                    </div>
 <div className="flex flex-row gap-1">
 <div className="font-bold">Status: </div>
 <div className="text-slate-700">{order.status.replaceAll("_"," ")}</div>
 </div>
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
                <div className="border-r w-1/4 px-2 flex flex-col gap-2 border-gray-300">
                  {
                    order.addressesId && order.status !== "pending_payment_proof" && order.status !== "pending_payment_verification" ? (
                      <div>
                        <div className="flex flex-row gap-3 items-center">
                          <div className="flex flex-row gap-2 border-b border-gray-300 mb-3 py-[10px] w-full items-baseline text-[1.1rem]">
                            <div className="pl-2 text-green-700">Shipping to:</div>
                          </div>
                        </div>
                        {(() => {
                          const curradd = addresses.find((address) => address.id === order.addressesId);
                          return curradd ? (
                            <div className="text-[0.8rem] text-slate-800 px-2">
                              {curradd.recipientName}, {curradd.currentAddress}, {curradd.tambonName}, {curradd.amphureName}, {curradd.provinceName}, {curradd.zipCode}
                            </div>
                          ) : (
                            <div className="px-2">No address found</div>
                          );
                        })()}
                      </div>
                    ) : (
                      <div>
                        <div className="flex flex-row gap-3 items-center">
                          <div className="flex flex-row gap-2 border-b border-gray-300 mb-3 py-[10px] w-full items-baseline text-[1.1rem]">
                            <div className={` pl-2 ${order.addressesId ? "text-green-700" : "text-red-700"}`}>
                              {order.addressesId ? "Shipping to:" : "Please Select an address:"}
                            </div>
                          </div>
                        </div>
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

                <div className="border-r w-1/4 px-2 flex flex-col gap-2 border-gray-300">
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