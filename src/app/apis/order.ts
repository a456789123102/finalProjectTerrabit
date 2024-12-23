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

