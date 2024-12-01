'use client';
import React, { useEffect, useState } from 'react';
import ProductCart from "../components/productCart";
import { myCarts } from '@/app/apis/carts';
import {useCartStore} from '@/store/cartStore';


function MyCart() {
  const [products, setProducts] = useState([]);
  const setCartItemCount = useCartStore((state) => state.setCartItemCount); 

  const fetchProductCart = async () => {
    try {
      const cartData = await myCarts(); // myCarts คืน Array โดยตรง
      console.log("Fetched cartData:", cartData);

      if (Array.isArray(cartData)) {
        setProducts(cartData); // ใช้ cartData โดยตรง
        setCartItemCount(cartData.length); // อัพเดตจำนวนสินค้าในตะกร้า
      } else {
        console.error("Invalid cart data format:", cartData);
        setCartItemCount(0); // ถ้าไม่ใช่ Array ให้ตั้งค่าจำนวนสินค้าเป็น 0
      }
    } catch (error) {
      console.error("Error fetching carts:", error);
      setCartItemCount(0); // กรณีเกิดข้อผิดพลาดในการดึงข้อมูล
    }
  };




  useEffect(() => {
    fetchProductCart();
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <div className='self-start p-2 bg-white w-full pl-5'>Shopping Cart</div>
      <div className='w-5/6 justify-center flex flex-col mt-5'>
        {/* header */}
        <div className='flex flex-row w-full h-12 items-center border bg-slate-50 p-2'>
          <div className='w-1/2 pl-5 border'>Product</div>
          <div className='flex flex-row w-1/2 justify-around'>
            <div>Unit Price</div>
            <div>Quantity</div>
            <div>Total Price</div>
            <div>Actions</div>
          </div>
        </div>
        {/* Product */}
        {products.map((product, index) => (
          <ProductCart key={index} cart={product} />
        ))}
      </div>
      {/* footer checkout will always float */}
      <div className="fixed bottom-0 w-full bg-gray-800 text-white text-center p-4">this is footer</div>
    </div>
  );
}

export default MyCart;
