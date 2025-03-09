import axios from "axios";


  export const uploadSlipImage = async (orderId: number, image: File) => {
    try {
      const formData = new FormData();
      formData.append("image", image); 
  
      const res = await axios.post(
        `/api/slipImage/${orderId}/upload`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
  
      return res.data;
    } catch (error) {
      console.error("Error uploading slip image:", error);
      throw error;
    }
  };
  
  

export const deleteImage = async (id: number) => {
  try {
    const res = await axios.patch(`/api/slipImage/${id}/delete`);
    return res.data;
  } catch (error) {
    console.error("Error deleting image", error);
    throw error;
  }
};
