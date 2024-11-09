'use client';
import { useEffect } from 'react';
import { updateProduct } from '../../../../apis/product';
import ProductForm from '../../components/productForm';
import { useUserStore } from '@/store/zustand';
import { useParams } from 'next/navigation';

const EditProductPage = () => {
  const { isAdmin } = useUserStore(); 
  const { id } = useParams();  // ดึง id ของสินค้า
  
  const productId = parseInt(id, 10); 
  console.log("Product ID from URL params:", productId);

  useEffect(() => {
    if (!isAdmin) {
      console.log('EDIT PRODUCT SHOULD NOT SHOW');
    }
  }, [isAdmin]);

  const handleSubmit = async (productData: any) => {
    try {
      console.log('Product data being sent:', productData);

      const response = await updateProduct(
        productId,  // ส่ง id ของสินค้าไปใน request
        productData.name,
        productData.price,
        productData.discount,
        productData.quantity,
        productData.description,
        productData.categories
      );

      console.log('Product updated response:', response);
      return response; 
     
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-[#FCFAEE] '>
      <div className=' p-5 flex justify-center flex-col items-center w-1/3 h-screen'>
     
        {isAdmin ? (
          <ProductForm onSubmit={handleSubmit} productId={productId} mode='edit' /> 
        ) : (
          <div className='text-red-800'>You do not have permission to edit products.</div>
        )}
      </div>
    </div>
  );
};

export default EditProductPage;
