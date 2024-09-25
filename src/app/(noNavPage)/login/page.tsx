"use client";
import { useEffect, useState } from 'react';
import Text from '../../components/text';
import InputText from '../../components/inputText';
import { login } from '@/app/apis/auth';
import { useRouter } from "next/navigation";
import { useUserStore } from '@/store/zustand';

function Login() {
  const router = useRouter();
  const {id} = useUserStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      await login(username, password); 
      router.push("/")
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  

  useEffect(()=>{
    if(id){
      router.push("/")
    }
  })

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