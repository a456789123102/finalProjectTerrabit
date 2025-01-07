import axios from 'axios';

export const uploadProductImage = async (productId: number, formData: FormData) => {
  try {
    const res = await axios.post(`/api/productImage/${productId}/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });
    return res.data; 
  } catch (error) {
    console.error('Error creating product image:', error);
    throw error;
  }
};
