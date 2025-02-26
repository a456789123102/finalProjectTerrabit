"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/zustand";
import Swal from "sweetalert2";
import Link from "next/link";
import InputText from "../../components/inputText";
import { login } from "@/app/apis/auth";
import { Eye,EyeClosed } from "lucide-react";
import { text } from "stream/consumers";

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { id, setUser } = useUserStore();
  const [redirectPath, setRedirectPath] = useState<string>("/");
  const[isHidePassword, setIsHidePassword] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let redirect = params.get("redirect");
    console.log(" Raw redirect param from URLSearchParams:", redirect); // Debug
    if (!redirect || redirect === "undefined" || redirect === "null") {
      redirect = "/";
    }
    setRedirectPath(decodeURIComponent(redirect));
  }, []);

  

  const handleLogin = async () => {
    try {
      const userData = await login(username, password);
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
<div className="w-full h-screen flex flex-col items-center justify-center">
  <div className="bg-white p-5 px-16 flex justify-center flex-col items-center max-w-1/4">
    <div className="w-full">
      <h2 className="justify-center flex py-3 text-4xl font-bold">LOGIN</h2>
      
      {/* ✅ ใช้ Form และให้ Enter ทำงาน */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // ป้องกันหน้ารีโหลด
          handleLogin();
        }}
      >
        <InputText label="Username" value={username} onChange={setUsername} />
      <div className="relative">
      <InputText label="Password" type={isHidePassword ? "password" : "text"}
 value={password} onChange={setPassword} />
      <div className="absolute bottom-[12px] cursor-pointer right-2">
      {isHidePassword?<EyeClosed  size={20} onClick={()=>{setIsHidePassword(false)}} /> : <Eye size={20} onClick={()=>{setIsHidePassword(true)}}/> }
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

      <div className="text-sm space-y-1 flex flex-col items-center font-bold text-[#2E2E2E]">
        <Link href={"/product"} className="hover:text-[#111111] hover:underline">
          Return to Store
        </Link>
        <Link href={"/register"} className="hover:text-[#111111] hover:underline">
          Create account
        </Link>
        <div className="hover:text-[#111111] hover:underline">Forgot your password?</div>
      </div>
    </div>
  </div>
</div>

  );
}

export default Login;
