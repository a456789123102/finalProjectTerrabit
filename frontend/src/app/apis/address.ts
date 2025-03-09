import axios from "axios";

export const createAddress = async (
  recipientName: string,
  currentAddress: string,
  provinceId: number,
  provinceName: string,
  amphureId: number,
  amphureName: string,
  tambonId: number,
  tambonName: string,
  zipCode: string,
  mobileNumber: string,
  email?: string
) => {
  try {
    const res = await axios.post("/api/address/create", {
      recipientName,
      currentAddress,
      provinceId,
      provinceName,
      amphureId,
      amphureName,
      tambonId,
      tambonName,
      zipCode,
      mobileNumber,
      email,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateAddress = async (
  id: string,
  recipientName: string,
  currentAddress: string,
  provinceId: number,
  provinceName: string,
  amphureId: number,
  amphureName: string,
  tambonId: number,
  tambonName: string,
  zipCode: string,
  mobileNumber: string,
  email?: string
) => {
  try {
    const res = await axios.patch(`/api/address/myAddress/${id}/update`, {
      recipientName,
      currentAddress,
      provinceId,
      provinceName,
      amphureId,
      amphureName,
      tambonId,
      tambonName,
      zipCode,
      mobileNumber,
      email,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};


export const getOwnAddress = async () => {
  try {
    const res = await axios.get("/api/address/myAddress");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getOneAddress = async (id:number) => {
  try {
    console.log("here is API")
    const res = await axios.get(`/api/address/myAddress/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAddress = async (id:number) => {
  try {
    const res = await axios.delete(`/api/address/myAddress/${id}/delete`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getProvince = async () => {
  try {
    const res = await axios.get(`/api/address/province`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const getAmphure = async (id:number) => {
  try {
    const res = await axios.get(`/api/address/${id}/amphure`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const getTambon = async (id:number) => {
  try {
    const res = await axios.get(`/api/address/${id}/tambon`);
    return res.data;
  } catch (error) {
    throw error;
  }
}