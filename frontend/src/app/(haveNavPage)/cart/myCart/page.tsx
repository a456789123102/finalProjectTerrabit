"use client";

import React, { useState, useEffect, useCallback } from 'react';
import ProductCart from "../components/productCart";
import { useCartStore } from '@/store/cartStore';
import { deleteCart, clearCart, checkoutCart, myCarts } from '@/app/apis/carts';
import { useRouter } from "next/navigation";
import { useUserStore } from '@/store/zustand';
import Number from "@/app/components/Number";

type CartItem = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  product: {
    id: number;
    Image: { imageUrl: string }[];
    name: string;
    price: number;
    finalPrice: number;
    quantity: number;
  };
};

function MyCart() {
  const [products, setProducts] = useState<CartItem[]>([]);
  const setCartItemCount = useCartStore((state) => state.setCartItemCount);
  const cartItemCount = useCartStore((state) => state.cartItemCount);
  const router = useRouter();
  const { username } = useUserStore();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const fetchProductCart = useCallback(async () => {
    try {
      const cartData: CartItem[] = await myCarts();
      console.log("Fetched cartData:", cartData);
  
      if (Array.isArray(cartData)) {
        setProducts(cartData);
        setCartItemCount(cartData.length);
        const total = cartData.reduce((acc, cartItem) => acc + cartItem.totalPrice, 0);
        setTotalPrice(total);
      } else {
        console.error("Invalid cart data format:", cartData);
        setCartItemCount(0);
      }
    } catch (error) {
      console.error("Error fetching carts:", error);
      setCartItemCount(0);
    }
  }, [setCartItemCount]);

  useEffect(() => {
    if (!username) {
      const path = window.location.pathname;
      router.push(`/login?redirect=${path}`);
      return;
    }
    fetchProductCart();
  }, [fetchProductCart, router, username]);

  const handleDeleteCart = async (cartId: number) => {
    try {
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
    } catch (error) {
      console.error("Clear Cart Error", error);
    }
  };

  const handleCheckout = async () => {
    try {
      await checkoutCart();
      fetchProductCart();
      router.push('/user/purchase');
    } catch (error) {
      console.error("Checkout Error", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <div className="self-start p-2 bg-white w-full pl-5 mt-7 border">Shopping Cart</div>
      <div className="w-5/6 justify-center flex flex-col mt-5 min-w-[850px] text-gray-700">
        <div className="flex flex-row w-full h-12 items-center shadow-sm bg-white p-2">
          <div className="w-1/2 pl-5">Product</div>
          <div className="flex flex-row w-1/2">
            <div className="w-1/4 items-center justify-center flex">Unit Price</div>
            <div className="w-1/4 items-center justify-center flex">Quantity</div>
            <div className="w-1/4 items-center justify-center flex">Total Price</div>
            <div className="w-1/4 items-center justify-center flex">Actions</div>
          </div>
        </div>
        {products.map((product) => (
          <ProductCart
            key={product.id}
            cart={product}
            onDelete={() => handleDeleteCart(product.id)}
            onFetchData={fetchProductCart}
          />
        ))}
      </div>
      <div className="fixed bottom-0 w-5/6 bg-white text-center flex flex-row p-4 justify-end items-center min-w-[544px] border shadow-md">
        <div className="flex flex-row justify-end items-center gap-3">
          <div className="font-poppins text-gray-800">Total ({cartItemCount} item):</div>
          <div className="font-poppins text-2xl text-orange-600 flex flex-row gap-1">
            <div>฿</div><Number>{totalPrice}</Number>
          </div>
          <div className="bg-orange-600 p-2 px-7 text-white cursor-pointer hover:bg-orange-500" onClick={handleCheckout}>
            Check Out
          </div>
          <div className="p-2 text-[0.8rem] text-red-600 hover:underline cursor-pointer" onClick={handleClearCart}>
            Remove All
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCart;
