'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/zustand';
import AdminMenu from './adminMenu';
import UserMenu from './userMenu';
import { me } from '../apis/user'; // API ที่ใช้ดึงข้อมูลผู้ใช้
import Link from 'next/link';
import Text from './text';

function Logo() {
  const router = useRouter();
  const { username, isAdmin, setUser } = useUserStore();  // เช็คสถานะ username และ isAdmin

  useEffect(() => {
    if (!username) {
      // ถ้าไม่มี username ใน store ให้ลองดึงข้อมูลจาก API หรือทำการ redirect ไปหน้า login
      me()
        .then((data) => {
          setUser(data);  // เซ็ตข้อมูลผู้ใช้
        })
        .catch(() => {
          router.push("/login");  // ถ้าผิดพลาดก็ให้ไปที่หน้า login
        });
    }
  }, [username, setUser, router]);  // ตรวจสอบเมื่อ username เปลี่ยน

  const handleClick = () => {
    router.push('/');
  };

  return (
    <Text className='flex flex-row justify-between w-screen h-8 px-5 bg-[#181C14]'>
      <Link href={'/'} className='text-yellow-500 hover:text-yellow-300 cursor-pointer' onClick={handleClick}>
        Terrabit pixel Studio
      </Link>
      {username ? (
        <div className='flex items-center space-x-4'>
          <UserMenu /> {/* แสดง UserMenu ถ้ามี username */}
          {isAdmin && <AdminMenu />} {/* แสดง AdminMenu ถ้าเป็น admin */}
        </div>
      ) : (
        <Link href="/login" className="text-yellow-500">Please login</Link>
      )}
    </Text>
  );
}

export default Logo;
