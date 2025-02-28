import axios from "axios";

export const createProduct = async (
  name: string,
  price: number,
  discount: number,
  quantity: number,
  description: string,
  categories: number[]
) => {
  try {
    const res = await axios.post("/api/product/create", {
      name,
      price,
      discount,
      quantity,
      description,
      categories,
    });
    return res.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

//ดึงหมด
export const fetchProducts = async (
  search?: string,
  categories?: number[],
  page?: string,
  pageSize?: string,
  orderBy?: string, 
  orderWith?: string
) => {
  try {
    // สร้าง params โดยใช้ URLSearchParams
    const params = new URLSearchParams();
    if (search) {
      params.append("search", search);
    }

    if (categories && categories.length > 0) {
      categories.forEach((category) => {
        params.append("category", category.toString()); // ส่งหมวดหมู่หลายค่าโดยไม่มี []
      });
    }
    if (page) {
      params.append("page", page);
    }
    if (pageSize) {
      params.append("pageSize", pageSize);

    }
    if (orderBy) {
      params.append("orderBy", orderBy);
    }
    if (orderWith) {
      params.append("orderWith", orderWith);
    }

    const res = await axios.get("/api/product/get", {
      params: params,
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Error fetching products");
  }
};

//ดึงจาก id
export const getProductById = async (id: number) => {
  try {
    const res = await axios.get(`/api/product/${id}`);

    // Log ข้อมูลที่ได้รับจาก Backend
    console.log("Response from Backend:", res.data); // ตรวจสอบข้อมูลที่ได้จาก Backend

    return res.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

//แก้ไข
export const updateProduct = async (
  id: number,
  name: string,
  price: number,
  discount: number,
  quantity: number,
  description: string,
  categories: number[]
) => {
  try {
    const res = await axios.patch(
      `/api/product/${id}/edit`, // ใช้ path ตามที่ backend กำหนด
      {
        name,
        price,
        discount,
        quantity,
        description,
        categories,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error updating product IN APIS:", error);
    throw error;
  }
};

//ดึงจากไอดีใน params
export const fetchProductFromCatId = async (id: number) => {
  try {
    const res = await axios.get(`/api/product/category/${id}`);
    console.log("Response from Backend:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching product by category ID:", error);
    throw error;
  }
};

//ดึงRelated
export const fetchRelatedProducts = async (
  categories: number[],
  name: string,
  productId: number
) => {
  try {
    // สร้าง params โดยใช้ URLSearchParams
    const params = new URLSearchParams();
    params.append("category", categories.join(","));
    params.append("name", name);
    const res = await axios.get(`/api/product/${productId}/related`, {
      params: params,
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Error fetching products");
  }
};

//ลบ product
export const deleteProduct = async (id:number) =>{
  try {
   const res = await axios.delete(`/api/product/${id}/delete`);
   return res.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};