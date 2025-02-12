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