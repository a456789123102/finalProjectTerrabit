'use client'
import React from 'react'
import Text from "./text"
import { useRouter } from 'next/navigation';

function Logo() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };
  return (
    <Text className='flex flex-col'>
          <div className='bg-[#040D12] w-screen h-8 px-5 text-yellow-500 hover:text-yellow-300 cursor-pointer' onClick={handleClick}>Terrabit pixel Studio</div>
    </Text>
  )
}

export default Logo
