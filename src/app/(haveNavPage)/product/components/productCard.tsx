'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// กำหนด type ให้กับ product
type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  Image: { imageUrl: string }[]; 
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
    // เมื่อคลิกสินค้า นำไปที่ /product/:id
    router.push(`/product/${product.id}`);
  };

  return (
    <div
      className="border rounded-lg p-4 shadow-lg cursor-pointer hover:bg-gray-100 flex flex-col justify-between gap-3  bg-white"
      onClick={handleProductClick}
    >
      <div className="text-lg font-semibold mb-2">{product.name}</div>

<div className="w-full h-auto rounded-lg shadow-lg  bg-green-300">
<Image
  className="min-h-[200px] min-w-[200px] max-h-[250px] object-cover "
  src={productImage}
  alt="Cover Image"
  width={300}
  height={300}
/>
</div>
<div className=''> 
  <p className="text-gray-700 mb-1">Price: ${product.price}</p>
      <p className="text-gray-700 mb-1">Quantity: {product.quantity}</p>
      <p className="text-gray-600 text-sm">{product.description}</p></div>

     
    </div>
  );
};

export default ProductCard;
