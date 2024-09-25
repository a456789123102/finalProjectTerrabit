"use client";
import { useEffect, useState } from 'react';
import Text from '../../components/text';
import InputText from '../../components/inputText';
import { register,logout } from '@/app/apis/auth';
import { useRouter } from "next/navigation";
import { useUserStore } from '@/store/zustand';

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
    <div>
      <Text className='w-full h-screen flex flex-col items-center justify-center bg-[#DAD3BE]'>
        <div className='bg-[#5C8374] p-5 flex justify-center flex-col items-center'>
          <div>
            <div className='justify-center flex py-3'>Register</div>
            <InputText label='E-mail' value={email} onChange={setEmail} />
            <InputText label='Username' value={username} onChange={setUsername} />
            <InputText label='Password' value={password} onChange={setPassword} />
            <InputText label='Confirm Password' value={confirmPassword} onChange={setConfirmPassword} />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button className='justify-center flex py-3 bg-yellow-200 w-28 my-4' onClick={handleRegister}>
            Register
          </button>
        </div>
      </Text>
    </div>
  );
}

export default Register;