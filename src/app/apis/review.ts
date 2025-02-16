import axios from "axios";

export const getReviewsById = async (id: number, page: number) => {
  try {
    const params = new URLSearchParams();
    if (page) {
      params.append("page", String(page));
    }
    const res = await axios.get(`/api/reviews/${id}`, { params });
    return res.data;
  } catch (error) {
    console.error("axios error", error);
    throw error;
  }
};

export const createReview = async (
  productId: string,
  rating: number,
  comments: string
) => {
  try {
    const res = await axios.post(`/api/reviews/${productId}/create`, {
      rating,
      comments,
    });
    return res.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

export const updateReview = async (
  reviewId: string,
  rating: number,
  comments: string
) => {
  try {
    const res = await axios.patch(`/api/reviews/${reviewId}/edit`, {
      rating,
      comments,
    });
    return res.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
}

export const getWeeklyRatingForCharts = async () => {
  try {
    const res = await axios.get(`/api/reviews/charts/getWeeklyRatingForCharts`);
    return res.data;
  } catch (error) {
    console.error("error fetching order", error);
    throw error;
  }
}
export const getAllReviews = async ( 
  search:string ,
  orderBy:"asc" | "desc",
  orderWith:string,
  isPublished:string,
  page:string,
  pageSize:string,
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
  if (isPublished) {
    params.append("isPublished", isPublished);
  }
  if (page) {
    params.append("page", page);
  }
  if (pageSize) {
    params.append("pageSize", pageSize);
  }
  const res = await axios.get(`/api/reviews/all`, { params });
return res.data
} catch (error) {
  console.error("Err when fetch reviews in apis",error)
  throw error;
}
}