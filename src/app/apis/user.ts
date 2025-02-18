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
  orderBy?:string,
    orderWith?:string,
    isActive?:boolean,
    page?:string,
    pageSize?:string
) => {
  try {
    const params = new URLSearchParams();
    if (search) {
      params.append("search", search);
    }
    if (orderBy) {
      params.append("orderBy", orderBy);
    }
    if (orderWith) {
        params.append("orderWith", orderWith);
      }
      if (isActive ) {
        params.append("isActive", String(isActive));
      }
      if (page ) {
        params.append("page", page);
      }
      if (pageSize) {
        params.append("pageSize", pageSize);
      }
    const res = await axios.get("/api/users/usersInfo", { params: params });
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
/////////////////////////////
export const changeIsActiveStatus = async(id:number) => {
try {
  const res = await axios.patch(`/api/users/${id}/changeIsActiveStatus`)
  return res.data;
} catch (error) {
  throw error;
}
}