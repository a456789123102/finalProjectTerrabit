import axios from "axios";

export const getReviewsById = async (id: number) => {
    try {
        const res = await axios.get(`/api/reviews/${id}`)
return res.data;
    } catch (error) {
        console.error("axios error",error);
        throw error;
    }
}