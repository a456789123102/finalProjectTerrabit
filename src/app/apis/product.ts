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
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unknown error:", error);
    }
    throw new Error("Error creating product");
  }
};

//upload image
export const uploadProductImage = async (formData: FormData) => {
  try {
    const res = await axios.post("/api/product/uploadImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

//ดึงหมด
export const fetchProducts = async (search?: string, categories?: number[],page?:string,pageSize?:string) => {
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
      console.log(`pagesize add: ${pageSize}`);
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
  discount:number,
  quantity: number,
  description: string,
  categories: number[]
) => {
  try {
    const res = await axios.patch(
      `/api/product/${id}/edit`,  // ใช้ path ตามที่ backend กำหนด
      {
        name,
        price,
        discount,
        quantity,
        description,
        categories,
      }
    );
    console.log("DATA FROM APIS"+res)
    return res.data;
    
  } catch (error) {
    console.error("Error updating product IN APIS:", error);
    throw error;
  }
};

//ดึงจากไอดีใน params
export const fetchProductFromCatId = async(id: number) => {
  try {
    const res = await axios.get(`/api/product/category/${id}`);
    console.log("Response from Backend:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching product by category ID:", error);
    throw error;
  }
}