import axios from "axios";

export const myOrder = async (status: string) => {
  try {
    const res = await axios.get(`/api/order/${status}/myOrder`);
    console.log("Response from API:", JSON.stringify(res.data, null, 2)); // Debug API Response
    return res.data; // คาดหวังเป็น Array ตรง ๆ
  } catch (error) {
    console.error("Error fetching order", error.response || error.message);
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

export const cancelOrder = async (id: number) => {
  try {
    const statusRequest = "awaiting_rejection";
    const res = await axios.patch(`/api/order/${id}/userUpdateStatus`, { status: statusRequest });
    return res.data;
  } catch (error) {
    throw error;
  }
};
/////////////////////////////////////////////////////

export const fetchAllOrders = async (statuses?:string[],searchQuery?:string,page?: string,pageSize?: string) => {
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
     console.log(`pagesize add: ${pageSize}`);
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