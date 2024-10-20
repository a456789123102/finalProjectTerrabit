import axios from "axios";

export const me = async () => {
    try {
        const res = await axios.get('/api/user/me',{
headers: {
    'Authorization': `Bearer ${document.cookie.replace('token=','')}`
},
withCredentials: true, 
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}