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

    // ส่ง request ไปยัง API
    const res = await axios.get(url);
    return res.data; // ส่งข้อมูล JSON กลับ
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

