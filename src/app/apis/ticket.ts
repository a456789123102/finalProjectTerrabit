import axios from "axios";

export const myTickets = async (
  search: string,
  orderBy: string,
  orderWith: string,
  isSolved: string,
  page: string,
  pageSize: string
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
    if (isSolved && isSolved !== "null") {
      params.append("isSolved", isSolved);
    }
    if (page) {
      params.append("page", page);
    }
    if (pageSize) {
      params.append("pageSize", pageSize);
    }
    const res = await axios.get("/api/ticket/myTickets", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getTicketById = async(id:string) => {
try {
  const res = await axios.get(`/api/ticket/${id}/info`);
  return res.data;
} catch (error) {
  throw error;
}
}

export const createReply = async(id:string,content:string) => {
  try {
    const res = await axios.post(`/api/ticket/${id}/reply`,{content});
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const createTicket = async(topic:string,details:string) => {
  try {
    const res = await axios.post(`/api/ticket/create`,{topic,details});
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const justCountTickets = async() => {
  try {
    const res = await axios.get("/api/ticket/justCountTickets");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const closeTicket = async(id:number) => {
  try {
    const res = await axios.patch(`/api/ticket/${id}/close`);
    return res.data;
  } catch (error) {
    throw error;
  }
  
}