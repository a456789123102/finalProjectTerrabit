import axios from "axios";

//login function
export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post('/api/auth/login', { username, password });
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

export const logout = async () => {
    const res = await axios.post('/api/auth/logout');
    return res.data;
}

export const register = async (email: string, username: string, password: string) => {
    try {
      if (!email || !username || !password) {
        throw new Error('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      }
      const response = await axios.post('/api/auth/register', { email, username, password });
      return response.data;
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลงทะเบียน:', error);
      throw error;
    }
  };