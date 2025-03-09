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
    isActive?:boolean | null,
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

///////////////////////////////

export const getTotalUsersForCharts = async (
  interval: string,
  startDate: string | Date,
  endDate: string | Date
) => {
  try {
    const params = new URLSearchParams();

    if (interval) {
      params.append("interval", interval);
    }

    const parsedStartDate = typeof startDate === "string" ? new Date(startDate) : startDate;
    const parsedEndDate = typeof endDate === "string" ? new Date(endDate) : endDate;

    if (parsedStartDate && parsedEndDate) {
      params.append("startDate", parsedStartDate.toISOString());
      params.append("endDate", parsedEndDate.toISOString());
    }

    const res = await axios.get(`/api/users/charts/getTotalUsersForCharts`, { params });
    return res.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

///////////////////////////////////
export const myInfo = async () => {
  try {
    const res = await axios.get("/api/users/myInfo");
    return res.data;
  } catch (error) {
    throw error;
  }
};
