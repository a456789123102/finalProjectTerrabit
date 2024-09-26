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
//ดึง

export const fetchProducts = async (search: string, categories: number[]) => {
  try {
    const res = await axios.get('/api/product/get', {
      params: {
        search: search || undefined,
        category: categories || undefined,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};