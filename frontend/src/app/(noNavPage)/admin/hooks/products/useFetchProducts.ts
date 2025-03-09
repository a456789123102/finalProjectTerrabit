import { useState, useEffect } from "react";
import { fetchProducts } from "@/app/apis/product";

// ✅ สร้าง Interface สำหรับ Pagination
interface PaginationType {
  page: number;
  pageSize: number;
  totalPages: number; 
  totalProducts: number; 
}


// ✅ สร้าง Interface สำหรับ Product (สามารถแก้ไขตามโครงสร้างที่ API คืนค่า)
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

// ✅ กำหนด Type สำหรับ Props ที่ `useFetchProducts` รับเข้ามา
interface FetchProductsParams {
  searchQuery: string;
  category: string | null;
  pagination: PaginationType;
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>;
  forceFetch: boolean;
  orderBy?: string;
  orderWith?: string;
}

const useFetchProducts = ({
  searchQuery,
  category,
  pagination,
  setPagination,
  forceFetch,
  orderBy,
  orderWith,
}: FetchProductsParams): Product[] => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProductLists = async () => {
    try {
      const productData = await fetchProducts(
        searchQuery,
        category ? [parseInt(category)] : [],
        pagination.page.toString(),
        pagination.pageSize.toString(),
        orderBy,
        orderWith
      );
  
      setProducts(productData.products);
  
      setPagination((prev) => ({
        ...prev,
        page: productData.pagination.page,
        pageSize: productData.pagination.pageSize,
        totalPages: productData.pagination.totalPages ?? prev.totalPages,
        totalProducts: productData.pagination.totalProducts ?? prev.totalProducts,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  

  useEffect(() => {
    fetchProductLists();
  }, [searchQuery, category, pagination.page, pagination.pageSize, forceFetch, orderBy, orderWith]);

  return products;
};

export default useFetchProducts;
