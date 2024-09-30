'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

// คอมโพเนนต์สำหรับแสดงสินค้าแต่ละตัว
const ProductCard = ({ product }) => {
  const router = useRouter();

  const handleProductClick = () => {
    // เมื่อคลิกสินค้า นำไปยัง /product/:id
    router.push(`/product/${product.id}`);
  };

  return (
    <div 
      className="border rounded-lg p-4 shadow-lg cursor-pointer hover:bg-gray-100"
      onClick={handleProductClick} // เมื่อคลิกให้ไปที่หน้า /product/:id
    >
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-1">Price: ${product.price}</p>
      <p className="text-gray-700 mb-1">Quantity: {product.quantity}</p>
      <p className="text-gray-600 text-sm">{product.description}</p>
    </div>
  );
};

export default ProductCard;
