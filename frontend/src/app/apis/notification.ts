import axios from "axios";

export const myNotifications = async () => {
  try {

    const res = await axios.get("/api/notification/myNotifications");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOneNoti = async (id: number) => {
  try {
    const res = await axios.delete(`/api/notification/${id}/delete`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const deleteAllNoti = async () => {
  try {
    const res = await axios.delete(`/api/notification/clearAll`);
    return res.data;
  } catch (error) {
    throw error;
  }
}