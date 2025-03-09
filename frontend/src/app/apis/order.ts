import axios from "axios";

export const myOrder = async (status: string[]) => {
  try {
const params = new URLSearchParams();
    status.forEach((s) => params.append("status", s)); 
    const res = await axios.get(`/api/order/myOrder`, {params});
    console.log("Response from API:", JSON.stringify(res.data, null, 2)); // Debug API Response
    return res.data; // คาดหวังเป็น Array ตรง ๆ
  } catch (error) {
    console.error("Error fetching order");
    throw error;
  }
};


//////////////////////////////////////////////////////////////////////////////////

export const updateOrderAddress = async (id: number,newAddressId:number) => {
  try {
    const res = await axios.patch(`/api/order/update/${id}`,{newAddressId});
    console.log(`Patching :/api/order/update/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const deleteOrder = async (id: number) => {
  try {
    const res = await axios.delete(`/api/order/${id}/delete`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const cancelledOrder = async (id: number) => {
  try {
    const statusRequest = "cancelled_by_user";
    const res = await axios.patch(`/api/order/${id}/userUpdateStatus`, { status: statusRequest });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const refoundOrder = async (id: number) => {
  try {
    const statusRequest = "pending_refound";
    const res = await axios.patch(`/api/order/${id}/userUpdateStatus`, { status: statusRequest });
    return res.data;
  } catch (error) {
    throw error;
  }
};
/////////////////////////////////////////////////////

export const fetchAllOrders = async (statuses?:string[],searchQuery?:string,page?: string,pageSize?: string,orderBy?: string,orderWith?: string) => {
try {
  const params = new URLSearchParams();
  if (statuses && statuses.length > 0) {
    statuses.forEach((s) => params.append("status", s))
   }
   if (searchQuery) {
     params.append("search", searchQuery);
   }
   if (page) {
     params.append("page", page);
   }
   if (pageSize) {
     params.append("pageSize", pageSize);
   }if(orderBy) {
    params.append("orderBy", orderBy);
   }if(orderWith) {
    params.append("orderWith", orderWith);
   }
  console.log("params:", params);
  const res = await axios.get("/api/order/all",{
    params:params,
  });
  return res.data;

} catch (error) {
  console.error("error fetching order",error);
  throw error;
}
}
///////////////////////////////////////////////////////////

export const updateOrderStatus = async (orderId:number,status:string) => {
  try {
    const res = await axios.patch(`/api/order/${orderId}/adminUpdateStatus`, {
      status:status
    });
    console.log("res apis data:",res)
    return res.data;
  } catch (error) {
    throw error;
  }
}
////////////////////////////////////////////////////////////

export const fetchgetOrderForCharts = async (interval:string,startDate:Date,endDate:Date) => {
  try {
    const params = new URLSearchParams();
    params.append("interval", interval);
    params.append("startDate", startDate.toISOString());
    params.append("endDate", endDate.toISOString());
    const res = await axios.get(`/api/order/charts/getOrderForCharts`,{params: params});
    
    return res.data;
  } catch (error) {
    console.error("error fetching order", error);
    throw error;
  }
}
//////////////////////////////////////////////////////////////////
export const fetchgetWeeklySaleForCharts = async () => {
  try {
    const res = await axios.get(`/api/order/charts/getWeeklySaleForCharts`);
    return res.data;
  } catch (error) {
    console.error("error fetching order", error);
    throw error;
  }
}
////////////////////////////////////////////////////////////////
export const  getYearlySaleForCharts = async () => {
  try {
    const res = await axios.get(`/api/order/charts/getYearlySaleForCharts`);
    return res.data;
  } catch (error) {
    console.error("error fetching order", error);
    throw error;
  }
}
/////////////////////////////////////////////////////////////////
export const getTopSellerItems = async (interval?: string, startDate?: Date, endDate?: Date, orderBy?: string, length?: number) => {
  try {
    const params = new URLSearchParams();
    if (interval) params.append("interval", interval);
    if (startDate) params.append("startDate", startDate.toISOString());
    if (endDate) params.append("endDate", endDate.toISOString());
    if (orderBy) params.append("orderBy", orderBy);
    if (length) params.append("length", length.toString());
    console.log("Params sent to API:", params.toString());
    const res = await axios.get(`/api/order/charts/getTopSellerItems`, { params })
    return res.data; 
  } catch (error) {
throw error;
  }
};
////////////////////////////////////////////////////////////////////
export const getTotalIncomesForCharts = async (interval: string, startDate: Date, endDate: Date) => {
  try {
    const params = new URLSearchParams();
    params.append("interval", interval);
    params.append("startDate", startDate.toISOString());
    params.append("endDate", endDate.toISOString());
    const res = await axios.get(`/api/order/charts/getTotalIncomesForCharts`, { params });
    return res.data;
  } catch (error) {
    console.error("error fetching order", error);
    throw error;
  }
}