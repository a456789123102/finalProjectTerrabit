'use client';

import { useEffect } from 'react';
import { createProduct } from '@/app/apis/product';
import ProductForm from '../components/productForm';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/zustand';

const CreateProductPage = () => {
  const router = useRouter();
  const { isAdmin } = useUserStore();

  if (!isAdmin) return null;

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
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Validation failed: Please fill in all fields',
        showConfirmButton: false,
      });
      return;
    }
  
    try {
      const response = await createProduct(
        productData.name,
        productData.price,
        productData.discount || 0,
        productData.quantity,
        productData.description,
        productData.categories
      );
      console.log('Product created response:', response);
      Swal.fire({
        icon: 'success',
        title: 'Product Created',
        text: 'Your product has been successfully created.',
        showConfirmButton: false,
      });
      router.push(`/admin/manage/product/${response.product.id}/edit`);
    } catch (error) {
      console.error('Error creating product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create the product. Please try again.',
        showConfirmButton: false,
      });

    }
  };
  
  

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#FCFAEE]">
      <div className='p-5 flex justify-center flex-col items-center w-full max-w-3xl max-h-[99%] min-w-96 overflow-auto'>
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
