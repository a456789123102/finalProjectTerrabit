import axios from 'axios';

export const  createCart = async (
    productId: number,
    quantity: number,
    totalPrice: number,
) => {
    try {
        const res = await axios.post('/api/cart/create', {  productId, quantity, totalPrice });
        return res.data;
    } catch (error) {
        console.error('Error creating cart:', error);
        throw error;
    }
}