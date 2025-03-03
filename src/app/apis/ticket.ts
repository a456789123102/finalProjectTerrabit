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
