"use client";
import { useEffect, useState } from 'react';
import Text from '../../components/text';
import InputText from '../../components/inputText';
import { register,logout } from '@/app/apis/auth';
import { useRouter } from "next/navigation";
import { useUserStore } from '@/store/zustand';
import Link from 'next/link';

function Register() {
  const router = useRouter();
  const {id} = useUserStore();
  const  {clearUser} = useUserStore();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');


  const handleRegister = async () => {
    try {
      setError('');
      await register(email,username, password); 
      router.push("/")
    } catch (error) {
      console.error('ข้อผิดพลาดในการลงทะเบียน:', error);
      setError('เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง');
    }
  };

  const handleLogout = async () => {
    await logout();
    clearUser();
}
  
  useEffect(()=>{
    if(id){
        handleLogout()
    }
  })

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center '>
      <Text className='bg-white p-5 px-16 flex justify-center flex-col items-center max-w-1/4'>
          <div className='w-full'>
            <div className='justify-center flex py-3 text-4xl  font-bold'>Register</div>
            <InputText label='E-mail' value={email} onChange={setEmail} />
            <InputText label='Username' value={username} onChange={setUsername} />
            <InputText label='Password' value={password} onChange={setPassword} />
            <InputText label='Confirm Password' value={confirmPassword} onChange={setConfirmPassword} />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button className='text-white justify-center flex py-3 my-4 bg-[#2E2E2E] hover:bg-[#111111] w-full' onClick={handleRegister}>
            Register
          </button>
          <div className='text-sm space-y-1 flex flex-col items-center font-bold text-[#2E2E2E] '>
            <Link href={'/product'} className='hover:text-[#111111] hover:underline cursor-pointer'>Return to Store</Link>
            <Link href={'/login'} className='hover:text-[#111111] hover:underline cursor-pointer'>go to login</Link>
          </div>
      </Text>
    </div>
  );
}

export default Register;