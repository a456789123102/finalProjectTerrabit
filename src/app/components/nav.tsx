"use client";
import React, { useState, useEffect } from 'react';
import Text from './text';
import Link from 'next/link';
import {useCartStore} from '@/store/cartStore';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { myCarts } from '../apis/carts';

const menuItems = [
  { name: 'Games', href: "/product?category=1" },
  { name: 'Products', href: '/product' },
  { name: 'News', href: null },
  { name: 'Careers', href: '/careers' },
  { name: 'Services', href: null }
];


function Nav() {
  const [isFixed, setIsFixed] = useState(false);
  const cartItemCount = useCartStore((state) => state.cartItemCount);
  const setCartItemCount = useCartStore((state) => state.setCartItemCount);

  const[text, setText] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = () => {
    if(text.length > 0) {
   router.push(`/product?search=${text}`);
   setText("");
  }
}
useEffect(() => {
  if (!cartItemCount) {
    console.log("no items found lets fetch carts")
    myCarts().then((data) => {
      setCartItemCount(data.length);
    });
  }
}, [cartItemCount, setCartItemCount]); // Only include the necessary dependencies


  return (
    <Text className={`hover:h-12 flex flex-row   justify-between bg-black bg-opacity-80 h-8 px-5 text-yellow-400 transition-all duration-300 ${isFixed ? 'fixed top-0 w-full z-40' : 'relative'}`}>
      <div className='flex flex-row gap-7 w-1/3 items-center overflow-hidden'>
        {menuItems.map((item, index) => (
          item.href ? (
<div key={index} onClick={() => router.replace(item.href)} className="hover:underline cursor-pointer hover:text-yellow-200 hover:text-[1.3rem] transition-all duration-200 delay-50">
  {item.name}
</div>

          ) : (
            <div key={index} className="hover:underline cursor-pointer hover:text-yellow-200 hover:text-[1.5rem] transition-all duration-200 delay-100">
              {item.name}
            </div>
          )
        ))}
      </div>
      <div className='flex flex-row items-center w-1/3 justify-center '>
        <div className='relative w-2/3 '>
          <input className='h-8 pl-10 pr-20  text-amber-800 w-full border' 
          value={text}
          onChange={(e)=>setText(e.target.value)}
          />
          {/* search */}
          <div className='w-full cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute right-1 top-1/2 transform -translate-y-1/2 w-10 h-7 bg-orange-600 hover:bg-orange-400 rounded-[4px]" onClick={handleSearch}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          </div>
        </div>
      </div>

      <div className='flex flex-row items-center w-1/3 justify-start relative'>
        <Link href={"/cart/myCart"} className="justify-center items-center flex flex-row">
        <ShoppingCart />
        {cartItemCount > 0 &&(<div className='bg-orange-500 rounded-lg text-[0.8rem] px-1 top-0 left-5 font-mono absolute'>{cartItemCount}</div>)}
        </Link>
        
      </div>
    </Text>
  );
}

export default Nav;
