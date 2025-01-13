"use client"; // เพิ่มบรรทัดนี้ที่ส่วนบนสุดของไฟล์

import React, { useState, useEffect } from 'react';
import ProductCart from "../components/productCart";
import { useCartStore } from '@/store/cartStore';
import { deleteCart, clearCart, checkoutCart, myCarts } from '@/app/apis/carts';

function MyCart() {
  const [products, setProducts] = useState([]);
  const setCartItemCount = useCartStore((state) => state.setCartItemCount);
  const cartItemCount = useCartStore((state) => state.cartItemCount); // ดึงค่า cartItemCount จาก Zustand Store

  const [totalPrice, setTotalPrice] = useState(0);

  // ฟังก์ชันที่ใช้ดึงข้อมูลสินค้าในตะกร้า
  const fetchProductCart = async () => {
    try {
      const cartData = await myCarts(); // myCarts คืน Array โดยตรง
      console.log("Fetched cartData:", cartData);

      if (Array.isArray(cartData)) {
        setProducts(cartData);
        setCartItemCount(cartData.length);
        const total = cartData.reduce((acc, cartItem) => acc + cartItem.totalPrice, 0)
        setTotalPrice(total);  // อัพเดต Total Price ใน State
        console.log("Total Price:", totalPrice);
      } else {
        console.error("Invalid cart data format:", cartData);
        setCartItemCount(0);
      }
    } catch (error) {
      console.error("Error fetching carts:", error);
      setCartItemCount(0);
    }
  };

  useEffect(() => {
    fetchProductCart();
  }, []);


  const handleDeleteCart = async (cartId: number) => {
    try {
      console.log("Delete Cart")
      await deleteCart(cartId);
      fetchProductCart();
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      fetchProductCart();
      console.log("clear")
    } catch (error) {
      console.error("Clear Cart Error", error)
    }
  }

  const handleCheckout = async () => {
    try {
      await checkoutCart();
    } catch (error) {
      console.error("Checkout Error", error)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='self-start p-2 bg-white w-full pl-5'>Shopping Cart</div>
      <div className='w-5/6 justify-center flex flex-col mt-5'>
        <div className='flex flex-row w-full h-12 items-center border bg-slate-50 p-2'>
          <div className='w-1/2 pl-5 border'>Product</div>
          <div className='flex flex-row w-1/2 justify-around'>
            <div>Unit Price</div>
            <div>Quantity</div>
            <div>Total Price</div>
            <div>Actions</div>
          </div>
        </div>
        {products.map((product, index) => (
          <ProductCart
            key={index}
            cart={product}
            onDelete={() => handleDeleteCart(product.id)}
          />
        ))}
      </div>
      <div className="fixed bottom-0 w-5/6 bg-white  text-center flex flex-row p-4 justify-end items-center ">
        <div className='flex flex-row justify-end border items-center gap-3'>
          <div>Total ({cartItemCount} item):</div>
          <div className='text-2xl text-orange-600'>฿{totalPrice}</div>
          <div className=' bg-orange-600 p-2 px-7 text-white  cursor-pointer hover:bg-orange-500' onClick={handleCheckout}>Check Out</div>
          <div className='p-2 text-[0.8rem] text-red-600 hover:underline cursor-pointer' onClick={handleClearCart}> Delete All</div>
        </div>
      </div>
    </div>
  );
}

export default MyCart;
