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
  Image: { imageUrl: string }[]; // แก้ให้สอดคล้องกับข้อมูลจริง
};

// คอมโพเนนต์สำหรับแสดงสินค้าต่อชิ้น
const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  // ตรวจสอบว่ามีรูปภาพหรือไม่ และดึง imageUrl ถ้ามี
  const productImage =
    product.Image && product.Image.length > 0
      ? product.Image[0].imageUrl // ดึง imageUrl จาก Image[0]
      : 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; // ถ้าไม่มีรูปภาพให้ใช้ default image

  const handleProductClick = () => {
    // เมื่อคลิกสินค้า นำไปที่ /product/:id
    router.push(`/product/${product.id}`);
  };

  return (
    <div
      className="border rounded-lg p-4 shadow-lg cursor-pointer hover:bg-gray-100 flex flex-col justify-between"
      onClick={handleProductClick}
    >
      <div className="text-lg font-semibold mb-2 bg-gray-200">{product.name}</div>

<div className="w-full h-auto rounded-lg shadow-lg min-h-[300] min-w-[300] bg-green-300">
<Image
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
