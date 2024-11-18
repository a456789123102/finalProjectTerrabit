"use client";
import { useEffect, useState } from 'react';
import Text from '../../components/text';
import InputText from '../../components/inputText';
import { login } from '@/app/apis/auth';
import { useRouter } from "next/navigation";
import { useUserStore } from '@/store/zustand';
import Link from 'next/link';

function Login() {
  const router = useRouter();
  const { id, setUser } = useUserStore(); // ดึง setUser มาด้วยเพื่อเก็บข้อมูลผู้ใช้
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // เมื่อผู้ใช้ login สำเร็จ ให้เก็บข้อมูลผู้ใช้ลงใน zustand store และ redirect ไปที่หน้าแรก
  const handleLogin = async () => {
    try {
      const userData = await login(username, password); // สมมติว่า login API จะส่งข้อมูลผู้ใช้กลับมา
      setUser({ id: userData.id, username: userData.username }); // เก็บข้อมูลผู้ใช้ใน store
      router.push("/"); // หลังจาก login สำเร็จ redirect ไปหน้าแรก
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // ตรวจสอบถ้ามี id ใน store (หมายถึงผู้ใช้ได้ login แล้ว) ก็ redirect ไปหน้าแรก
  useEffect(() => {
    if (id) {
      router.push("/"); // ถ้า login แล้ว, redirect ไปหน้าแรก
    }
  }, [id, router]); // ใช้ id เป็น dependency เพื่อรอให้ id เปลี่ยนแปลงหลังจาก login

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center '>
      <Text className='bg-white p-5 px-16 flex justify-center flex-col items-center w-1/4'>
        <div className='w-full'>
          <div className='w-full'>
            <div className='justify-center flex py-3 text-4xl  font-bold'>LOGIN</div>
            <InputText label='Username' value={username} onChange={setUsername} />
            <InputText label='Password' value={password} onChange={setPassword} />
          </div>
          <button className='text-white justify-center flex py-3 my-4 bg-[#2E2E2E] hover:bg-[#111111] w-full' onClick={handleLogin}>
            Sign in
          </button>
          <div className='text-sm space-y-1 flex flex-col items-center font-bold text-[#2E2E2E] '>
            <Link href={'/product'} className='hover:text-[#111111] hover:underline cursor-pointer'>Return to Store</Link>
            <Link href={'/register'} className='hover:text-[#111111] hover:underline cursor-pointer'>create account</Link>
            <div className='hover:text-[#111111] hover:underline cursor-pointer'>Forgot your password?</div>
          </div>
        </div>
      </Text>
    </div>
  );
}

export default Login;
