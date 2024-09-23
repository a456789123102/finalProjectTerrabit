"use client"
import { useEffect, useState } from 'react';
import Text from '../components/text';
import InputText from '../components/inputText';
import { login } from '@/app/apis/auth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await login(username, password);
      console.log(res);
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <Text className='w-full h-screen flex flex-col items-center justify-center'>
      <div className='bg-green-500 p-5 flex justify-center flex-col items-center'>
        <div>
          <div className='justify-center flex py-3'>Login</div>
          <InputText label='Username' value={username} onChange={setUsername} />
          <InputText label='Password' value={password} onChange={setPassword} />
        </div>
        <button className='justify-center flex py-3 bg-yellow-500 w-28 my-4' onClick={handleLogin}>
          Login
        </button>
      </div>
    </Text>
  );
}

export default Login;
