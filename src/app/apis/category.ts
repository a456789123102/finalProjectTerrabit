import axios from 'axios';

export const createCategory = async (
    name: string
) => {
    try {
        const res = await axios.post('/api/category/create', { name });
        return res.data;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

export const getAllcategory = async () => {
    try {
        const res = await axios.get('/api/category');
        return res.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const updateCategory = async (categoryId:number, name:string) => {
    try {
        const res = await axios.put(`/api/category/${categoryId}`, { name });
        return res.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};


export const deleteCategory = async (categoryId: number) => {
    try {
        await axios.delete(`/api/category/${categoryId}`);
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};