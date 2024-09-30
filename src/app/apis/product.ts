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


//ดึงหมด
export const fetchProducts = async (search?: string, category?: number) => {
  try {
    // ส่งพารามิเตอร์เฉพาะเมื่อมีค่า
    const params: any = {};
    if (search) {
      params.search = search;
    }
    if (category) {
      params.category = category;
    }

    // เรียก API พร้อมพารามิเตอร์ (ถ้ามี)
    const res = await axios.get('/api/product/get', {
      params: params,
    });

    // ตรวจสอบ data ที่ได้รับจาก API
    console.log('Fetched Products Data:', res.data); // เพิ่มบรรทัดนี้เพื่อแสดงข้อมูลใน console

    return res.data;
   
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};



//ดึงจาก id
export const getProductById = async (id: number) =>{
  try {
    const res = await axios.get(`/api/product/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};