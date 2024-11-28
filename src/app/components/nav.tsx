"use client";
import React, { useState, useEffect } from 'react';
import Text from './text';
import Link from 'next/link';
import useCartStore from '@/store/cartStore';

const menuItems = [
  { name: 'Games', href: null },
  { name: 'Products', href: '/product' },
  { name: 'News', href: null },
  { name: 'Careers', href: '/careers' },
  { name: 'Services', href: null }
];


function Nav() {
  const [isFixed, setIsFixed] = useState(false);
  const cartItemCount = useCartStore((state) => state.cartItemCount);
  console.log(`cartItemCount:${cartItemCount}`)

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

  return (
    <Text className={`hover:h-12 flex flex-row   justify-between bg-black bg-opacity-80 h-8 px-5 text-yellow-400 transition-all duration-300 ${isFixed ? 'fixed top-0 w-full z-40' : 'relative'}`}>
      <div className='flex flex-row gap-7 w-1/3 items-center'>
        {menuItems.map((item, index) => (
          item.href ? (
            <Link key={index} href={item.href} className="hover:underline cursor-pointer hover:text-yellow-200 hover:text-[1.3rem] transition-all duration-200 delay-50">
              {item.name}
            </Link>
          ) : (
            <div key={index} className="hover:underline cursor-pointer hover:text-yellow-200 hover:text-[1.5rem] transition-all duration-200 delay-100">
              {item.name}
            </div>
          )
        ))}
      </div>
      <div className='flex flex-row items-center w-1/3 justify-center'>
        <div className='relative w-2/3 '>
          <input className='h-8 pl-10 pr-20  text-amber-800 w-full ' />
          {/* search */}
          <div className='w-full cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute right-1 top-1/2 transform -translate-y-1/2 w-10 h-7 bg-orange-600 hover:bg-orange-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          </div>
        </div>
      </div>

      <div className='flex flex-row items-center w-1/3 justify-start'>
        <Link href={"/cart/myCart"} className="justify-center items-center hover:bg-orange-100 flex flex-row"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        <div className='bg-orange-500 rounded-lg text-[0.8rem] px-2 font-mono text-'>{cartItemCount}</div>
        </Link>
        
      </div>
    </Text>
  );
}

export default Nav;
