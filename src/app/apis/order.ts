import axios from "axios";

export const myOrder = async (status: string) => {
  try {
    const res = await axios.get(`/api/order/${status}/myOrder`);
    console.log("Response from API:", JSON.stringify(res.data, null, 2)); 
    return res.data.orders; // ดึงเฉพาะ `orders` จาก Response
  } catch (error) {
    console.error("Error fetching order", error.response || error.message);
    throw error; 
  }
};
