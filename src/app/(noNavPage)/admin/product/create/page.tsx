'use client';

import { useEffect } from 'react';
import { createProduct } from '@/app/apis/product';
import ProductForm from '../components/productForm';
import { useUserStore } from '@/store/zustand';

const CreateProductPage = () => {
  const { isAdmin } = useUserStore();

  useEffect(() => {
    if (!isAdmin) {
      console.log('CREATE PRODUCT SHOULD NOT SHOW');
    }
  }, [isAdmin]);

  const handleSubmit = async (productData: any) => {
    // ตรวจสอบ validation
    if (
      !productData.name ||
      productData.price === '' ||
      productData.quantity === '' ||
      !productData.description ||
      !productData.categories.length
    ) {
      console.error('Validation failed: Please fill in all fields');
      return;
    }
  
    try {
      const response = await createProduct(
        productData.name,
        productData.price,
        productData.discount/100 || 0,
        productData.quantity,
        productData.description,
        productData.categories
      );
      console.log('Product created response:', response);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  
  

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#FCFAEE]">
      <div className="p-5 flex justify-center flex-col items-center w-1/3">
        {isAdmin ? (
          <ProductForm onSubmit={handleSubmit} mode="create" />
        ) : (
          <div className="text-red-800">You do not have permission to create products.</div>
        )}
      </div>
    </div>
  );
};

export default CreateProductPage;
