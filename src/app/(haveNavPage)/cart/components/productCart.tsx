import React, { useState } from 'react';
import Image from 'next/image';

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

function ProductCart({ cart, onDelete }: { cart: Cart; onDelete: () => void }) {
  const [AddQuantity, setAddQuantity] = useState(cart.quantity);

  const productImage =
    cart.product.Image && cart.product.Image.length > 0
      ? cart.product.Image[0].imageUrl
      : 'https://lovedrinks.com/cdn-cgi/imagedelivery/lPz29URYX3W9lk2JWbxsjA/lovedrinks.com/2023/08/No-Image-Placeholder.svg_.png/w=9999';

  return (
    <div className='bg-slate-50 mt-5 w-full h-20 flex flex-row p-2 text-[0.8rem]'>
      <div className='w-1/2 pl-5 flex border'>
        <Image
          className="object-cover cursor-pointer w-11 h-full"
          src={productImage}
          alt={cart.product.name}
          width={300}
          height={250}
          loading="lazy"
          onError={() => console.error('Failed to load image')}
        />
        <div className='items-start'>{cart.product.name}</div>
      </div>
      <div className='flex flex-row w-1/2 justify-around items-center'>
        <div className='flex gap-2'>
          <div className='line-through'>฿{cart.product.price}</div>
          <div>฿{cart.product.finalPrice}</div>
        </div>
        <div className='bg-white text-black'>
          <button className="px-2 py-1 border">-</button>
          <span className=' px-3 py-1'>{cart.quantity}</span>
          <button className="px-2 py-1  border">+</button>
        </div>
        <div>
          ฿{cart.product?.finalPrice && cart.quantity
            ? `฿${cart.product.finalPrice * cart.quantity}`
            : "Price not available"}
        </div>
        <div className='flex flex-col'>
          <div>
            <div onClick={onDelete} className='cursor-pointer hover:underline hover:text-red-600'>Delete</div>
            <div>Related</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
