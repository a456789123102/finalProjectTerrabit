"use client";
import { useEffect, useState } from 'react';
import Text from '../../components/text';
import InputText from '../../components/inputText';
import { login } from '@/app/apis/auth';
import { useRouter } from "next/navigation";
import { useUserStore } from '@/store/zustand';

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
    <div>
      <Text className='w-full h-screen flex flex-col items-center justify-center bg-[#FCFAEE]'>
        <div className='bg-[#5C8374] p-5 flex justify-center flex-col items-center'>
          <div>
            <div className='justify-center flex py-3'>Login</div>
            <InputText label='Username' value={username} onChange={setUsername} />
            <InputText label='Password' value={password} onChange={setPassword} />
          </div>
          <button className='justify-center flex py-3 bg-yellow-200 w-28 my-4' onClick={handleLogin}>
            Login
          </button>
        </div>
      </Text>
    </div>
  );
}

export default Login;
