'use client';
import { useEffect} from 'react';
import { createProduct } from '@/app/apis/product';
import ProductForm from '../components/productForm';
import { useUserStore } from '@/store/zustand';



const CreateProductPage = () => {

  const { isAdmin } = useUserStore(); 

  useEffect(() =>{
if (!isAdmin) {
  console.log('CREATE PRODUCT SHOULD NOT SHOW');
}
  },[isAdmin])

  const handleSubmit = async (productData: any) => {
    try {
      const formData = new FormData();
      if (productData.name) formData.append("name", productData.name);
      if (productData.price) formData.append("price", String(productData.price));
      if (productData.discount) formData.append("discount", String(productData.discount));
      if (productData.quantity) formData.append("quantity", String(productData.quantity));
      if (productData.description) formData.append("description", productData.description);
      if (productData.categories && productData.categories.length > 0) {
        formData.append("categories", JSON.stringify(productData.categories));
      }
    
      if (productData.CoverImage) formData.append("CoverImage", productData.CoverImage);
      if (productData.ImageDetail1) formData.append("ImageDetail1", productData.ImageDetail1);
      if (productData.ImageDetail2) formData.append("ImageDetail2", productData.ImageDetail2);
    
      console.log("FormData being sent:", Array.from(formData.entries()));
    
      const response = await createProduct(formData);
      console.log("Product created response:", response);
      return response;
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
  
  
  

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-[#FCFAEE]'>
      <div className=' p-5 flex justify-center flex-col items-center w-1/3'>
        {isAdmin ? (
          <ProductForm onSubmit={handleSubmit} mode = 'create'/> 
        ) : (
          <div className='text-red-800'>You do not have permission to create products.</div>
        )}
      </div>
    </div>
  );
};

export default CreateProductPage;
