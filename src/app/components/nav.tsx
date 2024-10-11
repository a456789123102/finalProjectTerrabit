"use client";
import { useRouter } from "next/navigation"; 
import React from 'react';
import Text from './text';
import Link from 'next/link';
import UserMenu from './userMenu';  // แบบนี้ถูกต้องถ้าเป็น default export


function Nav() {

  return (
    <Text className='flex flex-row justify-between bg-[#183D3D] h-7 px-5 text-yellow-400 '>
      <div className='flex flex-row gap-7 '>
        <div className='hover:underline cursor-pointer hover:text-yellow-200'>Games</div>
        <Link href={`/product`} className='hover:underline cursor-pointer hover:text-yellow-200'>Products</Link>
        <div className='hover:underline cursor-pointer hover:text-yellow-200'>News</div>
        <div className='hover:underline cursor-pointer hover:text-yellow-200'>Careers</div>
        <div className='hover:underline cursor-pointer hover:text-yellow-200'>Services</div>
      </div>
      <div className='flex flex-row items-center '>
        <input className='h-6 rounded-md pl-3 text-amber-800'></input>
        <div className='pl-3'>Search</div>
      </div>
      <div>
       <UserMenu />
 
      </div>
    </Text>
  );
}

export default Nav;
