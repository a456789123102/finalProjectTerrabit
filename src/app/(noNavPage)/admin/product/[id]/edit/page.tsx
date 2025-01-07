'use client';
import { useEffect } from 'react';
import { updateProduct } from '@/app/apis/product';
import ProductForm from '../../components/productForm';
import { useUserStore } from '@/store/zustand';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const EditProductPage = () => {
  const { isAdmin } = useUserStore();
  const { id } = useParams();
  const router = useRouter();

  const productId = parseInt(id, 10);
  console.log("Product ID from URL params:", productId);

  useEffect(() => {
    if (!isAdmin) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please login before creating a product!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        const currentPath = window.location.pathname;
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
      });
    }
  }, [isAdmin, router]);

  const handleSubmit = async (productData: any) => {
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
      console.log('Product data being sent from edit page:', productData);

      const response = await updateProduct(
        productId,
        productData.name,
        productData.price,
        productData.discount,
        productData.quantity,
        productData.description,
        productData.categories
      );
      console.log('Product updated response:', response);
      Swal.fire({
        icon: 'success',
        title: `Product ID:${response.id} has been Edited`,
        text: 'Your product has been successfully edited.',
        showConfirmButton: false,
      });
      return response;

    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to edit the product. Please try again.',
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-[#FCFAEE]'>
      <div className='p-5 flex justify-center flex-col items-center w-full max-w-3xl max-h-[99%] min-w-96 overflow-auto'>
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
