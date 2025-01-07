"use client";

import { useEffect, useState } from "react";
import Text from "../../components/text";
import InputText from "../../components/inputText";
import { login } from "@/app/apis/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/zustand";
import Link from "next/link";
import Swal from "sweetalert2";

function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id, setUser } = useUserStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const redirect = searchParams.get("redirect"); 

  // Handle Login
  const handleLogin = async () => {
    try {
      const userData = await login(username, password);
      setUser({ id: userData.id, username: userData.username });
  
      const targetPath = redirect && redirect !== "undefined" ? redirect : "/";
      console.log("Redirecting to:", targetPath); // Log เพื่อดู Path ที่จะ Redirect ไป
      router.push(targetPath); // Redirect ไปยัง Path ที่ถูกต้อง
    } catch (error) {
      console.error("Login error:", error);
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
      const targetPath = redirect && redirect !== "undefined" ? redirect : "/";
      router.push(targetPath);
    }
  }, [id, router, redirect]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Text className="bg-white p-5 px-16 flex justify-center flex-col items-center max-w-1/4">
        <div className="w-full">
          <div className="w-full">
            <div className="justify-center flex py-3 text-4xl font-bold">LOGIN</div>
            <InputText
              label="Username"
              value={username}
              onChange={setUsername}
            />
            <InputText
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />
          </div>
          <button
            className="text-white justify-center flex py-3 my-4 bg-[#2E2E2E] hover:bg-[#111111] w-full"
            onClick={handleLogin}
          >
            Sign in
          </button>
          <div className="text-sm space-y-1 flex flex-col items-center font-bold text-[#2E2E2E]">
            <Link
              href={"/product"}
              className="hover:text-[#111111] hover:underline cursor-pointer"
            >
              Return to Store
            </Link>
            <Link
              href={"/register"}
              className="hover:text-[#111111] hover:underline cursor-pointer"
            >
              Create account
            </Link>
            <div className="hover:text-[#111111] hover:underline cursor-pointer">
              Forgot your password?
            </div>
          </div>
        </div>
      </Text>
    </div>
  );
}

export default Login;
