import axios from "axios";

export const createAddress =  async (
    recipientName: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
) => {
    try {
      const  res = await axios.post("/api/address/create",{
            recipientName,
            street,
            city,
            state,
            zipCode,
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const updateAddress =  async (
    recipientName: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
) => {
    try {
      const  res = await axios.patch("/api/address/update",{
            recipientName,
            street,
            city,
            state,
            zipCode,
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getOwnAddress =  async (
) => {
    try {
      const  res = await axios.get("/api/address/myAddress");
        return res.data;
    } catch (error) {
        throw error;
    }
}