'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// กำหนด type ให้กับ product
type Product = {
  id: number;
  name: string;
  price: number;
  finalPrice: number;
  discount: number;
  quantity: number;
  ProductCategory: { categoryId: number; category: { name: string } }[];
  Image: { imageUrl: string }[];
};
const CategoryItem = ({ name, categoryId, onClick }: { name: string; categoryId: number; onClick: (id: number) => void }) => {
  return <div className='px-2 py-1  ml-2 bg-blue-300 hover:bg-blue-400 flex justify-center rounded-md text-xs cursor-pointer'   onClick={() => onClick(categoryId)}
  >{name}</div>;
};

// คอมโพเนนต์สำหรับแสดงสินค้าต่อชิ้น
const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  // ตรวจสอบว่ามีรูปภาพหรือไม่ และดึง imageUrl ถ้ามี
  const productImage =
    product.Image && product.Image.length > 0
      ? product.Image[0].imageUrl // ดึง imageUrl จาก Image[0]
      : 'https://lovedrinks.com/cdn-cgi/imagedelivery/lPz29URYX3W9lk2JWbxsjA/lovedrinks.com/2023/08/No-Image-Placeholder.svg_.png/w=9999'; // ถ้าไม่มีรูปภาพให้ใช้ default image

  const handleProductClick = () => {
    router.push(`/product/${product.id}`);
  };
  const handleCatClick = (categoryId: number) => {
    router.push(`/product/category/${categoryId}`); // นำทางไปยังเส้นทางของ category ตาม categoryId
  };

  return (
    <div
      className="border rounded-lg p-4 shadow-lg  hover:bg-[#ECDFCC] flex flex-col justify-between gap-3  bg-white"

    >
      <div className="text-lg font-semibold mb-2">{product.name}</div>

      <div className="w-full h-auto rounded-lg shadow-lg  bg-green-300">
        <Image
          className="min-h-[200px] min-w-[200px] max-h-[250px] object-cover cursor-pointer"
          src={productImage}
          alt="Cover Image"
          width={300}
          height={300}
          onClick={handleProductClick}
        />
      </div>
      <div>
      <div className="flex flex-row items-end"> 
  <div>Price: {product.finalPrice} THB</div>
  {product.discount !== 0 && product.discount !== null && (
    <div className="text-red-700 mb-1 text-[12px] ml-2 bg-red-300 p-[2px] rounded-sm relative top-2">
      -{product.discount * 100}%
    </div>
  )}
</div>
        <div className="text-gray-700 mb-1">Quantity: {product.quantity}</div>
        <div className="flex flex-row">
          {/* แสดงชื่อ categories พร้อม handleCatClick */}
          {product.ProductCategory &&
            product.ProductCategory.map((productCategory) => (
              <CategoryItem
                key={productCategory.categoryId}
                name={productCategory.category.name}
                categoryId={productCategory.categoryId}
                onClick={handleCatClick} // ส่ง handleCatClick เข้าไปใน CategoryItem
              />
            ))}
        </div>
      </div>


    </div>
  );
};

export default ProductCard;
