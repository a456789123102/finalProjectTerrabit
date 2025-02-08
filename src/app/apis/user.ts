import axios from "axios";

export const me = async () => {
  try {
    const res = await axios.get("/api/users/me", {
      headers: {
        Authorization: `Bearer ${document.cookie.replace("token=", "")}`,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

/////////////////////////////////////////////////
export const getAllUsers = async (
  search?: string,
  page?: string,
  pageSize?: string,
  sortBy?: string,
  sortOrder?:string,
) => {
  try {
    const params = new URLSearchParams();
    if (page) {
      params.append("page", page);
    }
    if (pageSize) {
      params.append("pageSize", pageSize);
    }
    if (sortBy) {
        params.append("sortBy", sortBy);
      }
      if (sortOrder) {
        params.append("sortOrder", sortOrder);
      }
    const res = await axios.get("/api/users/usersInfo", { params: params });//+
    return res.data;
  } catch (error) {
    throw error;
  }
};
/////////////////////////////////////////////////////

export const  fetchgetWeeklyUserForCharts = async () => {
  try {
    const res = await axios.get(`/api/users/charts/getWeeklyUserForCharts`);
    return res.data;
  } catch (error) {
    console.error("error fetching order", error);
    throw error;
  }
}
