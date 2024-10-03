'use client';
import React, { useEffect } from 'react';
import Text from "./text";
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/zustand'; 

function Logo() {
  const router = useRouter();
  const { isAdmin } = useUserStore();  // เช็คสถานะ isAdmin

  useEffect(() => {
    if (!isAdmin) {
      console.log('Admin Menu should disappear');
    }
  }, [isAdmin]);

  const handleClick = () => {
    router.push('/');
  };

  return (
    <Text className='flex flex-row justify-between w-screen h-8 px-5 bg-[#040D12]'>
      <div className='text-yellow-500 hover:text-yellow-300 cursor-pointer' onClick={handleClick}>
        Terrabit pixel Studio
      </div>
      {isAdmin && (  // แสดง Admin Menu ถ้า isAdmin เป็น true
        <div className='text-red-400'>
          Admin Menu
        </div>
      )}
    </Text>
  );
}

export default Logo;
