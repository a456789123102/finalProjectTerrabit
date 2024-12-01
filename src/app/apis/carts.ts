import axios from "axios";

export const createCart = async (
  productId: number,
  quantity: number,
  totalPrice: number
) => {
  try {
    const res = await axios.post("/api/cart/create", {
      productId,
      quantity,
      totalPrice,
    });
    return res.data;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
};

export const myCarts = async () => {
  try {
    const res = await axios.get("/api/cart/myCarts");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCart = async (
  productId: number,
  quantity: number
) => {
  try {
    const res = await axios.put(`/api/cart/update/${productId}`,{quantity});
    return res.data;
  } catch (error) {
    console.error("Error updating cart:",error);
  }
}

export const deleteCart = async (productId: number) => {
  try {
    const res = await axios.delete(`/api/cart/delete/${productId}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting cart:", error);
    throw error;
  }
}