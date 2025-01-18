import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { updateCart } from '@/app/apis/carts';

type Cart = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: {
    Image: { imageUrl: string }[];
    name: string;
    price: number;
    finalPrice: number;
  };
};


function ProductCart({
  cart,
  onDelete,
  onFetchData, // รับ prop ชื่อเดียวกัน
}: {
  cart: Cart;
  onDelete: () => void;
  onFetchData: () => void; // เปลี่ยนชื่อให้ตรงกับที่ parent ส่งมา
}) {
  const quantity = cart.quantity;
  const [tempQuantity, setTempQuantity] = useState(cart.quantity);

  const handleIncreaseClick = () => {
    if (Number(cart.product.quantity) > tempQuantity) {
      setTempQuantity((prev) => prev + 1);
    }
  };

  const handleDecreaseClick = () => {
    if (tempQuantity > 1) {
      setTempQuantity((prev) => prev - 1);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const res = await updateCart(cart.id, tempQuantity);
      console.log("updated cart:", JSON.stringify(res, null, 2));
      onFetchData(); // เรียก prop ที่ส่งมาจาก parent
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  

  const productImage =
    cart.product.Image && cart.product.Image.length > 0
      ? cart.product.Image[0].imageUrl
      : 'https://lovedrinks.com/cdn-cgi/imagedelivery/lPz29URYX3W9lk2JWbxsjA/lovedrinks.com/2023/08/No-Image-Placeholder.svg_.png/w=9999';

  return (
    <div className='bg-white mt-5 w-full h-20 flex flex-row p-2 text-[0.8rem] shadow-sm'>
      <div className='w-1/2 pl-5 flex items-center gap-2 '>
        <Image
          className=" w-11 h-full p-1"
          src={productImage}
          alt={cart.product.name}
          width={300}
          height={250}
          loading="lazy"
          onError={() => console.error('Failed to load image')}
        />
        <Link href={`/product/${cart.product.id}`} className='items-start cursor-pointer hover:text-blue-800'>{cart.product.name}</Link>
      </div>
      <div className='flex flex-row w-1/2 justify-around items-center'>
        <div className='w-1/4 items-center justify-center flex'>
          <div className='line-through text-gray-800 text-[0.7rem]'>฿{cart.product.price}</div>
          <div className='pl-2'>฿{cart.product.finalPrice}</div>
        </div>
        <div className='w-1/4 items-center justify-center flex'>
          <button className="px-2 py-1 border" onClick={handleDecreaseClick} disabled={tempQuantity <= 1}>-</button>
          <span className=' px-3 py-1'>{tempQuantity}</span>
          <button className="px-2 py-1  border" onClick={handleIncreaseClick} disabled={tempQuantity >= cart.product.quantity}>+</button>
        </div>
        <div className='w-1/4 items-center justify-center flex'>
          ฿{cart.product?.finalPrice && cart.quantity
            ? `฿${cart.product.finalPrice * cart.quantity}`
            : "Price not available"}
        </div>
        <div className='w-1/4 items-center justify-center flex'>
          <div className='flex flex-col items-center gap-1'>
            <div onClick={onDelete} className='text-slate-800 cursor-pointer hover:underline hover:text-red-600 text-[0.7rem]'>Remove</div>
            {tempQuantity !== quantity && (
        <button className='text-white text-[0.7rem] p-2 bg-blue-700' onClick={handleSaveChanges}>Update cart</button>
      )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
