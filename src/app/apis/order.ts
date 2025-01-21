import axios from "axios";

export const myOrder = async (status: string) => {
  try {
    const res = await axios.get(`/api/order/${status}/myOrder`);
    console.log("Response from API:", JSON.stringify(res.data, null, 2)); // Debug API Response
    return res.data; // คาดหวังเป็น Array ตรง ๆ
  } catch (error) {
    console.error("Error fetching order", error.response || error.message);
    throw error;
  }
};


export const getAllOrders = async (status?: Array<string>) => {
  try {
    // ตรวจสอบและแปลง status เป็น query string
    const queryString = status?.length
      ? `status=${status.map((s) => encodeURIComponent(s)).join(",")}`
      : "";
console.log(`queryString: ${queryString}`);
    // รวม query string กับ URL
    const url = queryString ? `/api/order/get?${queryString}` : "/api/order/get";

    const res = await axios.get(url);
    return res.data; 
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const updateOrderAddress = async (id: number,newAddressId:number) => {
  try {
    const res = await axios.patch(`/api/order/update/${id}`,{newAddressId});
    console.log(`Patching :/api/order/update/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const deleteOrder = async (id: number) => {
  try {
    const res = await axios.delete(`/api/order/${id}/delete`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const cancelOrder = async (id: number) => {
  try {
    const statusRequest = "awaiting_rejection";
    const res = await axios.patch(`/api/order/${id}/userUpdateStatus`, { status: statusRequest });
    return res.data;
  } catch (error) {
    throw error;
  }
};
