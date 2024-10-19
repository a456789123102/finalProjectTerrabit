import axios from "axios";
//getAllCareer
export const getAllCareer = async() => {
    try {
        const res = await axios.get(`/api/career`);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//getoneById
export const getOneCareerById = async(id: number) => {
    try {
        const res = await axios.get(`/api/career/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}