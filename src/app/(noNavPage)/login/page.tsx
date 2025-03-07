"use client";

import { useEffect, useState} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/zustand";
import Swal from "sweetalert2";
import Link from "next/link";
import { login } from "@/app/apis/auth";
import { Eye,EyeClosed } from "lucide-react";
import { loginSchema } from '../schemas/loginSchema';
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function Login() {
  const router = useRouter();
  const { id, setUser } = useUserStore();
  const [redirectPath, setRedirectPath] = useState<string>("/");
  const[isHidePassword, setIsHidePassword] = useState<boolean>(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let redirect = params.get("redirect");
    console.log(" Raw redirect param from URLSearchParams:", redirect); // Debug
    if (!redirect || redirect === "undefined" || redirect === "null") {
      redirect = "/";
    }
    setRedirectPath(decodeURIComponent(redirect));
  }, []);

  const {register,handleSubmit, formState:{errors},} =useForm({
     resolver: zodResolver(loginSchema),
  })

  

  const handleLogin = async (data) => {
    try {
      const userData = await login(data.username, data.password);
      setUser({ id: userData.id, username: userData.username });
  
      console.log("Login Success, Redirecting to:", redirectPath); 
      router.push(redirectPath || "/"); // 
    } catch (error) {
      console.error(" Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login failed!",
        text: "Invalid username or password. Please try again.",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };
  

  useEffect(() => {
    if (id) {
      console.log(" Auto Redirecting to:", redirectPath);
      router.replace(redirectPath || "/");
    }
  }, [id, router, redirectPath]);

  return (
<div className="w-full h-screen flex flex-col items-center justify-center font-pixelify"   style={{
    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/terrabit-5d129.appspot.com/o/decorative%2Fthumb-1920-1205979.png?alt=media')`,
  }}>
  <div className="bg-white p-5 pb-12 px-16 flex justify-center flex-col items-center w-[50vh] min-w-80">
    <div className="w-full">
      <h2 className="justify-center flex py-3 text-4xl font-bold">LOGIN</h2>
      
      <form onSubmit={handleSubmit(handleLogin)}
      >
           <div className='flex flex-col my-1'>
            <div className="flex flex-row gap-2 items-baseline justify-between">
              <div className="mb-1 text-sm flex-grow">Username</div>
              {errors.username && <div className="text-[0.6rem] text-red-500"> {errors.username.message} </div>}
            </div>
            <input
              className={`bg-white mb-1 text-[0.8rem] border h-9 px-4 hover:border-yellow-500 ${errors.username ? "border-red-500" : "border-gray-700"}`}
              type="text"
              {...register("username")}
              autoComplete='off'
              placeholder=""
            />
          </div>
          <div className='flex flex-col my-1'>
            <div className="flex flex-row gap-2 items-baseline justify-between">
              <div className="mb-1 text-sm flex-grow">Password</div>
              {errors.password && <div className="text-[0.6rem] text-red-500"> {errors.password.message} </div>}
            </div>
            <div className='flex flex-row relative'>
              <input
                className={`bg-white mb-1 w-full border text-[0.8rem] h-9 px-4 hover:border-yellow-500 ${errors.password ? "border-red-500" : "border-gray-700"}`}
                type={isHidePassword ? "password" : "text"}
                {...register("password")}
                autoComplete='off'
                     placeholder=""
              />
             <div className='absolute bottom-3 right-2'> {isHidePassword ? <EyeClosed size={20} onClick={() => { setIsHidePassword(false) }} /> : <Eye size={20} onClick={() => { setIsHidePassword(true) }} />}</div>
            </div>
          </div>

        {/* ✅ เปลี่ยนปุ่มเป็น type="submit" */}
        <button
          type="submit"
          className="text-white justify-center flex py-3 my-4 bg-[#2E2E2E] hover:bg-[#111111] w-full"
        >
          Sign in
        </button>
      </form>

      <div className="text-sm space-y-1 gap-2 flex flex-col items-center font-bold text-[#2E2E2E]">
        <Link href={"/product"} className="hover:text-blue-600 hover:underline ">
          Return to Store
        </Link>
        <Link href={"/register"} className="hover:text-blue-600 hover:underline ">
          Create account
        </Link>
      </div>
    </div>
  </div>
</div>

  );
}

export default Login;
