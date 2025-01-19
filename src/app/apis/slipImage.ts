import axios from "axios";


  export const uploadSlipImage = async (orderId: number, image: File) => {
    try {
      const formData = new FormData();
      formData.append("image", image); // ใส่ไฟล์ใน FormData
  
      const res = await axios.post(
        `/api/slipImage/${orderId}/upload`, // URL API
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // กำหนด Content-Type
          },
        }
      );
  
      return res.data; // ส่งกลับข้อมูลที่ได้รับจาก Backend
    } catch (error) {
      console.error("Error uploading slip image:", error);
      throw error;
    }
  };
  
  

// export const deleteImage = async (imageId: number) => {
//   try {
//     const res = await axios.delete(`/api/productImage/${imageId}/delete`);
//     return res.data;
//   } catch (error) {
//     console.error("Error deleting image", error);
//     throw error;
//   }
// };
