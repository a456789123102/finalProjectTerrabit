"use client";
import React, { useState, useEffect } from "react";
import { myOrder, updateOrderAddress, deleteOrder,cancelOrder } from "@/app/apis/order";
import { getOwnAddress } from "@/app/apis/address";
import AddressDropdown from "../components/addressDropdown";

import SlipSection from "../components/slipSection";
import { deleteImage, uploadSlipImage } from "@/app/apis/slipImage";

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

  const handleClearSlipImage = async (orderId: number,status:string) =>{
try {

if(status === "awaiting_slip_upload"|| status === "awaiting_confirmation"){
  const res = await deleteImage(orderId);
  console.log("clear slipImage",res);
  fetchOrders();
}
} catch (error) {
  console.error("error clearing slip",error)
}
  }


  const handleOrderCancel = async (orderId:number) => {
    try {
      console.log("request cancle orderId:", orderId);
      const res = await cancelOrder(orderId);
      console.log("request cancel order:", JSON.stringify(res, null, 2));
      fetchOrders();
      setStatus("awaiting_rejection");
    } catch (error) {
      console.error("Error deleting order:", error);
  }
}

  const handleOrderDelete = async (orderId: number) => {
    try {
      console.log("orderId:", orderId);
      const res = await deleteOrder(orderId);
      console.log("Deleted order:", JSON.stringify(res, null, 2));
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
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
    { key: "awaiting_rejection", label: "To Rejected" },
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
                className="border-2 p-3 flex flex-row justify-between min-h-20"
              >
                <div className="border p-2 w-1/4 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-row p-2 gap-3">
                      <div className=" flex flex-row gap-2">
                        <div className="font-bold">Order ID:</div>
                        <div> {order.id}</div>
                      </div>
                    </div>
                    <div className=" text-slate-700 text-[0.7rem]">
                      {order.items.map((item) => (
                        <div key={item.id} className="border-b gap-2 flex flex-row">
                          <div className="text-black">{item.productName},</div> <div>Quantity: {item.quantity}, Price: {item.price}</div>
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
                <div className="border w-1/4 p-2 gap-1 ">
                  <SlipSection
                    order={order}
                    isModalOpen={isModalOpen}
                    handleImageClick={handleImageClick}
                    handleModalClose={handleModalClose}
                    handleUploadSlip={handleUploadSlip}
                    handleClearSlipImage={handleClearSlipImage}
                  />
                </div>
                <div className="border w-1/4 p-3 flex flex-col gap-2">
                  {
                    order.addressesId && order.status !== "awaiting_slip_upload" && order.status !== "awaiting_confirmation" ? (
                      <div>
                        <div className="text-green-700 text-[1.1rem] mb-2 font-bold">Shipping to:</div>
                        {(() => {
                          const curradd = addresses.find((address) => address.id === order.addressesId)
                          return curradd ? <div className="text-[0.8rem] text-slate-800">{curradd.recipientName}, {curradd.street}, {curradd.city}, {curradd.state}, {curradd.zipCode}</div> : <div>No address found</div>;
                        })()
                        }
                      </div>
                    ) : (
                      <div>
                        {order.addressesId ? (<div className="text-green-700 text-[1.1rem] mb-2 font-bold">Shipping to:</div>) : (<div className="text-red-700 text-[1.1rem] mb-2 font-bold">Please Select an address:</div>)}
                        <AddressDropdown
                          addresses={addresses} // Array of addresses
                          selectedAddress={order.addressesId} // ID of the selected address
                          orderId={order.id} // ID of the order
                          handleSelectAddress={handleSelectAddress} // Callback function to handle address selection
                        />
                      </div>
                    )
                  }

                </div>
                <div className="border w-1/4 p-3">
                  <div className="text-[1.1rem] mb-2 font-bold">Action:</div>
                  <div className="text-[0.8rem] text-white">
                    {order.status === "awaiting_slip_upload" ? (
                      <button className="p-2 px-4 bg-red-500 hover:bg-red-400 shadow-md rounded" onClick={() => { handleOrderDelete(order.id) }}>Delete this Order</button>
                    ) : order.status === "awaiting_confirmation" || order.status === "order_approved" ? 
                    (<button className="p-2 px-4 bg-orange-500 hover:bg-orange-400  shadow-md rounded" onClick={() => {handleOrderCancel(order.id) }}>Cancel this order.</button>) :
                      <button className="p-2 px-4 bg-red-400 hover:bg-red-500  shadow-md rounded">Undo the cancellation.</button>}
                  </div>
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