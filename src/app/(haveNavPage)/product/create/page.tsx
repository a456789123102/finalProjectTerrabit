'use client';
import { createProduct } from '../../../apis/product';
import ProductForm from '../components/productForm';

const CreateProductPage = () => {
  const handleSubmit = async (productData: any) => {
    try {
      // Log product data before sending
      console.log('Product data being sent:', productData);
      
      const response = await createProduct(
        productData.name,
        productData.price,
        productData.quantity,
        productData.description,
        productData.categories
      );

      // ตรวจสอบ response ที่ได้
      console.log('Product created response:', response);

      // ส่งข้อความกลับไปที่ frontend ให้แสดงข้อความสำเร็จ
      return response;
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-[#FCFAEE]'>
      <div className='bg-[#5C8374] p-5 flex justify-center flex-col items-center'>
        <h1>Create New Product</h1>
        <ProductForm onSubmit={handleSubmit} /> 
      </div>
    </div>
  );
};

export default CreateProductPage;

