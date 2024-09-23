import axios from "axios";

//login function

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post('/api/login', { username, password });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error(`Axios Error ${error.response.status}: ${error.response.data}`);
                throw new Error(`Axios Error ${error.response.status}: ${error.response.data.error || error.response.data}`);
            } else if (error.request) {
                console.error('Axios No response received:', error.request);
                throw new Error('Axios No response received from server');
            } else {
                console.error('Axios Error setting up request:', error.message);
                throw new Error('Axios Error setting up request');
            }
        } else {
            console.error('Axios Unexpected error:', error);
            throw new Error('Axios Unexpected error occurred');
        }
    }
}