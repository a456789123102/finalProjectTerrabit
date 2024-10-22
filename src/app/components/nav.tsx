"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Text from './text';
import Link from 'next/link';
import UserMenu from './userMenu';  // แบบนี้ถูกต้องถ้าเป็น default export

function Nav() {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // เมื่อเลื่อนเมาส์เกิน 100px ให้ทำการ fixed navbar
      if (window.scrollY > 30) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    // ตั้ง listener สำหรับการเลื่อนของหน้าจอ
    window.addEventListener('scroll', handleScroll);

    // ล้าง listener เมื่อ component ถูก unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Text className={`flex flex-row justify-between bg-black bg-opacity-80 h-8 px-5 text-yellow-400 transition-all duration-300 ${isFixed ? 'fixed top-0 w-full z-40' : 'relative'}`}>
      <div className='flex flex-row gap-7'>
        <div className='hover:underline cursor-pointer hover:text-yellow-200'>Games</div>
        <Link href={`/product`} className='hover:underline cursor-pointer hover:text-yellow-200'>Products</Link>
        <div className='hover:underline cursor-pointer hover:text-yellow-200'>News</div>
        <Link href={`/careers`} className='hover:underline cursor-pointer hover:text-yellow-200'>Careers</Link>
        <div className='hover:underline cursor-pointer hover:text-yellow-200'>Services</div>
      </div>
      <div className='flex flex-row items-center'>
        <input className='h-6 rounded-md pl-3 text-amber-800' />
        <div className='pl-3'>Search</div>
      </div>
      <div>
        <UserMenu />
      </div>
    </Text>
  );
}

export default Nav;
