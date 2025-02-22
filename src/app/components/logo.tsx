'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/zustand';
import AdminMenu from './adminMenu';
import UserMenu from './userMenu';
import { me } from '../apis/user'; 
import Link from 'next/link';
import Text from './text';

function Logo() {
  const router = useRouter();
  const { username, isAdmin, setUser } = useUserStore();  

  useEffect(() => {
    if (!username) {
      me()
        .then((data) => {
          setUser(data);  
        })
        .catch(() => {
        });
    }
  }, [username, setUser, router]);  

  return (
<Text className='flex flex-row justify-between w-screen h-10 px-5 bg-[#181C14] text-yellow-500 text-[0.9rem] items-center'>
  <Link href={'/'} className='hover:text-yellow-300 cursor-pointer text-[1.4rem]'>
    Terrabit Pixel Studio
  </Link>
  
  {/* ✅ แก้ไข: เพิ่ม flex ใน div นี้ */}
  <div className='flex flex-row items-baseline justify-around'>
    {username ? (
      <div className='flex flex-row items-baseline gap-2'>
<div className='flex flex-row items-center'>
<div>Welcome! {username}</div>
<UserMenu /> 
</div>
        {isAdmin && <AdminMenu />} {/* แสดง AdminMenu ถ้าเป็น admin */}
      </div>
    ) : (
      <Link href="/login" className="hover:underline">login</Link>
    )}
  </div>
</Text>

  );
}

export default Logo;
