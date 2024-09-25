import axios from 'axios';

export const createProduct = async (
  name: string,
  price: number,
  quantity: number,
  description: string,
  categories: number[]
) => {
  try {

    const res = await axios.post('/api/product/create', {
      name,
      price,
      quantity,
      description,
      categories,
    }, {
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unknown error:', error);
    }
    throw new Error('Error creating product');
  }
};
