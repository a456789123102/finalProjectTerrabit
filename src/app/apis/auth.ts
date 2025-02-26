import axios from "axios";
import {me} from "./user"
import { useUserStore } from "@/store/zustand";
import { myCarts } from "./carts";
import { useCartStore } from "@/store/cartStore";
//login function
export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post('/api/auth/login', { username, password });
        console.log("login success:",response);
        //set zustand user
        const userData = await me(); 
        const { setUser } = useUserStore.getState(); 
        setUser(userData);
        //set zustand cartItemNumber
        const cartItemCount = await myCarts();
        const { setCartItemCount } = useCartStore.getState();
        setCartItemCount(cartItemCount.length);
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

export const goRegister = async (email: string, username: string, password: string) => {
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