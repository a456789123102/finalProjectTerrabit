"use client";
import { useEffect, useState } from 'react';
import { goRegister, logout } from '@/app/apis/auth';
import { useRouter } from "next/navigation";
import { useUserStore } from '@/store/zustand';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/registerSchema";
import { Eye, EyeClosed } from "lucide-react";

interface Data {
  email: string;
  username: string;
  password: string;
}


function Register() {
  const [error, setError] = useState("")
  const router = useRouter();
  const { id, clearUser } = useUserStore();
  const [isHidePassword, setIsHidePassword] = useState(true);


  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: zodResolver(registerSchema),
  });





  const handleRegister = async (data:Data) => {
    try {
      setError('');
      await goRegister(data.email, data.username, data.password);
      setError('Your account is successfully registered');
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred during registration. Please try again.');
    }
  };


  const handleLogout = async () => {
    await logout();
    clearUser();
  }

  useEffect(() => {
    if (id) {
      handleLogout()
    }
  })

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center font-pixelify'   style={{
      backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/terrabit-5d129.appspot.com/o/decorative%2Fthumb-1920-995128.jpg?alt=media')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <form onSubmit={handleSubmit(handleRegister)} className='bg-white p-5 px-16  flex justify-center flex-col items-center w-[60vh] min-w-96'>
        <div className='w-full'>
          <div className='justify-center flex py-3 text-4xl  font-bold'>Register</div>

          <div className='flex flex-col my-1'>
            <div className="flex flex-row gap-2 items-baseline justify-between">
              <div className="mb-1 text-sm flex-grow">Email</div>
              {errors.email && <div className="text-[0.6rem] text-red-500"> {errors.email.message} </div>}
            </div>
            <input
              className={`bg-white mb-1  border h-9 px-4 hover:border-yellow-500 ${errors.email ? "border-red-500" : "border-gray-700"}`}
              type="text"
              placeholder="Enter your email..."
              maxLength={50}
              {...register("email")}
              autoComplete='off'
            />
          </div>

          <div className='flex flex-col my-1'>
            <div className="flex flex-row gap-2 items-baseline justify-between">
              <div className="mb-1 text-sm flex-grow">Username</div>
              {errors.username && <div className="text-[0.6rem] text-red-500"> {errors.username.message} </div>}
            </div>
            <input
              className={`bg-white mb-1  border h-9 px-4 hover:border-yellow-500 ${errors.username ? "border-red-500" : "border-gray-700"}`}
              type="text"
              {...register("username")}
              autoComplete='off'
              placeholder="Choose a username..."
            />
          </div>

          <div className='flex flex-col my-1'>
            <div className="flex flex-row gap-2 items-baseline justify-between">
              <div className="mb-1 text-sm flex-grow">Password</div>
              {errors.password && <div className="text-[0.6rem] text-red-500"> {errors.password.message} </div>}
            </div>
            <div className='flex flex-row relative'>
              <input
                className={`bg-white mb-1 w-full border h-9 px-4 hover:border-yellow-500 ${errors.password ? "border-red-500" : "border-gray-700"}`}
                type={isHidePassword ? "password" : "text"}
                {...register("password")}
                autoComplete='off'
                     placeholder="Create a password..."
              />
             <div className='absolute bottom-3 right-2'> {isHidePassword ? <EyeClosed size={20} onClick={() => { setIsHidePassword(false) }} /> : <Eye size={20} onClick={() => { setIsHidePassword(true) }} />}</div>
            </div>
          </div>

          <div className='flex flex-col my-1'>
            <div className="flex flex-row gap-2 items-baseline justify-between">
              <div className="mb-1 text-sm flex-grow">confirm Password</div>
              {errors.confirmPassword && <div className="text-[0.6rem] text-red-500"> {errors.confirmPassword.message} </div>}
            </div>
            <div className='flex flex-row relative'>
              <input
                className={`bg-white mb-1 w-full border h-9 px-4 hover:border-yellow-500 ${errors.confirmPassword ? "border-red-500" : "border-gray-700"}`}
                type={isHidePassword ? "password" : "text"}
                {...register("confirmPassword")}
                autoComplete='off'
                 placeholder="Confirm your password..."
              />
             <div className='absolute bottom-3 right-2'> {isHidePassword ? <EyeClosed size={20} onClick={() => { setIsHidePassword(false) }} /> : <Eye size={20} onClick={() => { setIsHidePassword(true) }} />}</div>
            </div>
          </div>


        </div>
        {error && (
          <div className={error === "Your account is successfully registered" ? "text-green-500" : "text-red-500"}>
            {error}
          </div>
        )}

        <button className='text-white justify-center flex py-3 my-4 bg-[#2E2E2E] hover:bg-[#111111] w-full' type="submit">
          Register
        </button>
        <div className='text-sm space-y-1 flex flex-col items-center font-bold text-[#2E2E2E] '>
          <Link href={'/product'} className='hover:text-[#111111] hover:underline cursor-pointer'>Return to Store</Link>
          <Link href={'/login'} className='hover:text-[#111111] hover:underline cursor-pointer'>go to login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;